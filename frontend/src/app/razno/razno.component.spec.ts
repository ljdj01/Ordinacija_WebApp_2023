import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaznoComponent } from './razno.component';

describe('RaznoComponent', () => {
  let component: RaznoComponent;
  let fixture: ComponentFixture<RaznoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaznoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaznoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
