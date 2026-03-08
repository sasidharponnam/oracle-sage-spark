import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Download, Linkedin, Instagram, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import linkedinBanner from "@/assets/social-banner-linkedin.png";
import instagramStory from "@/assets/social-story-instagram.png";
import squarePost from "@/assets/social-post-square.png";

const assets = [
  {
    title: "LinkedIn Banner (1200×628)",
    description: "Perfect for LinkedIn posts, company page updates, and sponsored content campaigns.",
    image: linkedinBanner,
    icon: Linkedin,
    filename: "paramanu-python-fullstack-linkedin.png",
    platform: "LinkedIn",
  },
  {
    title: "Instagram Story (1080×1920)",
    description: "Vertical format optimized for Instagram Stories, WhatsApp Status, and Facebook Stories.",
    image: instagramStory,
    icon: Instagram,
    filename: "paramanu-python-fullstack-story.png",
    platform: "Instagram / WhatsApp",
  },
  {
    title: "Square Post (1080×1080)",
    description: "Universal square format for Instagram feed, Facebook posts, and Twitter/X cards.",
    image: squarePost,
    icon: Image,
    filename: "paramanu-python-fullstack-square.png",
    platform: "All Platforms",
  },
];

const suggestedCaptions = [
  {
    platform: "LinkedIn",
    caption: `🐍 Become a Python Full Stack Developer in just 4 months!

Our comprehensive bootcamp covers Python → Django → React → PostgreSQL → Docker → Deployment.

✅ 120–150 hours of live instruction
✅ Mock interviews + job assistance
✅ Real capstone project deployed live
✅ AI-first learning approach

💰 Early bird: ₹22,000 (worth ₹29,000)
🔥 Limited seats — next batch starting soon!

Register now 👉 paramanuconsulting.com/python-full-stack

#Python #FullStackDeveloper #WebDevelopment #Bootcamp #Django #React #CodingBootcamp #TechCareers #JobReady #BTech`,
  },
  {
    platform: "Instagram",
    caption: `🚀 From zero to Full Stack Developer in 4 months!

Learn Python, Django, React, PostgreSQL & Docker with real projects.

What you get:
📚 120+ hours of live training
💼 Job assistance & mock interviews
🎯 Capstone project deployed live
🤖 AI-first learning approach

Only ₹22,000 (save ₹7,000!)

Link in bio 👆
.
.
#PythonDeveloper #FullStackDeveloper #CodingBootcamp #LearnPython #WebDev #Django #ReactJS #TechCareer #Programming #BTech #Engineering #Developer #CodeNewbie`,
  },
];

const MarketingAssets = () => {
  const handleDownload = (imageUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Marketing Assets — Python Full Stack Program"
        description="Download social media banners, Instagram stories, and ready-to-post creatives for the Python Full Stack Developer Program."
        url="https://www.paramanuconsulting.com/marketing-assets"
      />
      <Header />
      <main className="container pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Marketing Assets
          </h1>
          <p className="text-muted-foreground text-lg">
            Download ready-to-use social media creatives for the Python Full Stack Developer Program. Use these across LinkedIn, Instagram, WhatsApp, and more.
          </p>
        </motion.div>

        {/* Downloadable Assets */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {assets.map((asset, i) => (
            <motion.div
              key={asset.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-all">
                <div className="aspect-video bg-secondary/30 flex items-center justify-center overflow-hidden">
                  <img
                    src={asset.image}
                    alt={asset.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <asset.icon className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">{asset.platform}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{asset.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{asset.description}</p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleDownload(asset.image, asset.filename)}
                  >
                    <Download className="w-4 h-4 mr-2" /> Download
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Suggested Captions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Ready-to-Post Captions</h2>
          <div className="space-y-6">
            {suggestedCaptions.map((item) => (
              <Card key={item.platform} className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">{item.platform} Caption</h3>
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans bg-secondary/30 p-4 rounded-lg">
                    {item.caption}
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => navigator.clipboard.writeText(item.caption)}
                  >
                    Copy Caption
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default MarketingAssets;
