import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/homelayout/homelayout.module').then(m => m.HomelayoutPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/account/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/account/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'myprofile',
    loadChildren: () => import('./pages/myprofile/myprofile.module').then(m => m.MyprofilePageModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./pages/userprofile/userprofile.module').then(m => m.UserprofilePageModule)
  },
  {
    path: 'partner-prefrences',
    loadChildren: () => import('./pages/settings/partnerprefrences/partnerprefrences.module').then(m => m.PartnerprefrencesPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
