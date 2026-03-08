import { motion } from "framer-motion";
import { Database, Cloud, Server, Shield, Clock, Users } from "lucide-react";

const expertise = [
  { icon: Database, label: "PostgreSQL & Oracle" },
  { icon: Cloud, label: "Cloud Infrastructure" },
  { icon: Server, label: "DevOps & SRE" },
  { icon: Shield, label: "Enterprise Security" },
  { icon: Clock, label: "24/7 Support" },
  { icon: Users, label: "Dedicated Teams" },
];

const TrustSection = () => {
  return (
    <section className="py-16 md:py-20 border-y border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-muted-foreground text-sm uppercase tracking-wider font-medium mb-3">
            Our Core Expertise
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            We've managed production Oracle and cloud environments since before "DevOps" was a job title. 
            Our team operates under strict SLAs — not vague promises — with dedicated engineers assigned to your account, not a shared help desk. 
            When systems go down at 2 AM, our people are already on it.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {expertise.map((item) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm md:text-base">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
