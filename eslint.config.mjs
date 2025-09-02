import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    // Add rules configuration here
    rules: {
      "react/no-unescaped-entities": "off", // Disable apostrophe rule
      "@typescript-eslint/no-explicit-any": "off", // Disable any type rule
      "@typescript-eslint/no-unused-vars": "warn", // Change unused vars to warning only
      "prefer-const": "off", // Add this to disable prefer-const errors
      "@typescript-eslint/no-unused-expressions": "off", // Add this
    },
  },
];

export default eslintConfig;
