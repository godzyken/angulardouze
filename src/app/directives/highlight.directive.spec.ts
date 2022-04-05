import { TestBed, async, inject } from '@angular/core/testing';
import { ElementRef, Renderer2 } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  let highlightDirective: HighlightDirective;
  let el: ElementRef;
  let renderer: Renderer2;

  it('should create an instance', () => {
    const directive = new HighlightDirective(el, renderer);
    expect(directive).toBeTruthy();
  });
});
