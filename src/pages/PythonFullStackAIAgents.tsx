import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SupportWidgets from "@/components/SupportWidgets";
import CountdownTimer from "@/components/CountdownTimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bot, Brain, Briefcase, MessageSquare, Rocket, Users,
  BookOpen, Mic, Award, Clock, CheckCircle2, ArrowRight,
  Mail, Phone, Star, GraduationCap, StarHalf, Shield, Zap,
  Target, Code, Database, Globe, Server, Container, GitBranch
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { sendInquiryEmail } from "@/lib/emailjs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const countryCodes = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
];

const StarRating = ({ rating = 4.5 }: { rating?: number }) => {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;
  return (
    <div className="flex items-center gap-1">
      {[...Array(full)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
      ))}
      {hasHalf && <StarHalf className="w-5 h-5 fill-accent text-accent" />}
      {[...Array(5 - full - (hasHalf ? 1 : 0))].map((_, i) => (
        <Star key={`e-${i}`} className="w-5 h-5 text-muted-foreground/30" />
      ))}
      <span className="ml-2 text-sm font-semibold text-foreground">{rating} / 5</span>
    </div>
  );
};

const PythonFullStackAIAgents = () => {
  const { toast } = useToast();
  const registrationRef = useRef<HTMLDivElement>(null);
  const curriculumRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [phoneCountry, setPhoneCountry] = useState("+91");
  const [whatsappCountry, setWhatsappCountry] = useState("+91");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    college: "",
    yearOfStudy: "",
    heardFrom: "",
    consent: false,
  });

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      toast({ title: "Please agree to be contacted", variant: "destructive" });
      return;
    }
    if (form.phone.replace(/\D/g, "").length !== 10) {
      toast({ title: "Phone must be 10 digits", variant: "destructive" });
      return;
    }

    const fullPhone = `${phoneCountry} ${form.phone}`;
    const fullWhatsapp = sameAsPhone ? fullPhone : `${whatsappCountry} ${form.whatsapp}`;

    setLoading(true);

    const payload = {
      full_name: form.fullName,
      email: form.email,
      phone: fullPhone,
      whatsapp_number: fullWhatsapp,
      college_name: form.college,
      year_of_study: form.yearOfStudy,
      heard_from: form.heardFrom,
      consent: form.consent,
    };

    try {
      let saved = false;

      try {
        const proxyRes = await fetch('/.netlify/functions/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (proxyRes.ok) {
          saved = true;
        }
      } catch {
        // fallback below
      }

      if (!saved) {
        const { error } = await supabase.from("registrations").insert(payload);
        if (error) {
          toast({ title: `Registration failed: ${error.message}`, variant: "destructive" });
          setLoading(false);
          return;
        }
        saved = true;
      }

      if (saved) {
        setSubmitted(true);
        setLoading(false);

        sendInquiryEmail({
          type: "Python Full Stack + AI Agents Program Registration",
          name: form.fullName,
          email: form.email,
          phone: fullPhone,
          company: form.college,
          message: `WhatsApp: ${fullWhatsapp}\nYear of Study: ${form.yearOfStudy}\nHeard From: ${form.heardFrom}`,
        }).catch(() => {});
      }
    } catch {
      toast({ title: "Registration failed. Please try again or contact us directly.", variant: "destructive" });
      setLoading(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Python Full Stack + AI Agents Program",
    description: "Master Python Full Stack Development with AI Agents in 10–14 weeks. Learn Python, FastAPI, Django, React, OpenAI APIs, LangChain. Built for B.Tech students.",
    provider: {
      "@type": "Organization",
      name: "Paramanu Consulting",
      url: "https://www.paramanuconsulting.com",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      duration: "P14W",
    },
  };

  const uspCards = [
    { icon: Bot, title: "AI Agents & LLMs", desc: "Build real AI agents with LangChain, OpenAI APIs, tool-use, and memory — not just theory." },
    { icon: Brain, title: "Think Like an Engineer", desc: "Problem-solving mindset, not syntax memorization. Debug, understand, and build." },
    { icon: Briefcase, title: "Career-Ready in 14 Weeks", desc: "Mock interviews, resume prep, and job assistance included." },
    { icon: MessageSquare, title: "Communication Skills", desc: "Dedicated module to ace tech interviews and workplace communication." },
    { icon: Rocket, title: "Full Stack + AI Projects", desc: "Capstone project with FastAPI + React + AI agents deployed live." },
    { icon: Users, title: "Expert Mentors", desc: "Industry professionals guiding every step of your journey." },
  ];

  const includedCards = [
    { icon: BookOpen, title: "Full Curriculum", desc: "10–14 weeks, covering Python to AI Agents" },
    { icon: Mic, title: "Mock Interviews", desc: "Technical + HR rounds with real feedback" },
    { icon: Briefcase, title: "Job Assistance", desc: "Resume, referrals, job portal access" },
    { icon: Bot, title: "AI Agent Projects", desc: "Build tool-using agents, campus help bots" },
  ];

  const curriculum = [
    {
      title: "Section 1: Python Programming Foundations",
      modules: [
        { name: "Module 1: Python Fundamentals", topics: "Variables, data types, input/output, conditions, loops, functions, scope, recursion, strings, slicing. Hands-on: Daily coding practice (10–15 problem sets), CLI student marks app" },
        { name: "Module 2: Data Structures & Problem Solving", topics: "List, tuple, set, dictionary, comprehensions, sorting & searching basics, time complexity intuition. Hands-on: Problem-solving drills, expense tracker with dictionary + file save" },
        { name: "Module 3: Advanced Python & OOP", topics: "Modules, packages, virtual environments, file handling (CSV, JSON), exception handling, logging, OOP (class, object, inheritance, polymorphism, abstraction), decorators, generators, iterators. Projects: Library management CLI, e-commerce OOP design" },
      ],
    },
    {
      title: "Section 2: PostgreSQL Basics",
      modules: [
        { name: "Module 4: PostgreSQL Essentials", topics: "Database concepts (tables, rows, columns, constraints), primary key, foreign key, relationships, SQL essentials (SELECT, WHERE, ORDER BY, GROUP BY), Joins (INNER, LEFT), schema design, basic indexing. Hands-on: Create Student/Batch tables, 20 SQL queries, join-based reports" },
      ],
    },
    {
      title: "Section 3: Django Crash Module",
      modules: [
        { name: "Django MVT Architecture", topics: "Project/app structure, settings, URLs, apps, templates. Django models + migrations + superuser. Admin setup (list_display, search_fields). CRUD pages with views + templates + ModelForm. ORM queries: filter(), icontains, order_by, ForeignKey traversal. Mini features: search box + batch-wise listing" },
      ],
    },
    {
      title: "Section 4: FastAPI Backend (Main Track)",
      modules: [
        { name: "Module 5: Backend APIs with FastAPI", topics: "FastAPI setup, routing, request/response models (Pydantic), CRUD APIs, validation, error handling, authentication basics (JWT intro), API testing with Postman & Swagger docs, clean code structure: routers, services, settings, env variables" },
        { name: "Module 6: FastAPI + PostgreSQL Integration", topics: "Integrate FastAPI with PostgreSQL (ORM approach), pagination, filtering, sorting, reporting endpoints (batch stats, attendance summary), logging and standard error responses. Hands-on: Build 3–5 reporting APIs, add search + pagination" },
      ],
    },
    {
      title: "Section 5: React Frontend",
      modules: [
        { name: "Module 7: React for API Apps", topics: "React setup, components, props, state, forms, validations, tables, dashboards, routing (React Router), API integration using fetch/axios, auth flow basics (token storage + protected routes). Screens: Login UI, Student list, Add/Edit forms, Batch dashboard" },
      ],
    },
    {
      title: "Section 6: AI Integration (OpenAI APIs + Prompt Engineering)",
      modules: [
        { name: "Module 8: OpenAI APIs + Prompt Engineering", topics: "LLM basics: tokens, temperature, context window. Calling OpenAI APIs from Python. Prompt patterns: role + constraints + output format. Few-shot prompting, structured outputs (JSON-first responses). Reliability: avoid guessing, handle 'not sure', basic retries. Latency/cost awareness. Hands-on: Build /ai/summarize, /ai/extract, /ai/classify endpoints + UI page" },
      ],
    },
    {
      title: "Section 7: AI Agents (LangChain Basics)",
      modules: [
        { name: "Module 9: Agents with Tools + Memory + Multi-Agent Intro", topics: "Chatbot vs Agent (agent loop: plan → tool → observe → respond). LangChain basics (LLM wrapper, prompt templates). Tools: calculator, notes-search, API tools. Memory: short-term conversation buffer. Guardrails: answer-from-notes rule, prompt injection awareness. Multi-agent pattern: supervisor routes to specialist agents. Projects: Tool-Using Agent, Campus Help Agent, mini supervisor with Career/Coding Tutor/FAQ agents" },
      ],
    },
  ];

  const timeline = [
    { weeks: "Weeks 1–3", title: "Python Foundations" },
    { weeks: "Weeks 4–5", title: "PostgreSQL & Database Design" },
    { weeks: "Weeks 6–7", title: "Django Crash + FastAPI Backend" },
    { weeks: "Weeks 8–9", title: "FastAPI + PostgreSQL Integration" },
    { weeks: "Weeks 10–11", title: "React Frontend + Full Stack" },
    { weeks: "Weeks 12–13", title: "AI Integration + Prompt Engineering" },
    { weeks: "Week 14", title: "AI Agents with LangChain" },
  ];

  const testimonials = [
    { name: "Priya S.", college: "JNTU Hyderabad", text: "The AI agents module was mind-blowing. I built a real working agent in just 2 days!", rating: 4.6 },
    { name: "Rahul K.", college: "VIT Vellore", text: "Learning FastAPI + React + AI together gave me a massive edge in interviews.", rating: 4.5 },
    { name: "Ananya M.", college: "SRM Chennai", text: "The mentors made sure I understood every concept deeply — especially the AI integration part.", rating: 4.4 },
  ];

  const skillBadges = [
    "Python", "FastAPI", "Django", "DRF", "React", "PostgreSQL", "OpenAI APIs",
    "LangChain", "Prompt Engineering", "AI Agents", "Pydantic", "JWT",
    "REST APIs", "Swagger", "Postman", "Git", "GitHub", "Docker",
    "JavaScript", "HTML5", "CSS3", "OOP", "SQL",
  ];

  const valueBreakdown = [
    { item: "Full Stack + AI Curriculum (10–14 weeks)", value: "₹15,000" },
    { item: "AI Agents & LangChain Module", value: "₹5,000" },
    { item: "Mock Interviews (Tech + HR)", value: "₹5,000" },
    { item: "Job Assistance & Referrals", value: "₹3,000" },
    { item: "Communication Skills Workshop", value: "₹2,000" },
    { item: "Live Mentorship & Support", value: "₹4,000" },
  ];

  const hiringPartners = [
    "TCS", "Infosys", "Wipro", "HCL Tech", "Tech Mahindra", "Cognizant",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Python Full Stack + AI Agents Program | Paramanu Consulting"
        description="Master Python Full Stack Development with AI Agents in 10–14 weeks. FastAPI, Django, React, OpenAI APIs, LangChain. Job assistance included. Built for B.Tech students."
        keywords="Python AI agents course, Python full stack AI course India, LangChain course, FastAPI course, Python bootcamp with AI, full stack developer program with AI, B.Tech Python training"
        url="https://www.paramanuconsulting.com/python-fullstack-ai-agents"
        structuredData={structuredData}
      />
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero hero-gradient-overlay" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="container relative z-10">
            <motion.div className="max-w-4xl mx-auto text-center" {...fadeInUp}>
              <div className="flex justify-center mb-6">
                <StarRating rating={4.5} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-gradient-primary">Python Full Stack + AI Agents</span> — Build the Future
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Go beyond coding — learn to <strong className="text-foreground">build AI-powered apps with agents, tools & memory</strong>. Python → FastAPI → React → OpenAI → LangChain. Built for B.Tech students.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Button variant="hero" size="xl" onClick={() => scrollTo(registrationRef)}>
                  Register Now — Seats Are Limited <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="heroOutline" size="xl" onClick={() => scrollTo(curriculumRef)}>
                  View Curriculum
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-muted-foreground">
                {["10–14 Weeks", "Live Mentorship", "Job Assistance", "AI Agents Module"].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why This Program */}
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div className="text-center mb-12" {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why This Program?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">What makes our program different from every other bootcamp out there.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {uspCards.map((card, i) => (
                <motion.div key={card.title} {...fadeInUp} transition={{ duration: 0.6, delay: i * 0.1 }}>
                  <Card className="h-full bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <card.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                      <p className="text-sm text-muted-foreground">{card.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container">
            <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12" {...fadeInUp}>What's Included</motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {includedCards.map((card, i) => (
                <motion.div key={card.title} {...fadeInUp} transition={{ duration: 0.6, delay: i * 0.1 }}>
                  <Card className="h-full bg-card border-primary/20 text-center">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <card.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                      <p className="text-sm text-muted-foreground">{card.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div className="text-center mb-10" {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills You'll Master</h2>
              <p className="text-muted-foreground">Technologies & tools covered in this program</p>
            </motion.div>
            <motion.div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto" {...fadeInUp}>
              {skillBadges.map((skill) => (
                <Badge key={skill} variant="outline" className="px-4 py-2 text-sm border-primary/40 text-foreground hover:bg-primary/10 transition-colors">
                  {skill}
                </Badge>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Curriculum */}
        <section ref={curriculumRef} className="py-16 md:py-24 bg-secondary/30 scroll-mt-24">
          <div className="container max-w-4xl">
            <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-4" {...fadeInUp}>What You'll Learn</motion.h2>
            <motion.p className="text-center text-muted-foreground mb-12" {...fadeInUp}>Complete Curriculum — 10 to 14 Weeks · 9 Modules · 7 Sections</motion.p>
            <motion.div {...fadeInUp}>
              <Accordion type="multiple" defaultValue={["track-0"]} className="space-y-3">
                {curriculum.map((track, i) => (
                  <AccordionItem key={i} value={`track-${i}`} className="border border-border/50 rounded-xl px-4 bg-card/50">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {i + 1}
                        </span>
                        {track.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Accordion type="multiple" defaultValue={i === 0 ? ["mod-0-0"] : []} className="space-y-2 pl-4">
                        {track.modules.map((mod, j) => (
                          <AccordionItem key={j} value={`mod-${i}-${j}`} className="border border-border/30 rounded-lg px-3 bg-background/50">
                            <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline py-3">
                              <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                {mod.name}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm text-muted-foreground pl-6">{mod.topics}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12" {...fadeInUp}>Program Timeline</motion.h2>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 -translate-x-1/2" />
              {timeline.map((phase, i) => (
                <motion.div
                  key={i}
                  className={`relative flex items-center mb-8 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  {...fadeInUp}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 z-10 shadow-glow" />
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}>
                    <Card className="bg-card border-border/50">
                      <CardContent className="p-4">
                        <span className="text-xs font-semibold text-primary">{phase.weeks}</span>
                        <h3 className="text-foreground font-semibold mt-1">{phase.title}</h3>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Breakdown */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container max-w-3xl">
            <motion.div className="text-center mb-10" {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Get for ₹25,000</h2>
              <p className="text-muted-foreground">Total value worth ₹34,000+ — all included in one program</p>
            </motion.div>
            <motion.div {...fadeInUp}>
              <Card className="bg-card border-primary/20 overflow-hidden">
                <CardContent className="p-0">
                  {valueBreakdown.map((item, i) => (
                    <div key={i} className={`flex items-center justify-between px-6 py-4 ${i < valueBreakdown.length - 1 ? "border-b border-border/30" : ""}`}>
                      <span className="flex items-center gap-3 text-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        {item.item}
                      </span>
                      <span className="text-sm font-semibold text-accent whitespace-nowrap">worth {item.value}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between px-6 py-4 bg-primary/10 border-t border-primary/20">
                    <span className="font-bold text-foreground text-lg">You Pay</span>
                    <span className="font-bold text-primary text-2xl">₹25,000</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div className="text-center mb-12 p-8 rounded-2xl bg-accent/10 border border-accent/30" {...fadeInUp}>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">🔥 Limited Seats Available — Next Batch Starting Soon</h2>
              <CountdownTimer targetDate="2026-05-01T00:00:00+05:30" />
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ duration: 0.6, delay: i * 0.1 }}>
                  <Card className="h-full bg-gradient-card border-border/50">
                    <CardContent className="p-6">
                      <StarRating rating={t.rating} />
                      <p className="text-muted-foreground text-sm mb-4 mt-3 italic">"{t.text}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.college}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hiring Partners */}
        <section className="py-12 bg-secondary/30">
          <div className="container">
            <motion.div className="text-center mb-8" {...fadeInUp}>
              <h3 className="text-xl font-semibold text-muted-foreground">Companies Our Students Target</h3>
            </motion.div>
            <motion.div className="flex flex-wrap items-center justify-center gap-8" {...fadeInUp}>
              {hiringPartners.map((company) => (
                <div key={company} className="px-6 py-3 rounded-lg border border-border/30 bg-card/50 text-muted-foreground text-sm font-medium">
                  {company}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 md:py-24">
          <div className="container max-w-lg">
            <motion.div {...fadeInUp}>
              <Card className="bg-card border-2 border-accent/50 overflow-hidden relative shadow-elevated">
                <div className="absolute top-0 right-0">
                  <div className="bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                    🤖 NEW — AI Agents
                  </div>
                </div>
                <div className="bg-secondary p-6 text-center border-b border-accent/20">
                  <h2 className="text-2xl font-bold text-foreground">Python Full Stack + AI Agents</h2>
                  <p className="text-muted-foreground text-sm">10–14 Week Bootcamp</p>
                  <StarRating rating={4.5} />
                </div>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-sm text-muted-foreground line-through">₹34,000</div>
                    <span className="text-5xl font-bold text-foreground">₹25,000</span>
                    <div className="text-sm text-accent font-semibold mt-1">Save ₹9,000 — Limited Time</div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {["Full Stack + AI Curriculum", "AI Agents with LangChain", "Mock Interviews (Tech + HR)", "Job Assistance & Referrals", "Communication Skills Workshop", "Live Mentorship & Capstone"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="hero" size="lg" className="w-full" onClick={() => scrollTo(registrationRef)}>
                    Register Now — Seats Are Limited
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-3">Payment details will be shared after registration confirmation</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Registration Form */}
        <section ref={registrationRef} id="register" className="py-16 md:py-24 bg-secondary/30 scroll-mt-24">
          <div className="container max-w-xl">
            <motion.div {...fadeInUp}>
              {submitted ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-foreground mb-3">🎉 You're Registered!</h2>
                  <p className="text-muted-foreground mb-2">We'll contact <strong className="text-foreground">{form.fullName}</strong> within 24 hours.</p>
                  <p className="text-sm text-muted-foreground mb-1">
                    A confirmation email has been sent to <strong className="text-foreground">{form.email}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    ✅ You'll also receive a WhatsApp message shortly from our team.
                  </p>
                  <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-6">
                    <p className="text-sm text-foreground font-medium">💬 Need help? Chat with us anytime using the chat widget below 👇</p>
                  </div>
                  <Button variant="outline" asChild>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent("I just registered for Python Full Stack + AI Agents Program at Paramanu Consulting! Check it out: https://www.paramanuconsulting.com/python-fullstack-ai-agents")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Share with a Friend 📤
                    </a>
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Register for Python Full Stack + AI Agents</h2>
                  <p className="text-center text-muted-foreground mb-8">🚀 Batch starting soon — limited seats available</p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input id="fullName" required maxLength={100} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Enter your full name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="flex items-center gap-2">
                        <Select value={phoneCountry} onValueChange={(v) => {
                          setPhoneCountry(v);
                          if (sameAsPhone) setWhatsappCountry(v);
                        }}>
                          <SelectTrigger className="w-[130px] shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((c) => (
                              <SelectItem key={`${c.flag}-${c.code}`} value={c.code}>
                                {c.flag} {c.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input id="phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} placeholder="9876543210" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="sameAsPhone" checked={sameAsPhone} onCheckedChange={(c) => {
                        setSameAsPhone(!!c);
                        if (c) setWhatsappCountry(phoneCountry);
                      }} />
                      <Label htmlFor="sameAsPhone" className="text-sm cursor-pointer">WhatsApp number same as phone</Label>
                    </div>
                    {!sameAsPhone && (
                      <div>
                        <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                        <div className="flex items-center gap-2">
                          <Select value={whatsappCountry} onValueChange={setWhatsappCountry}>
                            <SelectTrigger className="w-[130px] shrink-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {countryCodes.map((c) => (
                                <SelectItem key={`wa-${c.flag}-${c.code}`} value={c.code}>
                                  {c.flag} {c.code}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input id="whatsapp" required value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value.replace(/\D/g, "").slice(0, 10) })} placeholder="9876543210" />
                        </div>
                      </div>
                    )}
                    <div>
                      <Label htmlFor="college">College Name *</Label>
                      <Input id="college" required maxLength={200} value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} placeholder="Your college name" />
                    </div>
                    <div>
                      <Label>Year of Study *</Label>
                      <Select required onValueChange={(v) => setForm({ ...form, yearOfStudy: v })}>
                        <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                        <SelectContent>
                          {["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduated"].map((y) => (
                            <SelectItem key={y} value={y}>{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>How did you hear about us?</Label>
                      <Select onValueChange={(v) => setForm({ ...form, heardFrom: v })}>
                        <SelectTrigger><SelectValue placeholder="Select option" /></SelectTrigger>
                        <SelectContent>
                          {["Instagram", "LinkedIn", "Friend", "College", "Other"].map((o) => (
                            <SelectItem key={o} value={o}>{o}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="consent"
                        checked={form.consent}
                        onCheckedChange={(c) => setForm({ ...form, consent: !!c })}
                      />
                      <Label htmlFor="consent" className="text-sm cursor-pointer leading-snug">
                        I agree to be contacted by Paramanu Consulting regarding this program
                      </Label>
                    </div>
                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                      {loading ? "Submitting..." : "🚀 Register My Seat Now"}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-12 bg-primary/5 border-t border-border/50">
          <div className="container text-center">
            <p className="text-muted-foreground mb-4">Still have questions? We're happy to help.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:info@paramanuconsulting.com">
                  <Mail className="w-4 h-4 mr-2" /> info@paramanuconsulting.com
                </a>
              </Button>
              <Button variant="hero" size="lg" asChild>
                <a href="https://wa.me/917989359581" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4 mr-2" /> WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SupportWidgets
        userName={submitted ? form.fullName : undefined}
        userEmail={submitted ? form.email : undefined}
      />
    </div>
  );
};

export default PythonFullStackAIAgents;
