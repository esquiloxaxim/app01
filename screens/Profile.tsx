import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IMAGES } from '../constants';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Dados do atleta podem vir da navegação (Identification ou Payment)
  const athlete = location.state?.athlete;

  // Se não houver dados (acesso direto pela URL), usamos um placeholder ou redirecionamos
  const displayAthlete = athlete || {
    name: 'Visitante',
    team: 'Não identificado',
    category: '-',
    graduation: 'Sem corda'
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-8 px-4 max-w-md mx-auto w-full">
      {/* Top App Bar */}
      <header className="flex items-center pt-8 pb-4 justify-between bg-transparent sticky top-0 z-50">
        <button 
          onClick={() => navigate('/')}
          className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">My Profile</h2>
        <button className="flex size-10 cursor-pointer items-center justify-center rounded-full text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      {/* Profile Card */}
      <div className="mt-2 flex flex-col items-center bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-black/5 dark:border-white/5 transition-colors duration-200">
        {/* Avatar */}
        <div className="relative mb-4 group cursor-pointer">
          <div 
            className="bg-center bg-no-repeat bg-cover rounded-full h-32 w-32 border-4 border-primary shadow-lg transition-transform transform group-hover:scale-105" 
            style={{ backgroundImage: `url('${IMAGES.athleteProfile}')` }}
          >
          </div>
          <div className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full border-2 border-white dark:border-surface-dark flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </div>
        </div>

        {/* Name & Info */}
        <div className="flex flex-col items-center justify-center w-full space-y-1">
          <h1 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight text-center">{displayAthlete.name}</h1>
          <p className="text-secondary dark:text-gray-400 text-sm font-normal text-center">{displayAthlete.team}</p>
          
          {/* Chips / Badges */}
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            <div className="flex h-7 items-center justify-center gap-x-1.5 rounded-full bg-green-100 dark:bg-green-900/30 pl-2 pr-3 border border-green-200 dark:border-green-800">
              <span className="material-symbols-outlined text-green-700 dark:text-green-400 text-[18px]">check_circle</span>
              <p className="text-green-800 dark:text-green-300 text-xs font-semibold leading-normal">Active Registration</p>
            </div>
            <div className="flex h-7 items-center justify-center gap-x-1.5 rounded-full bg-primary/10 dark:bg-primary/20 pl-3 pr-3 border border-primary/20">
              <p className="text-primary dark:text-red-300 text-xs font-semibold leading-normal capitalize">{displayAthlete.graduation}</p>
            </div>
          </div>
        </div>

        {/* Attributes Grid */}
        <div className="grid grid-cols-2 gap-4 w-full mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
          <div className="flex flex-col items-center p-3 rounded-xl bg-background-light dark:bg-white/5">
            <span className="text-xs text-secondary dark:text-gray-400 uppercase tracking-wider font-medium">Category</span>
            <span className="text-slate-900 dark:text-white font-bold text-lg">{displayAthlete.category || '-'}</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-background-light dark:bg-white/5">
            <span className="text-xs text-secondary dark:text-gray-400 uppercase tracking-wider font-medium">Camiseta</span>
            <span className="text-slate-900 dark:text-white font-bold text-lg">{displayAthlete.tshirt_size || '-'}</span>
          </div>
        </div>

        {/* Primary Action */}
        <button 
          onClick={() => navigate('/registration')}
          className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl h-12 bg-primary hover:bg-primary-hover text-white text-base font-bold shadow-md shadow-primary/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">edit_square</span>
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Documents Section */}
      <div className="mt-6">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold px-1 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">folder_open</span>
            Documents & History
        </h3>
        <div className="flex flex-col gap-3">
          {/* Item 1 */}
          <div className="flex items-center gap-4 bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">description</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 dark:text-white text-base font-medium truncate">Medical Release Form</p>
              <p className="text-green-600 dark:text-green-400 text-xs font-normal mt-0.5 flex items-center gap-1">
                  Verified <span className="material-symbols-outlined text-[14px]">verified</span>
              </p>
            </div>
            <div className="shrink-0 text-gray-400 dark:text-gray-600">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </div>
          
          {/* Item 2 */}
          <div className="flex items-center gap-4 bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">receipt_long</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 dark:text-white text-base font-medium truncate">Payment History</p>
              <p className="text-secondary dark:text-gray-400 text-xs font-normal mt-0.5">Last payment: Oct 12, 2023</p>
            </div>
            <div className="shrink-0 text-gray-400 dark:text-gray-600">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-4 bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group opacity-75">
            <div className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 shrink-0 size-10">
              <span className="material-symbols-outlined">card_membership</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 dark:text-white text-base font-medium truncate">Federation ID</p>
              <p className="text-orange-600 dark:text-orange-400 text-xs font-normal mt-0.5 flex items-center gap-1">
                  Pending Review <span className="material-symbols-outlined text-[14px]">pending</span>
              </p>
            </div>
            <div className="shrink-0 text-gray-400 dark:text-gray-600">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-8"></div>
    </div>
  );
};

export default Profile;