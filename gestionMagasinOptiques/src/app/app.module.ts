import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';


/* Routes */
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
/* */

/* Components */
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HomeComponent } from './home/home.component';
import { AjouterClientComponent } from './ajouter-client/ajouter-client.component';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component'; 
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
/* */

/* Services */
import { ClientsSrvices } from './services/client.service';
import { Authservices } from './services/auth.services';
import { AuthGuard } from './services/auth-guard.service';
import { FournisseurService} from './services/fournisseur.service';
/* */

const appRoutes: Routes = [
  { path: 'auth', component: AuthentificationComponent },
  { path: 'clients', canActivate: [AuthGuard], component: AjouterClientComponent },
  { path: 'fournisseurs', canActivate: [AuthGuard],component: FournisseursComponent},
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
    NotfoundpageComponent,
    HomeComponent,
    FournisseursComponent
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
    ClientsSrvices,
    FournisseurService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
