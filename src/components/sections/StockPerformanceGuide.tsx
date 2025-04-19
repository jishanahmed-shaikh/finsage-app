
import { BarChart2, LineChart, TrendingUp, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import FeatureCard from "../ui-custom/FeatureCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StockPerformanceGuide = () => {
  return (
    <section id="stock-performance" className="py-16 bg-gradient-to-b from-white to-primary-50">
      <div className="content-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Stock Performance Analytics</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Track, analyze, and compare stock performances across markets with our powerful visualization tools. 
            Make informed investment decisions with real-time insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <FeatureCard 
            title="Real-Time Tracking" 
            description="Monitor stock price movements with interactive real-time charts and visualization tools."
            icon={<LineChart className="h-6 w-6" />}
            path="/stocks"
            highlighted={true}
          />
          <FeatureCard 
            title="Market Comparison" 
            description="Compare multiple stocks side by side to identify patterns and investment opportunities."
            icon={<BarChart2 className="h-6 w-6" />}
            path="/stocks"
          />
          <FeatureCard 
            title="Performance Analysis" 
            description="Get detailed analysis of stock performance with key metrics and trend indicators."
            icon={<TrendingUp className="h-6 w-6" />}
            path="/stocks"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-border mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Why Monitor Stock Performance?</h3>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <div className="rounded-full bg-primary-100 text-primary-700 h-6 w-6 flex items-center justify-center shrink-0">1</div>
                  <p>Track your investments in real-time to make timely decisions</p>
                </li>
                <li className="flex gap-2">
                  <div className="rounded-full bg-primary-100 text-primary-700 h-6 w-6 flex items-center justify-center shrink-0">2</div>
                  <p>Identify emerging market trends and investment opportunities</p>
                </li>
                <li className="flex gap-2">
                  <div className="rounded-full bg-primary-100 text-primary-700 h-6 w-6 flex items-center justify-center shrink-0">3</div>
                  <p>Compare different stocks to diversify your portfolio effectively</p>
                </li>
                <li className="flex gap-2">
                  <div className="rounded-full bg-primary-100 text-primary-700 h-6 w-6 flex items-center justify-center shrink-0">4</div>
                  <p>Understand market movements with visualized historical data</p>
                </li>
              </ul>
              
              <div className="mt-6">
                <Link to="/stocks">
                  <Button className="group">
                    View Stock Analytics
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-primary-50 p-6 flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Stock market charts" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-3 shadow-md">
                  <div className="text-green-600 font-bold">+8.2% Growth</div>
                  <div className="text-sm text-muted-foreground">Top performing stocks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/stocks">
            <Button variant="outline" size="lg" className="rounded-full">
              Explore Stock Performance Dashboard
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StockPerformanceGuide;
