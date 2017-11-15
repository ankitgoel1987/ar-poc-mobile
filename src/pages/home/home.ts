import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picture;
  info;

  constructor(public navCtrl: NavController, public cameraPreview: CameraPreview, public loadingCtrl: LoadingController) {
    this.info = 'Capture Image';
  }

  capture() {
    // picture options
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 85
    }

    // take a picture
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.presentLoading();
      this.picture = 'data:image/jpeg;base64,' + imageData;
      this.info = 'Image Captured';
      console.log('Capture image success');
    }, (err) => {
      console.log('Capture image failed');
      console.log(err);
    });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Processing image...",
      duration: 2000
    });
    loader.present();
  }

}
