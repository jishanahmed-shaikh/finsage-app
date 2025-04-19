
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownToLine, ArrowRight, Calendar, Download, ExternalLink, FileText, Globe, Mail, Newspaper } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Mock press releases
const pressReleases = [
  {
    id: 1,
    title: "FinSage Launches Global Platform to Democratize Financial Literacy",
    date: "June 15, 2023",
    summary: "FinSage announces the launch of its innovative AI-powered platform designed to make financial literacy accessible to everyone worldwide.",
    content: "GLOBAL - FinSage, a pioneering financial technology company, today announced the global launch of its comprehensive financial literacy platform. The platform leverages artificial intelligence to provide personalized financial guidance and education to users worldwide, regardless of their background or experience level.\n\n'Our mission is to democratize financial literacy and empower people everywhere to make informed financial decisions,' said Jishanahmed AR Shaikh, Founder and CEO of FinSage. 'With our platform, we're breaking down the barriers that have traditionally kept financial knowledge in the hands of the few.'\n\nThe FinSage platform offers personalized learning paths, AI-powered financial assistance, and interactive tools that adapt to each user's unique circumstances and goals. From investment basics to retirement planning, the platform covers a wide range of financial topics in an accessible, jargon-free manner.\n\nThe launch comes at a time when financial literacy rates worldwide remain concerningly low, with studies showing that less than one-third of adults globally understand basic financial concepts. FinSage aims to address this gap through technology-enabled education that's accessible to anyone with an internet connection.\n\nAbout FinSage:\nFinSage is a global financial technology company dedicated to democratizing financial literacy through AI-powered guidance and personalized education. Founded in 2023, the company serves users worldwide with its innovative platform designed to make complex financial concepts accessible to everyone."
  },
  {
    id: 2,
    title: "FinSage Secures $5 Million in Seed Funding to Expand Global Reach",
    date: "September 8, 2023",
    summary: "Financial literacy platform FinSage announces successful completion of seed funding round to accelerate international growth and product development.",
    content: "GLOBAL - FinSage, the AI-powered financial literacy platform, today announced it has secured $5 million in seed funding to accelerate its global expansion and enhance its technology capabilities. The funding round was led by Horizon Ventures, with participation from Global Impact Capital and several strategic angel investors.\n\n'This investment will enable us to reach millions more people worldwide with the financial knowledge they need to secure their futures,' said Jishanahmed AR Shaikh, Founder and CEO of FinSage. 'We're excited to partner with investors who share our vision of making financial literacy accessible to everyone, regardless of their geographic location or background.'\n\nThe company plans to use the funding to expand its team, enhance its AI capabilities, and develop new features that make financial concepts even more accessible to users worldwide. Additionally, FinSage will focus on localization efforts to ensure its platform is relevant to users across different countries and financial systems.\n\n'FinSage's innovative approach to financial education has the potential to transform how people around the world engage with financial concepts,' said Sarah Chen, Partner at Horizon Ventures. 'We're thrilled to support their mission of democratizing financial literacy globally.'\n\nSince its launch earlier this year, FinSage has attracted users from over 75 countries, demonstrating the global demand for accessible financial education.\n\nAbout FinSage:\nFinSage is a global financial technology company dedicated to democratizing financial literacy through AI-powered guidance and personalized education. Founded in 2023, the company serves users worldwide with its innovative platform designed to make complex financial concepts accessible to everyone."
  },
  {
    id: 3,
    title: "FinSage Introduces Advanced Portfolio Analytics for Retail Investors",
    date: "November 22, 2023",
    summary: "New features provide everyday investors with institutional-grade portfolio analysis and optimization tools to improve investment decision-making.",
    content: "GLOBAL - FinSage today announced the launch of Advanced Portfolio Analytics, a new suite of tools designed to give retail investors access to sophisticated portfolio analysis capabilities previously available only to institutional investors. The new features include risk assessment, diversification analysis, performance attribution, and optimization recommendations.\n\n'We believe that powerful investment tools shouldn't be restricted to Wall Street professionals,' said Jishanahmed AR Shaikh, Founder and CEO of FinSage. 'With Advanced Portfolio Analytics, we're putting institutional-grade capabilities in the hands of everyday investors worldwide, helping them make more informed decisions about their investments.'\n\nThe new tools leverage advanced algorithms to analyze users' existing portfolios and provide actionable insights for improvement. The system can identify concentration risks, analyze sector exposures, evaluate performance against benchmarks, and suggest optimization strategies based on the user's risk tolerance and financial goals.\n\nEarly beta testers have reported significant improvements in their investment decision-making process. 'The portfolio analytics tools helped me identify that I was overexposed to technology stocks and underweight in other important sectors,' said Maria Rodriguez, a FinSage user from Spain. 'The rebalancing suggestions were clear and helped me create a more resilient portfolio.'\n\nAdvanced Portfolio Analytics is available to all FinSage users at no additional cost, reflecting the company's commitment to democratizing sophisticated financial tools.\n\nAbout FinSage:\nFinSage is a global financial technology company dedicated to democratizing financial literacy through AI-powered guidance and personalized education. Founded in 2023, the company serves users worldwide with its innovative platform designed to make complex financial concepts accessible to everyone."
  },
  {
    id: 4,
    title: "FinSage Partners with Global Universities to Advance Financial Education",
    date: "February 9, 2024",
    summary: "Strategic partnerships with leading academic institutions aim to enhance financial literacy curriculum and research worldwide.",
    content: "GLOBAL - FinSage today announced the formation of the Global Financial Literacy Alliance, a collaborative initiative with 12 leading universities across six continents. The alliance will focus on advancing financial education research, developing curriculum resources, and creating new pathways to financial literacy for students worldwide.\n\n'Financial education is foundational to economic opportunity and should be integrated into learning at all levels,' said Jishanahmed AR Shaikh, Founder and CEO of FinSage. 'By partnering with these prestigious institutions, we're combining academic rigor with technological innovation to create more effective approaches to financial literacy.'\n\nThe alliance includes universities from North America, Europe, Asia, Africa, South America, and Australia, ensuring a truly global perspective. Through the partnership, FinSage will provide participating institutions with access to its platform for research purposes, while the universities will contribute academic expertise to enhance the platform's educational content.\n\nThe initiative will also create opportunities for student involvement through internships, research projects, and hackathons focused on financial technology solutions. Additionally, the alliance will publish an annual Global Financial Literacy Report tracking progress and identifying challenges in financial education worldwide.\n\n'This collaboration represents an important step forward in our understanding of how technology can enhance financial education,' said Dr. Elena Vasquez, Director of Financial Studies at Universidad de Santiago and a member of the alliance. 'We're excited to work with FinSage and our fellow institutions to develop evidence-based approaches that can be adapted to different cultural and economic contexts.'\n\nAbout FinSage:\nFinSage is a global financial technology company dedicated to democratizing financial literacy through AI-powered guidance and personalized education. Founded in 2023, the company serves users worldwide with its innovative platform designed to make complex financial concepts accessible to everyone."
  },
  {
    id: 5,
    title: "FinSage Reaches 1 Million User Milestone as Global Demand for Financial Education Surges",
    date: "April 28, 2024",
    summary: "AI-powered financial literacy platform achieves significant user growth across 150+ countries, highlighting worldwide interest in accessible financial education.",
    content: "GLOBAL - FinSage today announced it has surpassed one million registered users across more than 150 countries, marking a significant milestone in the company's mission to democratize financial literacy worldwide. The rapid growth, achieved in less than a year since the platform's launch, reflects the global demand for accessible financial education.\n\n'Reaching one million users is more than a milestone for our company—it's a testament to the universal need for financial knowledge presented in an accessible, personalized way,' said Jishanahmed AR Shaikh, Founder and CEO of FinSage. 'We're honored by the trust our users have placed in us and remain committed to empowering people everywhere to take control of their financial futures.'\n\nUser data reveals diverse adoption across regions, with significant growth in emerging markets where traditional financial education resources may be limited. The platform has seen particularly strong growth in Southeast Asia, Latin America, and Africa, with users spanning all adult age groups and various levels of prior financial knowledge.\n\n'What's particularly encouraging is the engagement we're seeing,' added Shaikh. 'Users aren't just signing up—they're completing learning modules, using our tools regularly, and demonstrating measurable improvements in their financial knowledge. That's the impact we set out to create.'\n\nTo mark the milestone, FinSage announced the launch of its Global Financial Literacy Initiative, which will provide free access to its platform for nonprofit organizations focused on economic empowerment in underserved communities.\n\nAbout FinSage:\nFinSage is a global financial technology company dedicated to democratizing financial literacy through AI-powered guidance and personalized education. Founded in 2023, the company serves users worldwide with its innovative platform designed to make complex financial concepts accessible to everyone."
  }
];

