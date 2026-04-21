import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModel } from '../../models/projectModel';
import { ProjectsService } from '../../services/projects.service';
import { BarCharComponent } from '../../components/bar-char/bar-char.component';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [MatProgressSpinnerModule, TranslateModule, BarCharComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss',
})
export class DashboardAdminComponent implements OnInit {
  private projectService = inject(ProjectsService);

  projectsList = signal<ProjectModel[]>([]);
  isDataReady = signal(false);

  typeStats = computed(() => {
    const list = this.projectsList();
    const count = list.reduce((acc: Record<string, number>, project) => {
      acc[project.type] = (acc[project.type] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(count),
      values: Object.values(count),
    };
  });

  techStats = computed(() => {
    const list = this.projectsList();
    const count = list.reduce((acc: Record<string, number>, project) => {
      if (project.technologies && Array.isArray(project.technologies)) {
        project.technologies.forEach((tech: string) => {
          acc[tech] = (acc[tech] || 0) + 1;
        });
      }
      return acc;
    }, {});

    return {
      labels: Object.keys(count),
      values: Object.values(count),
    };
  });

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projectsList.set(data);
        this.isDataReady.set(true);
      },
      error: (error) => {
        console.error('Error:', error);
        this.isDataReady.set(true);
      },
    });
  }
}
