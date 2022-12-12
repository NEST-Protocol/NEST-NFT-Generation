const UR_BG = ['UR']
const SSR_BG = ['SSR', 'SSR2']
const SR_BG = ['SR', 'SR2', 'SR3']

const BODY = [
  'Black Panther', 'Bot', 'Checkerboard', 'Clock', 'Geometry',
  'King', 'Mechanical', 'Shark', 'Space',
]

const Head = [
  'Checkerboard', 'Clock', 'Dinosaurs', 'Pumpkin', 'Pyramid',
  'Shark',
]

const HEADWEAR = [
  'Empty', 'Pipe', 'Smoke', 'Bong', 'Bubble',
  'Chrysanthemum', 'Fine Smoke', 'Whistle', 'Hookah'
]

const getBackground = (kind, index) => {
  if (kind === 'UR') {
    return UR_BG[Math.floor(index % (UR_BG.length * HEADWEAR.length * BODY.length * Head.length) / (HEADWEAR.length * BODY.length * Head.length))]
  } else if (kind === 'SSR') {
    return SSR_BG[Math.floor(index % (SSR_BG.length * HEADWEAR.length * BODY.length * Head.length) / (HEADWEAR.length * BODY.length * Head.length))]
  } else if (kind === 'SR') {
    return SR_BG[Math.floor(index % (SR_BG.length * HEADWEAR.length * BODY.length * Head.length) / (HEADWEAR.length * BODY.length * Head.length))]
  }
}

const getHeadwear = (index) => {
  return HEADWEAR[Math.floor(index % (HEADWEAR.length * BODY.length * Head.length) / (BODY.length * Head.length))];
}

const getHead = (index) => {
  return Head[Math.floor(index % (Head.length * BODY.length) / BODY.length)];
}

const getBody = (index) => {
  return BODY[index % BODY.length];
}

module.exports = {
  getBackground,
  getBody,
  getHead,
  getHeadwear
}