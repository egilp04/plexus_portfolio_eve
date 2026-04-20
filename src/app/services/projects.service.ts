import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProjectModel } from '../models/projectModel';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiUrl = 'http://localhost:3000/projects';
  private http = inject(HttpClient);

  getProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(this.apiUrl);
  }
}
