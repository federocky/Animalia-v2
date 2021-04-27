import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudFiltersComponent } from './crud-filters.component';

describe('CrudFiltersComponent', () => {
  let component: CrudFiltersComponent;
  let fixture: ComponentFixture<CrudFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
