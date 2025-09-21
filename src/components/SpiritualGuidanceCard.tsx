import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Sparkles, 
  Moon, 
  Sun,
  Clock,
  Zap,
  Heart
} from "lucide-react";
import { useAstronomicalData } from "@/hooks/useAstronomicalData";

interface SpiritualGuidanceCardProps {
  userData: {
    name: string;
    birthday: string;
    dreams: string;
  };
}

export const SpiritualGuidanceCard = ({ userData }: SpiritualGuidanceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { astronomicalData, loading, error } = useAstronomicalData();
  
  // Use real astronomical data or fallback
  const moonPhase = astronomicalData?.moonPhase || { name: "Loading...", emoji: "🌙", illumination: 0 };
  const venus = astronomicalData?.planetaryPositions?.venus || { sign: "Loading...", degrees: 0, minutes: 0 };
  
  // Calculate manifestation power based on moon phase and planetary positions
  const manifestationPower = astronomicalData ? 
    Math.round((moonPhase.illumination / 100) * 10) + Math.floor(Math.random() * 3) :
    7;
  
  const getCurrentDateFormatted = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <Card className="card-cosmic">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Calculating cosmic alignments...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-cosmic">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-primary floating" />
            </div>
            <div>
              <CardTitle className="text-xl">Daily Cosmic Guidance</CardTitle>
              <CardDescription>{getCurrentDateFormatted()}</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
            Live 2025 Energy
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Cosmic Alignment */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-2">
            <div className="text-2xl">{moonPhase.emoji}</div>
            <div className="text-sm font-medium">{moonPhase.name}</div>
            <div className="text-xs text-muted-foreground">Moon Phase</div>
          </div>
          
          <div className="text-center space-y-2">
            <Zap className="w-6 h-6 text-accent mx-auto" />
            <div className="text-sm font-medium">{manifestationPower}/10</div>
            <div className="text-xs text-muted-foreground">Manifestation</div>
          </div>
          
          <div className="text-center space-y-2">
            <Sun className="w-6 h-6 text-primary mx-auto" />
            <div className="text-sm font-medium">Venus in {venus.sign}</div>
            <div className="text-xs text-muted-foreground">{venus.degrees}° {venus.minutes}'</div>
          </div>
          
          <div className="text-center space-y-2">
            <Heart className="w-6 h-6 text-accent mx-auto" />
            <div className="text-sm font-medium">Awakening</div>
            <div className="text-xs text-muted-foreground">Soul Phase</div>
          </div>
        </div>

        {/* Daily Message Preview */}
        <div className="bg-gradient-cosmic p-4 rounded-lg border border-primary/20">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Personal Message for {userData.name}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {!isExpanded ? (
              <>
                The cosmic energies of September 2025 are calling you to embrace your divine purpose. Your soul's mission of {userData.dreams.split(' ').slice(0, 5).join(' ')}... 
                <button 
                  onClick={() => setIsExpanded(true)}
                  className="text-primary hover:text-primary/80 ml-1 underline"
                >
                  expand
                </button>
              </>
            ) : (
              <>
                The cosmic energies of September 2025 are calling you to embrace your divine purpose. Your soul's mission of {userData.dreams} is aligned with the current {moonPhase.name} energy, amplifying your manifestation abilities. The universe is supporting your journey through Venus in {venus.sign}, bringing {getVenusSignEnergy(venus.sign)} into your awareness. Trust in your inner wisdom and allow the current cosmic frequencies to guide your next steps on your spiritual path.
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="text-primary hover:text-primary/80 ml-1 underline"
                >
                  collapse
                </button>
              </>
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button size="sm" className="btn-cosmic flex-1">
            <Clock className="w-4 h-4 mr-2" />
            Get Full Reading
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Moon className="w-4 h-4 mr-2" />
            Moon Ritual
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Guidance updated daily with real 2025 cosmic alignments
        </p>
      </CardContent>
    </Card>
  );
};

// Helper function to get Venus sign energy description
function getVenusSignEnergy(sign: string): string {
  const energies: Record<string, string> = {
    "Aries": "dynamic passion and new beginnings",
    "Taurus": "grounded love and material abundance", 
    "Gemini": "communication and mental connections",
    "Cancer": "nurturing emotions and family bonds",
    "Leo": "creative self-expression and heart-centered love",
    "Virgo": "healing precision and sacred service",
    "Libra": "divine love and sacred partnerships",
    "Scorpio": "transformative depth and soul connections",
    "Sagittarius": "philosophical love and spiritual expansion",
    "Capricorn": "committed partnerships and practical love",
    "Aquarius": "unconventional love and humanitarian connection",
    "Pisces": "compassionate love and spiritual unity"
  };
  return energies[sign] || "divine cosmic energy";
}