import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Terms of Service"
        description="Review the terms of service for Paramanu Consulting. Understand the conditions governing the use of our services and website."
        url="https://www.paramanuconsulting.com/terms"
      />
      <Header />
      <main className="container pt-32 pb-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-3xl">
          <p className="text-muted-foreground leading-relaxed">
            These terms of service govern your use of the Paramanu Consulting website and services. This page is currently being updated — please check back soon for the full terms.
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

export default Terms;
