import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";
import ScheduleModal from "./ScheduleModal";
import CapabilitiesDeck from "./CapabilitiesDeck";

const CTASection = () => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full border border-accent/20">
            Start Today
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Scale Your Infrastructure,{" "}
            <span className="text-gradient-primary">Not Your Headcount</span>
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            From Oracle RAC to Kubernetes clusters — our engineers extend your team with 
            deep expertise across databases, cloud, and DevOps. Talk to our team today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="hero" size="xl" onClick={() => setIsScheduleOpen(true)}>
              Schedule a Consultation
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="xl" onClick={() => setIsDeckOpen(true)}>
              Download Capabilities Deck
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground">
            <a href="tel:+917989359581" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>+91 7989359581</span>
            </a>
            <a href="mailto:info@paramanuconsulting.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              <span>info@paramanuconsulting.com</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        type="consultation"
      />
      <CapabilitiesDeck
        isOpen={isDeckOpen}
        onClose={() => setIsDeckOpen(false)}
      />
    </section>
  );
};

export default CTASection;
