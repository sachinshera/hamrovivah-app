import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScrollToBottomDirective } from 'src/app/directives/scroll-to-bottom.directive';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  @ViewChild(ScrollToBottomDirective)
  scroll!: ScrollToBottomDirective;
  @ViewChild('myList')
  private myList!: ElementRef;
List:any=[]
message:String=""
uid:any="me" //user Id
last:any
  mailId: any; // user email
  myUserName: any; // user name

  constructor() {
    this.List = [
      {
        From: 'me',
        message: 'how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? ',
        timestamp: new Date(),
      },
      {
        From: 'jack',
        message: 'how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? how do you do? ',
        timestamp: new Date(),
      }
    ]
  }


  ngOnInit(): void {

        this.scrollToBottom();


  }
   ngAfterViewChecked() {
        this.scrollToBottom();
    }

  // sendMessage(){
  //   this.db.sendMessage(this.uid,this.myUserName,this.mailId,this.message)
  //   this.message=""
  // }

  scrollToBottom() {
    if(this.myList)
 this.myList.nativeElement.scrollTop = this.myList.nativeElement.scrollHeight;
}
}
