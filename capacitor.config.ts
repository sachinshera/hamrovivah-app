import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'hamrovivah',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      "scopes": ["profile", "email"],
      "serverClientId": "458774791962-al95v5jospkdn2j42brol8m6kitb00p7.apps.googleusercontent.com",
      "forceCodeForRefreshToken": true
    }
  }
};

export default config;
