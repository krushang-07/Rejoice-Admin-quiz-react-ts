// Header.tsx
import React from "react";
import { useTheme } from "../utils/ThemeProvider.tsx";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="p-4">
      <button
        className="ml-4 px-4 py-2 bg-blue-800 text-white rounded"
        onClick={toggleTheme}
      >
        Toggle Theme ({theme})
      </button>
    </header>
  );
};

export default Header;
