import { Injectable } from '@angular/core';
import { SearchResult, UserData } from '../../user-models';
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';

@Injectable()
export class UserDataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getData(): Observable<any[]> {
    const endPoint = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
    return this.httpClient.get(endPoint) as Observable<Array<any>>;
  }

  transform(data: any[]): UserData[] {
    return data.map((item) => ({
      id: item.id,
      email: item.email,
      name: item.name,
      role: item.role,
      isSelected: false,
      isEdit: false
    }));
  }

  getUserData(searchStr?: string): Observable<UserData[]> {
    return this.getData().pipe(
      map((res) => this.transform(res))
    );
  }

}
