import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { HTTP } from '@ionic-native/http';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picture;
  info;
  imageLocation;
  type;
  costPrice;
  weeklySales;
  seasonSales;
  monthlySales;

  constructor(public navCtrl: NavController, public cameraPreview: CameraPreview, public loadingCtrl: LoadingController, public http: HTTP) {
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

      var headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };

      var postData = {
        "image": imageData
      };
      this.http.post('http://35.193.71.148/mobile/upload', postData, headers)
        .then(data => {

          console.log(data.status);
          console.log(data.data); // data received by server
          console.log(data.headers);
          var uploadResponse = JSON.parse(data.data);
          this.info = "Uploaded file. Name : " + uploadResponse.file_name;
          this.imageLocation = this.picture;
          var json = JSON.parse(data.data);
          var uploadedFileName = json.file_name;

          var similarUrl = 'http://35.193.71.148/mobile/similar?file_name=' + uploadedFileName;

          this.http.get(similarUrl, {}, {})
            .then(data => {

              var respsonseSimilar = JSON.parse(data.data);
              var similarUrl = respsonseSimilar.url[0];
              this.type = 'Category : ' + respsonseSimilar.type;
              this.costPrice = 'Cost price : ' + '100';
              this.weeklySales = 'Weekly sales : ' + '200';
              this.seasonSales = 'Season sales : ' + '300';
              this.monthlySales = 'Monthly sales: ' + '400';
              this.imageLocation = 'http://35.193.71.148/' + similarUrl;
            })
            .catch(error => {
              console.log(error.status);
              console.log(error.error); // error message as string
              console.log(error.headers);
              this.info = 'errror : ' + error + 'error status : ' + error.status + ' error message : ' + error.error;
            });
        })
        .catch(error => {
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
          this.info = 'errror : ' + error + 'error status : ' + error.status + ' error message : ' + error.error;
        });
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

  public closeDiv() {

    this.info = 'Capture Image';
    this.imageLocation = '';
    this.type = '';
    this.costPrice = '';
    this.weeklySales = '';
    this.seasonSales = '';
    this.monthlySales = '';
  }

  public switchCamera() {
    this.cameraPreview.switchCamera();
  }

}
