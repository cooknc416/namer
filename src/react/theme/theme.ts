const SPACING_BASE = 8;

interface Color {
  type: string;
  values: Array<any>;
}

/**
 * Returns a number whose value is limited to the given range.
 */
const clamp = (value: number, min = 0, max = 1): number => {
  return Math.min(Math.max(min, value), max);
};

/**
 * Converts a color from CSS hex format to CSS rgb format.
 */
export const hexToRgb = (color: string): string => {
  const subColor = color.substr(1);

  const re = new RegExp(`.{1,${subColor.length >= 6 ? 2 : 1}}`, 'g');
  let colors = subColor.match(re);

  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }

  return colors
    ? `rgb${colors.length === 4 ? 'a' : ''}(${colors
      .map((n, index) => {
        return index < 3 ? parseInt(n, 16) : Math.round((parseInt(n, 16) / 255) * 1000) / 1000;
      })
      .join(', ')})`
    : '';
};

/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values.
 */
export const decomposeColor = (color: string): Color => {
  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color));
  }

  const marker = color.indexOf('(');
  const type = color.substring(0, marker);

  if (['rgb', 'rgba', 'hsl', 'hsla'].indexOf(type) === -1) {
    throw new Error(
      'Only the following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla().'
    );
  }

  const values = color.substring(marker + 1, color.length - 1).split(',');
  const newValues = values.map((value) => parseFloat(value));

  return {
    type,
    values: newValues
  };
};

/**
 * Converts a color object with type and values to a string.
 */
export const recomposeColor = (color: Color): string => {
  const {
    type 
  } = color;
  let {
    values 
  } = color;

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map((n, i) => (i < 3 ? parseInt(n as unknown as string, 10) : n));
  } else if (type.indexOf('hsl') !== -1) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }

  return `${type}(${values.join(', ')})`;
};

const intToHex = (int: number): string => {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

/**
 * Converts a color from hsl format to rgb format.
 */
export const hslToRgb = (color: string): string => {
  const decompColor = decomposeColor(color);
  const {
    values
  } = decompColor;
  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  let type = 'rgb';
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];

  if (decompColor.type === 'hsla') {
    type += 'a';
    rgb.push(values[3]);
  }

  return recomposeColor({
    type,
    values: rgb 
  });
};

/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 */
export const getLuminance = (color: string): number => {
  const decompColor = decomposeColor(color);

  let rgb = decompColor.type === 'hsl' ? decomposeColor(hslToRgb(color)).values : decompColor.values;
  rgb = rgb.map((val) => {
    const subVal = val / 255; // normalized
    return subVal <= 0.03928 ? subVal / 12.92 : ((subVal + 0.055) / 1.055) ** 2.4;
  });

  // Truncate at 3 digits
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
};

/**
 * Converts a color from CSS rgb format to CSS hex format.
 */
export const rgbToHex = (color: string): string => {
  // Idempotent
  if (color.indexOf('#') === 0) {
    return color;
  }

  const {
    values 
  } = decomposeColor(color);
  return `#${values.map((n) => intToHex(n)).join('')}`;
};

/**
 * Calculates the contrast ratio between two colors.
 */
export const getContrastRatio = (foreground: string, background: string): number => {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
};

/**
 * Darkens a color.
 */
export const darken = (color: string, coefficient: number): string => {
  const decompColor = decomposeColor(color);
  const clampedCoefficient = clamp(coefficient);

  if (decompColor.type.indexOf('hsl') !== -1) {
    decompColor.values[2] *= 1 - clampedCoefficient;
  } else if (decompColor.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      decompColor.values[i] *= 1 - clampedCoefficient;
    }
  }
  return recomposeColor(decompColor);
};

/**
 * Lightens a color.
 */
export const lighten = (color: string, coefficient: number): string => {
  const decompColor = decomposeColor(color);
  const clampedCoefficient = clamp(coefficient);

  if (decompColor.type.indexOf('hsl') !== -1) {
    decompColor.values[2] += (100 - decompColor.values[2]) * clampedCoefficient;
  } else if (decompColor.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      decompColor.values[i] += (255 - decompColor.values[i]) * clampedCoefficient;
    }
  }

  return recomposeColor(decompColor);
};

/**
 * Darken or lighten a color, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 */
export const emphasize = (color: string, coefficient = 0.15): string => {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
};

/**
 * Set the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 */
export const fade = (color: string, value: number) => {
  const decompColor = decomposeColor(color);
  const clampedValue = clamp(value);

  if (decompColor.type === 'rgb' || decompColor.type === 'hsl') {
    decompColor.type += 'a';
  }
  decompColor.values[3] = clampedValue;

  return recomposeColor(decompColor);
};

export interface Theme {
  shapes: {
    borderRadius: number;
  }
  palette: {
    [key: string]: any;
  };
  spacing: (multiplier: number) => number;
  darken: (color: string, coefficient: number) => string;
  lighten: (color: string, coefficient: number) => string;
  fade: (color: string, coefficient: number) => string;
}

export const theme: Theme = {
  shapes: {
    borderRadius: 1
  },
  palette: {
    background: {
      main: '#293241',
      secondary: '#3D5A80'
    },
    text: {
      primary: '#E0FBFC',
      seoncary: '#98C1D9'
    },
    primary: '#E0FBFC',
    secondary: '#98C1D9',
    danger: '#EE6C4D'
  },
  spacing: (multiplier: number): number => SPACING_BASE * multiplier,
  darken,
  lighten,
  fade
};
