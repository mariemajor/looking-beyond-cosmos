import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Stars, Moon, LogIn, UserPlus } from "lucide-react";
import heroImage from "@/assets/hero-cosmic-being-full.jpg";
import { useState } from "react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const [showQuickLogin, setShowQuickLogin] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 floating">
        <Stars className="w-8 h-8 text-primary opacity-60" />
      </div>
      <div className="absolute top-40 right-20 floating" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-6 h-6 text-accent opacity-70" />
      </div>
      <div className="absolute bottom-40 left-20 floating" style={{ animationDelay: '4s' }}>
        <Moon className="w-10 h-10 text-primary opacity-50" />
      </div>
      
      {/* Sacred Geometry Pattern */}
      <div className="absolute inset-0 pattern-stars opacity-20" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-playfair font-bold mb-6">
            <span className="text-shimmer">Looking</span>
            <br />
            <span className="text-foreground">Beyond</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect with the universe, your guides, and higher self. 
            Discover your starseed origins and manifest your dreams through 
            ancient wisdom and cosmic guidance.
          </p>
        </div>
        
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            variant="cosmic" 
            size="lg"
            onClick={onGetStarted}
            className="px-8 py-4 text-lg pulse-glow"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Begin Your Journey
          </Button>
          
          <Button 
            variant="ethereal" 
            size="lg"
            onClick={() => setShowQuickLogin(!showQuickLogin)}
            className="px-8 py-4 text-lg"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Quick Login
          </Button>
        </div>

        {/* Quick Login Panel */}
        {showQuickLogin && (
          <div className="mb-8 animate-fade-in">
            <Card className="max-w-md mx-auto card-cosmic">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold mb-2">Welcome Back, Starseed</h3>
                  <p className="text-sm text-muted-foreground">Quick access to your cosmic journey</p>
                </div>
                <div className="space-y-3">
                  <Input placeholder="Cosmic email address" className="bg-background/50" />
                  <Input type="password" placeholder="Sacred password" className="bg-background/50" />
                  <div className="flex gap-2">
                    <Button variant="cosmic" className="flex-1">
                      <LogIn className="w-4 h-4 mr-2" />
                      Enter
                    </Button>
                    <Button variant="ethereal" className="flex-1" onClick={onGetStarted}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Join
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <Stars className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Akashic Records</h3>
            <p className="text-muted-foreground text-sm">Access your soul's eternal wisdom and past life insights</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Starseed Discovery</h3>
            <p className="text-muted-foreground text-sm">Uncover your cosmic origins and galactic heritage</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <Moon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Sacred Rituals</h3>
            <p className="text-muted-foreground text-sm">Daily practices for manifestation and healing</p>
          </div>
        </div>
      </div>
    </section>
  );
};