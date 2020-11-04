module.exports = {
  root: true,
  extends: ['@react-native-community',"prettier"],
  rules: { 
    // indent: ['error', 2],
    quotes: ['error', 'single'],
    // semi: ['error', 'never'],
    // 'sort-keys': ['error', 'asc', { caseSensitive: true, natural: false }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
