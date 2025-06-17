import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
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
    private toastCtrl: ToastController,
    private app: AppComponent
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
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
    const { email, password } = this.loginForm.value;
    try {
      await this.auth.login(email, password);
      this.app.onLoginSuccess(this.selectedType);
    } catch (err: any) {
      const to = await this.toastCtrl.create({
        message: err.message || 'Erro ao autenticar',
        duration: 2000,
        color: 'danger',
      });
      await to.present();
    }
  }

  goToRegister() {
    // Usa IonNav para empurrar a página de registro
    this.app.nav.push(RegisterPage, { userType: this.selectedType });
  }

  forgotPassword() {
    // this.app.nav.push(ForgotPasswordPage);
  }
}
