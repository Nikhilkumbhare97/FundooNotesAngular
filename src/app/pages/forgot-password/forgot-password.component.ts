import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/userService/user-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private userService: UserServiceService, private snackBar: MatSnackBar, private router: Router) { }

  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0) {
      config.duration = duration;
    }
    this.snackBar.open(message, undefined, config);
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.openSnackBar('processing..', 0);
      let data = {
        email: this.form.controls.email.value,
      }

      console.log(data);
      this.userService.forgotPassword(data).subscribe((response: any) => {
        this.openSnackBar('password reset link has been sent to your registered email', 2000);
        console.log(response);
        this.router.navigate(['/login']);
      },
        error => {
          if (error['status'] == 0) {
            this.openSnackBar('Sending password reset link failed: server offline', 2000,);
          }
          else {
            this.openSnackBar('Sending password reset link failed: ' + error['error']['message'], 2000);
          }
        });
    }

  }
}
