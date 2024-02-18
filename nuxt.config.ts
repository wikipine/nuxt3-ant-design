// https://nuxt.com/docs/api/configuration/nuxt-config
import { loadEnv } from 'vite';

const envScript = (process.env as any).npm_lifecycle_script.split(' ');
const envName = envScript[envScript.length - 1]; // 通过启动命令区分环境
const envData = loadEnv(envName, 'env') as unknown as any;

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Nuxt3-Ant-Design-Vue'
    }
  },
  runtimeConfig: {
    public: envData
  },
  devtools: {
    enabled: true
  }
});
