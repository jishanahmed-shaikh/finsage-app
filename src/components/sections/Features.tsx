
import { cn } from "@/lib/utils";
import FeatureCard from "../ui-custom/FeatureCard";
import { useEffect, useState } from "react";
import { BarChart2, PieChart, Wallet, Trophy, MessageCircle, BookOpen } from "lucide-react";

const Features = () => {
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

    const element = document.getElementById("features");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const features = [
    {
      title: "Portfolio Dashboard",
      description: "View your entire financial portfolio at a glance with asset allocation and performance metrics.",
      icon: <PieChart className="w-6 h-6" />,
      delay: 0,
      path: "/dashboard"
    },
    {
      title: "Stock Performance",
      description: "Track stock performance with interactive charts and real-time data visualization.",
      icon: <BarChart2 className="w-6 h-6" />,
      delay: 100,
      path: "/stocks"
    },
    {
      title: "AI Financial Assistant",
      description: "Get personalized investment advice and answers to all your financial questions.",
      icon: <MessageCircle className="w-6 h-6" />,
      delay: 200,
      path: "/chat"
    },
    {
      title: "Returns Calculator",
      description: "Calculate potential returns on investments with our easy-to-use financial calculator.",
      icon: <Wallet className="w-6 h-6" />,
      delay: 300,
      path: "/dashboard"
    },
    {
      title: "Financial Learning",
      description: "Learn about investing and finance through our gamified educational platform.",
      icon: <BookOpen className="w-6 h-6" />,
      delay: 400,
      path: "/learn"
    },
    {
      title: "Achievement Tracking",
      description: "Track your progress and earn rewards as you improve your financial knowledge and portfolio.",
      icon: <Trophy className="w-6 h-6" />,
      delay: 500,
      path: "/learn"
    }
  ];

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-40 right-0 w-72 h-72 bg-primary-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      
      <div className="content-container">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700 mb-4">
              Platform Features
            </span>
          </div>
          <h2 className="heading-lg mb-4">Everything You Need to Manage Your Finances</h2>
          <p className="text-muted-foreground text-lg">
            Our platform combines portfolio tracking, stock analysis, and AI assistance to help you make better investment decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "transition-all duration-700",
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${feature.delay}ms` }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                path={feature.path}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
