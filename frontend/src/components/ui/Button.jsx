import React from 'react';
import { tv } from 'tailwind-variants';

const buttonStyles = tv({
  base: 'font-semibold py-3 px-6 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-theme-primary-bg disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    variant: {
      accent: 'bg-theme-accent text-theme-button-text hover:bg-theme-accent-hover focus:ring-theme-accent shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0',
      subtle: 'bg-[#3a3a50] text-theme-text hover:bg-[#4a4a60] focus:ring-theme-accent shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0',
      danger: 'bg-theme-danger text-white hover:bg-red-700 focus:ring-theme-danger shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0',
    },
    size: {
      sm: 'text-sm py-2 px-4',
      md: 'text-base py-3 px-6',
      lg: 'text-lg py-4 px-8',
    },
    fullWidth: {
      true: 'w-full',
    }
  },
  defaultVariants: {
    variant: 'accent',
    size: 'md',
  }
});

const Button = React.forwardRef((
  { children, variant, size, fullWidth, className, ...props }, 
  ref
) => {
  return (
    <button
      ref={ref}
      className={buttonStyles({ variant, size, fullWidth, className })}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
