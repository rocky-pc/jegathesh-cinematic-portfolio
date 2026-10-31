"use client";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X, Smartphone, Globe, Code2, ExternalLink, Download } from "lucide-react";
import ShaderBackground from "./ShaderBackground";
import Services from "./components/Services";

const titles = ["Full-Stack Developer", "Software Engineer", "React Developer", "Python Developer", "Flutter Developer"];
const projects = [
 {n:"01",title:"Wellsee",type:"Mobile App · Product Development",desc:"Independently developed and published a mobile application, taking it from implementation through store release.",tags:["Flutter","Mobile Development","App Publishing"],link:"https://play.google.com/store/apps/details?id=in.co.wellsee",cta:"View on Google Play",tone:"lime"},
 {n:"02",title:"Digital Work Permit System",type:"HSE · Enterprise Web App",desc:"A digital workflow for work permits, designed to support safer, clearer permit management in industrial environments.",tags:["React","Flask","SQLite","AWS"],link:"https://work-permit.com",cta:"Visit project",tone:"blue"},
 {n:"03",title:"STOP Card Analysis",type:"Safety Analytics · Web Platform",desc:"A safety observation platform with a modern React interface and API-driven backend for analyzing STOP card data.",tags:["React","TypeScript","FastAPI","SQLite"],link:"https://1st-demo.assure.work",cta:"View platform",tone:"pink"},
 {n:"04",title:"Developer Portfolio",type:"Personal · Web Experience",desc:"A cinematic, responsive portfolio focused on projects, experience, and a clear path to get in touch.",tags:["Next.js","React","CSS","Vercel"],link:"https://github.com/rocky-pc/Portfolio-main",cta:"Source portfolio",tone:"orange"}
];
const skills = ["React","Next.js","JavaScript","TypeScript","Python","FastAPI","Flask","Node.js","Flutter","PHP","HTML & CSS","SQLite / MySQL","AWS","Git & GitHub","Vercel","Netlify"];

export default function Home(){
 const [menu,setMenu]=useState(false);
 const [displayText,setDisplayText]=useState("");
 const [titleIndex,setTitleIndex]=useState(0);
 const [deleting,setDeleting]=useState(false);
 useEffect(()=>{
  const current=titles[titleIndex];
  const delay=deleting?48:(displayText===current?1650:86);
  const timer=setTimeout(()=>{
   if(!deleting && displayText!==current) setDisplayText(current.slice(0,displayText.length+1));
   else if(!deleting) setDeleting(true);
   else if(displayText.length) setDisplayText(displayText.slice(0,-1));
   else {setDeleting(false);setTitleIndex(i=>(i+1)%titles.length);}
  },delay);
  return ()=>clearTimeout(timer);
 },[displayText,titleIndex,deleting]);
 useEffect(()=>{
  const nodes=document.querySelectorAll(".reveal");
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}
  }),{threshold:.12,rootMargin:"0px 0px -36px 0px"});
  nodes.forEach(node=>observer.observe(node));
  return ()=>observer.disconnect();
 },[]);
 return <main>
