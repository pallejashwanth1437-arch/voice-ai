import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Trash2, Volume2, RefreshCw } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/lib/api";
import { HistoryItemSkeleton } from "@/components/ui/shimmer";

interface HistoryItem {
  _id: string;
  text: string;
  voice: string;
  audioUrl: string;
  createdAt: string;
}

const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await apiService.getHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
      toast({
        title: "Error",
        description: "Failed to load history. Make sure the server is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await apiService.deleteHistoryItem(id);
      setHistory(history.filter((item) => item._id !== id));
      toast({
        title: "Deleted",
        description: "Item removed from history.",
      });
    } catch (error) {
      console.error('Failed to delete item:', error);
      toast({
        title: "Error",
        description: "Failed to delete item.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Conversion <span className="gradient-text">History</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              View and manage your past text-to-speech conversions
            </p>
          </div>
          <Button
            onClick={fetchHistory}
            variant="outline"
            size="icon"
            className="glass-light"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </motion.div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <HistoryItemSkeleton />
              </motion.div>
            ))}
          </div>
        ) : history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No history yet</h3>
            <p className="text-muted-foreground mb-6">
              Start converting text to speech to build your history
            </p>
            <Button 
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              onClick={() => window.location.href = '/convert'}
            >
              Create First Conversion
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {history.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="glass rounded-2xl p-6 hover-glow transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Volume2 className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium mb-1 truncate">{item.text}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="capitalize">{item.voice} voice</span>
                        <span>•</span>
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                      <audio controls className="w-full mt-3" src={`http://localhost:5000${item.audioUrl}`}>
                        Your browser does not support the audio element.
                      </audio>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item._id)}
                      className="flex-shrink-0 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default History;
