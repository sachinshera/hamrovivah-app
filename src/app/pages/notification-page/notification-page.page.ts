import { Location, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.page.html',
  styleUrls: ['./notification-page.page.scss'],
})
export class NotificationPagePage implements OnInit {
  notifications = [
    {
      category: 'card-success',
      date: new Date(),
      title: 'Payment Successfully!',
      message:
        'Lorem ipsum dolor sit amet consectetur. Ultricies tincidunt eleifend vitae',
    },
    {
      category: 'chat',
      date: new Date(Date.now() - 86400000),
      title: 'Abhiuday S has sent you a request',
      message:
        'Abhiuday singh sent you a match request. Replay fast to get connected.',
    },
    {
      category: 'card',
      date: new Date(Date.now() - 86400000),
      title: 'Credit Card added!',
      message:
        'Lorem ipsum dolor sit amet consectetur. Ultricies tincidunt eleifend vitae',
    },
    {
      category: 'chat',
      date: new Date(Date.now() - 172800000),
      title: 'Ishaan S has sent you a request',
      message:
        'Abhiuday singh sent you a match request. Replay fast to get connected.',
    },
    {
      category: 'discount',
      date: new Date(Date.now() - 172800000),
      title: '5% Special Discount!',
      message:
        'Lorem ipsum dolor sit amet consectetur. Ultricies tincidunt eleifend vitae',
    },
    {
      category: 'card-success',
      date: new Date('2023-05-27'),
      title: 'Payment Successfully!',
      message:
        'Lorem ipsum dolor sit amet consectetur. Ultricies tincidunt eleifend vitae',
    },
    {
      category: 'card-success',
      date: new Date('2023-05-27'),
      title: 'Payment Successfully!',
      message:
        'Lorem ipsum dolor sit amet consectetur. Ultricies tincidunt eleifend vitae',
    },
  ];

  groupedNotifications: { date: string; notifications: any[] }[];

  constructor(private location: Location) {
    this.groupedNotifications = this.groupByDate(this.notifications);
  }

  ngOnInit() {}

  groupByDate(notifications: any[]): { date: string; notifications: any[] }[] {
    const groups = notifications.reduce((accumulator, currentValue) => {
      const date = this.getFormattedDate(currentValue.date);
      accumulator[date] = accumulator[date] || [];
      accumulator[date].push(currentValue);
      return accumulator;
    }, {});
    return Object.keys(groups).map((date) => ({
      date,
      notifications: groups[date],
    }));
  }

  getFormattedDate(date: Date): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayFormatted = formatDate(today, 'mediumDate', 'en-US');
    const yesterdayFormatted = formatDate(yesterday, 'mediumDate', 'en-US');
    const notificationDateFormatted = formatDate(date, 'mediumDate', 'en-US');

    if (notificationDateFormatted === todayFormatted) {
      return 'Today';
    } else if (notificationDateFormatted === yesterdayFormatted) {
      return 'Yesterday';
    } else {
      return notificationDateFormatted;
    }
  }
  getImage(category: string) {
    let imageUrl = 'assets/images/card.png';
    if(category === 'card-success'){
      imageUrl = 'assets/images/credit-card.png';
    }
    if(category === 'discount'){
      imageUrl = 'assets/images/discount.png';
    }
    return  imageUrl;
  }

  onBack() {
    this.location.back();
  }
}
