import { Injectable } from '@angular/core';
import { concatMap, map, Observable } from 'rxjs';
import { SearchResult, UserData } from '../../user-models';
import { UserDataService } from '../user-data/user-data.service';

@Injectable()
export class UserSearchService {

  constructor(
    private userData: UserDataService
  ) { }

  getUserData(searchString: string): Observable<UserData[]> {
    return this.userData.getData().pipe(
      map((res) => this.userData.transform(res)),
      map((items: UserData[]) => {
        return items.filter((userItem: UserData) => (userItem.email).includes(searchString) || (userItem.name).includes(searchString) || (userItem.role).includes(searchString) );
      })
    );
  }
}

