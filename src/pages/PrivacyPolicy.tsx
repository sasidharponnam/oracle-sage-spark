import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Privacy Policy"
        description="Read the privacy policy of Paramanu Consulting. Learn how we collect, use, and protect your personal data."
        url="https://www.paramanuconsulting.com/privacy-policy"
      />
      <Header />
      <main className="container pt-32 pb-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-3xl">
          <p className="text-muted-foreground leading-relaxed">
            This privacy policy outlines how Paramanu Consulting collects, uses, and protects your personal information. This page is currently being updated — please check back soon for the full policy.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            For any privacy-related inquiries, please contact us at{" "}
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

export default PrivacyPolicy;
