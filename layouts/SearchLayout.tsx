import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const SearchLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-2/3 border border-r-slate-400 box-border h-auto">
      {children}
    </div>
  )
}

export default SearchLayout;
