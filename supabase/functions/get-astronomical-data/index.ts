import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { date } = await req.json();
    const targetDate = date ? new Date(date) : new Date();
    
    console.log(`[ASTRO-DATA] Calculating astronomy data for date: ${targetDate.toISOString()}`);

    // Calculate accurate moon phase
    const moonPhaseData = calculateMoonPhase(targetDate);
    
    // Get planetary positions (using astronomical calculations)
    const planetaryPositions = await calculatePlanetaryPositions(targetDate);
    
    // Calculate additional astronomical data
    const astronomicalData = {
      date: targetDate.toISOString(),
      moonPhase: moonPhaseData,
      planetaryPositions: planetaryPositions,
      timestamp: Date.now()
    };

    console.log(`[ASTRO-DATA] Calculated data:`, astronomicalData);

    return new Response(JSON.stringify(astronomicalData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[ASTRO-DATA] Error calculating astronomical data:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Accurate moon phase calculation based on astronomical algorithms
function calculateMoonPhase(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // Calculate Julian Day Number
  let a = Math.floor((14 - month) / 12);
  let y = year - a;
  let m = month + 12 * a - 3;
  let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  // Calculate days since new moon epoch (January 6, 2000)
  let daysSinceNewMoon = jdn - 2451549.5;
  
  // Average lunar cycle is 29.53058867 days
  let lunarCycle = 29.53058867;
  let currentCycle = daysSinceNewMoon / lunarCycle;
  let phase = (currentCycle - Math.floor(currentCycle)) * lunarCycle;
  
  // Determine phase name and emoji
  let phaseName: string;
  let phaseEmoji: string;
  let illumination: number;
  
  if (phase < 1.84566) {
    phaseName = "New Moon";
    phaseEmoji = "🌑";
    illumination = 0;
  } else if (phase < 5.53699) {
    phaseName = "Waxing Crescent";
    phaseEmoji = "🌒";
    illumination = 25;
  } else if (phase < 9.22831) {
    phaseName = "First Quarter";
    phaseEmoji = "🌓";
    illumination = 50;
  } else if (phase < 12.91963) {
    phaseName = "Waxing Gibbous";
    phaseEmoji = "🌔";
    illumination = 75;
  } else if (phase < 16.61096) {
    phaseName = "Full Moon";
    phaseEmoji = "🌕";
    illumination = 100;
  } else if (phase < 20.30228) {
    phaseName = "Waning Gibbous";
    phaseEmoji = "🌖";
    illumination = 75;
  } else if (phase < 23.99361) {
    phaseName = "Last Quarter";
    phaseEmoji = "🌗";
    illumination = 50;
  } else {
    phaseName = "Waning Crescent";
    phaseEmoji = "🌘";
    illumination = 25;
  }
  
  return {
    name: phaseName,
    emoji: phaseEmoji,
    illumination: illumination,
    phase: phase,
    daysInCycle: phase
  };
}

// Calculate planetary positions using astronomical algorithms
async function calculatePlanetaryPositions(date: Date) {
  const jd = dateToJulianDay(date);
  
  // Simplified planetary position calculations (VSOP87 theory approximations)
  // Note: These are simplified calculations. For production, use a full astronomical library
  
  const positions = {
    sun: calculateSunPosition(jd),
    mercury: calculatePlanetPosition('mercury', jd),
    venus: calculatePlanetPosition('venus', jd),
    mars: calculatePlanetPosition('mars', jd),
    jupiter: calculatePlanetPosition('jupiter', jd),
    saturn: calculatePlanetPosition('saturn', jd)
  };
  
  return positions;
}

function dateToJulianDay(date: Date): number {
  const a = Math.floor((14 - (date.getMonth() + 1)) / 12);
  const y = date.getFullYear() - a;
  const m = (date.getMonth() + 1) + 12 * a - 3;
  
  return date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + 
         Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045 +
         (date.getHours() - 12) / 24 + date.getMinutes() / 1440 + date.getSeconds() / 86400;
}

function calculateSunPosition(jd: number) {
  const n = jd - 2451545.0;
  const L = (280.460 + 0.9856474 * n) % 360;
  const g = ((357.528 + 0.9856003 * n) % 360) * Math.PI / 180;
  const lambda = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) % 360;
  
  return {
    longitude: lambda,
    sign: getZodiacSign(lambda),
    degrees: Math.floor(lambda % 30),
    minutes: Math.floor((lambda % 1) * 60)
  };
}

function calculatePlanetPosition(planet: string, jd: number) {
  // Simplified orbital elements (mean values for 2025)
  const orbitalElements: Record<string, any> = {
    mercury: { a: 0.387, e: 0.206, i: 7.0, L: 252.3, w: 77.5, n: 4.092 },
    venus: { a: 0.723, e: 0.007, i: 3.4, L: 181.9, w: 131.6, n: 1.602 },
    mars: { a: 1.524, e: 0.093, i: 1.9, L: 355.4, w: 336.0, n: 0.524 },
    jupiter: { a: 5.203, e: 0.049, i: 1.3, L: 34.4, w: 14.3, n: 0.083 },
    saturn: { a: 9.537, e: 0.057, i: 2.5, L: 50.1, w: 93.1, n: 0.033 }
  };
  
  const elem = orbitalElements[planet];
  if (!elem) return { longitude: 0, sign: "Aries", degrees: 0, minutes: 0 };
  
  const n = jd - 2451545.0;
  const meanAnomaly = ((elem.L + elem.n * n) % 360) * Math.PI / 180;
  const lambda = (elem.L + elem.n * n + 1.915 * Math.sin(meanAnomaly)) % 360;
  
  return {
    longitude: lambda,
    sign: getZodiacSign(lambda),
    degrees: Math.floor(lambda % 30),
    minutes: Math.floor((lambda % 1) * 60)
  };
}

function getZodiacSign(longitude: number): string {
  const signs = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  return signs[Math.floor(longitude / 30)];
}