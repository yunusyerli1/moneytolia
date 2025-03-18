import { inject, Injectable } from '@angular/core';
import { CampaignStore } from '../stores/campaign.store';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class TableAdapter {

    private campaignStore = inject(CampaignStore);

    campaigns = toSignal(this.campaignStore.state$);

    tableTitles: string[] = [
        "Title",
        "Description",
        "Points",
        "Date", 
        "Actions"
      ];

    getTable(): any {
        return {
            showHeader: false,
            showFooter: false,
            titles: [...this.tableTitles],
            data: this.campaigns()
        };
    }

  
}
