import { RenderMode, ServerRoute } from '@angular/ssr';
import { LandingComponent } from './landing/landing.component';
import { Route } from '@angular/router';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }

];
