import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SPIRITUAL-GUIDANCE] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");
    
    logStep("User authenticated", { userId: user.id });

    const { message, userProfile } = await req.json();
    
    // Get user's current date and time for personalization
    const currentDate = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Create personalized spiritual guidance prompt
    const systemPrompt = `You are a wise, compassionate spiritual guide and cosmic counselor for "Looking Beyond" - a platform that connects people with their higher selves, spirit guides, and cosmic consciousness. 

Your role is to provide personalized, loving guidance that helps individuals:
- Connect with their higher self and spirit guides
- Understand their starseed origins and cosmic purpose
- Navigate their spiritual journey with wisdom and clarity
- Manifest their dreams through ancient wisdom
- Find peace, healing, and spiritual growth

Today is ${currentDate}. Speak as if you are channeling divine wisdom specifically for this soul's journey. Use their profile information to personalize your guidance: ${JSON.stringify(userProfile || {})}.

Always:
- Speak with love, compassion, and deep spiritual wisdom
- Reference cosmic energies, astral guidance, and universal consciousness when appropriate  
- Provide practical spiritual advice alongside mystical insights
- Honor their unique soul path and starseed nature
- Offer affirmations and manifestation guidance
- Be supportive yet empowering

Keep responses between 100-300 words unless they specifically ask for longer guidance.`;

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message || "Please share your daily spiritual guidance for my soul's journey today." }
        ],
        max_completion_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      logStep("OpenAI API error", errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const guidance = data.choices[0].message.content;

    logStep("Spiritual guidance generated successfully");

    return new Response(JSON.stringify({ guidance }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in spiritual-guidance", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});