import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// @ts-ignore
import * as Crypto from 'crypto-js'
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userServices: UserService) { }

  ngOnInit(): void {
  }

  onLoginSubmit(form: NgForm) {
    const encryptedPassword = Crypto.AES.encrypt(form.value.password, '394812730425442A472D2F423F452848').toString()
    console.log(form.value, 'login vvvv', encryptedPassword)
    this.userServices.login({ username: form.value.username, password: encryptedPassword }).subscribe(data => {
      const { code, result } = data
      if (code !== 200) return
      const accessToken = result.accessToken
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        window.location.pathname = '/task'
      }
    })
  }
}
