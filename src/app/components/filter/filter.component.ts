import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  inputValue: string;

  @Output() onApplyFilter = new EventEmitter<string>();

  applyFilter() {
    this.onApplyFilter.emit(this.inputValue);
  }

}
