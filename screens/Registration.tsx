import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IMAGES } from '../constants';
import { supabase } from '../supabaseClient';

const Registration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  
  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    birth_date: '',
    cpf: '',
    phone: '',
    team: '',
    graduation: '',
    master_name: '',
    tshirt_size: 'G'
  });

  // Preenche o CPF se veio da tela de busca
  useEffect(() => {
    if (location.state?.prefilledCpf) {
      setFormData(prev => ({ ...prev, cpf: location.state.prefilledCpf }));
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Validação básica
    if (!formData.name || !formData.cpf || !formData.team) {
      alert("Por favor, preencha os campos obrigatórios (Nome, CPF, Equipe).");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('athletes')
        .insert([
          {
            name: formData.name,
            nickname: formData.nickname,
            birth_date: formData.birth_date || null, // Supabase aceita null em datas
            cpf: formData.cpf,
            phone: formData.phone,
            team: formData.team,
            graduation: formData.graduation,
            master_name: formData.master_name,
            tshirt_size: formData.tshirt_size,
            // category: calcularCategoria(formData.birth_date) // Lógica de categoria pode ser adicionada aqui ou no backend
          }
        ])
        .select();

      if (error) {
        console.error('Erro ao salvar:', error);
        alert(`Erro ao salvar: ${error.message}`);
      } else {
        // Sucesso -> vai para pagamento, passando os dados do atleta criado
        navigate('/payment', { state: { athlete: data[0] } });
      }
    } catch (err) {
      console.error(err);
      alert('Erro inesperado ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col pb-24 max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-primary/10 dark:border-primary/20 px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex size-10 items-center justify-center rounded-full text-primary dark:text-white hover:bg-primary/5 active:bg-primary/10 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
          </button>
          <h1 className="text-lg font-bold text-[#1c0d11] dark:text-white tracking-tight flex-1 text-center pr-10">Nova Inscrição</h1>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 w-full px-5 pt-6 flex flex-col gap-8">
        
        {/* Photo Upload Section */}
        <section className="flex flex-col items-center gap-3">
          <div className="relative group cursor-pointer">
            <div 
              className="size-28 rounded-full bg-[#f4e7ea] dark:bg-surface-dark border-4 border-white dark:border-primary/20 bg-cover bg-center shadow-sm relative overflow-hidden" 
              style={{ backgroundImage: `url('${IMAGES.regSilhouette}')` }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
            </div>
            <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 border-4 border-background-light dark:border-background-dark flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-lg">photo_camera</span>
            </div>
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
          </div>
          <p className="text-primary dark:text-red-300 text-sm font-medium">Toque para adicionar foto</p>
        </section>

        {/* Personal Data Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-primary/10 dark:border-primary/20">
            <span className="material-symbols-outlined text-primary text-xl">person</span>
            <h3 className="text-xl font-bold text-[#1c0d11] dark:text-white">Dados Pessoais</h3>
          </div>
          <div className="space-y-4">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</span>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark text-[#1c0d11] dark:text-white px-4 focus:border-primary focus:ring-primary/20 placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm" 
                placeholder="Digite seu nome completo" 
                type="text" 
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex justify-between">
                  Apelido <span className="text-xs text-primary font-normal">Nome de Capoeira</span>
              </span>
              <input 
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark text-[#1c0d11] dark:text-white px-4 focus:border-primary focus:ring-primary/20 placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm" 
                placeholder="Ex: Coruja, Gafanhoto..." 
                type="text" 
              />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Nascimento</span>
                <input 
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  className="w-full h-12 rounded-lg border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark text-[#1c0d11] dark:text-white px-2 focus:border-primary focus:ring-primary/20 shadow-sm [color-scheme:light] dark:[color-scheme:dark]" 
                  type="date" 
                />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">CPF</span>
                <input 
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  className="w-full h-12 rounded-lg border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark text-[#1c0d11] dark:text-white px-4 focus:border-primary focus:ring-primary/20 placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm" 
                  placeholder="000.000.000-00" 
                  type="tel" 
                />
              </label>
            </div>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Telefone / WhatsApp</span>
              <input 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark text-[#1c0d11] dark:text-white px-4 focus:border-primary focus:ring-primary/20 placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm" 
                placeholder="(00) 00000-0000" 
                type="tel" 
              />
            </label>
          </div>
        </section>

        {/* Sports Data Section */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2 pb-1 border-b border-primary/10 dark:border-primary/20">
            <span className="material-symbols-outlined text-primary text-xl">sports_martial_arts</span>
            <h3 className="text-xl font-bold text-[#1c0d11] dark:text-white">Dados Esportivos</h3>
          </div>
          <div className="space-y-4">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Equipe / Grupo</span>
              <input 
                name="team"
                value={formData.team}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark text-[#1c0d11] dark:text-white px-4 focus:border-primary focus:ring-primary/20 placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm" 
                placeholder="Nome da sua equipe" 
                type="text" 
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Graduação (Corda)</span>
              <div className="relative">
                <select 
                  name="graduation"
                  value={formData.graduation}
                  onChange={handleChange}
                  className="w-full h-12 rounded-lg border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark text-[#1c0d11] dark:text-white pl-4 pr-10 focus:border-primary focus:ring-primary/20 shadow-sm appearance-none"
                >
                  <option disabled value="">Selecione sua graduação</option>
                  <option value="iniciante">Iniciante / Sem corda</option>
                  <option value="batizado">Batizado (Verde)</option>
                  <option value="amarelo">Amarelo</option>
                  <option value="azul">Azul</option>
                  <option value="monitor">Monitor</option>
                  <option value="professor">Professor</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome do Professor/Mestre</span>
              <input 
                name="master_name"
                value={formData.master_name}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark text-[#1c0d11] dark:text-white px-4 focus:border-primary focus:ring-primary/20 placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm" 
                placeholder="Quem é seu responsável?" 
                type="text" 
              />
            </label>
          </div>
        </section>

        {/* Kit Section */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2 pb-1 border-b border-primary/10 dark:border-primary/20">
            <span className="material-symbols-outlined text-primary text-xl">checkroom</span>
            <h3 className="text-xl font-bold text-[#1c0d11] dark:text-white">Kit Atleta</h3>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Tamanho da Camiseta</p>
            <div className="grid grid-cols-5 gap-2">
              {['P', 'M', 'G', 'GG', 'EX'].map((size) => (
                <label key={size} className="cursor-pointer">
                  <input 
                    className="peer sr-only" 
                    name="tshirt_size" 
                    type="radio" 
                    value={size} 
                    checked={formData.tshirt_size === size}
                    onChange={handleChange}
                  />
                  <div className="h-12 w-full rounded-lg border border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark text-[#1c0d11] dark:text-gray-300 flex items-center justify-center font-medium peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all">{size}</div>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Terms Section */}
        <section className="space-y-2 pt-2">
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
            <div className="relative flex items-center pt-1">
              <input className="size-5 rounded border-gray-300 text-primary focus:ring-primary/20 dark:border-gray-600 dark:bg-surface-dark" type="checkbox" />
            </div>
            <div className="text-sm leading-tight text-gray-600 dark:text-gray-400">
                Li e concordo com o <a className="text-primary font-bold hover:underline" href="#">regulamento do evento</a> e os termos de uso de imagem.
            </div>
          </label>
        </section>
        <div className="h-10"></div>
      </main>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-primary/10 dark:border-primary/20 z-40">
        <div className="max-w-md mx-auto">
          <button 
            onClick={handleSave}
            disabled={loading}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:bg-gray-400"
          >
            {loading ? (
                <span>Salvando...</span>
            ) : (
                <>
                    <span>Salvar Inscrição</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Registration;