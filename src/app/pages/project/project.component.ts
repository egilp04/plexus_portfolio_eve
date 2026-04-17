import {
  Component,
  computed,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ProjectsService } from '../../services/projects.service';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { SelectComponentComponent } from '../../components/select-component/select-component.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import datosSelectProject from '../../../assets/data/datosSelectProject.json';
import { DatosSelectModel } from '../../models/datosSelectModel';
import { ProjectModel } from '../../models/projectModel';

@Component({
  selector: 'app-project',
  imports: [
    CardComponent,
    TranslateModule,
    SelectComponentComponent,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  standalone: true,
})
export class ProjectComponent implements OnInit {
  private projectService = inject(ProjectsService);
  projectsList = signal<ProjectModel[]>([]);
  @ViewChildren('projectCard') cards!: QueryList<ElementRef>;
  @ViewChild('filterName') filterName!: ElementRef<HTMLInputElement>;
  @ViewChild('typeFilter') typeFilter!: ElementRef<HTMLSelectElement>;
  datosSelect: DatosSelectModel[] = datosSelectProject;

  name = signal('');
  typeProject = signal('');

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projectsList.set(data);
        setTimeout(() => this.startAnimationGsap(), 0);
      },
      error: (error) => {
        console.error('Error al cargar los proyectos:', error);
      },
    });
  }

  startAnimationGsap() {
    const elements = this.cards.map((card) => card.nativeElement);
    gsap.from(elements, {
      opacity: 0,
      y: 30,
      scale: 0.95,
      duration: 2,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }

  resetFilters() {
    this.name.set('');
    this.typeProject.set('');
    this.filterName.nativeElement.innerHTML = '';
  }

  updateName(event: Event) {
    const valor = event.target as HTMLInputElement;
    this.name.set(valor.value);
  }

  updateTypeProjectFilter(valorSeleccionado: string) {
    this.typeProject.set(valorSeleccionado);
  }

  filteredProjects = computed(() => {
    const nameValue = this.name().toLowerCase();
    const typeProjectValue = this.typeProject().toLowerCase();

    return this.projectsList().filter((project) => {
      const projectName = project.title ? project.title.toLowerCase() : '';
      const projectType = project.type ? project.type.toLowerCase() : '';
      const nameMatch = !nameValue || projectName.includes(nameValue);
      const typeProjectMatch =
        !typeProjectValue || projectType === typeProjectValue;
      return nameMatch && typeProjectMatch;
    });
  });
}
