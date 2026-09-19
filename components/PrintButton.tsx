
'use client';

export function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100"
    >
      Print
    </button>
  );
}