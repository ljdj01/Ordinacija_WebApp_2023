import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerObavestenjaComponent } from './menadzer-obavestenja.component';

describe('MenadzerObavestenjaComponent', () => {
  let component: MenadzerObavestenjaComponent;
  let fixture: ComponentFixture<MenadzerObavestenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerObavestenjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerObavestenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
