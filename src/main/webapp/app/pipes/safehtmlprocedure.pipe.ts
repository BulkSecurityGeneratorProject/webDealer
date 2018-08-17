import {Pipe} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'safeHTMLProcedure'})
export class SafeHtmlProcedurePipe {

    constructor(private sanitizer: DomSanitizer) {
    }

    transform(style) {
        return this.sanitizer.bypassSecurityTrustHtml(style);
    }
}
