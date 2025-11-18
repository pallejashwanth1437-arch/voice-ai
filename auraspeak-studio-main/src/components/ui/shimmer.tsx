import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerProps {
  className?: string;
  children?: React.ReactNode;
}

export const Shimmer = ({ className, children }: ShimmerProps) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden bg-muted/50 rounded-lg",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {children}
    </motion.div>
  );
};

export const HistoryItemSkeleton = () => {
  return (
    <div className="glass rounded-2xl p-6 space-y-3">
      <div className="flex items-start gap-4">
        <Shimmer className="w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Shimmer className="h-5 w-3/4" />
          <Shimmer className="h-4 w-1/2" />
          <Shimmer className="h-10 w-full rounded-lg" />
        </div>
        <Shimmer className="w-10 h-10 rounded-lg" />
      </div>
    </div>
  );
};