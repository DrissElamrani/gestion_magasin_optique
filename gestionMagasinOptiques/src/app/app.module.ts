import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http'

/* Routes */
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
/* */

/* Components */
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HomeComponent } from './home/home.component';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component'; 
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import {ReactiveFormsModule} from '@angular/forms'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



/* Services */
import { ClientService } from './services/client.service';
import { Authservices } from './services/auth.services';
import { AuthGuard } from './services/auth-guard.service';
import { FournisseurService} from './services/fournisseur.service';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { AddFournisseurComponent } from './fournisseurs/add-fournisseur/add-fournisseur.component';
import {UserJournalService} from './services/userJournal.service';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { InvoicesComponent } from './sales/invoices/invoices.component';
import { NewInvoiceComponent } from './sales/invoices/new-invoice/new-invoice.component';
import { AddMontureComponent } from './products/add-monture/add-monture.component';
import { AddLunetteSolaireComponent } from './products/add-lunette-solaire/add-lunette-solaire.component';
import { AddVerreComponent } from './products/add-verre/add-verre.component';
/* */
//const baseUrl=window["cfgApiBaseUrl"]+"/"
const appRoutes: Routes = [
  { path: 'auth',component: AuthentificationComponent },
  { path: '', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'clients', canActivate: [AuthGuard], component: ClientsComponent },
  { path: 'clients/create', canActivate: [AuthGuard], component: AddClientComponent },
  { path: 'client/:id', canActivate: [AuthGuard], component: ClientDetailComponent },
  { path: 'fournisseurs', canActivate: [AuthGuard], component: FournisseursComponent},
  { path: 'fournisseurs/create', canActivate: [AuthGuard], component: AddFournisseurComponent},
  { path: 'products', canActivate: [AuthGuard], component: ProductsComponent},
  { path: 'users', canActivate: [AuthGuard], component: UsersComponent},
  { path: 'users/create', canActivate: [AuthGuard], component: AddUserComponent},
  { path: 'user/:id', canActivate: [AuthGuard], component: UserDetailComponent},
  { path: 'notfound', component: NotfoundpageComponent },
  { path: 'factures', canActivate: [AuthGuard], component: InvoicesComponent},
  { path: 'factures/create', canActivate: [AuthGuard], component: NewInvoiceComponent},
  { path: 'monture/create', canActivate: [AuthGuard], component: AddMontureComponent},
  { path: 'lunette/solaire/create', canActivate: [AuthGuard], component: AddLunetteSolaireComponent},
  { path: 'verre/create', canActivate: [AuthGuard], component: AddVerreComponent},
  { path: '**', redirectTo: 'notfound' }
];


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AuthentificationComponent,
    NotfoundpageComponent,
    HomeComponent,
    FournisseursComponent,
    SidemenuComponent,
    AddFournisseurComponent,
    ClientsComponent,
    AddClientComponent,
    ClientDetailComponent,
    UsersComponent,
    ProductsComponent,
    AddUserComponent,
    UserDetailComponent,
    InvoicesComponent,
    NewInvoiceComponent,
    AddMontureComponent,
    AddLunetteSolaireComponent,
    AddVerreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    
  ],
  providers: [
    Authservices,
    AuthGuard,
    ClientService,
    FournisseurService,
    UserJournalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
