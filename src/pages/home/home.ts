import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cameraPreview;
  picture;

  constructor(public navCtrl: NavController, cameraPreview: CameraPreview) {
    this.cameraPreview = cameraPreview;
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
      this.picture = 'data:image/jpeg;base64,' + imageData;
      console.log('Capture image success');
    }, (err) => {
      console.log('Capture image failed');
      console.log(err);
    });
  }

}
