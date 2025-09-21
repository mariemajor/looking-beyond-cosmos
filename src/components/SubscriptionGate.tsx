import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Star, Sparkles } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";

interface SubscriptionGateProps {
  children: ReactNode;
  feature: string;
  description?: string;
  showUpgrade?: () => void;
}

export const SubscriptionGate = ({ 
  children, 
  feature, 
  description,
  showUpgrade 
}: SubscriptionGateProps) => {
  const { subscribed, loading } = useSubscription();

  if (loading) {
    return (
      <Card className="card-cosmic">
        <CardContent className="p-8 text-center">
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-muted rounded-full mx-auto mb-4" />
            <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-2" />
            <div className="h-3 bg-muted rounded w-1/3 mx-auto" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (subscribed) {
    return <>{children}</>;
  }

  return (
    <Card className="card-cosmic border-accent/30">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
          <Lock className="w-8 h-8 text-accent" />
        </div>
        <CardTitle className="text-xl font-playfair flex items-center justify-center gap-2">
          <Star className="w-5 h-5 text-accent" />
          Premium Feature
          <Star className="w-5 h-5 text-accent" />
        </CardTitle>
        <CardDescription className="text-base">
          {description || (
            <span>
              Unlock {feature} with{" "}
              <span className="text-primary">Looking</span>{" "}
              <span className="text-accent">Beyond</span> premium
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="text-center space-y-4">
        <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
          <p className="text-sm text-muted-foreground">
            This {feature.toLowerCase()} is available exclusively for premium members.
            Upgrade to unlock unlimited spiritual guidance and cosmic insights.
          </p>
        </div>
        
        <Button 
          className="w-full btn-cosmic"
          onClick={showUpgrade}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Upgrade to Premium
        </Button>
        
        <p className="text-xs text-muted-foreground">
          Join thousands on their cosmic awakening journey
        </p>
      </CardContent>
    </Card>
  );
};