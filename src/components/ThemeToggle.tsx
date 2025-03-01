
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user has a preference saved in localStorage
    const savedTheme = localStorage.getItem('spotify-theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('spotify-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('spotify-theme', 'light');
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-emerald-700 text-white hover:bg-emerald-600 transition-colors neo-button"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
