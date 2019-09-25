/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
/**
 * @template T
 */
export class AafGridComponent {
    /**
     * @param {?} location
     * @param {?} router
     * @param {?} ngxService
     */
    constructor(location, router, ngxService) {
        this.location = location;
        this.router = router;
        this.ngxService = ngxService;
        this.checkBoxFunction = false;
        this.advancedSearch = true;
        this.advanceFilter = false;
        this.diffrentiateAssignKits = false;
        this.paginationObj = {
            totalCount: 0,
            pageNo: 0,
            pageSize: 10
        };
    }
    // Return boolean to check Object type 
    /**
     * @param {?} columnName
     * @return {?}
     */
    isObj(columnName) {
        /** @type {?} */
        let returnObj = false;
        if (this.objectColumn.length > 0) {
            this.objectColumn.map((/**
             * @param {?} val
             * @param {?} key
             * @return {?}
             */
            (val, key) => {
                if (val.name == columnName) {
                    returnObj = true;
                }
            }));
        }
        return returnObj;
    }
    // At initilizing time set configuration also set data source
    /**
     * @return {?}
     */
    ngOnInit() {
        this.displayedColumns = this.config.finalDynamicDisplayColumns;
        this.checkBoxFunction = this.config.functionalityCheckBox;
        this.columns = this.config.columnData;
        this.filterInfo = this.config.customFilters;
        this.actionInfo = this.config.actionAttr;
        this.listingType = this.config.configurationFor;
        this.itemPerPage = this.config.itemPerPage;
        this.listHeader = this.config.listHeader;
        this.dataSourceInfo = this.config.sourceDataInfo;
        this.rootClasses = this.config.rootClasses;
        // All Events need to asign here
        this.backEvent = this.listHeader.backInfo.action;
        this.doFilter = this.filterInfo.searchAction;
        this.listActions = this.actionProvider;
        this.objectColumn = this.config.objectColumn;
        if ((this.listingType == 'usersData') || (this.listingType == 'users') || (this.listingType == 'role'))
            this.diffrentiateAssignKits = true;
        else
            this.diffrentiateAssignKits = false;
        // We require dataSource here So we need to call getListData function from ngOnIt
        /** @type {?} */
        let paginationObj = { size: this.paginationObj.pageSize, page: this.paginationObj.pageNo };
        this.getListData({}, paginationObj);
    }
    // For redirection 
    /**
     * @param {?} event
     * @return {?}
     */
    handleRedirection(event) {
        /** @type {?} */
        let preparedArray = [];
        preparedArray.push('/');
        this.config.customFilters.redirection.map((/**
         * @param {?} val
         * @return {?}
         */
        val => {
            preparedArray.push(val);
        }));
        if (event.target.value != '') {
            preparedArray.push(event.target.value);
        }
        this.router.navigate(preparedArray);
    }
    // Take caring of all actions
    /**
     * @param {?=} actionName
     * @param {?=} actionRow
     * @param {?=} actionValue
     * @return {?}
     */
    handleActions(actionName, actionRow, actionValue) {
        /** @type {?} */
        let actionInfo = { row: actionRow, dataInfo: actionValue };
        this.listActions[actionName](actionInfo);
    }
    // Prepare Pagination Obj
    /**
     * @return {?}
     */
    prepareFirstPagePagination() {
        return { size: this.paginationObj.pageSize, page: this.paginationObj.pageNo };
    }
    // On SUbmit of All Filters
    /**
     * @param {?} filterData
     * @return {?}
     */
    onSubmit(filterData) {
        if (this.formUserId) {
            filterData.userId = this.formUserId;
        }
        this.getListData(filterData, this.prepareFirstPagePagination());
    }
    // Call to Fetch Data commonly
    /**
     * @param {?=} filterInfo
     * @param {?=} pagingInfo
     * @return {?}
     */
    getListData(filterInfo, pagingInfo) {
        this.ngxService.start();
        /** @type {?} */
        let queryDataObj = { 'fiterData': filterInfo, 'pageInfo': pagingInfo };
        this.dataProvider.getData(queryDataObj).subscribe((/**
         * @param {?} resp
         * @return {?}
         */
        resp => {
            this.ngxService.stop();
            this.data = new MatTableDataSource(resp.result.rows);
            this.paginationObj.totalCount = resp.result.totalRows;
            this.paginationObj.pageSize = resp.result.pageSize;
            this.paginationObj.pageNo = resp.result.pageIndex;
            this.refreshConfiguration();
        }), (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            alert('Something went wrong...');
        }), (/**
         * @return {?}
         */
        () => {
            this.ngxService.stop();
        }));
    }
    // On Page Change Event
    /**
     * @param {?=} pageEvent
     * @return {?}
     */
    onPageChange(pageEvent) {
        this.paginationObj = {
            totalCount: pageEvent.length,
            pageNo: pageEvent.pageIndex,
            pageSize: pageEvent.pageSize
        };
        this.getListData({}, this.prepareFirstPagePagination());
        return pageEvent;
    }
    // Prepare DataSource in the Array as per the Listing requirment
    /**
     * @param {?} dataSource
     * @return {?}
     */
    getDataSource(dataSource) {
        this.paginationObj.totalCount = dataSource.length;
        /** @type {?} */
        let finalKitDataSource = new Array();
        finalKitDataSource['dataSource'] = dataSource;
        return finalKitDataSource;
    }
    // Do refresh all the Listing configuration
    /**
     * @return {?}
     */
    refreshConfiguration() {
        this.data.sort = this.sort;
        this.selection = new SelectionModel(true, []);
        // All Events need to asign here
        this.backEvent = this.listHeader.backInfo.action;
    }
    // Advance Search button
    /**
     * @return {?}
     */
    advanceSearch() {
        this.advancedSearch = true;
        this.advanceFilter = !this.advanceFilter;
    }
    // Back to Dashboard page
    /**
     * @return {?}
     */
    backToDashboard() {
        this.location.back();
    }
    // Kit Filtering Action
    /**
     * @return {?}
     */
    kitFilters() {
        this.getListData();
    }
    // Assigned Kit Filter Action
    /**
     * @return {?}
     */
    assignedKitFilters() {
        this.getListData();
    }
    /**
     * Whether the number of selected elements matches the total number of rows.
     * @return {?}
     */
    isAllSelected() {
        /** @type {?} */
        const numSelected = this.selection.selected.length;
        /** @type {?} */
        const numRows = this.data.data.length;
        return numSelected === numRows;
    }
    /**
     * Selects all rows if they are not all selected; otherwise clear selection.
     * @return {?}
     */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.data.data.forEach((/**
             * @param {?} row
             * @return {?}
             */
            row => this.selection.select(row)));
    }
    /**
     * The label for the checkbox on the passed row
     * @param {?=} row
     * @return {?}
     */
    checkboxLabel(row) {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
}
AafGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'aaf-grid',
                template: "<!-- Filters Info -->\r\n<div [ngClass]=\"['list-top-header','row',rootClasses.root]\">\r\n    <section *ngIf=\"listHeader\"\r\n        [ngClass]=\"['tondo-regular','d-i-block','p-0',rootClasses.headerTitle,diffrentiateAssignKits ? 'col-sm-12':'col-sm-3']\">\r\n        <div *ngIf=\"listHeader.backInfo\" class=\"d-i-block pdl-30\">\r\n            <p class=\"m-0\">\r\n                <a href=\"JavaScript:Void(0);\" (click)=\"this[backEvent]()\">\r\n                    <img class=\"back-icon\" src=\"assets/fonts/svg/{{ listHeader.backInfo.imageName }}\" />\r\n                    <span class=\"back\">{{listHeader.backInfo.title}}</span>\r\n                </a>\r\n            </p>\r\n        </div>\r\n        <div *ngIf=\"listHeader.listTitle\" class=\"d-i-block\">\r\n            <p class=\"list-title\">\r\n                {{listHeader.listTitle}}\r\n            </p>\r\n        </div>\r\n    </section>\r\n    <div\r\n        [ngClass]=\"['text-right','p-0',rootClasses.filters,rootClasses.headerTitle,diffrentiateAssignKits ? 'col-sm-12':'col-sm-9']\">\r\n        <section class=\"d-i-block kits\" [ngClass]=\"{ 'section-kit': advancedSearch }\">\r\n            <div *ngIf=\"!advanceFilter\">\r\n                <div *ngIf=\"filterInfo.default\">\r\n                    <form #filterForm=\"ngForm\" (ngSubmit)=\"onSubmit(filterForm.value)\"\r\n                        [ngClass]=\"{'row': !diffrentiateAssignKits}\">\r\n                        <div *ngFor=\"let defaultFilter of filterInfo.default; let i = index\">\r\n                            <div *ngIf=\"defaultFilter.inputType == 'text'\" class=\"d-i-block\">\r\n                                <mat-form-field class=\"input-border\" [ngClass]=\"{ 'input-kit': advancedSearch }\">\r\n                                    <mat-label *ngIf=\"defaultFilter.label\">{{defaultFilter.label}}</mat-label>\r\n                                    <input matInput [placeholder]=\"defaultFilter.placeHolder\"\r\n                                        [ngClass]=\"['form-control',defaultFilter.div_class]\" [name]=\"defaultFilter.key\"\r\n                                        ngModel>\r\n                                </mat-form-field>\r\n                                <mat-form-field class=\"float-right\" *ngIf=\"defaultFilter.isDropdown\">\r\n                                    <select matNativeControl *ngIf=\"filterInfo.dropdownData\"\r\n                                        (change)=\"handleRedirection($event)\">\r\n                                        <option [value]=\"optionInfo.value\"\r\n                                            *ngFor=\"let optionInfo of filterInfo.dropdownData\">\r\n                                            {{optionInfo.label}}\r\n                                        </option>\r\n                                    </select>\r\n                                </mat-form-field>\r\n                            </div>\r\n                            <div *ngIf=\"defaultFilter.inputType == 'select'\">\r\n                                <mat-select [name]=\"defaultFilter.key\" ngModel *ngIf=\"defaultFilter.options\"\r\n                                    placeholder=\"{{defaultFilter.placeholder}}\">\r\n                                    <mat-option [value]=\"actionOptions\"\r\n                                        *ngFor=\"let actionOptions of defaultFilter.options\">\r\n                                        {{actionOptions}}\r\n                                    </mat-option>\r\n                                </mat-select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"d-i-block float-right\" *ngIf=\"filterInfo.searchButton\">\r\n                            <div class=\"d-i-block\">\r\n                                <button type=\"submit\" class=\"search-btn\">Search</button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n            <div *ngIf=\"advanceFilter && !diffrentiateAssignKits\" class=\"d-i-block\">\r\n                <div *ngIf=\"filterInfo.advance\" class=\"d-i-block filter-parent\">\r\n                    <form #filterForm=\"ngForm\" (ngSubmit)=\"onSubmit(filterForm.value)\"\r\n                        [ngClass]=\"{'row': !diffrentiateAssignKits}\">\r\n                        <div *ngFor=\"let advanceFilter of filterInfo.advance\" class=\"d-i-block select-option\">\r\n                            <div *ngIf=\"advanceFilter.inputType == 'text'\" class=\"d-i-block\">\r\n                                <mat-form-field class=\"input-border\">\r\n                                    <mat-label *ngIf=\"advanceFilter.label\">{{advanceFilter.label}}</mat-label>\r\n                                    <input matInput [placeholder]=\"advanceFilter.placeHolder\" [name]=\"advanceFilter.key\"\r\n                                        ngModel>\r\n                                </mat-form-field>\r\n                            </div>\r\n                            <div *ngIf=\"advanceFilter.inputType == 'select'\" class=\"mat-opt\">\r\n                                <mat-select [name]=\"advanceFilter.key\" ngModel *ngIf=\"advanceFilter.options\"\r\n                                    [placeholder]=\"advanceFilter.placeHolder\">\r\n                                    <mat-option [value]=\"actionOptions\"\r\n                                        *ngFor=\"let actionOptions of advanceFilter.options\">\r\n                                        {{actionOptions}}\r\n                                    </mat-option>\r\n                                </mat-select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"d-i-block float-right\" *ngIf=\"filterInfo.searchButton\">\r\n                            <div class=\"d-i-block\">\r\n                                <button type=\"submit\" class=\"search-btn\">Search</button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </section>\r\n        <div *ngIf=\"filterInfo.searchButton && !diffrentiateAssignKits\">\r\n            <div class=\"search-btn-adv\">\r\n                <a class=\"a-search\" (click)=\"advanceSearch()\">Advanced Search</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- \r\n    Table Structure Starts from Here \r\n    need to add if condition *ngIf=\"data\" in table so that console error will be removed\r\n-->\r\n<div [ngClass]=\"['table-responsive',rootClasses.grid]\">\r\n    <table [ngClass]=\"[data !== undefined ? 'visible': 'hidden']\" mat-table [dataSource]=\"data\" matSort\r\n        class=\"mat-elevation-z8 table-column\">\r\n        <!-- CheckBox Implementation -->\r\n        <ng-container *ngIf=\"checkBoxFunction\" matColumnDef=\"select\">\r\n            <th mat-header-cell *matHeaderCellDef>\r\n                <mat-checkbox (change)=\"$event ? masterToggle() : null\"\r\n                    [checked]=\"selection.hasValue() && isAllSelected()\"\r\n                    [indeterminate]=\"selection.hasValue() && !isAllSelected()\" [aria-label]=\"checkboxLabel()\">\r\n                </mat-checkbox>\r\n            </th>\r\n            <td mat-cell *matCellDef=\"let row\">\r\n                <mat-checkbox (click)=\"$event.stopPropagation()\" (change)=\"$event ? selection.toggle(row) : null\"\r\n                    [checked]=\"selection.isSelected(row)\" [aria-label]=\"checkboxLabel(row)\">\r\n                </mat-checkbox>\r\n            </td>\r\n        </ng-container>\r\n        <!-- Dynamic Column with Header Implementation -->\r\n        <ng-container *ngFor=\"let column of columns\" matColumnDef=\"{{column.name}}\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>{{column.label}}</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n                <ng-container *ngIf=\"isObj(column.name);then objectTemplate else stringTemplate\"></ng-container>\r\n                <ng-template #objectTemplate>\r\n                    <ng-container *ngFor=\"let columnObj of objectColumn\">\r\n                        <div *ngIf=\"columnObj.name == column.name\">\r\n                            <ul class=\"m-0 p-0\">\r\n                                <li *ngFor=\"let columnObjKeys of columnObj.dataColumns\">\r\n                                    {{element[columnObjKeys]}}\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                    </ng-container>\r\n                </ng-template>\r\n                <ng-template #stringTemplate>\r\n                    <p>{{element[column.name]}}</p>\r\n                </ng-template>\r\n            </td>\r\n        </ng-container>\r\n        <!-- Actions Column Implementation -->\r\n        <ng-container matColumnDef=\"actions\">\r\n            <th mat-header-cell *matHeaderCellDef></th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n                <ng-container *ngFor=\"let action of actionInfo\">\r\n                    <mat-select *ngIf=\"action.type === 'select' && action.options\" placeholder=\"{{action.name}}\"\r\n                        (selectionChange)=\"handleActions(action.actionHandler,element,$event.value)\">\r\n                        <mat-option [value]=\"actionOptions\" *ngFor=\"let actionOptions of action.options\">\r\n                            {{actionOptions}}\r\n                        </mat-option>\r\n                    </mat-select>\r\n                    <div *ngIf=\"action.type === 'button'\" class=\"d-i-block f-16 img-wrapper\"\r\n                        (click)=\"handleActions(action.actionHandler,element)\">\r\n                        <figure *ngIf=\"action.icon\" class=\"text-center m-0\">\r\n                            <img src=\"assets/fonts/svg/{{ action.iconName }}\" alt=\"\">\r\n                        </figure>\r\n                        <ng-container *ngIf=\"action.titlecondition;then conditionalString else simpleString\">\r\n                        </ng-container>\r\n                        <ng-template #conditionalString>\r\n                            <div *ngIf=\"action.titlecondition == 'append'\">\r\n                                {{ element[action.conditionType.source] + action.conditionType.name}}\r\n                            </div>\r\n                            <div *ngIf=\"action.titlecondition == 'conditional'\">\r\n                                <ng-container *ngFor=\"let toggeling of action.conditionType.condition\">\r\n                                    <div *ngIf=\"toggeling.check == element[action.conditionType.source]\">\r\n                                        {{toggeling.name}}\r\n                                    </div>\r\n                                </ng-container>\r\n                            </div>\r\n                        </ng-template>\r\n                        <ng-template #simpleString>\r\n                            {{action.name}}\r\n                        </ng-template>\r\n                    </div>\r\n                </ng-container>\r\n            </td>\r\n        </ng-container>\r\n        <div>\r\n            <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n        </div>\r\n        <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\" (click)=\"selection.toggle(row)\"></tr>\r\n    </table>\r\n    <mat-paginator (page)=\"pageEvent=onPageChange($event)\" [pageSize]=\"paginationObj.pageSize\"\r\n        [length]=\"paginationObj.totalCount\" class=\"custom-pagination\" [pageSizeOptions]=\"[5, 10, 20]\"\r\n        showFirstLastButtons></mat-paginator>\r\n</div>",
                styles: [".list-top-header{padding:18px 14px 0;border:1px solid #707070;overflow:hidden}.back{font-size:18px;color:#ed1c24;padding:0 20px 0 15px}.list-title{font-size:26px;color:#ed1c24}.back-icon{height:auto;width:30px;vertical-align:top}.input-border{width:148px;height:39px}.input-border input{padding:5px 0 5px 10px;border:1px solid #d7dae2;margin:0;height:39px;border-radius:2px;width:147px;box-shadow:1px 1px 1px 1px #d7dae2}.input-border .mat-form-field-wrapper{padding-bottom:0}.search-btn{height:39px;width:155px;outline:0;border:none;font-size:18px;color:#ed1c24;padding:0;border-radius:3px;background:#f5f5f5;margin:0 13px}.a-search{color:#01a9f4!important;font-size:13px;cursor:pointer}.list-top-header .tondo-regular.d-i-block{vertical-align:top;margin-right:0}.search-btn-adv{text-align:right;width:77.5%;padding:10px 0}.select-option{display:inline-block;width:148px;vertical-align:top;box-shadow:1px 1px 1px 1px #d7dae2;margin:0 17px}.filter-parent{vertical-align:top}.filter-parent .mat-opt{padding:9px 10px;border:1px solid #d7dae2;border-radius:3px}.default-block{margin-right:17px}.input-kit{width:248px;margin-right:20px}.input-kit input{width:248px}.section-kit{text-align:left;margin-right:16px;padding-top:4px}.user-header .section-kit,.user-header .section-kit .input-kit,.user-header .section-kit div{width:100%;height:100%}.table-column td.mat-cell,td.mat-footer-cell,th.mat-header-cell{font-size:17px;font-family:tondo-regular;color:#707070;padding:12px 0 10px 25px;vertical-align:top}.m-0 a:hover{text-decoration:none}.input-search-box{height:65px!important;width:100%!important;color:#fff;padding-left:23px;border:none;font-size:22px;background:#707070}.img-wrapper{margin-left:51px;cursor:pointer;width:75px;text-align:center;vertical-align:top}.img-wrapper figure.text-center.m-0{padding-bottom:12px}.filters-asigned-kits .section-kit,.filters-asigned-kits .section-kit .d-i-block,.filters-asigned-kits .section-kit .input-kit{width:100%;font-size:22px;color:#fff}.filters-asigned-kits .section-kit{height:65px}.filters-asigned-kits .section-kit .input-border input{border:none}.pdl-30{padding-left:30px}.role-grid .img-wrapper{margin-left:0}@media screen and (max-width:767px){.list-title{font-size:20px;margin:0}.list-top-header{padding-bottom:0}.input-search-box{font-size:14px;height:45px!important}.user-header .mat-form-field-appearance-legacy .mat-form-field-label{font-size:16px;line-height:1}.role-grid .table-column td ul.m-0 li{font-size:14px;line-height:1}.role-grid .table-column td ul.m-0 li:last-child{font-size:18px;line-height:1}.search-box{height:50px}.img-wrapper{margin-left:0;width:80px;text-align:center}.back{font-size:16px;padding:0 10px}.img-wrapper figure.text-center.m-0{padding-bottom:5px}.img-wrapper figure.text-center.m-0 img{width:20%}.table-column{margin-bottom:20px}.list-top-header .tondo-regular.d-i-block{margin-right:0}.input-kit{width:150px;margin-right:20px}}"]
            }] }
];
/** @nocollapse */
AafGridComponent.ctorParameters = () => [
    { type: Location },
    { type: Router },
    { type: NgxUiLoaderService }
];
AafGridComponent.propDecorators = {
    config: [{ type: Input }],
    dataProvider: [{ type: Input }],
    actionProvider: [{ type: Input }],
    paginator: [{ type: ViewChild, args: [MatPaginator,] }],
    sort: [{ type: ViewChild, args: [MatSort,] }]
};
if (false) {
    /** @type {?} */
    AafGridComponent.prototype.config;
    /** @type {?} */
    AafGridComponent.prototype.dataProvider;
    /** @type {?} */
    AafGridComponent.prototype.actionProvider;
    /** @type {?} */
    AafGridComponent.prototype.displayingColumns;
    /** @type {?} */
    AafGridComponent.prototype.displayingDataSource;
    /** @type {?} */
    AafGridComponent.prototype.displayedColumns;
    /** @type {?} */
    AafGridComponent.prototype.data;
    /** @type {?} */
    AafGridComponent.prototype.selection;
    /** @type {?} */
    AafGridComponent.prototype.columns;
    /** @type {?} */
    AafGridComponent.prototype.checkBoxFunction;
    /** @type {?} */
    AafGridComponent.prototype.actionInfo;
    /** @type {?} */
    AafGridComponent.prototype.filterInfo;
    /** @type {?} */
    AafGridComponent.prototype.itemPerPage;
    /** @type {?} */
    AafGridComponent.prototype.listingType;
    /** @type {?} */
    AafGridComponent.prototype.listHeader;
    /** @type {?} */
    AafGridComponent.prototype.advancedSearch;
    /** @type {?} */
    AafGridComponent.prototype.advanceFilter;
    /** @type {?} */
    AafGridComponent.prototype.diffrentiateAssignKits;
    /** @type {?} */
    AafGridComponent.prototype.dataSourceInfo;
    /** @type {?} */
    AafGridComponent.prototype.rootClasses;
    /** @type {?} */
    AafGridComponent.prototype.paginationObj;
    /** @type {?} */
    AafGridComponent.prototype.listActions;
    /** @type {?} */
    AafGridComponent.prototype.paginator;
    /** @type {?} */
    AafGridComponent.prototype.sort;
    /** @type {?} */
    AafGridComponent.prototype.pageEvent;
    /** @type {?} */
    AafGridComponent.prototype.backEvent;
    /** @type {?} */
    AafGridComponent.prototype.doFilter;
    /** @type {?} */
    AafGridComponent.prototype.deleteAssignedKit;
    /** @type {?} */
    AafGridComponent.prototype.kitNumber;
    /** @type {?} */
    AafGridComponent.prototype.formUserId;
    /** @type {?} */
    AafGridComponent.prototype.objectColumn;
    /**
     * @type {?}
     * @private
     */
    AafGridComponent.prototype.location;
    /**
     * @type {?}
     * @private
     */
    AafGridComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    AafGridComponent.prototype.ngxService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWFmLWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYWFmLWdyaWQvIiwic291cmNlcyI6WyJsaWIvYWFmLWdyaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBWSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFTbkQsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7O0lBNkMzQixZQUNVLFFBQWtCLEVBQ2xCLE1BQWMsRUFDZCxVQUE4QjtRQUY5QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxlQUFVLEdBQVYsVUFBVSxDQUFvQjtRQWpDeEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBTWxDLG1CQUFjLEdBQVksSUFBSSxDQUFDO1FBQy9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLDJCQUFzQixHQUFZLEtBQUssQ0FBQztRQUd4QyxrQkFBYSxHQUFHO1lBQ2QsVUFBVSxFQUFFLENBQUM7WUFDYixNQUFNLEVBQUUsQ0FBQztZQUNULFFBQVEsRUFBRSxFQUFFO1NBQ2IsQ0FBQTtJQXFCRCxDQUFDOzs7Ozs7SUFHRCxLQUFLLENBQUMsVUFBVTs7WUFDVixTQUFTLEdB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bmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRUYWJsZURhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJsZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3IsUGFnZUV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBYWZHcmlkRGF0YVByb3ZpZGVyIH0gZnJvbSAnLi9hYWYtZ3JpZC1kYXRhLXByb3ZpZGVyJztcbmltcG9ydCB7IE5neFVpTG9hZGVyU2VydmljZSB9IGZyb20gJ25neC11aS1sb2FkZXInO1xuaW1wb3J0IHsgQWN0aW9uc1Byb3ZpZGVyIH0gZnJvbSAnLi9hY3Rpb25zLXByb3ZpZGVyJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhYWYtZ3JpZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9hYWYtZ3JpZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2FhZi1ncmlkLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBYWZHcmlkQ29tcG9uZW50PFQ+IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvLyBBbGwgdGhlIGNvbmZpZ3VyYXRpb24gbmVlZCB0byBwYXNzIGluIENvbmZpZyB2YXJpYWJsZSBcbiAgQElucHV0KCkgY29uZmlnOiBhbnk7XG4gIC8vIEFsbCB0aGUgRGF0YSBTb3VyY2UgbmVlZCB0byBwYXNzIGFzIGluIERhdGFQcm92aWRlciBGb3JtXG4gIEBJbnB1dCgpIGRhdGFQcm92aWRlcjogQWFmR3JpZERhdGFQcm92aWRlcjxUPjtcbiAgLy8gSGVyZSB3ZSBhcmUgZGVmaW5uZyBhbGwgdGhlIGFjdGlvbiBQcm92aWRlcnNcbiAgQElucHV0KCkgYWN0aW9uUHJvdmlkZXI6IEFjdGlvbnNQcm92aWRlcjtcblxuICBkaXNwbGF5aW5nQ29sdW1uczogYW55O1xuICBkaXNwbGF5aW5nRGF0YVNvdXJjZTogYW55O1xuICBkaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXTtcbiAgZGF0YTogYW55O1xuICBzZWxlY3Rpb246IGFueTtcbiAgY29sdW1uczogYW55O1xuICBjaGVja0JveEZ1bmN0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gIGFjdGlvbkluZm86IGFueTtcbiAgZmlsdGVySW5mbzogYW55O1xuICBpdGVtUGVyUGFnZTogYW55O1xuICBsaXN0aW5nVHlwZTogYW55O1xuICBsaXN0SGVhZGVyOiBhbnk7XG4gIGFkdmFuY2VkU2VhcmNoOiBib29sZWFuID0gdHJ1ZTtcbiAgYWR2YW5jZUZpbHRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBkaWZmcmVudGlhdGVBc3NpZ25LaXRzOiBib29sZWFuID0gZmFsc2U7XG4gIGRhdGFTb3VyY2VJbmZvOiBhbnk7XG4gIHJvb3RDbGFzc2VzOiBhbnk7XG4gIHBhZ2luYXRpb25PYmogPSB7XG4gICAgdG90YWxDb3VudDogMCxcbiAgICBwYWdlTm86IDAsXG4gICAgcGFnZVNpemU6IDEwXG4gIH1cbiAgbGlzdEFjdGlvbnM6IGFueTtcbiAgLy8gRm9yIEFuZ3VsYXIgUGFnaW5hdGlvbiB3ZSBuZWVkIHJlZiBvZiBNYXRQYWdpbmF0b3JcbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuICAvLyBGb3IgQW5ndWxhciBTb3J0aW5nIHdlIG5lZWQgcmVmIG9mIE1hdFNvcnRcbiAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0OiBNYXRTb3J0O1xuICBwYWdlRXZlbnQ6IFBhZ2VFdmVudDtcblxuICAvLyBFdmVudCBIYW5kbGVycyBwYXNzIGZyb20gQ29uZmlndXJhdGlvbiB3aWxsIGdvaW5nIHRvIGFzc2lnbiBvbiB0aGVzZSBkZWZpbmVkIHZhcmlhYmxlc1xuICBiYWNrRXZlbnQ6IGFueTtcbiAgZG9GaWx0ZXI6IGFueTtcbiAgZGVsZXRlQXNzaWduZWRLaXQ6IGFueTtcbiAga2l0TnVtYmVyOiBhbnk7XG4gIGZvcm1Vc2VySWQ6IGFueTtcbiAgb2JqZWN0Q29sdW1uOiBhbnk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBuZ3hTZXJ2aWNlOiBOZ3hVaUxvYWRlclNlcnZpY2VcbiAgKSB7XG5cbiAgfVxuXG4gIC8vIFJldHVybiBib29sZWFuIHRvIGNoZWNrIE9iamVjdCB0eXBlIFxuICBpc09iaihjb2x1bW5OYW1lKSB7XG4gICAgbGV0IHJldHVybk9iaiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLm9iamVjdENvbHVtbi5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm9iamVjdENvbHVtbi5tYXAoKHZhbCwga2V5KSA9PiB7XG4gICAgICAgIGlmICh2YWwubmFtZSA9PSBjb2x1bW5OYW1lKSB7XG4gICAgICAgICAgcmV0dXJuT2JqID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5PYmo7XG4gIH1cbiAgLy8gQXQgaW5pdGlsaXppbmcgdGltZSBzZXQgY29uZmlndXJhdGlvbiBhbHNvIHNldCBkYXRhIHNvdXJjZVxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMgPSB0aGlzLmNvbmZpZy5maW5hbER5bmFtaWNEaXNwbGF5Q29sdW1ucztcbiAgICB0aGlzLmNoZWNrQm94RnVuY3Rpb24gPSB0aGlzLmNvbmZpZy5mdW5jdGlvbmFsaXR5Q2hlY2tCb3g7XG4gICAgdGhpcy5jb2x1bW5zID0gdGhpcy5jb25maWcuY29sdW1uRGF0YTtcbiAgICB0aGlzLmZpbHRlckluZm8gPSB0aGlzLmNvbmZpZy5jdXN0b21GaWx0ZXJzO1xuICAgIHRoaXMuYWN0aW9uSW5mbyA9IHRoaXMuY29uZmlnLmFjdGlvbkF0dHI7XG4gICAgdGhpcy5saXN0aW5nVHlwZSA9IHRoaXMuY29uZmlnLmNvbmZpZ3VyYXRpb25Gb3I7XG4gICAgdGhpcy5pdGVtUGVyUGFnZSA9IHRoaXMuY29uZmlnLml0ZW1QZXJQYWdlO1xuICAgIHRoaXMubGlzdEhlYWRlciA9IHRoaXMuY29uZmlnLmxpc3RIZWFkZXI7XG4gICAgdGhpcy5kYXRhU291cmNlSW5mbyA9IHRoaXMuY29uZmlnLnNvdXJjZURhdGFJbmZvO1xuICAgIHRoaXMucm9vdENsYXNzZXMgPSB0aGlzLmNvbmZpZy5yb290Q2xhc3NlcztcbiAgICAvLyBBbGwgRXZlbnRzIG5lZWQgdG8gYXNpZ24gaGVyZVxuICAgIHRoaXMuYmFja0V2ZW50ID0gdGhpcy5saXN0SGVhZGVyLmJhY2tJbmZvLmFjdGlvbjtcbiAgICB0aGlzLmRvRmlsdGVyID0gdGhpcy5maWx0ZXJJbmZvLnNlYXJjaEFjdGlvbjtcbiAgICB0aGlzLmxpc3RBY3Rpb25zID0gdGhpcy5hY3Rpb25Qcm92aWRlcjtcbiAgICB0aGlzLm9iamVjdENvbHVtbiA9IHRoaXMuY29uZmlnLm9iamVjdENvbHVtbjtcblxuICAgIGlmICgodGhpcy5saXN0aW5nVHlwZSA9PSAndXNlcnNEYXRhJykgfHwgKHRoaXMubGlzdGluZ1R5cGUgPT0gJ3VzZXJzJykgfHwgKHRoaXMubGlzdGluZ1R5cGUgPT0gJ3JvbGUnKSlcbiAgICAgIHRoaXMuZGlmZnJlbnRpYXRlQXNzaWduS2l0cyA9IHRydWVcbiAgICBlbHNlXG4gICAgICB0aGlzLmRpZmZyZW50aWF0ZUFzc2lnbktpdHMgPSBmYWxzZVxuXG4gICAgLy8gV2UgcmVxdWlyZSBkYXRhU291cmNlIGhlcmUgU28gd2UgbmVlZCB0byBjYWxsIGdldExpc3REYXRhIGZ1bmN0aW9uIGZyb20gbmdPbkl0XG4gICAgbGV0IHBhZ2luYXRpb25PYmogPSB7IHNpemU6IHRoaXMucGFnaW5hdGlvbk9iai5wYWdlU2l6ZSwgcGFnZTogdGhpcy5wYWdpbmF0aW9uT2JqLnBhZ2VObyB9O1xuICAgIHRoaXMuZ2V0TGlzdERhdGEoe30sIHBhZ2luYXRpb25PYmopO1xuICB9XG4gIC8vIEZvciByZWRpcmVjdGlvbiBcbiAgaGFuZGxlUmVkaXJlY3Rpb24oZXZlbnQpIHtcbiAgICBsZXQgcHJlcGFyZWRBcnJheSA9IFtdO1xuICAgIHByZXBhcmVkQXJyYXkucHVzaCgnLycpO1xuICAgIHRoaXMuY29uZmlnLmN1c3RvbUZpbHRlcnMucmVkaXJlY3Rpb24ubWFwKHZhbCA9PiB7XG4gICAgICBwcmVwYXJlZEFycmF5LnB1c2godmFsKTtcbiAgICB9KTtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlICE9ICcnKSB7XG4gICAgICBwcmVwYXJlZEFycmF5LnB1c2goZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUocHJlcGFyZWRBcnJheSk7XG4gIH1cbiAgLy8gVGFrZSBjYXJpbmcgb2YgYWxsIGFjdGlvbnNcbiAgaGFuZGxlQWN0aW9ucyhhY3Rpb25OYW1lPzogYW55LCBhY3Rpb25Sb3c/OiBhbnksIGFjdGlvblZhbHVlPzogYW55KSB7XG4gICAgbGV0IGFjdGlvbkluZm8gPSB7IHJvdzogYWN0aW9uUm93LCBkYXRhSW5mbzogYWN0aW9uVmFsdWUgfTtcbiAgICB0aGlzLmxpc3RBY3Rpb25zW2FjdGlvbk5hbWVdKGFjdGlvbkluZm8pO1xuICB9XG4gIC8vIFByZXBhcmUgUGFnaW5hdGlvbiBPYmpcbiAgcHJlcGFyZUZpcnN0UGFnZVBhZ2luYXRpb24oKSB7XG4gICAgcmV0dXJuIHsgc2l6ZTogdGhpcy5wYWdpbmF0aW9uT2JqLnBhZ2VTaXplLCBwYWdlOiB0aGlzLnBhZ2luYXRpb25PYmoucGFnZU5vIH07XG4gIH1cbiAgLy8gT24gU1VibWl0IG9mIEFsbCBGaWx0ZXJzXG4gIG9uU3VibWl0KGZpbHRlckRhdGE6IGFueSkge1xuICAgIGlmICh0aGlzLmZvcm1Vc2VySWQpIHtcbiAgICAgIGZpbHRlckRhdGEudXNlcklkID0gdGhpcy5mb3JtVXNlcklkO1xuICAgIH1cbiAgICB0aGlzLmdldExpc3REYXRhKGZpbHRlckRhdGEsIHRoaXMucHJlcGFyZUZpcnN0UGFnZVBhZ2luYXRpb24oKSk7XG4gIH1cbiAgLy8gQ2FsbCB0byBGZXRjaCBEYXRhIGNvbW1vbmx5XG4gIGdldExpc3REYXRhKGZpbHRlckluZm8/OiBhbnksIHBhZ2luZ0luZm8/OiBhbnkpIHsgICAgIFxuICAgIHRoaXMubmd4U2VydmljZS5zdGFydCgpO1xuICAgIGxldCBxdWVyeURhdGFPYmogPSB7ICdmaXRlckRhdGEnOiBmaWx0ZXJJbmZvLCAncGFnZUluZm8nOiBwYWdpbmdJbmZvIH07XG4gICAgdGhpcy5kYXRhUHJvdmlkZXIuZ2V0RGF0YShxdWVyeURhdGFPYmopLnN1YnNjcmliZShcbiAgICAgIHJlc3AgPT4geyAgICAgICAgICAgICAgICBcbiAgICAgICAgdGhpcy5uZ3hTZXJ2aWNlLnN0b3AoKTtcbiAgICAgICAgdGhpcy5kYXRhID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZShyZXNwLnJlc3VsdC5yb3dzKTtcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uT2JqLnRvdGFsQ291bnQgPSByZXNwLnJlc3VsdC50b3RhbFJvd3M7XG4gICAgICAgIHRoaXMucGFnaW5hdGlvbk9iai5wYWdlU2l6ZSA9IHJlc3AucmVzdWx0LnBhZ2VTaXplO1xuICAgICAgICB0aGlzLnBhZ2luYXRpb25PYmoucGFnZU5vID0gcmVzcC5yZXN1bHQucGFnZUluZGV4O1xuICAgICAgICB0aGlzLnJlZnJlc2hDb25maWd1cmF0aW9uKCk7ICAgICAgICBcbiAgICAgIH0sXG4gICAgICBlcnIgPT4ge1xuICAgICAgICBhbGVydCgnU29tZXRoaW5nIHdlbnQgd3JvbmcuLi4nKTtcbiAgICAgIH0sXG4gICAgICAoKT0+e1xuICAgICAgICB0aGlzLm5neFNlcnZpY2Uuc3RvcCgpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbiAgLy8gT24gUGFnZSBDaGFuZ2UgRXZlbnRcbiAgb25QYWdlQ2hhbmdlKHBhZ2VFdmVudD86IFBhZ2VFdmVudCkge1xuICAgIHRoaXMucGFnaW5hdGlvbk9iaiA9IHtcbiAgICAgIHRvdGFsQ291bnQ6IHBhZ2VFdmVudC5sZW5ndGgsXG4gICAgICBwYWdlTm86IHBhZ2VFdmVudC5wYWdlSW5kZXgsXG4gICAgICBwYWdlU2l6ZTogcGFnZUV2ZW50LnBhZ2VTaXplXG4gICAgfVxuICAgIHRoaXMuZ2V0TGlzdERhdGEoe30sIHRoaXMucHJlcGFyZUZpcnN0UGFnZVBhZ2luYXRpb24oKSk7XG4gICAgcmV0dXJuIHBhZ2VFdmVudDtcbiAgfVxuICAvLyBQcmVwYXJlIERhdGFTb3VyY2UgaW4gdGhlIEFycmF5IGFzIHBlciB0aGUgTGlzdGluZyByZXF1aXJtZW50XG4gIGdldERhdGFTb3VyY2UoZGF0YVNvdXJjZTogYW55KSB7XG4gICAgdGhpcy5wYWdpbmF0aW9uT2JqLnRvdGFsQ291bnQgPSBkYXRhU291cmNlLmxlbmd0aDtcbiAgICBsZXQgZmluYWxLaXREYXRhU291cmNlID0gbmV3IEFycmF5KCk7XG4gICAgZmluYWxLaXREYXRhU291cmNlWydkYXRhU291cmNlJ10gPSBkYXRhU291cmNlO1xuICAgIHJldHVybiBmaW5hbEtpdERhdGFTb3VyY2U7XG4gIH1cbiAgLy8gRG8gcmVmcmVzaCBhbGwgdGhlIExpc3RpbmcgY29uZmlndXJhdGlvblxuICByZWZyZXNoQ29uZmlndXJhdGlvbigpIHtcbiAgICB0aGlzLmRhdGEuc29ydCA9IHRoaXMuc29ydDtcbiAgICB0aGlzLnNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb25Nb2RlbCh0cnVlLCBbXSk7XG4gICAgLy8gQWxsIEV2ZW50cyBuZWVkIHRvIGFzaWduIGhlcmVcbiAgICB0aGlzLmJhY2tFdmVudCA9IHRoaXMubGlzdEhlYWRlci5iYWNrSW5mby5hY3Rpb247ICAgIFxuICB9XG4gIC8vIEFkdmFuY2UgU2VhcmNoIGJ1dHRvblxuICBhZHZhbmNlU2VhcmNoKCkge1xuICAgIHRoaXMuYWR2YW5jZWRTZWFyY2ggPSB0cnVlO1xuICAgIHRoaXMuYWR2YW5jZUZpbHRlciA9ICF0aGlzLmFkdmFuY2VGaWx0ZXI7XG4gIH1cbiAgLy8gQmFjayB0byBEYXNoYm9hcmQgcGFnZVxuICBiYWNrVG9EYXNoYm9hcmQoKSB7XG4gICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XG4gIH1cbiAgLy8gS2l0IEZpbHRlcmluZyBBY3Rpb25cbiAga2l0RmlsdGVycygpIHtcbiAgICB0aGlzLmdldExpc3REYXRhKCk7XG4gIH1cbiAgLy8gQXNzaWduZWQgS2l0IEZpbHRlciBBY3Rpb25cbiAgYXNzaWduZWRLaXRGaWx0ZXJzKCkge1xuICAgIHRoaXMuZ2V0TGlzdERhdGEoKTtcbiAgfVxuICAvKiogV2hldGhlciB0aGUgbnVtYmVyIG9mIHNlbGVjdGVkIGVsZW1lbnRzIG1hdGNoZXMgdGhlIHRvdGFsIG51bWJlciBvZiByb3dzLiAqL1xuICBpc0FsbFNlbGVjdGVkKCkge1xuICAgIGNvbnN0IG51bVNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoO1xuICAgIGNvbnN0IG51bVJvd3MgPSB0aGlzLmRhdGEuZGF0YS5sZW5ndGg7XG4gICAgcmV0dXJuIG51bVNlbGVjdGVkID09PSBudW1Sb3dzO1xuICB9XG4gIC8qKiBTZWxlY3RzIGFsbCByb3dzIGlmIHRoZXkgYXJlIG5vdCBhbGwgc2VsZWN0ZWQ7IG90aGVyd2lzZSBjbGVhciBzZWxlY3Rpb24uICovXG4gIG1hc3RlclRvZ2dsZSgpIHtcbiAgICB0aGlzLmlzQWxsU2VsZWN0ZWQoKSA/XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpIDpcbiAgICAgIHRoaXMuZGF0YS5kYXRhLmZvckVhY2gocm93ID0+IHRoaXMuc2VsZWN0aW9uLnNlbGVjdChyb3cpKTtcbiAgfVxuICAvKiogVGhlIGxhYmVsIGZvciB0aGUgY2hlY2tib3ggb24gdGhlIHBhc3NlZCByb3cgKi9cbiAgY2hlY2tib3hMYWJlbChyb3c/OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmICghcm93KSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5pc0FsbFNlbGVjdGVkKCkgPyAnc2VsZWN0JyA6ICdkZXNlbGVjdCd9IGFsbGA7XG4gICAgfVxuICAgIHJldHVybiBgJHt0aGlzLnNlbGVjdGlvbi5pc1NlbGVjdGVkKHJvdykgPyAnZGVzZWxlY3QnIDogJ3NlbGVjdCd9IHJvdyAke3Jvdy5wb3NpdGlvbiArIDF9YDtcbiAgfVxuXG5cbn1cbiJdfQ==