import {
  ClipboardList, Users, Gamepad, IndianRupee, School,
  User, UserCheck, CheckCircle, XCircle, Clock, Calendar
} from 'lucide-react';

export default function Dashboard() {
  // Dummy Data
  const stats = [
    { title: 'Total Registration', value: '800', icon: <ClipboardList className="w-6 h-6" /> },
    { title: 'Player Registered', value: '1200', icon: <Users className="w-6 h-6" /> },
    { title: 'Registrations Approved', value: '700', icon: <CheckCircle className="w-6 h-6" /> },
    { title: 'Registrations Rejected', value: '50', icon: <XCircle className="w-6 h-6" /> },
    { title: 'Registrations Pending', value: '50', icon: <Clock className="w-6 h-6" /> },
    { title: 'Male Registrations', value: '500', icon: <User className="w-6 h-6" /> },
    { title: 'Female Registrations', value: '300', icon: <UserCheck className="w-6 h-6" /> },
    { title: 'Colleges Participated ', value: '42', icon: <School className="w-6 h-6" /> },
    { title: 'Active Events', value: '15', icon: <Gamepad className="w-6 h-6" /> },
    { title: 'Total Payments', value: '₹ 75,000', icon: <IndianRupee className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-full text-blue-500">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-sm text-gray-500">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}