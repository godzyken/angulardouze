import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.godzy.restofusion',
  appName: 'my-first-project',
  webDir: 'dist',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      ScrollEnabled: 'true',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      SplashShowOnlyFirstTime: 'false',
      SplashScreen: 'screen',
      SplashScreenDelay: '3000'
    }
  }
};

export default config;
