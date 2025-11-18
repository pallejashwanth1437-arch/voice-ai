import { motion } from "framer-motion";
import { Mic, Clock, TrendingUp, Zap } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {
  const stats = [
    {
      icon: Mic,
      label: "Total Conversions",
      value: "24",
      change: "+12%",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Clock,
      label: "This Month",
      value: "8",
      change: "+25%",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      label: "Avg. Duration",
      value: "45s",
      change: "+8%",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      label: "Processing Speed",
      value: "2.3s",
      change: "-15%",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            Welcome back! <span className="gradient-text">Ready to create?</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's an overview of your voice generation activity
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-6 hover-glow transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Mic className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Text to Speech Conversion #{item}</p>
                  <p className="text-sm text-muted-foreground">
                    Generated {item * 2} hours ago
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">2.{item}s</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-8 bg-gradient-to-r from-primary/10 to-accent/10"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to create something amazing?</h2>
          <p className="text-muted-foreground mb-6">
            Transform your text into natural, lifelike speech in seconds
          </p>
          <motion.button
            onClick={() => window.location.href = '/convert'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-primary to-accent rounded-xl font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            Start Converting
          </motion.button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
