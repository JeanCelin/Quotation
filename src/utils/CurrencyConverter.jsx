import React, { useEffect, useState } from "react";

export default function CurrencyConverter({
  exchangeRate,
  timeStamp,
  currencyCode,
  currency1Name,
  currency1Amount,
  currency2Name,
  currency2Amount,
  setCurrency1Amount,
  setCurrency2Amount,
}) {
  const [isUpdatingCurrency1, setIsUpdatingCurrency1] = useState(false);
  const [isUpdatingCurrency2, setIsUpdatingCurrency2] = useState(false);

  const calculateCurrency1 = (amount, rate) => amount * rate;
  const calculateCurrency2 = (amount, rate) => amount / rate;

  const handleCurrency1Change = (e) => {
    setCurrency1Amount(e.target.value);
    setIsUpdatingCurrency1(true);
  };

  const handleCurrency2Change = (e) => {
    setCurrency2Amount(e.target.value);
    setIsUpdatingCurrency2(true);
  };

  useEffect(() => {
    if (isUpdatingCurrency1 && !isNaN(currency1Amount)) {
      const result = calculateCurrency1(currency1Amount, exchangeRate).toFixed(2);
      setCurrency2Amount(result);
      setIsUpdatingCurrency1(false);
    }
  }, [currency1Amount, exchangeRate, isUpdatingCurrency1]);

  useEffect(() => {
    if (isUpdatingCurrency2 && !isNaN(currency2Amount)) {
      const result = calculateCurrency2(currency2Amount, exchangeRate).toFixed(2);
      setCurrency1Amount(result);
      setIsUpdatingCurrency2(false);
    }
  }, [currency2Amount, exchangeRate, isUpdatingCurrency2]);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150 fill-mode-both">
      {/* Price Spotlight */}
      <div className="flex flex-col items-center justify-center p-6 bg-blue-500/10 dark:bg-blue-400/5 rounded-3xl border border-blue-200/50 dark:border-blue-400/10">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-1">Current Exchange Rate</span>
        <div className="text-4xl font-black text-slate-800 dark:text-white tabular-nums">
          {exchangeRate} <span className="text-xl font-medium text-slate-400">{currencyCode}</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-wide">Last Update: {new Date(timeStamp).toLocaleDateString()} at {new Date(timeStamp).toLocaleTimeString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Currency 1 Input */}
        <div className="space-y-2 group">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-1 group-focus-within:text-blue-500 transition-colors" htmlFor="currency1">
            {currency1Name}
          </label>
          <div className="relative">
            <input
              className="w-full px-5 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-lg font-semibold tabular-nums"
              name="currency1"
              type="number"
              onChange={handleCurrency1Change}
              value={currency1Amount}
            />
          </div>
        </div>

        {/* Currency 2 Input */}
        <div className="space-y-2 group">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-1 group-focus-within:text-blue-500 transition-colors" htmlFor="currency2">
            {currency2Name}
          </label>
          <div className="relative">
            <input
              className="w-full px-5 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-lg font-semibold tabular-nums"
              name="currency2"
              type="number"
              onChange={handleCurrency2Change}
              value={currency2Amount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
