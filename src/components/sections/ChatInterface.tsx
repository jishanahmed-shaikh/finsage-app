
import { Button } from "@/components/ui/button";
import ChatBubble from "../ui-custom/ChatBubble";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const exampleQuestions = [
  "How should I allocate my portfolio for long-term growth?",
  "What stocks are performing well in the tech sector?",
  "How much should I invest monthly to reach ₹1 crore in 15 years?",
  "What tax-saving investment options do I have?"
];

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("chat-interface");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to the AI
    setInputValue("");
  };

  const handleExampleClick = (question: string) => {
    setSelectedExample(question);
    setInputValue(question);
  };

  return (
    <section id="chat-interface" className="section-padding relative overflow-hidden bg-gradient-to-b from-background to-primary-50/50">
      <div className="absolute top-20 left-0 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-primary-100 rounded-full filter blur-3xl opacity-50 -z-10"></div>
      
      <div className="content-container">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-block">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700 mb-4">
              AI Assistance
            </span>
          </div>
          <h2 className="heading-lg mb-4">Your Personal Investment Advisor</h2>
          <p className="text-muted-foreground text-lg">
            Ask any financial question and get personalized guidance based on your portfolio and goals.
          </p>
        </div>

        <div 
          className={cn(
            "max-w-4xl mx-auto transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="glass-card rounded-2xl p-6 shadow-lg overflow-hidden relative">
            <div className="relative z-10">
              <div className="flex flex-col space-y-1 mb-4">
                <ChatBubble 
                  content={
                    <p className="text-sm text-foreground">Hello! I'm your AI financial advisor. How can I help with your investment portfolio today?</p>
                  } 
                />
                
                {selectedExample && (
                  <>
                    <ChatBubble 
                      content={<p className="text-sm text-foreground">{selectedExample}</p>}
                      isUser={true} 
                    />
                    <ChatBubble 
                      content={
                        <div>
                          {selectedExample.includes("allocate my portfolio") && (
                            <>
                              <p className="text-sm text-foreground">For long-term growth, I recommend this allocation:</p>
                              <ul className="text-sm text-foreground mt-2 space-y-1">
                                <li>• 60-70% in diversified equity funds (index, large-cap, and mid-cap)</li>
                                <li>• 20-25% in fixed-income investments (bonds, government securities)</li>
                                <li>• 5-10% in alternative investments (gold, REITs)</li>
                                <li>• 5% cash reserve for opportunities</li>
                              </ul>
                              <p className="text-sm text-foreground mt-2">This balanced approach provides growth potential while managing risk.</p>
                            </>
                          )}
                          
                          {selectedExample.includes("tech sector") && (
                            <>
                              <p className="text-sm text-foreground">Based on recent analysis, these tech stocks are showing strong performance:</p>
                              <ul className="text-sm text-foreground mt-2 space-y-1">
                                <li>• ABC Technologies: +18.5% YTD, strong cloud services growth</li>
                                <li>• XYZ Semiconductors: +22.3% YTD, benefiting from AI chip demand</li>
                                <li>• Tech ETF TECH50: +15.2% YTD, diversified tech exposure</li>
                              </ul>
                              <p className="text-sm text-foreground mt-2">Would you like more detailed analysis on any of these?</p>
                            </>
                          )}
                          
                          {selectedExample.includes("₹1 crore") && (
                            <>
                              <p className="text-sm text-foreground">To reach ₹1 crore in 15 years, here's what you need:</p>
                              <ul className="text-sm text-foreground mt-2 space-y-1">
                                <li>• Monthly investment: ₹25,000 (assuming 12% annual returns)</li>
                                <li>• Alternative: ₹19,500 monthly (at 15% returns with higher risk)</li>
                                <li>• Conservative approach: ₹32,000 monthly (at 9% returns)</li>
                              </ul>
                              <p className="text-sm text-foreground mt-2">Starting early and being consistent is key. Would you like me to calculate for different amounts or timeframes?</p>
                            </>
                          )}
                          
                          {selectedExample.includes("tax-saving") && (
                            <>
                              <p className="text-sm text-foreground">Here are tax-saving investment options under Section 80C (₹1.5 lakh limit):</p>
                              <ul className="text-sm text-foreground mt-2 space-y-1">
                                <li>• ELSS Mutual Funds: 3-year lock-in, potential for higher returns</li>
                                <li>• PPF: 15-year lock-in, completely tax-free, safe investment</li>
                                <li>• NPS: Additional ₹50,000 deduction under 80CCD(1B)</li>
                                <li>• Tax-Saving FDs: 5-year lock-in, fixed returns</li>
                              </ul>
                              <p className="text-sm text-foreground mt-2">Based on your risk profile, I recommend a mix of ELSS and PPF for optimal tax benefits and returns.</p>
                            </>
                          )}
                        </div>
                      }
                      isTyping={false}
                    />
                  </>
                )}
              </div>
              
              <form onSubmit={handleSubmit} className="relative">
                <input 
                  type="text" 
                  className="w-full p-4 pr-12 rounded-full border border-border bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary-100 placeholder:text-muted-foreground/70"
                  placeholder="Ask anything about your investments..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary-500 text-white flex items-center justify-center button-animation"
                  disabled={!inputValue.trim()}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
              
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-3">Try asking about:</p>
                <div className="flex flex-wrap gap-2">
                  {exampleQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleExampleClick(question)}
                      className={cn(
                        "text-xs px-3 py-2 rounded-full border transition-all",
                        selectedExample === question
                          ? "bg-primary-100 border-primary-200 text-primary-700"
                          : "bg-white border-border text-muted-foreground hover:bg-primary-50 hover:border-primary-100 hover:text-primary-600"
                      )}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Link to="/chat">
                  <Button className="rounded-full">
                    Continue to Full AI Assistant <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-primary-100 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-accent/20 rounded-full filter blur-3xl opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
