import {
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ProjectsService } from '../../services/projects.service';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-project',
  imports: [CardComponent, TranslateModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  standalone: true,
})
export class ProjectComponent implements OnInit {
  private projectService = inject(ProjectsService);
  projectsList: any[] = [];
  @ViewChildren('projectCard') cards!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projectsList = data;
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
}
