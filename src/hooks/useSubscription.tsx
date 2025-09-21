import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionStatus {
  subscribed: boolean;
  tier: 'free' | 'premium';
  product_id?: string;
  subscription_end?: string;
  loading: boolean;
  error?: string;
}

export const useSubscription = () => {
  const [status, setStatus] = useState<SubscriptionStatus>({
    subscribed: false,
    tier: 'free',
    loading: true
  });
  const { toast } = useToast();

  const checkSubscription = useCallback(async () => {
    try {
      setStatus(prev => ({ ...prev, loading: true, error: undefined }));

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setStatus({
          subscribed: false,
          tier: 'free',
          loading: false
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription');

      if (error) {
        console.error('Subscription check error:', error);
        setStatus({
          subscribed: false,
          tier: 'free',
          loading: false,
          error: error.message
        });
        return;
      }

      setStatus({
        subscribed: data?.subscribed || false,
        tier: data?.tier || 'free',
        product_id: data?.product_id,
        subscription_end: data?.subscription_end,
        loading: false
      });

    } catch (error) {
      console.error('Subscription check failed:', error);
      setStatus({
        subscribed: false,
        tier: 'free',
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }, []);

  // Check subscription on mount and auth changes
  useEffect(() => {
    checkSubscription();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          checkSubscription();
        } else if (event === 'SIGNED_OUT') {
          setStatus({
            subscribed: false,
            tier: 'free',
            loading: false
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [checkSubscription]);

  // Auto-refresh every minute for real-time updates
  useEffect(() => {
    const interval = setInterval(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        checkSubscription();
      }
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, [checkSubscription]);

  const refreshSubscription = useCallback(() => {
    checkSubscription();
  }, [checkSubscription]);

  return {
    ...status,
    refreshSubscription
  };
};