import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekariComponent } from './lekari.component';

describe('LekariComponent', () => {
  let component: LekariComponent;
  let fixture: ComponentFixture<LekariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
