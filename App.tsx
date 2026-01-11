import React, { useState, useEffect, useRef } from 'react';
import { Page, UserProfile, Vulnerability, VulnerabilitySubSection } from './types';
import { TOP_10_2023 } from './constants';
import { VulnerabilityCard } from './components/VulnerabilityCard';
import { VulnerabilityTheory } from './components/VulnerabilityTheory';
import { VulnerabilityLab } from './components/VulnerabilityLab';
import { VulnerabilityQuiz } from './components/VulnerabilityQuiz';
import { CyberBugsBackground } from './components/CyberBugsBackground';
import { SettingsPage } from './components/SettingsPage';

const App: React.FC = () => {
  const [lang] = useState<'ar'>('ar');
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('app_theme');
    return saved ? saved === 'dark' : true; 
  });

  const [currentPage, setCurrentPage] = useState<Page>(() => {
    return (localStorage.getItem('app_current_page') as Page) || 'home';
  });
  
  const [activeSubSection, setActiveSubSection] = useState<VulnerabilitySubSection>(() => {
    return (localStorage.getItem('app_current_page') === 'vulnerability-detail' ? (localStorage.getItem('app_vuln_tab') as VulnerabilitySubSection) : 'theory') || 'theory';
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('app_user_profile');
    return saved ? JSON.parse(saved) : { name: '', email: '', avatar: '' };
  });

  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(() => {
    const saved = localStorage.getItem('app_selected_vuln');
    return saved ? JSON.parse(saved) : null;
  });

  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem('app_primary_color') || '#00d4aa';
  });

  const [privacySettings, setPrivacySettings] = useState(() => {
    const saved = localStorage.getItem('app_privacy_settings');
    return saved ? JSON.parse(saved) : { showActivity: true, acceptCookies: true };
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  const t = {
    ar: {
      home: 'الرئيسية',
      top10: 'الأهداف',
      labs: 'المختبرات',
      quiz: 'كويز',
      settings: 'الإعدادات',
      backToHome: 'إنهاء الجلسة',
      theory: 'التحليل',
      lab: 'المحاكاة',
      quizTab: 'الاختبار',
      heroSub: 'بيئة حية لمحاكاة اختراق وتأمين تطبيقات الويب بناءً على معايير OWASP العالمية. ادخل الآن إلى المختبر الرقمي.',
      heroBtn: 'تشغيل النظام',
      top10Title: 'سجل الثغرات النشطة',
      settingsTitle: 'إعدادات النظام',
      logout: 'الصفحة الرئيسية'
    }
  };

  // التمرير للأعلى عند تغيير الصفحة أو الثغرة المختارة
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedVuln]);

  useEffect(() => {
    localStorage.setItem('app_current_page', currentPage);
    localStorage.setItem('app_user_profile', JSON.stringify(user));
    localStorage.setItem('app_theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('app_primary_color', primaryColor);
    localStorage.setItem('app_privacy_settings', JSON.stringify(privacySettings));
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--primary-hover', primaryColor + 'cc');
    
    const hexColor = primaryColor.replace('#', '');
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    document.documentElement.style.setProperty('--primary-rgb', `${r}, ${g}, ${b}`);

    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';

    if (selectedVuln) {
      localStorage.setItem('app_selected_vuln', JSON.stringify(selectedVuln));
    }
    if (activeSubSection) {
      localStorage.setItem('app_vuln_tab', activeSubSection);
    }
  }, [currentPage, user, selectedVuln, isDarkMode, primaryColor, privacySettings, activeSubSection]);

  const handleVulnClick = (vuln: Vulnerability, tab: VulnerabilitySubSection = 'theory') => {
    setSelectedVuln(vuln);
    setActiveSubSection(tab);
    setCurrentPage('vulnerability-detail');
  };

  const scrollToTop10 = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        document.getElementById('top-10-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('top-10-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-[100] w-full bg-slate-200/90 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-300 dark:border-white/5 h-16 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full relative flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-400 dark:border-white/10 hover:border-primary/50 transition-all text-slate-700 dark:text-gray-400 hover:text-primary group bg-slate-100 dark:bg-transparent shadow-inner dark:shadow-none"
            title={isDarkMode ? "تفعيل وضع الرمادي" : "تفعيل الوضع الداكن"}
          >
            <span className="material-symbols-outlined group-active:scale-90 transition-transform">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-12 whitespace-nowrap">
          <button onClick={() => setCurrentPage('home')} className={`text-[13px] font-black uppercase tracking-widest transition-all ${currentPage === 'home' ? 'text-primary' : 'text-slate-600 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white'}`}>{t.ar.home}</button>
          <button onClick={scrollToTop10} className="text-[13px] font-black uppercase tracking-widest text-slate-600 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-all">{t.ar.top10}</button>
          <button onClick={() => setCurrentPage('labs')} className={`text-[13px] font-black uppercase tracking-widest transition-all ${currentPage === 'labs' ? 'text-primary' : 'text-slate-600 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white'}`}>{t.ar.labs}</button>
          <button onClick={() => setCurrentPage('quiz')} className={`text-[13px] font-black uppercase tracking-widest transition-all ${currentPage === 'quiz' ? 'text-primary' : 'text-slate-600 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white'}`}>{t.ar.quiz}</button>
        </div>

        <div 
          className="flex items-center gap-3 cursor-pointer group py-2 px-3 flex-shrink-0" 
          onClick={() => {
            setCurrentPage('settings');
          }}
        >
          <div className="w-8 h-8 rounded-lg border border-primary/40 flex items-center justify-center bg-primary/5 group-hover:shadow-glow transition-all">
             <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
          <span className="font-black text-2xl text-primary font-display select-none">الإعدادات</span>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="App min-h-screen bg-slate-300 dark:bg-background-dark text-slate-900 dark:text-white font-sans selection:bg-primary selection:text-black text-right overflow-x-hidden transition-colors duration-500">
      
      <CyberBugsBackground isDarkMode={isDarkMode} />
      <Navbar />

      {currentPage === 'home' && (
        <div className="flex flex-col min-h-screen relative">
          
          <header 
            onMouseMove={handleMouseMove} 
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-200 dark:bg-black transition-colors duration-500"
          >
            <div className="absolute inset-0 pointer-events-none z-10 p-10 opacity-30">
               <div className="absolute top-20 right-10 font-mono text-[10px] text-slate-500 dark:text-primary space-y-1">
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-sm"></span> SCANNING_LIVE_NODES...</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-sm"></span> UPTIME: 99.998%</div>
               </div>
               <div className="absolute bottom-10 left-10 font-mono text-[10px] text-slate-400 dark:text-gray-500 space-y-1">
                  <div>HEX_DUMP: 0x42 0x55 0x47 0x53</div>
                  <div className="text-primary/60">SESSION_ENCRYPTED_AES256</div>
               </div>
               <div className="absolute top-20 left-10 w-20 h-20 border-l-2 border-t-2 border-slate-400/50 dark:border-primary/20"></div>
               <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-slate-400/50 dark:border-primary/20"></div>
            </div>

            <div className="relative z-20 max-w-[1400px] mx-auto px-4 w-full flex flex-col items-center">
              
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10 dark:opacity-100"
                style={{ transform: `translate(calc(-50% + ${mousePos.x * 0.5}px), calc(-50% + ${mousePos.y * 0.5}px))` }}
              >
                 <div className="relative w-[600px] h-[600px] lg:w-[900px] lg:h-[900px]">
                    <div className="absolute inset-0 border border-primary/20 rounded-full animate-pulse"></div>
                    <div className="absolute inset-[15%] border border-primary/30 rounded-full animate-spin-slow"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                 </div>
              </div>

              <div className="relative flex flex-col items-center text-center space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-slate-400 dark:border-primary/30 bg-slate-100/50 dark:bg-primary/5 backdrop-blur-sm shadow-md">
                  <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700 dark:text-primary">Sys_Auth: Active</span>
                </div>
                
                <h1 className="text-7xl lg:text-9xl font-black leading-none tracking-tighter uppercase font-pixel text-slate-900 dark:text-white">
                  <span className="text-primary drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)] dark:drop-shadow-glow">OWASP</span><br/>TOP 10
                </h1>
                
                <p className="text-slate-700 dark:text-gray-400 text-lg lg:text-2xl leading-relaxed max-w-2xl font-bold">
                  {t.ar.heroSub}
                </p>
                
                <div className="flex justify-center pt-8">
                  <button 
                    onClick={scrollToTop10} 
                    className="relative group overflow-hidden px-14 py-7 bg-slate-900 dark:bg-primary text-white dark:text-black font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
                  >
                    <span className="relative z-10">{t.ar.heroBtn}</span>
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20"></div>
                  </button>
                </div>
              </div>
            </div>
          </header>

          <section id="top-10-section" className="py-40 bg-slate-300 dark:bg-black/40 relative border-t border-slate-400 dark:border-white/5 z-10 backdrop-blur-sm transition-colors duration-500">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
              <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
                <div className="space-y-4 text-right w-full flex flex-col items-center">
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic flex items-center gap-6">
                    <span className="w-20 h-1 bg-slate-900 dark:bg-primary/40"></span>
                    {t.ar.top10Title}
                    <span className="w-20 h-1 bg-slate-900 dark:bg-primary/40"></span>
                  </h2>
                  <p className="text-slate-700 dark:text-gray-500 text-lg font-bold">سجل التهديدات النشطة المحدث لعام 2023.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
                {TOP_10_2023.map(vuln => (<VulnerabilityCard key={vuln.id} vulnerability={vuln} onClick={(v) => handleVulnClick(v, 'theory')}/>))}
              </div>
            </div>
          </section>
        </div>
      )}
      
      {currentPage === 'vulnerability-detail' && selectedVuln && (
        <div className="flex flex-col min-h-screen bg-slate-400/40 dark:bg-black relative z-10 pt-16 backdrop-blur-md transition-colors duration-500">
          <div className="max-w-[1400px] mx-auto w-full px-4 py-24">
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-700 dark:text-gray-400 hover:text-primary transition-colors mb-10 group flex-row-reverse">
              <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_forward</span>
              <span>{t.ar.backToHome}</span>
            </button>
            <div className="bg-slate-200 dark:bg-[#0a0a0a] rounded-[2.5rem] border border-slate-400/50 dark:border-white/5 overflow-hidden shadow-2xl">
              
              <div className="p-10 border-b border-slate-400/30 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 bg-slate-300 dark:bg-[#0a0a0a] transition-colors duration-500 flex-row-reverse">
                <div className="flex items-center gap-8 flex-row-reverse">
                  <div className="w-24 h-24 rounded-[2rem] bg-slate-900/5 dark:bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary shadow-sm dark:shadow-glow overflow-hidden flex-shrink-0">
                    <span className="material-symbols-outlined text-5xl">{selectedVuln.icon}</span>
                  </div>
                  <div className="text-right">
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-tight">{selectedVuln.name}</h2>
                    <p className="text-xl font-bold text-slate-600 dark:text-gray-400 mt-1">{selectedVuln.arabicName}</p>
                    <p className="text-slate-600/60 dark:text-primary/70 font-mono text-[11px] uppercase tracking-[0.2em] mt-3 font-black">ID_STATUS: RECON_LEVEL_4</p>
                  </div>
                </div>

                <div className="flex p-1.5 bg-slate-900 dark:bg-black rounded-[1.5rem] border border-slate-950 dark:border-white/10 shadow-lg">
                  {(['theory', 'lab', 'quiz'] as VulnerabilitySubSection[]).map((tab) => (
                    <button key={tab} onClick={() => setActiveSubSection(tab)} className={`px-10 py-4 rounded-[1.2rem] text-[11px] font-black uppercase tracking-widest transition-all ${activeSubSection === tab ? 'bg-primary text-black' : 'text-slate-400 dark:text-gray-500 hover:text-white'}`}>
                      {tab === 'theory' && t.ar.theory}
                      {tab === 'lab' && t.ar.lab}
                      {tab === 'quiz' && t.ar.quizTab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-10 lg:p-16 text-right text-slate-900 dark:text-white bg-slate-100 dark:bg-[#0a0a0a] transition-colors duration-500">
                {activeSubSection === 'theory' && <VulnerabilityTheory vulnerability={selectedVuln} />}
                {activeSubSection === 'lab' && <VulnerabilityLab vulnerability={selectedVuln} />}
                {activeSubSection === 'quiz' && <VulnerabilityQuiz vulnerability={selectedVuln} />}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'settings' && (
        <SettingsPage 
          user={user}
          setUser={setUser}
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          privacySettings={privacySettings}
          setPrivacySettings={setPrivacySettings}
          setCurrentPage={setCurrentPage}
          logoutText={t.ar.logout}
        />
      )}

      {(currentPage === 'labs' || currentPage === 'quiz') && (
        <div className="flex flex-col min-h-screen bg-slate-400/20 dark:bg-black/60 pt-16 relative z-10 backdrop-blur-md transition-colors duration-500">
          <div className="max-w-[1400px] mx-auto w-full px-4 py-40 text-center space-y-12">
             <div className="w-40 h-40 bg-slate-900 dark:bg-primary/10 rounded-[4rem] border-4 border-primary/40 flex items-center justify-center mx-auto shadow-2xl dark:shadow-glow">
                <span className="material-symbols-outlined text-primary text-7xl">{currentPage === 'labs' ? 'terminal' : 'quiz'}</span>
             </div>
             <div className="space-y-6">
                <h2 className="text-5xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">{currentPage === 'labs' ? t.ar.labs : t.ar.quiz}</h2>
                <p className="text-slate-700 dark:text-gray-500 text-xl max-w-xl mx-auto leading-relaxed font-bold">المختبر الحالي تحت إشراف الأمن الوقائي. يرجى اختيار أحد الأهداف من القائمة الرئيسية لبدء العملية البرمجية.</p>
             </div>
             <button onClick={() => setCurrentPage('home')} className="px-14 py-6 bg-slate-900 dark:bg-white text-white dark:text-black font-black rounded-3xl hover:bg-primary hover:text-black transition-all shadow-2xl dark:shadow-glow">إغلاق وتراجع</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
