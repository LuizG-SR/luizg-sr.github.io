import { Component, ViewChild } from '@angular/core';
import { IonNav, MenuController } from '@ionic/angular';
import { LoginPage } from './login/login.page';
import { HomePage } from './home/home.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  @ViewChild('nav', { static: true }) nav!: IonNav;

  // Página inicial: login
  rootPage = LoginPage;

  // Controla exibição do menu
  menuEnabled = false;

  // Itens do menu (objeto.url será página/classe, não rota)
  appPages = [
    { title: 'Home', component: HomePage, icon: 'home' },
    // { title: 'Outra', component: OutraPage, icon: 'settings' },
  ];

  constructor(private menu: MenuController) {}

  // Chamado pelo LoginPage quando autenticar com sucesso
  onLoginSuccess(selectedType: string) {
    // libera o menu e troca a raiz do nav para Home
    this.menuEnabled = true;
    this.nav.setRoot(HomePage, { userType: selectedType });
  }

  // Abre um item do menu
  async openPage(page: { component: any }) {
    // fecha o menu antes
    await this.menu.close();
    // faz setRoot (ou push) para a página escolhida
    this.nav.setRoot(page.component);
  }

  public getNav(): IonNav {
    return this.nav;
  }
}
