
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useViewport } from "@/hooks/use-viewport";

const Footer = () => {
  const { isMobile } = useViewport();
  
  return (
    <footer className="bg-primary-50/50 border-t border-primary-100">
      <div className="content-container py-8 md:py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          <div className="sm:col-span-2">
            <Link to="/" className="inline-block mb-3 md:mb-4">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent">FinSage</span>
            </Link>
            <p className="text-muted-foreground mb-4 md:mb-6 max-w-md text-sm md:text-base">
              Making financial literacy accessible to everyone globally through AI-powered conversations, personalized guidance, and comprehensive portfolio management.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              <a href="https://www.linkedin.com/in/jishanahmedshaikh" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://www.x.com/jishanarshaikh" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/jishanahmed_shaikh" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Company</h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li><Link to="/about-us" className="text-muted-foreground hover:text-primary-600 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-primary-600 transition-colors">Careers</Link></li>
              <li><Link to="/team" className="text-muted-foreground hover:text-primary-600 transition-colors">Our Team</Link></li>
              <li><Link to="/press" className="text-muted-foreground hover:text-primary-600 transition-colors">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Resources</h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary-600 transition-colors">Blog</Link></li>
              <li><Link to="/glossary" className="text-muted-foreground hover:text-primary-600 transition-colors">Financial Glossary</Link></li>
              <li><Link to="/learn" className="text-muted-foreground hover:text-primary-600 transition-colors">Learning Hub</Link></li>
              <li><Link to="/stocks" className="text-muted-foreground hover:text-primary-600 transition-colors">Market Insights</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-primary-100 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-xs md:text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} FinSage. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm">
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary-600">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary-600">Terms of Service</Link>
            <Link to="/legal" className="text-muted-foreground hover:text-primary-600">Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
