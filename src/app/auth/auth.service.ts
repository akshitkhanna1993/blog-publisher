import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListner() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post('http://localhost:3000/api/user/signup', authData).subscribe(response => {
      console.log(response);
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{ token: string }>('http://localhost:3000/api/user/login', authData).subscribe(response => {
      console.log(response);
      const token = response.token
      this.token = token;
      if (token) {

        //   localStorage.setItem("authToken",this.token);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.saveAuthData(token);
        this.router.navigate(['/']);
      }
    });
  }

  private saveAuthData(token: string) {
    localStorage.setItem("token", token);

  }

  private clearAuthData() {
    localStorage.removeItem("token");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    return {
      token: token
    }
  }

  logout() {
    // localStorage.removeItem("authToken")
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

}
