import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-crud-filters',
  templateUrl: './crud-filters.component.html',
  styleUrls: ['./crud-filters.component.scss']
})
export class CrudFiltersComponent implements OnInit {
  @Output() createNew: EventEmitter<boolean>;
  @Output() search: EventEmitter<string>;
  @Output() orderBy: EventEmitter<string>;
  @Input() filterType: string;

  constructor() { 
    this.createNew = new EventEmitter();
    this.search = new EventEmitter();
    this.orderBy = new EventEmitter();
  }

  ngOnInit(): void {
  }

}
