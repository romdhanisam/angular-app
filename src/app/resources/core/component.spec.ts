import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import Component from "./component";

describe('MainComponent', () => {
  let component: Component;
  let fixture: ComponentFixture<Component>;
  beforeEach(() => {
    fixture = TestBed.createComponent(Component);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
