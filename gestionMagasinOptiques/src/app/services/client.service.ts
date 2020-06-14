
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../model/client';
import { UserJournals } from '../model/UserJournals';
import { Config } from 'protractor';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {environment} from '../../environments/environment';

import { retry, catchError } from 'rxjs/operators';
import { User } from '../model/user';
@Injectable()
export class ClientService {

    constructor(private httpclient: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin':'*',
        })
    };

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
        return this.httpclient.get(`${environment.apiUrl}/clients/${id}`,this.httpOptions)
    }

    supprimerClient(id: number): Observable<any> {
        return this.httpclient.delete(`${environment.apiUrl}/clients/${id}/delete`,this.httpOptions);
    }

    addClient(client: Client): Observable<any> 
    {
        return this.httpclient.post(`${environment.apiUrl}/clients/create`, client,this.httpOptions);
    }

    modifierClient(clt : Client, id: number): Observable<any> {
        return this.httpclient.put(`${environment.apiUrl}/clients/${id}/update`, clt,this.httpOptions);
    }

    ajouterJournal(journal = new UserJournals(), idUser: number): Observable<any> {
        return this.httpclient.post("http://localhost:8090/gestionMagasinOptique/optique/JournalsUser/" + idUser, journal)
            .pipe(catchError(this.handleError));
    }

}