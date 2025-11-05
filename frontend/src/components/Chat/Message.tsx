import React from 'react';
import { cn } from "@/lib/utils";
import { User, Bot } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

export default function Message({ role, text }: { role: 'user' | 'assistant' | 'system'; text: string }) {
  const isUser = role === 'user';
  const isSystem = role === 'system';
  
  const base = 'max-w-[85%] break-words px-6 py-3 rounded-2xl shadow-sm transition-all';
  const classes = cn(base, {
    'bg-primary text-primary-foreground self-end hover:shadow-md': isUser,
    'bg-muted/10 hover:bg-muted/20 text-foreground self-start hover:shadow-md': !isUser,
    'bg-destructive/10 text-destructive self-start': isSystem
  });

  const Icon = isUser ? User : Bot;

  return (
    <div className={`flex items-start gap-2 py-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      )}
      <div className={classes}>
        <div className="text-sm whitespace-pre-wrap">
          {isUser || isSystem ? (
            text
          ) : (
            <TypeAnimation
              sequence={[text]}
              cursor={false}
              wrapper="span"
              speed={75}
              style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }}
            />
          )}
        </div>
      </div>
      {isUser && (
        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      )}
    </div>
  );
}