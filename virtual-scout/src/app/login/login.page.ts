import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController, IonNav } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { HomePage } from '../home/home.page';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  userTypes = ['Escola', 'Treinador', 'Responsável'];
  selectedType = '';
  confirmSelected = false;

  loginForm!: FormGroup;
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastController,
    private loading: LoadingController,
    private app: AppComponent
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });

    // ao iniciar, checa se já há token em localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      this.app.nav.setRoot(HomePage);
    }
  }

  selectType(type: string) {
    this.selectedType = type;

    if (this.selectedType) {
      this.confirmSelected = true;
    }
  }

  resetSelection() {
    this.selectedType = '';
    this.confirmSelected = false;
    this.loginForm.reset();
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    const load = await this.loading.create({ message: 'Entrando...' });
    await load.present();

    const { email, password, rememberMe } = this.loginForm.value;
    console.log({ email, password, rememberMe }); // verifique no console
    try {
      const res = await firstValueFrom(
        this.auth.login(email, password, rememberMe)
      );
      if (!res.ok) throw new Error(res.error);

      // guarda o token de forma persistente (ou só na sessão)
      if (rememberMe) {
        localStorage.setItem('authToken', res.token!);
      } else {
        sessionStorage.setItem('authToken', res.token!);
      }

      await load.dismiss();
      await this.toast
        .create({ message: 'Bem-vindo!', color: 'success', duration: 2000 })
        .then((t) => t.present());
      this.app.nav.setRoot(HomePage);
    } catch (e: any) {
      await load.dismiss();
      await this.toast
        .create({
          message: e.message || 'Erro ao logar',
          color: 'danger',
          duration: 3000,
        })
        .then((t) => t.present());
    }
  }

  onRememberChange(event: any) {
    this.loginForm.patchValue({ rememberMe: event.detail.checked });
    console.log('rememberMe agora =', event.detail.checked);
  }

  goToRegister() {
    // Usa IonNav para empurrar a página de registro
    this.app.nav.push(RegisterPage, { userType: this.selectedType });
  }

  forgotPassword() {
    // this.app.nav.push(ForgotPasswordPage);
  }
}
