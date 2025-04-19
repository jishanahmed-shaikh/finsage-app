
import { useViewport } from "@/hooks/use-viewport";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";

// Mock market news data
const marketNews = [
  {
    id: 1,
    title: "Tech Giants Lead Market Rally as AI Investments Surge",
    summary: "Major tech companies saw significant gains as investors respond positively to new artificial intelligence initiatives and strong quarterly earnings.",
    source: "Financial Times",
    time: "2 hours ago",
    category: "Technology",
    impact: "positive",
    url: "#"
  },
  {
    id: 2,
    title: "Central Bank Signals Potential Rate Cut in Coming Months",
    summary: "The Federal Reserve hinted at possible interest rate reductions in response to moderating inflation data, boosting market sentiment.",
    source: "Bloomberg",
    time: "4 hours ago",
    category: "Economy",
    impact: "positive",
    url: "#"
  },
  {
    id: 3,
    title: "Oil Prices Drop on Increased Production Reports",
    summary: "Crude oil futures fell by 3% following reports of increased production from major oil-producing nations, potentially easing supply constraints.",
    source: "Reuters",
    time: "6 hours ago",
    category: "Commodities",
    impact: "negative",
    url: "#"
  },
  {
    id: 4,
    title: "Healthcare Sector Faces Pressure Amid Regulatory Concerns",
    summary: "Pharmaceutical and healthcare stocks declined as lawmakers debate new pricing regulations and coverage requirements.",
    source: "Wall Street Journal",
    time: "1 day ago",
    category: "Healthcare",
    impact: "negative",
    url: "#"
  },
  {
    id: 5,
    title: "Retail Sales Exceed Expectations in Q2 Report",
    summary: "Consumer spending showed resilience with retail sales increasing 2.3% year-over-year, surpassing analyst expectations of 1.7% growth.",
    source: "CNBC",
    time: "1 day ago",
    category: "Retail",
    impact: "positive",
    url: "#"
  },
  {
    id: 6,
    title: "Semiconductor Shortage Easing According to Industry Reports",
    summary: "Major chip manufacturers report improved production capacity, potentially alleviating supply chain issues that have affected multiple industries.",
    source: "TechCrunch",
    time: "2 days ago",
    category: "Manufacturing",
    impact: "positive",
    url: "#"
  },
];

const MarketNews = () => {
  const { isMobile } = useViewport();
  
  return (
    <Card className="w-full">
      <CardContent className="p-3 pt-5 md:p-6">
        <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} justify-between mb-4`}>
          <h3 className="text-lg md:text-xl font-bold mb-3">Market News & Trends</h3>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className={`${isMobile ? 'w-full grid grid-cols-3 h-9' : ''}`}>
              <TabsTrigger value="all" className="text-xs md:text-sm">All</TabsTrigger>
              <TabsTrigger value="positive" className="text-xs md:text-sm">
                <TrendingUp className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1" />
                <span className={isMobile ? 'text-[10px] md:text-xs' : ''}>Positive</span>
              </TabsTrigger>
              <TabsTrigger value="negative" className="text-xs md:text-sm">
                <TrendingDown className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1" />
                <span className={isMobile ? 'text-[10px] md:text-xs' : ''}>Negative</span>
              </TabsTrigger>
            </TabsList>
          
            <div className="mt-3 md:mt-4">
              <TabsContent value="all" className="space-y-3 md:space-y-4 m-0">
                {marketNews.map((news) => (
                  <NewsItem key={news.id} news={news} />
                ))}
              </TabsContent>
              
              <TabsContent value="positive" className="space-y-3 md:space-y-4 m-0">
                {marketNews.filter(news => news.impact === "positive").map((news) => (
                  <NewsItem key={news.id} news={news} />
                ))}
              </TabsContent>
              
              <TabsContent value="negative" className="space-y-3 md:space-y-4 m-0">
                {marketNews.filter(news => news.impact === "negative").map((news) => (
                  <NewsItem key={news.id} news={news} />
                ))}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

const NewsItem = ({ news }: { news: any }) => {
  const { isMobile } = useViewport();
  
  return (
    <a 
      href={news.url} 
      className="block p-3 md:p-4 border rounded-lg hover:bg-muted/30 transition-colors"
      target="_blank" 
      rel="noopener noreferrer"
    >
      <div className={`flex justify-between ${isMobile ? 'flex-col gap-1' : 'items-start'} mb-2`}>
        <h4 className="font-medium text-xs md:text-sm">{news.title}</h4>
        <Badge variant={news.impact === "positive" ? "secondary" : "destructive"} className={`${isMobile ? 'self-start mt-1' : 'ml-2'} whitespace-nowrap text-[10px] md:text-xs py-0 h-5`}>
          {news.impact === "positive" ? (
            <TrendingUp className="h-2.5 w-2.5 md:h-3 md:w-3 mr-1" />
          ) : (
            <TrendingDown className="h-2.5 w-2.5 md:h-3 md:w-3 mr-1" />
          )}
          {news.impact === "positive" ? "Bullish" : "Bearish"}
        </Badge>
      </div>
      <p className="text-muted-foreground text-[10px] md:text-xs mb-2">{news.summary}</p>
      <div className={`${isMobile ? 'flex flex-col gap-2' : 'flex justify-between'} items-start md:items-center text-[10px] md:text-xs`}>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-[10px] md:text-xs py-0 px-1.5">{news.category}</Badge>
          <span className="text-muted-foreground flex items-center text-[9px] md:text-[10px]">
            <Clock className="h-2.5 w-2.5 md:h-3 md:w-3 mr-1" />
            {news.time}
          </span>
        </div>
        <div className="flex items-center text-primary-600 text-[9px] md:text-[10px] mt-1 md:mt-0">
          {news.source}
          <ExternalLink className="h-2.5 w-2.5 md:h-3 md:w-3 ml-1" />
        </div>
      </div>
    </a>
  );
};

export default MarketNews;
