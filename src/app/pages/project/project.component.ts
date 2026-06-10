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
import dataSelectProject from '../../../assets/data/dataSelectProject.json';
import { DataSelectModel } from '../../models/dataSelectModel';
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
  dataForSelect: DataSelectModel[] = dataSelectProject;
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
      duration: 0.8,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      clearProps: 'all',
    });
  }
  // constructor() {}
  ngOnInit(): void {
    this.getProjects();
    setTimeout(() => this.animateProjects(), 100);
  }
  getProjects() {
    this.isLoading.set(true);
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projectsList.set(data);
        setTimeout(() => {
          this.isLoading.set(false);
        }, 250);
      },
      error: (error) => {
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
