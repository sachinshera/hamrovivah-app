import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Checkout } from 'capacitor-razorpay';
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-razorpay',
  templateUrl: './razorpay.page.html',
  styleUrls: ['./razorpay.page.scss'],
})
export class RazorpayPage implements OnInit {

  ngOnInit() {
    // get the order id from the path

    this.route.params.subscribe(params => {
      if (params['orderid']) {
        this.payWithRazorpay(params['orderid']);
      }
    });

  }

  paynow() {
    this.ProfileService.createOrder().then((data: any) => {
      this.payWithRazorpay(data.data.id);
    })
  }

  constructor(private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private ProfileService: ProfileService
  ) { }

  async payWithRazorpay(orderid: string) {
    const options = {
      key: 'rzp_test_1JxBhwlyi5nvaR',
      amount: '10000',
      description: 'Weekly Paid Plan',
      image: 'https://i.imgur.com/3g7nmJC.png',
      order_id: orderid,
      currency: 'INR',
      name: 'Hamro Vivah',
      prefill: {
        contact: '8210071758'
      },
      theme: {
        color: '#3399cc'
      }
    };
    try {
      let data = (await Checkout.open(options));
      console.log(data.response);
    } catch (error) {
      console.log("error", error)
    }
  }

}
