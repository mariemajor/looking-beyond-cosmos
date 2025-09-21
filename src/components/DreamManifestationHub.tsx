import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Target, 
  Sparkles, 
  TrendingUp,
  Calendar,
  Star,
  Heart,
  Zap,
  CheckCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DreamManifestationHubProps {
  userData: {
    name: string;
    birthday: string;
    dreams: string;
  };
}

interface ManifestationGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  cosmic_alignment: string;
  created_at: string;
}

export const DreamManifestationHub = ({ userData }: DreamManifestationHubProps) => {
  const [goals, setGoals] = useState<ManifestationGoal[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    const mockGoals: ManifestationGoal[] = [
      {
        id: "1",
        title: "Spiritual Awakening",
        description: "Deepening connection with my higher self and spirit guides",
        progress: 75,
        cosmic_alignment: "Venus in Libra supports this journey",
        created_at: new Date().toISOString()
      },
      {
        id: "2", 
        title: "Creative Expression",
        description: "Channeling divine inspiration through art and creativity",
        progress: 45,
        cosmic_alignment: "Mercury direct enhances creative flow",
        created_at: new Date().toISOString()
      }
    ];
    setGoals(mockGoals);
  }, []);

  const addNewGoal = async () => {
    if (!newGoal.trim()) return;
    
    setIsLoading(true);
    try {
      const newGoalObj: ManifestationGoal = {
        id: Date.now().toString(),
        title: newGoal.split(' ').slice(0, 3).join(' '),
        description: newGoal,
        progress: 5,
        cosmic_alignment: "New moon energy supports new beginnings",
        created_at: new Date().toISOString()
      };
      
      setGoals(prev => [...prev, newGoalObj]);
      setNewGoal("");
      
      toast({
        title: "Cosmic Intention Set",
        description: "The universe has received your manifestation request",
      });
    } catch (error) {
      toast({
        title: "Energy Block Detected",
        description: "Please try again when the cosmic channels are clear",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCosmicPowerLevel = () => {
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    return ((dayOfMonth % 10) + 6); // 6-15 range
  };

  return (
    <div className="space-y-6">
      {/* Manifestation Power Level */}
      <Card className="card-cosmic">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent floating" />
              </div>
              <div>
                <CardTitle className="text-xl">Manifestation Power</CardTitle>
                <CardDescription>September 2025 Cosmic Energy</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              Level {getCosmicPowerLevel()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={getCosmicPowerLevel() * 6.67} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Star className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="text-sm font-medium">Venus Support</div>
                <div className="text-xs text-muted-foreground">Love & Harmony</div>
              </div>
              <div>
                <TrendingUp className="w-5 h-5 text-accent mx-auto mb-1" />
                <div className="text-sm font-medium">Jupiter Growth</div>
                <div className="text-xs text-muted-foreground">Expansion Energy</div>
              </div>
              <div>
                <Heart className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="text-sm font-medium">Soul Alignment</div>
                <div className="text-xs text-muted-foreground">Higher Purpose</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Manifestations */}
      <Card className="card-cosmic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Active Manifestations
          </CardTitle>
          <CardDescription>
            Your dreams aligned with cosmic timing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="p-4 bg-background/50 rounded-lg border border-primary/10 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium flex items-center gap-2">
                    {goal.title}
                    {goal.progress > 70 && <CheckCircle className="w-4 h-4 text-green-500" />}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {goal.description}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {goal.progress}%
                </Badge>
              </div>
              
              <Progress value={goal.progress} className="h-2" />
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="w-3 h-3" />
                {goal.cosmic_alignment}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add New Manifestation */}
      <Card className="card-cosmic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Set New Intention
          </CardTitle>
          <CardDescription>
            Plant a seed in the cosmic field of infinite possibilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="I intend to manifest..."
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            className="min-h-[80px]"
          />
          <Button 
            onClick={addNewGoal}
            disabled={isLoading || !newGoal.trim()}
            className="w-full btn-cosmic"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isLoading ? "Channeling..." : "Send to Universe"}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Best manifestation times: New moon, Full moon, and Venus transits
          </p>
        </CardContent>
      </Card>
    </div>
  );
};