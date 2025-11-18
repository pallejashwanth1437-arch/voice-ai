import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Volume2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/lib/api";

const Convert = () => {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("alloy");
  const [isConverting, setIsConverting] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const voices = [
    { value: "alloy", label: "Alloy - Neutral" },
    { value: "echo", label: "Echo - Male" },
    { value: "fable", label: "Fable - British" },
    { value: "onyx", label: "Onyx - Deep" },
    { value: "nova", label: "Nova - Female" },
    { value: "shimmer", label: "Shimmer - Soft" },
  ];

  const handleConvert = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to convert.",
        variant: "destructive",
      });
      return;
    }

    if (text.length > 5000) {
      toast({
        title: "Error",
        description: "Text too long. Maximum 5000 characters allowed.",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    setAudioUrl(null);

    try {
      const response = await apiService.convertTextToSpeech(text, voice);
      const fullAudioUrl = `http://localhost:5000${response.audioUrl}`;
      setAudioUrl(fullAudioUrl);

      toast({
        title: "Success!",
        description: "Your audio has been generated.",
      });
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to convert text to speech. Make sure the server is running.",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2">
            Convert <span className="gradient-text">Text to Speech</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Transform your words into natural, lifelike voice
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8 space-y-6"
        >
          {/* Text Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Enter Your Text</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste the text you want to convert to speech..."
              className="min-h-[200px] glass-light border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none text-base"
            />
            <p className="text-sm text-muted-foreground">{text.length} characters</p>
          </div>

          {/* Voice Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Choose Voice</label>
            <Select value={voice} onValueChange={setVoice}>
              <SelectTrigger className="glass-light border-border focus:border-primary focus:ring-2 focus:ring-primary/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass border-border">
                {voices.map((v) => (
                  <SelectItem key={v.value} value={v.value}>
                    {v.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Convert Button */}
          <Button
            onClick={handleConvert}
            disabled={isConverting || !text.trim()}
            className="w-full py-6 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConverting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-background border-t-transparent rounded-full mr-2"
                />
                Converting...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Convert to Speech
              </>
            )}
          </Button>
        </motion.div>

        {/* Audio Result */}
        {audioUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Volume2 className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold">Your Audio is Ready!</h3>
            </div>
            <audio controls className="w-full" src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
            <p className="text-sm text-muted-foreground mt-4">
              Audio has been saved to your history
            </p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Convert;
