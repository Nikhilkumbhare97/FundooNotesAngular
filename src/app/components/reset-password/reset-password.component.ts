import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const PASSWORD_REGEX = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^$@!#%*?&]*[$#@!%*?&][^$@!#%*?&]*$).{8,}');

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;

  constructor(private userService: UserServiceService, private route: ActivatedRoute, public snackBar: MatSnackBar) { }

  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_REGEX)]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.checkPasswords });

  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0) {
      config.duration = duration;
    }
    this.snackBar.open(message, undefined, config);
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.openSnackBar('Resetting password...', 0);
      let token = this.route.snapshot.paramMap.get('token');
      console.log(token)

      localStorage.setItem("access", token)

      let data = {
        newPassword: this.form.controls.password.value,
      }

      console.log(data);
      this.userService.resetPassword(data, token).subscribe(response => {
        this.openSnackBar('Password reset successful', 3000);
        console.log(response);
      },
        error => {
          try {
            if (error['status'] == 0) {
              this.openSnackBar('Password reset failed: server offline', 2000,);
            }
            else {
              this.openSnackBar('Password reset failed: ' + error['error']['message'], 2000);
            }
          } catch (error) {
            this.openSnackBar('Password reset link is invalid', 0);
          }
        });
    }
  }
}
