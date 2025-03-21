import { Signal } from "@angular/core";

export interface ITableConfig {
    showHeader: boolean;
    showFooter: boolean;
    titles: Array<string>;
    records: Signal<any[]>;
    actions?: IAction[];
}

export interface IAction {
    iconName: string;
    actionName: string;
    function: Function;
}