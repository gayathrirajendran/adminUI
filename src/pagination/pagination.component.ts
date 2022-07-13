import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() totalRecordCount: number = -1;
  @Input() pageSize: number = 10;
  @Output() goToPageEvent: EventEmitter<number> = new EventEmitter();

  public pageCount: number = -1;
  public currentPageNumber: number = 0;
  public pageNumbers: Array<number> = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.hasOwnProperty('totalRecordCount') && this.totalRecordCount) {
      this.pageCount = Math.floor(this.totalRecordCount / this.pageSize) + (this.totalRecordCount % this.pageSize === 0 ? 0 : 1);
      this.pageNumbers = Array(this.pageCount).fill(undefined).map((x,i)=>i);
    }
  }

  ngOnInit(): void {
  }

  goToPage(index: number) {
    this.currentPageNumber = index;
    this.goToPageEvent.emit(this.currentPageNumber);
  }

}
