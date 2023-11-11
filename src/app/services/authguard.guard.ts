import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorageService,
    private loginService: LoginService
  ) { }
  canActivate: CanActivateFn = async (
    route: any,
    state: any
  ): Promise<boolean> => {
    var onboardingComplete: any = await this.storageService.get('onboardingComplete');
    if (onboardingComplete == null || onboardingComplete == 'false') {
      this.router.navigate(['/onboarding']);
      return false;
    };

    // verify session token

    try {
      await this.loginService.verifySessionToken();
      return true;
    } catch (err) {
      this.router.navigate(['/login']);
      return false;
    };


    // get user data

    // try {
    //   let userdata = await this.loginService.getUserData();
    //   userdata = JSON.parse(userdata);
    //   if (userdata.name == null || userdata.name == undefined || userdata.name == "") {
    //     this.router.navigate(['/login/onboard']);
    //     return false;
    //   }
    //   return true;
    // } catch (err) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }

    return true;
  }
}
