import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, MapPin, Clock, Briefcase, 
  Users, Heart, Zap, Globe, GraduationCap 
} from "lucide-react";

const benefits = [
  {
    icon: Globe,
    title: "Remote-First Culture",
    description: "Work from anywhere with flexible hours that fit your lifestyle.",
  },
  {
    icon: GraduationCap,
    title: "Learning & Growth",
    description: "Continuous learning opportunities and certification support.",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health benefits and wellness programs.",
  },
  {
    icon: Users,
    title: "Great Team",
    description: "Work with talented professionals from around the world.",
  },
];

const openPositions = [
  {
    title: "Senior Oracle DBA",
    department: "Database Services",
    location: "Remote (India/US)",
    type: "Full-time",
    description: "Looking for experienced Oracle DBAs to manage enterprise database environments.",
  },
  {
    title: "DevOps Engineer",
    department: "Platform Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build and maintain CI/CD pipelines and cloud infrastructure for enterprise clients.",
  },
  {
    title: "Site Reliability Engineer",
    department: "SRE",
    location: "Remote",
    type: "Full-time",
    description: "Ensure high availability and performance of mission-critical systems.",
  },
  {
    title: "Cloud Solutions Architect",
    department: "Cloud Services",
    location: "Remote",
    type: "Full-time",
    description: "Design and implement cloud migration strategies for enterprise clients.",
  },
  {
    title: "Technical Support Engineer",
    department: "Production Support",
    location: "Remote (India)",
    type: "Full-time",
    description: "Provide L2/L3 support for enterprise applications and databases.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Careers = () => {
  const careersSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    hiringOrganization: {
      "@type": "Organization",
      name: "Paramanu Consulting",
      url: "https://www.paramanuconsulting.com",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Careers"
        description="Join Paramanu Consulting and work on challenging enterprise IT projects with a talented remote-first team."
        keywords="IT careers India, Oracle DBA jobs, DevOps engineer jobs, remote IT jobs, enterprise consulting careers"
        url="https://www.paramanuconsulting.com/careers"
        structuredData={careersSchema}
      />
      <Header />

      {/* Breadcrumbs */}
      <div className="container pt-28 pb-4">
        <Breadcrumbs />
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="container relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
              Join Our Team
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Build Your <span className="text-gradient-primary">Career</span> With Us
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Join a team of passionate technologists working on challenging enterprise projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="text-gradient-primary">Paramanu?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer more than just a job – we offer a career with purpose and growth.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-xl bg-card/50 border border-border/50 text-center hover:border-primary/30 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Open <span className="text-gradient-primary">Positions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore current opportunities and find your next challenge.
            </p>
          </motion.div>

          <motion.div
            className="space-y-4 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-6 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {position.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {position.description}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="shrink-0" asChild>
                    <a href={`mailto:careers@paramanuconsulting.com?subject=Application for ${position.title}`}>
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don't See a <span className="text-gradient-primary">Perfect Fit?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button variant="hero" size="xl" asChild>
              <a href="mailto:careers@paramanuconsulting.com">
                Send Your Resume
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
