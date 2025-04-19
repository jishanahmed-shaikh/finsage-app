
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogArticle from "@/components/blog/BlogArticle";
import BlogImage from "@/components/blog/BlogImage";
import BlogSectionHeader from "@/components/blog/BlogSectionHeader";
import { useViewport } from "@/hooks/use-viewport";

const BlogPage = () => {
  const { isMobile } = useViewport();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <BlogArticle 
          title="FinSage: Revolutionizing Personal Financial Management with AI"
          subtitle="How our advanced platform is transforming the way people manage their investments and financial decisions"
          author="Financial Technology Team"
          date="April 3, 2025"
          readTime="15 min read"
          heroImage="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1920&q=80"
        >
          <p className="lead">
            In today's complex financial landscape, managing investments effectively requires both sophisticated tools and expert knowledge. FinSage bridges this gap by combining cutting-edge AI technology with intuitive design to create a comprehensive financial management platform that's accessible to everyone—from beginners to seasoned investors.
          </p>
          
          <BlogSectionHeader 
            title="The Vision Behind FinSage"
            subtitle="Democratizing financial intelligence for the modern investor"
          />
          
          <p>
            The financial technology landscape has evolved dramatically over the past decade, yet many individuals still find themselves navigating investment decisions without adequate tools or guidance. FinSage was born from a simple yet powerful vision: to democratize financial intelligence and make sophisticated portfolio management accessible to everyone.
          </p>
          
          <p>
            Unlike traditional financial platforms that merely track investments, FinSage integrates real-time data analysis with personalized AI guidance to provide a complete financial management solution. Our platform doesn't just show you what's happening with your investments—it explains why it's happening and recommends actionable steps to optimize your portfolio.
          </p>
          
          <BlogImage 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80"
            alt="Person analyzing financial data on a laptop"
            caption="FinSage transforms complex financial data into actionable insights"
          />
          
          <BlogSectionHeader 
            title="Core Platform Features"
            subtitle="A comprehensive toolkit for financial success"
          />
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Interactive Dashboard</h3>
          <p>
            At the heart of FinSage is our intuitive dashboard that provides a holistic view of your financial portfolio. Users can track asset allocation, monitor performance metrics, and visualize growth trends through interactive charts. The dashboard adapts to your investment profile, highlighting key metrics that matter most to your financial goals.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">AI-Powered Financial Assistant</h3>
          <p>
            Our advanced conversational AI goes beyond simple chatbot functionality to provide deeply personalized financial guidance. Users can ask complex questions about their investments, receive explanations about market trends, and get tailored recommendations based on their unique financial situation and goals.
          </p>
          
          <p>
            The AI assistant continuously learns from market data and user interactions, improving its recommendations over time and adapting to changing financial landscapes. Whether you're seeking tax optimization strategies or wondering about the impact of global events on your portfolio, FinSage's AI assistant provides clear, actionable insights.
          </p>
          
          <BlogImage 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
            alt="User interacting with FinSage's AI assistant"
            caption="FinSage's AI assistant provides personalized financial guidance through natural conversation"
          />
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Stock Performance Analytics</h3>
          <p>
            For users looking to dive deeper into stock analysis, FinSage offers comprehensive performance analytics with technical indicators, fundamental analysis, and predictive modeling. Our platform aggregates data from multiple trusted sources to provide a complete picture of stock performance and potential.
          </p>
          
          <p>
            What sets FinSage apart is how we translate complex market data into easily understandable insights. Rather than overwhelming users with charts and numbers, we highlight key patterns and explain their significance in plain language, making sophisticated analysis accessible to investors of all experience levels.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Financial Learning Hub</h3>
          <p>
            We believe that financial education is essential for long-term investment success. That's why FinSage includes a comprehensive learning hub with articles, interactive tutorials, and skill-building modules designed to improve financial literacy at every level.
          </p>
          
          <p>
            Content is personalized based on the user's investment profile and knowledge gaps, ensuring that educational resources are relevant and immediately applicable to their financial journey. From basic concepts like compound interest to advanced topics like options strategies, our learning hub grows with the user.
          </p>
          
          <BlogSectionHeader 
            title="Technical Implementation"
            subtitle="Behind the scenes of our powerful platform"
          />
          
          <p>
            Building a platform that's both powerful and accessible required thoughtful technical decisions at every step. FinSage is built on a modern tech stack designed for performance, scalability, and a seamless user experience.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Frontend Architecture</h3>
          <p>
            The FinSage frontend is built with React and TypeScript, providing a robust foundation for our interactive user interface. We've leveraged Vite for extremely fast build times and development experience, enabling our team to rapidly iterate on new features while maintaining excellent performance.
          </p>
          
          <p>
            For styling, we chose Tailwind CSS to implement a responsive design system that works flawlessly across all device sizes. This approach, combined with the shadcn/ui component library, ensures consistent, accessible UI elements throughout the application while maintaining the flexibility to create custom interfaces where needed.
          </p>
          
          <BlogImage 
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"
            alt="Code editor showing FinSage development"
            caption="FinSage's modern frontend architecture enables rapid development of complex features"
          />
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Data Visualization</h3>
          <p>
            Financial data visualization is at the core of FinSage's value proposition. We've implemented Recharts for creating interactive, responsive charts that convey complex financial information clearly and intuitively. Our visualization components are optimized for both desktop and mobile viewing, ensuring a consistent experience across all devices.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">State Management and Data Fetching</h3>
          <p>
            To handle the complex state management needs of a financial platform, we implemented React Query for efficient data fetching, caching, and state synchronization. This approach provides real-time updates while minimizing network requests, resulting in a responsive application even when working with large datasets.
          </p>
          
          <BlogSectionHeader 
            title="User-Centered Design Approach"
            subtitle="Building for real people with real financial needs"
          />
          
          <p>
            From the earliest stages of development, FinSage has been built with a deep commitment to user-centered design. We conducted extensive research with investors of varying experience levels to understand their pain points, workflows, and mental models when managing their finances.
          </p>
          
          <p>
            This research informed every aspect of our platform, from the information architecture to the interaction patterns. We continuously test and iterate on our designs based on user feedback, ensuring that FinSage not only provides powerful functionality but does so in a way that feels intuitive and accessible.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Accessibility and Inclusivity</h3>
          <p>
            We believe that financial tools should be accessible to everyone, regardless of ability. FinSage is built with a strong focus on accessibility, following WCAG guidelines to ensure that all users can navigate and utilize our platform effectively. This includes semantic HTML structure, keyboard navigation support, screen reader compatibility, and thoughtful color contrast ratios.
          </p>
          
          <p>
            Our commitment to inclusivity extends beyond technical accessibility to the very language and concepts we use throughout the platform. We've worked to eliminate jargon and provide clear explanations of financial concepts, making FinSage approachable for users with varying levels of financial literacy.
          </p>
          
          <BlogSectionHeader 
            title="Looking Ahead: The Future of FinSage"
            subtitle="Our roadmap for continued innovation"
          />
          
          <p>
            FinSage is continuously evolving to meet the changing needs of investors and the dynamic financial landscape. Our development roadmap includes several exciting features that will further enhance the platform's capabilities:
          </p>
          
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>
              <strong>Advanced Portfolio Optimization:</strong> Implementing sophisticated algorithms to suggest optimal asset allocation based on user risk tolerance, time horizon, and financial goals.
            </li>
            <li>
              <strong>Expanded Asset Classes:</strong> Adding support for alternative investments, cryptocurrencies, and other emerging asset classes to provide comprehensive portfolio management.
            </li>
            <li>
              <strong>Social Learning Features:</strong> Introducing community-based learning opportunities where users can share insights and strategies in a moderated environment.
            </li>
            <li>
              <strong>Automated Tax Optimization:</strong> Developing intelligent tax-loss harvesting recommendations and tax impact forecasting for investment decisions.
            </li>
            <li>
              <strong>Enhanced Mobile Experience:</strong> Continuing to refine our mobile interface to ensure FinSage is fully functional and intuitive on all devices.
            </li>
          </ul>
          
          <BlogSectionHeader 
            title="Conclusion"
            subtitle="Empowering financial decisions through technology"
          />
          
          <p>
            FinSage represents a new paradigm in personal financial management—one where powerful technology and intuitive design come together to empower users at every stage of their investment journey. By combining comprehensive portfolio tracking, sophisticated analytics, and personalized AI guidance, we're helping users make more informed financial decisions with confidence.
          </p>
          
          <p>
            As we continue to develop and enhance the platform, our focus remains unwavering: to democratize financial intelligence and make expert-level portfolio management accessible to everyone. Whether you're taking your first steps into investing or managing a complex portfolio, FinSage provides the tools, insights, and guidance you need to succeed in your financial goals.
          </p>
          
          <div className="p-6 bg-primary-50 rounded-xl mt-10 mb-6">
            <h3 className="text-xl font-semibold mb-3">Ready to transform your financial management?</h3>
            <p className="mb-4">Experience the power of AI-driven investment guidance and comprehensive portfolio tracking with FinSage.</p>
            <a href="/dashboard" className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors">
              Get Started Today
            </a>
          </div>
        </BlogArticle>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
