/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css,scss}"],
  theme: {
    colors: {
      white: '#ffffff',
      default: {
        error: '#FB2047',
        success: '#2BC128'
      },
      primary: {
        light: '#30A9A6'
      },
      red: {
        30: '#FF98AB',
        60: '#FB2047'
      },
      neutral: {
        100: '#15171F',
        80:'#454A5F',
        60: '#737992',
        50: '#8C92AB',
        40: '#A6ACC4',
        30: '#C1C7DE',
        10: '#F0F2F6'
      },
      orange: {
        10: '#FFD9C8',
        40: '#E88A5F',
        60: '#E26D37'
      },
      teal: {
        10: '#D6EEED',
        30: '#97D4D2',
        50: '#53B7B5',
        70: '#288D8A'
      },
      black: '#000000',
      transparent: 'transparent'
    },
    extend: {
      boxShadow: {
        'InputBorder': '0px 0px 0px 1px #CDD1DC',
        'medium': '0px 10px 30px 3px rgba(5, 16, 55, 0.15)',
        'card': '0px 11px 20px rgba(5, 16, 55, 0.1)',
        'dropdown': '0px 2px 6px rgba(0, 0, 0, 0.4)',
        'xSmall': '0px 2px 6px rgba(5, 16, 55, 0.1)'
      },
      fontFamily: {
        primary: ['Roboto', 'sans-serif']
      },
      fontSize: {
        '22px': ['22px', '32px']
      }
    },
  },
  plugins: [],
}
