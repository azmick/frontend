const API_URL = 'http://localhost:5000/auth';

const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Token'ı ve nickname'i kaydet
    localStorage.setItem('token', data.token);
    localStorage.setItem('nickname', data.nickname); // Nickname'i de sakla

    return data.token; // Sadece token'ı döndür
  } catch (error) {
    console.error("Login Error:", error.message);
    return null;
  }
};



// Register işlemi
const register = async (nickname, email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname, email, password }),
    });

    if (!response.ok) {
      // API tarafından döndürülen hata mesajı varsa gösterelim
      const data = await response.json();
      throw new Error(data.message || 'Registration failed');
    }

    // Başarılıysa true döndür
    return true;
  } catch (error) {
    console.error("Registration Error:", error.message);
    // Hata durumunda false döndür
    return false;
  }
};

const getUsernameByEmail = async (email) => {
  try {
    const response = await fetch(`${API_URL}/get-username`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error retrieving username');
    }

    return data.nickname;
  } catch (error) {
    console.error("Error retrieving username:", error.message);
    return null;
  }
};
// Logout işlemi
const logout = () => {
  localStorage.removeItem('token');
};

export default { login, register, logout, getUsernameByEmail };
