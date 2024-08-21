import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchallmedicinesComponent } from './fetchallmedicines.component';

describe('FetchallmedicinesComponent', () => {
  let component: FetchallmedicinesComponent;
  let fixture: ComponentFixture<FetchallmedicinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FetchallmedicinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchallmedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
