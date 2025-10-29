/**
 * COLOR UTILITY FUNCTIONS
 * Helper functions for generating gradients and Tailwind classes
 * from database color values
 */

/**
 * Convert HEX color to RGB
 * @param hex - HEX color string (e.g., "#962727")
 * @returns RGB object { r, g, b }
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to HEX
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns HEX string
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Adjust color brightness
 * @param hex - HEX color string
 * @param percent - Percentage to adjust (-100 to 100, negative = darker)
 * @returns Adjusted HEX color
 */
function adjustBrightness(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const factor = percent / 100;
  const r = Math.max(0, Math.min(255, rgb.r + rgb.r * factor));
  const g = Math.max(0, Math.min(255, rgb.g + rgb.g * factor));
  const b = Math.max(0, Math.min(255, rgb.b + rgb.b * factor));

  return rgbToHex(r, g, b);
}

/**
 * Generate radial gradient CSS from primary color
 * Creates a 6-stop radial gradient matching the design pattern:
 * radial-gradient(ellipse at center top, color1 0%, color2 20%, ...)
 * 
 * @param primaryColor - HEX color (e.g., "#962727")
 * @returns CSS radial-gradient string
 */
export function generateRadialGradient(primaryColor: string): string {
  // Generate 6 stops with decreasing brightness
  const stops = [
    { percent: 0, brightness: 0 },      // Original color
    { percent: 20, brightness: -15 },   // Slightly darker
    { percent: 40, brightness: -30 },   // Darker
    { percent: 60, brightness: -40 },   // Even darker
    { percent: 80, brightness: -60 },   // Much darker
    { percent: 100, brightness: -75 },  // Very dark
  ];

  const gradientStops = stops
    .map(({ percent, brightness }) => {
      const color = adjustBrightness(primaryColor, brightness);
      return `${color} ${percent}%`;
    })
    .join(', ');

  return `radial-gradient(ellipse at center top, ${gradientStops})`;
}

/**
 * Generate Tailwind glow classes from glow color name
 * @param glowColor - Tailwind color name (e.g., "red", "blue")
 * @returns Object with Tailwind class strings
 */
export function generateGlowClasses(glowColor: string) {
  return {
    outerGlowFrom: `from-${glowColor}-500/50`,
    outerGlowVia: `via-${glowColor}-600/40`,
    outerGlowTo: `to-zinc-900/50`,
    borderColor: `border-${glowColor}-900/20`,
    hoverShadow: `shadow-${glowColor}-500/40`,
  };
}

/**
 * Get color intensity variations for hover effects
 * @param glowColor - Tailwind color name
 * @returns Object with intensity variations
 */
export function getColorVariations(glowColor: string) {
  return {
    light: `${glowColor}-500`,
    medium: `${glowColor}-600`,
    dark: `${glowColor}-900`,
  };
}

