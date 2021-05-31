import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/service/userService/user-service.service';


const PASSWORD_REGEX = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^$@!#%*?&]*[$#@!%*?&][^$@!#%*?&]*$).{8,}');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(private userService: UserServiceService, public snackBar: MatSnackBar) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_REGEX)]),
  })

  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0) {
      config.duration = duration;
    }
    this.snackBar.open(message, undefined, config);
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.openSnackBar('Login in Progress...', 0);
      let data = {
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
      }

      console.log(data);
      this.userService.loginToFundoo(data).subscribe(response => {
        this.openSnackBar('Login successful', 3000);
        console.log(response);
      },
        error => {
          try {
            if (error['status'] == 0) {
              this.openSnackBar('Login failed: server offline', 2000,);
            }
            else {
              this.openSnackBar('Login failed: ' + error['error']['message'], 2000);
            }
          }
          catch (error) {
          }
        });
    }
  }

}
