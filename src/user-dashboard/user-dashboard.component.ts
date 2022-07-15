import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, delay, takeUntil } from 'rxjs/operators';
import { UserData } from '../user-models';
import { UserDataService, UserSearchService } from '../user-services';

/**
 * Dashboard to see list of users with pagination. Inline edit, single delete and multi select and delete are possible. At all points of time userData has the modified master data.
 */
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  providers: [
    UserDataService, UserSearchService
  ]
})
export class UserDashboardComponent implements OnInit, OnDestroy {

  public userData: UserData[] = [];
  public status: 'loading' | 'loaded' | 'error' | 'initial' = 'initial';
  public dataSet: UserData[] = [];

  public paginationOffset = 0;
  @Input() paginationSize = 10;

  public currentPageOffset = 0;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public isAllSelected = false;
  public deleteCount = 0;

  constructor(
    private searchService: UserSearchService,
    private dataSource: UserDataService
  ) { }

  ngOnInit(): void {
    this.fetchData(this.paginationOffset * this.paginationSize, this.paginationSize);
  }

  /**
   * Delegator to get data
   * @param startIndex pagination offset
   * @param size pagination size
   */
  private fetchData(startIndex: number, size: number): void {
    this.retrieveData(this.dataSource, startIndex, size);
  }

  /**
   * Delegator method to get data.
   *
   * @param dataSource The varying source services
   * @param offset page offset.
   * @param size page size
   * @param searchStr Optional search string to reuse method for search.
   */
  private retrieveData(dataSource:UserDataService | UserSearchService, offset: number, size: number, searchStr?: string): void {
    this.status = 'loading';
    dataSource.getUserData(searchStr || '').pipe(
      searchStr ? debounceTime(2000) : delay(2000),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.status = 'loaded';
        this.userData = response;
        this.dataSet = this.getPaginatedData(offset, size)
      },
      error: (err) => {
        this.status = 'error';
        console.error('Error has occured during fetch', err);
      }
    })
  }

  /**
   * Search records passing search string
   * @param searchStr the search string
   */
  public searchRecords(searchStr: string): void {
    this.status = 'loading';
    if(searchStr) {
      this.retrieveData(this.searchService, this.paginationOffset, this.paginationSize, searchStr);
    } else {
      this.fetchData(this.paginationOffset * this.paginationSize, this.paginationSize);
    }
  }

  /**
   * Delete records.
   */
  public deleteRecords(): void {
    this.dataSet = this.dataSet.filter((item) => !item.isSelected);
    this.userData = this.userData.filter((item) => !item.isSelected);
    this.deleteCount = this.userData.filter((item) => item.isSelected).length;
  }

  /**
   * Sends the page number to get paginated chunk and send to table component.
   *
   * @param currentPageNumber paginated page.
   */
  public paginate(currentPageNumber: number): void {
    this.userData.forEach((item) => item.isEdit = false);
    this.dataSet = this.getPaginatedData(currentPageNumber*this.paginationSize, this.paginationSize);
  }

  /**
   * Delegator method for paginated data.
   *
   * @param startIndex the offset for pagination
   * @param size page size
   * @returns the paginated data chunk.
   */
  private getPaginatedData(startIndex: number, size: number): UserData[] {
    this.currentPageOffset = startIndex;
    this.isAllSelected = false;
    return this.userData.slice(startIndex, startIndex + size);
  }

  /**
   * Deletes selected item.
   *
   */
  deleteItem(id: string) {
    this.userData = this.userData.filter((item) => item.id !== id);
  }

  /**
   * Response to selection event.
   */
  trackDelete(): void {
    this.deleteCount = this.userData.filter((item) => item.isSelected).length;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
