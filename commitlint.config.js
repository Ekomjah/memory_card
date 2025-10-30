export default {
  extends: ["@commitlint/config-conventional"],

  prompt: {
    useEmoji: true,

    alias: {
      fd: "docs: ✏️ Fix typos",
      ft: "test: ✅ Add tests",
    },
    messages: {
      type: "Select the type of change you're committing:",
      customScope: "Select the scope (optional):",
      subject: "Write a short, imperative description:",
    },
    types: [
      { value: "feat", name: "feat: ✨  A new feature" },
      { value: "fix", name: "fix: 🐛  A bug fix" },
      { value: "docs", name: "docs: 📝  Documentation only changes" },
      {
        value: "style",
        name: "style: 💅  Code style changes (formatting, etc.)",
      },
      { value: "refactor", name: "refactor: ♻️  Code refactoring" },
      { value: "perf", name: "perf: ⚡️  Performance improvement" },
      { value: "test", name: "test: ✅  Adding or updating tests" },
      { value: "chore", name: "chore: 🔧  Build process or auxiliary tools" },
      { value: "revert", name: "revert: ⏪  Revert a previous commit" },
    ],
  },
};
