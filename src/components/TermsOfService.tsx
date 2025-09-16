import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Scale, Star, AlertTriangle, CreditCard } from "lucide-react";

interface TermsOfServiceProps {
  onBack?: () => void;
}

export const TermsOfService = ({ onBack }: TermsOfServiceProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <div className="max-w-4xl mx-auto">
        {onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}

        <Card className="card-cosmic">
          <CardHeader className="text-center border-b border-border">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-cosmic rounded-full flex items-center justify-center">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-playfair">Terms of Service</CardTitle>
            <CardDescription className="text-lg">
              Sacred agreements for your cosmic journey
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-[70vh] p-6">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4">Acceptance of Terms</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>
                      By accessing or using Looking Beyond Cosmos ("the App"), you agree to be bound by these Terms of Service. 
                      If you disagree with any part of these terms, you may not access the App.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4 flex items-center gap-2">
                    <Star className="w-6 h-6" />
                    Spiritual Services
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>Looking Beyond Cosmos provides:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>AI-powered spiritual guidance and insights</li>
                      <li>Personalized daily spiritual content and rituals</li>
                      <li>Meditation and mindfulness practices</li>
                      <li>Astrological and cosmic awareness tools</li>
                      <li>Community features for spiritual growth</li>
                    </ul>
                    <div className="bg-accent/10 rounded-lg p-4 border border-accent/20 mt-4">
                      <p className="text-xs">
                        <strong>Important:</strong> Our services are for entertainment and spiritual exploration purposes. 
                        They are not a substitute for professional medical, psychological, or legal advice.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4">User Responsibilities</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>As a cosmic traveler using our App, you agree to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Provide accurate and truthful information</li>
                      <li>Use the App only for lawful and spiritual purposes</li>
                      <li>Respect other users and maintain a positive environment</li>
                      <li>Keep your account credentials secure and confidential</li>
                      <li>Not share inappropriate, harmful, or illegal content</li>
                      <li>Not attempt to hack, disrupt, or damage the App</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4 flex items-center gap-2">
                    <CreditCard className="w-6 h-6" />
                    Subscription & Payments
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p><strong>Free Features:</strong> Basic spiritual content and limited AI guidance</p>
                    <p><strong>Premium Subscription:</strong> Unlimited AI guidance, exclusive content, and advanced features</p>
                    
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Subscriptions are billed monthly or annually</li>
                      <li>Payment processed securely through Stripe</li>
                      <li>Auto-renewal can be cancelled anytime in your account settings</li>
                      <li>Refunds available within 7 days of purchase (see Refund Policy)</li>
                      <li>Premium features remain active until subscription expires</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4">Content & Intellectual Property</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p><strong>Our Content:</strong></p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>All App content, design, and features are owned by Looking Beyond Cosmos</li>
                      <li>You may not copy, distribute, or create derivative works</li>
                      <li>Personal use only - no commercial reproduction</li>
                    </ul>
                    
                    <p><strong>Your Content:</strong></p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>You retain ownership of your spiritual journey data</li>
                      <li>You grant us license to process your data for service delivery</li>
                      <li>You may request data export or deletion at any time</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" />
                    Disclaimers & Limitations
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <div className="bg-destructive/10 rounded-lg p-4 border border-destructive/20">
                      <p className="font-semibold mb-2">IMPORTANT DISCLAIMERS:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Spiritual guidance is for entertainment and personal growth purposes only</li>
                        <li>Not a substitute for professional medical, psychological, or legal advice</li>
                        <li>Results and experiences may vary between individuals</li>
                        <li>We make no guarantees about spiritual outcomes or life changes</li>
                        <li>Always consult qualified professionals for serious life decisions</li>
                      </ul>
                    </div>
                    
                    <p><strong>Limitation of Liability:</strong></p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>App provided "as is" without warranties of any kind</li>
                      <li>We are not liable for any indirect, incidental, or consequential damages</li>
                      <li>Maximum liability limited to amount paid for the service</li>
                      <li>User assumes full responsibility for decisions made using App guidance</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4">Privacy & Data Protection</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>
                      Your privacy is sacred to us. Please review our Privacy Policy for detailed information about:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>What data we collect and how we use it</li>
                      <li>How we protect your spiritual information</li>
                      <li>Your rights regarding your personal data</li>
                      <li>Third-party integrations and data sharing</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4">Termination</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p><strong>You may terminate your account at any time by:</strong></p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Contacting our support team</li>
                      <li>Using the account deletion feature in the App</li>
                      <li>Canceling your subscription (premium features end at period end)</li>
                    </ul>
                    
                    <p><strong>We may terminate accounts for:</strong></p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Violation of these Terms of Service</li>
                      <li>Abusive or harmful behavior toward other users</li>
                      <li>Fraudulent payment activity</li>
                      <li>Extended period of inactivity</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4">Changes to Terms</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>
                      We may update these Terms of Service occasionally to reflect changes in our services or legal requirements. 
                      Users will be notified of significant changes via email or in-app notification. Continued use of the App 
                      after changes constitutes acceptance of the new terms.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4">Contact Information</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>For questions about these Terms of Service:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Email: legal@lookingbeyondcosmos.com</li>
                      <li>Support: In-app contact form</li>
                      <li>Response time: Within 48 hours</li>
                    </ul>
                  </div>
                </section>

                <section className="border-t border-border pt-6">
                  <div className="text-xs text-muted-foreground">
                    <p><strong>Last Updated:</strong> September 2024</p>
                    <p><strong>Version:</strong> 1.0</p>
                    <p>These terms are effective immediately and govern all use of Looking Beyond Cosmos.</p>
                  </div>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};