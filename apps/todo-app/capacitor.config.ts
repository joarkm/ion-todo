import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'todo-app',
  webDir: '../../dist/apps/todo-app',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
