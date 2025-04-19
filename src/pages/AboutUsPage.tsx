
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Globe, Users, Shield, Award, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const AboutUsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white py-20">
          <div className="content-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-6">
                Our Mission: Financial Literacy for All
              </h1>
              <p className="text-lg text-foreground/80 mb-8">
                FinSage is on a mission to democratize financial literacy globally, empowering individuals everywhere to make informed financial decisions through AI-powered guidance and personalized education.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/team">
                  <Button className="rounded-full px-6 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Meet Our Team
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button variant="outline" className="rounded-full px-6">
                    Try FinSage AI
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Company Story */}
        <section className="py-16">
          <div className="content-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-foreground/80 mb-4">
                  FinSage was founded in 2023 with a clear vision: to break down the barriers that prevent millions of people worldwide from accessing quality financial education and guidance.
                </p>
                <p className="text-foreground/80 mb-4">
                  Our founder, Jishanahmed AR Shaikh, recognized that financial literacy was a global challenge, with individuals from all walks of life struggling to navigate the complexities of personal finance, investing, and wealth management.
                </p>
                <p className="text-foreground/80 mb-6">
                  By combining cutting-edge AI technology with financial expertise, FinSage has created an accessible platform that provides personalized guidance to users regardless of their background, experience, or geographical location.
                </p>
                <Link to="/team">
                  <Button variant="link" className="p-0 h-auto flex items-center gap-1 text-primary-600">
                    Learn more about our founder
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="order-1 md:order-2 bg-gradient-to-tr from-primary-100 to-primary-50 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                  <div className="absolute inset-0 bg-white/80 blur-3xl rounded-full"></div>
                  <div className="relative bg-white shadow-xl rounded-xl p-8 text-center">
                    <div className="w-20 h-20 mx-auto bg-primary-50 rounded-full flex items-center justify-center mb-4">
                      <Award className="h-10 w-10 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Our Values</h3>
                    <ul className="text-left space-y-3 mt-4">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary-600 mt-0.5" />
                        <span className="text-foreground/80">Accessibility for everyone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary-600 mt-0.5" />
                        <span className="text-foreground/80">Transparency in guidance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary-600 mt-0.5" />
                        <span className="text-foreground/80">Empowerment through education</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary-600 mt-0.5" />
                        <span className="text-foreground/80">Innovation with integrity</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Global Impact */}
        <section className="py-16 bg-primary-50/50">
          <div className="content-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Global Impact</h2>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                FinSage is making a difference worldwide, helping people from all backgrounds take control of their financial futures.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border-primary-100">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                  <p className="text-foreground/80">
                    Serving users across 150+ countries with localized financial guidance and education.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-primary-100">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">User Community</h3>
                  <p className="text-foreground/80">
                    Over 500,000 users have improved their financial knowledge through our platform.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-primary-100">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Trust & Security</h3>
                  <p className="text-foreground/80">
                    Industry-leading security protocols protecting user data and financial information.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-white to-primary-50/30">
          <div className="content-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Start Your Financial Journey?</h2>
              <p className="text-foreground/80 mb-8">
                Join thousands of users worldwide who are taking control of their financial future with FinSage's personalized guidance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/dashboard">
                  <Button className="rounded-full px-8 py-6 text-lg">
                    Get Started Now
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button variant="outline" className="rounded-full px-8 py-6 text-lg">
                    Explore Our Learning Hub
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUsPage;
