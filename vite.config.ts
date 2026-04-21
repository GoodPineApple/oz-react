import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});

// React Compiler 사용하지 않을 때
// import react from "@vitejs/plugin-react";
// export default defineConfig({
//   plugins: [react()],
// });
