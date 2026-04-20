import { Component, inject, OnInit, signal } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModel } from '../../models/projectModel';
import { ProjectsService } from '../../services/projects.service';
import { BarCharComponent } from '../../components/bar-char/bar-char.component';

@Component({
  selector: 'app-dashboard-admin',
  imports: [MatProgressSpinnerModule, TranslateModule, BarCharComponent],
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

  isDataReady = signal(false);

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projectsList = data;
        this.calculateStats();
        this.isDataReady.set(true);
      },
      error: (error) => {
        console.error('Error:', error);
        this.isDataReady.set(true);
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
