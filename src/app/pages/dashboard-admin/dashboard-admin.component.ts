import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModel } from '../../models/projectModel';
import { ProjectsService } from '../../services/projects.service';
import { BarCharComponent } from '../../components/bar-char/bar-char.component';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
export class DashboardAdminComponent implements OnInit, OnDestroy {
  loaderService = inject(LoaderService);
  private projectService = inject(ProjectsService);

  projectsList: ProjectModel[] = [];
  typeLabels: string[] = [];
  typeValues: number[] = [];

  companyLabels: string[] = [];
  companyValues: number[] = [];

  techLabels: string[] = [];
  techValues: number[] = [];

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projectsList = data;
        this.calculateStats();
        setTimeout(() => {
          this.initScrollAnimations();
          ScrollTrigger.refresh();
        }, 100);
      },
      error: (error) => {
        console.error('Error al cargar los proyectos:', error);
      },
    });
  }

  calculateStats() {
    const typeCount = this.projectsList.reduce(
      (acc: Record<string, number>, project) => {
        acc[project.type] = (acc[project.type] || 0) + 1;
        return acc;
      },
      {},
    );

    this.typeLabels = Object.keys(typeCount);
    this.typeValues = Object.values(typeCount);
  }

  private initScrollAnimations(): void {
    gsap.utils.toArray<HTMLElement>('.chart-trigger').forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}
