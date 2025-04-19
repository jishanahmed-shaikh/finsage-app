
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Copy, Search, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Mock financial terms data
const financialTerms = [
  {
    id: "asset-allocation",
    term: "Asset Allocation",
    definition: "The process of dividing investments among different asset categories, such as stocks, bonds, and cash to optimize the risk/reward tradeoff based on an individual's specific situation.",
    category: "Investing",
    letter: "A"
  },
  {
    id: "bear-market",
    term: "Bear Market",
    definition: "A market condition in which the prices of securities are falling or are expected to fall. Generally, a bear market occurs when a market experiences prolonged price declines, typically when prices fall 20% or more from recent highs.",
    category: "Markets",
    letter: "B"
  },
  {
    id: "bull-market",
    term: "Bull Market",
    definition: "A financial market of a group of securities in which prices are rising or are expected to rise. The term is most often used to refer to the stock market but can be applied to anything that is traded, such as bonds, real estate, currencies, and commodities.",
    category: "Markets",
    letter: "B"
  },
  {
    id: "capital-gain",
    term: "Capital Gain",
    definition: "An increase in the value of a capital asset (investment or real estate) that gives it a higher worth than the purchase price. The gain is not realized until the asset is sold. A capital gain may be short-term (one year or less) or long-term (more than one year).",
    category: "Investing",
    letter: "C"
  },
  {
    id: "compound-interest",
    term: "Compound Interest",
    definition: "Interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods on a deposit or loan. Compound interest causes a sum to grow at a faster rate than simple interest, which is calculated only on the principal amount.",
    category: "Personal Finance",
    letter: "C"
  },
  {
    id: "diversification",
    term: "Diversification",
    definition: "A risk management strategy that mixes a wide variety of investments within a portfolio. The rationale behind this technique is that a portfolio constructed of different kinds of assets will, on average, yield higher long-term returns and lower the risk of any individual holding or security.",
    category: "Investing",
    letter: "D"
  },
  {
    id: "dividend",
    term: "Dividend",
    definition: "A distribution of a portion of a company's earnings, decided by the board of directors, to a class of its shareholders. Dividends can be issued as cash payments, as shares of stock, or other property.",
    category: "Investing",
    letter: "D"
  },
  {
    id: "etf",
    term: "ETF (Exchange-Traded Fund)",
    definition: "A type of investment fund and exchange-traded product, ETFs are traded on stock exchanges. ETFs are similar to mutual funds, but they can be bought and sold throughout the trading day like stocks.",
    category: "Investing",
    letter: "E"
  },
  {
    id: "equity",
    term: "Equity",
    definition: "Equity represents the value that would be returned to a company's shareholders if all of the assets were liquidated and all of the company's debts were paid off. In the context of homeownership, equity refers to the ownership interest in a property, calculated as the current market value minus any liens or mortgages.",
    category: "Investing",
    letter: "E"
  },
  {
    id: "fiduciary",
    term: "Fiduciary",
    definition: "A person or organization that acts on behalf of another person or persons to manage assets. A fiduciary is legally and ethically bound to act in the best interest of their client, putting the client's interests ahead of their own.",
    category: "Personal Finance",
    letter: "F"
  },
  {
    id: "fixed-income",
    term: "Fixed Income",
    definition: "A type of investment security that pays investors fixed interest payments until its maturity date. At maturity, investors are repaid the principal amount they had invested. Government and corporate bonds are the most common types of fixed-income products.",
    category: "Investing",
    letter: "F"
  },
  {
    id: "growth-investing",
    term: "Growth Investing",
    definition: "An investment strategy that focuses on stocks of companies expected to grow at an above-average rate compared to their industry or the market. Growth investors typically look for investments in rapidly expanding industries where new technologies and services have the potential for substantial appreciation.",
    category: "Investing",
    letter: "G"
  },
  {
    id: "hedge",
    term: "Hedge",
    definition: "An investment position intended to offset potential losses or gains that may be incurred by a companion investment. In simple language, a hedge is a risk management technique used to reduce any substantial losses or gains suffered by an individual or an organization.",
    category: "Investing",
    letter: "H"
  },
  {
    id: "index-fund",
    term: "Index Fund",
    definition: "A type of mutual fund with a portfolio constructed to match or track the components of a financial market index, such as the Standard & Poor's 500 Index (S&P 500). An index fund provides broad market exposure, low operating expenses, and low portfolio turnover.",
    category: "Investing",
    letter: "I"
  },
  {
    id: "inflation",
    term: "Inflation",
    definition: "A sustained increase in the general price level of goods and services in an economy over a period of time. When the general price level rises, each unit of currency buys fewer goods and services; consequently, inflation reflects a reduction in the purchasing power per unit of money.",
    category: "Economics",
    letter: "I"
  },
  {
    id: "liquidity",
    term: "Liquidity",
    definition: "The degree to which an asset or security can be quickly bought or sold in the market without affecting the asset's price. Cash is the most liquid asset, while real estate, fine art, and collectibles are relatively illiquid.",
    category: "Investing",
    letter: "L"
  },
  {
    id: "market-capitalization",
    term: "Market Capitalization",
    definition: "The total dollar market value of a company's outstanding shares of stock. Commonly referred to as 'market cap,' it is calculated by multiplying the total number of a company's outstanding shares by the current market price of one share.",
    category: "Investing",
    letter: "M"
  },
  {
    id: "mutual-fund",
    term: "Mutual Fund",
    definition: "An investment vehicle made up of a pool of funds collected from many investors for the purpose of investing in securities such as stocks, bonds, money market instruments, and other assets. Mutual funds are operated by professional money managers who allocate the fund's assets and attempt to produce capital gains or income for the fund's investors.",
    category: "Investing",
    letter: "M"
  },
  {
    id: "net-worth",
    term: "Net Worth",
    definition: "The value of all assets owned by a person or entity, minus the total of all liabilities. Essentially, net worth is the difference between what you own and what you owe.",
    category: "Personal Finance",
    letter: "N"
  },
  {
    id: "options",
    term: "Options",
    definition: "Financial derivatives that give buyers the right, but not the obligation, to buy or sell an underlying asset at an agreed-upon price and date. There are two types of options: calls (right to buy) and puts (right to sell).",
    category: "Investing",
    letter: "O"
  },
  {
    id: "portfolio",
    term: "Portfolio",
    definition: "A collection of financial investments like stocks, bonds, commodities, cash, and cash equivalents, including mutual funds and ETFs. A portfolio can also consist of non-publicly tradable securities, like real estate, art, and private investments.",
    category: "Investing",
    letter: "P"
  },
  {
    id: "price-to-earnings-ratio",
    term: "Price-to-Earnings (P/E) Ratio",
    definition: "A valuation ratio of a company's current share price compared to its per-share earnings. The P/E ratio is calculated by dividing a company's market value per share by its earnings per share. A high P/E could mean that a company's stock is overvalued, or else that investors are expecting high growth rates in the future.",
    category: "Investing",
    letter: "P"
  },
  {
    id: "quantitative-easing",
    term: "Quantitative Easing (QE)",
    definition: "An unconventional monetary policy in which a central bank purchases longer-term securities from the open market in order to increase the money supply and encourage lending and investment. Quantitative easing is considered when short-term interest rates are at or approaching zero.",
    category: "Economics",
    letter: "Q"
  },
  {
    id: "rebalancing",
    term: "Rebalancing",
    definition: "The process of realigning the weightings of a portfolio of assets. Rebalancing involves periodically buying or selling assets in a portfolio to maintain an original or desired level of asset allocation or risk.",
    category: "Investing",
    letter: "R"
  },
  {
    id: "roth-ira",
    term: "Roth IRA",
    definition: "A retirement savings account that allows your money to grow tax-free. You fund a Roth with after-tax dollars, meaning you've already paid taxes on the money you put into it. In return for no up-front tax break, your money grows tax-free, and you can generally make tax-free and penalty-free withdrawals after age 59½.",
    category: "Retirement",
    letter: "R"
  },
  {
    id: "stock",
    term: "Stock",
    definition: "A type of security that signifies ownership in a corporation and represents a claim on part of the corporation's assets and earnings. There are two main types of stock: common and preferred. Common stock usually entitles the owner to vote at shareholders' meetings and to receive dividends. Preferred stock generally does not have voting rights, but has a higher claim on assets and earnings than common stock.",
    category: "Investing",
    letter: "S"
  },
  {
    id: "tax-loss-harvesting",
    term: "Tax-Loss Harvesting",
    definition: "The practice of selling a security that has experienced a loss in order to offset a capital gains tax liability. Tax-loss harvesting is commonly used to limit the recognition of short-term capital gains, which are normally taxed at a higher rate than long-term capital gains.",
    category: "Taxes",
    letter: "T"
  },
  {
    id: "volatility",
    term: "Volatility",
    definition: "A statistical measure of the dispersion of returns for a given security or market index. In most cases, the higher the volatility, the riskier the security. Volatility is often measured as either the standard deviation or variance between returns from that same security or market index.",
    category: "Investing",
    letter: "V"
  },
  {
    id: "yield",
    term: "Yield",
    definition: "The earnings generated and realized on an investment over a particular period of time, expressed as a percentage. Yield includes the interest earned or dividends received from holding a particular security. Depending on the security, yields may be calculated differently and projected forward as an expected yield or calculated backward as a historical yield.",
    category: "Investing",
    letter: "Y"
  },
  {
    id: "zero-sum-game",
    term: "Zero-Sum Game",
    definition: "A situation in game theory in which one person's gain is equivalent to another's loss, so the net change in wealth or benefit is zero. In financial markets, futures and options are considered zero-sum games because the contracts themselves don't create or destroy value, only shift it from one party to another.",
    category: "Economics",
    letter: "Z"
  }
];

