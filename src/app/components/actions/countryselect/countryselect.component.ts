import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-countryselect',
  templateUrl: './countryselect.component.html',
  styleUrls: ['./countryselect.component.scss'],
})
export class CountryselectComponent implements OnInit {

  constructor() { }

  @Input() items: any[] = [];
  @Input() selectedItems: string[] = [];
  @Input() title = 'Select Items';

  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<string[]>();

  filteredItems: any[] = [];
  workingSelectedValues: string[] = [];

  ngOnInit() {
    this.filteredItems = [...this.items];
    this.workingSelectedValues = [...this.selectedItems];
  }

  trackItems(index: number, item: any) {
    return item.value;
  }

  cancelChanges() {
    this.selectionCancel.emit();
  }

  confirmChanges() {
    this.selectionChange.emit(this.workingSelectedValues);
  }

  selectItem(value: string) {
    // if usr has already selected the item, remove it
    // otherwise, add it to the list of selected items
    if (this.workingSelectedValues.find((item) => item === value)) {
      this.workingSelectedValues = this.workingSelectedValues.filter((item) => item !== value);
    }
    else {
      this.workingSelectedValues = [...this.workingSelectedValues, value];
    }
  }

  searchbarInput(ev: any) {
    this.filterList(ev.target.value);
  }

  /**
   * Update the rendered view with
   * the provided search query. If no
   * query is provided, all data
   * will be rendered.
   */
  filterList(searchQuery: string | undefined) {
    /**
     * If no search query is defined,
     * return all options.
     */
    if (searchQuery === undefined) {
      this.filteredItems = [...this.items];
    } else {
      /**
       * Otherwise, normalize the search
       * query and check to see which items
       * contain the search query as a substring.
       */
      const normalizedQuery = searchQuery.toLowerCase();
      this.filteredItems = this.items.filter((item) => {
        return item.text.toLowerCase().includes(normalizedQuery);
      });
    }
  }

  isChecked(value: string) {
    return this.workingSelectedValues.find((item) => item === value);
  }

  checkboxChange(ev: any) {
    const { checked, value } = ev.detail;
    // allow only one item to be selected
    if (checked) {
      this.workingSelectedValues = [value];
    }
    else {
      this.workingSelectedValues = [];
    }
  }

}
