import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { first, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl;

  constructor(
    private afs: AngularFirestore,
    private rtdb: AngularFireDatabase,
    private http: HttpClient
  ) {}

  // --- Chamadas à sua API PHP para OTP de e-mail ---
  sendVerificationCode(email: string) {
    return this.http.post<{ ok: boolean }>(
      `${this.api}/sendVerificationCode.php`,
      { email }
    );
  }

  verifyEmailCode(email: string, code: string) {
    return this.http.post<{ ok: boolean }>(`${this.api}/verifyEmailCode.php`, {
      email,
      code,
    });
  }

  // --- Registro local no front (AngularFire) ---
  registerEscola(escolaData: any): Promise<void> {
    const id = this.afs.createId();
    const { email, password, ...dados } = escolaData;
    // grava perfil no Firestore
    return this.afs
      .collection('escolas')
      .doc(id)
      .set({ ...dados, meta: { createdAt: new Date() } })
      .then(() => {
        // grava credenciais no RTDB
        const senhaHash = this.hash(password);
        return this.rtdb.object(`usuarios/${id}`).set({
          email,
          senhaHash,
          tipoUsuario: 'Escola',
          entidadeId: id,
        });
      });
  }

  // --- Login local no front (AngularFire) ---
  async login(
    email: string,
    password: string
  ): Promise<{ entidadeId: string }> {
    // obtém o resultado potencialmente undefined
    const result = await this.rtdb
      .list('usuarios', (ref) => ref.orderByChild('email').equalTo(email))
      .valueChanges()
      .pipe(first())
      .toPromise();

    // garante que arr é sempre um array
    const arr: any[] = Array.isArray(result) ? result : [];

    if (!arr.length) {
      throw new Error('Usuário não encontrado');
    }
    const user = arr[0];
    // … resto da validação …
    const hash = this.hash(password);
    if (user.senhaHash !== hash) {
      throw new Error('Senha inválida');
    }
    return { entidadeId: user.entidadeId };
  }

  private hash(pw: string) {
    // se quiser, importe crypto-js aqui
    return (window as any).CryptoJS.SHA256(pw).toString();
  }
}
