import { streamText } from "ai";
import { NextRequest } from "next/server";
import { requireProfile } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { modelFor, allTools, ADVISOR_SYSTEM_PROMPT, buildProfileContext } from "@/lib/ai";

export const maxDuration = 60; // Allow up to 60 seconds for streaming

/**
 * POST /api/chat
 * Main chat endpoint - streams AI responses with tool calling
 */
export async function POST(request: NextRequest) {
  try {
    const profileId = await requireProfile();
    const { messages, conversationId } = await request.json();
    
    // Load profile context for the AI
    const profile = await prisma.studentProfile.findUnique({
      where: { id: profileId },
      include: {
        academics: true,
        testing: true,
        activities: {
          orderBy: { displayOrder: "asc" },
          take: 10,
        },
        awards: {
          orderBy: { displayOrder: "asc" },
          take: 5,
        },
        courses: {
          where: { status: "in_progress" },
          take: 10,
        },
        schoolList: {
          include: { school: true },
          orderBy: { displayOrder: "asc" },
          take: 10,
        },
      },
    });
    
    if (!profile) {
      return new Response("Profile not found", { status: 404 });
    }
    
    // Build profile context string
    const profileContext = buildProfileContext({
      firstName: profile.firstName,
      lastName: profile.lastName,
      grade: profile.grade,
      highSchoolName: profile.highSchoolName,
      academics: profile.academics,
      testing: profile.testing,
      activities: profile.activities,
      awards: profile.awards,
      courses: profile.courses,
      schoolList: profile.schoolList,
    });
    
    // Build system message with context
    const systemMessage = `${ADVISOR_SYSTEM_PROMPT}

## Current Student Profile
${profileContext}

Remember: You have access to tools to save profile data. Use them when the student shares new information.`;
    
    // Stream the response
    const result = streamText({
      model: modelFor.advisor,
      system: systemMessage,
      messages,
      tools: allTools,
      onFinish: async ({ text, toolCalls, toolResults }) => {
        // Save the conversation to the database
        try {
          let conversation;
          
          if (conversationId) {
            conversation = await prisma.conversation.findUnique({
              where: { id: conversationId },
            });
          }
          
          if (!conversation) {
            // Create new conversation
            conversation = await prisma.conversation.create({
              data: {
                studentProfileId: profileId,
                title: messages[0]?.content?.slice(0, 50) || "New conversation",
                mode: "general",
              },
            });
          }
          
          // Save user message (last one in the array)
          const userMessage = messages[messages.length - 1];
          if (userMessage?.role === "user") {
            await prisma.message.create({
              data: {
                conversationId: conversation.id,
                role: "user",
                content: typeof userMessage.content === "string" ? userMessage.content : JSON.stringify(userMessage.content),
              },
            });
          }
          
          // Save assistant message
          await prisma.message.create({
            data: {
              conversationId: conversation.id,
              role: "assistant",
              content: text,
              toolCalls: toolCalls ? JSON.parse(JSON.stringify(toolCalls)) : undefined,
              toolResults: toolResults ? JSON.parse(JSON.stringify(toolResults)) : undefined,
              model: "claude-sonnet-4-5",
              provider: "anthropic",
            },
          });
          
          // Update conversation stats
          await prisma.conversation.update({
            where: { id: conversation.id },
            data: {
              lastMessageAt: new Date(),
              messageCount: { increment: 2 }, // user + assistant
            },
          });
        } catch (error) {
          console.error("Error saving conversation:", error);
          // Don't throw - we still want the response to stream
        }
      },
    });
    
    // Return the streaming response
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat error:", error);
    if (error instanceof Error && error.message === "Profile not found") {
      return new Response("Not authenticated", { status: 401 });
    }
    return new Response("Internal server error", { status: 500 });
  }
}
