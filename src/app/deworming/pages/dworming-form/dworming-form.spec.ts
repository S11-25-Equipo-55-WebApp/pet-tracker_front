import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwormingForm } from './dworming-form';

describe('DwormingForm', () => {
  let component: DwormingForm;
  let fixture: ComponentFixture<DwormingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DwormingForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DwormingForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
