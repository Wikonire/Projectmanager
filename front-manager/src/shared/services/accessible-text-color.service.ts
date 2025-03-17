import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessibleTextColorService {
  /**
   * Berechnet die optimale Schriftfarbe (Schwarz oder Weiß) basierend auf der Hintergrundfarbe.
   * Verwendet die WCAG-Empfehlung für Farbkontrast.
   */
  getAccessibleTextColor(bgColor: string): string {
    const { r, g, b } = this.hexToRgb(bgColor);

    // Helligkeit berechnen nach der W3C-Formel
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Wenn der Hintergrund hell ist, schwarze Schrift (#000), sonst weiße Schrift (#FFF)
    return brightness > 128 ? "#000000" : "#FFFFFF";
  }

  /**
   * Wandelt eine Hex-Farbe in ein RGB-Objekt um.
   */
  private hexToRgb(hex: string): { r: number, g: number, b: number } {
    hex = hex.replace("#", "");

    // Unterstützt Kurzform #RGB → #RRGGBB
    if (hex.length === 3) {
      hex = hex.split("").map(char => char + char).join("");
    }

    const bigint = parseInt(hex, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  }

}
