const dark = {
  bg: {
    primary: "#003CC8",
    secondary: "#004CFF",
    darkPrimary: "#18181b",
    dark: "#313134",
    black: "#131314",
  },
  text: {
    primary: "#fff",
    secondary: "#6a6a70",
  },
};

const defaultTheme = {
  fontSizes: [
    "14px", // 0
    "16px", // 1
    "18px", // 2
    "22px", // 3
    "26px", // 4
    "32px", // 5
    "12px", // 6
  ],
  fontWeights: {
    body: 400,
    subheading: 500,
    link: 600,
    bold: 700,
    heading: 800,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.3,
    code: 1.6,
  },
};

export const darkTheme = { ...defaultTheme, ...dark };
