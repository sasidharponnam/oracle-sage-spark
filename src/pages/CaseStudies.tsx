import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, Clock, DollarSign } from "lucide-react";

const caseStudies = [
  {
    industry: "Financial Services",
    title: "Oracle Cloud Migration for Fortune 500 Bank",
    challenge: "Legacy on-premises Oracle infrastructure causing performance bottlenecks and high maintenance costs.",
    solution: "Complete migration to Oracle Cloud Infrastructure with zero-downtime cutover strategy.",
    results: [
      { metric: "40%", label: "Cost Reduction" },
      { metric: "99.99%", label: "Uptime Achieved" },
      { metric: "3x", label: "Performance Improvement" },
    ],
    tags: ["Oracle Cloud", "Migration", "Financial Services"],
  },
  {
    industry: "Healthcare",
    title: "24/7 Production Support for Healthcare Provider",
    challenge: "Critical healthcare systems requiring round-the-clock monitoring and immediate incident response.",
    solution: "Implemented comprehensive L2/L3/L4 support with AI-powered monitoring and automated remediation.",
    results: [
      { metric: "15min", label: "Avg Response Time" },
      { metric: "98%", label: "First-Call Resolution" },
      { metric: "60%", label: "Incident Reduction" },
    ],
    tags: ["Production Support", "Healthcare", "AI Operations"],
  },
  {
    industry: "Retail",
    title: "DevOps Transformation for E-commerce Platform",
    challenge: "Slow release cycles and frequent deployment failures impacting business agility.",
    solution: "End-to-end DevOps implementation with CI/CD pipelines, IaC, and automated testing.",
    results: [
      { metric: "10x", label: "Faster Deployments" },
      { metric: "90%", label: "Fewer Failures" },
      { metric: "50%", label: "Cost Savings" },
    ],
    tags: ["DevOps", "CI/CD", "Retail"],
  },
  {
    industry: "Manufacturing",
    title: "SAP Integration & Support Services",
    challenge: "Complex SAP landscape requiring specialized expertise and continuous optimization.",
    solution: "Comprehensive SAP managed services with performance tuning and integration support.",
    results: [
      { metric: "35%", label: "Efficiency Gain" },
      { metric: "24/7", label: "Expert Support" },
      { metric: "99.9%", label: "System Availability" },
    ],
    tags: ["SAP", "Manufacturing", "Integration"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const CaseStudies = () => {
  const caseStudiesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Case Studies - Paramanu Consulting",
    description: "Explore our success stories and client case studies in enterprise IT consulting.",
    url: "https://www.paramanuconsulting.com/case-studies",
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Case Studies"
        description="Explore success stories from our enterprise IT consulting projects including Oracle migrations, DevOps transformations, and managed services."
        keywords="Oracle migration case study, DevOps transformation success, cloud migration results, enterprise IT consulting case studies"
        url="https://www.paramanuconsulting.com/case-studies"
        structuredData={caseStudiesSchema}
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
              Success Stories
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Client <span className="text-gradient-primary">Case Studies</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Real results from real projects. See how we've helped enterprises transform their IT operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative p-8 md:p-10 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                    {study.industry}
                  </span>
                  {study.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-secondary rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-6">{study.title}</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-semibold text-primary mb-2">The Challenge</h3>
                    <p className="text-muted-foreground">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Our Solution</h3>
                    <p className="text-muted-foreground">{study.solution}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 p-6 rounded-xl bg-background/50 border border-border/30">
                  {study.results.map((result, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                        {result.metric}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Be Our Next{" "}
              <span className="text-gradient-primary">Success Story?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how we can help transform your enterprise IT operations.
            </p>
            <Button variant="hero" size="xl" asChild>
              <a href="/get-started">
                Start Your Project
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

export default CaseStudies;
