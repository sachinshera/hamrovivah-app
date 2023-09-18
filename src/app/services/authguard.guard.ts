import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }
  canActivate: CanActivateFn = async (
    route: any,
    state: any
  ): Promise<boolean> => {
    var onboardingComplete: any = await this.storageService.get('onboardingComplete');
    if (onboardingComplete == null || onboardingComplete == 'false') {
      this.router.navigate(['/onboarding']);
      return false;
    }
    return true;
  }
}
