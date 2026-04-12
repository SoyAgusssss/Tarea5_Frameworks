import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResgistrationComponent } from './modal-resgistration.component';

describe('ModalResgistrationComponent', () => {
  let component: ModalResgistrationComponent;
  let fixture: ComponentFixture<ModalResgistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalResgistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalResgistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
