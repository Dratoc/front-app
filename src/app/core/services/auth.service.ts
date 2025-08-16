import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { User, UserLoginDto } from '../../models/user.model';
import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment';

const CURRENT_USER_KEY = 'currentUser';
const TOKEN_KEY = 'token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/User`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedUser = this.storage.getItem<User>(CURRENT_USER_KEY);
      if (savedUser) {
        this.currentUserSubject.next(savedUser);
      }
    }
  }

  login(credentials: UserLoginDto): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => {
        if (isPlatformBrowser(this.platformId)) {
          this.storage.setItem(CURRENT_USER_KEY, user);
          this.storage.setItem(TOKEN_KEY, user.token);
        }
        this.currentUserSubject.next(user);
      }),
      catchError(err => {
        console.error('AuthService: login error', err);
        return throwError(() => err);
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.storage.removeItem(CURRENT_USER_KEY);
      this.storage.removeItem(TOKEN_KEY);
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  get token(): string | null {
    return isPlatformBrowser(this.platformId)
      ? this.storage.getItem<string>(TOKEN_KEY)
      : null;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }
}
