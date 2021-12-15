import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEspecialComponent } from './consulta-especial.component';

describe('ConsultaEspecialComponent', () => {
  let component: ConsultaEspecialComponent;
  let fixture: ComponentFixture<ConsultaEspecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaEspecialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
