import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablemapComponent } from './tablemap.component';

describe('TablemapComponent', () => {
  let component: TablemapComponent;
  let fixture: ComponentFixture<TablemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
