import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietForm } from './diet-form';

describe('DietForm', () => {
  let component: DietForm;
  let fixture: ComponentFixture<DietForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DietForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
