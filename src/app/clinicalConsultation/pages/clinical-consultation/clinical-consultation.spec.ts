import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalConsultation } from './clinical-consultation';

describe('ClinicalConsultation', () => {
  let component: ClinicalConsultation;
  let fixture: ComponentFixture<ClinicalConsultation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalConsultation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalConsultation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
