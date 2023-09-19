import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hamrovivah.app',
  appName: 'Hamro Vivah',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',

  },
  plugins: {
    "SplashScreen": {
      "launchShowDuration": 0
    },
    "GoogleAuth": {
      "scopes": [
        "profile",
        "email"
      ],
      "serverClientId": "712518121703-ccecdguj89jr051f33bt3p40bqq0uflb.apps.googleusercontent.com",
      "forceCodeForRefreshToken": true
    }
  }
}
export default config;
