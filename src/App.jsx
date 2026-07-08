import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, Linkedin, Figma, PenTool, Code, 
  Smartphone, MousePointer2, Terminal, ExternalLink, 
  Presentation, MonitorSmartphone, GraduationCap, BookOpen, 
  Users, Brush, Medal, Award, Instagram, Github, Mail
} from 'lucide-react';
import raneImg from './assets/rane.png';
import clubWebsiteImg from './assets/Club Website.PNG';
import resumePdf from './assets/Ranesh Guru S_BTech _(IT)_2026_7.8CGPA _UIUX_Designer,Graphic_Designer.pdf';

const WhatsAppIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Typing Effect Hook
const useTypingEffect = (words, typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer;
    const i = loopNum % words.length;
    const fullText = words[i];

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && text === fullText) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
};

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      const handleMouseMove = (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        if (cursorDotRef.current && cursorOutlineRef.current) {
          cursorDotRef.current.style.left = `${posX}px`;
          cursorDotRef.current.style.top = `${posY}px`;
          
          cursorOutlineRef.current.animate({
            left: `${posX}px`,
            top: `${posY}px`
          }, { duration: 150, fill: "forwards" });
        }
      };

      const handleMouseEnter = () => document.body.classList.add('cursor-hover');
      const handleMouseLeave = () => document.body.classList.remove('cursor-hover');

      window.addEventListener('mousemove', handleMouseMove);
      
      const hoverables = document.querySelectorAll('a, button, input, textarea, .hoverable');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        hoverables.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    }
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot hidden md:block"></div>
      <div ref={cursorOutlineRef} className="cursor-outline hidden md:block"></div>
    </>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const typedRole = useTypingEffect(["UI/UX Designer", "Graphic Designer", "Frontend Developer"]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="antialiased selection:bg-[var(--accent)] selection:text-[var(--accent-text)] relative bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen overflow-x-hidden font-sans">
      
      <style>{`
        :root {
          /* --- NETLIFY HEX CODES --- */
          --bg-main: #0a0a0a;         /* Main Background (Very Dark) */
          --bg-alt: #111111;          /* Alternate Section Background */
          --bg-card: #1a1a1a;         /* Cards and Project Backgrounds */
          
          --text-main: #ffffff;       /* Primary Text Color */
          --text-muted: #9ca3af;      /* Secondary/Paragraph Text */
          
          --accent: #ffffff;          /* Buttons, Highlights, Borders */
          --accent-text: #0a0a0a;     /* Text inside Accent Buttons */
          /* ------------------------------------------ */
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@500;700;800&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          cursor: none; 
          background-color: var(--bg-main);
        }
        
        h1, h2, h3, h4, h5, h6, .font-display {
          font-family: 'Syne', sans-serif;
        }

        .cursor-dot, .cursor-outline {
          position: fixed;
          top: 0; left: 0;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 9999;
          pointer-events: none;
        }
        .cursor-dot {
          width: 8px; height: 8px;
          background-color: var(--accent);
        }
        .cursor-outline {
          width: 40px; height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          transition: width 0.2s, height 0.2s, background-color 0.2s;
        }
        body.cursor-hover .cursor-outline {
          width: 60px; height: 60px;
          background-color: rgba(255, 255, 255, 0.1);
          border-color: transparent;
        }
        @media (hover: none) and (pointer: coarse) {
          body { cursor: auto; }
        }

        .text-gradient {
          background: linear-gradient(to right, #ffffff, #888888, #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }

        .typing-container::after {
          content: '|';
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
      `}</style>

      <CustomCursor />

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <header className={`fixed w-full top-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'}`} style={{ backgroundColor: isScrolled ? 'var(--bg-main)' : 'transparent' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <a href="#" className="flex flex-col hoverable group">
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-[var(--text-main)] group-hover:text-gray-300 transition-colors">
              Ranesh Guru S
            </span>
            <span className="text-[8px] md:text-[10px] font-medium text-[var(--text-muted)] tracking-widest uppercase mt-0.5">
              UI/UX Designer
            </span>
          </a>
          
          <nav className="hidden md:flex gap-8 items-center">
            {['About', 'Services', 'Work', 'Experience', 'Leadership'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors hoverable">
                {item}
              </a>
            ))}
            <a 
              href={resumePdf} 
              target="_blank" 
              rel="noreferrer" 
              className="px-5 py-2.5 rounded-full text-sm font-bold transition-all hoverable hover:opacity-90 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
              style={{ backgroundColor: '#ffffff', color: '#000000' }}
            >
              Hire Me
            </a>
          </nav>

          <button className="md:hidden text-[var(--text-main)] hoverable p-2 border border-white/10 rounded-full" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-[var(--bg-main)]/95 backdrop-blur-sm overflow-y-auto">
            <div className="relative max-w-lg mx-auto h-full px-6 py-8 sm:px-8 flex flex-col gap-8">
              <button className="absolute top-5 right-5 text-[var(--text-main)] hoverable p-2 rounded-full border border-white/10 bg-black/10" onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>

              <div className="mt-12 pt-2">
                {['About', 'Services', 'Work', 'Experience', 'Leadership'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-left text-2xl font-display font-semibold tracking-tight text-[var(--text-main)] py-3 border-b border-white/10 hover:text-[var(--accent)] transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>

              <div className="mt-auto">
                <a 
                  href={resumePdf} 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center w-full px-8 py-3 rounded-full font-semibold border border-[var(--accent)] text-[var(--accent)] bg-black/10 hover:bg-[var(--accent)] hover:text-[var(--accent-text)] transition-colors"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {}
      <section className="min-h-screen flex items-center justify-center pt-24 md:pt-20 px-4 md:px-6 relative">
        <div className="max-w-5xl mx-auto w-full flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6 animate-fade-in-up border border-white/20">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-[var(--text-muted)] tracking-wide uppercase">Open to Opportunities</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Hi, I'm Ranesh.<br />I specialize in <br />
              <span className="text-gradient typing-container min-h-[1.2em] inline-block">{typedRole}</span>
            </h1>
            
            <p className="text-[var(--text-muted)] text-base md:text-lg lg:text-xl max-w-lg mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              A dedicated UI/UX and Graphic Designer with a strong passion for creating intuitive digital experiences and visually engaging brand identities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a href="#work" className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all hoverable flex items-center justify-center sm:justify-start gap-2 group hover:opacity-80 text-sm sm:text-base" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}>
                Explore Work <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="https://www.linkedin.com/in/raneshguru" target="_blank" rel="noreferrer" className="px-6 sm:px-8 py-3 sm:py-4 rounded-full glass font-semibold hover:bg-white/10 transition-all hoverable flex items-center justify-center gap-2 text-[var(--text-main)] text-sm sm:text-base">
                <Linkedin className="w-4 sm:w-5 h-4 sm:h-5" /> Connect
              </a>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md animate-fade-in-up mt-10 md:mt-0" style={{ animationDelay: '0.4s' }}>
            <div className="relative w-full aspect-square rounded-3xl glass overflow-hidden group border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
              
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--bg-main)] to-transparent z-10 pointer-events-none"></div>
              
              <img 
                src={raneImg} 
                alt="Ranesh Guru" 
                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute top-8 right-8 z-20 glass p-3 rounded-2xl border border-white/20 text-[var(--text-main)] shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <Figma className="w-6 h-6" />
              </div>
              <div className="absolute bottom-12 left-8 z-20 glass p-3 rounded-2xl border border-white/20 text-[var(--text-main)] shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
                <Code className="w-6 h-6" />
              </div>
              <div className="absolute top-1/4 left-4 z-20 glass p-3 rounded-2xl border border-white/20 text-[var(--text-main)] shadow-xl animate-bounce flex items-center justify-center font-bold text-lg" style={{ animationDuration: '3.5s', width: '48px', height: '48px' }}>
                Ps
              </div>
              <div className="absolute bottom-1/3 right-6 z-20 glass p-3 rounded-2xl border border-white/20 text-[var(--text-main)] shadow-xl animate-bounce flex items-center justify-center font-bold text-lg" style={{ animationDuration: '4.5s', width: '48px', height: '48px' }}>
                Ai
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="services" className="py-16 md:py-24 px-4 md:px-6 relative" style={{ backgroundColor: 'var(--bg-alt)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 reveal">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">My <span className="text-gradient">Expertise</span></h2>
            <p className="text-[var(--text-muted)] text-sm md:text-base">Delivering comprehensive solutions from concept to deployment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="glass p-6 md:p-8 rounded-2xl reveal hoverable group border border-white/10 hover:border-white/30 transition-all">
              <div className="w-12 md:w-14 h-12 md:h-14 rounded-xl bg-white/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-white group-hover:text-[#111] transition-all duration-300 text-[var(--text-main)]">
                <Smartphone className="w-6 md:w-8 h-6 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">UI/UX Design</h3>
              <p className="text-[var(--text-muted)] text-xs md:text-sm leading-relaxed group-hover:text-white transition-colors">Designing intuitive, user-centric interfaces. I focus on creating seamless experiences through user research, wireframing, and interactive prototyping.</p>
            </div>
            
            <div className="glass p-6 md:p-8 rounded-2xl reveal delay-100 hoverable group border border-white/10 hover:border-white/30 transition-all">
              <div className="w-12 md:w-14 h-12 md:h-14 rounded-xl bg-white/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-white group-hover:text-[#111] transition-all duration-300 text-[var(--text-main)]">
                <MousePointer2 className="w-6 md:w-8 h-6 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Graphic Design</h3>
              <p className="text-[var(--text-muted)] text-xs md:text-sm leading-relaxed group-hover:text-white transition-colors">Crafting visually striking brand identities, digital assets, and marketing materials using industry-leading Adobe Creative Cloud tools.</p>
            </div>
            
            <div className="glass p-6 md:p-8 rounded-2xl reveal delay-200 hoverable group border border-white/10 hover:border-white/30 transition-all">
              <div className="w-12 md:w-14 h-12 md:h-14 rounded-xl bg-white/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-white group-hover:text-[#111] transition-all duration-300 text-[var(--text-main)]">
                <Terminal className="w-6 md:w-8 h-6 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Frontend Dev</h3>
              <p className="text-[var(--text-muted)] text-xs md:text-sm leading-relaxed group-hover:text-white transition-colors">Bringing designs to life with clean, responsive code. Specializing in HTML, CSS, JavaScript, and building cross-platform apps with React Native.</p>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="work" className="py-16 md:py-24 px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 reveal">
            <div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Featured Projects</h2>
              <p className="text-[var(--text-muted)] text-sm md:text-base">A showcase of problem-solving through design and code.</p>
            </div>
            <a href="https://www.linkedin.com/in/raneshguru" target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-2 hover:opacity-70 transition-colors mt-4 md:mt-0 hoverable text-[var(--text-main)]">
              View More on LinkedIn <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="group relative rounded-2xl overflow-hidden glass border border-white/10 reveal hoverable flex flex-col">
              <div className="aspect-video relative overflow-hidden" style={{ backgroundColor: 'var(--bg-card)' }}>
                <img src="https://placehold.co/800x600/111111/ffffff?text=Bloodlink+Platform" alt="Bloodlink App" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="p-5 md:p-8 relative flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-white/10 rounded border border-white/20">UI/UX</span>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-white/10 rounded border border-white/20">Web & Mobile</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-2">Bloodlink</h3>
                <p className="text-[var(--text-muted)] text-xs md:text-sm mb-4 md:mb-6 flex-1">A smart platform connecting blood donors and hospitals using real-time geolocation, tracking, and role-based access to ensure timely blood delivery.</p>
                <a href="#" className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold hover:opacity-70 transition-colors mt-auto">
                  View Case Study <ArrowRight className="w-3 md:w-4 h-3 md:h-4" />
                </a>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden glass border border-white/10 reveal delay-200 hoverable flex flex-col">
              <div className="aspect-video relative overflow-hidden" style={{ backgroundColor: 'var(--bg-card)' }}>
                <img src="https://placehold.co/800x600/151515/ffffff?text=Podcast+Plus" alt="Podcast Plus App" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="p-5 md:p-8 relative flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-white/10 rounded border border-white/20">React Native</span>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-white/10 rounded border border-white/20">Redux</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-2">Podcast Plus</h3>
                <p className="text-[var(--text-muted)] text-xs md:text-sm mb-4 md:mb-6 flex-1">A custom podcast player built with React Native. Features an interactive UI, playback controls, theme customization, and smooth navigation.</p>
                <a href="#" className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold hover:opacity-70 transition-colors mt-auto">
                  View Project <ArrowRight className="w-3 md:w-4 h-3 md:h-4" />
                </a>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden glass border border-white/10 reveal hoverable flex flex-col">
              <div className="aspect-video relative overflow-hidden" style={{ backgroundColor: 'var(--bg-card)' }}>
                <img src={clubWebsiteImg} alt="RACCUG Official Website" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="p-5 md:p-8 relative flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-white/10 rounded border border-white/20">Web Design</span>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-white/10 rounded border border-white/20">HTML/CSS/JS</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-2">Rotaract Club of Covai User Group Official Site</h3>
                <p className="text-[var(--text-muted)] text-xs md:text-sm mb-4 md:mb-6 flex-1">A responsive and interactive platform developed to showcase community projects, activities, and events for the Rotaract Club of Covai User Group.</p>
                <a href="https://raccug.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold hover:opacity-70 transition-colors mt-auto">
                  Visit Live Site <ArrowRight className="w-3 md:w-4 h-3 md:h-4" />
                </a>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden glass border border-white/10 reveal delay-200 hoverable flex flex-col">
              <div className="aspect-video relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: 'var(--bg-card)' }}>
                <img src="https://placehold.co/800x600/2a2a2a/ffffff?text=Chatbot+Interface" alt="Chatbot UI" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="p-5 md:p-8 relative flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-white/10 rounded border border-white/20">UI Development</span>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-white/10 rounded border border-white/20">JavaScript</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-2">Interactive Chatbot UI</h3>
                <p className="text-[var(--text-muted)] text-xs md:text-sm mb-4 md:mb-6 flex-1">Designed and developed a responsive chatbot layout simulating real-time conversation flow, focusing heavily on seamless user interaction.</p>
                <a href="#" className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold hover:opacity-70 transition-colors mt-auto">
                  View Details <ArrowRight className="w-3 md:w-4 h-3 md:h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="experience" className="py-16 md:py-24 px-4 md:px-6 relative" style={{ backgroundColor: 'var(--bg-alt)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16 reveal">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Professional <span className="text-gradient">Journey</span></h2>
            <p className="text-[var(--text-muted)] text-sm md:text-base">My trajectory in design, education, and development.</p>
          </div>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group reveal">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-[var(--text-main)]" style={{ backgroundColor: 'var(--bg-alt)' }}>
                <Presentation className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl hoverable border border-white/5 hover:border-white/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="font-bold text-lg">UI/UX Design Educator</h3>
                  <time className="text-xs font-bold uppercase tracking-wider mt-1 sm:mt-0 px-2 py-1 bg-white/10 rounded">Aug 2025 - Present</time>
                </div>
                <h4 className="text-sm font-medium mb-3">Hana Techno Studio</h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed group-hover:text-white transition-colors">Appointed to train students and beginners in UI/UX design, prototyping, and design tools, helping them develop practical skills and real-world project experience.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group reveal delay-100">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-[var(--text-main)]" style={{ backgroundColor: 'var(--bg-alt)' }}>
                <MonitorSmartphone className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl hoverable border border-white/5 hover:border-white/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="font-bold text-lg">UI/UX Designer Intern</h3>
                  <time className="text-xs font-bold uppercase tracking-wider mt-1 sm:mt-0 px-2 py-1 bg-white/10 rounded">June 2025 - Present</time>
                </div>
                <h4 className="text-sm font-medium mb-3">Bhogan Mediasoft</h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed group-hover:text-white transition-colors">Developed user-focused mobile applications enhancing engagement by 25%. Implemented cleaner interfaces for a smoother navigation experience.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group reveal delay-200">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-[var(--text-main)]" style={{ backgroundColor: 'var(--bg-alt)' }}>
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl hoverable border border-white/5 hover:border-white/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="font-bold text-lg">B.Tech - Info Tech</h3>
                  <time className="text-xs font-bold uppercase tracking-wider mt-1 sm:mt-0 px-2 py-1 bg-white/10 rounded">2022 - 2026</time>
                </div>
                <h4 className="text-sm font-medium mb-3">Info Institute of Engineering</h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed group-hover:text-white transition-colors">Focused on UI/UX Design, App Development, and Graphic Designing. Participated in Smart India Hackathon 2025 developing real-world solutions.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group reveal delay-300">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-[var(--text-main)]" style={{ backgroundColor: 'var(--bg-alt)' }}>
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl hoverable border border-white/5 hover:border-white/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="font-bold text-lg">Founder & Director</h3>
                  <time className="text-xs font-bold uppercase tracking-wider mt-1 sm:mt-0 px-2 py-1 bg-white/10 rounded">2022 - Present</time>
                </div>
                <h4 className="text-sm font-medium mb-3">Info Saga (College Magazine)</h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed group-hover:text-white transition-colors">Established and direct the college's official magazine. Responsible for overseeing the editorial process, visual design, layout, and managing the creative team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="leadership" className="py-16 md:py-24 px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 reveal">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Leadership & <span className="text-gradient">Impact</span></h2>
            <p className="text-[var(--text-muted)] text-sm md:text-base">Awards and community leadership roles I am proud of.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="glass border border-white/10 p-6 md:p-8 rounded-2xl reveal hoverable flex flex-col justify-between hover:border-white/30 transition-all group">
              <div>
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-white group-hover:text-[#111] transition-colors text-[var(--text-main)]">
                  <Users className="w-5 md:w-6 h-5 md:h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3">Club Leadership</h3>
                <p className="text-[var(--text-muted)] text-xs md:text-sm leading-relaxed mb-4 md:mb-6 group-hover:text-white">Serving as <strong>President</strong> (2025-26) and former International Service Director for the Rotaract Club of Covai User Group, driving impactful community initiatives.</p>
              </div>
              <div className="pt-3 md:pt-4 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider">Best Board Member Award</span>
              </div>
            </div>

            <div className="glass border border-white/10 p-8 rounded-2xl reveal delay-100 hoverable flex flex-col justify-between hover:border-white/30 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-[#111] transition-colors text-[var(--text-main)]">
                  <Brush className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Design & Campus Lead</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 group-hover:text-white">Acting as <strong>UI/UX Designer Lead</strong> for GDG On Campus and <strong>Director & Founder</strong> of Info Saga (College Official Magazine).</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider">Design Leadership</span>
              </div>
            </div>

            <div className="glass border border-white/10 p-8 rounded-2xl reveal delay-200 hoverable flex flex-col justify-between hover:border-white/30 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-[#111] transition-colors text-[var(--text-main)]">
                  <Medal className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Academic Excellence</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 group-hover:text-white">Consistently recognized for commitment, maintaining 100% attendance, and receiving the <strong>Administrator of the Year Award</strong> (As I Evolve 2024-25).</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider">Special Recognition Award</span>
              </div>
            </div>

            <div className="glass border border-white/10 p-8 rounded-2xl reveal hoverable flex flex-col justify-between hover:border-white/30 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-[#111] transition-colors text-[var(--text-main)]">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">DRR Special Recognition</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 group-hover:text-white">Awarded for outstanding service and dedication during the Rotary years 2024-25 and 2025-26, recognizing exceptional leadership and contribution from PDRR - Rtr. Thangapandiyan & IPDRR - Rtr. MPHF. Gogul R.</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider">Rotary District 3201 & 3206</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="contact" className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-alt)' }}>
        <div className="max-w-4xl mx-auto glass border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-16 relative z-10 reveal">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Let's build something <br /> <span className="text-gradient">extraordinary.</span></h2>
            <p className="text-[var(--text-muted)] text-sm md:text-base">Feel free to reach out for collaborations or opportunities.</p>
            <a href="mailto:raneshguru2005@gmail.com" className="inline-block mt-4 font-semibold border-b border-white hover:opacity-70 transition-colors pb-1">raneshguru2005@gmail.com</a>
          </div>

          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="name" className="block text-xs md:text-sm font-medium text-[var(--text-muted)] mb-2">Name</label>
                <input type="text" id="name" required className="w-full bg-white/5 border border-white/20 rounded-lg md:rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base focus:outline-none focus:border-white transition-colors hoverable text-[var(--text-main)]" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs md:text-sm font-medium text-[var(--text-muted)] mb-2">Email</label>
                <input type="email" id="email" required className="w-full bg-white/5 border border-white/20 rounded-lg md:rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base focus:outline-none focus:border-white transition-colors hoverable text-[var(--text-main)]" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs md:text-sm font-medium text-[var(--text-muted)] mb-2">Message</label>
              <textarea id="message" rows="4" required className="w-full bg-white/5 border border-white/20 rounded-lg md:rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base focus:outline-none focus:border-white transition-colors hoverable resize-none text-[var(--text-main)]" placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="submit" className="w-full py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:opacity-80 transition-colors hoverable" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}>
              Send Message
            </button>
          </form>
          
          {showSuccess && (
            <div className="mt-6 p-4 rounded-xl bg-white/10 border border-white/30 text-center font-medium animate-fade-in-up">
              Thanks for reaching out! I'll get back to you soon.
            </div>
          )}
        </div>
      </section>

      {}
      <footer className="border-t border-white/10 py-8 md:py-12 px-4 md:px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <p className="text-[var(--text-muted)] text-xs md:text-sm">&copy; 2026 Ranesh Guru S. All rights reserved.</p>
            <p className="text-[var(--text-muted)] text-xs mt-1">UI/UX Designer, Graphic Designer & Frontend Developer</p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/raneshguru/" 
              target="_blank" 
              rel="noreferrer" 
              title="LinkedIn"
              className="w-11 h-11 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white hover:text-[#111] flex items-center justify-center text-[var(--text-main)] transition-all duration-300 hoverable hover:-translate-y-1 shadow-lg"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/raneshguru" 
              target="_blank" 
              rel="noreferrer" 
              title="GitHub"
              className="w-11 h-11 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white hover:text-[#111] flex items-center justify-center text-[var(--text-main)] transition-all duration-300 hoverable hover:-translate-y-1 shadow-lg"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/ranesh_guru/" 
              target="_blank" 
              rel="noreferrer" 
              title="Instagram"
              className="w-11 h-11 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white hover:text-[#111] flex items-center justify-center text-[var(--text-main)] transition-all duration-300 hoverable hover:-translate-y-1 shadow-lg"
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/917397531613" 
              target="_blank" 
              rel="noreferrer" 
              title="WhatsApp"
              className="w-11 h-11 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white hover:text-[#111] flex items-center justify-center text-[var(--text-main)] transition-all duration-300 hoverable hover:-translate-y-1 shadow-lg"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>

            {/* Mail */}
            <a 
              href="mailto:raneshguru2005@gmail.com" 
              title="Email Me"
              className="w-11 h-11 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white hover:text-[#111] flex items-center justify-center text-[var(--text-main)] transition-all duration-300 hoverable hover:-translate-y-1 shadow-lg"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}