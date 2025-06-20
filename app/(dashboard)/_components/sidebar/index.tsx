import { List } from "./list";
import { NewButton } from "./new-button";

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 z-[1] flex h-full w-[68px] flex-col gap-y-4 p-3 text-white">
      {/* Glassmorphism background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-purple-600/10 to-blue-600/20" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full gap-y-4">
        <List />
        <NewButton />
      </div>
    </aside>
  );
};