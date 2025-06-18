import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTreinadorPage } from './home-treinador.page';

describe('HomeTreinadorPage', () => {
  let component: HomeTreinadorPage;
  let fixture: ComponentFixture<HomeTreinadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTreinadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
