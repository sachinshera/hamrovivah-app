import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  async ngOnInit() {

  }

  continue() {
    //change the next slide
    this.swiperRef?.nativeElement.swiper.slideNext();
  }

  onSlideChange() {
  }

  start() {
    // set the onboarding flag to true
    this.storageService.set('onboardingComplete', true);
    this.router.navigate(['/login']);
  }
}
