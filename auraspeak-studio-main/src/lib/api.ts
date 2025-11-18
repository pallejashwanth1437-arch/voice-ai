const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  async convertTextToSpeech(text: string, voice: string) {
    const response = await fetch(`${API_BASE_URL}/tts/convert`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ text, voice })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Conversion failed');
    }

    return response.json();
  }

  async getHistory() {
    const response = await fetch(`${API_BASE_URL}/tts/history`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }

    return response.json();
  }

  async deleteHistoryItem(id: string) {
    const response = await fetch(`${API_BASE_URL}/tts/history/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to delete item');
    }

    return response.json();
  }

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    return data;
  }

  async register(name: string, email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    return data;
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}

export const apiService = new ApiService();