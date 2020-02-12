import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponent implements OnInit {

  errorMsg?: string;
  password = '';
  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async submit(form: NgForm) {
    this.errorMsg = undefined;
    if (form.invalid) return;
    try {
      await this.auth.login(this.password).toPromise();
      await this.router.navigate(['/home'])
    }
    catch (ex) {
      this.errorMsg = "Wrong Password!";
    }
  }
}
