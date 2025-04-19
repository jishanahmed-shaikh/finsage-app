
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useViewport } from "@/hooks/use-viewport";

const LegalPage = () => {
  const { isMobile } = useViewport();
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-1 pt-16 md:pt-24">
        <div className="content-container py-8 md:py-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Legal Information</h1>
            
            <div className="prose prose-blue max-w-none">
              <p className="mb-6 md:mb-8 text-base md:text-lg">
                FinSage is committed to operating with transparency, integrity, and in full compliance with all applicable laws and regulations.
                This page provides access to important legal information about our platform, services, and company policies.
              </p>
              
              <div className="grid grid-cols-1 gap-4 md:gap-6 mb-8 md:mb-12">
                <div className="bg-primary-50 p-4 md:p-6 rounded-lg border border-primary-100">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Terms of Service</h3>
                  <p className="mb-3 md:mb-4 text-sm md:text-base">
                    Our Terms of Service outline the rules and guidelines for using FinSage's platform and services.
                  </p>
                  <Link to="/terms-of-service">
                    <Button variant="outline" className="flex items-center gap-1 text-sm">
                      Read Terms <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-primary-50 p-4 md:p-6 rounded-lg border border-primary-100">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Privacy Policy</h3>
                  <p className="mb-3 md:mb-4 text-sm md:text-base">
                    Our Privacy Policy explains how we collect, use, and protect your personal information.
                  </p>
                  <Link to="/privacy-policy">
                    <Button variant="outline" className="flex items-center gap-1 text-sm">
                      Read Policy <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <h2 className="text-xl md:text-2xl font-semibold mt-6 md:mt-8 mb-3 md:mb-4">Regulatory Information</h2>
              <p className="mb-4 md:mb-6 text-sm md:text-base">
                While FinSage provides educational content and tools related to financial topics, we are not a registered 
                investment advisor, broker-dealer, or financial institution. Our services are designed for educational 
                and informational purposes only.
              </p>
              
              <div className="bg-accent-50 p-4 md:p-6 rounded-lg border border-accent-100 mb-6 md:mb-8 text-sm md:text-base">
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Important Disclaimer</h3>
                <p>
                  The information provided through FinSage is for educational purposes only and should not be considered 
                  financial advice. We recommend consulting with a qualified financial advisor before making investment 
                  decisions. Past performance is not indicative of future results, and investments may lose value.
                </p>
              </div>
              
              <h2 className="text-xl md:text-2xl font-semibold mt-6 md:mt-8 mb-3 md:mb-4">Data Compliance</h2>
              <p className="mb-3 md:mb-4 text-sm md:text-base">
                FinSage complies with applicable data protection laws, including:
              </p>
              <ul className="list-disc pl-5 md:pl-6 mb-4 md:mb-6 text-sm md:text-base">
                <li className="mb-1 md:mb-2">General Data Protection Regulation (GDPR)</li>
                <li className="mb-1 md:mb-2">California Consumer Privacy Act (CCPA)</li>
                <li className="mb-1 md:mb-2">Other applicable regional and national data protection regulations</li>
              </ul>
              
              <h2 className="text-xl md:text-2xl font-semibold mt-6 md:mt-8 mb-3 md:mb-4">Intellectual Property</h2>
              <p className="mb-4 md:mb-6 text-sm md:text-base">
                All content, features, and functionality available through FinSage, including but not limited to text, 
                graphics, logos, icons, images, audio clips, and software, are owned by FinSage or its licensors and 
                are protected by international copyright, trademark, and other intellectual property laws.
              </p>
              
              <h2 className="text-xl md:text-2xl font-semibold mt-6 md:mt-8 mb-3 md:mb-4">Contact Our Legal Team</h2>
              <p className="mb-2 md:mb-4 text-sm md:text-base">
                If you have any questions or concerns about our legal policies or information, please contact our legal team at:
              </p>
              <p className="mb-4 text-sm md:text-base">
                Email: <a href="mailto:legal@finsage.com" className="text-primary-600 hover:underline">legal@finsage.com</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LegalPage;
