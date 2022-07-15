import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() localeStrings = {
    searchPlaceholder: 'Search by name, email, role'
  };
  @Input() isDisabled: boolean = false;

  public searchText: string = '';
  @Output() searchResultSelect: EventEmitter<string> = new EventEmitter();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  searchResults(searchStr: string): void {
    this.searchResultSelect.emit(searchStr);
  }

}
