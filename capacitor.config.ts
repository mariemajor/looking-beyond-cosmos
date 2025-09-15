import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lookingbeyondcosmos.app',
  appName: 'looking-beyond-cosmos',
  webDir: 'dist',
  server: {
    url: 'https://472c1e04-dde9-4d5c-ab7b-35b17e498aa9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1029',
      showSpinner: false
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#1a1029'
    }
  }
};

export default config;