import { OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AafGridDataProvider } from './aaf-grid-data-provider';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActionsProvider } from './actions-provider';
export declare class AafGridComponent<T> implements OnInit {
    private location;
    private router;
    private ngxService;
    config: any;
    dataProvider: AafGridDataProvider<T>;
    actionProvider: ActionsProvider;
    displayingColumns: any;
    displayingDataSource: any;
    displayedColumns: string[];
    data: any;
    selection: any;
    columns: any;
    checkBoxFunction: boolean;
    actionInfo: any;
    filterInfo: any;
    itemPerPage: any;
    listingType: any;
    listHeader: any;
    advancedSearch: boolean;
    advanceFilter: boolean;
    diffrentiateAssignKits: boolean;
    dataSourceInfo: any;
    rootClasses: any;
    paginationObj: {
        totalCount: number;
        pageNo: number;
        pageSize: number;
    };
    listActions: any;
    paginator: MatPaginator;
    sort: MatSort;
    pageEvent: PageEvent;
    backEvent: any;
    doFilter: any;
    deleteAssignedKit: any;
    kitNumber: any;
    formUserId: any;
    objectColumn: any;
    constructor(location: Location, router: Router, ngxService: NgxUiLoaderService);
    isObj(columnName: any): boolean;
    ngOnInit(): void;
    handleRedirection(event: any): void;
    handleActions(actionName?: any, actionRow?: any, actionValue?: any): void;
    prepareFirstPagePagination(): {
        size: number;
        page: number;
    };
    onSubmit(filterData: any): void;
    getListData(filterInfo?: any, pagingInfo?: any): void;
    onPageChange(pageEvent?: PageEvent): PageEvent;
    getDataSource(dataSource: any): any[];
    refreshConfiguration(): void;
    advanceSearch(): void;
    backToDashboard(): void;
    kitFilters(): void;
    assignedKitFilters(): void;
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected(): boolean;
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(): void;
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string;
}
