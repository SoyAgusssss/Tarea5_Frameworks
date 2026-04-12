import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificationsComponent } from './clasifications.component';

const jExpect = <T>(actual: T) => expect(actual) as unknown as jasmine.Matchers<T>;

describe('ClasificationsComponent', () => {
  let component: ClasificationsComponent;
  let fixture: ComponentFixture<ClasificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    jExpect(component).toBeTruthy();
  });
});
