
import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  BookOpen,
  ExternalLink, 
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Module content data
const moduleContents = {
  "module1": {
    title: "Investment Basics",
    description: "Learn the fundamentals of investing and building wealth",
    sections: [
      {
        title: "What is Investing?",
        content: "Investing is the act of allocating resources, usually money, with the expectation of generating income or profit over time. Unlike saving, which is setting aside money for future use with minimal risk, investing involves taking on risk in pursuit of greater returns.",
        image: "📈"
      },
      {
        title: "Types of Investments",
        content: "Common investment types include stocks (ownership in a company), bonds (loans to companies or governments), mutual funds (professionally managed portfolios), real estate, and more specialized options like ETFs, REITs, and cryptocurrency.",
        image: "📊"
      },
      {
        title: "Risk vs. Return",
        content: "A fundamental principle of investing is the relationship between risk and return. Generally, investments with higher potential returns come with higher risks. Understanding your risk tolerance is crucial for building an appropriate investment portfolio.",
        image: "⚖️"
      }
    ],
    resources: [
      {
        title: "The Intelligent Investor",
        author: "Benjamin Graham",
        description: "A comprehensive guide on value investing strategy"
      },
      {
        title: "A Random Walk Down Wall Street",
        author: "Burton Malkiel",
        description: "Explains market theories and investment strategies"
      }
    ]
  },
  "module2": {
    title: "Stock Market 101",
    description: "Understanding how the stock market works",
    sections: [
      {
        title: "What is the Stock Market?",
        content: "The stock market is a collection of exchanges where stocks (pieces of ownership in businesses) are traded. It provides companies with access to capital and investors with potential investment returns through capital gains and dividends.",
        image: "🏢"
      },
      {
        title: "Stock Exchanges",
        content: "Major stock exchanges include the New York Stock Exchange (NYSE) and NASDAQ in the US, as well as international exchanges like the London Stock Exchange, Tokyo Stock Exchange, and Shanghai Stock Exchange.",
        image: "🌎"
      },
      {
        title: "Bull vs. Bear Markets",
        content: "A bull market is characterized by rising stock prices and optimism, while a bear market features falling prices and pessimism. Understanding market cycles can help investors make more informed decisions.",
        image: "🐂🐻"
      }
    ],
    resources: [
      {
        title: "The Little Book of Common Sense Investing",
        author: "John C. Bogle",
        description: "Focuses on index investing strategy"
      },
      {
        title: "One Up On Wall Street",
        author: "Peter Lynch",
        description: "Shares insights on finding market-beating investments"
      }
    ]
  },
  "module3": {
    title: "Mutual Funds Explained",
    description: "Learn how mutual funds work and their benefits",
    sections: [
      {
        title: "What are Mutual Funds?",
        content: "Mutual funds are investment vehicles that pool money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities. They are managed by professional fund managers who make investment decisions on behalf of the fund's investors.",
        image: "💼"
      },
      {
        title: "Types of Mutual Funds",
        content: "Common types include equity funds (stocks), fixed-income funds (bonds), money market funds (short-term debt), balanced funds (mix of stocks and bonds), and index funds (track specific market indices).",
        image: "🔄"
      },
      {
        title: "Advantages and Disadvantages",
        content: "Advantages include diversification, professional management, and accessibility. Disadvantages include fees and expenses, potential tax inefficiency, and lack of control over specific investments.",
        image: "✅❌"
      }
    ],
    resources: [
      {
        title: "Common Sense on Mutual Funds",
        author: "John C. Bogle",
        description: "Comprehensive guide to mutual fund investing"
      },
      {
        title: "The Bogleheads' Guide to Investing",
        author: "Taylor Larimore, Mel Lindauer, Michael LeBoeuf",
        description: "Practical advice for building a simple investment portfolio"
      }
    ]
  },
  "module4": {
    title: "Retirement Planning",
    description: "Building a secure financial future",
    sections: [
      {
        title: "Why Plan for Retirement?",
        content: "Retirement planning involves determining income goals for retirement and the actions and decisions necessary to achieve those goals. Planning early allows you to take advantage of compound interest and adjust your strategy as needed.",
        image: "🏖️"
      },
      {
        title: "Retirement Accounts",
        content: "Common retirement accounts include 401(k)s, IRAs (Traditional and Roth), pension plans, and annuities. Each has different tax advantages, contribution limits, and withdrawal rules.",
        image: "💰"
      },
      {
        title: "The 4% Rule",
        content: "The 4% rule is a guideline suggesting that retirees can withdraw 4% of their retirement portfolio in the first year, then adjust that amount for inflation each subsequent year, with a high probability of not running out of money for at least 30 years.",
        image: "📊"
      }
    ],
    resources: [
      {
        title: "The Simple Path to Wealth",
        author: "J.L. Collins",
        description: "Straightforward approach to financial independence"
      },
      {
        title: "How to Make Your Money Last",
        author: "Jane Bryant Quinn",
        description: "Comprehensive guide for retirement income planning"
      }
    ]
  },
  "module5": {
    title: "Tax-Efficient Investing",
    description: "Strategies to minimize your tax burden",
    sections: [
      {
        title: "The Impact of Taxes on Investments",
        content: "Taxes can significantly reduce investment returns over time. Understanding how different investments and accounts are taxed can help you maximize after-tax returns through strategic placement of assets.",
        image: "💰"
      },
      {
        title: "Tax-Advantaged Accounts",
        content: "These include retirement accounts like 401(k)s and IRAs, Health Savings Accounts (HSAs), and 529 college savings plans. Each offers specific tax advantages for different financial goals.",
        image: "📝"
      },
      {
        title: "Tax-Loss Harvesting",
        content: "This strategy involves selling investments that have experienced losses to offset capital gains tax liability. It can help reduce taxable income while maintaining your overall investment allocation.",
        image: "✂️"
      }
    ],
    resources: [
      {
        title: "Taxes Made Simple",
        author: "Mike Piper",
        description: "Clear explanation of tax concepts for investors"
      },
      {
        title: "The Tax and Legal Playbook",
        author: "Mark J. Kohler",
        description: "Strategies for tax-efficient wealth building"
      }
    ]
  }
};

