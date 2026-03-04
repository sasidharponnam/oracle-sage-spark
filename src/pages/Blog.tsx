import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const categories = ["All", "Database", "Cloud", "DevOps", "AI & Automation"];

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [searchQuery, selectedCategory, blogs]);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
      setFilteredBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = [...blogs];

    if (searchQuery) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    setFilteredBlogs(filtered);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Paramanu Consulting Blog',
    description: 'Expert insights on Oracle, cloud technologies, DevOps, and enterprise IT best practices.',
    url: 'https://www.paramanuconsulting.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Paramanu Consulting',
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Blog & Insights"
        description="Expert insights and best practices on Oracle, PostgreSQL, cloud technologies, DevOps, SRE, and enterprise IT solutions from Paramanu Consulting."
        keywords="Oracle blog, cloud computing articles, DevOps best practices, enterprise IT insights, database management tips, SRE articles"
        url="https://www.paramanuconsulting.com/blog"
        structuredData={blogSchema}
      />
      <Header />

      {/* Breadcrumbs */}
      <div className="container pt-28 pb-4">
        <Breadcrumbs />
      </div>

      {/* Hero Section */}
      <section className="pt-8 pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Blog & <span className="text-primary">Insights</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest trends, best practices, and expert insights
              in database management, cloud technologies, and enterprise IT solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category || (category === "All" && !selectedCategory) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                  onClick={() => setSelectedCategory(category === "All" ? null : category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted h-48 rounded-lg mb-4"></div>
                  <div className="bg-muted h-6 rounded w-3/4 mb-2"></div>
                  <div className="bg-muted h-4 rounded w-full mb-2"></div>
                  <div className="bg-muted h-4 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  variants={itemVariants}
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/50"
                >
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Tag className="h-12 w-12 text-primary/50" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(blog.published_at)}
                      </span>
                      {blog.category && (
                        <Badge variant="secondary" className="text-xs">
                          {blog.category}
                        </Badge>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        {blog.author}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="group/btn"
                        onClick={() => setSelectedBlog(blog)}
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <Badge variant="secondary">{selectedBlog.category}</Badge>
                <Button variant="ghost" size="sm" onClick={() => setSelectedBlog(null)}>
                  Close
                </Button>
              </div>
              <h1 className="text-3xl font-bold mb-4 text-foreground">{selectedBlog.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground mb-8">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {selectedBlog.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(selectedBlog.published_at)}
                </span>
              </div>
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="text-lg text-muted-foreground mb-6">{selectedBlog.excerpt}</p>
                {selectedBlog.content && (
                  <div 
                    className="blog-html-content"
                    dangerouslySetInnerHTML={{ __html: selectedBlog.content }} 
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Blog;