// Generate alphabet array for navigation
const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const GlossaryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [filteredTerms, setFilteredTerms] = useState(financialTerms);
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  useEffect(() => {
    // Filter terms based on search, category, and letter
    let results = financialTerms;
    
    if (searchTerm) {
      results = results.filter(term => 
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
        term.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeCategory !== "all") {
      results = results.filter(term => term.category.toLowerCase() === activeCategory.toLowerCase());
    }
    
    if (activeLetter) {
      results = results.filter(term => term.letter === activeLetter);
    }
    
    setFilteredTerms(results);
  }, [searchTerm, activeCategory, activeLetter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast.success(`Searching for "${searchTerm}"...`);
    }
  };

  const handleCopy = (termId: string) => {
    const term = financialTerms.find(t => t.id === termId);
    if (term) {
      navigator.clipboard.writeText(`${term.term}: ${term.definition}`);
      setCopiedTerm(termId);
      toast.success(`"${term.term}" copied to clipboard!`);
      
      setTimeout(() => {
        setCopiedTerm(null);
      }, 2000);
    }
  };

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveLetter(letter);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("all");
    setActiveLetter(null);
  };

  // Group terms by letter for alphabetical display
  const groupedTerms = alphabet.map(letter => ({
    letter,
    terms: filteredTerms.filter(term => term.letter === letter)
  })).filter(group => group.terms.length > 0);

  // Get unique categories from terms
  const categories = ["all", ...Array.from(new Set(financialTerms.map(term => term.category.toLowerCase())))];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white py-20">
          <div className="content-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-6">
                Financial Glossary
              </h1>
              <p className="text-lg text-foreground/80 mb-8">
                Your comprehensive guide to financial terms and definitions. Understanding these concepts is the first step toward financial literacy.
              </p>
              <form onSubmit={handleSearch} className="flex max-w-md mx-auto">
                <Input
                  type="text"
                  placeholder="Search financial terms..."
                  className="rounded-r-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" className="rounded-l-none">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </section>
        
        {/* Glossary Content */}
        <section className="py-16">
          <div className="content-container">
            <div className="mb-8">
              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="mb-4">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="capitalize"
                    >
                      {category === "all" ? "All Terms" : category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              {/* Alphabet navigation */}
              <div className="flex flex-wrap justify-center gap-1 mb-8">
                {alphabet.map((letter) => {
                  const hasTerms = financialTerms.some(term => 
                    term.letter === letter && 
                    (activeCategory === "all" || term.category.toLowerCase() === activeCategory)
                  );
                  
                  return (
                    <Button
                      key={letter}
                      variant={activeLetter === letter ? "default" : "outline"}
                      size="sm"
                      className={`w-8 h-8 p-0 ${!hasTerms && 'opacity-50 cursor-not-allowed'}`}
                      disabled={!hasTerms}
                      onClick={() => hasTerms && scrollToLetter(letter)}
                    >
                      {letter}
                    </Button>
                  );
                })}
                
                {(searchTerm || activeCategory !== "all" || activeLetter) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
            
            {filteredTerms.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No terms found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search filters or browse all terms
                </p>
                <Button onClick={clearFilters}>
                  View All Terms
                </Button>
              </div>
            ) : (
              <div className="space-y-12">
                {groupedTerms.map(group => (
                  <div key={group.letter} id={`letter-${group.letter}`} className="scroll-mt-24">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-bold mr-4">
                        {group.letter}
                      </div>
                      <div className="h-px bg-border flex-grow"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {group.terms.map(term => (
                        <Card key={term.id} className="border-primary-100">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center mb-2">
                                  <h3 className="text-xl font-bold">{term.term}</h3>
                                  <span className="ml-3 text-xs px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full">
                                    {term.category}
                                  </span>
                                </div>
                                <p className="text-foreground/80">{term.definition}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2 flex-shrink-0"
                                onClick={() => handleCopy(term.id)}
                              >
                                {copiedTerm === term.id ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Learn More Section */}
        <section className="py-16 bg-primary-50/50">
          <div className="content-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Expand Your Financial Knowledge</h2>
              <p className="text-foreground/80 mb-8">
                Understanding these financial terms is just the beginning. Dive deeper into financial concepts with our comprehensive learning resources.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/learn">
                  <Button className="rounded-full px-6 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Explore Learning Hub
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button variant="outline" className="rounded-full px-6 flex items-center gap-2">
                    Browse Financial Blog <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GlossaryPage;
