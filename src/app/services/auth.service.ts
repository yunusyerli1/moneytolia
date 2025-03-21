import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mockEmail: string = "test@test.com";
  mockPassword: string = "123456"

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private localStorage = inject(LocalstorageService);

  public login(email: string, password: string): boolean {
    if (email === this.mockEmail && password === this.mockPassword) {
      this.isLoggedInSubject.next(true);
      const user = { email, isLoggedIn: true };
      this.localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  public logout(): void {
    this.isLoggedInSubject.next(false);
    this.localStorage.removeItem('user');
  }

  public isLoggedIn(): boolean {
    const user = JSON.parse(this.localStorage.getItem('user'));
    if (user && user.isLoggedIn) {
      this.isLoggedInSubject.next(true);
      return true;
    } else {
      this.isLoggedInSubject.next(false);
      return false;
    }
  }
}
