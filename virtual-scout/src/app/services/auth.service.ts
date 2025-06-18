// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ApiResponse {
  ok: boolean;
  error?: string;
  entidadeId?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // 1) Envia o código OTP
  sendVerificationCode(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.base}/api_email/sendVerificationCode.php`,
      { email }
    );
  }

  // 2) Verifica o código OTP
  verifyEmailCode(email: string, code: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.base}/api_email/verifyEmailCode.php`,
      { email, code }
    );
  }

  // 3) Cadastro de acesso (registro)
  registerUser(
    tipoUsuario: 'Escola' | 'Treinador' | 'Responsavel',
    data: any
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.base}/api_acesso/register.php`, {
      tipoUsuario,
      ...data,
    });
  }

  // 4) Login
  login(
    email: string,
    password: string,
    rememberMe: boolean
  ): Observable<{ ok: boolean; token?: string; error?: string }> {
    return this.http.post<any>(`${this.base}/api_acesso/login.php`, {
      email,
      password,
      remember: rememberMe ? 1 : 0,
    });
  }
}
