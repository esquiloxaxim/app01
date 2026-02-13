import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ path, icon, label }: { path: string; icon: string; label: string }) => {
    const active = isActive(path);
    return (
      <button 
        onClick={() => navigate(path)}
        className="flex flex-col items-center gap-1 w-16 group"
      >
        <div className={`flex items-center justify-center w-10 h-8 rounded-full transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-slate-400 group-hover:text-primary'}`}>
          <span className={`material-symbols-outlined text-[24px] ${active ? "font-variation-settings-'FILL' 1" : ''}`}>{icon}</span>
        </div>
        <span className={`text-[10px] font-medium tracking-wide ${active ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-white/10 pb-safe pt-2 px-6 z-50">
      <div className="flex justify-between items-center h-[60px] max-w-md mx-auto">
        <NavItem path="/" icon="home" label="Início" />
        <NavItem path="/documents" icon="calendar_month" label="Eventos" />
        <NavItem path="/payment" icon="account_balance_wallet" label="Carteira" />
        <NavItem path="/profile" icon="person" label="Perfil" />
      </div>
      <div className="h-5 w-full safe-pb"></div>
    </nav>
  );
};

export default BottomNav;