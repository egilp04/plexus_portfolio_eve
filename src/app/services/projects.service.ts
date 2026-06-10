// import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { ProjectModel } from '../models/projectModel';
import proyects from '../../assets/data/proyects.json';
@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  // private apiUrl = 'http://localhost:3000/projects';
  // private http = inject(HttpClient);

  getProjects(): Observable<any> {
    // return this.http.get<ProjectModel[]>(this.apiUrl);
    console.log(proyects);
    return of(proyects);
  }
}
