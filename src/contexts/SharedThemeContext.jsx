import { createContext, useContext, useState, useEffect } from 'react';

const SharedThemeContext = createContext();

export const SharedThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        // Check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        // Save theme preference to localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // Apply theme to document
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <SharedThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </SharedThemeContext.Provider>
    );
};

export const useSharedTheme = () => {
    const context = useContext(SharedThemeContext);
    if (!context) {
        throw new Error('useSharedTheme must be used within a SharedThemeProvider');
    }
    return context;
};