// Mock media coverage
const mediaCoverage = [
  {
    id: 1,
    publication: "TechCrunch",
    title: "FinSage's AI Approach to Financial Literacy Could Reshape Global Education",
    date: "July 2, 2023",
    summary: "An in-depth look at how FinSage is using artificial intelligence to make financial education more accessible and personalized worldwide.",
    url: "#"
  },
  {
    id: 2,
    publication: "Financial Times",
    title: "Start-up Spotlight: FinSage Takes on the Global Financial Literacy Gap",
    date: "October 15, 2023",
    summary: "Founder Jishanahmed AR Shaikh shares his vision for democratizing financial education through technology and personalization.",
    url: "#"
  },
  {
    id: 3,
    publication: "CNBC",
    title: "FinSage Raises $5M to Bring Financial Education to Underserved Markets",
    date: "September 10, 2023",
    summary: "Investors bet on FinSage's innovative approach to making financial concepts accessible to users worldwide.",
    url: "#"
  },
  {
    id: 4,
    publication: "Forbes",
    title: "How FinSage Is Using AI to Tackle the Global Financial Literacy Crisis",
    date: "December 5, 2023",
    summary: "A feature on FinSage's mission and the potential impact of increasing financial literacy in emerging economies.",
    url: "#"
  },
  {
    id: 5,
    publication: "Bloomberg",
    title: "FinSage's New Portfolio Tools Bring Institutional Analysis to Everyday Investors",
    date: "November 24, 2023",
    summary: "An examination of how FinSage is leveling the playing field for retail investors with advanced analytics tools.",
    url: "#"
  },
  {
    id: 6,
    publication: "The Economist",
    title: "Financial Literacy in the Digital Age: FinSage's Global Approach",
    date: "January 18, 2024",
    summary: "A look at how FinSage is addressing financial education needs across different cultural and economic contexts.",
    url: "#"
  },
  {
    id: 7,
    publication: "Wall Street Journal",
    title: "FinSage Partners with Universities to Advance Financial Education Research",
    date: "February 11, 2024",
    summary: "Details on the company's academic partnerships and their potential impact on financial literacy initiatives.",
    url: "#"
  },
  {
    id: 8,
    publication: "Reuters",
    title: "FinSage Hits 1 Million Users as Demand for Financial Education Grows",
    date: "April 29, 2024",
    summary: "Coverage of FinSage's rapid growth and the increasing global interest in accessible financial knowledge.",
    url: "#"
  }
];

