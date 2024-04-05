import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voice-call',
  templateUrl: './voice-call.page.html',
  styleUrls: ['./voice-call.page.scss'],
})
export class VoiceCallPage implements OnInit {

  micOn: boolean = true;
  videoCallOn: boolean = true;
  onCall = true;

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  rotateCamera() {
    // Logic to rotate camera
  }

  toggleMic() {
    this.micOn = !this.micOn;
    // Logic to toggle mic on/off
  }

  acceptCall() {
    // Logic to accept call
  }

  declineCall() {
    // Logic to decline call
  }

  toggleVideoCall() {
    this.videoCallOn = !this.videoCallOn;
    // Logic to toggle video call on/off
  }
  toggleCall(){
    this.onCall = !this.onCall
  }
  onBack(){
    this.location.back()
  }
}
