import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective {

    constructor(private el: ElementRef) {
        this.el.nativeElement.style.backgroundColor = 'green';
    }
}