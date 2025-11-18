import { motion } from "framer-motion";
import { Mic, Zap, Clock, Sparkles, ArrowRight, Volume2, Database, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Volume2 className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold gradient-text">VoiceAI</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-4"
        >
          <Button 
            variant="ghost" 
            className="hover:bg-secondary"
            onClick={() => window.location.href = '/login'}
          >
            Login
          </Button>
          <Button 
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            onClick={() => window.location.href = '/signup'}
          >
            Get Started
          </Button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-12 h-12 text-accent mx-auto" />
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Transform Text</span>
            <br />
            <span className="text-foreground">Into Natural Speech</span>
          </h1>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Experience cutting-edge AI voice generation with lifelike quality.
            Perfect for content creators, developers, and innovators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="text-lg px-12 py-7 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover:scale-105 animate-pulse-glow group"
              onClick={() => window.location.href = '/signup'}
            >
              Start Creating
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating cards preview */}
        <motion.div
          className="mt-20 relative h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute glass rounded-2xl p-6 w-64"
              style={{
                left: `${30 + i * 20}%`,
                top: `${i * 20}px`,
              }}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent" />
                <div className="h-4 bg-secondary rounded w-20" />
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-secondary rounded w-full" />
                <div className="h-2 bg-secondary rounded w-3/4" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-xl text-muted-foreground">Everything you need to create amazing voice content</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Mic,
              title: "Natural Voices",
              description: "Choose from multiple lifelike AI voices with emotional depth and clarity",
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Generate high-quality audio in seconds with our optimized processing",
            },
            {
              icon: Clock,
              title: "Access History",
              description: "Keep track of all your generations with unlimited cloud storage",
            },
            {
              icon: Database,
              title: "Batch Processing",
              description: "Convert multiple texts at once to save time and boost productivity",
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description: "Your data is encrypted and protected with enterprise-grade security",
            },
            {
              icon: Sparkles,
              title: "Premium Quality",
              description: "Export in multiple formats with studio-grade audio quality",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-8 hover-glow transition-all cursor-pointer"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground">Simple, fast, and powerful</p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary transform -translate-y-1/2" />
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {[
              { step: "01", title: "Enter Your Text", desc: "Type or paste the content you want to convert" },
              { step: "02", title: "Choose Voice", desc: "Select from our library of natural AI voices" },
              { step: "03", title: "Generate & Download", desc: "Get your audio file in seconds" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="glass rounded-2xl p-8 text-center hover-lift">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
          <div className="relative z-10">
            <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of creators using VoiceAI to bring their content to life
            </p>
            <Button
              size="lg"
              className="text-lg px-12 py-7 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover:scale-105"
              onClick={() => window.location.href = '/signup'}
            >
              Create Free Account
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-12 mt-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 text-center text-muted-foreground"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Volume2 className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold gradient-text">VoiceAI</span>
          </div>
          <p>© 2024 VoiceAI. Transform your words into voice.</p>
        </motion.div>
      </footer>
    </div>
  );
};

export default Landing;
