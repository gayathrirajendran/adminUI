import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserData } from 'src/user-models';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnChanges {

  @Input() dataSet: UserData[] = [];
  @Input() status: 'loading' | 'loaded' | 'error' | 'initial' = 'initial';
  @Input() isAllSelected = false;
  @Output() selectionChange: EventEmitter<UserData[]> = new EventEmitter();
  @Output() deleteChange: EventEmitter<string> = new EventEmitter();
  @Output() isAllSelectedChange: EventEmitter<boolean> = new EventEmitter();
  @Output() refreshData: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.hasOwnProperty('isAllSelected') && !this.isAllSelected) {
      this.selectAll(false);
    }
  }

  editItem(dataItem: UserData): void {
    dataItem.isEdit = true;
  }

  deleteItem(id: string): void {
    this.dataSet = this.dataSet.filter((item) => item.id !== id);
    this.deleteChange.emit(id);
  }

  trackByFn(index: number, item: UserData) {
    return item.id;
  }

  selectAll(isSelected: boolean): void {
    this.isAllSelected = isSelected;
    this.isAllSelectedChange.emit(isSelected);
    this.dataSet.forEach((item) => item.isSelected = isSelected);
    this.selectionChange.emit(this.dataSet)
  }

  changeData(changedValue: string, dataItem: UserData, key: string) {
    const target: any = this.dataSet.find((item) => item.id === dataItem.id);
    if (target && target.hasOwnProperty(key)) {
      target[key] = changedValue;
    }
  }

  removeEdit(dataItem: UserData): void {
    dataItem.isEdit = false;
  }

}
