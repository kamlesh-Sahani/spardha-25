

export default function Dashboard() {
  // Dummy Data
  const stats = [
    { title: 'Total Registrations', value: '800', icon: '📝', color: 'text-blue-500' },
    { title: 'Total Games', value: '15', icon: '🎮', color: 'text-green-500' },
    { title: 'Total Players', value: '1200', icon: '👥', color: 'text-purple-500' },
    { title: 'Total Payments', value: '₹ 75,000', icon: '💰', color: 'text-yellow-500' },
    { title: 'Total Colleges', icon: '🎓',value:"42", color: 'text-yellow-500' }, // Changed icon to 🎓
  ];
   

  return (
    <div className="flex">
     
      <div className="flex-1">
     
        <main className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-6 text-primary">Dashboard</h1>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center">
                <span className={`text-3xl ${stat.color} mr-4`}>{stat.icon}</span>
                <div>
                  <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>



        
        </main>
      </div>
    </div>
  );
}