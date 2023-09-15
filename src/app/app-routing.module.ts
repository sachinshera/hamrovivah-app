import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'homelayout',
    loadChildren: () => import('./pages/homelayout/homelayout.module').then( m => m.HomelayoutPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/account/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/account/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'myprofile',
    loadChildren: () => import('./pages/myprofile/myprofile.module').then( m => m.MyprofilePageModule)
  },
  {
    path: 'userprofile',
    loadChildren: () => import('./pages/userprofile/userprofile.module').then( m => m.UserprofilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
