
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserJournals } from '../model/UserJournals';

import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { retry, catchError } from 'rxjs/operators';
@Injectable()
export class UserJournalService {

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


    ajouterJournal(journal = new UserJournals(), idUser: number): Observable<any> {
        return this.httpclient.post("http://localhost:8090/gestionMagasinOptique/optique/JournalsUser/" + idUser, journal)
            .pipe(catchError(this.handleError));
    }

}