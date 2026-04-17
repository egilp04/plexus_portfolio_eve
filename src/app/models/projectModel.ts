export interface ProjectModel {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'frontend' | 'backend' | 'fullstack';
  company: string;
  technologies: string[];
  image: string;
  year: number;
  url: string;
}
