import { ReactNode } from "react";
interface ActionCardProps {
  title: string;
  icon?: ReactNode;
  buttonText: string;
  onClick?: () => void;
  className?: string;
}

export default function ActionCard({ title, buttonText, onClick, className, icon }: ActionCardProps) {
  return (
    <div className={`p-6 bg-white flex flex-col items-center rounded-sm text-center ${className}`}>
      <h3 className="font-semibold">{title}</h3>
      <button
        onClick={onClick}
        className="mt-4 bg-success text-white px-4 py-2 rounded-sm text-xs"
      >
        {buttonText} →
      </button>
      <div className="mt-3">
      {icon}
      </div>
    </div>
  );
}