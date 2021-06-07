import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../service/authGaurd/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdGuard implements CanActivate {
  constructor(private Authguardservice: AuthServiceService, private router: Router) { }
  canActivate(): boolean {
    if (!this.Authguardservice.gettoken()) {
      this.router.navigateByUrl("/login");
    }
    return this.Authguardservice.gettoken();
  }

}
