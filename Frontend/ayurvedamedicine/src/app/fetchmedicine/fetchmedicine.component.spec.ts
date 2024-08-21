import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchmedicineComponent } from './fetchmedicine.component';

describe('FetchmedicineComponent', () => {
  let component: FetchmedicineComponent;
  let fixture: ComponentFixture<FetchmedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FetchmedicineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchmedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
