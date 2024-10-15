import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRndmColor]',
})
export class RndmColorDirective {
  constructor(private ref: ElementRef) {}
  randomColor(): string {
    const color1: number = Math.floor(Math.random() * 256);
    const color2: number = Math.floor(Math.random() * 256);
    const color3: number = Math.floor(Math.random() * 256);
    const rndmColor: string = `rgb(${color1} ${color2} ${color3} / 0.75 )`;
    return rndmColor;
  }
  ngOnInit() {
    this.ref.nativeElement.style.backgroundColor = this.randomColor();
  }
}
