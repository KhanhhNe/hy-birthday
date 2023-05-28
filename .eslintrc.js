module.exports = {
  extends: [
    "universe",
    "universe/shared/typescript-analysis",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
  ],
  plugins: ["prettier", "import"],
  rules: {
    "import/order": "off",
    "prettier/prettier": ["error", { semi: false }],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
}
