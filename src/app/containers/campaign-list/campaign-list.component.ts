import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ITableConfig } from '../../helpers/models/ITableConfig';
import { TableAdapter } from '../../adapters/table.adapter';

@Component({
  selector: 'app-campaign-list',
  imports: [CommonModule, TableComponent, SearchBarComponent],
  providers: [TableAdapter],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.scss',
})
export class CampaignListComponent implements OnInit, OnDestroy {

  tableConfig!: ITableConfig; 

  constructor(
    private adapter: TableAdapter
  ) {}

  ngOnInit(): void {
    this.tableConfig = this.adapter.tableConfigSignal();
  }

  ngOnDestroy(): void {
    this.adapter.clean();
  }

  onSearch(searchValue: string) {
    this.adapter.performSearch(searchValue);
  }

}
