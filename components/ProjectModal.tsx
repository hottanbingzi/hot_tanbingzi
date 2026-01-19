
import React, { useState, useRef } from 'react';
import { Project } from '../types';
import { generateProjectDescription, suggestTags } from '../services/geminiService';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: Project) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [loadingAI, setLoadingAI] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '空间 UI',
    description: '',
    keywords: '',
    imageUrl: `https://picsum.photos/seed/${Math.random()}/1200/900`,
    tags: [] as string[]
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleAIWriter = async () => {
    if (!formData.title) {
      alert("请先输入项目标题。");
      return;
    }
    setLoadingAI(true);
    const desc = await generateProjectDescription(formData.title, formData.category, formData.keywords);
    const tags = await suggestTags(formData.title, formData.category);
    setFormData(prev => ({ ...prev, description: desc, tags }));
    setLoadingAI(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category,
      description: formData.description,
      imageUrl: formData.imageUrl,
      date: new Date().getFullYear().toString(),
      tags: formData.tags.length > 0 ? formData.tags : ["设计", "UX"]
    };
    onAdd(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={onClose}></div>
      <div className="relative bg-[#0d0d10] border border-white/10 rounded-[3rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="p-12">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
             <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">数据录入</span>
          </div>
          <h2 className="text-4xl font-outfit font-black text-white mb-2">发布新作品</h2>
          <p className="text-white/40 text-sm mb-12 tracking-wide font-light">将你的最新创意同步到作品流中。</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">项目标题</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="例如：Nexus 智能控制台"
                  className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl focus:border-indigo-500/50 outline-none transition-all text-white font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">项目类别</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl focus:border-indigo-500/50 outline-none transition-all text-white font-medium appearance-none"
                >
                  <option className="bg-[#0d0d10]">空间 UI</option>
                  <option className="bg-[#0d0d10]">Web3 / 金融科技</option>
                  <option className="bg-[#0d0d10]">车载 HMI</option>
                  <option className="bg-[#0d0d10]">系统架构</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">视觉资产 (图片)</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group cursor-pointer relative aspect-video bg-white/5 rounded-[2rem] overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all flex items-center justify-center"
              >
                {formData.imageUrl ? (
                  <>
                    <img src={formData.imageUrl} alt="预览" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-white text-xs font-black tracking-widest uppercase">更换图片</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <svg className="w-8 h-8 text-white/20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    <span className="text-white/20 text-[10px] font-black tracking-widest uppercase">上传作品图片</span>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest">设计背景与策略</label>
                <button 
                  type="button"
                  onClick={handleAIWriter}
                  disabled={loadingAI}
                  className="flex items-center gap-2 text-[9px] font-black text-indigo-400 hover:text-indigo-300 transition-all bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20 disabled:opacity-50 tracking-widest"
                >
                  <svg className={`w-3 h-3 ${loadingAI ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  {loadingAI ? '处理中...' : '使用 AI 生成描述'}
                </button>
              </div>
              
              <textarea 
                required
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                placeholder="总结你的设计过程、挑战和成果..."
                className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl focus:border-indigo-500/50 outline-none transition-all resize-none text-white/70 text-sm leading-relaxed"
              />
              
              <div className="mt-4">
                <input 
                  type="text"
                  value={formData.keywords}
                  onChange={e => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                  placeholder="AI 提示词：无障碍、神经反馈、Web3..."
                  className="w-full px-4 py-2 bg-transparent border-b border-white/5 text-[11px] text-white/40 focus:text-white/80 focus:border-indigo-500/50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-8 flex gap-4">
              <button 
                type="submit"
                className="w-full py-5 bg-white text-black rounded-3xl font-black text-xs tracking-[0.3em] uppercase shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-indigo-50 transition-all transform hover:scale-[1.01] active:scale-95"
              >
                立即发布作品
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