const PressPage = () => {
  const [selectedRelease, setSelectedRelease] = useState(null);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing to our press updates!");
    setEmail("");
  };

  const handleDownload = (id) => {
    toast.success("Press kit downloaded successfully!");
  };

  const handleExternalLink = (publication) => {
    toast.info(`Visiting ${publication} website would open in a new tab`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white py-20">
          <div className="content-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-6">
                Press & Media
              </h1>
              <p className="text-lg text-foreground/80 mb-8">
                Stay updated with the latest news and announcements from FinSage as we work to democratize financial literacy globally.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  className="rounded-full px-6 flex items-center gap-2"
                  onClick={() => handleDownload('press-kit')}
                >
                  <Download className="h-4 w-4" />
                  Download Press Kit
                </Button>
                <a href="#contact">
                  <Button variant="outline" className="rounded-full px-6 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Media Inquiries
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Press Content */}
        <section className="py-16">
          <div className="content-container">
            <Tabs defaultValue="releases" className="w-full">
              <TabsList className="mb-8 w-full max-w-md mx-auto">
                <TabsTrigger value="releases" className="flex-1">Press Releases</TabsTrigger>
                <TabsTrigger value="coverage" className="flex-1">Media Coverage</TabsTrigger>
              </TabsList>
              
              <TabsContent value="releases" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {pressReleases.map((release) => (
                    <Card key={release.id} className="border-primary-100 hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          {release.date}
                        </div>
                        <CardTitle className="text-xl">{release.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground/80">{release.summary}</p>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-primary-600"
                          onClick={() => setSelectedRelease(release)}
                        >
                          Read Full Release →
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="coverage" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mediaCoverage.map((article) => (
                    <Card key={article.id} className="border-primary-100 hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="font-medium text-primary-600">{article.publication}</span>
                          <span className="text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {article.date}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-foreground/80">{article.summary}</p>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-primary-600 flex items-center"
                          onClick={() => handleExternalLink(article.publication)}
                        >
                          Read Article <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Press Release Modal */}
            {selectedRelease && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          {selectedRelease.date}
                        </div>
                        <h3 className="text-2xl font-bold">{selectedRelease.title}</h3>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        onClick={() => setSelectedRelease(null)}
                      >
                        ✕
                      </Button>
                    </div>
                    
                    <div className="space-y-4 text-foreground/80">
                      {selectedRelease.content.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex gap-4">
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-1"
                        onClick={() => handleDownload(selectedRelease.id)}
                      >
                        <ArrowDownToLine className="h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button 
                        onClick={() => setSelectedRelease(null)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Company Assets */}
        <section className="py-16 bg-primary-50/50">
          <div className="content-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Company Assets</h2>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                Download official FinSage logos, images, and brand guidelines for media use.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-primary-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary-600" />
                    Brand Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80">
                    Official guidelines for using the FinSage brand, including logo specs, color palette, and typography.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleDownload('brand-guidelines')}
                  >
                    Download PDF
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-primary-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary-600" />
                    Logo Package
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80">
                    FinSage logos in various formats (PNG, SVG, EPS) for both light and dark backgrounds.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleDownload('logo-package')}
                  >
                    Download ZIP
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-primary-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-primary-600" />
                    Press Kit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80">
                    Comprehensive media kit with company facts, executive bios, product images, and more.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleDownload('press-kit')}
                  >
                    Download ZIP
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Media Contact */}
        <section id="contact" className="py-16">
          <div className="content-container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Media Contact</h2>
                <p className="text-foreground/80">
                  For press inquiries, interview requests, and other media opportunities, please contact our press team.
                </p>
              </div>
              
              <Card className="border-primary-100">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg">Contact Information</h3>
                      <div>
                        <p className="font-medium">Email:</p>
                        <a href="mailto:press@finsage.com" className="text-primary-600">press@finsage.com</a>
                      </div>
                      <div>
                        <p className="font-medium">Phone:</p>
                        <p>+1 (555) 123-4567</p>
                      </div>
                      <div>
                        <p className="font-medium">Response Time:</p>
                        <p>We typically respond to media inquiries within 24 hours.</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg">Subscribe to Press Updates</h3>
                      <p className="text-sm text-foreground/80">
                        Sign up to receive our press releases and company announcements directly in your inbox.
                      </p>
                      <form onSubmit={handleSubscribe} className="space-y-3">
                        <Input
                          type="email"
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <Button type="submit" className="w-full">
                          Subscribe
                        </Button>
                      </form>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PressPage;
