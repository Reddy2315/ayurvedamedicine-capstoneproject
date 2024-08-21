import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinesearchresultsComponent } from './medicinesearchresults.component';

describe('MedicinesearchresultsComponent', () => {
  let component: MedicinesearchresultsComponent;
  let fixture: ComponentFixture<MedicinesearchresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicinesearchresultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinesearchresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
