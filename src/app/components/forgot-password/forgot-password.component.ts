import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/userService/user-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private userService: UserServiceService) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      let data = {
        email: this.form.controls.email.value,
      }

      console.log(data);
      this.userService.forgotPassword(data).subscribe((res) => {
        console.log(res);
      })
    }
  }

}
