import { Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold mb-4">
              <span className="text-gradient-primary">Paramanu</span>
              <span className="text-foreground"> Consulting</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Tier-1 Enterprise IT Consulting, Oracle Architecture, and AI-Enabled Managed Services for Modern Enterprises.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.linkedin.com/company/paramanu-consulting" target="_blank" rel="noopener noreferrer" aria-label="Paramanu Consulting on LinkedIn" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/ParamanuConsulting" target="_blank" rel="noopener noreferrer" aria-label="Paramanu Consulting on Twitter" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="mailto:info@paramanuconsulting.com" target="_blank" rel="noopener noreferrer" aria-label="Email Paramanu Consulting" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/services/oracle-managed-services" className="text-muted-foreground hover:text-primary transition-colors">Oracle Managed Services</a></li>
              <li><a href="/services/cloud-transformation" className="text-muted-foreground hover:text-primary transition-colors">Cloud Transformation</a></li>
              <li><a href="/services/devops-sre" className="text-muted-foreground hover:text-primary transition-colors">DevOps & SRE</a></li>
              <li><a href="/services/ai-enabled-operations" className="text-muted-foreground hover:text-primary transition-colors">AI-Enabled Operations</a></li>
              <li><a href="/services/production-support" className="text-muted-foreground hover:text-primary transition-colors">24/7 Production Support</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/leadership" className="text-muted-foreground hover:text-primary transition-colors">Leadership</a></li>
              <li><a href="/case-studies" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog & Insights</a></li>
              <li><a href="/resources#whitepapers" className="text-muted-foreground hover:text-primary transition-colors">Whitepapers</a></li>
              <li><a href="/resources#events" className="text-muted-foreground hover:text-primary transition-colors">Webinars</a></li>
              <li><a href="/resources" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="/client-portal" className="text-muted-foreground hover:text-primary transition-colors">Support Portal</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Paramanu Consulting. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="/cookies" className="hover:text-primary transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
