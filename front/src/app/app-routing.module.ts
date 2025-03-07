import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthGuardTsGuard } from './guards/unauth.guard.ts.guard';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

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
    path: '',
   // canActivate: [UnauthGuardTsGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
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
