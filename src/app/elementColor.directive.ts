import { HostListener } from '@angular/core';
import { ElementRef, Input, Renderer2 } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[element-color]',
})
export class ElementColorDirective {
  @Input('element-color') BgColor: string = 'blue';
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    //this.setBgColor(this.BgColor);
  }

  setBgColor(color: string) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'backgroundColor',
      color
    );
  }

  /*@HostListener('mouseenter')
  onMouseEnter() {
    this.setBgColor('green');
  }

  @HostListener('mouseleave1')
  onMouseLeave() {
    this.setBgColor('white');
  }*/

  @HostListener('mousedown')
  onMouseDown() {
    this.elementRef.nativeElement.style.backgroundColor = this.BgColor;
    //this.setBgColor('white');
    //this.setBgColor(this.BgColor);
  }
}
