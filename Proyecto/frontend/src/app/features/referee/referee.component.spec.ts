/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { RefereeComponent } from './referee.component';
import { AuthService } from '../../core/auth.service';

const authServiceMock = {
  getPorRol: jasmine.createSpy('getPorRol').and.returnValue(of([]))
};

describe('RefereeComponent', () => {
  let component: RefereeComponent;
  let fixture: ComponentFixture<RefereeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefereeComponent ],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefereeComponent);
    component = fixture.componentInstance;
    authServiceMock.getPorRol.calls.reset();
    authServiceMock.getPorRol.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('carga arbitros al iniciar', () => {
    expect(authServiceMock.getPorRol).toHaveBeenCalledWith('arbitro');
    expect(component.arbitros).toEqual([]);
    expect(component.cargando).toBeFalse();
  });
});
