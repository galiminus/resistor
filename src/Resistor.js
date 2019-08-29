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

function valueToColors(value) {
  let colors = [];

  colors.push(digitMapping[new String(value)[0]]);
  colors.push(digitMapping[new String(value)[1]]);
  colors.push(digitMapping[new String(value)[2]]);

  return (colors);
}

function Resistor({ width, value, strokeWidth = 3, radius = 50, outAngle = 0.2, stripeWidth = 25, stripeGap = 25 }) {
  const canvasRef = useRef(null)

  const [firstColor, ...otherColors] = valueToColors(value);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = strokeWidth;
    ctx.fillStyle = '#fff';

    ctx.beginPath();
    ctx.strokeStyle = '#333';

    ctx.arc(radius + strokeWidth + stripeWidth, radius + strokeWidth, radius, Math.PI * (2.5 - outAngle), Math.PI / 2, false);
    ctx.arc(radius + strokeWidth, radius + strokeWidth, radius, Math.PI * 0.5, Math.PI, false);
    ctx.arc(radius + strokeWidth, radius + strokeWidth, radius, Math.PI, Math.PI * 1.5, false);
    ctx.arc(radius + strokeWidth + stripeWidth, radius + strokeWidth, radius, Math.PI * 1.5, Math.PI * (1.5 + outAngle), false);

    ctx.arc(width - (radius + strokeWidth + stripeWidth), radius + strokeWidth, radius, Math.PI * (1.5 - outAngle), Math.PI * 1.5, false);
    ctx.arc(width - (radius + strokeWidth), radius + strokeWidth, radius, Math.PI * 1.5, Math.PI * 2, false);
    ctx.arc(width - (radius + strokeWidth), radius + strokeWidth, radius, Math.PI * 2, Math.PI * 0.5, false);
    ctx.arc(width - (radius + strokeWidth + stripeWidth), radius + strokeWidth, radius, Math.PI * 0.5, Math.PI * (0.5 + outAngle), false);
    ctx.closePath();
    ctx.stroke();


    ctx.lineWidth = 1;

    ctx.fillStyle = firstColor;
    ctx.fillRect(radius + strokeWidth, strokeWidth, stripeWidth, radius * 2);
    ctx.rect(radius + strokeWidth, strokeWidth, stripeWidth, radius * 2);

    otherColors.forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(radius * 2 + (stripeGap + stripeWidth) * index + strokeWidth * 2, strokeWidth + Math.sin(outAngle) * radius, stripeWidth, radius * 2 - Math.sin(outAngle) * radius * 2);
      ctx.rect(radius * 2 + (stripeGap + stripeWidth) * index + strokeWidth * 2, strokeWidth + Math.sin(outAngle) * radius, stripeWidth, radius * 2 - Math.sin(outAngle) * radius * 2);
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
