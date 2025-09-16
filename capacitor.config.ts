import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lookingbeyondcosmos.app',
  appName: 'Looking Beyond Cosmos',
  webDir: 'dist',
  server: {
    url: 'https://472c1e04-dde9-4d5c-ab7b-35b17e498aa9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1029',
      showSpinner: false,
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      iosSpinnerStyle: 'small'
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#1a1029'
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true
    }
  },
  ios: {
    contentInset: 'automatic',
    allowsLinkPreview: false,
    backgroundColor: '#1a1029'
  },
  android: {
    backgroundColor: '#1a1029',
    allowMixedContent: false,
    captureInput: true
  }
};

export default config;