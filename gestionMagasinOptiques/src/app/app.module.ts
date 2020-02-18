import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AjouterClientComponent } from './ajouter-client/ajouter-client.component';
import { MenuComponent } from './menu/menu.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { Routes, RouterModule } from '@angular/router';
import { Authservices } from './services/auth.services';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { AuthGuard } from './services/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { ClientsSrvices } from './services/client.service';
import {ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component'; 


const appRoutes: Routes = [
  { path: 'auth', component: AuthentificationComponent },
  { path: 'clients', canActivate: [AuthGuard], component: AjouterClientComponent },
  { path: 'fournisseurs',canActivate: [AuthGuard] ,component:FournisseurComponent},
  { path: '',canActivate: [AuthGuard], component: HomeComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'notfound', component: NotfoundpageComponent },
  { path: '**', redirectTo: 'notfound' }

];


@NgModule({
  declarations: [
    AppComponent,
    AjouterClientComponent,
    MenuComponent,
    AuthentificationComponent,
    FournisseurComponent,
    NotfoundpageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    Authservices,
    AuthGuard,
    ClientsSrvices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
