import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Star, StarHalf, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const PythonFullStackWidget = () => {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      {/* Sticky Side Tab — desktop only, hidden on /python-full-stack */}
      <button
        onClick={() => setPanelOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center justify-center bg-accent text-accent-foreground writing-vertical-lr px-2 py-4 rounded-l-lg shadow-lg hover:px-3 transition-all duration-300 group"
        style={{ writingMode: "vertical-lr" }}
        title="Python Full Stack Program"
      >
        <span className="text-xs font-bold tracking-wide flex items-center gap-1">
          🤖 Full Stack + AI
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
        </span>
      </button>

      {/* Slide-in Panel */}
      <AnimatePresence>
        {panelOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPanelOpen(false)}
            />
            {/* Panel */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 z-50 w-[320px] max-w-full bg-card border-l border-border shadow-elevated overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground">Python Full Stack + AI Agents</h3>
                  <button onClick={() => setPanelOpen(false)} className="p-1 rounded-md hover:bg-secondary text-muted-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    "4 Months | 120–150 Hours",
                    "Mock Interviews + Job Assistance",
                    "AI-First Learning Approach",
                    "Batch Starting Soon 🔥",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                  <StarHalf className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-semibold text-foreground ml-1">4.4/5</span>
                  <span className="text-xs text-muted-foreground ml-1">• 120+ Students</span>
                </div>

                {/* Price */}
                <div className="text-center mb-6 p-4 rounded-xl bg-secondary/50 border border-border/50">
                  <div className="text-sm text-muted-foreground line-through">₹29,000</div>
                  <div className="text-3xl font-bold text-foreground">₹22,000</div>
                  <div className="text-xs text-accent font-semibold">Save ₹7,000 — Limited Time</div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <a href="/python-full-stack#register">
                      Register Now <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <a href="/python-full-stack">View Full Program</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PythonFullStackWidget;
