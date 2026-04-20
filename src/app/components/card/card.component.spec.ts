import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModel } from '../../models/projectModel';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const mockProject = {
      title: 'Proyecto de Prueba',
      description: 'Una descripción corta',
      image: 'ruta/imagen.jpg',
    } as ProjectModel;

    component.project = mockProject;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
