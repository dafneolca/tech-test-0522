import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Output() onApplyFilter = new EventEmitter<string>();

  applyFilter(value: string) {
    this.onApplyFilter.emit(value);
  }

}
