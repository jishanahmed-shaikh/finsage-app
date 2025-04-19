
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart2, MessageCircle, BookOpen, ArrowRight } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen pt-24 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-100 rounded-full filter blur-3xl opacity-40 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/30 rounded-full filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-primary-200 rounded-full filter blur-3xl opacity-20 animate-pulse-soft"></div>
      </div>

      <div className="content-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700 mb-4">
                AI-Powered Investment Portfolio
              </span>
            </div>
            <h1 className="heading-xl">
              Your Personal <span className="text-gradient">Financial</span> Portfolio Assistant
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Track investments, analyze stocks, and get personalized AI guidance to optimize your financial portfolio - all in one place.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-8 button-animation"
                >
                  View Dashboard
                </Button>
              </Link>
              <Link to="/chat">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full border-primary-200 text-primary-700 hover:bg-primary-50 px-8 button-animation"
                >
                  Ask AI Assistant
                </Button>
              </Link>
            </div>
            
            {/* Quick Navigation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <Link to="/dashboard" className="group">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-border hover:border-primary-200 hover:shadow transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                      <BarChart2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Portfolio</h3>
                      <p className="text-xs text-muted-foreground">Track investments</p>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link to="/chat" className="group">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-border hover:border-primary-200 hover:shadow transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">AI Chat</h3>
                      <p className="text-xs text-muted-foreground">Get guidance</p>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link to="/learn" className="group">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-border hover:border-primary-200 hover:shadow transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Learn</h3>
                      <p className="text-xs text-muted-foreground">Improve skills</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Hero Image/Illustration */}
          <div 
            className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="glass-card rounded-2xl p-6 shadow-lg overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm">AI</div>
                  <div className="bg-primary-50 rounded-2xl rounded-tl-none p-4 max-w-xs">
                    <p className="text-sm text-foreground">Welcome to FinSage! How can I help with your investment portfolio today?</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 mb-4 justify-end">
                  <div className="bg-secondary rounded-2xl rounded-tr-none p-4 max-w-xs">
                    <p className="text-sm text-foreground">Can you analyze my current portfolio and suggest ways to optimize returns?</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground text-sm">You</div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm">AI</div>
                  <div className="bg-primary-50 rounded-2xl rounded-tl-none p-4 max-w-xs animate-pulse-soft">
                    <p className="text-sm text-foreground">Based on your portfolio analysis, here are some suggestions:</p>
                    <ul className="text-sm text-foreground mt-2 space-y-1">
                      <li>• Your equity allocation is 70% - consider rebalancing to 60%</li>
                      <li>• Add more diversity with mid-cap funds</li>
                      <li>• Consider tax-efficient investments like ELSS</li>
                    </ul>
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-xs text-primary-600 font-medium">View detailed analysis</p>
                      <ArrowRight className="h-3 w-3 text-primary-600" />
                    </div>
                  </div>
                </div>
                
                <div className="relative mt-4">
                  <input 
                    type="text" 
                    className="w-full p-3 pr-12 rounded-full border border-border bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary-100 placeholder:text-muted-foreground/70"
                    placeholder="Ask about your portfolio..."
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-primary-500 text-white flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 7.5H14M14 7.5L8 1.5M14 7.5L8 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-100 rounded-full filter blur-xl opacity-50"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full filter blur-xl opacity-50"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg p-3 shadow-md flex items-center space-x-2 animate-float">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div className="text-xs font-medium">Portfolio <span className="text-green-600">+8.2%</span></div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-3 shadow-md flex items-center space-x-2 animate-float">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <div className="text-xs font-medium">Real-time Updates</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
