import { type UserConfig } from "@commitlint/types";

export default {
  // Use the conventional commit rules as a base.
  extends: ["@commitlint/config-conventional"],
  prompt: {
    questions: {
      type: {
        enum: {
          // Add a space to a few common types for better alignment.
          build: {
            emoji: "🛠️ ", // The extra space fixes the alignment.
          },
          chore: {
            emoji: "♻️ ",
          },
          ci: {
            emoji: "⚙️ ",
          },
          revert: {
            emoji: "🗑️ ",
          },
        },
      },
    },
  },
} satisfies UserConfig;
