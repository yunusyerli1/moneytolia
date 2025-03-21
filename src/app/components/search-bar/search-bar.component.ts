import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Output() search = new EventEmitter<string>();

  searchForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchInput: [''], 
    });

   this.searchForm.get('searchInput')?.valueChanges.pipe(
      debounceTime(300), 
      map((value) => value.trim().toLocaleLowerCase()),
      distinctUntilChanged() 
   ).subscribe(value => this.performSearch(value));

  }

  performSearch(query: string): void {
    this.search.emit(query);
  }

}
