import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base JS rules
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node,  //  Node globals (process, __dirname, etc.)
        ...globals.es2021,
      },
    },
  },

  // TypeScript rules with type checking
  ...tseslint.configs.recommendedTypeChecked,  //  stronger than recommended

  // Type-aware linting requires tsconfig
  {
    languageOptions: {
      parserOptions: {
        project: true,           // uses your tsconfig.json
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Custom rules
  {
    rules: {
      "no-console": "warn",
      "no-unused-vars": "off",                        // turn off base rule
      "@typescript-eslint/no-unused-vars": "error",   // use TS version instead
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-floating-promises": "error",  // catches missing await
    },
  },

  // Ignore build output
  {
    ignores: ["dist/**", "node_modules/**", "*.js"],
  },
]);