
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  path?: string;
  highlighted?: boolean;
}

const FeatureCard = ({ title, description, icon, className, path, highlighted }: FeatureCardProps) => {
  const CardComponent = path ? Link : "div";
  
  return (
    <CardComponent to={path || "#"} className={path ? "block hover-card-animation" : ""}>
      <Card className={cn(
        "h-full border-border transition-colors", 
        highlighted ? "border-primary border-2 shadow-lg" : "hover:border-primary-200",
        className
      )}>
        <CardContent className="p-6">
          <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 mb-4">
            {icon}
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
          
          {path && (
            <div className="mt-4 flex items-center text-sm text-primary-600 font-medium">
              <span>Learn more</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          )}
        </CardContent>
      </Card>
    </CardComponent>
  );
};

export default FeatureCard;
