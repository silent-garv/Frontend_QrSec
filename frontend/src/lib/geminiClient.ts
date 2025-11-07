const BACKEND_URLS = {
  development: 'http://localhost:3000',
  production: 'https://qr-scan-shield-backend.vercel.app'
};

const baseUrl = BACKEND_URLS[import.meta.env.MODE] || BACKEND_URLS.production;
const API_URL = `${baseUrl}/api/chat`;

export async function sendMessage(message: string): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'omit', // Don't send credentials for cross-origin requests
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