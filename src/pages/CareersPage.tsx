import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BriefcaseIcon, Building2, Clock, GlobeIcon, HeartHandshake, LightbulbIcon, MapPin } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Mock job listings data
const jobListings = [
  {
    id: "fin-01",
    title: "Senior Financial Analyst",
    department: "Finance",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Join our team as a Senior Financial Analyst to help develop sophisticated financial models and provide strategic insights for our global user base.",
    requirements: [
      "5+ years of experience in financial analysis",
      "Strong understanding of global markets",
      "Excellent analytical and problem-solving skills",
      "Experience with financial modeling and forecasting",
      "Bachelor's degree in Finance, Economics, or related field"
    ]
  },
  {
    id: "eng-01",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-time",
    description: "We're looking for a talented Frontend Developer to help build and improve our user-facing applications with modern technologies like React, TypeScript, and Tailwind CSS.",
    requirements: [
      "4+ years of experience with React and modern JavaScript",
      "Proficient with TypeScript and state management",
      "Experience with responsive design and CSS frameworks",
      "Familiarity with testing frameworks and CI/CD pipelines",
      "Strong problem-solving skills and attention to detail"
    ]
  },
  {
    id: "eng-02",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Help build robust and scalable backend systems that power our financial platform using modern technologies and best practices.",
    requirements: [
      "3+ years of experience in backend development",
      "Strong knowledge of Node.js, Python, or similar",
      "Experience with database design and optimization",
      "Understanding of API design principles",
      "Knowledge of cloud services (AWS, GCP, or Azure)"
    ]
  },
  {
    id: "ai-01",
    title: "Machine Learning Engineer",
    department: "AI Research",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Join our AI team to develop and improve machine learning models that power our financial recommendations and insights engine.",
    requirements: [
      "3+ years of experience in machine learning",
      "Strong understanding of NLP and financial data",
      "Experience with TensorFlow, PyTorch, or similar",
      "Background in statistics and data science",
      "Master's degree or PhD in Computer Science, ML, or related field"
    ]
  },
  {
    id: "mkt-01",
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Lead our growth initiatives to expand our global user base and drive engagement through innovative marketing strategies.",
    requirements: [
      "4+ years of experience in growth marketing",
      "Strong understanding of digital marketing channels",
      "Experience with marketing analytics and A/B testing",
      "Data-driven approach to marketing strategy",
      "Bachelor's degree in Marketing, Business, or related field"
    ]
  },
  {
    id: "cs-01",
    title: "Customer Success Manager",
    department: "Customer Support",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Help our users succeed by providing exceptional support and guidance on using our financial platform effectively.",
    requirements: [
      "3+ years of experience in customer success",
      "Strong communication and interpersonal skills",
      "Understanding of financial products and services",
      "Problem-solving mindset and attention to detail",
      "Bachelor's degree in Business, Communications, or related field"
    ]
  },
];

