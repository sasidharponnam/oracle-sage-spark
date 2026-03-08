import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Cookie Policy"
        description="Learn about how Paramanu Consulting uses cookies and similar technologies on our website."
        url="https://www.paramanuconsulting.com/cookies"
      />
      <Header />
      <main className="container pt-32 pb-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Cookie Policy</h1>
        <div className="prose prose-invert max-w-3xl">
          <p className="text-muted-foreground leading-relaxed">
            This cookie policy explains how Paramanu Consulting uses cookies and similar technologies. This page is currently being updated — please check back soon for the full policy.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            For any questions, please contact us at{" "}
            <a href="mailto:info@paramanuconsulting.com" className="text-primary hover:underline">
              info@paramanuconsulting.com
            </a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
