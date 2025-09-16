// Content moderation utility for App Store compliance
import { supabase } from "@/integrations/supabase/client";

interface ModerationResult {
  isApproved: boolean;
  reason?: string;
  confidence: number;
}

export class ContentModerator {
  private static blockedWords = [
    // Add inappropriate content filters
    'hate', 'violence', 'suicide', 'self-harm', 'illegal', 'drugs', 'spam',
    // Add more content filters as needed for spiritual app compliance
  ];

  private static spirituallyInappropriate = [
    'demon', 'evil spirits', 'black magic', 'curse', 'hex', 'dark magic',
    'summoning demons', 'satanic', 'devil worship'
  ];

  static async moderateText(content: string): Promise<ModerationResult> {
    const lowerContent = content.toLowerCase();
    
    // Check for blocked words
    for (const word of this.blockedWords) {
      if (lowerContent.includes(word.toLowerCase())) {
        return {
          isApproved: false,
          reason: 'Content contains inappropriate language',
          confidence: 0.9
        };
      }
    }

    // Check for spiritually inappropriate content
    for (const word of this.spirituallyInappropriate) {
      if (lowerContent.includes(word.toLowerCase())) {
        return {
          isApproved: false,
          reason: 'Content not aligned with positive spiritual guidance',
          confidence: 0.8
        };
      }
    }

    // Check content length (prevent spam)
    if (content.length > 2000) {
      return {
        isApproved: false,
        reason: 'Content too long',
        confidence: 0.7
      };
    }

    // Check for repeated characters (spam detection)
    if (/(.)\1{10,}/.test(content)) {
      return {
        isApproved: false,
        reason: 'Spam detected',
        confidence: 0.9
      };
    }

    return {
      isApproved: true,
      confidence: 0.95
    };
  }

  static async reportContent(contentId: string, reason: string, userId?: string) {
    try {
      // Log content reports for review (stored locally for now)
      const reportData = {
        content_id: contentId,
        reason,
        reporter_id: userId,
        created_at: new Date().toISOString()
      };

      // Store in localStorage for now - can be moved to database later
      const reports = JSON.parse(localStorage.getItem('content_reports') || '[]');
      reports.push(reportData);
      localStorage.setItem('content_reports', JSON.stringify(reports));

      console.log('Content reported:', reportData);
      return true;
    } catch (error) {
      console.error('Error in content reporting:', error);
      return false;
    }
  }

  static validateUserInput(input: string): { isValid: boolean; message?: string } {
    // Basic input validation
    if (!input || input.trim().length === 0) {
      return { isValid: false, message: 'Content cannot be empty' };
    }

    if (input.length > 2000) {
      return { isValid: false, message: 'Content is too long (max 2000 characters)' };
    }

    // Check for HTML/script injection
    if (/<script|<iframe|javascript:|data:|vbscript:/i.test(input)) {
      return { isValid: false, message: 'Invalid content detected' };
    }

    return { isValid: true };
  }

  static sanitizeContent(content: string): string {
    // Basic content sanitization
    return content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '')
      .trim();
  }
}

// Age verification utility
export class AgeVerification {
  static verifyAge(birthDate: string): { isValid: boolean; age: number } {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate()) 
      ? age - 1 
      : age;

    // App Store requires 13+ for data collection
    return {
      isValid: actualAge >= 13,
      age: actualAge
    };
  }

  static getRequiredParentalConsent(age: number): boolean {
    // Under 18 may require parental consent in some regions
    return age < 18;
  }
}

// Rate limiting for API calls
export class RateLimiter {
  private static limits = new Map<string, { count: number; timestamp: number }>();

  static checkLimit(userId: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now();
    const userLimit = this.limits.get(userId);

    if (!userLimit || now - userLimit.timestamp > windowMs) {
      this.limits.set(userId, { count: 1, timestamp: now });
      return true;
    }

    if (userLimit.count >= maxRequests) {
      return false;
    }

    userLimit.count++;
    return true;
  }

  static resetLimit(userId: string): void {
    this.limits.delete(userId);
  }
}