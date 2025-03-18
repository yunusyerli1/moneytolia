import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable, of } from "rxjs";
import { ICampaignModel } from "../helpers/models/ICampaignModel";
import { deepClone } from "../helpers/utils/object-utils";
import { LocalstorageService } from "../services/localstorage.service";

const initialState: ICampaignModel[] = [];

let internalState: ICampaignModel[] = deepClone(initialState);

@Injectable({
  providedIn: 'root',
})
export class CampaignStore {

  private store = new BehaviorSubject<ICampaignModel[]>(internalState);
  public state$ = this.store.asObservable();

  constructor(private localStorageService: LocalstorageService) { }

  init(): void {

    if(!internalState.length) {
      internalState = this.getLocalStorage();
      this.addToState(internalState);
    }
  }

  private updateState(campaigns: ICampaignModel[]): void {
    this.store.next(internalState = campaigns);
    this.setLocalStorage(campaigns);
  }

  public addToState(campaigns: ICampaignModel[]): void {
    const currentList = this.store.getValue();
    const updatedArray = [...currentList, ...campaigns];
    this.updateState(updatedArray);
  }

  public updateCampaign(campaign: ICampaignModel): void {
    const currentList = this.store.getValue();
    const updatedList = currentList.map((item) => {
      if (item.id === campaign.id) {
        return campaign;
      }
      return item;
    });
    this.updateState(updatedList);
  }

  public deleteCampaign(id: string): void {
    const currentList = this.store.getValue();
    const filteredArray = currentList.filter((campaign) => campaign.id !== id);
    this.updateState(filteredArray);
  }

  private setLocalStorage(campaigns: ICampaignModel[]): void {
    this.localStorageService.setItem("campaigns", JSON.stringify(campaigns));
  }

  private getLocalStorage(): ICampaignModel[] {
    const storedData = this.localStorageService.getItem("campaigns");
    return storedData ? JSON.parse(storedData) : [];
  }


  get state(): ICampaignModel[] {
    return this.store.getValue();
  }

  public getCampaigns(): Observable<ICampaignModel[]> {
    return this.store;
  }

  search(search: string) {
    console.log("search", search)
  
  }

}
