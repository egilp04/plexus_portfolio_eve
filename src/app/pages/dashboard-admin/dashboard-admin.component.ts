import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModel } from '../../models/projectModel';
import { ProjectsService } from '../../services/projects.service';
import { BarCharComponent } from '../../components/bar-char/bar-char.component';

@Component({
  selector: 'app-dashboard-admin',
  imports: [
    MatProgressSpinnerModule,
    AsyncPipe,
    TranslateModule,
    BarCharComponent,
  ],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss',
  standalone: true,
})
export class DashboardAdminComponent implements OnInit {
  loaderService = inject(LoaderService);
  private projectService = inject(ProjectsService);

  projectsList: ProjectModel[] = [];
  typeLabels: string[] = [];
  typeValues: number[] = [];

  techLabels: string[] = [];
  techValues: number[] = [];

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projectsList = data;
        this.calculateStats();
      },
      error: (error) => {
        console.error('Error al cargar los proyectos:', error);
      },
    });
  }

  calculateStats() {
    console.log(this.projectsList);
    const typeCount = this.projectsList.reduce(
      (acc: Record<string, number>, project) => {
        acc[project.type] = (acc[project.type] || 0) + 1;
        return acc;
      },
      {},
    );

    const techCount = this.projectsList.reduce(
      (acc: Record<string, number>, project) => {
        if (project.technologies && Array.isArray(project.technologies)) {
          project.technologies.forEach((tech: string) => {
            acc[tech] = (acc[tech] || 0) + 1;
          });
        }
        return acc;
      },
      {},
    );

    this.typeLabels = Object.keys(typeCount);
    this.typeValues = Object.values(typeCount);

    this.techLabels = Object.keys(techCount);
    this.techValues = Object.values(techCount);
  }
}
