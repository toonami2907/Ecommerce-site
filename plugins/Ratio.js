// plugins/aspectRatio.js
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addUtilities, theme }) {
  const aspectRatioUtilities = theme('aspectRatio');

  const utilities = Object.entries(aspectRatioUtilities).map(([name, value]) => ({
    [`.aspect-${name}`]: {
      position: 'relative',
      paddingTop: value,
    },
    [`.aspect-${name} > *`]: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
    },
  }));

  addUtilities(utilities);
}, {
  theme: {
    aspectRatio: {
      'square': '100%',
      '16/9': '56.25%',
      '4/3': '75%',
      '3/2': '66.666667%',
      '8/5': '62.5%',
      // Add more aspect ratios as needed
    },
  },
});
