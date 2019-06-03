import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestRestComponent } from './gest-rest.component';

describe('GestRestComponent', () => {
  let component: GestRestComponent;
  let fixture: ComponentFixture<GestRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestRestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
