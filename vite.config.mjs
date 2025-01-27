import { defineConfig, loadEnv } from 'vite'

import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint';
import path from 'path';

export default () => {
    return defineConfig(
        {
            plugins: [
                react(),
                // eslint({
                //   include: ['./src/**/*.{js,jsx,ts,tsx}'],
                //   failOnError: false,
                //   exclude: ['./node_modules']
                // })
            ],
            server: {
                open: '/',
                port: 3000,
            },
            resolve: {
                alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
            },
        }
    )
}