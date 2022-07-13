import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserData } from 'src/user-models';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  @Input() dataSet: UserData[] = [];
  @Input() status: 'loading' | 'loaded' | 'error' | 'initial' = 'initial';
  public isAllSelected = false;
  @Output() selectionChange: EventEmitter<UserData[]> = new EventEmitter();
  @Output() deleteChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.hasOwnProperty('dataSet') && this.dataSet.length) {

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
    this.dataSet.forEach((item) => item.isSelected = isSelected);
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
