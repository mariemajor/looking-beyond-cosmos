import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Clock, 
  MapPin,
  Sparkles,
  BookOpen,
  Heart
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SpiritualProfileSetupProps {
  onComplete: () => void;
  onSkip: () => void;
}

const starseeds = [
  "Pleiadian", "Sirian", "Arcturian", "Andromedan", "Lyran", 
  "Vegan", "Orion", "Avian", "Feline", "Dragon", "Crystal", "Rainbow"
];

const spiritualPaths = [
  "Christianity", "Buddhism", "Hinduism", "Islam", "Judaism", "Wiccan", 
  "New Age", "Shamanism", "Taoism", "Paganism", "Agnostic", "Eclectic"
];

export const SpiritualProfileSetup = ({ onComplete, onSkip }: SpiritualProfileSetupProps) => {
  const [birthTime, setBirthTime] = useState("");
  const [birthLocation, setBirthLocation] = useState("");
  const [selectedStarseeds, setSelectedStarseeds] = useState<string[]>([]);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [soulContract, setSoulContract] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStarseedToggle = (starseed: string) => {
    setSelectedStarseeds(prev => 
      prev.includes(starseed) 
        ? prev.filter(s => s !== starseed)
        : [...prev, starseed]
    );
  };

  const handlePathToggle = (path: string) => {
    setSelectedPaths(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const calculateLifePath = (birthDate: string) => {
    if (!birthDate) return null;
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    
    const dateDigits = month.toString() + day.toString() + year.toString();
    let sum = dateDigits.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    return sum;
  };

  const saveProfile = async () => {
    setIsLoading(true);
    
    try {
      // Get user's birth date from profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('birth_date')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      const lifePath = profile?.birth_date ? calculateLifePath(profile.birth_date) : null;

      const { error } = await supabase
        .from('user_spiritual_profiles')
        .upsert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          birth_time: birthTime || null,
          birth_location: birthLocation || null,
          starseed_origins: selectedStarseeds,
          soul_contract: soulContract || null,
          life_path_number: lifePath,
          akashic_records_access_level: 'enhanced'
        });

      if (error) throw error;

      // Also update the main profile with spiritual paths
      await supabase
        .from('profiles')
        .update({
          spiritual_path: selectedPaths,
          experience_level: 'intermediate'
        })
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      toast({
        title: "Sacred Profile Created",
        description: "Your cosmic blueprint has been saved and your guidance will be deeply personalized",
      });

      onComplete();
    } catch (error) {
      console.error('Error saving spiritual profile:', error);
      toast({
        title: "Sacred Channel Temporarily Closed",
        description: "Please try again in a sacred moment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="card-cosmic">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center floating">
            <Star className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-playfair">Complete Your Cosmic Blueprint</CardTitle>
          <CardDescription className="text-lg">
            Help us create your personalized spiritual guidance system with accurate 2025 astrology
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Birth Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <Label className="text-lg font-semibold">Birth Time & Location</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              For accurate astrological houses and personalized cosmic timing
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthTime">Birth Time (Optional)</Label>
                <Input
                  id="birthTime"
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  placeholder="12:00"
                />
              </div>
              <div>
                <Label htmlFor="birthLocation">Birth Location (Optional)</Label>
                <Input
                  id="birthLocation"
                  value={birthLocation}
                  onChange={(e) => setBirthLocation(e.target.value)}
                  placeholder="City, State/Country"
                />
              </div>
            </div>
          </div>

          {/* Starseed Origins */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <Label className="text-lg font-semibold">Starseed Origins</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              What galactic families resonate with your soul? (Select all that feel true)
            </p>
            <div className="flex flex-wrap gap-2">
              {starseeds.map((starseed) => (
                <Badge
                  key={starseed}
                  variant={selectedStarseeds.includes(starseed) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedStarseeds.includes(starseed) 
                      ? "bg-accent text-accent-foreground" 
                      : "hover:bg-accent/20"
                  }`}
                  onClick={() => handleStarseedToggle(starseed)}
                >
                  {starseed}
                </Badge>
              ))}
            </div>
          </div>

          {/* Spiritual Paths */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <Label className="text-lg font-semibold">Spiritual Paths</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              What spiritual traditions or practices resonate with you?
            </p>
            <div className="flex flex-wrap gap-2">
              {spiritualPaths.map((path) => (
                <Badge
                  key={path}
                  variant={selectedPaths.includes(path) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedPaths.includes(path) 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-primary/20"
                  }`}
                  onClick={() => handlePathToggle(path)}
                >
                  {path}
                </Badge>
              ))}
            </div>
          </div>

          {/* Soul Contract */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-accent" />
              <Label className="text-lg font-semibold">Soul Contract (Optional)</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              What do you feel your soul came here to learn, heal, or accomplish in this lifetime?
            </p>
            <Textarea
              value={soulContract}
              onChange={(e) => setSoulContract(e.target.value)}
              placeholder="I feel called to help others heal, spread love and light, learn compassion..."
              className="min-h-[100px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              variant="outline"
              onClick={onSkip}
              className="flex-1"
            >
              Skip for Now
            </Button>
            <Button
              onClick={saveProfile}
              disabled={isLoading}
              className="btn-cosmic flex-1"
            >
              {isLoading ? "Creating Sacred Profile..." : "Complete My Cosmic Blueprint"}
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            This information helps create deeply personalized guidance based on your unique soul signature and current 2025 cosmic energies
          </p>
        </CardContent>
      </Card>
    </div>
  );
};