import { Groq } from 'groq-sdk';

// Initialize GROQ client
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // Required for client-side usage
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface StreamingResponse {
  content: string;
  isComplete: boolean;
}

// System prompt for FinSage AI assistant
const SYSTEM_PROMPT = `You are FinSage AI, a friendly and knowledgeable financial advisor. You're here to help users with their financial questions in a conversational, human-like manner.

Your expertise includes:
- Financial literacy education and training
- Investment strategies and portfolio management
- Stock analysis and market insights
- Mutual funds, ETFs, and other investment vehicles
- Tax-efficient investing and financial planning
- Risk assessment and diversification
- Retirement planning and wealth building

Communication style:
- Speak naturally and conversationally, like a helpful friend who happens to be a financial expert
- Never use markdown formatting, headers, bullet points, or numbered lists in your responses
- Write in flowing paragraphs with natural transitions
- Be warm, approachable, and encouraging
- Use simple, clear language that anyone can understand
- Share insights as if you're having a casual conversation over coffee
- Avoid technical jargon unless necessary, and explain it simply when you do use it

Important guidelines:
- Always provide practical, actionable advice
- Consider the user's risk tolerance and investment timeline
- Mention relevant financial instruments when helpful (SIP, ELSS, PPF, etc. for Indian users)
- Ask follow-up questions to better understand their situation
- Remind users this is educational content and they should consult qualified financial advisors for personalized advice

Remember: Respond as a human would in natural conversation(you can use emojis), without any formatting, headers, or structured lists. Keep it conversational and friendly.`;

export class GroqChatService {
  private conversationHistory: ChatMessage[] = [
    {
      role: 'system',
      content: SYSTEM_PROMPT
    }
  ];

  async sendMessage(userMessage: string): Promise<AsyncGenerator<StreamingResponse, void, unknown>> {
    // Add user message to conversation history
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: this.conversationHistory,
        model: "openai/gpt-oss-20b",
        temperature: 1,
        max_completion_tokens: 8192,
        top_p: 1,
        stream: true,
        reasoning_effort: "medium",
        stop: null
      });

      return this.processStreamingResponse(chatCompletion);
    } catch (error) {
      console.error('GROQ API Error:', error);
      throw new Error('Failed to get response from AI assistant');
    }
  }

  private async* processStreamingResponse(
    chatCompletion: AsyncIterable<any>
  ): AsyncGenerator<StreamingResponse, void, unknown> {
    let fullContent = '';

    try {
      for await (const chunk of chatCompletion) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          fullContent += content;
          // Clean up the content to remove markdown formatting
          const cleanedContent = this.cleanMarkdownFormatting(fullContent);
          yield {
            content: cleanedContent,
            isComplete: false
          };
        }
      }

      // Clean the final content and add to conversation history
      const finalCleanedContent = this.cleanMarkdownFormatting(fullContent);
      if (finalCleanedContent) {
        this.conversationHistory.push({
          role: 'assistant',
          content: finalCleanedContent
        });
      }

      yield {
        content: finalCleanedContent,
        isComplete: true
      };
    } catch (error) {
      console.error('Streaming error:', error);
      throw error;
    }
  }

  // Helper method to clean markdown formatting
  private cleanMarkdownFormatting(content: string): string {
    return content
      // Remove markdown headers (##, ###, etc.)
      .replace(/^#{1,6}\s+/gm, '')
      // Remove bold/italic markdown
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      // Remove bullet points and numbered lists
      .replace(/^\s*[-*+]\s+/gm, '')
      .replace(/^\s*\d+\.\s+/gm, '')
      // Clean up extra whitespace
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim();
  }

  // Method to clear conversation history (for new chat sessions)
  clearHistory(): void {
    this.conversationHistory = [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      }
    ];
  }

  // Method to get conversation history
  getHistory(): ChatMessage[] {
    return this.conversationHistory.filter(msg => msg.role !== 'system');
  }
}

// Export a singleton instance
export const groqChatService = new GroqChatService();