import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Sparkles, Infinity, CreditCard, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionPlansProps {
  currentPlan?: {
    subscribed: boolean;
    product_id?: string;
    subscription_end?: string;
  };
  onSubscriptionUpdate?: () => void;
}

const PLANS = {
  free: {
    name: "Spiritual Journey - Free",
    price: "$0",
    period: "forever",
    priceId: null,
    productId: "free",
    description: "Begin your cosmic awakening",
    features: [
      "Daily spiritual guidance",
      "Basic Akashic Records access",
      "Simple manifestation practices",
      "Community support",
      "3 AI conversations per day"
    ],
    limitations: [
      "Limited AI interactions",
      "Basic content only",
      "No premium rituals"
    ]
  },
  premium: {
    name: "Looking Beyond",
    price: "$9.99",
    period: "month",
    priceId: "price_1S714F9C3SDwSAb1TuZmvccz",
    productId: "prod_T37Iowdno9f6bU",
    description: "Unlock your full cosmic potential",
    features: [
      "Unlimited AI spiritual guidance",
      "Complete Akashic Records access",
      "Advanced manifestation rituals",
      "Personalized starseed readings",
      "Premium crystal recommendations",
      "Moon phase manifestation guides",
      "Priority cosmic event alerts",
      "Exclusive meditation practices"
    ]
  }
};

export const SubscriptionPlans = ({ currentPlan, onSubscriptionUpdate }: SubscriptionPlansProps) => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCheckout = async (priceId: string) => {
    if (!priceId) return;
    
    setLoading(priceId);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Error",
        description: "Unable to start checkout process. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    setLoading('manage');
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Portal error:', error);
      toast({
        title: "Portal Error",
        description: "Unable to open customer portal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  const isCurrentPlan = (productId: string) => {
    if (productId === 'free') {
      return !currentPlan?.subscribed;
    }
    return currentPlan?.subscribed && currentPlan.product_id === productId;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-playfair font-bold mb-4">
          Choose Your <span className="text-shimmer">Cosmic Path</span>
        </h2>
        <p className="text-xl text-muted-foreground">
          Unlock deeper spiritual wisdom and unlimited guidance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <Card className={`card-cosmic relative ${isCurrentPlan('free') ? 'ring-2 ring-accent' : ''}`}>
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-secondary" />
            </div>
            <CardTitle className="text-2xl font-playfair">{PLANS.free.name}</CardTitle>
            <CardDescription className="text-base">{PLANS.free.description}</CardDescription>
            <div className="py-4">
              <div className="text-4xl font-bold text-shimmer">{PLANS.free.price}</div>
              <div className="text-sm text-muted-foreground">{PLANS.free.period}</div>
            </div>
            {isCurrentPlan('free') && (
              <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                Current Plan
              </Badge>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {PLANS.free.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground mb-2">Limitations:</div>
              {PLANS.free.limitations.map((limitation, index) => (
                <div key={index} className="text-xs text-muted-foreground/70 mb-1">
                  • {limitation}
                </div>
              ))}
            </div>

            {!isCurrentPlan('free') && currentPlan?.subscribed && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleManageSubscription}
                disabled={loading === 'manage'}
              >
                <Settings className="w-4 h-4 mr-2" />
                {loading === 'manage' ? 'Loading...' : 'Manage Subscription'}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Premium Plan */}
        <Card className={`card-cosmic relative ${isCurrentPlan(PLANS.premium.productId) ? 'ring-2 ring-primary' : 'border-primary/40'}`}>
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-gradient-cosmic text-primary-foreground border-0 px-4 py-1">
              <Sparkles className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
          </div>
          
          <CardHeader className="text-center pb-4 pt-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center floating">
              <Infinity className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-playfair">{PLANS.premium.name}</CardTitle>
            <CardDescription className="text-base">{PLANS.premium.description}</CardDescription>
            <div className="py-4">
              <div className="text-4xl font-bold text-shimmer">{PLANS.premium.price}</div>
              <div className="text-sm text-muted-foreground">per {PLANS.premium.period}</div>
            </div>
            {isCurrentPlan(PLANS.premium.productId) && (
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                Current Plan
              </Badge>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {PLANS.premium.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {isCurrentPlan(PLANS.premium.productId) ? (
              <div className="space-y-3">
                {currentPlan?.subscription_end && (
                  <div className="text-xs text-muted-foreground text-center">
                    Renews on {new Date(currentPlan.subscription_end).toLocaleDateString()}
                  </div>
                )}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleManageSubscription}
                  disabled={loading === 'manage'}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {loading === 'manage' ? 'Loading...' : 'Manage Subscription'}
                </Button>
              </div>
            ) : (
              <Button 
                className="w-full btn-cosmic"
                onClick={() => handleCheckout(PLANS.premium.priceId)}
                disabled={loading === PLANS.premium.priceId}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {loading === PLANS.premium.priceId ? 'Processing...' : 'Upgrade to Premium'}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {currentPlan?.subscribed && (
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Thank you for supporting your spiritual journey! 🌟
          </p>
        </div>
      )}
    </div>
  );
};