// // Header.tsx
// import React from "react";
// import { useTheme } from "../utils/ThemeProvider.tsx";

// const Header: React.FC = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <header className="p-4">
//       <button
//         className="ml-4 px-4 py-2 bg-blue-800 text-white rounded"
//         onClick={toggleTheme}
//       >
//         Toggle({theme})
//       </button>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { useTheme } from "../utils/ThemeProvider.tsx";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="p-4">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-semibold">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
        {/* Inbuilt Toggle Switch */}
        <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="theme-toggle"
            className="mr-2"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span>{theme === "dark" ? "🌙" : "🌞"}</span>
        </label>
      </div>
    </header>
  );
};

export default Header;
