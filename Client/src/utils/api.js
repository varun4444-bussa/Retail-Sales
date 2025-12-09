const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://retail-sales-5hu1.onrender.com';

export const api = {
  // Sample/Transaction endpoints - Fetches data from database via server
  async getSamples(page = 1, limit = 10000, getAll = false){

  // async getSamples(page = 1, limit = 1000, getAll = true) {
    try {
      // If getAll is true, fetch all data from database in chunks via backend
      // Otherwise, fetch paginated data from database
      const url = getAll 
        ? `${API_BASE_URL}/samples?getAll=true`
        : `${API_BASE_URL}/samples?page=${page}&limit=${limit}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(errorData.error || `Failed to fetch samples from database: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // When getAll=true, server returns array directly from database
      // When getAll=false, server returns { data: [...], pagination: {...} }
      return data;
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error(`Network error: Cannot connect to server at ${API_BASE_URL}. Make sure the server is running and database is connected.`);
      }
      throw error;
    }
  },

  async createSample(data) {
    const response = await fetch(`${API_BASE_URL}/samples`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create sample');
    }
    return response.json();
  },

  async updateSample(id, data) {
    const response = await fetch(`${API_BASE_URL}/samples/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update sample');
    }
    return response.json();
  },

  async deleteSample(id) {
    const response = await fetch(`${API_BASE_URL}/samples/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete sample');
    }
    return response.json();
  },
};

