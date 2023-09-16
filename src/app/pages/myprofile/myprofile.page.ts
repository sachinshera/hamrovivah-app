import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  ngOnInit(): void {

  }

  selectedSegment = 'slide1';
  selectedSlide: any = "";
  sweeperPosition = 0;

  swiperConfig: any = {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 30,
    on: {
      transitionEnd: () => {
        this.updateSelectedSegment();
      },
    },
  };

  constructor() { }

  segmentChanged() {
    const slideIndex = this.getSegmentIndex();
    this.slideTo(slideIndex);
  }

  swiperChanged() {
    this.updateSelectedSegment();
  }

  private slideTo(index: number) {
    this.selectedSlide = index;
  }

  private getSegmentIndex(): number {
    const segments = ['slide1', 'slide2', 'slide3'];
    return segments.indexOf(this.selectedSegment);
  }

  private updateSelectedSegment() {
    const segments = ['slide1', 'slide2', 'slide3'];
    this.selectedSegment = segments[this.selectedSlide];
    this.sweeperPosition = (this.selectedSlide / (segments.length - 1)) * 100;
  }

}
