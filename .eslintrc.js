// 根据环境设置error等级
// 2-error，1-warning，0-off
const level = process.env.NODE_ENV === 'production' ? 1 : 0;

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'eslint-config-tencent',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    createDefaultProgram: true,
  },
  rules: {
    'no-console': level,
    'no-debugger': level,
    'no-param-reassign': 0,
    'no-underscore-dangle': "off",
    'no-useless-escape': "off",
    'no-restricted-syntax': "off",
    'no-empty': "off",
  },
  overrides: [
    {
      files: ['**/__tests__/*.js', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
