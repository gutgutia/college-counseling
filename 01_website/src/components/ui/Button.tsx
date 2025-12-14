import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  icon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--s3-cyan)] text-[var(--s3-text-inverse)]
    hover:bg-[var(--s3-cyan-hover)] hover:-translate-y-0.5
    hover:shadow-[0_8px_30px_rgba(0,229,255,0.3)]
  `,
  secondary: `
    bg-transparent text-[var(--s3-text-primary)]
    border-2 border-[var(--s3-border-hover)]
    hover:border-[var(--s3-text-primary)] hover:bg-white/5
  `,
  ghost: `
    bg-transparent text-[var(--s3-text-secondary)]
    hover:text-[var(--s3-text-primary)] hover:bg-white/5
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold uppercase tracking-wide
        rounded-full cursor-pointer
        transition-all duration-200
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

