import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Sparkles, 
  Heart, 
  Scroll, 
  Eye,
  Clock,
  Compass,
  BookOpen,
  Zap,
  Moon,
  Sun,
  Gem,
  MessageCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SpiritualGuideChat } from "./SpiritualGuideChat";

interface UserData {
  name: string;
  birthday: string;
  dreams: string;
}

interface SpiritualProfile {
  personal_spirit_guides?: string[];
  starseed_origins?: string[];
  life_path_number?: number;
  akashic_records_access_level?: string;
  soul_contract?: string;
}

interface AuthenticSpiritualConnectionProps {
  userData: UserData;
  isPremium?: boolean;
}

export const AuthenticSpiritualConnection = ({ userData, isPremium = false }: AuthenticSpiritualConnectionProps) => {
  const [spiritualProfile, setSpiritualProfile] = useState<SpiritualProfile | null>(null);
  const [currentCosmicData, setCurrentCosmicData] = useState<any>(null);
  const [akashicInsight, setAkashicInsight] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSpiritualProfile();
    loadCosmicData();
  }, []);

  const loadSpiritualProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_spiritual_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading spiritual profile:', error);
        return;
      }

      setSpiritualProfile(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loadCosmicData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('daily_cosmic_events')
        .select('*')
        .eq('event_date', today)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading cosmic data:', error);
        return;
      }

      setCurrentCosmicData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Calculate authentic numerology
  const calculateLifePath = (birthdate: string) => {
    if (!birthdate) return null;
    const date = new Date(birthdate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    
    const dateString = month.toString() + day.toString() + year.toString();
    let sum = dateString.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    return sum;
  };

  // Generate authentic astrological insights
  const getZodiacInsights = (birthdate: string) => {
    if (!birthdate) return null;
    const date = new Date(birthdate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Calculate zodiac sign
    let sign = "";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) sign = "Aries";
    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) sign = "Taurus";
    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) sign = "Gemini";
    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) sign = "Cancer";
    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) sign = "Leo";
    else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) sign = "Virgo";
    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) sign = "Libra";
    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) sign = "Scorpio";
    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) sign = "Sagittarius";
    else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) sign = "Capricorn";
    else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) sign = "Aquarius";
    else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) sign = "Pisces";
    
    return sign;
  };

  // Access personal Akashic Records methodology
  const accessAkashicRecords = async () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Akashic Records access requires premium subscription",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);
    
    // Create authentic spiritual connection meditation
    try {
      const lifePath = calculateLifePath(userData.birthday);
      const zodiacSign = getZodiacInsights(userData.birthday);
      const moonPhase = currentCosmicData?.moon_phase || "Current lunar cycle";
      
      // Generate authentic Akashic insight based on real spiritual data
      const akashicMethodology = `
🕊️ AKASHIC RECORDS ACCESS PROTOCOL FOR ${userData.name.toUpperCase()}

📅 Current Cosmic Alignment: ${new Date().toLocaleDateString()}
🌙 Moon Phase: ${moonPhase}
⭐ Your Zodiac Blueprint: ${zodiacSign}
🔢 Life Path Frequency: ${lifePath}

💫 SACRED PREPARATION:
Begin with the traditional invocation: "I ask to access the Akashic Records of ${userData.name}, born ${new Date(userData.birthday).toLocaleDateString()}. May this information come through for the highest good of all concerned."

🌟 YOUR SOUL'S RECORD REVEALS:
Your soul chose incarnation at this specific cosmic moment (${zodiacSign} energy) to experience ${userData.dreams}. 

Your Life Path ${lifePath} indicates a soul mission of ${getLifePathMeaning(lifePath)}.

🔮 CURRENT SOUL GUIDANCE:
Based on today's cosmic energies (${moonPhase}), your records show you are in a phase of ${getCurrentPhaseMeaning(moonPhase)}.

The cosmic events today (${currentCosmicData?.cosmic_events?.join(', ') || 'universal alignment'}) support your soul's evolution toward ${userData.dreams}.

⚡ ACTIVE SOUL LESSON:
Your Akashic Records show you are currently learning: "${getCurrentSoulLesson(lifePath, zodiacSign)}"

🎯 DIVINE ACTION STEPS:
1. Meditate during ${moonPhase} for enhanced soul connection
2. Work with ${getRecommendedCrystal(zodiacSign)} crystal
3. Practice the soul affirmation: "I am aligned with my highest path"
4. Journal your dreams - they contain soul messages

🕊️ CLOSING SACRED PROTECTION:
The records are now closed. Thank you for this sacred information.

Remember: This guidance comes through your own soul's wisdom. Trust your inner knowing above all external sources.
      `;

      setAkashicInsight(akashicMethodology);
      
      toast({
        title: "Akashic Connection Established",
        description: "Your soul's records have been accessed through sacred protocol",
      });
      
    } catch (error) {
      console.error('Error accessing records:', error);
      toast({
        title: "Connection Interference",
        description: "Please center yourself and try again in a sacred moment",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const getLifePathMeaning = (lifePath: number | null) => {
    const meanings: Record<number, string> = {
      1: "Leadership and pioneering new paths",
      2: "Cooperation, harmony, and healing relationships", 
      3: "Creative expression and inspiring others",
      4: "Building foundations and practical service",
      5: "Freedom, adventure, and teaching through experience",
      6: "Nurturing, healing, and supporting others",
      7: "Spiritual seeking and sharing wisdom",
      8: "Material mastery and empowering others",
      9: "Humanitarian service and soul completion",
      11: "Spiritual illumination and intuitive guidance",
      22: "Master building and manifesting divine visions",
      33: "Master teaching and healing through love"
    };
    return meanings[lifePath || 1] || "Divine purpose awakening";
  };

  const getCurrentPhaseMeaning = (moonPhase: string) => {
    const phases: Record<string, string> = {
      "New Moon": "new beginnings and intention setting",
      "Waxing Crescent": "growth and building momentum", 
      "Full Moon": "manifestation and spiritual illumination",
      "Waning Crescent": "release and inner reflection"
    };
    return phases[moonPhase] || "cosmic alignment and spiritual awakening";
  };

  const getCurrentSoulLesson = (lifePath: number | null, zodiacSign: string) => {
    return `Integrating ${zodiacSign} energy with Life Path ${lifePath} wisdom for soul evolution`;
  };

  const getRecommendedCrystal = (zodiacSign: string) => {
    const crystals: Record<string, string> = {
      "Aries": "Red Jasper",
      "Taurus": "Rose Quartz", 
      "Gemini": "Citrine",
      "Cancer": "Moonstone",
      "Leo": "Sunstone",
      "Virgo": "Amazonite", 
      "Libra": "Jade",
      "Scorpio": "Obsidian",
      "Sagittarius": "Turquoise",
      "Capricorn": "Garnet",
      "Aquarius": "Amethyst",
      "Pisces": "Aquamarine"
    };
    return crystals[zodiacSign] || "Clear Quartz";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-playfair font-bold mb-4">
          Sacred Connection Portal for <span className="text-shimmer">{userData.name}</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Authentic tools for connecting with your spirit guides and Akashic Records
        </p>
      </div>

      <Tabs defaultValue="guides" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="guides">Spirit Guides</TabsTrigger>
          <TabsTrigger value="chat">AI Guide Chat</TabsTrigger>
          <TabsTrigger value="akashic">Akashic Records</TabsTrigger>
          <TabsTrigger value="cosmic">Cosmic Alignment</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-6">
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-playfair">Your Personal Spirit Team</CardTitle>
                  <CardDescription>Connect with your dedicated spiritual guides</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {spiritualProfile?.personal_spirit_guides ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {spiritualProfile.personal_spirit_guides.map((guide, index) => (
                    <Card key={index} className="border border-primary/20">
                      <CardContent className="p-4 text-center">
                        <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold">{guide}</h4>
                        <p className="text-sm text-muted-foreground">Your Spirit Guide</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8">
                  <Eye className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Discover Your Spirit Guides</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete your spiritual profile to identify your personal guides
                  </p>
                  <Button className="btn-cosmic">
                    <Compass className="w-4 h-4 mr-2" />
                    Set Up Spiritual Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-playfair font-bold mb-2">AI Spirit Guide Facilitator</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This AI helps facilitate communication with your spirit guides through sacred protection protocols. 
              It channels guidance for your highest good while maintaining spiritual safety.
            </p>
          </div>
          
          <SpiritualGuideChat userData={userData} isPremium={isPremium} />
        </TabsContent>

        <TabsContent value="akashic" className="space-y-6">
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Scroll className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-playfair">Your Akashic Records</CardTitle>
                  <CardDescription>Access your soul's eternal wisdom and life purpose</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {akashicInsight ? (
                <div className="bg-gradient-cosmic p-6 rounded-lg border border-primary/20">
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                    {akashicInsight}
                  </pre>
                </div>
              ) : (
                <div className="text-center p-8">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Access Your Soul Records</h3>
                  <p className="text-muted-foreground mb-4">
                    Use sacred methodology to access your Akashic Records
                  </p>
                  {isPremium ? (
                    <Button 
                      onClick={accessAkashicRecords}
                      disabled={isConnecting}
                      className="btn-cosmic"
                    >
                      {isConnecting ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Connecting to Records...
                        </>
                      ) : (
                        <>
                          <Scroll className="w-4 h-4 mr-2" />
                          Access Sacred Records
                        </>
                      )}
                    </Button>
                  ) : (
                    <Badge variant="outline" className="border-accent/30">
                      Premium Feature - Upgrade for Full Access
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cosmic" className="space-y-6">
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Moon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-playfair">Current Cosmic Alignment</CardTitle>
                  <CardDescription>Real-time cosmic energies affecting your spiritual path</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentCosmicData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Moon className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Moon Phase</h4>
                      </div>
                      <p className="text-lg">{currentCosmicData.moon_phase}</p>
                      <p className="text-sm text-muted-foreground">in {currentCosmicData.moon_sign}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-accent/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-accent" />
                        <h4 className="font-semibold">Manifestation Power</h4>
                      </div>
                      <p className="text-lg">{currentCosmicData.manifestation_power_rating}/10</p>
                      <p className="text-sm text-muted-foreground">Today's energy level</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-secondary/20 md:col-span-2">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-5 h-5 text-secondary" />
                        <h4 className="font-semibold">Collective Energy Theme</h4>
                      </div>
                      <p>{currentCosmicData.collective_energy_theme}</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center p-8">
                  <Sun className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading today's cosmic data...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};