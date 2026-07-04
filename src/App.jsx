import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, MapPin, Calendar, Code2, Zap, Rocket, Database, Cloud, GitBranch, Award, ArrowRight, ExternalLink, Sparkles, Menu, X, Github, Download } from 'lucide-react';

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [typedText, setTypedText] = useState('');
  const fullText = "Building Digital Experiences";
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) { setActiveSection(section); break; }
        }
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('scroll', handleScroll); };
  }, []);
  
  useEffect(() => {
    if (loading) return;
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) { setTypedText(fullText.slice(0, index)); index++; }
      else clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, [loading]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Loading Portfolio...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[100]">
        <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="fixed inset-0 opacity-30 pointer-events-none transition-all duration-300"
        style={{ background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)` }} />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-blue-500 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() * 0.5 }} />
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg animate-pulse">AC</div>
              <span className="font-semibold text-lg">Amlan Chahataray</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {['home', 'about', 'experience', 'projects', 'contact'].map((section) => (
                <button key={section} onClick={() => scrollToSection(section)}
                  className={`capitalize font-medium transition-all relative group ${activeSection === section ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}>
                  {section}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all ${activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </button>
              ))}
              <a href="https://drive.google.com/file/d/1T9L6fH1l01ruct8tGaRmjJqnIVZGuTzZ/view?usp=sharing" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105">
                <Download size={16} /><span className="text-sm">Resume</span>
              </a>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/5">
            <div className="px-6 py-4 space-y-4">
              {['home', 'about', 'experience', 'projects', 'contact'].map((section) => (
                <button key={section} onClick={() => scrollToSection(section)}
                  className="block w-full text-left capitalize font-medium py-2 text-gray-400 hover:text-white transition-colors">{section}</button>
              ))}
              <a href="https://drive.google.com/uc?export=download&id=1rQ2wqQgrGJY3NZ6RHcjELsHhYoEF1Sav" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg w-full justify-center">
                <Download size={16} /><span className="text-sm">Download Resume</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-24 pb-20 relative">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
                <div className="absolute inset-8 rounded-full border-2 border-purple-500/20" />
                <div className="absolute inset-16 rounded-full border-2 border-pink-500/20" />
              </div>
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1 group hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
                  <img src="https://lh3.googleusercontent.com/d/1-rM4x892vqa6d_gBvBaEZ3rlaF3a-uXG" alt="Amlan Chahataray"
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23667eea" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="80" fill="white"%3EAC%3C/text%3E%3C/svg%3E'; }} />
                </div>
              </div>
              <div className="absolute -right-4 top-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl px-4 py-3 shadow-2xl shadow-blue-500/50 hover:scale-110 transition-transform cursor-pointer">
                <div className="flex items-center gap-2">
                  <Code2 className="text-white" size={20} />
                  <div><div className="text-xs text-blue-200">Experience</div><div className="font-bold">3 Years</div></div>
                </div>
              </div>
              <div className="absolute -left-4 bottom-24 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl px-4 py-3 shadow-2xl shadow-purple-500/50 hover:scale-110 transition-transform cursor-pointer">
                <div className="flex items-center gap-2">
                  <Rocket className="text-white" size={20} />
                  <div><div className="text-xs text-purple-200">Projects</div><div className="font-bold">4+ Delivered</div></div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {typedText}<span className="animate-pulse">|</span>
                </span>
              </h1>
              <p className="text-lg text-gray-500">Software Developer</p>
            </div>
            <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
              I'm a passionate software developer specializing in <span className="text-blue-400 font-semibold">Python</span>, <span className="text-purple-400 font-semibold">Flask</span>, and <span className="text-pink-400 font-semibold">FastAPI</span>.
              With over 3 years of hands-on experience, I architect scalable web applications, design robust ETL pipelines, and integrate complex payment systems.
              I transform business requirements into elegant, high-performance solutions that drive real results.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('projects')}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-8 py-4 rounded-xl font-medium transition-all transform hover:scale-105">
                <Sparkles size={20} /><span>View Projects</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">About Me</span>
            </h2>
          </div>

          <div className="mb-16 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-10 md:p-16 hover:border-white/20 transition-all">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Code2 size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Professional Summary</h3>
                  <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                </div>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                I'm a results-driven <span className="text-blue-400 font-semibold">Software Developer</span> with 2.5 years of professional experience crafting scalable, high-performance web applications. My expertise lies in backend development using <span className="text-purple-400 font-semibold">Python</span>, with deep knowledge of <span className="text-pink-400 font-semibold">Flask</span>, <span className="text-pink-400 font-semibold">FastAPI</span>, and <span className="text-pink-400 font-semibold">Django</span>.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                I specialize in designing and implementing production-grade <span className="text-green-400 font-semibold">ETL pipelines</span> that process thousands of records daily, integrating sophisticated <span className="text-yellow-400 font-semibold">payment systems</span> like Stripe, and building robust <span className="text-cyan-400 font-semibold">RESTful APIs</span> that power enterprise applications.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                My approach combines technical excellence with business impact. Whether it's reducing processing time by 40% through RabbitMQ implementation or improving team productivity by 20% with custom task management solutions, I focus on delivering <span className="text-orange-400 font-semibold">measurable results</span> that drive organizational success.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-10 text-center">Technical Arsenal</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Backend Development', icon: Code2, color: 'from-blue-500 to-cyan-500', skills: ['Python', 'Flask', 'FastAPI', 'Django', 'Django REST'], description: 'Building scalable APIs and web services' },
                { title: 'Data Engineering', icon: Database, color: 'from-purple-500 to-pink-500', skills: ['ETL Pipelines', 'Pandas', 'NumPy', 'Data Migration'], description: 'Processing & transforming data at scale' },
                { title: 'Databases', icon: Database, color: 'from-green-500 to-emerald-500', skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'SQL'], description: 'Optimizing data storage & retrieval' },
                { title: 'Cloud & DevOps', icon: Cloud, color: 'from-orange-500 to-red-500', skills: ['AWS S3', 'Docker', 'GitHub', 'CI/CD'], description: 'Deploying & scaling applications' },
                { title: 'Workflow Automation', icon: Zap, color: 'from-yellow-500 to-orange-500', skills: ['n8n', 'Make', 'Zapier', 'Power Automate'], description: 'No-code/low-code automation platforms' },
                { title: 'Message Queues', icon: Rocket, color: 'from-cyan-500 to-blue-500', skills: ['RabbitMQ', 'Kafka', 'Celery', 'Async Processing'], description: 'Distributed task processing & queuing' },
                { title: 'Integrations', icon: GitBranch, color: 'from-pink-500 to-purple-500', skills: ['Stripe', 'Salesforce API', 'Microsoft Teams', 'REST APIs'], description: 'Connecting systems seamlessly' }
              ].map((category, idx) => (
                <div key={idx} className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon size={28} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{category.title}</h4>
                  <p className="text-sm text-gray-400 mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                      <span key={skill} className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education — FIXED: heading outside the grid */}
          <div>
            <div className="mb-20 text-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Education</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/40 transition-all hover:scale-105 cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="text-blue-400 group-hover:scale-110 transition-transform" size={28} />
                  <h4 className="text-2xl font-bold">Master of Computer Applications</h4>
                </div>
                <p className="text-lg text-gray-300 mb-2">Gandhi Institute for Technology</p>
                <p className="text-gray-500 flex items-center gap-2"><Calendar size={16} />2021 – 2023</p>
              </div>
              <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/40 transition-all hover:scale-105 cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="text-purple-400 group-hover:scale-110 transition-transform" size={28} />
                  <h4 className="text-2xl font-bold">Bachelor's Degree</h4>
                </div>
                <p className="text-lg text-gray-300 mb-2">Nachuni Mahavidyalaya</p>
                <p className="text-gray-500 flex items-center gap-2"><Calendar size={16} />2018 – 2021</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 bg-gradient-to-b from-transparent to-blue-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Professional Experience</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
            <div className="relative pl-24 space-y-8">
              <div className="group">
                <div className="absolute left-[26px] w-5 h-5 bg-blue-500 rounded-full border-4 border-black group-hover:scale-125 transition-transform" />
                <div className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-blue-500/50 transition-all hover:scale-[1.02]">
                  <div className="flex flex-wrap justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-blue-400 mb-2">Software Engineer</h3>
                      <p className="text-2xl text-white mb-3">DBI360</p>
                      <div className="flex items-center gap-4 text-gray-400">
                        <span className="flex items-center gap-2"><MapPin size={16} />Bhubaneswar, India</span>
                        <span className="flex items-center gap-2"><Calendar size={16} />Jul 2023 – Present</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { text: 'Architected and deployed production-grade ETL pipelines using Python, Pandas, and Boto3, processing 10,000+ records daily with automated data validation, transformation, and AWS S3 integration', impact: '30% efficiency improvement' },
                      { text: 'Built Flask-based task management application with JWT authentication and Microsoft Teams integration', impact: '25% faster task assignment' },
                      { text: 'Collaborated with Salesforce team to design and implement automated email campaign workflows, integrating Salesforce API with custom Python scripts for lead management and campaign tracking', impact: 'Automated workflows' },
                      { text: 'Automated country data normalization using Pycountry and Geopy', impact: '99% data accuracy across 50,000+ records' },
                      { text: 'Implemented RabbitMQ for queue-based bulk processing', impact: '40% reduction in processing time' },
                      { text: 'Managed data migrations across MongoDB, Elasticsearch, and SQL databases', impact: '100% data integrity for 5+ enterprise systems' }
                    ].map((a, idx) => (
                      <div key={idx} className="flex gap-4 group/item">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2 group-hover/item:scale-150 transition-transform" />
                        <div>
                          <p className="text-gray-300 leading-relaxed mb-1">{a.text}</p>
                          <span className="inline-block text-sm text-blue-400 font-semibold bg-blue-500/10 px-3 py-1 rounded-full hover:bg-blue-500/20 transition-colors">⚡ {a.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Featured Projects</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="group relative bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-blue-500/50 transition-all overflow-hidden hover:scale-[1.02] cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 transition-all duration-500" />
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">Task Management Application</h3>
                    <p className="text-gray-400 flex items-center gap-2"><Calendar size={16} />Jul 2023 – Present | DBI360</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all"><Rocket size={24} /></div>
                </div>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">Enterprise-grade task management solution serving 200+ users with real-time collaboration, role-based access control, and seamless Microsoft Teams integration. Boosted team productivity by 20%.</p>
                <div className="space-y-3 mb-6">
                  {['Engineered Flask-based application with MongoDB/SQL backends and JWT authentication', 'Developed priority-based filtering, deadline tracking, and automated SMTP email reminders', 'Built comprehensive analytics dashboard with task visualization and performance metrics', 'Integrated Microsoft Graph API for real-time Teams notifications and synchronization'].map((p, idx) => (
                    <div key={idx} className="flex gap-3"><div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-400 rounded-full mt-2" /><p className="text-gray-400 text-sm">{p}</p></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Flask', 'MongoDB', 'JWT', 'Microsoft Teams API', 'REST', 'SMTP'].map(tech => (
                    <span key={tech} className="text-xs px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-300 font-medium hover:bg-blue-500/20 transition-colors">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-purple-500/50 transition-all overflow-hidden hover:scale-[1.02] cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500" />
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">Nexus - Data E-commerce Platform</h3>
                    <p className="text-gray-400">Enterprise Solution</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all"><Database size={24} /></div>
                </div>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">Scalable data marketplace platform with integrated Stripe payments, credit-based purchasing, and advanced search capabilities. Reduced query response time by 45% through optimized architecture.</p>
                <div className="space-y-3 mb-6">
                  {['Built FastAPI-based platform with Stripe payment gateway and credit-based transactions', 'Developed secure payment workflow with real-time credit allocation and transaction tracking', 'Architected scalable backend using MongoDB for persistence and Redis for session caching', 'Integrated 100+ third-party APIs for automated data enrichment and validation'].map((p, idx) => (
                    <div key={idx} className="flex gap-3"><div className="flex-shrink-0 w-1.5 h-1.5 bg-purple-400 rounded-full mt-2" /><p className="text-gray-400 text-sm">{p}</p></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {['FastAPI', 'MongoDB', 'Redis', 'Stripe', 'REST API', 'OAuth'].map(tech => (
                    <span key={tech} className="text-xs px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-300 font-medium hover:bg-purple-500/20 transition-colors">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-gradient-to-b from-transparent to-blue-950/30">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Get In Touch</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Let's build something amazing together.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="mailto:amlanchahataray@gmail.com" className="group relative bg-gradient-to-br from-blue-600/20 to-blue-600/5 border border-blue-500/30 rounded-2xl p-8 hover:border-blue-500 transition-all hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all" />
              <div className="relative flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all"><Mail size={32} /></div>
                <div><h4 className="font-bold text-lg mb-1">Email</h4><p className="text-sm text-gray-400 break-all">amlanchahataray@gmail.com</p></div>
              </div>
            </a>
            <a href="tel:+919348173100" className="group relative bg-gradient-to-br from-green-600/20 to-green-600/5 border border-green-500/30 rounded-2xl p-8 hover:border-green-500 transition-all hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/0 to-green-600/0 group-hover:from-green-600/20 group-hover:to-emerald-600/20 transition-all" />
              <div className="relative flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all"><Phone size={32} /></div>
                <div><h4 className="font-bold text-lg mb-1">Phone</h4><p className="text-sm text-gray-400">+91-9348173100</p></div>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/amlan-chahataray-821a74231" target="_blank" rel="noopener noreferrer" className="group relative bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-400/30 rounded-2xl p-8 hover:border-blue-400 transition-all hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all" />
              <div className="relative flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all"><Linkedin size={32} /></div>
                <div><h4 className="font-bold text-lg mb-1">LinkedIn</h4><p className="text-sm text-gray-400">Let's connect</p></div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg">AC</div>
                <div><p className="font-bold text-lg">Amlan Chahataray</p><p className="text-sm text-gray-500">Software Developer</p></div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">Passionate software developer specializing in Python, Flask, and FastAPI. Building scalable solutions that drive real business impact.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
              <div className="space-y-2">
                {['home', 'about', 'experience', 'projects', 'contact'].map((section) => (
                  <button key={section} onClick={() => scrollToSection(section)} className="block text-gray-400 hover:text-blue-400 transition-colors capitalize text-sm">{section}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Contact Us</h4>
              <div className="space-y-3">
                <a href="mailto:amlanchahataray@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors"><Mail size={16} /></div>
                  <span className="text-sm">amlanchahataray@gmail.com</span>
                </a>
                <a href="tel:+919348173100" className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors group">
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors"><Phone size={16} /></div>
                  <span className="text-sm">+91-9348173100</span>
                </a>
                <div className="flex items-start gap-3 text-gray-400">
                  <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0"><MapPin size={16} /></div>
                  <span className="text-sm leading-relaxed">Bhubaneswar, Odisha<br />India - 751001</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <a href="https://www.linkedin.com/in/amlan-chahataray-821a74231" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 rounded-lg flex items-center justify-center transition-all hover:scale-110"><Linkedin size={18} /></a>
                <a href="https://github.com/Amlanchahataray" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 rounded-lg flex items-center justify-center transition-all hover:scale-110"><Github size={18} /></a>
                <a href="mailto:amlanchahataray@gmail.com" className="w-10 h-10 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/20 hover:border-pink-500/40 rounded-lg flex items-center justify-center transition-all hover:scale-110"><Mail size={18} /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
