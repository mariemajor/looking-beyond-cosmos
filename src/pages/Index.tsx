import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { SpiritualProfileSetup } from "@/components/SpiritualProfileSetup";
import { Dashboard } from "@/components/Dashboard";
import { Auth } from "@/pages/Auth";

interface UserData {
  name: string;
  birthday: string;
  dreams: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'hero' | 'auth' | 'onboarding' | 'spiritual-profile' | 'dashboard'>('hero');
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleGetStarted = () => {
    setCurrentView('auth');
  };

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    setCurrentView('spiritual-profile');
  };

  const handleSpiritualProfileComplete = () => {
    setCurrentView('dashboard');
  };

  const handleSpiritualProfileSkip = () => {
    setCurrentView('dashboard');
  };

  const handleBackToHero = () => {
    setCurrentView('hero');
  };

  const handleAuthSuccess = () => {
    setCurrentView('onboarding');
  };

  const handleEditProfile = () => {
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
      
      {currentView === 'spiritual-profile' && (
        <SpiritualProfileSetup 
          onComplete={handleSpiritualProfileComplete}
          onSkip={handleSpiritualProfileSkip}
        />
      )}
      
      {currentView === 'dashboard' && userData && (
        <Dashboard userData={userData} onEditProfile={handleEditProfile} />
      )}
    </main>
  );
};

export default Index;