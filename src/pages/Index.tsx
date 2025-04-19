
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import ChatInterface from "@/components/sections/ChatInterface";
import HowItWorks from "@/components/sections/HowItWorks";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";
import StockPerformanceGuide from "@/components/sections/StockPerformanceGuide";
import { useViewport } from "@/hooks/use-viewport";

const Index = () => {
  const { isMobile } = useViewport();
  
  // Preload animation classes
  useEffect(() => {
    document.body.classList.add('animate-fade-in');
    
    return () => {
      document.body.classList.remove('animate-fade-in');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow">
        <Hero />
        <Features />
        <StockPerformanceGuide />
        <ChatInterface />
        <HowItWorks />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
