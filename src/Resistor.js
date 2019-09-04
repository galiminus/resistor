import React, { useRef, useEffect } from 'react';

const digitMapping = {
  "0": "black",
  "1": "brown",
  "2": "red",
  "3": "orange",
  "4": "yellow",
  "5": "green",
  "6": "blue",
  "7": "violet",
  "8": "gray",
  "9": "white",
}

const multiplierMapping = {
  1:        "black",
  10:       "brown",
  100:      "red",
  1000:     "orange",
  10000:    "yellow",
  100000:   "green",
  1000000:  "blue",
  10000000: "violet",
  0.1:      "gold",
  0.01:     "silver",
}

const colorsConfig = {
  black: { background: "#333333", foreground: 'white' },
  brown: { background: "#836953", foreground: 'white' },
  red: { background: "#ff6961", foreground: 'white' },
  orange: { background: "#ff7514", foreground: 'black' },
  yellow: { background: "#fdfd96", foreground: 'black' },
  green: { background: "#77dd77", foreground: 'black' },
  blue: { background: "#3065ac", foreground: 'white' },
  violet: { background: "#cb99c9", foreground: 'black' },
  gray: { background: "#b6afac", foreground: 'black' },
  white: { background: "#f4f1d6", foreground: 'black' },
  gold: { background: "#ffc300", foreground: 'black' },
  silver: { background: "#c2bdb0", foreground: 'black' },
}

function resistorValueToColors(value, multipler) {
  let colors = [];

  [...value.toString()].forEach((digit) => {
    colors.push(digitMapping[digit]);
  });
  colors.push(multiplierMapping[multipler])
  return (colors);
}

function Resistor({ width, value, multiplier, pinWidth = 50, strokeWidth = 3, radius = 60, outAngle = 0.2, stripeWidth = 25, stripeGap = 25 }) {
  const canvasRef = useRef(null)
  const bodyWidth = width - pinWidth * 2;

  const [firstColor, ...otherColors] = resistorValueToColors(value, multiplier);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = strokeWidth;
    ctx.fillStyle = '#fff';

    ctx.beginPath();
    ctx.strokeStyle = '#333';

    ctx.arc(pinWidth + radius + strokeWidth + stripeWidth, radius + strokeWidth, radius, Math.PI * (2.5 - outAngle), Math.PI / 2, false);
    ctx.arc(pinWidth + radius + strokeWidth, radius + strokeWidth, radius, Math.PI * 0.5, Math.PI, false);
    ctx.arc(pinWidth + radius + strokeWidth, radius + strokeWidth, radius, Math.PI, Math.PI * 1.5, false);
    ctx.arc(pinWidth + radius + strokeWidth + stripeWidth, radius + strokeWidth, radius, Math.PI * 1.5, Math.PI * (1.5 + outAngle), false);

    ctx.arc(pinWidth + bodyWidth - (radius + strokeWidth + stripeWidth), radius + strokeWidth, radius, Math.PI * (1.5 - outAngle), Math.PI * 1.5, false);
    ctx.arc(pinWidth + bodyWidth - (radius + strokeWidth), radius + strokeWidth, radius, Math.PI * 1.5, Math.PI * 2, false);
    ctx.arc(pinWidth + bodyWidth - (radius + strokeWidth), radius + strokeWidth, radius, Math.PI * 2, Math.PI * 0.5, false);
    ctx.arc(pinWidth + bodyWidth - (radius + strokeWidth + stripeWidth), radius + strokeWidth, radius, Math.PI * 0.5, Math.PI * (0.5 + outAngle), false);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(pinWidth + strokeWidth, (radius - strokeWidth) * 2, pinWidth, Math.PI , Math.PI * 1.5, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(pinWidth + bodyWidth - strokeWidth, (radius - strokeWidth) * 2, pinWidth, 0 , Math.PI * 1.5, true);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.font = "bold 20px 'Major Mono Display', monospace";

    ctx.fillStyle = colorsConfig[firstColor].background;
    ctx.fillRect(pinWidth + radius + strokeWidth, strokeWidth, stripeWidth, radius * 2);
    ctx.rect(pinWidth + radius + strokeWidth, strokeWidth, stripeWidth, radius * 2);

    ctx.fillStyle = colorsConfig[firstColor].foreground;
    ctx.fillText(firstColor[0], pinWidth + radius + strokeWidth + stripeWidth / 2 - 7,  strokeWidth + radius + 10);

    otherColors.forEach((color, index) => {
      const rectX = pinWidth + radius * 2 + (stripeGap + stripeWidth) * index + strokeWidth * 2;
      const rectY = strokeWidth + Math.sin(outAngle) * radius;
      const rectWidth = stripeWidth;
      const rectHeight = radius * 2 - Math.sin(outAngle) * radius * 2;

      ctx.fillStyle = colorsConfig[color].background;
      ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
      ctx.rect(rectX, rectY, stripeWidth, rectHeight);
      ctx.stroke();

      ctx.fillStyle = colorsConfig[color].foreground;
      ctx.fillText(color[0], rectX + rectWidth / 2 - 7,  rectY + rectHeight / 2 + 10);
    });

    ctx.stroke();

  })

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={(radius + strokeWidth) * 2}
      onClick={e => {
      }}
    />
  );
}

export default Resistor;
