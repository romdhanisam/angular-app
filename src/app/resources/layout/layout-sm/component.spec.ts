import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import LayoutSmComponent from "./component";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {RouterTestingModule} from "@angular/router/testing";

describe('LayoutSmComponent', () => {
  let component: LayoutSmComponent;
  let fixture: ComponentFixture<LayoutSmComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
          RouterTestingModule,
          MatDialogModule,
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LayoutSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
