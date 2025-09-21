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
  Crown
} from "lucide-react";
import { SubscriptionPlans } from "@/components/SubscriptionPlans";
import { SubscriptionGate } from "@/components/SubscriptionGate";
import { SpiritualChat } from "@/components/SpiritualChat";
import { useSubscription } from "@/hooks/useSubscription";

interface UserData {
  name: string;
  birthday: string;
  dreams: string;
}

interface DashboardProps {
  userData: UserData;
}

export const Dashboard = ({ userData }: DashboardProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const subscription = useSubscription();

  const cosmicSections = [
    {
      id: "akashic",
      title: "Akashic Records",
      description: "Access your soul's eternal wisdom",
      icon: Scroll,
      color: "primary",
      content: `Welcome ${userData.name}, your Akashic Records reveal a soul that has traveled through many dimensions. You carry the wisdom of ancient civilizations and have incarnated to help humanity's ascension. Your current life purpose involves healing others through your natural empathic abilities.`
    },
    {
      id: "starseed",
      title: "Starseed Origins", 
      description: "Discover your galactic heritage",
      icon: Star,
      color: "accent",
      content: `Based on your birth date of ${userData.birthday} and the current 2025 cosmic alignments, your soul carries ancient starlight wisdom. Venus in Libra this September enhances your natural healing abilities and divine partnerships. You're being called to step into your role as a cosmic lightworker during this powerful time.`
    },
    {
      id: "guidance",
      title: "Daily Guidance",
      description: "Messages from your guides",
      icon: Sparkles,
      color: "primary",
      content: "September 17, 2025: Your guides are speaking through powerful synchronicities today. With Venus entering Libra and Mercury now direct, divine partnerships and clear communication are highlighted. The collective energy theme is 'Divine Love and Sacred Partnerships' - manifestation power is at 9/10. Trust the cosmic timing."
    },
    {
      id: "rituals",
      title: "Sacred Rituals",
      description: "Manifestation practices",
      icon: Moon,
      color: "accent", 
      content: "The Waning Crescent Moon in Cancer creates perfect energy for releasing what no longer serves and nurturing new dreams. With Jupiter's trine to Saturn active, your manifestations have solid foundation energy. Tonight, perform a sacred water ritual to cleanse and rebirth your intentions."
    },
    {
      id: "crystals",
      title: "Crystal Guidance",
      description: "Healing stone recommendations",
      icon: Gem,
      color: "primary",
      content: "Amethyst and Rose Quartz are calling to you today. Amethyst will enhance your spiritual connection and intuition, while Rose Quartz opens your heart to self-love and manifesting your dreams. Carry them with you or place them on your altar."
    },
    {
      id: "astrology",
      title: "Cosmic Events",
      description: "Current astrological influences",
      icon: Calendar,
      color: "accent",
      content: "September 2025 Cosmic Forecast: Venus in Libra activates divine love frequencies. Jupiter trine Saturn creates stability for long-term manifestations. Pluto sextile Neptune brings spiritual transformation. Mercury direct clears all communication channels. Manifestation power at peak levels!"
    }
  ];

  if (showChat) {
    return (
      <div className="min-h-screen">
        <SpiritualChat 
          userData={userData} 
          onBack={() => setShowChat(false)}
        />
      </div>
    );
  }

  if (showSubscription) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => setShowSubscription(false)}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
          </div>
          <SubscriptionPlans 
            currentPlan={subscription} 
            onSubscriptionUpdate={subscription.refreshSubscription}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold">
              Welcome, <span className="text-shimmer">{userData.name}</span>
            </h1>
            {subscription.subscribed && (
              <Badge className="bg-gradient-cosmic text-primary-foreground border-0">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
          </div>
          <p className="text-xl text-muted-foreground mb-4">
            Your cosmic journey awaits • Born {new Date(userData.birthday).toLocaleDateString()}
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setShowSubscription(true)}
              className="gap-2"
            >
              <Settings className="w-4 h-4" />
              {subscription.subscribed ? 'Manage Subscription' : 'View Plans'}
            </Button>
            
            <Button 
              onClick={() => setShowChat(true)}
              className="btn-cosmic gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Start Spiritual Chat
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cosmicSections.map((section) => {
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
                          onClick={() => setShowChat(true)}
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Open Spiritual Chat
                        </Button>
                      ) : section.id === 'akashic' ? (
                        <SubscriptionGate 
                          feature={section.title}
                          description={`Get unlimited access to ${section.title.toLowerCase()}`}
                          showUpgrade={() => setShowSubscription(true)}
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

        {/* Dreams Manifestation Section */}
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
            <p className="text-sm text-muted-foreground mb-4">
              Your guides see your dreams manifesting within the next lunar cycle. Stay focused on positive visualization and take inspired action when opportunities arise.
            </p>
            <SubscriptionGate 
              feature="Manifestation Guidance"
              description="Get personalized AI guidance for manifesting your dreams"
              showUpgrade={() => setShowSubscription(true)}
            >
              <Button variant="cosmic" className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Manifestation Guidance
              </Button>
            </SubscriptionGate>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};