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
      for (let i = 0; i < res.data.length; i++) {
        let id = res.data[i].id;
        let proifleImage = res.data[i].proifleImage;
        console.log("proifleImage", proifleImage);
        let fullname = res.data[i].Data.filter((item: any) => item.Input.tag == 'Fullname')[0]?.inputValue;
        let age = res.data[i].Data.filter((item: any) => item.Input.tag == 'Age')[0]?.inputValue;
        let country = res.data[i].Data.filter((item: any) => item.Input.tag == 'Country')[0]?.inputValue;
        let profession = res.data[i].Data.filter((item: any) => item.Input.tag == 'Profession')[0]?.inputValue;

        let bindData = {
          id: id ? id : '',
          proifleImage: proifleImage ? proifleImage : 'assets/images/user.png',
          fullname: fullname ? fullname : '',
          age: age ? age : '',
          country: country ? country : '',
          profession: profession ? profession : '',
        };

        this.allusers.push(bindData);
      };
    }).catch((err: any) => {
      console.log("err", err);
    });

    this.profileService.getPfofilesByPrefrences(0).then((res: any) => {
      // group by res.inputValue

      let groupBy = (array: any, key: any) => {
        return array.reduce((result: any, currentValue: any) => {
          (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
          );
          return result;
        }, {});
      };

      let grouped = groupBy(res, 'inputValue');

      this.prefrencesProfiles = Object.keys(grouped).map((key) => {
        return { key, value: grouped[key] };
      });

      console.log("this.prefrencesProfiles", this.prefrencesProfiles);

    }).catch((err: any) => {
      console.log("err", err)
    });
  }

}
