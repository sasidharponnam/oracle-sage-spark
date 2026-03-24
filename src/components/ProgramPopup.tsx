import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const ProgramPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dismissed = sessionStorage.getItem("program-popup-dismissed");
    if (dismissed) return;
    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem("program-popup-dismissed", "true");
  };

  const handleExplore = () => {
    handleDismiss();
    navigate("/python-full-stack");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleDismiss} />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-md rounded-2xl border border-border/50 bg-card p-8 text-center shadow-elevated"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <button
              onClick={handleDismiss}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Master Full Stack + AI Agents
            </h2>
            <p className="text-muted-foreground mb-6">
              <span className="text-primary font-semibold">Python Full Stack + AI Agents Program</span> — Batch Starting Soon!
            </p>
            <Button variant="hero" size="lg" className="w-full mb-3" onClick={handleExplore}>
              Explore Program →
            </Button>
            <button
              onClick={handleDismiss}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Not now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProgramPopup;
