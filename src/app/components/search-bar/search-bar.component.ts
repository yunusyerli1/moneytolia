import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Output() search = new EventEmitter<string>();

  searchValue: string = "";


  onSearch() {
    this.search.emit(this.searchValue.trim());
  }

}
