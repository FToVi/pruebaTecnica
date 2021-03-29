import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  paises: () => `https://api.first.org/data/v1/countries?region=africa&limit=10&pretty=true`,
};

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  getPaises(): Observable<string> {
    return this.httpClient.get(routes.paises()).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load data'))
    );
  }
}
