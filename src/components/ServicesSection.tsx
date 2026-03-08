import { motion } from "framer-motion";
import { Database, Settings, Cpu, Shield, Headphones, Users, Briefcase, Globe, BarChart3 } from "lucide-react";

const serviceRoutes: Record<string, string> = {
  "Oracle Managed Services": "/services/oracle-managed-services",
  "DevOps Services": "/services/devops-sre",
  "SRE Services": "/services/devops-sre",
  "Automation & AI-Enabled": "/services/ai-enabled-operations",
  "Production Support": "/services/production-support",
};

const services = [
  {
    icon: Database,
    title: "PostgreSQL Services",
    description: "Enterprise PostgreSQL database management with high availability, performance tuning, and 24/7 expert support.",
    features: ["PostgreSQL Administration", "High Availability & Replication", "Performance Optimization", "Backup & Recovery", "Migration Services"]
  },
  {
    icon: Database,
    title: "Oracle Managed Services",
    description: "Complete Oracle ecosystem management from EBS to Cloud Infrastructure with 24/7 enterprise support.",
    features: ["E-Business Suite (R12.1/R12.2)", "Database (11g–23ai, RAC, Data Guard)", "Middleware, BI & Analytics", "OCI & Migration", "Security & Compliance"]
  },
  {
    icon: Settings,
    title: "DevOps Services",
    description: "Modern DevOps practices with CI/CD automation, infrastructure as code, and multi-cloud expertise.",
    features: ["CI/CD (Jenkins, GitHub Actions, GitLab)", "IaC (Terraform, Ansible, Pulumi)", "Cloud Architecture (AWS, Azure, GCP)", "Docker & Kubernetes"]
  },
  {
    icon: BarChart3,
    title: "SRE Services",
    description: "Site Reliability Engineering with full observability, incident management, and chaos engineering.",
    features: ["Prometheus, Grafana, ELK, Datadog", "PagerDuty & OpsGenie Integration", "SLAs, SLOs, Error Budgets", "Chaos Engineering"]
  },
  {
    icon: Cpu,
    title: "Automation & AI-Enabled",
    description: "Intelligent automation with predictive alerting, custom scripting, and self-healing infrastructure.",
    features: ["Automated Monitoring & Remediation", "Predictive Alerting", "Python & Bash Scripting", "Auto Backups & Scaling"]
  },
  {
    icon: Headphones,
    title: "Production Support",
    description: "Round-the-clock L2/L3/L4 support with global delivery from India and US operations centers.",
    features: ["24x7 L2/L3/L4 Support", "Global Delivery (India & US)", "Mission-Critical Systems", "Rapid Response SLAs"]
  },
  {
    icon: Shield,
    title: "SAP Services",
    description: "Comprehensive SAP Basis administration, upgrades, integrations, and production support.",
    features: ["SAP Basis Administration", "System Upgrades", "Integration Services", "Production Support"]
  },
  {
    icon: Globe,
    title: "Website Development",
    description: "Enterprise-grade web solutions including corporate websites, internal portals, and dashboards.",
    features: ["Enterprise Websites", "Internal Portals", "Custom Dashboards", "Modern UI/UX"]
  },
  {
    icon: Users,
    title: "HR & Staffing Services",
    description: "IT staffing and workforce scaling with specialized Oracle, SAP, and DevOps talent.",
    features: ["IT Staffing Solutions", "Workforce Scaling", "Oracle & SAP Talent", "DevOps Engineers"]
  },
  {
    icon: Briefcase,
    title: "Business Consulting",
    description: "Strategic consulting for revenue recovery, optimization, and technology-driven transformation.",
    features: ["Revenue Recovery", "Process Optimization", "Digital Transformation", "Technology Strategy"]
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }
  }
};

const ServicesSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container relative z-10">
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Enterprise-Grade <span className="text-gradient-primary">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Comprehensive managed services designed for modern enterprises. 
            From PostgreSQL & Oracle to Cloud to AI-driven operations.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => {
            const route = serviceRoutes[service.title];
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group relative"
              >
                <div className="glass-card rounded-2xl p-6 md:p-8 h-full transition-all duration-500 hover:shadow-elevated hover:border-primary/30 hover:-translate-y-1">
                  {/* Icon */}
                  <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <service.icon className="w-7 h-7" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {route && (
                    <a
                      href={route}
                      className="inline-block mt-6 text-sm font-medium text-primary hover:underline"
                    >
                      Learn more →
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
