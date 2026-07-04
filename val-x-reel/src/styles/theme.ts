export const theme = {
  colors: {
    primary: '#00FF41',
    secondary: '#0D1117',
    accent: '#FF6600',
    white: '#FFFFFF',
    gray: '#C9D1D9',
    darkGray: '#161B22',
    valxBlue: '#0066FF',
    valxGreen: '#00FF41',
    valxOrange: '#FF6600',
    red: '#FF0000',
    purple: '#A855F7',
  },
  fonts: {
    heading: 'Montserrat-Bold',
    body: 'Montserrat-Regular',
    mono: 'VT323',
  },
  fps: 30,
  width: 1080,
  height: 1920,
  scenes: [
    { name: 'Hook', duration: 8, frames: 240 },
    { name: 'Problem', duration: 12, frames: 360 },
    { name: 'Solution', duration: 15, frames: 450 },
    { name: 'Services', duration: 20, frames: 600 },
    { name: 'Impact', duration: 15, frames: 450 },
    { name: 'CTA', duration: 15, frames: 450 },
    { name: 'Outro', duration: 5, frames: 150 },
  ],
  totalDuration: 90,
  totalFrames: 2700,
};

export type Theme = typeof theme;
