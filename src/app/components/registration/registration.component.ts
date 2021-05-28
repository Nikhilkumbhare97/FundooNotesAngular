import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/userService/user-service.service';

const NAME_REGEX = ('[A-Z]{1}[a-z]{2,}');
const PASSWORD_REGEX = ('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^$@!#%*?&]*[$#@!%*?&][^$@!#%*?&]*$).{8,}');

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern(NAME_REGEX)]),
    lastname: new FormControl('', [Validators.required, Validators.pattern(NAME_REGEX)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_REGEX)]),
    confirmPassword: new FormControl('', Validators.required)
  })

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
  }

  submit() {
    let data = {
      firstName: this.form.controls.firstname.value,
      lastName: this.form.controls.lastname.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
      service: "advance"
    }

    console.log(data);
    this.userService.registerUser(data).subscribe((result) => {
      console.log(result);
    })
  }
}

