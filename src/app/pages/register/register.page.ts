import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = {
    userName: '',
    email: '',
    password: ''
  };

  constructor(private fireAuth: AngularFireAuth,
              private router: Router,
              private uiService: UiService,
              private menuCtrl: MenuController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  register(fRegister: NgForm) {
    if (fRegister.valid) {
      this.fireAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password).then(resp => {
        if (resp.user) {
          this.updateProfile();
        }
      }).catch(err => {
        console.log(`login failed ${err}`);
        // this.error = err.message;
      });
    }
  }

  updateProfile() {
    this.fireAuth.auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        user.updateProfile({ displayName: this.user.userName, photoURL: this.user.img }).then(() => {
          this.menuCtrl.enable(true);
          this.uiService.presentToast('User created successfully');
          this.router.navigateByUrl('/home');
        });
      }
    });
  }

}
