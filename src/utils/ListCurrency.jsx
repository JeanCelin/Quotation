import React, { useEffect, useState, useMemo } from "react";
import APICoins from "../services/api/APICoins";
import APIConverter from "../services/api/APIConverter";

export default function ListCurrency() {
  const [coinsData, setCoinsData] = useState({});
  const [selectedSource, setSelectedSource] = useState("Dólar Americano");
  const [selectedTarget, setSelectedTarget] = useState("Real Brasileiro");
  const [selectedCoinCode, setSelectedCoinCode] = useState("USD-BRL");

  const [isSourceDropdownVisible, setIsSourceDropdownVisible] = useState(false);
  const [isTargetDropdownVisible, setIsTargetDropdownVisible] = useState(false);
  const [sourceSearch, setSourceSearch] = useState("");
  const [targetSearch, setTargetSearch] = useState("");

  // Parse coinsData into mapping
  const currencyMapping = useMemo(() => {
    const mapping = {};
    Object.entries(coinsData).forEach(([code, name]) => {
      const [source, target] = name.split("/");
      if (!mapping[source]) {
        mapping[source] = { targets: {} };
      }
      mapping[source].targets[target] = code;
    });
    return mapping;
  }, [coinsData]);

  // Unique sorted lists for display
  const allSources = useMemo(() => Object.keys(currencyMapping).sort(), [currencyMapping]);

  const availableTargets = useMemo(() => {
    if (selectedSource && currencyMapping[selectedSource]) {
      return Object.keys(currencyMapping[selectedSource].targets).sort();
    }
    return [];
  }, [selectedSource, currencyMapping]);

  // Initial setup once data is loaded
  useEffect(() => {
    if (allSources.length > 0 && !selectedSource) {
      setSelectedSource("Dólar Americano"); // Default
    }
  }, [allSources]);

  // Update coin code when selection changes
  useEffect(() => {
    if (selectedSource && selectedTarget && currencyMapping[selectedSource]) {
      const code = currencyMapping[selectedSource].targets[selectedTarget];
      if (code) {
        setSelectedCoinCode(code);
      }
    }
  }, [selectedSource, selectedTarget, currencyMapping]);

  const handleCoinsData = (data) => {
    setCoinsData(data);
  };

  const handleSourceSelect = (source) => {
    setSelectedSource(source);
    setSourceSearch("");
    setIsSourceDropdownVisible(false);
    // Reset target if current target is not available for new source
    if (currencyMapping[source] && !currencyMapping[source].targets[selectedTarget]) {
      setSelectedTarget(Object.keys(currencyMapping[source].targets)[0]);
    }
  };

  const handleTargetSelect = (target) => {
    setSelectedTarget(target);
    setTargetSearch("");
    setIsTargetDropdownVisible(false);
  };

  const normalize = (str) =>
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filteredSources = allSources.filter(s => 
    normalize(s).includes(normalize(sourceSearch))
  );

  const filteredTargets = availableTargets.filter(t => 
    normalize(t).includes(normalize(targetSearch))
  );

  return (
    <div className="flex flex-col gap-6">
      <APICoins handleCoinsData={handleCoinsData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* From Selection */}
        <div className="relative">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 ml-1">
            From
          </label>
          <div className="relative">
            <input
              className="w-full px-4 py-3 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
              value={isSourceDropdownVisible ? sourceSearch : selectedSource}
              onChange={(e) => setSourceSearch(e.target.value)}
              onClick={() => {
                setIsSourceDropdownVisible(true);
                setIsTargetDropdownVisible(false);
                setSourceSearch("");
              }}
              placeholder="Search source currency..."
              autoComplete="off"
            />
          </div>
          {isSourceDropdownVisible && (
            <div className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-xl shadow-xl z-[60] animate-in fade-in slide-in-from-top-1 duration-200">
              <ul>
                {filteredSources.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => handleSourceSelect(s)}
                    className="px-4 py-2.5 text-sm hover:bg-blue-50 dark:hover:bg-blue-500/10 cursor-pointer transition-colors border-l-2 border-transparent hover:border-blue-500"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* To Selection */}
        <div className="relative">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 ml-1">
            To
          </label>
          <div className="relative">
            <input
              className="w-full px-4 py-3 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
              value={isTargetDropdownVisible ? targetSearch : selectedTarget}
              onChange={(e) => setTargetSearch(e.target.value)}
              onClick={() => {
                setIsTargetDropdownVisible(true);
                setIsSourceDropdownVisible(false);
                setTargetSearch("");
              }}
              placeholder="Search target currency..."
              autoComplete="off"
            />
          </div>
          {isTargetDropdownVisible && (
            <div className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-xl shadow-xl z-[60] animate-in fade-in slide-in-from-top-1 duration-200">
              <ul>
                {filteredTargets.map((t, i) => (
                  <li
                    key={i}
                    onClick={() => handleTargetSelect(t)}
                    className="px-4 py-2.5 text-sm hover:bg-blue-50 dark:hover:bg-blue-500/10 cursor-pointer transition-colors border-l-2 border-transparent hover:border-blue-500"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop for closing dropdowns */}
      {(isSourceDropdownVisible || isTargetDropdownVisible) && (
        <div 
          className="fixed inset-0 z-50 cursor-default" 
          onClick={() => {
            setIsSourceDropdownVisible(false);
            setIsTargetDropdownVisible(false);
            setSourceSearch("");
            setTargetSearch("");
          }}
        />
      )}
      
      <APIConverter selectedCoinCode={selectedCoinCode} />
    </div>
  );
}
