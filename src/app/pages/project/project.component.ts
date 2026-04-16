import { Component, inject, Inject, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ProjectsService } from '../../services/projects.service';
import { TranslateModule } from '@ngx-translate/core';

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

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projectsList = data;
      },
      error: (error) => {
        console.error('Error al cargar los proyectos:', error);
      },
    });
  }
}
