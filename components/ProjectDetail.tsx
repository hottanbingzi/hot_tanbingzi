
import React, { useEffect, useState } from 'react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setActive(true), 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'auto';
      setActive(false);
    }
  }, [project]);

  if (!project) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#0a0a0c] transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`min-h-screen w-full relative detail-reveal`}>
        {/* Close Button - Staggered entrance */}
        <button 
          onClick={onClose}
          className={`fixed top-12 right-12 z-[110] p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group backdrop-blur-xl ${active ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'} duration-700 delay-300`}
        >
          <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Hero Section */}
        <div className="w-full h-[85vh] relative overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className={`w-full h-full object-cover transition-transform duration-[2s] ease-out ${active ? 'scale-100' : 'scale-110'}`} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent"></div>
          
          <div className="absolute bottom-24 left-0 w-full">
            <div className="max-w-7xl mx-auto px-10">
              <div className={`transition-all duration-1000 delay-300 ${active ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <span className="px-6 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-8 inline-block backdrop-blur-md">
                  {project.category}
                </span>
                <h1 className="text-6xl md:text-9xl font-outfit font-black text-white tracking-tighter mb-6 text-glow leading-none">
                  {project.title}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className={`max-w-7xl mx-auto px-10 py-32 transition-all duration-1000 delay-500 ${active ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-32">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-px bg-indigo-500/50"></div>
                <h2 className="text-[12px] font-black text-white/30 tracking-[0.5em] uppercase">核心架构 / CORE ARCHITECTURE</h2>
              </div>
              <p className="text-3xl text-white/80 leading-snug font-light mb-16 tracking-tight">
                {project.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                 <div>
                    <h3 className="text-[10px] font-black text-indigo-400 tracking-[0.4em] uppercase mb-6">挑战挑战 / CHALLENGE</h3>
                    <p className="text-white/50 leading-relaxed font-light">
                      如何在极高的数据密度下保持操作的流畅度？这是该项目最核心的设计命题。我们通过重塑视线流向和分层交互，成功将认知负荷降低了 40%。
                    </p>
                 </div>
                 <div>
                    <h3 className="text-[10px] font-black text-indigo-400 tracking-[0.4em] uppercase mb-6">解决方案 / SOLUTION</h3>
                    <p className="text-white/50 leading-relaxed font-light">
                      采用了基于“环境感知”的动态界面技术，根据用户的实时任务状态自动调整显示优先级，确保只有关键信息被保留在第一视觉层级。
                    </p>
                 </div>
              </div>
            </div>
            
            <div className="lg:col-span-4 space-y-16">
              <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5">
                <div className="space-y-12">
                  <div>
                    <h3 className="text-[10px] font-black text-white/30 tracking-[0.4em] uppercase mb-4">项目周期</h3>
                    <p className="text-xl text-white font-bold">{project.date}</p>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-white/30 tracking-[0.4em] uppercase mb-4">核心工具</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-white/60 uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-white/30 tracking-[0.4em] uppercase mb-4">主导角色</h3>
                    <p className="text-xl text-white font-bold">Experience Lead</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Process Gallery - Artistic Grid */}
          <div className="grid grid-cols-12 gap-8 mb-40">
            <div className="col-span-12 md:col-span-7 aspect-[16/10] bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden relative group">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/5 font-outfit font-black text-[10rem] tracking-tighter italic">PROCESS</span>
               </div>
            </div>
            <div className="col-span-12 md:col-span-5 aspect-[16/10] md:aspect-auto bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden">
               <div className="w-full h-full bg-gradient-to-bl from-purple-500/20 to-transparent"></div>
            </div>
          </div>
          
          <div className="text-center pb-20">
            <button 
              onClick={onClose}
              className="group relative px-16 py-6 overflow-hidden rounded-full transition-all"
            >
              <div className="absolute inset-0 bg-white group-hover:bg-indigo-500 transition-colors"></div>
              <span className="relative text-black group-hover:text-white font-black text-xs tracking-[0.4em] uppercase transition-colors">
                关闭预览 / BACK TO CORE
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
