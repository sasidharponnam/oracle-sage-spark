import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Gift, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const DISMISSED_KEY = "paramanu_exit_popup_dismissed";
const LEAD_CAPTURED_KEY = "paramanu_lead_captured";

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [captured, setCaptured] = useState(false);
  const { toast } = useToast();

  const dismiss = useCallback(() => {
    setShow(false);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  }, []);

  useEffect(() => {
    // Don't show if already dismissed this session or lead already captured
    if (sessionStorage.getItem(DISMISSED_KEY) || localStorage.getItem(LEAD_CAPTURED_KEY)) return;
    // Don't show on the python-full-stack page (they're already there)
    if (window.location.pathname === "/python-full-stack") return;

    let timeout: ReturnType<typeof setTimeout>;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        setShow(true);
      }
    };

    // Desktop: exit intent
    document.addEventListener("mouseleave", handleMouseLeave);

    // Mobile: show after 45 seconds of browsing
    timeout = setTimeout(() => {
      if (!sessionStorage.getItem(DISMISSED_KEY) && !localStorage.getItem(LEAD_CAPTURED_KEY)) {
        setShow(true);
      }
    }, 45000);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setLoading(true);
    try {
      // Save lead to registrations table with minimal info
      const { error } = await supabase.from("registrations").insert({
        full_name: name,
        email,
        phone: phone || "Not provided",
        college_name: "Lead from exit popup",
        year_of_study: "Not specified",
        consent: true,
        heard_from: "Exit Intent Popup",
      });

      if (error) {
        console.warn("Lead capture DB error:", error);
      }

      setCaptured(true);
      localStorage.setItem(LEAD_CAPTURED_KEY, "1");

      // Track in GA4
      const w = window as any;
      if (typeof w.gtag === "function") {
        w.gtag("event", "lead_captured", { source: "exit_intent_popup" });
      }
    } catch (err) {
      console.error("Lead capture error:", err);
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          />
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-card border border-border rounded-2xl shadow-elevated max-w-md w-full p-6 md:p-8 pointer-events-auto relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

              <button
                onClick={dismiss}
                className="absolute top-4 right-4 p-1 rounded-md hover:bg-secondary text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              {captured ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">You're In! 🎉</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    We'll send you the program brochure and early-bird details within 24 hours.
                  </p>
                  <Button variant="hero" className="w-full" asChild>
                    <a href="/python-full-stack#register">
                      View Full Program <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                      <Clock className="w-3.5 h-3.5" /> Limited Time Offer
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                      Wait! Get ₹2,000 Off the Python Full Stack Program
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Drop your details and we'll send you an exclusive early-bird discount + free program brochure.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Phone (optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    />
                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                      {loading ? "Sending..." : "Get My Discount + Brochure"}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      No spam. We'll only contact you about this program.
                    </p>
                  </form>

                  <button
                    onClick={dismiss}
                    className="block mx-auto mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    No thanks, I'll pay full price
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
