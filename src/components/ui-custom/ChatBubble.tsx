
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  content: string | React.ReactNode;
  isUser?: boolean;
  isTyping?: boolean;
  avatar?: string | React.ReactNode;
}

const ChatBubble = ({ content, isUser = false, isTyping = false, avatar }: ChatBubbleProps) => {
  return (
    <div className={cn(
      "flex items-start space-x-3 mb-4",
      isUser && "flex-row-reverse space-x-reverse"
    )}>
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center text-sm",
        isUser ? "bg-secondary text-foreground" : "bg-primary-500 text-white"
      )}>
        {typeof avatar === 'string' ? avatar.substring(0, 2) : (isUser ? 'You' : 'AI')}
      </div>
      
      <div className={cn(
        "rounded-2xl p-4 max-w-xs sm:max-w-sm",
        isUser 
          ? "bg-secondary rounded-tr-none" 
          : "bg-primary-50 rounded-tl-none",
        isTyping && "animate-pulse-soft"
      )}>
        {content}
      </div>
    </div>
  );
};

export default ChatBubble;
