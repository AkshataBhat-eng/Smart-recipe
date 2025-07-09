import { ButtonHTMLAttributes, ReactNode } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  handleclick?: any;
}

const PrimaryButton = ({ children, ...props }: PrimaryButtonProps) => (
  <button
    onClick={props.onClick}
    {...props}
    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary.dark transition-all duration-300 shadow font-body"
  >
    {children}
  </button>
);

export default PrimaryButton;
