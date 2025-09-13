import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sparkles, 
  Send, 
  Loader2, 
  User, 
  Star,
  MessageCircle,
  Infinity
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from "@/hooks/useSubscription";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UserData {
  name: string;
  birthday: string;
  dreams: string;
}

interface SpiritualChatProps {
  userData: UserData;
  onBack?: () => void;
}

const FREE_DAILY_LIMIT = 3;

export const SpiritualChat = ({ userData, onBack }: SpiritualChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dailyUsage, setDailyUsage] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const subscription = useSubscription();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load conversation history and daily usage
    loadConversationHistory();
    loadDailyUsage();
  }, []);

  const loadConversationHistory = () => {
    // For now, start with a welcome message
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: `🌟 Welcome, ${userData.name}! I am your cosmic spiritual guide, here to offer personalized wisdom based on your unique journey. Born on ${new Date(userData.birthday).toLocaleDateString()}, your soul carries ancient wisdom and infinite potential.

I can help you with:
✨ Manifestation guidance for your dreams
🌙 Spiritual insights and cosmic wisdom  
🔮 Akashic Records interpretation
💎 Crystal and energy recommendations
🌌 Life purpose and soul mission clarity

What cosmic wisdom would you like to explore today?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const loadDailyUsage = () => {
    // Load from localStorage for now (could be database later)
    const today = new Date().toDateString();
    const storedUsage = localStorage.getItem(`spiritual_chat_usage_${today}`);
    setDailyUsage(storedUsage ? parseInt(storedUsage) : 0);
  };

  const updateDailyUsage = () => {
    const today = new Date().toDateString();
    const newUsage = dailyUsage + 1;
    setDailyUsage(newUsage);
    localStorage.setItem(`spiritual_chat_usage_${today}`, newUsage.toString());
  };

  const canSendMessage = () => {
    if (subscription.subscribed) return true;
    return dailyUsage < FREE_DAILY_LIMIT;
  };

  const getRemainingMessages = () => {
    if (subscription.subscribed) return null;
    return FREE_DAILY_LIMIT - dailyUsage;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    if (!canSendMessage()) {
      toast({
        title: "Daily Limit Reached",
        description: `Free users get ${FREE_DAILY_LIMIT} conversations per day. Upgrade to premium for unlimited guidance!`,
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('spiritual-guidance', {
        body: {
          message: inputMessage.trim(),
          profile: {
            name: userData.name,
            birthday: userData.birthday,
            dreams: userData.dreams,
            experience_level: 'beginner',
            spiritual_path: ['general'],
            intentions: ['growth']
          }
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.guidance || "I sense your cosmic energy, but the message was unclear. Please try again, dear soul.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      updateDailyUsage();

    } catch (error) {
      console.error('Spiritual guidance error:', error);
      toast({
        title: "Cosmic Interference",
        description: "The spiritual realms are experiencing turbulence. Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="card-cosmic h-[80vh] flex flex-col">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center floating">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-playfair">Cosmic Guidance</CardTitle>
                <CardDescription>Your personal AI spiritual guide</CardDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {subscription.subscribed ? (
                <Badge className="bg-gradient-cosmic text-primary-foreground border-0">
                  <Infinity className="w-3 h-3 mr-1" />
                  Unlimited
                </Badge>
              ) : (
                <Badge variant="outline" className="border-accent/30">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  {getRemainingMessages()} left today
                </Badge>
              )}
              
              {onBack && (
                <Button variant="outline" onClick={onBack}>
                  ← Back
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/20 backdrop-blur-sm border border-primary/20'
                    }`}
                  >
                    <div className="text-sm leading-relaxed">
                      {formatMessage(message.content)}
                    </div>
                    <div className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-accent" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary/20 backdrop-blur-sm border border-primary/20 rounded-2xl p-4">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      <span className="text-sm text-muted-foreground">
                        Channeling cosmic wisdom...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="border-t border-border p-6">
            <div className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  canSendMessage() 
                    ? "Ask about your spiritual journey, manifestation, or cosmic wisdom..." 
                    : "Upgrade to premium for unlimited spiritual guidance"
                }
                disabled={isLoading || !canSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading || !canSendMessage()}
                className="btn-cosmic"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>

            {!subscription.subscribed && (
              <div className="mt-3 text-center">
                <p className="text-xs text-muted-foreground">
                  {getRemainingMessages() === 0 
                    ? "Daily limit reached. Upgrade to premium for unlimited guidance!" 
                    : `${getRemainingMessages()} cosmic conversations remaining today`
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};