<header className="nav"><a className="brand" href="#home" aria-label="Jegathesh home">J<span>.</span></a><nav className={menu?"navlinks open":"navlinks"}><a href="#work" onClick={()=>setMenu(false)}>Work</a><a href="#about" onClick={()=>setMenu(false)}>About</a><a href="#skills" onClick={()=>setMenu(false)}>Skills</a><a href="#services" onClick={()=>setMenu(false)}>Services</a><a href="#explorations" onClick={()=>setMenu(false)}>Explorations</a><a href="/shop">Shop</a><a href="/login">Login</a><a href="#contact" onClick={()=>setMenu(false)}>Contact</a></nav><a className="navcta" href="mailto:sjega82@gmail.com">Let’s talk <ArrowUpRight size={16}/></a><button className="menubtn" aria-label="Toggle menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
<section className="hero hero-composed" id="home">
 <ShaderBackground/>
 <div className="hero-grid"></div>
 <div className="hero-content">
  <div className="eyebrow hero-eyebrow"><span className="pulse"></span> OPEN TO OPPORTUNITIES <span className="eyeline"></span> INDIA</div>
  <div className="hero-intro"><span className="intro-line"></span><span>HELLO, I’M</span></div>
  <h1 className="animated-name">JEGATHESH<span className="lime">.</span></h1>
  <div className="hero-role"><span className="role-prefix">I BUILD AS A</span><span className="typed-role">{displayText}<i className="typing-caret">|</i></span></div>
  <p className="hero-desc hero-composed-desc">A full stack developer turning ideas into useful digital products — from thoughtful web experiences to mobile applications. I independently built and published the Wellsee app.</p>
  <div className="hero-actions">
   <a className="hero-primary" href="https://raw.githubusercontent.com/rocky-pc/Portfolio-main/main/public/Jegathesh%20Resume.pdf" target="_blank" rel="noreferrer"><Download size={16}/> VIEW RESUME <ArrowUpRight size={15}/></a>
   <a className="hero-secondary" href="#contact">LET’S CONNECT <ArrowDownRight size={17}/></a>
  </div>
  <div className="store-links"><a href="https://play.google.com/store/apps/details?id=in.co.wellsee" target="_blank" rel="noreferrer"><span className="store-icon">▶</span> GOOGLE PLAY</a><a href="https://apps.apple.com/in/app/wellsee/id6746031430" target="_blank" rel="noreferrer"><span className="store-icon apple">●</span> APP STORE</a></div>
  <div className="hero-socials"><a href="https://github.com/rocky-pc" target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a><a href="https://linkedin.com/in/jegathesh-developer" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href="mailto:sjega82@gmail.com" aria-label="Email"><Mail/></a></div>
 </div>
 <div className="hero-side-note"><span>DESIGN</span><b>×</b><span>ENGINEER</span><b>×</b><span>SHIP</span></div>
 <a href="#work" className="hero-scroll"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={17}/></a>
 <div className="hero-index">PORTFOLIO / 2026</div>
