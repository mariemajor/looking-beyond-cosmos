import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Sparkles, 
  Heart, 
  Gem,
  Clock,
  Scroll,
  Wand2
} from "lucide-react";
import { getPersonalizedGuidance } from "@/utils/spiritualGuidance";

interface SpiritualGuidanceCardProps {
  userData: {
    name: string;
    birthday: string;
    dreams: string;
  };
}

export const SpiritualGuidanceCard = ({ userData }: SpiritualGuidanceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate soul number from birthday for personalization
  const soulNumber = calculateSoulNumber(userData.birthday);
  const energyLevel = calculateEnergyLevel(userData.name);
  
  const getCurrentDateFormatted = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get personalized crystal and ritual based on soul number
  const personalizedGuidance = getPersonalizedGuidance(soulNumber, userData.dreams);

  return (
    <Card className="card-cosmic">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-primary floating" />
            </div>
            <div>
              <CardTitle className="text-xl">Daily Soul Guidance</CardTitle>
              <CardDescription>{getCurrentDateFormatted()}</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
            Soul Number {soulNumber}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Soul Alignment */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-2">
            <div className="text-2xl">{personalizedGuidance.crystal.emoji}</div>
            <div className="text-sm font-medium">{personalizedGuidance.crystal.name}</div>
            <div className="text-xs text-muted-foreground">Your Crystal</div>
          </div>
          
          <div className="text-center space-y-2">
            <Wand2 className="w-6 h-6 text-accent mx-auto" />
            <div className="text-sm font-medium">{energyLevel}/10</div>
            <div className="text-xs text-muted-foreground">Soul Energy</div>
          </div>
          
          <div className="text-center space-y-2">
            <Heart className="w-6 h-6 text-primary mx-auto" />
            <div className="text-sm font-medium">{personalizedGuidance.theme}</div>
            <div className="text-xs text-muted-foreground">Today's Theme</div>
          </div>
          
          <div className="text-center space-y-2">
            <Scroll className="w-6 h-6 text-accent mx-auto" />
            <div className="text-sm font-medium">Open</div>
            <div className="text-xs text-muted-foreground">Akashic State</div>
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
                Your soul's blueprint reveals a path of {userData.dreams.split(' ').slice(0, 5).join(' ')}... The Akashic Records show your {personalizedGuidance.crystal.name} crystal resonating with your energy today, supporting your journey of {personalizedGuidance.theme.toLowerCase()}. 
                <button 
                  onClick={() => setIsExpanded(true)}
                  className="text-primary hover:text-primary/80 ml-1 underline"
                >
                  expand
                </button>
              </>
            ) : (
              <>
                Your soul's blueprint reveals a beautiful path of {userData.dreams}. The Akashic Records show you came here to experience {personalizedGuidance.theme.toLowerCase()}, and today your {personalizedGuidance.crystal.name} crystal is perfectly aligned with your energy frequency. {personalizedGuidance.message} Trust in your inner wisdom and allow your soul's guidance to illuminate your next steps. You are exactly where you need to be on your sacred journey.
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
            Akashic Reading
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Gem className="w-4 h-4 mr-2" />
            Crystal Meditation
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Guidance channeled daily from your soul's blueprint and Akashic Records
        </p>
      </CardContent>
    </Card>
  );
};

// Calculate soul number from birthday (life path number)
function calculateSoulNumber(birthday: string): number {
  if (!birthday) return 1;
  const date = new Date(birthday);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  
  const dateString = month.toString() + day.toString() + year.toString();
  let sum = dateString.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  
  return sum > 9 ? Math.floor(sum / 10) + (sum % 10) : sum;
}

// Calculate energy level from name vibration
function calculateEnergyLevel(name: string): number {
  if (!name) return 7;
  const nameValue = name.toLowerCase().split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  return (nameValue % 10) + 1;
}