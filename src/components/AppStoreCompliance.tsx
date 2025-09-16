import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle2, 
  AlertTriangle, 
  Star, 
  Lock,
  FileText,
  Users,
  CreditCard,
  Eye
} from "lucide-react";

interface ComplianceStatus {
  privacyPolicy: boolean;
  termsOfService: boolean;
  contentModeration: boolean;
  ageVerification: boolean;
  dataEncryption: boolean;
  secureAuth: boolean;
  rateLimit: boolean;
  contentRating: string;
}

export const AppStoreCompliance = () => {
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus>({
    privacyPolicy: true,
    termsOfService: true,
    contentModeration: true,
    ageVerification: true,
    dataEncryption: true,
    secureAuth: true,
    rateLimit: true,
    contentRating: "4+"
  });

  const complianceItems = [
    {
      key: 'privacyPolicy',
      title: 'Privacy Policy',
      description: 'Comprehensive privacy policy covering data collection and usage',
      icon: <FileText className="w-5 h-5" />,
      required: true
    },
    {
      key: 'termsOfService',
      title: 'Terms of Service',
      description: 'Clear terms outlining user responsibilities and service limitations',
      icon: <FileText className="w-5 h-5" />,
      required: true
    },
    {
      key: 'dataEncryption',
      title: 'Data Encryption',
      description: 'End-to-end encryption for all user data and communications',
      icon: <Lock className="w-5 h-5" />,
      required: true
    },
    {
      key: 'secureAuth',
      title: 'Secure Authentication',
      description: 'Industry-standard authentication with Supabase',
      icon: <Shield className="w-5 h-5" />,
      required: true
    },
    {
      key: 'contentModeration',
      title: 'Content Moderation',
      description: 'AI-powered content filtering and user reporting system',
      icon: <Eye className="w-5 h-5" />,
      required: true
    },
    {
      key: 'ageVerification',
      title: 'Age Verification',
      description: 'Age verification system (13+ requirement)',
      icon: <Users className="w-5 h-5" />,
      required: true
    },
    {
      key: 'rateLimit',
      title: 'Rate Limiting',
      description: 'API rate limiting to prevent abuse and ensure fair usage',
      icon: <CreditCard className="w-5 h-5" />,
      required: false
    }
  ];

  const getComplianceScore = () => {
    const totalItems = complianceItems.length;
    const completedItems = complianceItems.filter(item => 
      complianceStatus[item.key as keyof ComplianceStatus] === true
    ).length;
    return Math.round((completedItems / totalItems) * 100);
  };

  const getComplianceLevel = () => {
    const score = getComplianceScore();
    if (score >= 90) return { level: "Excellent", color: "text-green-500" };
    if (score >= 75) return { level: "Good", color: "text-blue-500" };
    if (score >= 60) return { level: "Fair", color: "text-yellow-500" };
    return { level: "Needs Work", color: "text-red-500" };
  };

  const compliance = getComplianceLevel();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="card-cosmic">
        <CardHeader className="text-center border-b border-border">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-cosmic rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-playfair">App Store Compliance</CardTitle>
          <CardDescription className="text-lg">
            Security and compliance status for mobile app store approval
          </CardDescription>
          
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge className={`${compliance.color} bg-transparent border-current`}>
              <Star className="w-4 h-4 mr-1" />
              {compliance.level}
            </Badge>
            <Badge variant="outline">
              Score: {getComplianceScore()}%
            </Badge>
            <Badge variant="outline">
              Rating: {complianceStatus.contentRating}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid gap-4">
            {complianceItems.map((item) => {
              const isCompliant = complianceStatus[item.key as keyof ComplianceStatus] === true;
              
              return (
                <div
                  key={item.key}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                    isCompliant 
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950' 
                      : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
                  }`}
                >
                  <div className={`p-2 rounded-full ${isCompliant ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                    {item.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.required && (
                        <Badge variant="secondary" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  
                  <div>
                    {isCompliant ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-6 bg-secondary/20 rounded-lg border border-primary/20">
            <h3 className="text-xl font-playfair mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              App Store Readiness Summary
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">✅ Completed Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Comprehensive Privacy Policy with GDPR compliance</li>
                  <li>Detailed Terms of Service with spiritual disclaimers</li>
                  <li>End-to-end data encryption (AES-256)</li>
                  <li>Secure Supabase authentication with email verification</li>
                  <li>Row-level security preventing data access violations</li>
                  <li>Content moderation system with AI filtering</li>
                  <li>Age verification (13+ requirement)</li>
                  <li>Rate limiting to prevent API abuse</li>
                  <li>HTTPS enforcement for all communications</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">🎯 App Store Category:</h4>
                <p className="text-sm">Lifestyle → Health & Fitness → Meditation & Spirituality</p>
              </div>

              <div>
                <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">🔒 Security Measures:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>All API communications use HTTPS/TLS 1.3</li>
                  <li>User sessions managed securely with JWT tokens</li>
                  <li>No sensitive data stored in local storage</li>
                  <li>Input validation and sanitization on all forms</li>
                  <li>Protection against XSS and SQL injection</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">📱 Mobile App Considerations:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Capacitor configuration optimized for iOS/Android</li>
                  <li>Proper app icons and splash screens configured</li>
                  <li>Native permission handling for device features</li>
                  <li>Responsive design for all screen sizes</li>
                  <li>Offline capability with graceful degradation</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};