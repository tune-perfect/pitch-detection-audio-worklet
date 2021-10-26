// eslint-disable-next-line @typescript-eslint/no-empty-function
function TextDecoder() {}

TextDecoder.prototype.decode = function (octets) {
  if (octets === undefined) return;
  var string = '';
  var i = 0;
  while (i < octets.length) {
    var octet = octets[i];
    var bytesNeeded = 0;
    var codePoint = 0;
    if (octet <= 0x7f) {
      bytesNeeded = 0;
      codePoint = octet & 0xff;
    } else if (octet <= 0xdf) {
      bytesNeeded = 1;
      codePoint = octet & 0x1f;
    } else if (octet <= 0xef) {
      bytesNeeded = 2;
      codePoint = octet & 0x0f;
    } else if (octet <= 0xf4) {
      bytesNeeded = 3;
      codePoint = octet & 0x07;
    }
    if (octets.length - i - bytesNeeded > 0) {
      var k = 0;
      while (k < bytesNeeded) {
        octet = octets[i + k + 1];
        codePoint = (codePoint << 6) | (octet & 0x3f);
        k += 1;
      }
    } else {
      codePoint = 0xfffd;
      bytesNeeded = octets.length - i;
    }
    string += String.fromCodePoint(codePoint);
    i += bytesNeeded + 1;
  }
  return string;
};
