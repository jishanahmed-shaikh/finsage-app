
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigation } from "@/hooks/use-navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, X, AlertCircle } from "lucide-react";
import { groqChatService } from "@/lib/groq-api";

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
  // Use navigation hook to handle route changes properly
  useNavigation();
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! I'm your FinSage AI assistant powered by advanced AI. I'm here to help you with investment strategies, portfolio management, stock analysis, and financial planning. What would you like to discuss today?",
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
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [leftPaneVisible, setLeftPaneVisible] = useState(true);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      // Clear any ongoing API calls when component unmounts
      setIsTyping(false);
      setError(null);
    };
  }, []);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessageContent = inputValue.trim();
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: userMessageContent,
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setError(null);
    
    try {
      // Create a placeholder AI message that will be updated with streaming content
      const aiMessageId = (Date.now() + 1).toString();
      const aiMessage: ChatMessage = {
        id: aiMessageId,
        content: "",
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Get streaming response from GROQ
      const responseStream = await groqChatService.sendMessage(userMessageContent);
      
      for await (const chunk of responseStream) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, content: chunk.content }
              : msg
          )
        );
        
        if (chunk.isComplete) {
          setIsTyping(false);
          break;
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setError('Sorry, I encountered an error. Please try again.');
      setIsTyping(false);
      
      // Remove the empty AI message if there was an error
      setMessages(prev => prev.filter(msg => msg.content !== ""));
    }
  };

  const toggleLeftPane = () => {
    setLeftPaneVisible(!leftPaneVisible);
  };

  const startNewChat = () => {
    setMessages([
      {
        id: "1",
        content: "Hello! I'm your FinSage AI assistant powered by advanced AI. I'm here to help you with investment strategies, portfolio management, stock analysis, and financial planning. What would you like to discuss today?",
        role: "assistant",
        timestamp: new Date()
      }
    ]);
    groqChatService.clearHistory();
    setError(null);
    setSelectedSession("current");
  };
  
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-3 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent">FinSage</span>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">AI Chat</span>
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
              <Button variant="outline" size="sm" className="text-xs h-7" onClick={startNewChat}>New Chat</Button>
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
              
              {error && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex-shrink-0 flex items-center justify-center text-white text-sm">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div className="rounded-xl p-3 bg-red-50 border border-red-200 rounded-tl-none">
                      <p className="text-sm text-red-700">{error}</p>
                      <button 
                        onClick={() => setError(null)}
                        className="text-xs text-red-600 hover:text-red-800 mt-1 underline"
                      >
                        Dismiss
                      </button>
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
                  disabled={isTyping}
                  className="flex-1 border border-border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder={isTyping ? "AI is thinking..." : "Ask about investing, stocks, funds, tax saving..."}
                />
                <Button 
                  type="submit" 
                  disabled={isTyping || !inputValue.trim()}
                  className="rounded-full w-10 h-10 p-0 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
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
