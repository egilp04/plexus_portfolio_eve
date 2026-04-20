import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectModel } from '../models/projectModel';
// import proyectosData from '../../../assets/data/datosProyectos.json';
@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiUrl = 'http://localhost:3000/projects';
  private http = inject(HttpClient);

  getProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(this.apiUrl);
    //  return of(proyectosData);
  }
}
