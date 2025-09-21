import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Moon, 
  Heart, 
  Scroll, 
  Star, 
  Gem, 
  Calendar,
  Compass,
  BookOpen,
  Zap,
  Settings,
  Crown,
  Target,
  MessageCircle,
  Home,
  User
} from "lucide-react";
import { SubscriptionPlans } from "@/components/SubscriptionPlans";
import { SubscriptionGate } from "@/components/SubscriptionGate";
import { SpiritualChat } from "@/components/SpiritualChat";
import { SpiritualGuidanceCard } from "@/components/SpiritualGuidanceCard";
import { DreamManifestationHub } from "@/components/DreamManifestationHub";
import { SpiritualProfileSetup } from "@/components/SpiritualProfileSetup";
import { useSubscription } from "@/hooks/useSubscription";

interface UserData {
  name: string;
  birthday: string;
  dreams: string;
}

interface DashboardProps {
  userData: UserData;
  onEditProfile?: () => void;
}

export const Dashboard = ({ userData, onEditProfile }: DashboardProps) => {
  const [activeView, setActiveView] = useState<'home' | 'manifestation' | 'chat' | 'profile' | 'subscription'>('home');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const subscription = useSubscription();

  // Navigation items
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'manifestation', label: 'Manifestation', icon: Target },
    { id: 'chat', label: 'Spirit Guide Chat', icon: MessageCircle },
    { id: 'profile', label: 'Spiritual Profile', icon: User },
    { id: 'subscription', label: 'Subscription', icon: Crown }
  ];

  const spiritualSections = [
    {
      id: "akashic",
      title: "Akashic Records",
      description: "Access your soul's eternal wisdom",
      icon: Scroll,
      color: "primary",
      content: `Welcome ${userData.name}, your Akashic Records reveal a soul that has traveled through many dimensions. You carry the wisdom of ancient civilizations and have incarnated to help humanity's ascension. Your current life purpose involves healing others through your natural empathic abilities.`
    },
    {
      id: "blueprint", 
      title: "Soul Blueprint",
      description: "Discover your soul's sacred design",
      icon: Star,
      color: "accent",
      content: `Based on your birth essence and soul number, your blueprint shows a path of ${userData.dreams}. Your soul chose this lifetime to experience growth through love, creativity, and service. You're being called to step into your role as a lightworker and guide for others.`
    },
    {
      id: "guidance",
      title: "Daily Guidance",
      description: "Messages from your guides",
      icon: Sparkles,
      color: "primary",
      content: "Your spirit guides are communicating through powerful synchronicities today. Trust the signs, symbols, and messages appearing in your life. A period of spiritual expansion is beginning - embrace the changes with an open heart and trust the divine timing."
    },
    {
      id: "crystals",
      title: "Crystal Guidance",
      description: "Healing stone recommendations",
      icon: Gem,
      color: "accent", 
      content: "Amethyst and Rose Quartz are calling to you today. Amethyst will enhance your spiritual connection and intuition, while Rose Quartz opens your heart to self-love and manifesting your dreams. Carry them with you or place them on your altar."
    },
    {
      id: "rituals",
      title: "Sacred Rituals",
      description: "Grounding and manifestation practices",
      icon: Heart,
      color: "primary",
      content: "Tonight's grounding ritual: Light a white candle, hold your favorite crystal, and visualize roots growing from your feet into Mother Earth. Feel her loving energy flowing up through your body, creating a circuit of divine protection and grounding."
    },
    {
      id: "spells",
      title: "Happy Spells",
      description: "Positive magic and manifestation",
      icon: Calendar,
      color: "accent",
      content: "Joy Attraction Spell: Write three things that make you smile on yellow paper. Fold it with dried lavender, hold it to your heart, and speak: 'Joy flows to me and through me, I am a magnet for happiness and light.' Keep it in your pocket for 7 days."
    }
  ];

  const renderNavigationSidebar = () => (
    <div className="w-64 bg-background/80 backdrop-blur-sm border-r border-primary/20 min-h-screen p-6">
      <div className="mb-8">
        <h2 className="text-xl font-playfair font-bold mb-2">
          <span className="text-primary">Looking</span>{" "}
          <span className="text-accent">Beyond</span>
        </h2>
        <p className="text-sm text-muted-foreground">Your Spiritual Journey</p>
      </div>

      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 ${
                isActive ? 'bg-primary/20 text-primary border-primary/30' : ''
              }`}
              onClick={() => setActiveView(item.id as any)}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      {subscription.subscribed && subscription.tier === 'premium' && (
        <div className="mt-8 p-4 bg-gradient-cosmic rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Divine Channel Active</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Unlimited personalized spiritual guidance
          </p>
        </div>
      )}
    </div>
  );

  const renderMainContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <div className="space-y-8">
            {/* Welcome Header */}
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
                Welcome, <span className="text-shimmer">{userData.name}</span>
              </h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <p className="text-xl text-muted-foreground">
                  Your cosmic journey awaits • Born {userData.birthday ? new Date(userData.birthday + 'T00:00:00').toLocaleDateString() : ''}
                </p>
                {onEditProfile && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onEditProfile}
                    className="text-xs opacity-70 hover:opacity-100"
                  >
                    <Settings className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
            </div>

            {/* Daily Spiritual Guidance */}
            <SpiritualGuidanceCard userData={userData} />

            {/* Spiritual Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spiritualSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <Card 
                    key={section.id}
                    className={`card-cosmic cursor-pointer transition-all duration-500 ${
                      isActive ? 'ring-2 ring-primary shadow-stardust' : ''
                    }`}
                    onClick={() => setActiveSection(isActive ? null : section.id)}
                  >
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 bg-${section.color}/20 rounded-full flex items-center justify-center floating`}>
                        <Icon className={`w-8 h-8 text-${section.color}`} />
                      </div>
                      <CardTitle className="text-xl font-playfair">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </CardHeader>
                    
                    {isActive && (
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          <p className="text-sm leading-relaxed">{section.content}</p>
                          {section.id === 'guidance' ? (
                            <Button 
                              variant="ethereal" 
                              size="sm" 
                              className="w-full"
                              onClick={() => setActiveView('chat')}
                            >
                              <BookOpen className="w-4 h-4 mr-2" />
                              Open Spiritual Chat
                            </Button>
                          ) : section.id === 'akashic' ? (
                            <SubscriptionGate 
                              feature={section.title}
                              description={`Get unlimited access to ${section.title.toLowerCase()}`}
                              showUpgrade={() => setActiveView('subscription')}
                            >
                              <Button variant="ethereal" size="sm" className="w-full">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Explore Further
                              </Button>
                            </SubscriptionGate>
                          ) : (
                            <Button variant="ethereal" size="sm" className="w-full">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Explore Further
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>

            {/* Dreams Section */}
            <Card className="card-cosmic">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-playfair">Your Dreams & Manifestations</CardTitle>
                    <CardDescription>The universe is conspiring to fulfill your desires</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary/20 rounded-lg p-4 mb-4">
                  <p className="text-sm leading-relaxed italic">{userData.dreams}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    <Zap className="w-3 h-3 mr-1" />
                    High Manifestation Energy
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                    <Compass className="w-3 h-3 mr-1" />
                    Aligned Path
                  </Badge>
                </div>
                <Button 
                  variant="cosmic" 
                  className="w-full"
                  onClick={() => setActiveView('manifestation')}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Open Manifestation Hub
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'manifestation':
        return <DreamManifestationHub userData={userData} />;

      case 'chat':
        return (
          <div className="h-full">
            <SpiritualChat 
              userData={userData} 
              isPremium={subscription.subscribed && subscription.tier === 'premium'}
              onBack={() => setActiveView('home')}
            />
          </div>
        );

      case 'profile':
        return (
          <div className="max-w-4xl mx-auto">
            <SpiritualProfileSetup 
              onComplete={() => setActiveView('home')}
              onSkip={() => setActiveView('home')}
            />
          </div>
        );

      case 'subscription':
        return (
          <div className="max-w-6xl mx-auto">
            <SubscriptionPlans 
              currentPlan={{
                subscribed: subscription.subscribed,
                product_id: subscription.product_id,
                subscription_end: subscription.subscription_end
              }}
              onSubscriptionUpdate={subscription.refreshSubscription}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-aurora">
      {/* Sidebar Navigation */}
      {renderNavigationSidebar()}
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};