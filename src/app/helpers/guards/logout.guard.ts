import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(): boolean {
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}