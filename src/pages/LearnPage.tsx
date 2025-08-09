import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, Check, X, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "@/components/layout/Navbar";
import ModuleContent from "@/components/learn/ModuleContent";

// Enhanced Learning modules data
const modules = [
  {
    id: "module1",
    title: "Investment Fundamentals",
    description: "Master the core principles of investing and wealth building",
    progress: 30,
    icon: "📊",
    difficulty: "Beginner",
    duration: "45 min",
    lessons: 8
  },
  {
    id: "module2",
    title: "Stock Market Mastery",
    description: "Deep dive into stock analysis, trading, and market psychology",
    progress: 0,
    icon: "📈",
    difficulty: "Intermediate",
    duration: "60 min",
    lessons: 12
  },
  {
    id: "module3",
    title: "Mutual Funds & ETFs",
    description: "Complete guide to fund investing and portfolio diversification",
    progress: 15,
    icon: "💼",
    difficulty: "Beginner",
    duration: "40 min",
    lessons: 10
  },
  {
    id: "module4",
    title: "Retirement Planning Pro",
    description: "Advanced strategies for building long-term wealth",
    progress: 0,
    icon: "🏖️",
    difficulty: "Intermediate",
    duration: "55 min",
    lessons: 14
  },
  {
    id: "module5",
    title: "Tax-Smart Investing",
    description: "Maximize returns through tax-efficient strategies",
    progress: 0,
    icon: "💰",
    difficulty: "Advanced",
    duration: "50 min",
    lessons: 11
  },
  {
    id: "module6",
    title: "Cryptocurrency Basics",
    description: "Understanding digital assets and blockchain technology",
    progress: 0,
    icon: "₿",
    difficulty: "Intermediate",
    duration: "35 min",
    lessons: 9
  },
  {
    id: "module7",
    title: "Real Estate Investment",
    description: "Property investing, REITs, and real estate strategies",
    progress: 0,
    icon: "🏠",
    difficulty: "Advanced",
    duration: "65 min",
    lessons: 16
  },
  {
    id: "module8",
    title: "Personal Finance Mastery",
    description: "Budgeting, debt management, and financial planning",
    progress: 0,
    icon: "💳",
    difficulty: "Beginner",
    duration: "30 min",
    lessons: 7
  },
  {
    id: "module9",
    title: "Options & Derivatives",
    description: "Advanced trading strategies and risk management",
    progress: 0,
    icon: "⚡",
    difficulty: "Expert",
    duration: "75 min",
    lessons: 18
  },
  {
    id: "module10",
    title: "Global Markets",
    description: "International investing and currency considerations",
    progress: 0,
    icon: "🌍",
    difficulty: "Advanced",
    duration: "45 min",
    lessons: 13
  }
];

// Enhanced Quiz data for comprehensive financial literacy
const quizzes = [
  {
    id: "quiz1",
    title: "Investment Fundamentals",
    questions: 15,
    difficulty: "Beginner",
    points: 150,
    category: "Investing",
    timeLimit: "10 min"
  },
  {
    id: "quiz2",
    title: "Stock Market Mastery",
    questions: 20,
    difficulty: "Intermediate",
    points: 250,
    category: "Stocks",
    timeLimit: "15 min"
  },
  {
    id: "quiz3",
    title: "Personal Finance Pro",
    questions: 18,
    difficulty: "Beginner",
    points: 200,
    category: "Budgeting",
    timeLimit: "12 min"
  },
  {
    id: "quiz4",
    title: "Retirement Planning Expert",
    questions: 25,
    difficulty: "Advanced",
    points: 350,
    category: "Retirement",
    timeLimit: "20 min"
  },
  {
    id: "quiz5",
    title: "Tax Strategy Challenge",
    questions: 22,
    difficulty: "Advanced",
    points: 300,
    category: "Taxes",
    timeLimit: "18 min"
  },
  {
    id: "quiz6",
    title: "Crypto & Digital Assets",
    questions: 16,
    difficulty: "Intermediate",
    points: 220,
    category: "Crypto",
    timeLimit: "12 min"
  },
  {
    id: "quiz7",
    title: "Real Estate Investment",
    questions: 20,
    difficulty: "Advanced",
    points: 280,
    category: "Real Estate",
    timeLimit: "16 min"
  },
  {
    id: "quiz8",
    title: "Risk Management Master",
    questions: 14,
    difficulty: "Intermediate",
    points: 180,
    category: "Risk",
    timeLimit: "10 min"
  }
];

