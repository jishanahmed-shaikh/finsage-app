
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Twitter, Github, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TeamPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white py-20">
          <div className="content-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-6">
                Meet Our Visionary Leader
              </h1>
              <p className="text-lg text-foreground/80 mb-8">
                The driving force behind FinSage's mission to democratize financial literacy globally
              </p>
            </div>
          </div>
        </section>
        
        {/* Founder Profile */}
        <section className="py-16">
          <div className="content-container">
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-12">
                  <div className="md:col-span-5 bg-gradient-to-br from-primary-100 to-primary-50 p-8 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-white shadow-xl overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-primary-200 to-accent-100 flex items-center justify-center">
                        <span className="text-5xl font-bold text-primary-600">JS</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-7 p-8">
                    <h2 className="text-2xl font-bold mb-1">Jishanahmed AR Shaikh</h2>
                    <p className="text-primary-600 font-medium mb-4">Founder, CEO & CTO</p>
                    
                    <p className="text-foreground/80 mb-4">
                      Jishanahmed is a visionary entrepreneur passionate about democratizing financial literacy globally. With a background in technology and finance, he founded FinSage to bridge the gap between complex financial concepts and everyday users.
                    </p>
                    
                    <p className="text-foreground/80 mb-6">
                      Under his leadership, FinSage has grown into a platform that leverages cutting-edge AI to provide personalized financial guidance and education to users across the globe, regardless of their background or experience level.
                    </p>
                    
                    <div className="flex space-x-3 mb-6">
                      <a href="https://www.linkedin.com/in/jishanahmedshaikh" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a href="https://www.x.com/jishanarshaikh" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a href="https://www.github.com/jishanahmed-shaikh" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors">
                        <Github className="h-5 w-5" />
                      </a>
                      <a href="mailto:shaikhjishan255@gmail.com" className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors">
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">Entrepreneurship</span>
                        <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">Financial Technology</span>
                        <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">AI & Machine Learning</span>
                        <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">Global Finance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="mt-12 space-y-6">
                <h3 className="text-2xl font-bold">About Jishanahmed</h3>
                <p className="text-foreground/80">
                  Jishanahmed AR Shaikh founded FinSage with a clear vision: to make financial literacy accessible to everyone, regardless of their background or geographic location. With expertise spanning finance, technology, and business strategy, he brings a unique perspective to the challenge of global financial education.
                </p>
                
                <p className="text-foreground/80">
                  Prior to founding FinSage, Jishanahmed worked at the intersection of financial services and technology, where he witnessed firsthand the barriers preventing millions of people worldwide from accessing quality financial guidance and education.
                </p>
                
                <p className="text-foreground/80">
                  Recognizing that AI and personalized learning could democratize financial knowledge, he assembled a vision for FinSage – a platform that combines artificial intelligence with financial expertise to provide tailored guidance to users everywhere.
                </p>
                
                <h3 className="text-2xl font-bold pt-4">Leadership Philosophy</h3>
                <p className="text-foreground/80">
                  Jishanahmed leads FinSage with a philosophy centered on innovation, accessibility, and impact. He believes that financial empowerment is a fundamental right, and that technology can be leveraged to make complex financial concepts understandable and accessible to everyone.
                </p>
                
                <p className="text-foreground/80">
                  As both CEO and CTO, he directs the company's strategic vision while ensuring that FinSage remains at the cutting edge of financial technology. His hands-on approach to leadership has fostered a culture of continuous improvement and user-centric innovation.
                </p>
                
                <div className="bg-primary-50 p-6 rounded-lg border border-primary-100 mt-8">
                  <h4 className="text-lg font-bold mb-3">Our Mission in Jishanahmed's Words</h4>
                  <blockquote className="text-foreground/90 italic">
                    "Financial literacy shouldn't be a privilege – it's a necessity in today's complex economic landscape. At FinSage, we're breaking down the barriers that have traditionally kept financial knowledge in the hands of the few. Through technology and personalized learning, we're empowering people worldwide to take control of their financial futures."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Vision Section */}
        <section className="py-16 bg-primary-50/50">
          <div className="content-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">The Vision for FinSage</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-white border-primary-100">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3">Global Financial Literacy</h3>
                    <p className="text-foreground/80">
                      Under Jishanahmed's leadership, FinSage is working to create a world where everyone has access to the financial knowledge they need to make informed decisions about their money, investments, and future security.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-primary-100">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3">AI-Powered Personalization</h3>
                    <p className="text-foreground/80">
                      Jishanahmed's technical expertise drives FinSage's commitment to using artificial intelligence not just as a tool, but as a means to provide truly personalized financial guidance tailored to each user's unique circumstances.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-primary-100">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3">Inclusive Design</h3>
                    <p className="text-foreground/80">
                      FinSage's platform is designed with inclusivity at its core, ensuring that people from all backgrounds and knowledge levels can benefit from our tools and resources without feeling overwhelmed or excluded.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-primary-100">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3">Continuous Innovation</h3>
                    <p className="text-foreground/80">
                      Under Jishanahmed's technical leadership, FinSage remains committed to continuous innovation, constantly improving our platform to better serve users and adapt to the evolving global financial landscape.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Join Us CTA */}
        <section className="py-20 bg-gradient-to-b from-white to-primary-50/30">
          <div className="content-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Join Our Growing Team</h2>
              <p className="text-foreground/80 mb-8">
                Interested in working with Jishanahmed and contributing to our mission of global financial literacy? We're always looking for talented individuals who share our passion.
              </p>
              <Link to="/careers">
                <Button className="rounded-full px-6 flex items-center gap-2">
                  View Career Opportunities <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TeamPage;
