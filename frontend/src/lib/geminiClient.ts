// Use the correct backend URL based on environment
const API_URL = import.meta.env.PROD
  ? 'https://qr-scan-shield-backend.vercel.app/api/chat'  // Production backend
  : 'http://localhost:3000/api/chat';  // Development backend

export async function sendMessage(message: string): Promise<string> {
  try {
    console.log('Sending message to:', API_URL);
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    console.log('Response status:', response.status);
    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);

    if (!response.ok) {
      let errorText;
      try {
        const errorData = await response.json();
        errorText = errorData.error || `Server error: ${response.status}`;
      } catch (e) {
        errorText = `Failed to get response: ${response.status}`;
      }
      throw new Error(errorText);
    }

    const data = await response.json();
    if (!data || typeof data.response !== 'string') {
      throw new Error('Invalid response format from server');
    }
    return data.response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}