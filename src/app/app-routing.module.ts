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
      {
        canActivate: [AuthguardGuard],
        "path": "photos",
        "loadChildren": () => import("./pages/photos/photos.module").then(m => m.PhotosPageModule)
      },
      {
        canActivate: [AuthguardGuard],
        "path": "photos/:id/name/:name",
        "loadChildren": () => import("./pages/photos/photos.module").then(m => m.PhotosPageModule)
      },
      {
        path: 'search/:search',
        loadChildren: () => import('./pages/searchresult/searchresult.module').then(m => m.SearchresultPageModule)
      },
      {
        path: 'pay/razorpay',
        loadChildren: () => import('./pages/payment/razorpay/razorpay.module').then(m => m.RazorpayPageModule)
      },
      {
        path: 'pay/razorpay/:orderid',
        loadChildren: () => import('./pages/payment/razorpay/razorpay.module').then(m => m.RazorpayPageModule)
      },
      {
        path: 'subscription',
        loadChildren: () => import('./pages/plans/plans.module').then(m => m.PlansPageModule)
      }

    ]
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./pages/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'login-page',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forms/:id',
    loadChildren: () => import('./pages/forms/forms.module').then( m => m.FormsPageModule)
  },
  {
    path: 'home-page',
    loadChildren: () => import('./pages/home-page/home-page.module').then( m => m.HomePagePageModule)
  },  {
    path: 'modal-page',
    loadChildren: () => import('./pages/modal-page/modal-page.module').then( m => m.ModalPagePageModule)
  },
  {
    path: 'upload-photos',
    loadChildren: () => import('./pages/upload-photos/upload-photos.module').then( m => m.UploadPhotosPageModule)
  },
  {
    path: 'search-partner',
    loadChildren: () => import('./pages/search-partner/search-partner.module').then( m => m.SearchPartnerPageModule)
  },
  {
    path: 'matches-page',
    loadChildren: () => import('./pages/matches-page/matches-page.module').then( m => m.MatchesPagePageModule)
  },
  {
    path: 'matches',
    loadChildren: () => import('./pages/chat/matches/matches.module').then( m => m.MatchesPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/chat/message/message.module').then( m => m.MessagePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
