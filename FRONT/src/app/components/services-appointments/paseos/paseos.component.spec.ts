import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaseosComponent } from './paseos.component';

describe('PaseosComponent', () => {
  let component: PaseosComponent;
  let fixture: ComponentFixture<PaseosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaseosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaseosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
