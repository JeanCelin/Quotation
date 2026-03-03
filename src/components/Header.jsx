export default function Header() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent">
        Currency Quotation
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        Select a pair of currencies and see the current value. You can also
        use the fields to customize the amount and see the corresponding
        values.
      </p>
    </div>
  );
}
