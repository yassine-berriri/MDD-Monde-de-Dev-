import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UnauthGuard } from './guards/unauth.guard';
import { AuthGuard } from './guards/auth.guard';
import { MeComponent } from './components/me/me.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landingPage',
    pathMatch: 'full'
  },
  {
    path: 'landingPage',
    component: LandingPageComponent
  },
  {
    path: 'me',
    component: MeComponent
  },
  {
    path: '',
    canActivate: [UnauthGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'topics',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/topics/topics.module').then(m => m.TopicsModule)
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
