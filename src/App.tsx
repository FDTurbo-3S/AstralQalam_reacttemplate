import React, { lazy, use, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hls from 'hls.js';
import { Check, X, ChevronDown, ArrowRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Data ---
const bentoCards = [
  { title: "Nexus Dashboard", sub: "Analytics & SaaS", span: "md:col-span-8", featured: true },
  { title: "Aura Portfolio", sub: "Creative Agency", span: "md:col-span-4", featured: false },
  { title: "Velocity Landing", sub: "High-conversion SaaS", span: "md:col-span-4", featured: false },
  { title: "Echo Blog", sub: "Editorial & Magazine", span: "md:col-span-8", featured: false },
  { title: "Prism E-commerce", sub: "Headless Shopify", span: "md:col-span-6", featured: false },
  { title: "Orbit Docs", sub: "Developer Documentation", span: "md:col-span-6", featured: false },
  { title: "Zenith App", sub: "Mobile-first Web App", span: "md:col-span-4", featured: false },
  { title: "Nova Startup", sub: "Y Combinator Style", span: "md:col-span-8", featured: false },
];

const steps = [
  { num: "01", title: "Choose your foundation", desc: "Select from 8 premium, meticulously crafted templates designed for modern stacks.", icon: "🎨" },
  { num: "02", title: "Customize with AI", desc: "Use Cursor, v0, or Lovable to adapt colors, copy, and layout to your brand in minutes.", icon: "⚡" },
  { num: "03", title: "Ship with confidence", desc: "Deploy instantly with optimized performance, SEO, and accessibility built-in.", icon: "🚀" },
];

const faqs = [
  { q: "Are these templates really AI-ready?", a: "Yes. Every component is structured with clear semantic HTML and Tailwind classes, making them perfect for AI coding assistants like Cursor or v0 to understand and modify." },
  { q: "What tech stack do these use?", a: "React, Next.js, Tailwind CSS, and Framer Motion. They are designed to be dropped into any modern React ecosystem." },
  { q: "Do I get lifetime updates?", a: "Absolutely. One payment grants you lifetime access to the template and all future minor updates." },
  { q: "Can I use this for client projects?", a: "Yes, the Standard and Custom tiers include a commercial license for unlimited client projects." },
  { q: "Is there a refund policy?", a: "Due to the digital nature of the product, we offer a 7-day refund policy if the template files are corrupted or fundamentally misaligned with the demo." },
  { q: "Do you offer custom development?", a: "Yes, our Custom tier includes 20 hours of dedicated development time to tailor the template exactly to your needs." },
  { q: "How do I access the files after purchase?", a: "You will receive an immediate email with a secure link to the GitHub repository or ZIP download." },
  { q: "Are the images included?", a: "We provide high-quality Unsplash placeholders. You will need to replace them with your own assets or licensed imagery." },
];

// --- Components ---

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-6xl font-display italic text-lime tracking-widest"
      >
        AQ
      </motion.div>
    </motion.div>
  );
};

const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const src = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"; // Abstract cinematic test stream

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => video.play().catch(() => {}));
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover opacity-40"    />
  );
};

