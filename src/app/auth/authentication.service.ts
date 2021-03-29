import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Credentials, CredentialsService } from './credentials.service';

const routes = {
  login: 'https://ies-webcontent.com.mx/xccm/user/validarUsuario',
};

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private httpClient: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<any> {
    const request = {
      usuario: context.username,
      contrasena: context.password,
    };

    return this.httpClient.post(routes.login, request).pipe(
      map((res) => {
        console.log(res);
        if (res['resultado'] == null) {
          const data = {
            username: '',
            token: '',
          };
          this.credentialsService.setCredentials();
          return data;
        } else {
          const data = {
            username: context.username,
            token: res['id_rol'],
          };
          this.credentialsService.setCredentials(data, context.remember);
          return data;
        }
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
