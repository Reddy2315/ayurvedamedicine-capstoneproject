import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchallordersComponent } from './fetchallorders.component';

describe('FetchallordersComponent', () => {
  let component: FetchallordersComponent;
  let fixture: ComponentFixture<FetchallordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FetchallordersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchallordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
