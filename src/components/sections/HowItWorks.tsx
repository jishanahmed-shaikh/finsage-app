
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { PieChart, BarChart2, MessageCircle, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "View Your Portfolio",
    description: "See your asset allocation, track performance, and get a complete overview of your investments.",
    icon: <PieChart className="w-6 h-6" />,
    path: "/dashboard"
  },
  {
    title: "Analyze Stocks",
    description: "Track stock performance with interactive charts and compare different investment options.",
    icon: <BarChart2 className="w-6 h-6" />,
    path: "/stocks"
  },
  {
    title: "Get AI Guidance",
    description: "Ask our AI assistant any financial questions and receive personalized investment advice.",
    icon: <MessageCircle className="w-6 h-6" />,
    path: "/chat"
  },
  {
    title: "Plan Your Investments",
    description: "Use our calculators to project returns and make data-driven investment decisions.",
    icon: <Wallet className="w-6 h-6" />,
    path: "/dashboard"
  }
];

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);

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

    const element = document.getElementById("how-it-works");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      
      <div className="content-container">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700 mb-4">
              Getting Started
            </span>
          </div>
          <h2 className="heading-lg mb-4">How to Use FinSage</h2>
          <p className="text-muted-foreground text-lg">
            Our platform makes it easy to manage your investments and get financial guidance in four simple steps.
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary-100 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={cn(
                  "flex flex-col items-center text-center transition-all duration-700",
                  isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm border border-primary-100 relative">
                  <div className="text-primary-600">{step.icon}</div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <Link to={step.path}>
                  <Button variant="outline" size="sm" className="rounded-full border-primary-200 text-primary-700 hover:bg-primary-50">
                    Try Now
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/dashboard">
            <Button 
              size="lg" 
              className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-8 button-animation"
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
