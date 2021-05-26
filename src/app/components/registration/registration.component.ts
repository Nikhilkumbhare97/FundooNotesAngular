import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const NAME_REGEX = new RegExp('[A-Z]{1}[a-z]{2,}');
const PASSWORD_REGEX = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^$@!#%*?&]*[$#@!%*?&][^$@!#%*?&]*$).{8,}');

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

  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {
    console.log("error");
  }
}
