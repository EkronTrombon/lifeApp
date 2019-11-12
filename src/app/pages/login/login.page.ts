import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

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
              private router: Router) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.loginError = false;
  }

  login(fLogin: NgForm) {
    if (fLogin.valid) {
      const userEmail = fLogin.value.email;
      const userPwd = fLogin.value.password;
      this.fireAuth.auth.signInWithEmailAndPassword(userEmail, userPwd).then(resp => {
        if (resp.user) {
          console.log(resp.user);
          this.router.navigateByUrl('/home');
        }
      }).catch(err => {
        this.loginError = true;
      });
    }
  }

}
