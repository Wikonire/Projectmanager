import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnChanges {
  @Input() data: string = '';
  @Input() truncateSize: number = 1;
  public convertedData: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {
    marked.setOptions({
      breaks: false,
      gfm: false
    });
  }

  ngOnChanges(): void {
    let processedData = this.data || '';
    if (this.truncateSize > 0) {
      const line = processedData.split('\n');
      processedData = line.slice(0, this.truncateSize).join('\n');
      processedData = [processedData, '...'].join('');
    }
    const rawHtml = marked.parse(processedData) as string;
    const cleanHtml = DOMPurify.sanitize(rawHtml); // Entfernt XSS
    this.convertedData = this.sanitizer.bypassSecurityTrustHtml(cleanHtml);
  }
}
