import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {
  public allusers: any = [];
  isLoaded = false;
  selectedContacts: any = [
    { name: 'John', profilePic: 'assets/profiles/john.jpg' },
    { name: 'Jane', profilePic: 'assets/profiles/jane.jpg' },
    // Add more selected contacts as needed
  ];

  recentChats: any = [
    { contact: { name: 'Hemraj Rijal', profilePic: 'assets/images/prof_image_one.jpg' }, lastMessage: 'Hello! would you like to talk', unreadCount: 2 },
    { contact: { name: 'Sudeep Ranjit', profilePic: 'assets/images/prof_image_two.jpg' }, lastMessage: 'Hey there', unreadCount: 0 },
    { contact: { name: 'Ashok Acharya', profilePic: 'assets/images/prof_image_three.jpg' }, lastMessage: 'How are you today', unreadCount: 0 },
    { contact: { name: 'Hemraj Rijal', profilePic: 'assets/images/prof_image_one.jpg' }, lastMessage: 'Hello! would you like to talk', unreadCount: 2 },
    { contact: { name: 'Sudeep Ranjit', profilePic: 'assets/images/prof_image_two.jpg' }, lastMessage: 'Hey there', unreadCount: 0 },
    { contact: { name: 'Ashok Acharya', profilePic: 'assets/images/prof_image_three.jpg' }, lastMessage: 'How are you today', unreadCount: 0 },
    { contact: { name: 'Hemraj Rijal', profilePic: 'assets/images/prof_image_one.jpg' }, lastMessage: 'Hello! would you like to talk', unreadCount: 2 },
    { contact: { name: 'Sudeep Ranjit', profilePic: 'assets/images/prof_image_two.jpg' }, lastMessage: 'Hey there', unreadCount: 0 },
    { contact: { name: 'Ashok Acharya', profilePic: 'assets/images/prof_image_three.jpg' }, lastMessage: 'How are you today', unreadCount: 0 },
    { contact: { name: 'Hemraj Rijal', profilePic: 'assets/images/prof_image_one.jpg' }, lastMessage: 'Hello! would you like to talk', unreadCount: 2 },
    { contact: { name: 'Sudeep Ranjit', profilePic: 'assets/images/prof_image_two.jpg' }, lastMessage: 'Hey there', unreadCount: 0 },
    { contact: { name: 'Ashok Acharya', profilePic: 'assets/images/prof_image_three.jpg' }, lastMessage: 'How are you today', unreadCount: 0 },
    { contact: { name: 'Hemraj Rijal', profilePic: 'assets/images/prof_image_one.jpg' }, lastMessage: 'Hello! would you like to talk', unreadCount: 2 },
    { contact: { name: 'Sudeep Ranjit', profilePic: 'assets/images/prof_image_two.jpg' }, lastMessage: 'Hey there', unreadCount: 0 },
    { contact: { name: 'Ashok Acharya', profilePic: 'assets/images/prof_image_three.jpg' }, lastMessage: 'How are you today', unreadCount: 0 },
    { contact: { name: 'Hemraj Rijal', profilePic: 'assets/images/prof_image_one.jpg' }, lastMessage: 'Hello! would you like to talk', unreadCount: 2 },
    { contact: { name: 'Sudeep Ranjit', profilePic: 'assets/images/prof_image_two.jpg' }, lastMessage: 'Hey there', unreadCount: 0 },
    { contact: { name: 'Ashok Acharya', profilePic: 'assets/images/prof_image_three.jpg' }, lastMessage: 'How are you today', unreadCount: 0 },
    { contact: { name: 'Hemraj Rijal', profilePic: 'assets/images/prof_image_one.jpg' }, lastMessage: 'Hello! would you like to talk', unreadCount: 2 },
    { contact: { name: 'Sudeep Ranjit', profilePic: 'assets/images/prof_image_two.jpg' }, lastMessage: 'Hey there', unreadCount: 0 },
    { contact: { name: 'Ashok Acharya', profilePic: 'assets/images/prof_image_three.jpg' }, lastMessage: 'How are you today', unreadCount: 0 },
    // Add more recent chats as needed
  ];

  constructor(
    private navCtrl: NavController,
    private profileService: ProfileService
    ) {}

  ngOnInit(): void {
    this.profileService
      .getProfiles(0)
      .then((res: any) => {
        this.allusers = res.data;
        this.selectedContacts = this.allusers;
        this.isLoaded = true;
        console.log('this.selectedContacts', this.selectedContacts)
      })
      .catch((err: any) => {
        console.log('err', err);
      });
  }
  getName(user: any){
    console.log(user)
    let userName =
    this.getInputvalueByTagname('fullname', user) +
    ' ' +
    this.getInputvalueByTagname('last name', user);
    return userName;
  }
  public getInputvalueByTagname(tagname: string, forms: any) {
    console.log(forms, tagname)
    for (let i = 0; i < forms.length; i++) {
      for (let j = 0; j < forms[i].Inputs.length; j++) {
        if (forms[i].Inputs[j].tag == tagname) {
          if(!!forms[i].Inputs[j].Values){
            return forms[i].Inputs[j].Values.inputValue;
          }else{
            return ''
          }
        }
      }
    }
  }
  openChat(chat:any) {
    // Navigate to chat page with the selected chat
    this.navCtrl.navigateForward('/chat-detail', { queryParams: { chatId: chat.id } });
  }
}
