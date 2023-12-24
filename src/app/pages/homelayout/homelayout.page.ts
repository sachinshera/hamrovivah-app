import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-homelayout',
  templateUrl: './homelayout.page.html',
  styleUrls: ['./homelayout.page.scss'],
})
export class HomelayoutPage implements OnInit {
  public api = environment.api;
  public allusers: any = [];
  public prefrencesProfiles: any = [];
  public isLoading = true;
  constructor(
    public profileService: ProfileService
  ) {

  }
  ngOnInit() {
    this.profileService.getProfiles(0).then((res: any) => {
      this.isLoading = false;
      this.allusers = res.data;
    }).catch((err: any) => {
      console.log("err", err);
    });

    this.profileService.getPfofilesByPrefrences(0).then((res: any) => {
      this.isLoading = false;
      this.prefrencesProfiles = res.data;
    }).catch((err: any) => {
      console.log("err", err);
    });
  };

  handleRefresh(event: any) {
    this.allusers = [];
    this.profileService.getProfiles(0).then((res: any) => {
      this.isLoading = false;
      this.allusers = res.data;
      event.target.complete();
    }).catch((err: any) => {
      console.log("err", err);
      event.target.complete();
    });
  }

}
