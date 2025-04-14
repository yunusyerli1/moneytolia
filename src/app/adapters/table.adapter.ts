import { computed, Injectable, Signal } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IAction, ITableConfig } from '../helpers/models/ITableConfig';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { ICampaignModel } from '../helpers/models/ICampaignModel';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectAllCampaigns, selectLoading, selectError } from '../stores/campaign-store/campaign.selectors';
import * as CampaignActions from '../stores/campaign-store/campaign.actions';

@Injectable()
export class TableAdapter {
    public campaignsSignal: Signal<ICampaignModel[]>;
    public loadingSignal: Signal<boolean>;
    public errorSignal: Signal<any>;

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
        private store: Store,
        private dialog: MatDialog
    ) {
        
        // Subscribe to campaigns
        this.subs.push(this.store.select(selectAllCampaigns).subscribe(campaigns => {
            this.listSubject.next(campaigns);
            this.filteredListSubject.next(campaigns);
        }));

        // Subscribe to loading state
        this.loadingSignal = toSignal(this.store.select(selectLoading), { initialValue: false });

        // Subscribe to error state
        this.errorSignal = toSignal(this.store.select(selectError), { initialValue: null });

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
                    date: this.formatDate(campaign.date.toString()),
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
                    this.store.dispatch(CampaignActions.deleteCampaign({ id: item.id }));
                }
            }
        ];
    }

    public performSearch(searchValue: string): void {
        const filteredList = this.listSubject.value.filter(item =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.description.toLowerCase().includes(searchValue.toLowerCase())
        );
        this.filteredListSubject.next(filteredList);
    }

    private increasePoints(campaign: ICampaignModel): void {
        const updatedCampaign = {
            ...campaign,
            points: campaign.points + 1
        };
        this.store.dispatch(CampaignActions.updateCampaign({ campaign: updatedCampaign }));
    }

    private decreasePoints(campaign: ICampaignModel): void {
        const updatedCampaign = {
            ...campaign,
            points: Math.max(0, campaign.points - 1)
        };
        this.store.dispatch(CampaignActions.updateCampaign({ campaign: updatedCampaign }));
    }

    private formatDate(date: string): string {
        return new Date(date).toLocaleDateString();
    }

    public clean(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    }
}
