import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SupportWidgets from "@/components/SupportWidgets";
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

// Country codes
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

// Star rating component
const StarRating = ({ rating = 4.4 }: { rating?: number }) => {
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
      <span className="text-xs text-muted-foreground ml-1">• Based on 120+ students</span>
    </div>
  );
};

const PythonFullStack = () => {
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
    try {
      console.log('📤 Submitting registration...');
      
      // Step 1: Save to database FIRST
      const { data, error } = await supabase.from("registrations").insert({
        full_name: form.fullName,
        email: form.email,
        phone: fullPhone,
        whatsapp_number: fullWhatsapp,
        college_name: form.college,
        year_of_study: form.yearOfStudy,
        heard_from: form.heardFrom,
        consent: form.consent,
      }).select();
      
      if (error) {
        console.error("❌ Supabase insert error:", error.code, error.message, error.details);
        toast({ title: `Registration failed: ${error.message}`, variant: "destructive" });
        setLoading(false);
        return;
      }

      console.log('✅ Registration saved:', data);

      // Step 2: Registration saved — show success immediately
      setSubmitted(true);
      setLoading(false);

      // Step 3: Send admin email in background — failure does NOT affect user
      sendInquiryEmail({
        type: "Python Full Stack Program Registration",
        name: form.fullName,
        email: form.email,
        phone: fullPhone,
        company: form.college,
        message: `WhatsApp: ${fullWhatsapp}\nYear of Study: ${form.yearOfStudy}\nHeard From: ${form.heardFrom}`,
      }).catch(emailErr => {
        console.warn("⚠️ Admin email failed (registration still saved):", emailErr);
      });
    } catch (err) {
      console.error("❌ Network/fetch error:", err);
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast({ title: `Network error: ${msg}. Please check your connection and try again.`, variant: "destructive" });
      setLoading(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Python Full Stack Developer Program",
    description: "Become a Python Full Stack Developer in 4 months. Live mentorship, job assistance, mock interviews. Built for B.Tech students ready to get hired.",
    provider: {
      "@type": "Organization",
      name: "Paramanu Consulting",
      url: "https://www.paramanuconsulting.com",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      duration: "P4M",
    },
  };

  const uspCards = [
    { icon: Bot, title: "AI-First Learning", desc: "We don't just teach you to write code. We teach you to understand, debug, and leverage AI tools like a real developer." },
    { icon: Brain, title: "Think Like an Engineer", desc: "Problem-solving mindset, not syntax memorization." },
    { icon: Briefcase, title: "Career-Ready in 4 Months", desc: "Mock interviews, resume prep, and job assistance included." },
    { icon: MessageSquare, title: "Communication Skills", desc: "Dedicated 2–4 hour module to ace tech interviews and workplace communication." },
    { icon: Rocket, title: "Build & Deploy Real Projects", desc: "Capstone project deployed live with GitHub + Docker." },
    { icon: Users, title: "Expert Mentors", desc: "Industry professionals guiding every step." },
  ];

  const includedCards = [
    { icon: BookOpen, title: "Full Curriculum", desc: "15–18 weeks, 120–150 hours of live instruction" },
    { icon: Mic, title: "Mock Interviews", desc: "Technical + HR rounds with real feedback" },
    { icon: Briefcase, title: "Job Assistance", desc: "Resume, referrals, job portal access" },
    { icon: MessageSquare, title: "Communication Skills", desc: "2–4 hours dedicated workshop" },
  ];

  // Full detailed curriculum
  const curriculum = [
    {
      title: "Track 1: Python Programming Foundations",
      modules: [
        { name: "Module 1: Python Fundamentals", topics: "Variables, data types, input/output, conditions, loops, functions, scope, recursion, strings, slicing" },
        { name: "Module 2: Data Structures & Problem Solving", topics: "Lists, tuples, sets, dictionaries, comprehensions, sorting, searching, time complexity intuition" },
        { name: "Module 3: Advanced Python & OOP", topics: "Modules, packages, virtual environments, file handling (CSV, JSON), exception handling, logging, OOP (class, object, inheritance, polymorphism, abstraction), decorators, generators, iterators" },
      ],
    },
    {
      title: "Track 2: Frontend Development",
      modules: [
        { name: "Module 4: HTML5 & CSS3", topics: "Semantic HTML, Flexbox, CSS Grid, responsive design, forms, front-end validations. Projects: Portfolio page, Landing page, Login/Registration UI" },
        { name: "Module 5: JavaScript ES6+", topics: "DOM manipulation, events, event delegation, Fetch API, Promises, async/await, LocalStorage. Projects: Quiz app, To-do app" },
        { name: "Module 6: React Fundamentals", topics: "React setup, components, props, state, hooks (useState, useEffect), React Router, forms, API calls with fetch/axios. Project: Student dashboard UI" },
      ],
    },
    {
      title: "Track 3: Database",
      modules: [
        { name: "Module 7: PostgreSQL", topics: "Database basics, tables, keys, DDL/DML/DQL, filtering, sorting, grouping, INNER/LEFT/RIGHT joins, subqueries, constraints, normalization, indexes, performance basics. Hands-on: LMS schema design, 30–40 SQL queries" },
      ],
    },
    {
      title: "Track 4: Backend — Django & REST APIs",
      modules: [
        { name: "Module 8: Django Core", topics: "Django setup, apps, settings, URLs, MVT architecture, models, migrations, admin panel, templates" },
        { name: "Module 9: Django ORM Deep Dive", topics: "QuerySets, filtering, ordering, One-to-One/ForeignKey/Many-to-Many relationships, select_related, prefetch_related, validation" },
        { name: "Module 10: REST APIs with Django REST Framework", topics: "Serializers, ModelSerializer, APIView, generic views, ViewSets, pagination, filtering, permissions, JWT authentication, CORS, Swagger API docs" },
        { name: "Module 11: Full Stack Integration", topics: "React auth flow with JWT, protected routes, API error handling, loading states, pagination UI, form validations, environment config. End-to-end flows: login, create batch, enroll student, mark attendance, view reports" },
      ],
    },
    {
      title: "Track 5: DevOps & Deployment",
      modules: [
        { name: "Module 12: Professional Tools", topics: "Git & GitHub, branching, PR workflow, README writing, Postman API testing. Each student maintains a GitHub repo with weekly PR submissions" },
        { name: "Module 13: Docker & Deployment", topics: "Docker basics, Dockerfile for backend, Docker Compose for Django + PostgreSQL, environment variables, deployment on Render/Railway/AWS EC2, Nginx basics, CI/CD with GitHub Actions" },
      ],
    },
    {
      title: "Capstone Projects (Pick 1)",
      modules: [
        { name: "🎓 Student LMS", topics: "Batches, courses, attendance, tests, role-based access, reports dashboard" },
        { name: "💼 Placement Portal", topics: "Company posts, student profiles, resume upload, applications, admin approval" },
        { name: "🛒 E-Commerce Mini Platform", topics: "Products, cart, orders, admin panel, payment integration demo" },
        { name: "💰 Personal Finance Tracker", topics: "Income/expense, categories, monthly reports, charts" },
      ],
      note: "Capstone must include: JWT auth, PostgreSQL schema, 10+ APIs, React UI with routing, live deployment link, Docker (recommended)",
    },
  ];

  const timeline = [
    { weeks: "Weeks 1–4", title: "Python Foundations" },
    { weeks: "Weeks 5–7", title: "Frontend (HTML/CSS/JS/React)" },
    { weeks: "Weeks 8–9", title: "PostgreSQL & Database Design" },
    { weeks: "Weeks 10–13", title: "Django + DRF + APIs" },
    { weeks: "Weeks 14–15", title: "React + Full Stack Integration" },
    { weeks: "Weeks 16–18", title: "Docker + Deployment + Capstone" },
  ];

  // TODO: Replace with real testimonials
  const testimonials = [
    { name: "Priya S.", college: "JNTU Hyderabad", text: "This program transformed my career. I went from zero coding knowledge to getting placed in 3 months after completion!", rating: 4.5 },
    { name: "Rahul K.", college: "VIT Vellore", text: "The AI-first approach and real project experience made me stand out in interviews. Highly recommend!", rating: 4.4 },
    { name: "Ananya M.", college: "SRM Chennai", text: "The mentors were incredible. They didn't just teach — they made sure I understood every concept deeply.", rating: 4.3 },
  ];

  const skillBadges = [
    "Python", "Django", "DRF", "React", "PostgreSQL", "Docker", "Git", "JWT",
    "REST APIs", "Swagger", "Postman", "AWS", "Nginx", "JavaScript", "HTML5",
    "CSS3", "OOP", "GitHub Actions", "CI/CD", "Linux", "JSON", "SQL",
  ];

  const valueBreakdown = [
    { item: "Full Stack Curriculum (120–150 hrs)", value: "₹12,000" },
    { item: "Mock Interviews (Tech + HR)", value: "₹5,000" },
    { item: "Job Assistance & Referrals", value: "₹3,000" },
    { item: "Communication Skills Workshop", value: "₹2,000" },
    { item: "Live Mentorship & Support", value: "₹4,000" },
    { item: "Capstone Project Guidance", value: "₹3,000" },
  ];

  // TODO: Replace with actual hiring partner logos
  const hiringPartners = [
    "TCS", "Infosys", "Wipro", "HCL Tech", "Tech Mahindra", "Cognizant",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Python Full Stack Developer Program | Paramanu Consulting"
        description="Become a Python Full Stack Developer in 4 months. Live mentorship, job assistance, mock interviews. Built for B.Tech students ready to get hired."
        url="https://www.paramanuconsulting.com/python-full-stack"
        structuredData={structuredData}
      />
      <Header />
      <main className="pt-20">
        {/* SECTION 1: Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero hero-gradient-overlay" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="container relative z-10">
            <motion.div className="max-w-4xl mx-auto text-center" {...fadeInUp}>
              <div className="flex justify-center mb-6">
                <StarRating rating={4.4} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Become a <span className="text-gradient-primary">Python Full Stack Developer</span> in 4 Months
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Not just coding — learn to <strong className="text-foreground">READ, UNDERSTAND & DEBUG</strong> code in the AI era. Built for B.Tech students ready to get hired.
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
                {["120–150 Hours", "Live Mentorship", "Job Assistance", "Mock Interviews"].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: Why This Program */}
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

        {/* SECTION 3: What's Included */}
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

        {/* SECTION: Skills You'll Master */}
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

        {/* SECTION 4: Full Curriculum */}
        <section ref={curriculumRef} className="py-16 md:py-24 bg-secondary/30 scroll-mt-24">
          <div className="container max-w-4xl">
            <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-4" {...fadeInUp}>What You'll Learn</motion.h2>
            <motion.p className="text-center text-muted-foreground mb-12" {...fadeInUp}>Complete Curriculum — 15 to 18 Weeks · 13 Modules · 5 Tracks</motion.p>
            <motion.div {...fadeInUp}>
              <Accordion type="multiple" defaultValue={["track-0"]} className="space-y-3">
                {curriculum.map((track, i) => (
                  <AccordionItem key={i} value={`track-${i}`} className="border border-border/50 rounded-xl px-4 bg-card/50">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {i < 5 ? `T${i + 1}` : "🏆"}
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
                      {track.note && (
                        <p className="text-xs text-accent font-medium mt-3 pl-4 border-l-2 border-accent/50">{track.note}</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: Timeline */}
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

        {/* SECTION: What You Get — Value Breakdown */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container max-w-3xl">
            <motion.div className="text-center mb-10" {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Get for ₹22,000</h2>
              <p className="text-muted-foreground">Total value worth ₹29,000+ — all included in one program</p>
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
                    <span className="font-bold text-primary text-2xl">₹22,000</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6: Social Proof / Urgency */}
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div className="text-center mb-12 p-8 rounded-2xl bg-accent/10 border border-accent/30" {...fadeInUp}>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">🔥 Limited Seats Available — Next Batch Starting Soon</h2>
              {/* TODO: Configure actual countdown date */}
              <div className="flex items-center justify-center gap-6 mt-6">
                {[{ val: "15", label: "Days" }, { val: "08", label: "Hours" }, { val: "42", label: "Mins" }].map((t) => (
                  <div key={t.label} className="text-center">
                    <div className="text-3xl font-bold text-accent">{t.val}</div>
                    <div className="text-xs text-muted-foreground">{t.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Testimonials */}
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

        {/* SECTION: Hiring Partners Placeholder */}
        <section className="py-12 bg-secondary/30">
          <div className="container">
            <motion.div className="text-center mb-8" {...fadeInUp}>
              <h3 className="text-xl font-semibold text-muted-foreground">Companies Our Students Target</h3>
            </motion.div>
            <motion.div className="flex flex-wrap items-center justify-center gap-8" {...fadeInUp}>
              {/* TODO: Replace with actual company logos */}
              {hiringPartners.map((company) => (
                <div key={company} className="px-6 py-3 rounded-lg border border-border/30 bg-card/50 text-muted-foreground text-sm font-medium">
                  {company}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 7: Premium Pricing */}
        <section className="py-16 md:py-24">
          <div className="container max-w-lg">
            <motion.div {...fadeInUp}>
              <Card className="bg-card border-2 border-accent/50 overflow-hidden relative shadow-elevated">
                {/* Most Popular tag */}
                <div className="absolute top-0 right-0">
                  <div className="bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                    ⭐ Most Popular
                  </div>
                </div>
                <div className="bg-secondary p-6 text-center border-b border-accent/20">
                  <h2 className="text-2xl font-bold text-foreground">Python Full Stack Developer</h2>
                  <p className="text-muted-foreground text-sm">4-Month Bootcamp</p>
                  <StarRating rating={4.4} />
                </div>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-sm text-muted-foreground line-through">₹29,000</div>
                    <span className="text-5xl font-bold text-foreground">₹22,000</span>
                    <div className="text-sm text-accent font-semibold mt-1">Save ₹7,000 — Limited Time</div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {["Full Curriculum (120–150 hrs)", "Mock Interviews (Tech + HR)", "Job Assistance & Referrals", "Communication Skills Workshop", "Live Mentorship", "Capstone Project with Deployment"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                  {/* TODO: Replace with actual Razorpay/Stripe payment link */}
                  <Button variant="hero" size="lg" className="w-full" onClick={() => scrollTo(registrationRef)}>
                    Register Now — Seats Are Limited
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-3">Payment details will be shared after registration confirmation</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* SECTION 8: Registration Form */}
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
                      href={`https://wa.me/?text=${encodeURIComponent("I just registered for Python Full Stack Developer Program at Paramanu Consulting! Check it out: https://www.paramanuconsulting.com/python-full-stack")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Share with a Friend 📤
                    </a>
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Register for Python Full Stack Developer Program</h2>
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

        {/* SECTION 9: Footer CTA */}
        <section className="py-12 bg-primary/5 border-t border-border/50">
          <div className="container text-center">
            <p className="text-muted-foreground mb-4">Still have questions? We're happy to help.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:info@paramanuconsulting.com">
                  <Mail className="w-4 h-4 mr-2" /> info@paramanuconsulting.com
                </a>
              </Button>
              {/* TODO: Replace with actual WhatsApp number */}
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

export default PythonFullStack;
