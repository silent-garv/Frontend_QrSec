import React from 'react';
import { Card } from '@/components/ui/card';
import ChatWindow from '@/components/Chat/ChatWindow';

export default function SecurityGuide() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Security Education Center</h1>
      
      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">AI Security Assistant</h2>
          <p className="text-muted-foreground mb-4">
            Get expert guidance on QR code security. Learn about safe scanning practices,
            threat detection, and how to protect yourself from QR code-based scams.
          </p>
          <ChatWindow />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Security Resources</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Safe QR Code Scanning Guide</li>
            <li>Understanding Security Scan Results</li>
            <li>Security Best Practices</li>
            <li>Identifying QR Code Scams</li>
            <li>Reporting Malicious QR Codes</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}