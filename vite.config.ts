import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Fallback values for production builds (these are public/anon keys, safe to embed)
    ...((!process.env.VITE_SUPABASE_URL) && {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://xgewdtcmklbenboverlo.supabase.co'),
    }),
    ...((!process.env.VITE_SUPABASE_PUBLISHABLE_KEY) && {
      'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnZXdkdGNta2xiZW5ib3ZlcmxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNjU3MzAsImV4cCI6MjA4MjY0MTczMH0.AzMbYqoytfjU2ggKQAz2k68KvwRb1u7sTYPYOIiE0DI'),
    }),
  },
}));
