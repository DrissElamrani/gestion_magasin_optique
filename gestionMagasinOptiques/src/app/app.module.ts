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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




const appRoutes: Routes = [
  { path: 'auth',    component: AuthentificationComponent },
  { path: 'client', canActivate: [AuthGuard], component: AjouterClientComponent },
 // { path: 'menu', component: MenuComponent },
  { path: 'fournisseur',canActivate: [AuthGuard] ,component:FournisseurComponent},
  { path: '', canActivate: [AuthGuard], component:   AjouterClientComponent },
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
    NotfoundpageComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
 Authservices,
 AuthGuard,
 ClientsSrvices,
 AppComponent

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
