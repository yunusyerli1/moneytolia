export interface ICampaignModel<T = number> {
  title: string;
  description: string;
  points: T;
  date: Date;
  id: string;
  [key: string]: any;
}

export interface ITableCampaignModel {
  title: string;
  description: string;
  points: { value: number; actionName: string };
  date: Date;
  id: string;
}
