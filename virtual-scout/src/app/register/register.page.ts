import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
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

  // flags para o fluxo de verificação
  emailSent = false;
  codeValidated = false;
  sendingCode = false;
  validatingCode = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastController,
    private app: AppComponent
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', Validators.required],
      password: ['', Validators.required],
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      celular: ['', [Validators.required, Validators.minLength(10)]],
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
    if (this.registerForm.get('email')!.invalid) return;
    this.sendingCode = true;
    try {
      await this.auth
        .sendVerificationCode(this.registerForm.value.email)
        .toPromise();
      this.emailSent = true;
      (
        await this.toast.create({
          message: 'Código enviado! Verifique seu e-mail.',
          duration: 2000,
          color: 'success',
        })
      ).present();
    } catch (e: any) {
      (
        await this.toast.create({
          message: e.error?.error || 'Falha ao enviar código',
          duration: 3000,
          color: 'danger',
        })
      ).present();
    } finally {
      this.sendingCode = false;
    }
  }

  /** Verifica o código digitado pelo usuário */
  async verifyCode() {
    const code = this.registerForm.get('code')!.value;
    if (!code) return;

    this.validatingCode = true;
    try {
      await this.auth
        .verifyEmailCode(this.registerForm.value.email, code)
        .toPromise();
      this.codeValidated = true;
      (
        await this.toast.create({
          message: 'E-mail validado! Preencha o restante.',
          duration: 2000,
          color: 'success',
        })
      ).present();
    } catch (e: any) {
      (
        await this.toast.create({
          message: e.error?.error || 'Código inválido',
          duration: 3000,
          color: 'danger',
        })
      ).present();
    } finally {
      this.validatingCode = false;
    }
  }
  async onSubmit() {
    if (this.registerForm.invalid) return;
    // ...
  }

  onCancel() {
    this.app.nav.pop();
  }
}
