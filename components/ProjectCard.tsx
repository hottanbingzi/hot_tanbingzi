
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative glass-card rounded-[3rem] overflow-hidden flex flex-col h-full cursor-pointer">
      {/* Dynamic Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-700"></div>
      
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover image-parallax transition-transform duration-1000 group-hover:scale-110 group-hover:-rotate-2"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
        
        {/* Floating Category Tag */}
        <div className="absolute top-8 left-8">
          <span className="px-5 py-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300 group-hover:text-white group-hover:border-indigo-500/50 transition-all">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-10 flex-1 flex flex-col relative z-10">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-3xl font-outfit font-black text-white group-hover:text-indigo-400 transition-colors leading-none tracking-tight">
            {project.title}
          </h3>
          <div className="flex flex-col items-end">
             <span className="text-[10px] text-white/20 font-black tracking-widest uppercase mb-1">{project.date}</span>
             <div className="h-px w-8 bg-indigo-500/30 group-hover:w-16 transition-all duration-500"></div>
          </div>
        </div>
        
        <p className="text-white/40 text-sm line-clamp-2 mb-8 leading-relaxed group-hover:text-white/70 transition-colors">
          {project.description}
        </p>
        
        <div className="mt-auto flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/5 text-white/30 border border-white/5 rounded-lg text-[9px] font-bold uppercase tracking-widest group-hover:border-indigo-500/20 group-hover:text-white/50 transition-all">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Immersive View Indicator - Center Icon on Hover */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 shadow-2xl shadow-indigo-500/50">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
