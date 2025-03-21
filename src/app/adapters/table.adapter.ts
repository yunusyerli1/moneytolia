import { computed, inject, Injectable, OnDestroy, Signal } from '@angular/core';
import { CampaignStore } from '../stores/campaign.store';
import { map, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, Subscribable, Subscription } from 'rxjs';
import { IAction, ITableConfig } from '../helpers/models/ITableConfig';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { ICampaignModel, ITableCampaignModel } from '../helpers/models/ICampaignModel';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class TableAdapter{

    public campaignsSignal: Signal<ICampaignModel[]>;

    private listSubject = new BehaviorSubject<ICampaignModel[]>([]);
    private filteredListSubject = new BehaviorSubject<ICampaignModel[]>([]);

    private tableTitles: string[] = [
        "Title",
        "Description",
        "Points",
        "Date"
    ];

    private subs: Subscription[] = [];
    

    constructor(
        private campaignStore: CampaignStore,
        private dialog: MatDialog
    ) {
        this.subs.push(this.campaignStore.state$
        .subscribe(data => {
            this.listSubject.next(data);
            this.filteredListSubject.next(data);
        }));
        
        this.campaignsSignal = toSignal(this.filteredListSubject, { initialValue: [] });
    }


    public tableConfigSignal: Signal<ITableConfig> = computed(() => {
        return {
          showHeader: false,
          showFooter: false,
          titles: this.tableTitles,
          records: computed(() => {
            return this.campaignsSignal().map(campaign => ({
              ...campaign,
              title: this.truncateText(campaign.title, 40),
              description: this.truncateText(campaign.description, 80),
              date: this.formatDate(campaign.date),
              points: {
                value: campaign.points,
                actions: [
                  {
                    actionName: 'increase',
                    iconName: 'add-line',
                    function: () => this.increasePoints(campaign)
                  },
                  {
                    actionName: 'decrease',
                    iconName: 'subtract-line',
                    function: () => this.decreasePoints(campaign)
                  },
                ]
              },
            }))
          }),
          actions: this.getTableActions()
        };
      });

    public getTableActions(): IAction[] {
        return [
            {
                actionName: 'edit',
                iconName: 'edit-line',
                function: (item: any): void => {
                    const newItem = {
                        ...item,
                        points: item.points.value ?? item.point
                    }
                    this.dialog.open(ModalComponent, {
                        width: '600px',
                        data: newItem,
                    });
                }
            },
            {
                actionName: 'delete',
                iconName: 'delete-bin-line',
                function: (item: any): void => {
                    this.campaignStore.deleteCampaign(item.id);
                }
            },
        ];
    }


    public increasePoints(item: ICampaignModel): void {
        const newItem = {
            ...item,
            points: item.points + 1,
        };
        this.campaignStore.updateCampaign(newItem);
    }

    public decreasePoints(item: ICampaignModel): void {
        const newItem = {
            ...item,
            points: item.points - 1,
        };
        this.campaignStore.updateCampaign(newItem);
    }

    public truncateText(text: string, maxLength: number): string {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    }

    public formatDate(date: Date | string): string {
        const dateObj = new Date(date);
        const day = ('0' + dateObj.getDate()).slice(-2);
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const year = dateObj.getFullYear();

        return `${day}.${month}.${year}`;
    }

    performSearch(searchValue: string){
        if (!searchValue) {
            this.clearFilter();
            return;
        }

        const filteredList = this.listSubject.value.filter(
            listItem => (
                listItem.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                listItem.description.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
            )
        );

        this.filteredListSubject.next(filteredList)
      }
    
      clearFilter() {
        this.filteredListSubject.next(this.listSubject.value);
      }

      clean() {
        this.subs = [];
      }
}
