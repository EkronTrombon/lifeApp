import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user: User = {
    userName: '',
    email: '',
    password: ''
  };

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.getInfoUserFromStorage();
  }

  getInfoUserFromStorage() {
    this.storage.get('loggedUser').then(resp => {
      this.user = resp;
    });
  }

}
