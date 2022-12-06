import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHeader20]',
})
export class Header20Directive {
  constructor(private elemento: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.renderer.setStyle(this.elemento.nativeElement, 'font-size', '20px');
  }
}
