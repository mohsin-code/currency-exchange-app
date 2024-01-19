import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const SavedLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-1/3 h-auto flex flex-col gap-2 p-4">
      {children}
    </div>
  )
}

export default SavedLayout;
