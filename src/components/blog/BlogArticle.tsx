
import { Link } from "react-router-dom";
import { ChevronLeft, Calendar, User, Clock } from "lucide-react";
import { useViewport } from "@/hooks/use-viewport";

interface BlogArticleProps {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  readTime?: string;
  heroImage?: string;
  children: React.ReactNode;
}

const BlogArticle = ({
  title,
  subtitle,
  author = "FinSage Team",
  date = "April 3, 2025",
  readTime = "10 min read",
  heroImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80",
  children
}: BlogArticleProps) => {
  const { isMobile } = useViewport();
  
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-8">
        <Link to="/blog" className="flex items-center text-primary-600 hover:text-primary-700 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Back to all articles</span>
        </Link>
      </div>
      
      {/* Hero Image */}
      <div className="relative w-full aspect-video mb-8 rounded-xl overflow-hidden">
        <img 
          src={heroImage} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Article Meta */}
      <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-6 gap-3 md:gap-5">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1.5" />
          <span>{date}</span>
        </div>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1.5" />
          <span>{author}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1.5" />
          <span>{readTime}</span>
        </div>
      </div>
      
      {/* Article Title */}
      <h1 className="heading-lg mb-4">{title}</h1>
      
      {/* Article Subtitle */}
      {subtitle && (
        <p className="text-xl text-muted-foreground mb-8">{subtitle}</p>
      )}
      
      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        {children}
      </div>
    </article>
  );
};

export default BlogArticle;
