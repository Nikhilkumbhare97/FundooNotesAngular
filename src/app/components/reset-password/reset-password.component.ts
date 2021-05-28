import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private userService: UserServiceService, private route: ActivatedRoute) { }

  form = new FormGroup({
    password: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }

  submit() {

    let token = this.route.snapshot.paramMap.get('token');
    console.log(token)

    localStorage.setItem("access", token)

    let data = {
      newPassword: this.form.controls.password.value,
    }

    console.log(data);
    this.userService.resetPassword(data, token).subscribe((res) => {
      console.log(res);
    })
  }

}