</section>
<section className="ticker"><div>FULL STACK DEVELOPMENT <i>✳</i> MOBILE APPLICATIONS <i>✳</i> PRODUCT THINKING <i>✳</i> FULL STACK DEVELOPMENT <i>✳</i> MOBILE APPLICATIONS <i>✳</i></div></section>
<section className="section work" id="work"><div className="section-head reveal"><div><span className="kicker">01 / SELECTED WORK</span><h2>Things I’ve <em>built.</em></h2></div><span className="side-note">A few projects where code<br/>meets real-world needs.</span></div><div className="projects">{projects.map(p=><article className={"project "+p.tone+" reveal"} key={p.n}><div className="project-top"><span>/{p.n}</span><span>{p.type}</span></div><div className="project-art"><div className="art-orbit"></div><div className="art-core">{p.n==="01"?<Smartphone size={52}/>:p.n==="02"?<Globe size={52}/>:<Code2 size={52}/>}</div><span className="art-label">{p.title.toUpperCase()}</span><span className="art-index">J—{p.n}</span></div><div className="project-info"><div><h3>{p.title}</h3><p>{p.desc}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></div><a className="project-link" href={p.link} target="_blank" rel="noreferrer" aria-label={p.cta}><ArrowUpRight/></a></div><a className="text-link" href={p.link} target="_blank" rel="noreferrer">{p.cta} <ExternalLink size={13}/></a></article>)}</div></section>
<section className="explorations section" id="explorations"><div className="section-head reveal"><div><span className="kicker">02 / INTERACTIVE EXPERIMENTS</span><h2>Beyond the <em>interface.</em></h2></div><span className="side-note">A space for playful ideas,<br/>creative technology and interaction.</span></div><a className="exploration-feature reveal" href="https://wondersnap-by-jega.vercel.app/" target="_blank" rel="noreferrer" aria-label="Explore WonderSnap live experience"><div className="exploration-visual"><div className="exploration-grid"></div><div className="exploration-halo halo-one"></div><div className="exploration-halo halo-two"></div><div className="exploration-particle particle-one"></div><div className="exploration-particle particle-two"></div><div className="exploration-particle particle-three"></div><div className="exploration-particle particle-four"></div><div className="exploration-orb"><span>W</span></div><span className="exploration-visual-label">GESTURE / MOTION / PLAY</span><span className="exploration-visual-index">EXP—001</span></div><div className="exploration-copy"><div className="exploration-meta"><span>LIVE EXPERIMENT · 001</span><span className="live-indicator"><i></i> LIVE ON THE WEB</span></div><div><h3>WonderSnap<span>®</span></h3><p>An interactive 3D playground where hand gestures shape a living world of particles. Explore real-time hand tracking, responsive motion and immersive WebGL visuals.</p></div><div className="exploration-bottom"><div className="tags"><span>WebGL</span><span>Hand Tracking</span><span>3D Interaction</span></div><span className="exploration-cta">EXPLORE EXPERIENCE <span>↗</span></span></div></div></a><div className="exploration-foot reveal"><span>NOT JUST PROJECTS. LITTLE WORLDS TO EXPLORE.</span><span>OPEN THE EXPERIENCE ↗</span></div></section>
<section className="about section" id="about"><div className="section-head reveal"><div><span className="kicker">02 / A LITTLE ABOUT ME</span><h2>Curious mind.<br/><em>Builder’s mindset.</em></h2></div><span className="side-note">Cuddalore, Tamil Nadu<br/>Available for new opportunities</span></div><div className="about-grid reveal"><div className="about-number">IT<br/><span>’24</span></div><div className="about-copy"><p className="lead">I enjoy solving practical problems with clean code — from intuitive interfaces to reliable backend services.</p><p>I’m a B.Tech Information Technology graduate who has worked across web development, backend APIs, and mobile apps. I care about shipping useful products, learning quickly, and making technology easier to use.</p><p>One milestone I’m proud of is independently developing and publishing the Wellsee app on the app stores.</p><a className="download" href="https://raw.githubusercontent.com/rocky-pc/Portfolio-main/main/public/Jegathesh%20Resume.pdf" target="_blank" rel="noreferrer"><Download size={16}/> VIEW MY RESUME <ArrowUpRight size={16}/></a></div></div><div className="timeline reveal"><div><span>2025 — JUL 2026</span><h3>Full Stack Developer</h3><p>Wellsee Bundle Technology Pvt. Ltd. · Puducherry</p><small>Web and mobile product development</small></div><div><span>APR 2025 — NOV 2025</span><h3>Software Developer</h3><p>Assure Rig Safety Tech Solutions · Cuddalore</p><small>HSE platforms and safety-focused applications</small></div><div><span>SEP — DEC 2024</span><h3>Web & LaTeX Developer</h3><p>Integra Software Services</p><small>Web and document production workflows</small></div></div></section>
<section className="section skills" id="skills"><div className="section-head reveal"><div><span className="kicker">03 / MY TOOLKIT</span><h2>Tools of the <em>trade.</em></h2></div><span className="side-note">Always learning.<br/>Always building.</span></div><div className="skill-grid">{skills.map((s,i)=><div className="skill reveal" key={s}><span>{String(i+1).padStart(2,"0")}</span>{s}<ArrowUpRight size={15}/></div>)}</div></section>
<Services/>
<section className="contact section" id="contact"><span className="kicker">05 / HAVE A GOOD ONE IN MIND?</span><h2>LET’S MAKE<br/><span>IT HAPPEN.</span></h2><a className="contact-button" href="mailto:sjega82@gmail.com">START A CONVERSATION <ArrowUpRight/></a><div className="contact-meta"><p>For opportunities, collaborations, or just to talk tech.</p><div className="socials"><a href="mailto:sjega82@gmail.com" aria-label="Email"><Mail/></a><a href="https://github.com/rocky-pc" target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a><a href="https://linkedin.com/in/jegathesh-developer" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a></div></div></section>
<footer><a className="brand" href="#home">J<span>.</span></a><span>DESIGNED TO BUILD. BUILT TO LAST.</span><span>© {new Date().getFullYear()} JEGATHESH S</span></footer></main>
}
