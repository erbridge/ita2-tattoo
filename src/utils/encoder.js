export const BITS = {
  NULL: [0, 0, 0, 0, 0],

  LETTERS: {
    '\r': [0, 0, 0, 1, 0],
    '\n': [0, 1, 0, 0, 0],
    ' ': [0, 0, 1, 0, 0],
    q: [1, 1, 1, 0, 1],
    w: [1, 1, 0, 0, 1],
    e: [1, 0, 0, 0, 0],
    r: [0, 1, 0, 1, 0],
    t: [0, 0, 0, 0, 1],
    y: [1, 0, 1, 0, 1],
    u: [1, 1, 1, 0, 0],
    i: [0, 1, 1, 0, 0],
    o: [0, 0, 0, 1, 1],
    p: [0, 1, 1, 0, 1],
    a: [1, 1, 0, 0, 0],
    s: [1, 0, 1, 0, 0],
    d: [1, 0, 0, 1, 0],
    f: [1, 0, 1, 1, 0],
    g: [0, 1, 0, 1, 1],
    h: [0, 0, 1, 0, 1],
    j: [1, 1, 0, 1, 0],
    k: [1, 1, 1, 1, 0],
    l: [0, 1, 0, 0, 1],
    z: [1, 0, 0, 0, 1],
    x: [1, 0, 1, 1, 1],
    c: [0, 1, 1, 1, 0],
    v: [0, 1, 1, 1, 1],
    b: [1, 0, 0, 1, 1],
    n: [0, 0, 1, 1, 0],
    m: [0, 0, 1, 1, 1],
  },

  FIGURES: {
    '\r': [0, 0, 0, 1, 0],
    '\n': [0, 1, 0, 0, 0],
    ' ': [0, 0, 1, 0, 0],
    '1': [1, 1, 1, 0, 1],
    '2': [1, 1, 0, 0, 1],
    '3': [1, 0, 0, 0, 0],
    '4': [0, 1, 0, 1, 0],
    '5': [0, 0, 0, 0, 1],
    '6': [1, 0, 1, 0, 1],
    '7': [1, 1, 1, 0, 0],
    '8': [0, 1, 1, 0, 0],
    '9': [0, 0, 0, 1, 1],
    '0': [0, 1, 1, 0, 1],
    '-': [1, 1, 0, 0, 0],
    "'": [1, 0, 1, 0, 0],
    '!': [1, 0, 1, 1, 0],
    '&': [0, 1, 0, 1, 1],
    '£': [0, 0, 1, 0, 1],
    '(': [1, 1, 1, 1, 0],
    ')': [0, 1, 0, 0, 1],
    '+': [1, 0, 0, 0, 1],
    '/': [1, 0, 1, 1, 1],
    ':': [0, 1, 1, 1, 0],
    '=': [0, 1, 1, 1, 1],
    '?': [1, 0, 0, 1, 1],
    ',': [0, 0, 1, 1, 0],
    '.': [0, 0, 1, 1, 1],
  },

  SHIFTS: {
    FIGURES: [1, 1, 0, 1, 1],
    LETTERS: [1, 1, 1, 1, 1],
  },
};

class Encoder {
  static encode(text) {
    text = text.toLowerCase();

    let encodedBitSets;
    let mode;

    if (BITS.FIGURES[text[0]] === undefined) {
      encodedBitSets = [BITS.SHIFTS.LETTERS];
      mode = 'LETTERS';
    } else {
      encodedBitSets = [BITS.SHIFTS.FIGURES];
      mode = 'FIGURES';
    }

    `\r\n${text}\r\n`.split('').forEach(char => {
      let bits = BITS[mode][char];
      let newMode;

      if (bits === undefined) {
        newMode = mode === 'LETTERS' ? 'FIGURES' : 'LETTERS';

        bits = BITS[newMode][char];
      }

      if (bits === undefined) {
        encodedBitSets.push(BITS.NULL);

        return;
      }

      if (newMode) {
        encodedBitSets.push(BITS.SHIFTS[newMode]);

        mode = newMode;
      }

      encodedBitSets.push(bits);
    });

    return encodedBitSets;
  }
}

export default Encoder;
