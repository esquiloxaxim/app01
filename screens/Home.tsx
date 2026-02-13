import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../constants';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6 max-w-md mx-auto w-full">
        {/* Hero Section */}
        <div className="px-4 pt-6 pb-4">
          <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl shadow-primary/30 group border border-white/10">
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: `url('${IMAGES.hero}')` }}
            >
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-black/30"></div>
            
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-end pb-10 px-6 text-center z-10">
              <div className="mb-8 flex flex-col items-center gap-3">
                <img 
                  src={IMAGES.logo} 
                  alt="Ginga Paraná Logo" 
                  className="h-28 object-contain mb-2 drop-shadow-2xl filter brightness-110" 
                />
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-1 shadow-lg">
                    Temporada 2026
                </span>
                <h2 className="text-white text-3xl font-black tracking-tighter leading-tight drop-shadow-xl">
                    CIRCUITO<br/>GINGA PARANÁ
                </h2>
              </div>
              <button 
                onClick={() => navigate('/identification')}
                className="w-full max-w-[280px] bg-secondary hover:bg-orange-600 text-white active:scale-95 transition-all h-14 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-black/20 border border-white/10"
              >
                <span className="font-bold text-lg uppercase tracking-wide">Inscrever-se</span>
                <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="px-6 pt-4 pb-4">
          <h3 className="text-slate-800 dark:text-slate-200 text-xl font-bold tracking-tight">Menu Principal</h3>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-4 px-4 pb-8">
          <ActionCard 
            title={<>Novo<br/>Cadastro</>} 
            icon="person_add" 
            color="bg-primary" 
            onClick={() => navigate('/identification')} 
          />
          <ActionCard 
            title={<>Nova<br/>Etapa</>} 
            icon="event_available" 
            color="bg-primary" 
            onClick={() => navigate('/payment')} 
          />
          <ActionCard 
            title="Documentos" 
            icon="description" 
            color="bg-secondary" 
            onClick={() => navigate('/documents')} 
          />
          <ActionCard 
            title={<>Editar<br/>Cadastro</>} 
            icon="edit_note" 
            color="bg-secondary" 
            onClick={() => navigate('/identification')} 
          />
          <ActionCard 
            title={<>Dados de<br/>Pagamento</>} 
            icon="credit_card" 
            color="bg-slate-700 dark:bg-slate-800" 
            onClick={() => navigate('/identification')} 
          />
          <ActionCard 
            title={<>Enviar<br/>Comprovante</>} 
            icon="upload_file" 
            color="bg-slate-700 dark:bg-slate-800" 
            onClick={() => navigate('/payment')} 
          />
        </div>
        
        {/* Footer */}
        <footer className="w-full py-6 text-center border-t border-black/5 dark:border-white/5 mt-2">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-600 tracking-wide uppercase">
                BantoPro Sistemas 2026
            </p>
        </footer>
      </div>
    </>
  );
};

const ActionCard = ({ title, icon, color, onClick }: { title: React.ReactNode, icon: string, color: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`relative flex flex-col justify-between p-5 h-[150px] rounded-2xl ${color} shadow-lg hover:shadow-xl active:scale-[0.98] transition-all text-left overflow-hidden group border border-white/5`}
  >
    <div className="absolute top-0 right-0 p-10 bg-white/10 rounded-full -mr-6 -mt-6 blur-2xl group-hover:bg-white/20 transition-all"></div>
    <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm z-10 shadow-inner">
      <span className="material-symbols-outlined text-white text-[28px]">{icon}</span>
    </div>
    <div className="z-10">
      <span className="block text-white text-lg font-bold leading-tight tracking-wide">{title}</span>
    </div>
  </button>
);

export default Home;