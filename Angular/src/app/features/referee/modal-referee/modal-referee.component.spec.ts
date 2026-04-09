import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRefereeComponent } from './modal-referee.component';

describe('ModalRefereeComponent', () => {
  let component: ModalRefereeComponent;
  let fixture: ComponentFixture<ModalRefereeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRefereeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRefereeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
