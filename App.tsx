
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import { Project, Profile } from './types';

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Solaris 空间操作系统',
    category: '系统设计',
    description: '一款面向未来的空间操作系统，专注于零重力环境下的可用性和神经链路反馈。通过自适应光感界面与触觉反馈，Solaris 重新定义了极端环境下的数字化协作体验。',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000',
    date: '2025',
    tags: ['空间 UI', '神经交互', '系统设计']
  },
  {
    id: '2',
    title: 'Aura 加密钱包',
    category: 'Web3 / 金融',
    description: '旨在为下一代十亿用户提供流动美学和直观风险可视化的 DeFi 管理平台。Aura 致力于打破传统金融工具的冰冷感，利用动态玻璃拟态效果创造更具亲和力的资产管理体验。',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000',
    date: '2024',
    tags: ['Web3', '玻璃拟态', '加密技术']
  },
  {
    id: '3',
    title: 'Vanguard 赛车仪表',
    category: '车载 HMI',
    description: '专为自动驾驶竞技无人机设计的 HMI 界面，具有毫秒级的视觉数据叠加显示能力。通过极简的色彩编码与高对比度排版，确保驾驶者在高速环境下依然能够精准捕捉核心飞行数据。',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
    date: '2024',
    tags: ['车载界面', '动效设计', 'HUD']
  }
];

const INITIAL_PROFILE: Profile = {
  name: 'Kaelen Thorne',
  role: '体验架构师 / UE 设计师',
  bio: '深耕高保真数字生态系统。我致力于将复杂数据转化为流动的、具有生命力的数字体验，定义新一代用户与产品的共生关系。',
  email: 'studio@kaelen.design',
  location: '新东京 / 远程',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
  skills: ['创意编程', '设计系统', '3D 原型', '用户心理学', '视觉工程']
};