const Hero = () => {
  return (
    <section className="relative h-[100svh] flex items-center justify-center overflow-hidden">
      <HeroVideo />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/40 to-obsidian" />
      
      {/* Dust Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="dust-particle" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 15}s`, animationDuration: `${10 + Math.random() * 10}s` }} />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="inline-block font-mono text-mono text-lime tracking-[0.4em] uppercase"
        >
          Templates · 2026
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.8 }}
          className="text-h1 font-sans font-semibold"
        >
          Ship a site that <br />
          <span className="font-display italic text-warm/80">doesn't feel like AI made it.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 0.8 }}
          className="text-body text-warm/64 max-w-2xl mx-auto"
        >
          8 premium templates. Cursor / v0 / Lovable ready. 
          Built for founders who refuse to compromise on design.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}          transition={{ delay: 3.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="group relative px-8 py-4 bg-lime text-obsidian font-medium rounded-2xl hover:scale-[1.02] transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-obsidian">
            Browse templates <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 glass text-warm font-medium rounded-2xl hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-obsidian">
            See the method
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const BentoGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bento-card", {
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-section px-6 max-w-7xl mx-auto" ref={gridRef}>
      <div className="mb-12">
        <h2 className="text-h2 font-sans font-semibold mb-4">Curated for impact</h2>
        <p className="text-body text-warm/64 max-w-xl">Every pixel intentional. Every interaction deliberate.</p>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        {bentoCards.map((card, i) => (
          <motion.div
            key={i}
            className={`bento-card group relative col-span-12 ${card.span} rounded-2xl glass overflow-hidden hover:-translate-y-1.5 transition-transform duration-300 cursor-pointer`}
            whileHover={{ scale: 1.01 }}
          >
            {card.featured && <div className="absolute inset-0 bg-gradient-to-br from-lime/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
            <div className="aspect-[16/10] bg-obsidian/50 relative overflow-hidden">
              <img 
                src={`https://images.unsplash.com/photo-${1550000000000 + i}?auto=format&fit=crop&w=800&q=80`}                 alt={card.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                loading="lazy"
              />
            {card.featured && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-lime text-obsidian text-mono font-medium rounded-full">
                FEATURED
              </div>
            )}
            </div>
            <div className="p-6">
              <h3 className="text-h3 font-sans font-medium mb-1">{card.title}</h3>
              <p className="text-body text-warm/64">{card.sub}</p>
            </div>
          </motion.div>
        ))}
      </div is="div">
    </section>
  );
};

const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".step-section") as HTMLElement[];
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + (containerRef.current?.offsetWidth || 1000),
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-obsidian overflow-hidden" ref={containerRef}>
      <div className="how-it-works-container h-screen flex items-center">
        <div className="flex w-[300vw]">
          {steps.map((step, i) => (
            <div key={i} className="step-section w-screen flex items-center justify-center px-6">
              <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className={`space-y-6 ${i % 2 === 1 ? 'md:order-2' : ''}`}>                  <span className="font-mono text-mono text-lime tracking-widest">{step.num}</span>
                  <h2 className="text-h2 font-sans font-semibold">{step.title}</h2>
                  <p className="text-body text-warm/64 max-w-md">{step.desc}</p>
                </div>
                <div className={`aspect-video rounded-2xl glass flex items-center justify-center text-8xl ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const tiers = [
    { name: "Express", price: "€297", features: ["1 Template License", "Personal Use Only", "Community Support", "Basic Documentation"], recommended: false },
    { name: "Standard", price: "€597", features: ["All 8 Templates", "Commercial License", "Priority Email Support", "Figma Source Files", "Lifetime Updates"], recommended: true },
    { name: "Custom", price: "€1,499", features: ["Everything in Standard", "20h Dedicated Dev Time", "Custom Brand Integration", "1-on-1 Onboarding Call", "White-label Options"], recommended: false },
  ];

  return (
    <section className="py-section px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-h2 font-sans font-semibold">Simple, transparent pricing</h2>
        <p className="text-body text-warm/64">All prices one-shot, no subscription.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier, i) => (
          <div 
            key={i} 
            className={`relative rounded-2xl p-8 flex flex-col ${tier.recommended ? 'glass border-2 border-lime shadow-[0_0_40px_-10px_rgba(212,255,79,0.2)]' : 'glass border border-border'}`}
          >
            {tier.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-lime text-obsidian text-mono font-medium rounded-full">
                MOST POPULAR
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-h3 font-sans font-medium mb-2">{tier.name}</h3>
              <div className="text-4xl font-display italic text-warm">{tier.price}</div>            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {tier.features.map((feat, j) => (
                <li key={j} className="flex items-start gap-3 text-body text-warm/80">
                  <Check className="w-5 h-5 text-lime flex-shrink-0 mt-0.5" />
                  {feat}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] ${tier.recommended ? 'bg-lime text-obsidian' : 'bg-white/5 text-warm hover:bg-white/10'}`}>
              Get {tier.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-section px-6 max-w-3xl mx-auto">
      <h2 className="text-h2 font-sans font-semibold mb-12 text-center">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="glass rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              className="w-full text-left flex justify-between items-center p-6 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime"
            >
              <span className="font-sans font-medium text-lg text-warm pr-4">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-warm/64 transition-transform duration-300 flex-shrink-0 ${openIndex === i ? 'rotate-180 text-lime' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-body text-warm/64 border-l-2 border-lime ml-6">
                    {faq.a}
                  </div>
                </motion.div>
              )}            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="relative py-section px-6 overflow-hidden bg-obsidian">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lime/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto text-center space-y-8 mb-16">
        <span className="inline-block font-mono text-mono text-lime tracking-[0.4em] uppercase">Ready to ship?</span>
        <h2 className="text-h1 font-sans font-semibold">
          Or still <span className="font-display italic text-warm/60">scrolling references?</span>
        </h2>
        <button className="group px-10 py-5 bg-lime text-obsidian font-medium text-lg rounded-2xl hover:scale-[1.02] transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-obsidian">
          Browse templates <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="relative overflow-hidden bg-surface border-y border-border py-6 select-none">
        <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-4xl md:text-6xl font-display italic text-warm/10 mx-8 flex items-center gap-4">
              BUILT WITH AI <span className="text-lime/40 text-2xl">✦</span> NOT BY AI
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border bg-obsidian">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <div className="text-3xl font-display italic text-lime">Astral Qalam</div>
          <p className="text-body text-warm/64 max-w-xs">
            Premium templates for founders who ship. Crafted with precision, optimized for performance.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-mono text-mono text-warm/64 uppercase tracking-widest">Product</h4>
          <ul className="space-y-2 text-body text-warm/80">            <li><a href="#" className="hover:text-lime transition-colors">Templates</a></li>
            <li><a href="#" className="hover:text-lime transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-lime transition-colors">Changelog</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-mono text-mono text-warm/64 uppercase tracking-widest">Legal</h4>
          <ul className="space-y-2 text-body text-warm/80">
            <li><a href="#" className="hover:text-lime transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-lime transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-lime transition-colors">License</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-mono text-warm/40">© 2026 Astral Qalam. All rights reserved.</p>
        <div className="flex gap-4">
          {/* Social placeholders */}
          <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center hover:border-lime transition-colors cursor-pointer" aria-label="Twitter">
            <span className="text-warm/60 text-xs">𝕏</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center hover:border-lime transition-colors cursor-pointer" aria-label="GitHub">
            <span className="text-warm/60 text-xs">GH</span>
          </div
          >
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---
function App() {
  return (
    <main className="bg-obsidian min-h-screen text-warm selection:bg-lime selection:text-obsidian">
      <Loader />
      <Hero />
      <BentoGrid />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

export default App;