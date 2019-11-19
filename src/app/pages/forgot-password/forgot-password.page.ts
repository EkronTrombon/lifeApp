import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email = '';

  constructor(private fireAuth: AngularFireAuth,
              private uiService: UiService,
              private router: Router,
              private menuCtrl: MenuController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  recover(fRecover: NgForm) {
    if (fRecover.valid) {
      this.fireAuth.auth.sendPasswordResetEmail(this.email).then(resp => {
        console.log(resp);
        this.uiService.presentToast('Password reset email sent');
        this.router.navigateByUrl('/login');
      }).catch(err => {
        console.log(`login failed ${err}`);
        // this.error = err.message;
      });
    }
  }

}
