const MetricCard = ({ label, value, unit = "", format = "number" }) => {
  const formatValue = (val) => {
    if(val === null || val === undefined || val === '') return 'N/A';
    const numVal = Number(val);
    if(isNaN(numVal)) return val?.toString() || 'N/A';
    
    if(format === "scientific") return numVal.toExponential(2);
    if(format === "decimal") return numVal.toFixed(4);
    return numVal.toString();
};

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</div>
      <div className="text-lg font-semibold text-gray-900">{formatValue(value)}{unit}</div>
    </div>
  );
};
export default MetricCard