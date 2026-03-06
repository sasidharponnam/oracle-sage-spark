import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, CheckCircle2, Building2, User, Mail, Phone,
  MessageSquare, Briefcase, Clock, Shield, Zap, Users, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { sendInquiryEmail } from "@/lib/emailjs";
import { toast } from "sonner";

const serviceInterests = [
  "Oracle Managed Services",
  "SAP Services",
  "DevOps & SRE",
  "Cloud Migration",
  "Production Support",
  "IT Staffing",
  "Business Consulting",
  "Other"
];

const companySize = [
  "1-50 employees",
  "51-200 employees",
  "201-1000 employees",
  "1001-5000 employees",
  "5000+ employees"
];

const timeline = [
  "Immediately",
  "Within 1 month",
  "1-3 months",
  "3-6 months",
  "Just exploring"
];

const benefits = [
  {
    icon: Clock,
    title: "Quick Response",
    description: "Get a response within 24 hours from our solutions team."
  },
  {
    icon: Users,
    title: "Expert Consultation",
    description: "Free consultation with certified enterprise technology experts."
  },
  {
    icon: Zap,
    title: "Custom Solutions",
    description: "Tailored recommendations based on your specific needs."
  },
  {
    icon: Shield,
    title: "No Obligation",
    description: "No commitment required. Explore options at your own pace."
  }
];

const GetStarted = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    companySize: "",
    services: [] as string[],
    timeline: "",
    message: ""
  });

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await sendInquiryEmail({
      type: "Get Started Form",
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      jobTitle: formData.jobTitle,
      companySize: formData.companySize,
      services: formData.services,
      timeline: formData.timeline,
      message: formData.message,
    });

    setIsSubmitting(false);

    if (success) {
      const w = window as any; if (typeof w.gtag === 'function') w.gtag('event', 'consultation_form_submit', { company_size: formData.companySize, services: formData.services.join(','), timeline: formData.timeline });
      toast.success("Request submitted! We'll contact you within 24 hours.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
        companySize: "",
        services: [],
        timeline: "",
        message: ""
      });
    } else {
      toast.error("Failed to send request. Please try again.");
    }
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Get Started with Paramanu Consulting',
    description: 'Contact Paramanu Consulting for enterprise IT services, Oracle, cloud, and DevOps solutions.',
    url: 'https://www.paramanuconsulting.com/get-started',
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Get Started - Free Consultation"
        description="Get a free consultation with Paramanu Consulting experts. Tell us about your Oracle, cloud, DevOps, or enterprise IT needs and we'll provide tailored solutions."
        keywords="contact Paramanu, IT consulting quote, Oracle services inquiry, cloud migration consultation, DevOps assessment, enterprise IT support"
        url="https://www.paramanuconsulting.com/get-started"
        structuredData={contactSchema}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-40" />
        <div className="container relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
              Get Started
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Build Something <span className="text-gradient-primary">Great Together</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Tell us about your needs and we'll connect you with the right team. 
              Free consultation, no obligations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                
                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder="John"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Smith"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Work Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@company.com"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Info */}
                <h2 className="text-2xl font-bold mb-6">Company Information</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name *</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Acme Corporation"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Job Title *</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                        placeholder="IT Director"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Company Size *</label>
                    <div className="flex flex-wrap gap-2">
                      {companySize.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, companySize: size }))}
                          className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                            formData.companySize === size
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Services Interest */}
                <h2 className="text-2xl font-bold mb-6">Services of Interest</h2>
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {serviceInterests.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`px-4 py-2 rounded-lg border text-sm transition-colors flex items-center gap-2 ${
                          formData.services.includes(service)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {formData.services.includes(service) && <CheckCircle2 className="w-4 h-4" />}
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <h2 className="text-2xl font-bold mb-6">Project Timeline</h2>
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {timeline.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, timeline: time }))}
                        className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                          formData.timeline === time
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-2">Tell us about your project</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Describe your current challenges, goals, and what you're looking to achieve..."
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Request <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  By submitting this form, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a> and{" "}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>.
                </p>
              </form>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Benefits */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-6">What to Expect</h3>
                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit.title} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <benefit.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{benefit.title}</p>
                        <p className="text-xs text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Need Answers Before You Commit?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our solutions architects have handled environments like yours — Oracle, SAP, cloud, DevOps. 
                  A 15-minute call can save weeks of evaluation. No sales pitch, just clarity.
                </p>
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <a href="tel:+917989359581">Book a 15-Minute Call</a>
                </Button>
              </div>

              {/* Trusted By */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Trusted By</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  500+ enterprises across various industries and mid-market companies.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs bg-secondary rounded-full">Financial Services</span>
                  <span className="px-3 py-1 text-xs bg-secondary rounded-full">Healthcare</span>
                  <span className="px-3 py-1 text-xs bg-secondary rounded-full">Manufacturing</span>
                  <span className="px-3 py-1 text-xs bg-secondary rounded-full">Retail</span>
                  <span className="px-3 py-1 text-xs bg-secondary rounded-full">Government</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetStarted;