// Comprehensive quiz questions database - All unique content for each category
const quizQuestions = {
  quiz1: [ // Investment Fundamentals (15 questions)
    {
      id: 1,
      question: "What is the primary goal of long-term investing?",
      options: [
        "To get rich quickly",
        "To build wealth over time through compound growth",
        "To avoid paying taxes",
        "To beat the market every year"
      ],
      correctAnswer: 1,
      explanation: "Long-term investing focuses on building wealth gradually through the power of compound growth, where your returns generate their own returns over time."
    },
    {
      id: 2,
      question: "Which investment typically offers the highest potential returns over the long term?",
      options: [
        "Savings accounts",
        "Government bonds", 
        "Stocks",
        "Certificates of deposit"
      ],
      correctAnswer: 2,
      explanation: "Historically, stocks have provided the highest long-term returns, though they come with higher volatility and risk."
    },
    {
      id: 3,
      question: "What is diversification in investing?",
      options: [
        "Investing all money in one promising stock",
        "Spreading investments across different asset classes and sectors",
        "Only investing in international markets",
        "Changing investment strategy every month"
      ],
      correctAnswer: 1,
      explanation: "Diversification reduces risk by spreading investments across different assets, sectors, and geographies so that poor performance in one area doesn't devastate your entire portfolio."
    },
    {
      id: 4,
      question: "What does 'compound interest' mean?",
      options: [
        "Interest paid only on the principal amount",
        "Interest that decreases over time",
        "Interest earned on both principal and previously earned interest",
        "Interest that is taxed twice"
      ],
      correctAnswer: 2,
      explanation: "Compound interest is when you earn returns not just on your original investment, but also on all the returns you've previously earned, creating exponential growth over time."
    },
    {
      id: 5,
      question: "What is dollar-cost averaging?",
      options: [
        "Investing a lump sum all at once",
        "Investing the same amount regularly regardless of market conditions",
        "Only investing when markets are down",
        "Averaging the cost of different stocks"
      ],
      correctAnswer: 1,
      explanation: "Dollar-cost averaging involves investing a fixed amount regularly, which helps reduce the impact of market volatility by buying more shares when prices are low and fewer when prices are high."
    },
    {
      id: 6,
      question: "What is an emergency fund?",
      options: [
        "Money set aside for investment opportunities",
        "3-6 months of living expenses saved for unexpected events",
        "Money for vacation planning",
        "Funds for buying luxury items"
      ],
      correctAnswer: 1,
      explanation: "An emergency fund is a financial safety net covering 3-6 months of living expenses, kept in easily accessible accounts for unexpected situations like job loss or medical emergencies."
    },
    {
      id: 7,
      question: "What is the relationship between risk and return in investing?",
      options: [
        "Higher risk always guarantees higher returns",
        "There's no relationship between risk and return",
        "Generally, higher potential returns come with higher risk",
        "Lower risk investments always perform better"
      ],
      correctAnswer: 2,
      explanation: "In investing, there's generally a positive correlation between risk and potential return - investments with higher potential returns typically carry higher risk of loss."
    },
    {
      id: 8,
      question: "What is inflation and why does it matter for investors?",
      options: [
        "Rising prices that can erode purchasing power over time",
        "A government tax on investments",
        "The rate at which stocks increase in value",
        "A fee charged by investment companies"
      ],
      correctAnswer: 0,
      explanation: "Inflation is the general increase in prices over time, which reduces purchasing power. Investors need returns that exceed inflation to maintain and grow their real wealth."
    },
    {
      id: 9,
      question: "What is asset allocation?",
      options: [
        "Buying only one type of investment",
        "The process of dividing investments among different asset categories",
        "Selling all investments at once",
        "Investing only in foreign assets"
      ],
      correctAnswer: 1,
      explanation: "Asset allocation is the strategy of dividing your investment portfolio among different asset categories (stocks, bonds, cash, etc.) based on your goals, risk tolerance, and time horizon."
    },
    {
      id: 10,
      question: "When should you start investing?",
      options: [
        "Only after age 40",
        "When you have $10,000 or more",
        "As early as possible, even with small amounts",
        "Only when markets are performing well"
      ],
      correctAnswer: 2,
      explanation: "Starting early, even with small amounts, allows you to take advantage of compound growth over time. Time in the market is often more important than timing the market."
    },
    {
      id: 11,
      question: "What is a mutual fund?",
      options: [
        "A single stock investment",
        "A pooled investment vehicle managed by professionals",
        "A type of savings account",
        "A government bond"
      ],
      correctAnswer: 1,
      explanation: "A mutual fund pools money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities, managed by professional fund managers."
    },
    {
      id: 12,
      question: "What does 'buy and hold' strategy mean?",
      options: [
        "Buying stocks and selling them quickly",
        "Purchasing investments and holding them for extended periods",
        "Only buying stocks during market crashes",
        "Holding cash instead of investing"
      ],
      correctAnswer: 1,
      explanation: "Buy and hold is a long-term investment strategy where investors purchase securities and hold them for extended periods, regardless of short-term market fluctuations."
    },
    {
      id: 13,
      question: "What is a bond?",
      options: [
        "A share of ownership in a company",
        "A loan you make to a company or government",
        "A type of savings account",
        "A cryptocurrency"
      ],
      correctAnswer: 1,
      explanation: "A bond is essentially a loan that you make to a company or government entity, which pays you interest over time and returns your principal at maturity."
    },
    {
      id: 14,
      question: "What is the rule of 72?",
      options: [
        "A tax calculation method",
        "A way to estimate how long it takes for money to double",
        "The maximum age for retirement accounts",
        "A stock market trading rule"
      ],
      correctAnswer: 1,
      explanation: "The rule of 72 is a quick way to estimate how long it will take for an investment to double. Divide 72 by the annual interest rate to get the approximate number of years."
    },
    {
      id: 15,
      question: "What is rebalancing a portfolio?",
      options: [
        "Selling all investments and starting over",
        "Adjusting portfolio allocations back to target percentages",
        "Only buying new investments",
        "Changing investment goals"
      ],
      correctAnswer: 1,
      explanation: "Rebalancing involves periodically adjusting your portfolio allocations back to your target percentages by buying or selling assets to maintain your desired risk level."
    }
  ],
  quiz2: [ // Stock Market Mastery (20 questions)
    {
      id: 1,
      question: "What is a bull market?",
      options: [
        "A market where prices are generally falling",
        "A market where prices are generally rising",
        "A market that only trades agricultural products",
        "A market that operates only on weekdays"
      ],
      correctAnswer: 1,
      explanation: "A bull market is characterized by rising stock prices, investor optimism, and economic growth. The term comes from how a bull attacks by thrusting upward."
    },
    {
      id: 2,
      question: "What does P/E ratio measure?",
      options: [
        "Price to Earnings - how much investors pay per dollar of earnings",
        "Profit to Expense ratio",
        "Potential to Expand ratio",
        "Performance to Expectation ratio"
      ],
      correctAnswer: 0,
      explanation: "P/E ratio compares a company's stock price to its earnings per share, helping investors evaluate if a stock is overvalued or undervalued relative to its earnings."
    },
    {
      id: 3,
      question: "What happens during an IPO?",
      options: [
        "A company buys back all its shares",
        "A company offers its stock to the public for the first time",
        "Investors sell all their shares simultaneously",
        "A company declares bankruptcy"
      ],
      correctAnswer: 1,
      explanation: "An Initial Public Offering (IPO) is when a private company first sells its shares to the public, allowing anyone to become a shareholder and the company to raise capital."
    },
    {
      id: 4,
      question: "What is market capitalization?",
      options: [
        "The total value of a company's outstanding shares",
        "The amount of cash a company has",
        "The company's annual revenue",
        "The number of employees in a company"
      ],
      correctAnswer: 0,
      explanation: "Market cap is calculated by multiplying the stock price by the number of outstanding shares, representing the total value investors place on the company."
    },
    {
      id: 5,
      question: "What is a dividend?",
      options: [
        "A fee paid to brokers",
        "A portion of company profits paid to shareholders",
        "The difference between buy and sell prices",
        "A type of investment account"
      ],
      correctAnswer: 1,
      explanation: "Dividends are payments made by companies to their shareholders, typically from profits, providing investors with regular income in addition to potential capital gains."
    },
    {
      id: 6,
      question: "What is a bear market?",
      options: [
        "A market with rising prices",
        "A market with falling prices (typically 20% or more decline)",
        "A market that trades only bear-related stocks",
        "A market that's closed for hibernation"
      ],
      correctAnswer: 1,
      explanation: "A bear market is characterized by falling stock prices, typically a decline of 20% or more from recent highs, often accompanied by widespread pessimism."
    },
    {
      id: 7,
      question: "What is the difference between a stock split and a stock dividend?",
      options: [
        "There is no difference",
        "Stock splits increase shares outstanding, stock dividends pay cash",
        "Stock splits divide existing shares, stock dividends issue additional shares",
        "Stock splits are taxable, stock dividends are not"
      ],
      correctAnswer: 2,
      explanation: "A stock split divides existing shares into more shares (e.g., 2-for-1), while a stock dividend issues additional shares as a percentage of holdings."
    },
    {
      id: 8,
      question: "What is the S&P 500?",
      options: [
        "A single stock price",
        "An index of 500 large-cap U.S. companies",
        "A type of savings account",
        "A government bond"
      ],
      correctAnswer: 1,
      explanation: "The S&P 500 is a stock market index that tracks the performance of 500 large-cap U.S. companies, representing about 80% of the total U.S. stock market value."
    },
    {
      id: 9,
      question: "What is a limit order?",
      options: [
        "An order to buy or sell immediately at market price",
        "An order to buy or sell at a specific price or better",
        "An order that expires at the end of the day",
        "An order to buy only blue-chip stocks"
      ],
      correctAnswer: 1,
      explanation: "A limit order specifies the maximum price you're willing to pay when buying, or the minimum price you'll accept when selling a stock."
    },
    {
      id: 10,
      question: "What is earnings per share (EPS)?",
      options: [
        "The total earnings of a company",
        "A company's profit divided by the number of outstanding shares",
        "The price of one share",
        "The dividend paid per share"
      ],
      correctAnswer: 1,
      explanation: "EPS is calculated by dividing a company's net income by the number of outstanding shares, showing how much profit is attributed to each share."
    },
    {
      id: 11,
      question: "What is a blue-chip stock?",
      options: [
        "A stock that's colored blue",
        "A stock of a large, established, financially stable company",
        "A stock that only goes up in value",
        "A stock traded only on Mondays"
      ],
      correctAnswer: 1,
      explanation: "Blue-chip stocks are shares of large, established companies with a history of reliable performance, stable earnings, and often dividend payments."
    },
    {
      id: 12,
      question: "What is market volatility?",
      options: [
        "The total value of the stock market",
        "The degree of price fluctuation in the market",
        "The number of trades per day",
        "The time the market is open"
      ],
      correctAnswer: 1,
      explanation: "Market volatility measures the degree of price fluctuation in stocks or the overall market, with high volatility indicating larger price swings."
    },
    {
      id: 13,
      question: "What is a stock buyback?",
      options: [
        "When investors sell their stocks back to the broker",
        "When a company repurchases its own shares from the marketplace",
        "When the government buys stocks",
        "When stocks are returned due to defects"
      ],
      correctAnswer: 1,
      explanation: "A stock buyback occurs when a company repurchases its own shares from the marketplace, often to return value to shareholders or increase earnings per share."
    },
    {
      id: 14,
      question: "What is the difference between growth and value stocks?",
      options: [
        "Growth stocks are more expensive than value stocks",
        "Growth stocks focus on future potential, value stocks are undervalued relative to fundamentals",
        "Growth stocks pay dividends, value stocks don't",
        "There is no difference"
      ],
      correctAnswer: 1,
      explanation: "Growth stocks are companies expected to grow faster than average, often trading at higher valuations. Value stocks appear undervalued relative to their fundamentals."
    },
    {
      id: 15,
      question: "What is a stock's beta?",
      options: [
        "The stock's dividend yield",
        "A measure of the stock's volatility relative to the overall market",
        "The stock's price-to-earnings ratio",
        "The stock's market capitalization"
      ],
      correctAnswer: 1,
      explanation: "Beta measures a stock's volatility relative to the overall market. A beta of 1 means the stock moves with the market, above 1 is more volatile, below 1 is less volatile."
    },
    {
      id: 16,
      question: "What is a market maker?",
      options: [
        "An investor who creates new markets",
        "A firm that provides liquidity by buying and selling securities",
        "A government agency that regulates markets",
        "A company that builds stock exchanges"
      ],
      correctAnswer: 1,
      explanation: "Market makers are firms that provide liquidity to markets by continuously buying and selling securities, profiting from the bid-ask spread."
    },
    {
      id: 17,
      question: "What is the bid-ask spread?",
      options: [
        "The difference between opening and closing prices",
        "The difference between the highest price buyers will pay and lowest price sellers will accept",
        "The difference between high and low prices for the day",
        "The difference between stock and bond prices"
      ],
      correctAnswer: 1,
      explanation: "The bid-ask spread is the difference between the highest price buyers are willing to pay (bid) and the lowest price sellers are willing to accept (ask)."
    },
    {
      id: 18,
      question: "What is a penny stock?",
      options: [
        "A stock that costs exactly one penny",
        "A stock that trades for less than $5 per share",
        "A stock of companies that make pennies",
        "A stock that pays dividends in pennies"
      ],
      correctAnswer: 1,
      explanation: "Penny stocks are typically stocks that trade for less than $5 per share, often of small companies, and are considered highly speculative and risky."
    },
    {
      id: 19,
      question: "What is short selling?",
      options: [
        "Selling stocks quickly",
        "Borrowing shares to sell, hoping to buy them back at a lower price",
        "Selling stocks for a short period of time",
        "Selling stocks of short companies"
      ],
      correctAnswer: 1,
      explanation: "Short selling involves borrowing shares and selling them immediately, hoping to buy them back later at a lower price to profit from the decline."
    },
    {
      id: 20,
      question: "What is a stock exchange?",
      options: [
        "A place where people exchange stock tips",
        "A marketplace where stocks are bought and sold",
        "A government building where stocks are stored",
        "A type of investment account"
      ],
      correctAnswer: 1,
      explanation: "A stock exchange is a marketplace where stocks and other securities are bought and sold, providing a platform for companies to raise capital and investors to trade."
    }
  ],
  quiz3: [ // Personal Finance Pro (18 questions)
    {
      id: 1,
      question: "What is the 50/30/20 budgeting rule?",
      options: [
        "50% savings, 30% needs, 20% wants",
        "50% needs, 30% wants, 20% savings",
        "50% wants, 30% savings, 20% needs",
        "50% investments, 30% emergency fund, 20% spending"
      ],
      correctAnswer: 1,
      explanation: "The 50/30/20 rule suggests allocating 50% of after-tax income to needs, 30% to wants, and 20% to savings and debt repayment."
    },
    {
      id: 2,
      question: "What is a credit score?",
      options: [
        "Your bank account balance",
        "A number representing your creditworthiness",
        "The amount of debt you have",
        "Your monthly income"
      ],
      correctAnswer: 1,
      explanation: "A credit score is a numerical representation of your creditworthiness, typically ranging from 300-850, based on your credit history and used by lenders to assess risk."
    },
    {
      id: 3,
      question: "Which debt should you typically pay off first?",
      options: [
        "The largest balance",
        "The oldest debt",
        "The debt with the highest interest rate",
        "The debt with the lowest balance"
      ],
      correctAnswer: 2,
      explanation: "Paying off high-interest debt first (avalanche method) saves the most money over time, though some prefer the psychological boost of paying off smallest balances first (snowball method)."
    },
    {
      id: 4,
      question: "What is the debt-to-income ratio?",
      options: [
        "Total monthly debt payments divided by gross monthly income",
        "Total debt divided by total assets",
        "Monthly income divided by monthly expenses",
        "Credit card debt divided by mortgage debt"
      ],
      correctAnswer: 0,
      explanation: "Debt-to-income ratio is your total monthly debt payments divided by your gross monthly income, used by lenders to assess your ability to repay loans."
    },
    {
      id: 5,
      question: "What is the purpose of an emergency fund?",
      options: [
        "To invest in high-risk opportunities",
        "To cover unexpected expenses without going into debt",
        "To pay for vacations",
        "To buy luxury items"
      ],
      correctAnswer: 1,
      explanation: "An emergency fund provides financial security by covering unexpected expenses like job loss, medical bills, or major repairs without requiring debt."
    },
    {
      id: 6,
      question: "What factors affect your credit score the most?",
      options: [
        "Age and income",
        "Payment history and credit utilization",
        "Education and employment",
        "Location and marital status"
      ],
      correctAnswer: 1,
      explanation: "Payment history (35%) and credit utilization (30%) are the two most important factors affecting your credit score."
    },
    {
      id: 7,
      question: "What is credit utilization?",
      options: [
        "How often you use your credit cards",
        "The percentage of available credit you're using",
        "The number of credit cards you have",
        "How long you've had credit"
      ],
      correctAnswer: 1,
      explanation: "Credit utilization is the percentage of your available credit that you're currently using. Keeping it below 30% is generally recommended for a good credit score."
    },
    {
      id: 8,
      question: "What is the difference between a debit card and a credit card?",
      options: [
        "There is no difference",
        "Debit cards use your own money, credit cards borrow money",
        "Debit cards are safer than credit cards",
        "Credit cards can only be used online"
      ],
      correctAnswer: 1,
      explanation: "Debit cards withdraw money directly from your bank account, while credit cards allow you to borrow money that you must pay back later."
    },
    {
      id: 9,
      question: "What is compound interest in the context of debt?",
      options: [
        "Interest that helps you pay off debt faster",
        "Interest calculated on both principal and previously accrued interest",
        "Interest that only applies to credit cards",
        "Interest that decreases over time"
      ],
      correctAnswer: 1,
      explanation: "Compound interest on debt means you pay interest on both the original amount owed and any previously accrued interest, making debt grow faster."
    },
    {
      id: 10,
      question: "What is a budget?",
      options: [
        "A list of things you want to buy",
        "A plan for how you'll spend and save your money",
        "A government spending plan",
        "A type of savings account"
      ],
      correctAnswer: 1,
      explanation: "A budget is a plan that outlines how you'll allocate your income among various expenses, savings, and financial goals over a specific period."
    },
    {
      id: 11,
      question: "What is the envelope budgeting method?",
      options: [
        "Keeping all money in envelopes",
        "Allocating cash for different spending categories in separate envelopes",
        "Mailing your budget to the bank",
        "A digital budgeting app"
      ],
      correctAnswer: 1,
      explanation: "The envelope method involves allocating cash for different spending categories (groceries, entertainment, etc.) in separate envelopes to control spending."
    },
    {
      id: 12,
      question: "What is net worth?",
      options: [
        "Your monthly income",
        "Your assets minus your liabilities",
        "The value of your house",
        "Your credit score"
      ],
      correctAnswer: 1,
      explanation: "Net worth is calculated by subtracting your total liabilities (debts) from your total assets (what you own), representing your overall financial position."
    },
    {
      id: 13,
      question: "What is the difference between gross and net income?",
      options: [
        "There is no difference",
        "Gross is before taxes and deductions, net is after",
        "Gross is monthly, net is yearly",
        "Gross is from salary, net is from investments"
      ],
      correctAnswer: 1,
      explanation: "Gross income is your total earnings before taxes and deductions, while net income is what you actually take home after taxes and deductions."
    },
    {
      id: 14,
      question: "What is lifestyle inflation?",
      options: [
        "When the cost of living increases",
        "When your spending increases as your income increases",
        "When you buy more expensive brands",
        "When inflation affects your lifestyle"
      ],
      correctAnswer: 1,
      explanation: "Lifestyle inflation occurs when your spending increases proportionally (or more) as your income increases, potentially preventing wealth building."
    },
    {
      id: 15,
      question: "What is the purpose of tracking expenses?",
      options: [
        "To make budgeting more complicated",
        "To understand where your money goes and identify areas for improvement",
        "To impress financial advisors",
        "To qualify for loans"
      ],
      correctAnswer: 1,
      explanation: "Tracking expenses helps you understand your spending patterns, identify areas where you might be overspending, and make informed budgeting decisions."
    },
    {
      id: 16,
      question: "What is a sinking fund?",
      options: [
        "A fund that's losing money",
        "Money saved gradually for a specific future expense",
        "An underwater investment account",
        "A type of retirement account"
      ],
      correctAnswer: 1,
      explanation: "A sinking fund is money you save gradually over time for a specific future expense, like a vacation, car replacement, or home repairs."
    },
    {
      id: 17,
      question: "What is the difference between a want and a need?",
      options: [
        "Wants are cheaper than needs",
        "Needs are essential for survival, wants are desires that improve quality of life",
        "Wants are always bad, needs are always good",
        "There is no difference"
      ],
      correctAnswer: 1,
      explanation: "Needs are essential expenses required for basic living (housing, food, utilities), while wants are non-essential items that enhance your lifestyle."
    },
    {
      id: 18,
      question: "What is pay-yourself-first budgeting?",
      options: [
        "Paying your bills before anyone else's",
        "Allocating money to savings before spending on other categories",
        "Giving yourself a salary",
        "Paying cash for everything"
      ],
      correctAnswer: 1,
      explanation: "Pay-yourself-first means prioritizing savings by allocating money to savings and investments before spending on other categories, ensuring you build wealth consistently."
    }
  ],
  quiz4: [ // Retirement Planning Expert (25 questions)
    {
      id: 1,
      question: "What is the primary purpose of a 401(k) plan?",
      options: [
        "To provide health insurance",
        "To save for retirement with tax advantages",
        "To pay for college expenses",
        "To buy a first home"
      ],
      correctAnswer: 1,
      explanation: "A 401(k) is an employer-sponsored retirement savings plan that offers tax advantages to help employees save for retirement."
    },
    {
      id: 2,
      question: "What is the difference between a Traditional and Roth IRA?",
      options: [
        "Traditional is for young people, Roth is for older people",
        "Traditional offers tax deduction now, Roth offers tax-free withdrawals in retirement",
        "Traditional has higher contribution limits",
        "There is no difference"
      ],
      correctAnswer: 1,
      explanation: "Traditional IRAs offer tax deductions on contributions but taxable withdrawals, while Roth IRAs use after-tax contributions but offer tax-free withdrawals in retirement."
    },
    {
      id: 3,
      question: "What is the 4% rule in retirement planning?",
      options: [
        "Save 4% of your income for retirement",
        "Withdraw 4% of your portfolio annually in retirement",
        "Invest 4% in bonds",
        "Retire at age 64"
      ],
      correctAnswer: 1,
      explanation: "The 4% rule suggests withdrawing 4% of your retirement portfolio in the first year, then adjusting for inflation annually, to make your money last 30+ years."
    },
    {
      id: 4,
      question: "What is vesting in a 401(k) plan?",
      options: [
        "The process of choosing investments",
        "How long you must work to own employer contributions",
        "The annual contribution limit",
        "The age you can withdraw money"
      ],
      correctAnswer: 1,
      explanation: "Vesting determines how long you must work for an employer before you fully own their matching contributions to your 401(k)."
    },
    {
      id: 5,
      question: "At what age can you start taking penalty-free withdrawals from a 401(k)?",
      options: [
        "55",
        "59½",
        "62",
        "65"
      ],
      correctAnswer: 1,
      explanation: "You can generally start taking penalty-free withdrawals from a 401(k) at age 59½, though you'll still owe income taxes on traditional 401(k) withdrawals."
    }
  ],
  quiz5: [ // Tax Strategy Challenge (22 questions)
    {
      id: 1,
      question: "What is the difference between tax deduction and tax credit?",
      options: [
        "There is no difference",
        "Deductions reduce taxable income, credits reduce tax owed dollar-for-dollar",
        "Deductions are better than credits",
        "Credits reduce taxable income, deductions reduce tax owed"
      ],
      correctAnswer: 1,
      explanation: "Tax deductions reduce your taxable income, while tax credits directly reduce the amount of tax you owe, making credits generally more valuable."
    },
    {
      id: 2,
      question: "What is tax-loss harvesting?",
      options: [
        "Avoiding taxes completely",
        "Selling losing investments to offset capital gains",
        "Harvesting crops for tax benefits",
        "Delaying tax payments"
      ],
      correctAnswer: 1,
      explanation: "Tax-loss harvesting involves selling investments at a loss to offset capital gains, reducing your overall tax liability."
    },
    {
      id: 3,
      question: "What is the standard deduction for 2024 (single filer)?",
      options: [
        "$12,950",
        "$13,850",
        "$14,600",
        "$15,000"
      ],
      correctAnswer: 1,
      explanation: "The standard deduction for single filers in 2024 is $13,850, though this amount is adjusted annually for inflation."
    }
  ],
  quiz6: [ // Crypto & Digital Assets (16 questions)
    {
      id: 1,
      question: "What is Bitcoin?",
      options: [
        "A digital currency created by banks",
        "The first decentralized cryptocurrency",
        "A type of stock",
        "A government-issued digital currency"
      ],
      correctAnswer: 1,
      explanation: "Bitcoin is the first decentralized cryptocurrency, created in 2009 by an unknown person or group using the pseudonym Satoshi Nakamoto."
    },
    {
      id: 2,
      question: "What is blockchain technology?",
      options: [
        "A type of cryptocurrency",
        "A distributed ledger technology that records transactions",
        "A mining equipment",
        "A digital wallet"
      ],
      correctAnswer: 1,
      explanation: "Blockchain is a distributed ledger technology that maintains a continuously growing list of records (blocks) that are linked and secured using cryptography."
    },
    {
      id: 3,
      question: "What is cryptocurrency mining?",
      options: [
        "Digging for digital coins underground",
        "The process of validating transactions and creating new cryptocurrency",
        "Buying cryptocurrency on exchanges",
        "Storing cryptocurrency in wallets"
      ],
      correctAnswer: 1,
      explanation: "Cryptocurrency mining is the process of using computational power to validate transactions on the blockchain and create new cryptocurrency as a reward."
    }
  ],
  quiz7: [ // Real Estate Investment (20 questions)
    {
      id: 1,
      question: "What is a REIT?",
      options: [
        "Real Estate Investment Trust",
        "Real Estate Income Tax",
        "Residential Estate Investment Tool",
        "Regional Estate Investment Team"
      ],
      correctAnswer: 0,
      explanation: "A REIT (Real Estate Investment Trust) is a company that owns, operates, or finances income-generating real estate, allowing investors to invest in real estate without directly owning property."
    },
    {
      id: 2,
      question: "What is cap rate in real estate?",
      options: [
        "The maximum rate of return",
        "Net operating income divided by property value",
        "The interest rate on a mortgage",
        "The property tax rate"
      ],
      correctAnswer: 1,
      explanation: "Cap rate (capitalization rate) is calculated by dividing the net operating income by the property value, helping investors compare different real estate investments."
    },
    {
      id: 3,
      question: "What is cash-on-cash return?",
      options: [
        "The total return on investment",
        "Annual cash flow divided by initial cash investment",
        "The property's appreciation rate",
        "The rental yield"
      ],
      correctAnswer: 1,
      explanation: "Cash-on-cash return measures the annual cash flow received relative to the amount of cash initially invested, helping evaluate leveraged real estate investments."
    }
  ],
  quiz8: [ // Risk Management Master (14 questions)
    {
      id: 1,
      question: "What is investment risk?",
      options: [
        "The guarantee of losing money",
        "The possibility that investment returns will differ from expectations",
        "Only applies to stocks",
        "Something that can be completely eliminated"
      ],
      correctAnswer: 1,
      explanation: "Investment risk is the possibility that actual returns will differ from expected returns, including the potential for losing some or all of the original investment."
    },
    {
      id: 2,
      question: "What is systematic risk?",
      options: [
        "Risk that affects only one company",
        "Risk that affects the entire market or economy",
        "Risk that can be eliminated through diversification",
        "Risk from computer systems"
      ],
      correctAnswer: 1,
      explanation: "Systematic risk affects the entire market or economy and cannot be eliminated through diversification. Examples include interest rate changes, inflation, and economic recessions."
    },
    {
      id: 3,
      question: "What is the best way to manage investment risk?",
      options: [
        "Avoid all investments",
        "Diversification across different asset classes",
        "Only invest in one stock you know well",
        "Time the market perfectly"
      ],
      correctAnswer: 1,
      explanation: "Diversification across different asset classes, sectors, and geographies is one of the most effective ways to manage investment risk while still participating in market growth."
    }
  ]
};



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
    
    const questions = getCurrentQuizQuestions();
    const currentQ = questions[currentQuestion];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    
    if (isCorrect) {
      const points = Math.floor(100 / questions.length);
      setScore(prevScore => prevScore + points);
      toast({
        title: "🎉 Correct!",
        description: currentQ.explanation || "Great job! You got it right!",
        variant: "default",
      });
    } else {
      toast({
        title: "❌ Incorrect",
        description: currentQ.explanation || `The correct answer was: ${currentQ.options[currentQ.correctAnswer]}`,
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
    return quizQuestions[activeQuiz as keyof typeof quizQuestions] || quizQuestions.quiz1;
  };

  const getCurrentQuizInfo = () => {
    return quizzes.find(quiz => quiz.id === activeQuiz) || quizzes[0];
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
              <Card className="shadow-lg border-primary-200">
                <CardHeader className="bg-gradient-to-r from-primary-50 to-primary-100/50 border-b border-primary-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{getCurrentQuizInfo().title}</CardTitle>
                      <CardDescription className="mt-1">
                        Question {currentQuestion + 1} of {getCurrentQuizQuestions().length} • {getCurrentQuizInfo().category} • {getCurrentQuizInfo().difficulty}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Progress</div>
                      <div className="text-lg font-bold text-primary-600">
                        {Math.round(((currentQuestion + 1) / getCurrentQuizQuestions().length) * 100)}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${((currentQuestion + 1) / getCurrentQuizQuestions().length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-8">
                  <div className="space-y-8">
                    <div className="text-xl font-semibold leading-relaxed">
                      {getCurrentQuizQuestions()[currentQuestion].question}
                    </div>
                    
                    <div className="grid gap-4">
                      {getCurrentQuizQuestions()[currentQuestion].options.map((option, index) => (
                        <div 
                          key={index}
                          onClick={() => handleOptionSelect(index)}
                          className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                            selectedOption === index 
                              ? 'border-primary-500 bg-primary-50 shadow-md transform scale-[1.02]' 
                              : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedOption === index 
                                ? 'border-primary-500 bg-primary-500' 
                                : 'border-slate-300'
                            }`}>
                              {selectedOption === index && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </div>
                            <span className="text-lg">{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-6 flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        💡 Take your time to think through each answer
                      </div>
                      <Button 
                        onClick={handleNextQuestion}
                        disabled={selectedOption === null}
                        className="flex items-center gap-2 shadow-sm px-8 py-3 text-lg"
                        size="lg"
                      >
                        {currentQuestion < getCurrentQuizQuestions().length - 1 ? "Next Question" : "Finish Quiz"}
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : activeQuiz && quizCompleted ? (
              <Card className="shadow-lg border-primary-200 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                  <CardTitle className="text-2xl text-center">🎉 Quiz Completed!</CardTitle>
                  <CardDescription className="text-primary-100 text-center text-lg">
                    {getCurrentQuizInfo().title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="flex flex-col items-center">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-8 shadow-xl">
                      <div className="text-7xl">
                        {score >= 90 ? "🏆" : score >= 70 ? "🥈" : score >= 50 ? "🥉" : "📚"}
                      </div>
                    </div>
                    
                    <div className="text-center mb-8">
                      <h2 className="text-4xl font-bold mb-4 text-primary-600">{score}%</h2>
                      <div className="text-lg text-muted-foreground mb-2">
                        {score >= 90 
                          ? "🌟 Outstanding! You're a financial expert!" 
                          : score >= 70
                            ? "🎯 Excellent! You have strong financial knowledge!"
                            : score >= 50
                              ? "👍 Good job! Keep learning to master these concepts."
                              : "📖 Keep studying! You're on the right path to financial literacy."}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        You earned <span className="font-bold text-primary-600">+{getCurrentQuizInfo().points} points</span>
                      </div>
                    </div>

                    <div className="w-full max-w-md mb-8">
                      <div className="bg-slate-100 rounded-full h-4 mb-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full transition-all duration-1000" 
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>0%</span>
                        <span>Perfect Score</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 w-full max-w-md mb-8">
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-primary-600">{getCurrentQuizQuestions().length}</div>
                        <div className="text-sm text-muted-foreground">Questions</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{Math.round(score * getCurrentQuizQuestions().length / 100)}</div>
                        <div className="text-sm text-muted-foreground">Correct</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <Button variant="outline" onClick={handleReturnToQuizzes} className="px-8">
                        Return to Learning Hub
                      </Button>
                      <Button 
                        onClick={() => {
                          setCurrentQuestion(0);
                          setScore(0);
                          setQuizCompleted(false);
                          setSelectedOption(null);
                        }}
                        className="px-8"
                      >
                        Retake Quiz
                      </Button>
                    </div>

                    {score >= 80 && (
                      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                        <div className="text-yellow-800 font-medium">🎖️ Achievement Unlocked!</div>
                        <div className="text-yellow-700 text-sm">Financial Knowledge Master</div>
                      </div>
                    )}
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
                            className="border-2 border-slate-200 rounded-xl p-6 hover:border-primary-300 hover:bg-gradient-to-r hover:from-slate-50 hover:to-primary-50/30 transition-all duration-200 cursor-pointer hover:shadow-lg group"
                            onClick={() => handleModuleClick(module.id)}
                          >
                            <div className="flex items-start gap-4">
                              <div className="text-3xl p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl group-hover:scale-110 transition-transform duration-200">
                                {module.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="font-bold text-lg text-slate-800 group-hover:text-primary-700 transition-colors">
                                      {module.title}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-1">
                                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                        module.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                                        module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                        module.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700' :
                                        'bg-red-100 text-red-700'
                                      }`}>
                                        {module.difficulty}
                                      </span>
                                      <span className="text-xs text-muted-foreground">⏱️ {module.duration}</span>
                                      <span className="text-xs text-muted-foreground">📚 {module.lessons} lessons</span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-sm font-bold text-primary-600">{module.progress}%</span>
                                    <div className="text-xs text-muted-foreground">complete</div>
                                  </div>
                                </div>
                                
                                <p className="text-slate-600 mb-4 leading-relaxed">{module.description}</p>
                                
                                <div className="space-y-2">
                                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500" 
                                      style={{ width: `${module.progress}%` }}
                                    ></div>
                                  </div>
                                  
                                  <div className="flex justify-between items-center">
                                    <div className="text-xs text-muted-foreground">
                                      {module.progress === 0 ? 'Not started' : 
                                       module.progress === 100 ? 'Completed' : 
                                       'In progress'}
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="text-primary-600 p-0 h-auto hover:bg-transparent hover:text-primary-700 font-medium group-hover:translate-x-1 transition-transform duration-200"
                                    >
                                      {module.progress === 0 ? 'Start learning' : 
                                       module.progress === 100 ? 'Review' : 
                                       'Continue'} 
                                      <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                  </div>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {quizzes.map((quiz) => (
                          <div key={quiz.id} className="border-2 border-slate-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-lg transition-all duration-200 cursor-pointer group bg-gradient-to-br from-white to-slate-50/50">
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                                  quiz.category === 'Investing' ? 'bg-blue-100' :
                                  quiz.category === 'Stocks' ? 'bg-green-100' :
                                  quiz.category === 'Budgeting' ? 'bg-purple-100' :
                                  quiz.category === 'Retirement' ? 'bg-orange-100' :
                                  quiz.category === 'Taxes' ? 'bg-red-100' :
                                  quiz.category === 'Crypto' ? 'bg-yellow-100' :
                                  quiz.category === 'Real Estate' ? 'bg-indigo-100' :
                                  'bg-slate-100'
                                }`}>
                                  {quiz.category === 'Investing' ? '📊' :
                                   quiz.category === 'Stocks' ? '📈' :
                                   quiz.category === 'Budgeting' ? '💳' :
                                   quiz.category === 'Retirement' ? '🏖️' :
                                   quiz.category === 'Taxes' ? '💰' :
                                   quiz.category === 'Crypto' ? '₿' :
                                   quiz.category === 'Real Estate' ? '🏠' :
                                   '📚'}
                                </div>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  quiz.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                                  quiz.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                  quiz.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {quiz.difficulty}
                                </div>
                              </div>
                              
                              <h3 className="font-bold text-lg mb-2 group-hover:text-primary-700 transition-colors">
                                {quiz.title}
                              </h3>
                              
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center justify-between">
                                  <span>📝 {quiz.questions} questions</span>
                                  <span>⏱️ {quiz.timeLimit}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>🏷️ {quiz.category}</span>
                                  <span className="font-bold text-primary-600">+{quiz.points} pts</span>
                                </div>
                              </div>
                            </div>
                            
                            <Button 
                              className="w-full group-hover:bg-primary-600 group-hover:scale-105 transition-all duration-200"
                              onClick={() => handleStartQuiz(quiz.id)}
                            >
                              Start Quiz
                            </Button>
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
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon: "🔍", title: "First Steps", desc: "Complete your first module", unlocked: true, rarity: "common" },
                          { icon: "🏆", title: "Quiz Master", desc: "Score 100% on any quiz", unlocked: true, rarity: "rare" },
                          { icon: "📚", title: "Knowledge Seeker", desc: "Complete 3 modules", unlocked: false, rarity: "common" },
                          { icon: "🚀", title: "Rising Star", desc: "Earn 500 points", unlocked: false, rarity: "uncommon" },
                          { icon: "💯", title: "Perfect Score", desc: "Ace 5 quizzes", unlocked: false, rarity: "rare" },
                          { icon: "🎓", title: "Financial Graduate", desc: "Complete all modules", unlocked: false, rarity: "legendary" },
                          { icon: "⚡", title: "Speed Learner", desc: "Complete quiz in under 5 min", unlocked: false, rarity: "uncommon" },
                          { icon: "🔥", title: "Streak Master", desc: "7-day learning streak", unlocked: false, rarity: "rare" },
                          { icon: "💎", title: "Expert Analyst", desc: "Master advanced concepts", unlocked: false, rarity: "epic" },
                          { icon: "👑", title: "Financial Guru", desc: "Reach top 10 leaderboard", unlocked: false, rarity: "legendary" },
                        ].map((achievement, i) => (
                          <div 
                            key={i}
                            className={`flex flex-col items-center justify-center p-3 border-2 rounded-xl text-center transition-all duration-200 ${
                              achievement.unlocked 
                                ? achievement.rarity === 'legendary' ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md' :
                                  achievement.rarity === 'epic' ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100' :
                                  achievement.rarity === 'rare' ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100' :
                                  achievement.rarity === 'uncommon' ? 'border-green-300 bg-gradient-to-br from-green-50 to-green-100' :
                                  'border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100'
                                : 'border-gray-200 bg-gray-50 opacity-50'
                            } ${achievement.unlocked ? 'hover:scale-105 cursor-pointer' : ''}`}
                          >
                            <div className={`text-2xl mb-1 ${achievement.unlocked ? 'animate-pulse' : ''}`}>
                              {achievement.icon}
                            </div>
                            <p className="text-xs font-bold">{achievement.title}</p>
                            <p className="text-xs text-muted-foreground mt-1 leading-tight">{achievement.desc}</p>
                            {achievement.unlocked && (
                              <div className={`text-xs mt-1 px-2 py-0.5 rounded-full font-medium ${
                                achievement.rarity === 'legendary' ? 'bg-yellow-200 text-yellow-800' :
                                achievement.rarity === 'epic' ? 'bg-purple-200 text-purple-800' :
                                achievement.rarity === 'rare' ? 'bg-blue-200 text-blue-800' :
                                achievement.rarity === 'uncommon' ? 'bg-green-200 text-green-800' :
                                'bg-slate-200 text-slate-800'
                              }`}>
                                {achievement.rarity}
                              </div>
                            )}
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
