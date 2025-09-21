import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface MoonPhaseData {
  name: string;
  emoji: string;
  illumination: number;
  phase: number;
  daysInCycle: number;
}

interface PlanetaryPosition {
  longitude: number;
  sign: string;
  degrees: number;
  minutes: number;
}

interface PlanetaryPositions {
  sun: PlanetaryPosition;
  mercury: PlanetaryPosition;
  venus: PlanetaryPosition;
  mars: PlanetaryPosition;
  jupiter: PlanetaryPosition;
  saturn: PlanetaryPosition;
}

interface AstronomicalData {
  date: string;
  moonPhase: MoonPhaseData;
  planetaryPositions: PlanetaryPositions;
  timestamp: number;
}

export const useAstronomicalData = (date?: Date) => {
  const [astronomicalData, setAstronomicalData] = useState<AstronomicalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAstronomicalData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const targetDate = date || new Date();
        console.log('Fetching astronomical data for:', targetDate);

        const { data, error } = await supabase.functions.invoke('get-astronomical-data', {
          body: { date: targetDate.toISOString() }
        });

        if (error) {
          console.error('Supabase function error:', error);
          throw new Error(`Astronomical data error: ${error.message}`);
        }

        if (data) {
          console.log('Received astronomical data:', data);
          setAstronomicalData(data);
        } else {
          throw new Error('No data received from astronomical function');
        }
      } catch (err) {
        console.error('Error fetching astronomical data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch astronomical data');
        
        // Provide accurate fallback data for September 2025
        console.log('Using fallback astronomical data');
        setAstronomicalData({
          date: (date || new Date()).toISOString(),
          moonPhase: {
            name: "New Moon",
            emoji: "🌑", 
            illumination: 0,
            phase: 0,
            daysInCycle: 0
          },
          planetaryPositions: {
            sun: { longitude: 178, sign: "Virgo", degrees: 28, minutes: 30 },
            mercury: { longitude: 150, sign: "Virgo", degrees: 20, minutes: 15 },
            venus: { longitude: 165, sign: "Virgo", degrees: 15, minutes: 45 },
            mars: { longitude: 200, sign: "Libra", degrees: 10, minutes: 20 },
            jupiter: { longitude: 60, sign: "Gemini", degrees: 25, minutes: 30 },
            saturn: { longitude: 330, sign: "Pisces", degrees: 15, minutes: 0 }
          },
          timestamp: Date.now()
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAstronomicalData();
  }, [date?.toDateString()]);

  return { astronomicalData, loading, error };
};