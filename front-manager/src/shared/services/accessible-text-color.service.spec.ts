import { AccessibleTextColorService } from './accessible-text-color.service';

describe('AccessibleTextColorService', () => {
  let service: AccessibleTextColorService;

  beforeEach(() => {
    service = new AccessibleTextColorService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAccessibleTextColor', () => {

    it('should return black (#000000) for light background colors', () => {
      expect(service.getAccessibleTextColor('#FFFFFF')).toBe('#000000'); // Weißer Hintergrund
      expect(service.getAccessibleTextColor('#DDDDDD')).toBe('#000000'); // Heller Grauton
      expect(service.getAccessibleTextColor('#FFFF99')).toBe('#000000'); // Helles Gelb
    });

    it('should return white (#FFFFFF) for dark background colors', () => {
      expect(service.getAccessibleTextColor('#000000')).toBe('#FFFFFF'); // Schwarzer Hintergrund
      expect(service.getAccessibleTextColor('#333333')).toBe('#FFFFFF'); // Dunkler Grauton
      expect(service.getAccessibleTextColor('#990000')).toBe('#FFFFFF'); // Dunkelrot
    });

    it('should handle exact threshold color correctly', () => {
      expect(service.getAccessibleTextColor('#808080')).toBe('#FFFFFF'); // Mittelgrau, oft Grenzfall
    });

    it('should handle malformed hex values gracefully', () => {
      expect(() => service.getAccessibleTextColor('#GGGGGG')).toThrowError();
      expect(() => service.getAccessibleTextColor('#FFF')).not.toThrowError(); // Kurzform sollte funktionieren
    });
  });

  describe('hexToRgb', () => {
    it('should correctly convert hex to RGB values', () => {
      expect(service['hexToRgb']('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
      expect(service['hexToRgb']('#000000')).toEqual({ r: 0, g: 0, b: 0 });
      expect(service['hexToRgb']('#FF5733')).toEqual({ r: 255, g: 87, b: 51 });
    });

    it('should correctly handle shorthand hex codes', () => {
      expect(service['hexToRgb']('#FFF')).toEqual({ r: 255, g: 255, b: 255 });
      expect(service['hexToRgb']('#000')).toEqual({ r: 0, g: 0, b: 0 });
      expect(service['hexToRgb']('#F33')).toEqual({ r: 255, g: 51, b: 51 });
    });

    it('should throw an error for invalid hex codes', () => {
      expect(() => service['hexToRgb']('#XYZXYZ')).toThrowError();
      expect(() => service['hexToRgb']('#ZZZZZZ')).toThrowError();
    });
  });
});
