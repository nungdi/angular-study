import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() highlightColor: string;

  constructor(private el: ElementRef) {
    //el.nativeElement.style.backgroundColor = '#eefddd';
  }

  @HostListener('mouseenter')
  MouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.highlightColor;
  }
  @HostListener('mouseleave')
  MouseLeave() {
    this.el.nativeElement.style.backgroundColor = null;
  }
}
