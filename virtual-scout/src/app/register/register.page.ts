import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { MaskitoOptions } from '@maskito/core';
import { firstValueFrom } from 'rxjs';
import { HomePage } from '../home/home.page';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  // máscaras
  readonly phoneMask: MaskitoOptions = {
    mask: [
      '(',
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
  };
  readonly agencyMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, /\d/],
  };
  readonly accountMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/],
  };

  categoriasOpt = [
    { value: 'sub7', text: 'Sub-7' },
    { value: 'sub9', text: 'Sub-9' },
    { value: 'sub11', text: 'Sub-11' },
    { value: 'sub13', text: 'Sub-13' },
  ];
  diasOpt = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ];

  // flags do fluxo de verificação
  emailSent = false;
  codeValidated = false;
  sendingCode = false;
  validatingCode = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastController,
    private loading: LoadingController,
    private nav: NavController,
    private app: AppComponent
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', Validators.required],
      password: ['', Validators.required],
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      celular: ['', Validators.required],
      categorias: [[], Validators.required],
      horarioTreinoInicio: ['', Validators.required],
      horarioTreinoFim: ['', Validators.required],
      diasSemana: [[], Validators.required],
      fundacao: ['', Validators.required],
      dadosBancarios: this.fb.group({
        favorecido: ['', Validators.required],
        banco: ['', Validators.required],
        agencia: ['', Validators.required],
        conta: ['', Validators.required],
        chavePix: [''],
      }),
    });
  }

  /** Envia o código para o e-mail */
  async sendCode() {
    const emailCtrl = this.registerForm.get('email')!;
    if (emailCtrl.invalid) {
      emailCtrl.markAsTouched();
      return;
    }
    this.sendingCode = true;
    try {
      await firstValueFrom(this.auth.sendVerificationCode(emailCtrl.value));
      this.emailSent = true;
      const toast = await this.toast.create({
        message: 'Código enviado! Verifique seu e-mail.',
        duration: 2000,
        color: 'success',
      });
      await toast.present();
    } catch (e: any) {
      const toast = await this.toast.create({
        message: e.error?.error || 'Falha ao enviar código',
        duration: 3000,
        color: 'danger',
      });
      await toast.present();
    } finally {
      this.sendingCode = false;
    }
  }

  /** Verifica o código digitado pelo usuário */
  async verifyCode() {
    const codeCtrl = this.registerForm.get('code')!;
    if (codeCtrl.invalid) {
      codeCtrl.markAsTouched();
      return;
    }
    this.validatingCode = true;
    try {
      const email = this.registerForm.get('email')!.value;
      await firstValueFrom(this.auth.verifyEmailCode(email, codeCtrl.value));
      this.codeValidated = true;
      const toast = await this.toast.create({
        message: 'E-mail validado! Preencha o restante.',
        duration: 2000,
        color: 'success',
      });
      await toast.present();
    } catch (e: any) {
      const toast = await this.toast.create({
        message: e.error?.error || 'Código inválido',
        duration: 3000,
        color: 'danger',
      });
      await toast.present();
    } finally {
      this.validatingCode = false;
    }
  }

  async onSubmit() {
    // validações, OTP etc...
    const loading = await this.loading.create({
      message: 'Cadastrando...',
    });
    await loading.present();

    try {
      // 1) register
      await firstValueFrom(
        this.auth.registerUser('Escola', this.registerForm.value)
      );
      // 2) login automático
      await firstValueFrom(
        this.auth.login(
          this.registerForm.value.email,
          this.registerForm.value.password,
          false
        )
      );
      await loading.dismiss();
      (
        await this.toast.create({
          message: 'Cadastro e login realizados com sucesso!',
          color: 'success',
          duration: 2000,
        })
      ).present();

      // 3) navega para HomePage via IonNav
      this.app.nav.setRoot(HomePage);
    } catch (err: any) {
      await loading.dismiss();
      (
        await this.toast.create({
          message: err.error || err.message || 'Erro no cadastro/login',
          color: 'danger',
          duration: 3000,
        })
      ).present();
    }
  }

  onCancel() {
    this.nav.back();
  }
}