interface ModuleContentProps {
  moduleId: string;
  onBack: () => void;
}

const ModuleContent = ({ moduleId, onBack }: ModuleContentProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const isMobile = useIsMobile();
  
  const moduleData = moduleContents[moduleId as keyof typeof moduleContents];
  
  if (!moduleData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Module Not Found</CardTitle>
          <CardDescription>
            Sorry, this module content is not available yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onBack}>Go Back</Button>
        </CardContent>
      </Card>
    );
  }
  
  const handleNextSection = () => {
    if (currentSection < moduleData.sections.length - 1) {
      setCurrentSection(currentSection + 1);
      // Mark current section as completed if not already
      if (!completed.includes(currentSection)) {
        setCompleted([...completed, currentSection]);
      }
    } else {
      // Complete the last section
      if (!completed.includes(currentSection)) {
        setCompleted([...completed, currentSection]);
      }
      
      // Show completion toast
      toast({
        title: "Module Section Completed!",
        description: `You've completed ${moduleData.title}. Great job!`,
      });
    }
  };
  
  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };
  
  const handleMarkComplete = () => {
    if (!completed.includes(currentSection)) {
      setCompleted([...completed, currentSection]);
      toast({
        title: "Section Marked Complete",
        description: "Your progress has been saved!",
      });
    }
  };
  
  const progressPercentage = Math.round((completed.length / moduleData.sections.length) * 100);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" />
          Back to Modules
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {progressPercentage}% Complete
          </span>
          <div className="h-2 w-24 bg-slate-100 rounded-full">
            <div 
              className="h-full bg-primary-500 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{moduleData.title}</CardTitle>
              <CardDescription>{moduleData.description}</CardDescription>
            </div>
            <div className="text-3xl">{moduleData.sections[currentSection]?.image || "📚"}</div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            {/* Navigation tabs */}
            <div className={`flex ${isMobile ? "flex-col space-y-2" : "space-x-2"} mb-4`}>
              {moduleData.sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`px-3 py-2 text-sm rounded-md flex items-center gap-1 transition ${
                    currentSection === index 
                      ? "bg-primary-50 text-primary-600 border border-primary-200" 
                      : completed.includes(index)
                        ? "bg-slate-50 text-slate-700 border border-slate-200"
                        : "bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {completed.includes(index) && (
                    <CheckCircle className="h-3.5 w-3.5 text-primary-500" />
                  )}
                  <span>{index + 1}. {section.title}</span>
                </button>
              ))}
            </div>
            
            {/* Current section content */}
            <div className="prose max-w-none">
              <h2 className="text-xl font-bold mb-3">{moduleData.sections[currentSection].title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {moduleData.sections[currentSection].content}
              </p>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between items-center pt-4 mt-6 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevSection}
                disabled={currentSection === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <Button
                variant="outline"
                size="sm" 
                onClick={handleMarkComplete}
                disabled={completed.includes(currentSection)}
              >
                <Award className="h-4 w-4 mr-1" />
                Mark Complete
              </Button>
              
              <Button
                size="sm"
                onClick={handleNextSection}
                disabled={currentSection === moduleData.sections.length - 1 && completed.includes(currentSection)}
              >
                {currentSection === moduleData.sections.length - 1 ? (
                  <>
                    Complete <CheckCircle className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Resources</CardTitle>
          <CardDescription>
            Recommended reading to deepen your understanding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {moduleData.resources.map((resource, index) => (
              <div 
                key={index}
                className="border border-border rounded-lg p-4 hover:bg-slate-50 transition-colors"
              >
                <h3 className="font-medium flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-primary-500" />
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">by {resource.author}</p>
                <p className="text-sm mt-2">{resource.description}</p>
                <div className="mt-3">
                  <Button variant="link" size="sm" className="px-0 h-auto text-primary-600">
                    Find this book <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleContent;
