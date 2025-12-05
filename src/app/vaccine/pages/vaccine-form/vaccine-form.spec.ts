import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineForm } from './vaccine-form';

describe('VaccineForm', () => {
  let component: VaccineForm;
  let fixture: ComponentFixture<VaccineForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccineForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccineForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
