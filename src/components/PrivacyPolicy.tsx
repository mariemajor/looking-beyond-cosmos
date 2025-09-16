import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Shield, Lock, Eye, Database, Cookie } from "lucide-react";

interface PrivacyPolicyProps {
  onBack?: () => void;
}

export const PrivacyPolicy = ({ onBack }: PrivacyPolicyProps) => {
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-playfair">Privacy Policy</CardTitle>
            <CardDescription className="text-lg">
              Your sacred journey is protected with cosmic-level security
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-[70vh] p-6">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4 flex items-center gap-2">
                    <Database className="w-6 h-6" />
                    Information We Collect
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>
                      Looking Beyond Cosmos collects minimal information necessary to provide your personalized spiritual experience:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Account Information:</strong> Name, email address for authentication</li>
                      <li><strong>Spiritual Profile:</strong> Birth date, spiritual paths, intentions, experience level</li>
                      <li><strong>Usage Data:</strong> App interactions, feature usage patterns (anonymized)</li>
                      <li><strong>Device Information:</strong> Device type, operating system, app version</li>
                      <li><strong>Spiritual Conversations:</strong> Chat messages for personalized guidance</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4 flex items-center gap-2">
                    <Eye className="w-6 h-6" />
                    How We Use Your Information
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Provide personalized spiritual guidance and daily content</li>
                      <li>Customize your cosmic experience based on your spiritual path</li>
                      <li>Improve our AI models for better spiritual insights</li>
                      <li>Send important app updates and spiritual notifications</li>
                      <li>Ensure app security and prevent fraudulent activity</li>
                      <li>Analyze usage patterns to enhance user experience</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4 flex items-center gap-2">
                    <Lock className="w-6 h-6" />
                    Data Security & Protection
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>
                      Your spiritual journey is sacred to us. We implement enterprise-grade security measures:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Encryption:</strong> All data is encrypted in transit and at rest using AES-256</li>
                      <li><strong>Authentication:</strong> Secure authentication via Supabase with email verification</li>
                      <li><strong>Access Control:</strong> Row-level security ensures you only access your own data</li>
                      <li><strong>Regular Audits:</strong> Continuous security monitoring and vulnerability assessments</li>
                      <li><strong>Data Isolation:</strong> Your spiritual conversations are isolated from other users</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4 flex items-center gap-2">
                    <Cookie className="w-6 h-6" />
                    Data Sharing & Third Parties
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>
                      We respect your spiritual privacy and never sell your personal information:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>No Data Sales:</strong> We never sell your personal or spiritual data</li>
                      <li><strong>Service Providers:</strong> Trusted partners (Supabase, Stripe) bound by strict privacy agreements</li>
                      <li><strong>AI Processing:</strong> Spiritual guidance through secure, privacy-first AI models</li>
                      <li><strong>Legal Compliance:</strong> Data shared only when required by law</li>
                      <li><strong>Anonymized Analytics:</strong> Usage patterns analyzed only in anonymized form</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4">Your Rights & Choices</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Access:</strong> Request a copy of your spiritual data</li>
                      <li><strong>Correction:</strong> Update or correct your profile information</li>
                      <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                      <li><strong>Portability:</strong> Export your spiritual journey data</li>
                      <li><strong>Consent Withdrawal:</strong> Opt out of non-essential data processing</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4">Children's Privacy</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>
                      Looking Beyond Cosmos is designed for users 13 years and older. We do not knowingly collect 
                      personal information from children under 13. If we discover such information, we will delete 
                      it immediately.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-playfair text-primary mb-4">Contact Us</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>
                      For questions about this Privacy Policy or your spiritual data:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Email: privacy@lookingbeyondcosmos.com</li>
                      <li>Support: In-app contact form</li>
                      <li>Response time: Within 48 hours</li>
                    </ul>
                  </div>
                </section>

                <section className="border-t border-border pt-6">
                  <div className="text-xs text-muted-foreground">
                    <p><strong>Last Updated:</strong> September 2024</p>
                    <p><strong>Version:</strong> 1.0</p>
                    <p>This policy is effective immediately and applies to all users of Looking Beyond Cosmos.</p>
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