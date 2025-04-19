
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, X } from "lucide-react";

interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  date: Date;
  preview: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! I'm your FinSage AI assistant. How can I help with your investment queries today?",
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  
  // Sample chat history
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([
    {
      id: "session1",
      title: "Investment Strategies",
      date: new Date(Date.now() - 86400000), // yesterday
      preview: "Discussing long-term investment options"
    },
    {
      id: "session2",
      title: "Tax Planning",
      date: new Date(Date.now() - 172800000), // 2 days ago
      preview: "Options for tax-efficient investments"
    },
    {
      id: "session3",
      title: "Retirement Planning",
      date: new Date(Date.now() - 345600000), // 4 days ago
      preview: "Setting up retirement accounts"
    }
  ]);
  
  const [selectedSession, setSelectedSession] = useState<string>("current");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [leftPaneVisible, setLeftPaneVisible] = useState(true);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response = "";
      
      // Simple pattern matching for demo purposes
      if (inputValue.toLowerCase().includes("mutual fund") || inputValue.toLowerCase().includes("fund")) {
        response = "Mutual funds are a great way to start investing. For beginners, I recommend index funds like Nifty 50 or low-cost diversified equity funds. Would you like specific fund recommendations?";
      } else if (inputValue.toLowerCase().includes("stock") || inputValue.toLowerCase().includes("shares")) {
        response = "For stock investing in India, beginners should consider blue-chip companies with strong fundamentals. Some examples include HDFC Bank, TCS, and Reliance Industries. Would you like to know more about analyzing stocks?";
      } else if (inputValue.toLowerCase().includes("risk")) {
        response = "Understanding your risk tolerance is crucial. Conservative investors might prefer debt funds and FDs, while those comfortable with higher risk might opt for mid-cap stocks or sectoral funds. How would you describe your risk tolerance?";
      } else if (inputValue.toLowerCase().includes("tax") || inputValue.toLowerCase().includes("saving")) {
        response = "For tax-efficient investing in India, consider ELSS funds (tax deduction under 80C), PPF, or tax-free bonds. NPS also offers additional tax benefits under section 80CCD(1B). Would you like me to explain any of these options?";
      } else {
        response = "That's a great question about investing. To provide the most helpful advice, could you tell me more about your financial goals, investment timeline, and risk tolerance?";
      }
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleLeftPane = () => {
    setLeftPaneVisible(!leftPaneVisible);
  };
  
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-3 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent">FinSage</span>
          </Link>
          
          <div className="flex items-center space-x-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="font-medium">
                Home
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="font-medium">
                Dashboard
              </Button>
            </Link>
            <Link to="/learn">
              <Button variant="ghost" size="sm" className="font-medium">
                Learn
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
                <span className="sr-only">User dashboard</span>
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-sm font-medium">
                  JD
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Chat Area with Sidebar */}
      <div className="flex-1 overflow-hidden flex">
        {/* Chat History Sidebar */}
        <div 
          className={`w-64 border-r border-border bg-white transition-all duration-300 ${
            leftPaneVisible ? 'translate-x-0' : '-translate-x-full'
          } absolute md:relative z-10 h-[calc(100vh-4rem)]`}
        >
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h2 className="font-semibold text-sm">Chat History</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs h-7">New Chat</Button>
              <Button variant="ghost" size="sm" className="md:hidden h-7 w-7 p-0" onClick={toggleLeftPane}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-8.5rem)]">
            <div className="p-2">
              <button 
                className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${selectedSession === "current" ? "bg-primary-50 text-primary-700" : "hover:bg-gray-100"}`}
                onClick={() => setSelectedSession("current")}
              >
                <div className="font-medium text-sm truncate">Current Session</div>
                <div className="text-xs text-muted-foreground truncate">Today</div>
              </button>
              
              {chatHistory.map((session) => (
                <button 
                  key={session.id}
                  className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${selectedSession === session.id ? "bg-primary-50 text-primary-700" : "hover:bg-gray-100"}`}
                  onClick={() => setSelectedSession(session.id)}
                >
                  <div className="font-medium text-sm truncate">{session.title}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(session.date)}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{session.preview}</div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Toggle Sidebar Button - Only visible when sidebar is closed or on mobile */}
          {!leftPaneVisible && (
            <button 
              className="absolute left-4 top-4 z-10 bg-white rounded-full p-2 shadow-sm border border-border"
              onClick={toggleLeftPane}
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary-500 flex-shrink-0 flex items-center justify-center text-white text-sm">
                        AI
                      </div>
                    )}
                    
                    <div 
                      className={`rounded-xl p-3 ${
                        message.role === "user" 
                          ? "bg-primary-100 text-primary-900 rounded-tr-none" 
                          : "bg-white border border-border rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Intl.DateTimeFormat('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        }).format(message.timestamp)}
                      </p>
                    </div>
                    
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center text-primary-700 text-sm">
                        JD
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-primary-500 flex-shrink-0 flex items-center justify-center text-white text-sm">
                      AI
                    </div>
                    <div className="rounded-xl p-3 bg-white border border-border rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-primary-300 animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-300 animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-300 animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input Area */}
          <div className="border-t border-border bg-white p-4">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 border border-border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 bg-background"
                  placeholder="Ask about investing, stocks, funds, tax saving..."
                />
                <Button type="submit" className="rounded-full w-10 h-10 p-0 bg-primary-500 hover:bg-primary-600">
                  <span className="sr-only">Send message</span>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7.5H14M14 7.5L8 1.5M14 7.5L8 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
