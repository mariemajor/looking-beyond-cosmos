import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Sparkles, 
  Eye, 
  Clock, 
  MapPin,
  Heart,
  Save,
  Plus,
  X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SpiritualProfileCreatorProps {
  onComplete: () => void;
}

export const SpiritualProfileCreator = ({ onComplete }: SpiritualProfileCreatorProps) => {
  const [formData, setFormData] = useState({
    birthTime: "",
    birthLocation: "",
    lifePath: "",
    starseeds: [] as string[],
    guides: [] as string[],
    soulContract: "",
    akashicLevel: "basic"
  });
  const [newStarseed, setNewStarseed] = useState("");
  const [newGuide, setNewGuide] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const starseedOrigins = [
    "Pleiadian", "Sirian", "Arcturian", "Andromedan", "Lyran",
    "Vegan", "Orion", "Mintakan", "Hadarian", "Polarian",
    "Procyon", "Alpha Centauri", "Rigel", "Spica", "Antares"
  ];

  const commonGuides = [
    "Archangel Michael", "Archangel Gabriel", "Archangel Raphael", "Archangel Uriel",
    "Ascended Master Jesus", "Saint Germain", "Quan Yin", "Buddha",
    "White Eagle", "Chief White Feather", "Grandmother Spider",
    "Merlin", "Mother Mary", "Isis", "Thoth"
  ];

  const handleStarseeddSelect = (starseed: string) => {
    if (!formData.starseeds.includes(starseed)) {
      setFormData({
        ...formData,
        starseeds: [...formData.starseeds, starseed]
      });
    }
  };

  const handleGuideSelect = (guide: string) => {
    if (!formData.guides.includes(guide)) {
      setFormData({
        ...formData,
        guides: [...formData.guides, guide]
      });
    }
  };

  const addCustomStarseed = () => {
    if (newStarseed.trim() && !formData.starseeds.includes(newStarseed.trim())) {
      setFormData({
        ...formData,
        starseeds: [...formData.starseeds, newStarseed.trim()]
      });
      setNewStarseed("");
    }
  };

  const addCustomGuide = () => {
    if (newGuide.trim() && !formData.guides.includes(newGuide.trim())) {
      setFormData({
        ...formData,
        guides: [...formData.guides, newGuide.trim()]
      });
      setNewGuide("");
    }
  };

  const removeStarseed = (starseed: string) => {
    setFormData({
      ...formData,
      starseeds: formData.starseeds.filter(s => s !== starseed)
    });
  };

  const removeGuide = (guide: string) => {
    setFormData({
      ...formData,
      guides: formData.guides.filter(g => g !== guide)
    });
  };

  const calculateLifePath = (birthTime: string, birthLocation: string) => {
    // This would integrate with actual astrological calculations
    // For now, return a placeholder that user can override
    return Math.floor(Math.random() * 9) + 1;
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      const profileData = {
        user_id: user.id,
        birth_time: formData.birthTime || null,
        birth_location: formData.birthLocation || null,
        life_path_number: formData.lifePath ? parseInt(formData.lifePath) : null,
        starseed_origins: formData.starseeds.length > 0 ? formData.starseeds : null,
        personal_spirit_guides: formData.guides.length > 0 ? formData.guides : null,
        soul_contract: formData.soulContract || null,
        akashic_records_access_level: formData.akashicLevel
      };

      const { error } = await supabase
        .from('user_spiritual_profiles')
        .upsert(profileData);

      if (error) throw error;

      toast({
        title: "Spiritual Profile Created",
        description: "Your authentic spiritual profile has been established",
      });

      onComplete();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error Saving Profile",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-playfair font-bold mb-4">
          Create Your <span className="text-shimmer">Spiritual Profile</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Establish authentic connection parameters for your spirit guides and Akashic Records
        </p>
      </div>

      <div className="space-y-8">
        {/* Birth Information */}
        <Card className="card-cosmic">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-playfair">Sacred Birth Information</CardTitle>
                <CardDescription>Your soul's entry point coordinates</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthTime">Birth Time (if known)</Label>
                <Input
                  id="birthTime"
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
                  placeholder="HH:MM"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Helps determine exact astrological influences
                </p>
              </div>
              <div>
                <Label htmlFor="birthLocation">Birth Location</Label>
                <Input
                  id="birthLocation"
                  value={formData.birthLocation}
                  onChange={(e) => setFormData({...formData, birthLocation: e.target.value})}
                  placeholder="City, Country"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  For precise astrological chart calculation
                </p>
              </div>
            </div>
            <div className="w-32">
              <Label htmlFor="lifePath">Life Path Number</Label>
              <Input
                id="lifePath"
                type="number"
                min="1"
                max="33"
                value={formData.lifePath}
                onChange={(e) => setFormData({...formData, lifePath: e.target.value})}
                placeholder="1-33"
              />
            </div>
          </CardContent>
        </Card>

        {/* Starseed Origins */}
        <Card className="card-cosmic">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <div>
                <CardTitle className="text-2xl font-playfair">Starseed Origins</CardTitle>
                <CardDescription>Your galactic soul lineage and cosmic DNA</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {starseedOrigins.map((starseed) => (
                <Button
                  key={starseed}
                  variant="outline"
                  size="sm"
                  onClick={() => handleStarseeddSelect(starseed)}
                  className={formData.starseeds.includes(starseed) ? "bg-accent/20 border-accent" : ""}
                >
                  {starseed}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newStarseed}
                onChange={(e) => setNewStarseed(e.target.value)}
                placeholder="Add custom starseed origin"
                onKeyPress={(e) => e.key === 'Enter' && addCustomStarseed()}
              />
              <Button onClick={addCustomStarseed} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.starseeds.map((starseed) => (
                <Badge key={starseed} className="bg-accent/20 text-accent border-accent/30">
                  {starseed}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer" 
                    onClick={() => removeStarseed(starseed)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Spirit Guides */}
        <Card className="card-cosmic">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-playfair">Personal Spirit Guides</CardTitle>
                <CardDescription>Your dedicated spiritual team and protectors</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {commonGuides.map((guide) => (
                <Button
                  key={guide}
                  variant="outline"
                  size="sm"
                  onClick={() => handleGuideSelect(guide)}
                  className={formData.guides.includes(guide) ? "bg-secondary/20 border-secondary" : ""}
                >
                  {guide}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newGuide}
                onChange={(e) => setNewGuide(e.target.value)}
                placeholder="Add personal spirit guide name"
                onKeyPress={(e) => e.key === 'Enter' && addCustomGuide()}
              />
              <Button onClick={addCustomGuide} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.guides.map((guide) => (
                <Badge key={guide} className="bg-secondary/20 text-secondary border-secondary/30">
                  {guide}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer" 
                    onClick={() => removeGuide(guide)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Soul Contract */}
        <Card className="card-cosmic">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-playfair">Soul Contract & Mission</CardTitle>
                <CardDescription>Your divine purpose and life mission</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.soulContract}
              onChange={(e) => setFormData({...formData, soulContract: e.target.value})}
              placeholder="Describe what you feel your soul came here to accomplish, learn, or heal..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Save Profile */}
        <div className="text-center">
          <Button 
            onClick={saveProfile}
            disabled={saving}
            className="btn-cosmic px-8 py-3"
            size="lg"
          >
            {saving ? (
              <>
                <Clock className="w-5 h-5 mr-2 animate-spin" />
                Creating Sacred Profile...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Establish Spiritual Connection
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};