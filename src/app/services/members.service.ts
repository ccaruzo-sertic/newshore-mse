import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { groupBy, map, mergeMap, toArray, reduce, switchMap, filter,count } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Member } from '../interfaces/member';
import { House } from '../interfaces/house';

const apiURL = 'https://hp-api.herokuapp.com/api';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient) { }

  getMembers(house: string): Observable <Member[]>{
    const url = `${apiURL}/characters/house/${house}`;
    return this.http.get<Member[]>(url, {});
  }

  getHouses(): Observable<House[]>{
    const url = `${apiURL}/characters`;
    return this.http.get<Member[]>(url)
    .pipe(
      switchMap(members => from(members)),
      filter(member => member.house != ''),
      groupBy(member => member.house),
      mergeMap((group) => group.pipe(
          count(),
          map(total => ({name: group.key, totalMembers: total}))
        )
      ),
      toArray()
    )

  }
}
