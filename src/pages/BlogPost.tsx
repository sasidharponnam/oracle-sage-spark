import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  author: string | null;
  featured_image: string | null;
  published_at: string | null;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) fetchBlog(slug);
  }, [slug]);

  const fetchBlog = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        setNotFound(true);
      } else {
        setBlog(data);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container pt-32 pb-16">
          <div className="max-w-4xl mx-auto animate-pulse space-y-6">
            <div className="bg-muted h-8 rounded w-1/4" />
            <div className="bg-muted h-12 rounded w-3/4" />
            <div className="bg-muted h-5 rounded w-1/2" />
            <div className="bg-muted h-64 rounded" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container pt-32 pb-16">
          <div className="max-w-2xl mx-auto text-center py-20">
            <h1 className="text-5xl font-bold text-foreground mb-4">404</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Sorry, this blog post doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/blog")} size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) return null;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt || "",
    author: { "@type": "Person", name: blog.author || "Paramanu Consulting" },
    datePublished: blog.published_at || blog.created_at,
    publisher: { "@type": "Organization", name: "Paramanu Consulting" },
    url: `https://www.paramanuconsulting.com/blog/${blog.slug}`,
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={blog.title}
        description={blog.excerpt || "Read this article on Paramanu Consulting blog."}
        keywords={`${blog.category || ""}, Paramanu Consulting, blog`}
        url={`https://www.paramanuconsulting.com/blog/${blog.slug}`}
        structuredData={blogSchema}
      />
      <Header />

      <article className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back button */}
            <Button
              variant="ghost"
              onClick={() => navigate("/blog")}
              className="mb-8 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>

            {/* Header */}
            <header className="mb-10">
              {blog.category && (
                <Badge variant="secondary" className="mb-4">
                  {blog.category}
                </Badge>
              )}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {blog.author || "Paramanu Consulting"}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(blog.published_at)}
                </span>
              </div>
            </header>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-lg text-muted-foreground mb-10 border-l-4 border-primary pl-6 italic">
                {blog.excerpt}
              </p>
            )}

            {/* Content */}
            {blog.content && (
              <div
                className="blog-html-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            )}

            {/* Bottom back button */}
            <div className="mt-16 pt-8 border-t border-border">
              <Button onClick={() => navigate("/blog")} variant="outline" size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blogs
              </Button>
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
