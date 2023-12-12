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

  public isLast = false;
  public isBeginning = true;

  async ngOnInit() {

  }

  continue() {
    //change the next slide
    this.swiperRef?.nativeElement.swiper.slideNext();
    // get the current index
    //@ts-ignore
    let activeIndex = this.swiperRef?.nativeElement.swiper.activeIndex;
    // get the total number of slides
    //@ts-ignore
    let totalSlides = this.swiperRef?.nativeElement.swiper.slides.length;

    // check if the current index is the last slide

    if (activeIndex == totalSlides - 1) {
      this.isLast = true;
    } else {
      this.isLast = false;
    };

    if (activeIndex == 0) {
      this.isBeginning = true;
    } else {
      this.isBeginning = false;
    }
  }

  onSlideChange() {
  }

  start() {
    // set the onboarding flag to true
    this.storageService.set('onboardingComplete', true);
    this.router.navigate(['/login']);
  };

  prev() {
    this.swiperRef?.nativeElement.swiper.slidePrev();
    let activeIndex = this.swiperRef?.nativeElement.swiper.activeIndex;
    // get the total number of slides
    //@ts-ignore
    let totalSlides = this.swiperRef?.nativeElement.swiper.slides.length;

    // check if the current index is the last slide

    if (activeIndex == totalSlides - 1) {
      this.isLast = true;
    } else {
      this.isLast = false;
    };

    if (activeIndex == 0) {
      this.isBeginning = true;
    } else {
      this.isBeginning = false;
    }
  }
}
