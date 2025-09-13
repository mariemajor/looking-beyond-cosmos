import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Heart, Calendar, Scroll } from "lucide-react";

interface OnboardingData {
  name: string;
  birthday: string;
  dreams: string;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onBack: () => void;
}

export const OnboardingFlow = ({ onComplete, onBack }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    name: "",
    birthday: "",
    dreams: ""
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return formData.birthday.trim().length > 0;
      case 3:
        return formData.dreams.trim().length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-center items-center gap-4 mb-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    stepNum <= step
                      ? "bg-primary text-primary-foreground shadow-cosmic"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all ${
                      stepNum < step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground">Step {step} of 3</p>
        </div>

        <Card className="card-cosmic">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              {step === 1 && <Sparkles className="w-8 h-8 text-primary" />}
              {step === 2 && <Calendar className="w-8 h-8 text-primary" />}
              {step === 3 && <Heart className="w-8 h-8 text-primary" />}
            </div>
            <CardTitle className="text-2xl font-playfair">
              {step === 1 && "Welcome, Cosmic Soul"}
              {step === 2 && "Your Celestial Blueprint"}
              {step === 3 && "Your Heart's Desires"}
            </CardTitle>
            <CardDescription className="text-lg">
              {step === 1 && "Let us know your name so we can channel your personal guidance"}
              {step === 2 && "Your birthday helps us align with your astrological energies"}
              {step === 3 && "Share your dreams so we can guide your manifestation journey"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">Your Sacred Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 text-lg bg-secondary/20 border-primary/30 focus:border-primary/60"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Your name carries powerful vibrations that help us connect with your guides
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="birthday" className="text-base">Date of Birth</Label>
                  <Input
                    id="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    className="h-12 text-lg bg-secondary/20 border-primary/30 focus:border-primary/60"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  The cosmic alignment at your birth reveals your soul's purpose and starseed origins
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dreams" className="text-base">Your Dreams & Aspirations</Label>
                  <Textarea
                    id="dreams"
                    placeholder="Share what you wish to manifest in your life..."
                    value={formData.dreams}
                    onChange={(e) => setFormData({ ...formData, dreams: e.target.value })}
                    className="min-h-32 text-lg bg-secondary/20 border-primary/30 focus:border-primary/60 resize-none"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Your intentions guide the universe to align opportunities for your highest good
                </p>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <Button
                variant="ethereal"
                size="lg"
                onClick={handlePrevious}
                className="flex-1"
              >
                {step === 1 ? "Back to Home" : "Previous"}
              </Button>
              
              <Button
                variant="cosmic"
                size="lg"
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex-1"
              >
                {step === 3 ? (
                  <>
                    <Scroll className="w-5 h-5 mr-2" />
                    Open Akashic Records
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};