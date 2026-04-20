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
  viewChild,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ProjectsService } from '../../services/projects.service';
import { TranslateModule } from '@ngx-translate/core';
import { SelectComponentComponent } from '../../components/select-component/select-component.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import datosSelectProject from '../../../assets/data/datosSelectProject.json';
import { DatosSelectModel } from '../../models/datosSelectModel';
import { ProjectModel } from '../../models/projectModel';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
@Component({
  selector: 'app-project',
  imports: [
    CardComponent,
    TranslateModule,
    SelectComponentComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  standalone: true,
})
export class ProjectComponent implements OnInit {
  private projectService = inject(ProjectsService);
  projectsList = signal<ProjectModel[]>([]);
  @ViewChild('typeFilter') typeFilter!: ElementRef<HTMLSelectElement>;
  datosSelect: DatosSelectModel[] = datosSelectProject;
  projectsGrid = viewChild<ElementRef>('projectsGrid');
  name = signal('');
  typeProject = signal('');
  isLoading = signal(true);
  animateProjects() {
    const container = this.projectsGrid()?.nativeElement;
    if (!container) return;
    const cards = container.querySelectorAll('.project-item');
    gsap.fromTo(container, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    const tl = gsap.timeline();
    tl.from(cards, {
      duration: 0.7,
      opacity: 0,
      y: 50,
      stagger: 0.5,
      clearProps: 'all',
    });
  }
  constructor() {
    effect(() => {
      const list = this.filteredProjects();
      if (list.length > 0) {
        setTimeout(() => this.animateProjects(), 100);
      }
    });
  }
  ngOnInit(): void {
    this.getProjects();
  }
  getProjects() {
    this.isLoading.set(true);
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projectsList.set(data);
        setTimeout(() => {
          this.isLoading.set(false);
        }, 800);
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading.set(false);
      },
    });
  }
  resetFilters() {
    this.name.set('');
    this.typeProject.set('');
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
