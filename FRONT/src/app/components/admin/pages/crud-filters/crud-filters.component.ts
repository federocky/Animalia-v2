import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-crud-filters',
  templateUrl: './crud-filters.component.html',
  styleUrls: ['./crud-filters.component.scss']
})
export class CrudFiltersComponent implements OnInit {
  @Output() createNew: EventEmitter<boolean>;

  constructor() { 
    this.createNew = new EventEmitter();
  }

  ngOnInit(): void {
  }

}
