import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScrollToBottomDirective } from 'src/app/directives/scroll-to-bottom.directive';

@Component({
  selector: 'app-unknown-sender',
  templateUrl: './unknown-sender.page.html',
  styleUrls: ['./unknown-sender.page.scss'],
})
export class UnknownSenderPage implements OnInit {
  @ViewChild(ScrollToBottomDirective)
  scroll!: ScrollToBottomDirective;
  @ViewChild('myList')
  private myList!: ElementRef;
  List: any = [];
  message: String = '';
  uid: any = 'me'; //user Id
  last: any;
  mailId: any; // user email
  myUserName: any; // user name
  sender = {
    name: 'Hemraj Rijal',
    age: '25Yrs',
    profession: 'Engineer',
    profilePic: 'assets/images/prof_image_one.jpg'
  }

  constructor(private location: Location) {
    this.List = [
      {
        From: 'jack',
        message:
          'how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? ',
        timestamp: new Date(),
      },
      {
        From: 'jack',
        message:
          'how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? ',
        timestamp: new Date(),
      },      {
        From: 'jack',
        message:
          'how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? ',
        timestamp: new Date(),
      },      {
        From: 'jack',
        message:
          'how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? ',
        timestamp: new Date(),
      },      {
        From: 'jack',
        message:
          'how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? ',
        timestamp: new Date(),
      },      {
        From: 'jack',
        message:
          'how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? ',
        timestamp: new Date(),
      },      {
        From: 'jack',
        message:
          'how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? ',
        timestamp: new Date(),
      },      {
        From: 'jack',
        message:
          'how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? ',
        timestamp: new Date(),
      },      {
        From: 'jack',
        message:
          'how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? ',
        timestamp: new Date(),
      },      {
        From: 'jack',
        message:
          'how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? ',
        timestamp: new Date(),
      },      {
        From: 'jack',
        message:
          'how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? ',
        timestamp: new Date(),
      },      {
        From: 'jack',
        message:
          'how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? ',
        timestamp: new Date(),
      },      {
        From: 'jack',
        message:
          'how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? ',
        timestamp: new Date(),
      },
    ];
  }

  ngOnInit(): void {
    this.scrollToBottom();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  onBack() {
    this.location.back();
  }
  // sendMessage(){
  //   this.db.sendMessage(this.uid,this.myUserName,this.mailId,this.message)
  //   this.message=""
  // }

  scrollToBottom() {
    if (this.myList)
      this.myList.nativeElement.scrollTop =
        this.myList.nativeElement.scrollHeight;
  }
}
