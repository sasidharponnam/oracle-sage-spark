import { motion } from "framer-motion";

const stats = [
  { value: "15+", label: "Expert Team Members" },
  { value: "50+", label: "Projects Delivered" },
  { value: "99.99%", label: "Uptime SLA Guarantee" },
  { value: "24/7", label: "Global Support Coverage" },
];

const StatsSection = () => {
  return (
    <section className="relative py-20 md:py-28">
      <h2 className="sr-only">Company Statistics</h2>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
      
      <div className="container relative z-10">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.5, ease: "easeOut" }
                }
              }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
