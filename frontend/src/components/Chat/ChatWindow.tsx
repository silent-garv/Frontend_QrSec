import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import Message from './Message';
import { sendMessage } from '@/lib/geminiClient';
import { Loader2, Bot } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  text: string;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const handleExampleClick = (question: string) => {
    setInput(question);
  };

  useEffect(() => {
    const scrollArea = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollArea instanceof HTMLElement) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(input.trim());
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { role: 'system', text: 'Sorry, there was an error processing your request.' }
      ]);
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-xl shadow-lg bg-white dark:bg-gray-900">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold text-primary mb-1">Digital Security Assistant</h2>
        <p className="text-sm text-muted-foreground">Get friendly advice on staying safe online</p>
      </div>

      <div ref={scrollAreaRef} className="flex-1 relative">
        <ScrollArea className="h-[calc(600px-10.5rem)] py-4">
          <div className="px-6 space-y-2">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center space-y-2 max-w-sm">
                  <p className="text-lg font-medium text-primary">Hi! I'm here to help</p>
                  <p className="text-muted-foreground">
                    Ask me anything about online safety, QR codes, or digital security.
                  </p>
                  <div className="flex flex-col gap-2 mt-4">
                    <div 
                      onClick={() => handleExampleClick("How can I protect my phone from hackers?")}
                      className="text-sm text-muted-foreground p-2 rounded bg-muted/10 cursor-pointer hover:bg-muted/20 transition-colors"
                    >
                      "How can I protect my phone from hackers?"
                    </div>
                    <div 
                      onClick={() => handleExampleClick("Is it safe to use public Wi-Fi?")}
                      className="text-sm text-muted-foreground p-2 rounded bg-muted/10 cursor-pointer hover:bg-muted/20 transition-colors"
                    >
                      "Is it safe to use public Wi-Fi?"
                    </div>
                  </div>
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <Message key={index} role={message.role} text={message.text} />
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="border-t dark:border-gray-700 bg-gradient-to-r from-primary/10 to-primary/5 p-4 mx-auto w-full">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 px-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask any question about digital security..."
              disabled={isLoading}
              className="shadow-sm flex-1 py-5 px-4 rounded-lg"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="px-6 py-5 rounded-lg shadow-sm hover:shadow-md transition-all"
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Send
                  <svg 
                    className="w-4 h-4 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}