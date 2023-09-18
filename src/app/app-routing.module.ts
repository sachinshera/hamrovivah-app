import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './services/authguard.guard';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        canActivate: [AuthguardGuard],
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
        canActivate: [AuthguardGuard],
        path: 'myprofile',
        loadChildren: () => import('./pages/myprofile/myprofile.module').then(m => m.MyprofilePageModule)
      },
      {
        canActivate: [AuthguardGuard],
        path: 'profile/:id',
        loadChildren: () => import('./pages/userprofile/userprofile.module').then(m => m.UserprofilePageModule)
      },
      {
        canActivate: [AuthguardGuard],
        path: 'partner-prefrences',
        loadChildren: () => import('./pages/settings/partnerprefrences/partnerprefrences.module').then(m => m.PartnerprefrencesPageModule)
      },
      {
        path: 'onboarding',
        loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingPageModule)
      },
      {
        canActivate: [AuthguardGuard],
        path: 'profilestup',
        loadChildren: () => import('./pages/profilestup/profilestup.module').then(m => m.ProfilestupPageModule)
      },
    ]
  },
  {
    path: "**",
    redirectTo: "home"
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
