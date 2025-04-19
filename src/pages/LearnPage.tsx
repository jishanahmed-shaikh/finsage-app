import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, Check, X, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "@/components/layout/Navbar";
import ModuleContent from "@/components/learn/ModuleContent";

// Learning modules data
const modules = [
  {
    id: "module1",
    title: "Investment Basics",
    description: "Learn the fundamentals of investing and building wealth",
    progress: 30,
    icon: "📊"
  },
  {
    id: "module2",
    title: "Stock Market 101",
    description: "Understanding how the stock market works",
    progress: 0,
    icon: "📈"
  },
  {
    id: "module3",
    title: "Mutual Funds Explained",
    description: "Learn how mutual funds work and their benefits",
    progress: 15,
    icon: "💼"
  },
  {
    id: "module4",
    title: "Retirement Planning",
    description: "Building a secure financial future",
    progress: 0,
    icon: "🏖️"
  },
  {
    id: "module5",
    title: "Tax-Efficient Investing",
    description: "Strategies to minimize your tax burden",
    progress: 0,
    icon: "💰"
  }
];

// Quiz data for gamification
const quizzes = [
  {
    id: "quiz1",
    title: "Investment Basics Quiz",
    questions: 10,
    difficulty: "Beginner",
    points: 100
  },
  {
    id: "quiz2",
    title: "Stock Market Challenge",
    questions: 15,
    difficulty: "Intermediate",
    points: 150
  },
  {
    id: "quiz3",
    title: "Financial Planning Master",
    questions: 20,
    difficulty: "Advanced",
    points: 200
  }
];

