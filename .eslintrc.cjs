module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/recommended-requiring-type-checking", "plugin:react/recommended", "plugin:prettier/recommended", "prettier", "airbnb/hooks", "plugin:react-hooks/recommended", "plugin:import/typescript", "plugin:sonarjs/recommended", "plugin:jsx-a11y/recommended", "plugin:storybook/recommended", "plugin:storybook/recommended", "plugin:jest/recommended"],
  "plugins": ["import", "custom-rules", "react", "@typescript-eslint", "prettier", "import", "clean-code", "i18next", "jest"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
    "tsconfigRootDir": __dirname,
    "project": ["./tsconfig.json"]
  },
  "rules": {
    "i18next/no-literal-string": "error",
    "custom-rules/check-i18n-keys": 'error',
    "react/jsx-no-bind": [
      "error",
      {
        "ignoreRefs": false,
        "allowArrowFunctions": false,
        "allowFunctions": false,
        "allowBind": false,
        "ignoreDOMComponents": true,
      },
    ],
    "import/no-unresolved": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "linebreak-style": "off",
    "no-console": "error",
    "prettier/prettier": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", {
      "varsIgnorePattern": "^React$"
    }],
    "react-hooks/exhaustive-deps": "warn",
    "prefer-destructuring": "off",
    "no-negated-condition": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "no-implicit-coercion": "warn",
    "prefer-const": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/restrict-plus-operands": "warn",
    "padding-line-between-statements": "warn",
    "camelcase": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/naming-convention": "off",
    "no-extra-boolean-cast": "off",
    "capitalized-comments": "off",
    "arrow-parens": "off",
    "arrow-body-style": "off",
    "@typescript-eslint/no-implied-eval": "off",
    "operator-linebreak": "off",
    "no-mixed-operators": "warn",
    "no-lonely-if": "warn",
    "no-multi-assign": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "no-promise-executor-return": "warn",
    "no-useless-concat": "warn",
    "@typescript-eslint/no-misused-promises": "warn",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "import/no-cycle": "error",

    "import/order": ["warn", { // change to error when all requests merged
      "groups": ["builtin", "external", "internal", ["parent", "sibling"], "index"],
      "pathGroups": [
        {
          "pattern": "*hook*",
          "group": "parent",
          "position": "before"
        },
        {
          "pattern": "*style*",
          "group": "index",
          "position": "after"
        }
      ],
      "pathGroupsExcludedImportTypes": [],
      "newlines-between": "always",
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true
      }
    }]
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "node": {
        "paths": ["src"],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "overrides": [
    {
      "files": ["eslint-custom-rules/**/*.js"],
      "excludedFiles": "*",
      "parserOptions": {
        "project": null
      },
      "rules": {
        "@typescript-eslint/*": "off"
      }
    }
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest/globals": true
  }
};