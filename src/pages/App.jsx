import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import ConversionArea from "../components/ConversionArea.jsx";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-20 pb-12 md:py-20 flex flex-col items-center">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-2 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-md shadow-lg hover:scale-110 transition-transform cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.947-4.414l-1.591-1.591M4.947 6.947l-1.591-1.591m12.454 12.454l-1.591-1.591M4.947 17.053l-1.591 1.591m12.454-12.454l-1.591-1.591M18 12h2.25M3 12h2.25m9.158-1.916a4.5 4.5 0 11-6.316 6.316 4.5 4.5 0 016.316-6.316z" />
            </svg>
          )}
        </button>

        {/* Main Card */}
        <div className="w-full bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transition-all duration-500">
          <header className="p-8 pb-0">
            <Header />
          </header>
          
          <section className="p-8">
            <ConversionArea />
          </section>
        </div>

        <p className="mt-12 text-center text-xs text-slate-400 dark:text-slate-500 max-w-md leading-relaxed">
          *The page serves only as a demonstration of API consumption. Note that
          the page relies on a third-party API, so the presented data may be
          outdated or incorrect. We do not take responsibility for any information
          extracted from this site.
        </p>
      </div>
    </div>
  );
}

export default App;
