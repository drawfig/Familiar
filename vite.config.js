import {defineConfig} from "vite";
import path from "path";

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "./lib/familiar.js"),
            name: "Familiar",
            fileName: (format) => `familiar.${format}.js`,
        }
    }
});