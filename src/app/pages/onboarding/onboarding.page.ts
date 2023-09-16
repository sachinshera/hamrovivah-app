import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  continue() {
    //change the next slide
    this.swiperRef?.nativeElement.swiper.slideNext();
  }

  onSlideChange() {
  }

  start() {
    this.router.navigate(['/login']);
  }
}
