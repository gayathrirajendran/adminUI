import { Component, Input, OnInit } from '@angular/core';
import { UserData } from 'src/user-models';
import { UserDataService } from 'src/user-services';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  providers: [
    UserDataService
  ]
})
export class UserDashboardComponent implements OnInit {

  public userData: UserData[] = [];
  public status: 'loading' | 'loaded' | 'error' | 'initial' = 'initial';
  public dataSet: UserData[] = [];

  public paginationOffset = 0;
  @Input() paginationSize = 10;

  public currentPageOffset = 0;

  constructor(
    private dataSource: UserDataService
  ) { }

  ngOnInit(): void {
    this.fetchData(this.paginationOffset * this.paginationSize, this.paginationSize);
  }

  private fetchData(startIndex: number, size: number): void {

    this.status = 'loading';

    this.dataSource.getData().pipe(
    ).subscribe({
      next: (response) => {
        this.status = 'loaded';
        this.userData = response;
        this.dataSet = this.getPaginatedData(startIndex, size)
      },
      error: (err) => {
        this.status = 'error';
        console.error('Error has occured during fetch', err);
      }
    });

  }

  public paginate(currentPageNumber: number): void {
    console.log(currentPageNumber*this.paginationSize);
    this.dataSet = this.getPaginatedData(currentPageNumber*this.paginationSize, this.paginationSize);
  }

  private getPaginatedData(startIndex: number, size: number): UserData[] {
    this.currentPageOffset = startIndex;
    console.log(startIndex, this.userData);
    return this.userData.slice(startIndex, startIndex + size);
  }

  deleteItem(id: string) {
    console.log(this.userData);
    this.userData = this.userData.filter((item) => item.id !== id);
  }

  // changeDataSet(data: UserData[]): void {
  //   this.userData = [...this.userData.slice(0, this.currentPageOffset - 1), ...data, ...this.userData.slice(this.currentPageOffset + 10)];
  //   this.dataSet = this.getPaginatedData(this.currentPageOffset, this.paginationDefaults.size);
  // }

}
