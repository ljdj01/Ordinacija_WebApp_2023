import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledlekarComponent } from './pregledlekar.component';

describe('PregledlekarComponent', () => {
  let component: PregledlekarComponent;
  let fixture: ComponentFixture<PregledlekarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledlekarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledlekarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
