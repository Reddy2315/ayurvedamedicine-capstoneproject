import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetechallcustomersComponent } from './fetechallcustomers.component';

describe('FetechallcustomersComponent', () => {
  let component: FetechallcustomersComponent;
  let fixture: ComponentFixture<FetechallcustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FetechallcustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetechallcustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
