import { Injectable } from '@angular/core';
import {Project} from '../interfaces/project.model';

@Injectable({
  providedIn: 'root'
})
export class PriorityColorService {

  constructor() { }
  public uniquePriorities: string[] = [];

  getPriorityColors(projects: Project[]): Record<string, string> {
    if (projects.length === 0) {}
    // @ts-ignore
    this.uniquePriorities = [...new Set(projects.map(p => p.priority.name))].sort();

    // Farben automatisch generieren von Rot (wichtig) bis Blau (unwichtig)
    const colorGradient = this.generateColorGradient("#d32f2b", "#1976d2", this.uniquePriorities.length);

    //  Map für die Prioritäten → Farbe
    const priorityColors: Record<string, string> = {};
    this.uniquePriorities.forEach((priority, index) => {
      priorityColors[priority] = colorGradient[index];
    });

    return priorityColors;
  }
  /**
   * Erstellt eine Farbskala zwischen zwei Hex-Farben für `steps` verschiedene Werte.
   */
  generateColorGradient(startColor: string, endColor: string, steps: number): string[] {
    const startRGB = this.hexToRgb(startColor);
    const endRGB = this.hexToRgb(endColor);
    const colors: string[] = [];

    for (let i = 0; i < steps; i++) {
      const r = Math.round(startRGB.r + ((endRGB.r - startRGB.r) * (i / (steps - 1))));
      const g = Math.round(startRGB.g + ((endRGB.g - startRGB.g) * (i / (steps - 1))));
      const b = Math.round(startRGB.b + ((endRGB.b - startRGB.b) * (i / (steps - 1))));
      colors.push(`rgb(${r}, ${g}, ${b})`);
    }
    return colors;
  }

  /**
   * Wandelt eine Hex-Farbe in ein RGB-Objekt um.
   */
  hexToRgb(hex: string): { r: number, g: number, b: number } {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  }
}
