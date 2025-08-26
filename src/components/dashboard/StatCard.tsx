import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  className?: string;
  Button?: boolean;
  textColor?: String;
}

export default function StatCard({ title, value, icon, className , Button = false, textColor}: StatCardProps) {
  return (
    <div className={`rounded-sm p-4 bg-white`}>
      <div className={`flex rounded-sm justify-between ${className}`}>
        <div className="p-3">
          <p className={`text-xs font-semibold text-gray-700 ${textColor}`}>{title}</p>
          <h2 className="text-md text-gray-700">{value}</h2>
            {Button && (
                <button className="mt-3 px-2.5 py-1 rounded-sm bg-primary text-white text-xs hover:bg-gray-200 transition">
                  Get More →
                </button>
            )}
        </div>
        {icon && <div className="text-3xl">{icon}</div>}
      </div>
    </div>
  );
}
