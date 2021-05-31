import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/service/userService/user-service.service';

const NAME_REGEX = ('[A-Z]{1}[a-z]{2,}');
const PASSWORD_REGEX = ('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^$@!#%*?&]*[$#@!%*?&][^$@!#%*?&]*$).{8,}');

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  hide = true;

  form = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern(NAME_REGEX)]),
    lastname: new FormControl('', [Validators.required, Validators.pattern(NAME_REGEX)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_REGEX)]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: this.checkPasswords });

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  constructor(private userService: UserServiceService, public snackBar: MatSnackBar) { }
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
      this.openSnackBar('Registering user...', 0);
      let data = {
        firstName: this.form.controls.firstname.value,
        lastName: this.form.controls.lastname.value,
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        service: "advance"
      }

      console.log(data);
      this.userService.registerUser(data).subscribe(response => {
        console.log("register successfull", response);
        this.openSnackBar('Registration successful', 2000);
      },
        error => {
          if (error['status'] == 0) {
            this.openSnackBar('Registration failed: server offline', 2000,);
          }
          else {
            this.openSnackBar('Registration failed: ' + error['error']['message'], 2000);
          }
        }
      );
    }
  }
}

