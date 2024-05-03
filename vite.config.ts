import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
    // Load app-level env vars to node-level env vars.
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        resolve: {
            alias: [
                { find: "@", replacement: path.resolve(__dirname, "src") }
            ]
        },
        plugins: [
            react()
        ],
        define: {
            'process.env': {},
            APP_VERSION: JSON.stringify(process.env.npm_package_version),
        }
    })
}
