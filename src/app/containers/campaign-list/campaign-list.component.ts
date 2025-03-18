import { Component, inject } from '@angular/core';
import { CampaignStore } from '../../stores/campaign.store';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-campaign-list',
  imports: [CommonModule, TableComponent, SearchBarComponent],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.scss'
})
export class CampaignListComponent {

  private campaignStore = inject(CampaignStore);

  campaigns = toSignal(this.campaignStore.state$);
  
  tableTitles: string[] = [
    "Title",
    "Description",
    "Points",
    "Date", 
    "Actions"
  ];

  onSearch(searchValue: string) {
    console.log("searchValue", searchValue)
    this.campaignStore.search(searchValue)
  }

}