// Investment basics quiz questions
const investmentQuizQuestions = [
  {
    id: 1,
    question: "What is the primary goal of investing?",
    options: [
      "To spend money quickly",
      "To grow wealth over time",
      "To avoid taxes",
      "To impress friends"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which of these is typically considered the safest investment?",
    options: [
      "Cryptocurrency",
      "Penny stocks",
      "Government bonds",
      "Collectible items"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What is diversification?",
    options: [
      "Investing all your money in one stock",
      "Spreading investments across different assets",
      "Investing only in foreign markets",
      "Changing your investment strategy daily"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What does ROI stand for?",
    options: [
      "Risk Of Investment",
      "Return On Investment",
      "Rate Of Inflation",
      "Review Of Income"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Which of these is NOT a type of retirement account?",
    options: [
      "401(k)",
      "IRA",
      "Roth IRA",
      "FOMO"
    ],
    correctAnswer: 3
  }
];

// Stock market quiz questions
const stockMarketQuizQuestions = [
  {
    id: 1,
    question: "What is a bull market?",
    options: [
      "A market where prices are falling",
      "A market where prices are rising",
      "A market exclusively for agricultural products",
      "A market that only operates on weekdays"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "What does P/E ratio stand for?",
    options: [
      "Price to Earnings",
      "Profit to Expense",
      "Potential to Expand",
      "Performance to Expectation"
    ],
    correctAnswer: 0
  },
  {
    id: 3,
    question: "Which of these is a stock market index?",
    options: [
      "NASDAQ",
      "VISA",
      "SWIFT",
      "LIBOR"
    ],
    correctAnswer: 0
  },
  {
    id: 4,
    question: "What happens in an IPO?",
    options: [
      "A company buys back all its shares",
      "A company issues stock to the public for the first time",
      "Investors sell all their shares at once",
      "A company closes its operations"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Which of these factors typically does NOT affect stock prices?",
    options: [
      "Company earnings",
      "Interest rates",
      "The CEO's favorite color",
      "Market sentiment"
    ],
    correctAnswer: 2
  }
];

const LearnPage = () => {
  const [activeTab, setActiveTab] = useState("learn");
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleStartQuiz = (quizId: string) => {
    setActiveQuiz(quizId);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedOption(null);
    setActiveTab("quiz");
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;
    
    const questions = activeQuiz === "quiz1" ? investmentQuizQuestions : stockMarketQuizQuestions;
    
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 20);
      toast({
        title: "Correct!",
        description: "You got the right answer!",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}`,
        variant: "destructive",
      });
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleReturnToQuizzes = () => {
    setActiveQuiz(null);
    setActiveTab("learn");
  };

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
  };

  const handleBackToModules = () => {
    setActiveModule(null);
  };

  const getCurrentQuizQuestions = () => {
    return activeQuiz === "quiz1" ? investmentQuizQuestions : stockMarketQuizQuestions;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-1 p-4 md:p-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Financial Learning Hub</h1>
              <div className="bg-primary-50 text-primary-700 px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm">
                <span className="text-lg">🏆</span>
                <div>
                  <p className="text-xs font-medium">YOUR POINTS</p>
                  <p className="text-lg font-bold">350</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary-50/50 to-accent/10 rounded-xl p-6 mb-8">
              <p className="text-lg text-foreground/80 max-w-3xl">
                Enhance your financial knowledge with our comprehensive learning modules and interactive quizzes. 
                Track your progress, earn points, and build valuable investing skills.
              </p>
            </div>
            
            {activeModule ? (
              <ModuleContent 
                moduleId={activeModule} 
                onBack={handleBackToModules} 
              />
            ) : activeQuiz && !quizCompleted ? (
              <Card className="shadow-md border-primary-100">
                <CardHeader className="bg-primary-50/50 border-b border-primary-100">
                  <CardTitle>{activeQuiz === "quiz1" ? "Investment Basics Quiz" : "Stock Market Challenge"}</CardTitle>
                  <CardDescription>
                    Question {currentQuestion + 1} of {getCurrentQuizQuestions().length}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="text-lg font-medium">
                      {getCurrentQuizQuestions()[currentQuestion].question}
                    </div>
                    
                    <div className="space-y-3">
                      {getCurrentQuizQuestions()[currentQuestion].options.map((option, index) => (
                        <div 
                          key={index}
                          onClick={() => handleOptionSelect(index)}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedOption === index 
                              ? 'border-primary-500 bg-primary-50 shadow-sm' 
                              : 'border-border hover:bg-slate-50'
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button 
                        onClick={handleNextQuestion}
                        disabled={selectedOption === null}
                        className="flex items-center gap-2 shadow-sm"
                      >
                        {currentQuestion < getCurrentQuizQuestions().length - 1 ? "Next Question" : "Finish Quiz"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : activeQuiz && quizCompleted ? (
              <Card className="shadow-md border-primary-100">
                <CardHeader className="bg-primary-50/50 border-b border-primary-100">
                  <CardTitle>Quiz Completed!</CardTitle>
                  <CardDescription>
                    {activeQuiz === "quiz1" ? "Investment Basics Quiz" : "Stock Market Challenge"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center py-6">
                    <div className="w-32 h-32 rounded-full bg-primary-50 flex items-center justify-center mb-6 shadow-md">
                      <div className="text-5xl">🏆</div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-2">Your Score: {score}/{getCurrentQuizQuestions().length * 20}</h2>
                    <p className="text-center text-muted-foreground mb-6">
                      {score === getCurrentQuizQuestions().length * 20 
                        ? "Perfect score! You're a financial genius!" 
                        : score >= getCurrentQuizQuestions().length * 15
                          ? "Great job! You have a solid understanding of finance!"
                          : score >= getCurrentQuizQuestions().length * 10
                            ? "Good effort! Keep learning to improve your score."
                            : "Keep studying! You'll master these concepts soon."}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <Button variant="outline" onClick={handleReturnToQuizzes}>
                        Return to Modules
                      </Button>
                      <Button 
                        onClick={() => {
                          setCurrentQuestion(0);
                          setScore(0);
                          setQuizCompleted(false);
                          setSelectedOption(null);
                        }}
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3">
                  <Card className="mb-6 shadow-md border-primary-100 overflow-hidden">
                    <CardHeader className="bg-primary-50/50 border-b border-primary-100">
                      <CardTitle>Your Learning Modules</CardTitle>
                      <CardDescription>
                        Track your progress through our financial education modules
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {modules.map((module) => (
                          <div 
                            key={module.id} 
                            className="border border-border rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer hover:shadow-sm"
                            onClick={() => handleModuleClick(module.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="text-2xl p-2 bg-primary-50 rounded-full">{module.icon}</div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-medium">{module.title}</h3>
                                  <span className="text-sm text-muted-foreground">{module.progress}% complete</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                                <div className="h-2 bg-slate-100 rounded-full mt-2">
                                  <div 
                                    className="h-full bg-primary-500 rounded-full" 
                                    style={{ width: `${module.progress}%` }}
                                  ></div>
                                </div>
                                <div className="mt-2 flex justify-end">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-primary-600 p-0 h-auto hover:bg-transparent hover:text-primary-700"
                                  >
                                    Continue learning <ChevronRight className="h-3.5 w-3.5 ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-md border-primary-100 overflow-hidden">
                    <CardHeader className="bg-primary-50/50 border-b border-primary-100">
                      <CardTitle>Financial Quizzes</CardTitle>
                      <CardDescription>
                        Test your knowledge and earn points with these financial quizzes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {quizzes.map((quiz, index) => (
                          <div key={quiz.id} className="border border-border rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer hover:shadow-sm">
                            <h3 className="font-medium mb-2">{quiz.title}</h3>
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                              <span>{quiz.questions} questions</span>
                              <span>{quiz.difficulty}</span>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleStartQuiz(index < 2 ? `quiz${index + 1}` : "quiz1")}
                              >
                                Start Quiz
                              </Button>
                              <div className="flex items-center text-primary-600 font-semibold">
                                <span className="text-xs mr-1">+</span>
                                <span>{quiz.points} pts</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:w-1/3">
                  <Card className="mb-6 shadow-md border-primary-100 overflow-hidden">
                    <CardHeader className="bg-primary-50/50 border-b border-primary-100">
                      <CardTitle>Leaderboard</CardTitle>
                      <CardDescription>
                        Top financial learners this month
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ScrollArea className="h-60">
                        <div className="space-y-3">
                          {Array.from({ length: 10 }, (_, i) => (
                            <div key={i} className={`flex items-center p-2 rounded-lg ${i < 3 ? 'bg-primary-50' : ''}`}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                i === 0 ? 'bg-yellow-500' : 
                                i === 1 ? 'bg-gray-400' : 
                                i === 2 ? 'bg-amber-700' : 'bg-slate-200 text-slate-600'
                              }`}>
                                {i + 1}
                              </div>
                              <div className="ml-3 flex-1">
                                <div className="flex justify-between">
                                  <p className="font-medium">{i === 3 ? 'You' : `User ${i + 1}`}</p>
                                  <p className="font-bold">{1000 - i * 50} pts</p>
                                </div>
                                <div className="w-full bg-slate-100 h-1 mt-1 rounded-full">
                                  <div 
                                    className="bg-primary-500 h-full rounded-full" 
                                    style={{ width: `${100 - i * 8}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-md border-primary-100 overflow-hidden">
                    <CardHeader className="bg-primary-50/50 border-b border-primary-100">
                      <CardTitle>Your Achievements</CardTitle>
                      <CardDescription>
                        Financial milestones you've reached
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { icon: "🔍", title: "First Steps", desc: "Complete your first module", unlocked: true },
                          { icon: "🏆", title: "Quiz Master", desc: "Score 100% on any quiz", unlocked: true },
                          { icon: "📚", title: "Knowledge Seeker", desc: "Complete 3 modules", unlocked: false },
                          { icon: "🚀", title: "Rising Star", desc: "Earn 500 points", unlocked: false },
                          { icon: "💯", title: "Perfect Score", desc: "Ace the advanced quiz", unlocked: false },
                          { icon: "🎓", title: "Financial Graduate", desc: "Complete all modules", unlocked: false },
                        ].map((achievement, i) => (
                          <div 
                            key={i}
                            className={`flex flex-col items-center justify-center p-3 border rounded-lg text-center ${
                              achievement.unlocked 
                                ? 'border-primary-200 bg-primary-50' 
                                : 'border-gray-200 bg-gray-50 opacity-60'
                            }`}
                          >
                            <div className="text-2xl mb-1">{achievement.icon}</div>
                            <p className="text-xs font-medium">{achievement.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{achievement.desc}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearnPage;