const App: React.FC = () => {
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [projects, selectedProject]);

  return (
    <div className="min-h-screen selection:bg-indigo-500 selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" className="relative pt-64 pb-32 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="relative z-10 animate-fade-in text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-10 backdrop-blur-xl">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">DESIGN CORE v4.0 / ONLINE</span>
          </div>
          
          <h1 className="text-8xl md:text-[11rem] font-outfit font-black tracking-tighter mb-10 leading-[0.8] text-glow">
            解构 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              数字生命
            </span>
          </h1>
          
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-16 mt-20">
            <p className="text-2xl text-white/40 max-w-2xl leading-relaxed font-light text-center lg:text-left">
              超越物理边界，在像素与感官之间建立深刻的联结。 <br className="hidden md:block" />
              我是 Kaelen，致力于通过<span className="text-white font-medium">情感化交互</span>探索数字艺术的终极形态。
            </p>
            
            <div className="flex gap-4">
              <a href="#work" className="group relative flex items-center justify-center w-56 h-56 bg-white rounded-full text-black overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10">
                <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="relative z-10 text-center">
                  <span className="block text-xs font-black tracking-widest group-hover:text-white transition-colors">浏览作品</span>
                  <span className="block text-[8px] opacity-40 group-hover:text-white/40 mt-1 transition-colors tracking-tighter uppercase">SCROLL TO EXPLORE</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="work" className="py-40 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12 text-center md:text-left">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                 <div className="w-12 h-px bg-white/20"></div>
                 <h2 className="text-[11px] font-black tracking-[0.5em] text-white/40 uppercase">作品选集 / WORKS ARCHIVE</h2>
              </div>
              <h3 className="text-6xl font-outfit font-black tracking-tight text-white leading-none">捕捉瞬时的<br/><span className="text-indigo-500">数字火花</span></h3>
            </div>
            <div className="flex justify-center md:justify-end gap-12 border-b border-white/5 pb-4">
              <button className="text-[11px] font-black tracking-[0.3em] text-indigo-400 uppercase relative after:absolute after:bottom-[-16px] after:left-0 after:w-full after:h-0.5 after:bg-indigo-500">ALL</button>
              <button className="text-[11px] font-black tracking-[0.3em] text-white/20 hover:text-white uppercase transition-colors">SPATIAL</button>
              <button className="text-[11px] font-black tracking-[0.3em] text-white/20 hover:text-white uppercase transition-colors">AUTO</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-stretch">
            {projects.map((project, idx) => {
              // Vary the floating animation based on index
              const floatClass = idx % 3 === 0 ? 'float-1' : (idx % 3 === 1 ? 'float-2' : 'float-3');
              return (
                <div 
                  key={project.id} 
                  className={`reveal ${floatClass}`} 
                  style={{ transitionDelay: `${idx * 150}ms` }}
                  onClick={() => setSelectedProject(project)}
                >
                  <ProjectCard project={project} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-56 px-10 relative overflow-hidden bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">
          <div className="reveal relative order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-[5rem] overflow-hidden border border-white/5 shadow-2xl relative">
              <img src={INITIAL_PROFILE.avatar} alt="Profile" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-[2s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent pointer-events-none"></div>
            </div>
            <div className="absolute -top-12 -left-12 glass-card p-12 rounded-[4rem] shadow-2xl max-w-xs animate-float-slow bg-black/40 border-indigo-500/20">
               <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
               </div>
               <p className="text-lg text-white/80 font-light leading-snug">"UX 应该像空气一样自然，而 UE 应该像电影一样令人难忘。"</p>
            </div>
          </div>
          
          <div className="reveal order-1 lg:order-2">
            <h2 className="text-6xl font-outfit font-black mb-12 tracking-tight leading-none text-white">架构数字世界的 <br /><span className="text-indigo-500 italic">诗意直觉</span></h2>
            <p className="text-2xl text-white/50 mb-16 leading-relaxed font-light tracking-wide">
              {INITIAL_PROFILE.bio}
            </p>
            
            <div className="mb-20">
              <div className="flex flex-wrap gap-4">
                {INITIAL_PROFILE.skills.map(skill => (
                  <span key={skill} className="px-8 py-3 bg-white/5 border border-white/5 rounded-2xl text-white/40 text-xs font-black tracking-widest hover:border-indigo-500/30 hover:text-white transition-all cursor-default uppercase">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-20 pt-16 border-t border-white/5">
              <div>
                <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em] mb-4">BASE LOCATION</p>
                <p className="text-xl font-bold text-white tracking-tight">NEO TOKYO / TOKYO</p>
              </div>
              <div>
                <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em] mb-4">CONNECT FREQ</p>
                <p className="text-xl font-bold text-indigo-400 hover:text-white transition-colors cursor-pointer tracking-tight">studio@kaelen.design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-40 px-10 border-t border-white/5 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-white/10 text-[11px] font-black tracking-[1em] mb-20 uppercase">STAY CONNECTED / 数据连接中</p>
          <div className="flex justify-center gap-20">
            <a href="#" className="group text-white/30 hover:text-white transition-all text-sm font-black tracking-[0.3em] uppercase flex flex-col items-center">
              LINKEDIN
              <div className="h-px w-0 group-hover:w-full bg-indigo-500 transition-all mt-2"></div>
            </a>
            <a href="#" className="group text-white/30 hover:text-white transition-all text-sm font-black tracking-[0.3em] uppercase flex flex-col items-center">
              DRIBBBLE
              <div className="h-px w-0 group-hover:w-full bg-indigo-500 transition-all mt-2"></div>
            </a>
            <a href="#" className="group text-white/30 hover:text-white transition-all text-sm font-black tracking-[0.3em] uppercase flex flex-col items-center">
              BEHANCE
              <div className="h-px w-0 group-hover:w-full bg-indigo-500 transition-all mt-2"></div>
            </a>
          </div>
          <p className="mt-32 text-[10px] text-white/10 font-black tracking-[0.2em] uppercase">© {new Date().getFullYear()} CORE DESIGN STUDIO. ALL TRANSMISSIONS SECURED.</p>
        </div>
        
        {/* Background Noise/Graphic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-outfit font-black text-white/[0.01] pointer-events-none select-none tracking-tighter">
          CORE
        </div>
      </footer>

      {/* Detail View */}
      <ProjectDetail 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
};

export default App;
