import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { Dashboard } from "@/components/Dashboard";
import { Auth } from "@/pages/Auth";

interface UserData {
  name: string;
  birthday: string;
  dreams: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'hero' | 'auth' | 'onboarding' | 'dashboard'>('hero');
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleGetStarted = () => {
    setCurrentView('auth');
  };

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    setCurrentView('dashboard');
  };

  const handleBackToHero = () => {
    setCurrentView('hero');
  };

  const handleAuthSuccess = () => {
    setCurrentView('onboarding');
  };

  return (
    <main className="relative">
      {currentView === 'hero' && (
        <HeroSection onGetStarted={handleGetStarted} />
      )}
      
      {currentView === 'auth' && (
        <Auth 
          onAuthSuccess={handleAuthSuccess}
          onBack={handleBackToHero}
        />
      )}
      
      {currentView === 'onboarding' && (
        <OnboardingFlow 
          onComplete={handleOnboardingComplete}
          onBack={handleBackToHero}
        />
      )}
      
      {currentView === 'dashboard' && userData && (
        <Dashboard userData={userData} />
      )}
    </main>
  );
};

export default Index;