const CareersPage = () => {
  const [email, setEmail] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you for subscribing to our job alerts!");
    setEmail("");
  };

  const handleApply = (jobId) => {
    toast.success("Your application has been submitted successfully!");
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
                Join Our Global Mission
              </h1>
              <p className="text-lg text-foreground/80 mb-8">
                Help us democratize financial literacy worldwide and empower millions to take control of their financial futures.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#open-positions">
                  <Button className="rounded-full px-6 flex items-center gap-2">
                    <BriefcaseIcon className="h-4 w-4" />
                    View Open Positions
                  </Button>
                </a>
                <Link to="/team">
                  <Button variant="outline" className="rounded-full px-6">
                    Meet Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16">
          <div className="content-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Workplace Values</h2>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                At FinSage, we believe in creating a workplace that fosters growth, innovation, and inclusivity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-primary-100">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <GlobeIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Global First</h3>
                  <p className="text-foreground/80">
                    We're a fully remote, globally distributed team that celebrates diversity and different perspectives.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-primary-100">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <LightbulbIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-foreground/80">
                    We encourage creative thinking and empower our team to develop innovative solutions to complex problems.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-primary-100">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <HeartHandshake className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Impact</h3>
                  <p className="text-foreground/80">
                    We're passionate about making a real difference in people's lives through financial education and empowerment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="py-16 bg-primary-50/50">
          <div className="content-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Work With Us</h2>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                We offer competitive benefits and a supportive environment to help you thrive.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Remote-First Culture",
                  description: "Work from anywhere in the world with flexible hours that suit your lifestyle."
                },
                {
                  title: "Competitive Compensation",
                  description: "Attractive salary packages, equity options, and performance bonuses."
                },
                {
                  title: "Learning & Development",
                  description: "Dedicated budget for professional growth, courses, and conferences."
                },
                {
                  title: "Work-Life Balance",
                  description: "Unlimited PTO, mental health days, and respect for your personal time."
                },
                {
                  title: "Health & Wellness",
                  description: "Comprehensive health insurance and wellness programs for you and your family."
                },
                {
                  title: "Team Retreats",
                  description: "Annual global meetups to connect, collaborate, and celebrate our achievements."
                },
                {
                  title: "Latest Equipment",
                  description: "Home office setup budget and the latest technology to do your best work."
                },
                {
                  title: "Career Growth",
                  description: "Clear paths for advancement and opportunities to grow your skills and responsibilities."
                }
              ].map((benefit, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-sm border border-primary-100">
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-foreground/80">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Open Positions */}
        <section id="open-positions" className="py-16">
          <div className="content-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                Join our team and help shape the future of financial literacy worldwide.
              </p>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-8 flex flex-wrap justify-center">
                <TabsTrigger value="all">All Departments</TabsTrigger>
                <TabsTrigger value="engineering">Engineering</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
                <TabsTrigger value="ai">AI Research</TabsTrigger>
                <TabsTrigger value="support">Customer Support</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                {jobListings.map((job) => (
                  <JobCard key={job.id} job={job} onApply={handleApply} setSelectedJob={setSelectedJob} />
                ))}
              </TabsContent>
              
              <TabsContent value="engineering" className="space-y-6">
                {jobListings.filter(job => job.department === "Engineering").map((job) => (
                  <JobCard key={job.id} job={job} onApply={handleApply} setSelectedJob={setSelectedJob} />
                ))}
              </TabsContent>
              
              <TabsContent value="finance" className="space-y-6">
                {jobListings.filter(job => job.department === "Finance").map((job) => (
                  <JobCard key={job.id} job={job} onApply={handleApply} setSelectedJob={setSelectedJob} />
                ))}
              </TabsContent>
              
              <TabsContent value="marketing" className="space-y-6">
                {jobListings.filter(job => job.department === "Marketing").map((job) => (
                  <JobCard key={job.id} job={job} onApply={handleApply} setSelectedJob={setSelectedJob} />
                ))}
              </TabsContent>
              
              <TabsContent value="ai" className="space-y-6">
                {jobListings.filter(job => job.department === "AI Research").map((job) => (
                  <JobCard key={job.id} job={job} onApply={handleApply} setSelectedJob={setSelectedJob} />
                ))}
              </TabsContent>
              
              <TabsContent value="support" className="space-y-6">
                {jobListings.filter(job => job.department === "Customer Support").map((job) => (
                  <JobCard key={job.id} job={job} onApply={handleApply} setSelectedJob={setSelectedJob} />
                ))}
              </TabsContent>
            </Tabs>
            
            {/* Job Detail Modal */}
            {selectedJob && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">{selectedJob.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-sm bg-primary-50 text-primary-700 px-2 py-1 rounded-full flex items-center gap-1">
                            <Building2 className="h-3 w-3" /> {selectedJob.department}
                          </span>
                          <span className="text-sm bg-secondary-50 text-secondary-700 px-2 py-1 rounded-full flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {selectedJob.location}
                          </span>
                          <span className="text-sm bg-accent-50 text-accent-700 px-2 py-1 rounded-full flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {selectedJob.type}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        onClick={() => setSelectedJob(null)}
                      >
                        ✕
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-2">Job Description</h4>
                        <p className="text-foreground/80">{selectedJob.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-2">Requirements</h4>
                        <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                          {selectedJob.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button 
                          className="w-full"
                          onClick={() => {
                            handleApply(selectedJob.id);
                            setSelectedJob(null);
                          }}
                        >
                          Apply for this Position
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Job Alerts */}
        <section className="py-16 bg-primary-50">
          <div className="content-container">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated on New Opportunities</h2>
              <p className="text-foreground/80 mb-6">
                Subscribe to our job alerts and be the first to know when new positions open up.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="whitespace-nowrap">
                  Subscribe to Alerts
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Job Card Component
const JobCard = ({ job, onApply, setSelectedJob }) => {
  return (
    <Card className="overflow-hidden border-primary-100">
      <CardHeader className="pb-2">
        <CardTitle>{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full flex items-center gap-1">
            <Building2 className="h-3 w-3" /> {job.department}
          </span>
          <span className="text-xs bg-secondary-50 text-secondary-700 px-2 py-1 rounded-full flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {job.location}
          </span>
          <span className="text-xs bg-accent-50 text-accent-700 px-2 py-1 rounded-full flex items-center gap-1">
            <Clock className="h-3 w-3" /> {job.type}
          </span>
        </div>
        <p className="text-sm text-foreground/80">{job.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setSelectedJob(job)}
        >
          View Details
        </Button>
        <Button 
          size="sm"
          className="flex items-center gap-1"
          onClick={() => onApply(job.id)}
        >
          Apply Now <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CareersPage;
