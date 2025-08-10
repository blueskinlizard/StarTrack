const InfoCard = ({ title, value, subtitle, icon: Icon, color = "blue" }) => (
  <div className={`bg-gradient-to-br from-${color}-50 to-${color}-100 border border-${color}-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className={`text-2xl font-bold text-${color}-800 mb-1`}>{value}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
      {Icon && <Icon className={`w-8 h-8 text-${color}-500 opacity-70`} />}
    </div>
  </div>
);
export default InfoCard