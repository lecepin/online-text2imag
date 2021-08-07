const sharp = require("sharp");
const path = require('path');
const Text2SVG = require("text-to-svg");

exports.handler = (event, context, callback) => {
  const qs = event.queryStringParameters || {};

  qs.width = qs.width || 100;
  qs.height = qs.height || 100;
  qs.r = qs.r || 255;
  qs.g = qs.g || 255;
  qs.b = qs.b || 255;
  qs.a = qs.a || 1;
  qs.text = qs.text || '';
  qs.fColor = qs.fColor || '#000';
  qs.fSize = qs.fSize || 20;
  qs.fTop = qs.fTop || 0;
  qs.fLeft = qs.fLeft || 0;

  if (!qs.text) {
    return callback(null, {
      statusCode: 200,
      headers: { "content-type": "text/html;charset=utf-8" },
      body: '(●’◡’●)ﾉ',
    });
  }

  const text2SVG = Text2SVG.loadSync(path.join(__dirname, "f1.ttf"));
  const svg = Buffer.from(
    text2SVG.getSVG(qs.text, {
      fontSize: qs.fSize,
      anchor: "top",
      attributes: { fill: qs.fColor },
    })
  );
  sharp({
    create: {
      width: +qs.width,
      height: +qs.height,
      channels: 4,
      background: { r: +qs.r, g: +qs.g, b: +qs.b, alpha: +qs.a },
    },
  }).composite([
    {
      input: svg,
      top: +qs.fTop,
      left: +qs.fLeft,
    }
  ])
    .png()
    .toBuffer()
    .then((data) => {
      callback(null, {
        isBase64Encoded: true,
        statusCode: 200,
        headers: { "content-type": "image/png" },
        body: data.toString("base64"),
      });
    });
};
