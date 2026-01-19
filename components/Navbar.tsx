
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/40 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-center">
        <div className="flex items-center gap-12">
          <a href="#hero" className="text-white/60 hover:text-white font-medium transition-all text-sm tracking-[0.2em] uppercase">首页</a>
          <a href="#work" className="text-white/60 hover:text-white font-medium transition-all text-sm tracking-[0.2em] uppercase">作品项目</a>
          <a href="#about" className="text-white/60 hover:text-white font-medium transition-all text-sm tracking-[0.2em] uppercase">关于我</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
