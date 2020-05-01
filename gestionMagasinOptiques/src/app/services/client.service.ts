
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Client } from '../model/client';
import { UserJournals } from '../model/UserJournals';
import { Config } from 'protractor';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { retry, catchError } from 'rxjs/operators';
@Injectable()
export class ClientsSrvices {

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

    getListClients(): Observable<any> {
        return this.httpclient.get("http://localhost:8090/optique/Clients/")
    }
    getClientById(id: number): Observable<any> {
        return this.httpclient.get("http://localhost:8090/optique/Clients/" + id + "/1")
    }
    supprimerClient(id: number): Observable<any> {
        return this.httpclient.delete("http://localhost:8090/optique/Clients/" + id + "/1", { observe: 'response' })
            .pipe(catchError(this.handleError));
    }
    ajouterClient(clt = new Client()): Observable<any> {
        return this.httpclient.post("http://localhost:8090/optique/Clients/1", clt, { observe: 'response' })
            .pipe(catchError(this.handleError));
    }

    modifierClient(clt = new Client(), id: number): Observable<any> {
        return this.httpclient.put("http://localhost:8090/optique/Clients/" + id + "/1", clt, { observe: 'response' })
            .pipe(catchError(this.handleError));
    }

    ajouterJournal(journal = new UserJournals(), idUser: number): Observable<any> {
        return this.httpclient.post("http://localhost:8090/optique/JournalsUser/" + idUser, journal)
            .pipe(catchError(this.handleError));
    }

}