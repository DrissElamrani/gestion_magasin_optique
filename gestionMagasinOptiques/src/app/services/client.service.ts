
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Client } from '../model/client';
import { UserJournals } from '../model/UserJournals';
import { Config } from 'protractor';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {environment} from '../../environments/environment';

import { retry, catchError } from 'rxjs/operators';
@Injectable()
export class ClientService {

    constructor(private httpclient: HttpClient) { }

    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        //       window.alert(errorMessage);
        return throwError(errorMessage);
    }

    getClients(): Observable<any> {
        return this.httpclient.get(`${environment.apiUrl}/clients/list`);
    }

    getClientById(id: number): Observable<any> {
        return this.httpclient.get("http://localhost:8090/gestionMagasinOptique/optique/Clients/" + id + "/1")
    }
    supprimerClient(id: number): Observable<any> {
        return this.httpclient.delete("http://localhost:8090/gestionMagasinOptique/optique/Clients/" + id + "/1", { observe: 'response' })
            .pipe(catchError(this.handleError));
    }

    addClient(client: Client): Observable<any> 
    {
        return this.httpclient.post(`${environment.apiUrl}/clients/create`, client);
    }

    modifierClient(clt = new Client(), id: number): Observable<any> {
        return this.httpclient.put("http://localhost:8090/gestionMagasinOptique/optique/Clients/" + id + "/1", clt, { observe: 'response' })
            .pipe(catchError(this.handleError));
    }

    ajouterJournal(journal = new UserJournals(), idUser: number): Observable<any> {
        return this.httpclient.post("http://localhost:8090/gestionMagasinOptique/optique/JournalsUser/" + idUser, journal)
            .pipe(catchError(this.handleError));
    }

}