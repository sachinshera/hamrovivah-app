import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.page.html',
  styleUrls: ['./searchresult.page.scss'],
})
export class SearchresultPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ProfileService: ProfileService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  public searchText = '';
  public currentPage = 0;
  public loadedPage = 0;
  public profiles: any = [];
  public loading = true;
  public skeletonItems = [1, 2, 3, 4, 5];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchText = params['search'];
      this.searchProfiles();
    });
  };

  searchProfiles() {
    return new Promise(async (resolve, reject) => {
      if (this.currentPage == this.loadedPage) {
        this.ProfileService.searchProfileBytext(this.searchText, this.currentPage).then(data => {
          this.currentPage++;
          // @ts-ignore
          data.data.forEach(profile => {
            this.profiles.push(profile);
          });
          // @ts-ignore
          if (data.data.length > 0) {
            this.loadedPage++;
          }
          this.loading = false;
          resolve(true);
        }).catch(error => {
          this.currentPage++;
          reject(false);
        })
      }
    });
  };

  searchNewProfiles() {
    this.loading = true;
    return new Promise(async (resolve, reject) => {
      this.ProfileService.searchProfileBytext(this.searchText, 0).then(data => {
        // @ts-ignore
        this.profiles = data.data;
        this.loading = false;
        //set /search/:search use pushState
        window.history.pushState({}, '', '/search/' + this.searchText);
        resolve(true);
      }).catch(error => {
        this.currentPage++;
        reject(false);
      })
    });
  };




  onIonInfinite(event: any) {
    this.searchProfiles().then(() => { event.target.complete() }).catch(() => { event.target.complete() });

  }

  handleRefresh(event: any) {
    this.currentPage = 0;
    this.profiles = [];
    this.searchProfiles();
    event.target.complete();
  }
}
