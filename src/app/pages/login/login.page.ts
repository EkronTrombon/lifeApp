import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = {
    userName: '',
    email: '',
    password: ''
  };
  loginError = false;

  constructor(private fireAuth: AngularFireAuth,
              private router: Router,
              private storage: Storage,
              private menuCtrl: MenuController) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidEnter() {
    this.loginError = false;
    this.menuCtrl.enable(false);
  }

  login(fLogin: NgForm) {
    if (fLogin.valid) {
      const userEmail = fLogin.value.email;
      const userPwd = fLogin.value.password;
      this.fireAuth.auth.signInWithEmailAndPassword(userEmail, userPwd).then(resp => {
        if (resp.user) {
          this.setUserinStorage(resp.user);
          this.menuCtrl.enable(true);
          this.router.navigateByUrl('/home');
        }
      }).catch(err => {
        this.loginError = true;
      });
    }
  }

  async setUserinStorage(user: any) {
    this.user.userName = user.displayName;
    this.user.email = user.email;
    this.user.img = user.photoURL;
    await this.storage.set('loggedUser', this.user);
  }

}
