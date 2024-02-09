const PRIMARY = {
  light: 'rgba(68, 14, 102, 0.1)',
  main: '#440E66',
};
const SECONDARY = {
  main: '#32CD32',
};
const INFO = {
  main: '#616161',
};
const WARNING = {
  light : "#ff9800",
  main: '#C53E4E',
};
const ERROR = {
  light: '#ef5350',
  main: '#C53E4E',
};
const BACKGROUND = {
  paper : "#fff",
  paper1 : "#F3F3F3"
}
const BACKGROUNDCOLOR = {
  paper : "White",
  paper1 : "#F3F3F3"
}

const COMMON = {
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  warning: { ...WARNING, contrastText: '#fff' },
  error: { ...ERROR, contrastText: '#fff' },
  background:  BACKGROUND,
  backgroundColor: BACKGROUNDCOLOR,
};

const palette = {
    ...COMMON,
    mode: 'light',
    text: {
       primary: "#616161",
       secondary: "rgba(39,30,74,0.9)",
       error:"#C53E4E"
      },
} as const;

export default palette;
