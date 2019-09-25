import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Injectable, NgModule, Component, ViewChild, Input, defineInjectable } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Location, CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSortModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatGridListModule, MatPaginatorModule, MatFormFieldModule, MatDividerModule, MatTooltipModule, MatListModule, MatOptionModule, MatTabsModule, MatButtonToggleModule, MatChipsModule, MatExpansionModule, MatRippleModule, MatSidenavModule, MatSliderModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderService, NgxUiLoaderModule } from 'ngx-ui-loader';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AafGridService {
    constructor() { }
}
AafGridService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AafGridService.ctorParameters = () => [];
/** @nocollapse */ AafGridService.ngInjectableDef = defineInjectable({ factory: function AafGridService_Factory() { return new AafGridService(); }, token: AafGridService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class AafGridComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
//MAT_DIALOG_DEFAULT_OPTIONS
class MaterialModules {
}
MaterialModules.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatToolbarModule,
                    MatButtonModule,
                    MatCardModule,
                    MatInputModule,
                    MatDialogModule,
                    MatTableModule,
                    MatMenuModule,
                    MatIconModule,
                    MatProgressSpinnerModule,
                    MatGridListModule,
                    MatPaginatorModule,
                    MatSelectModule,
                    MatSnackBarModule,
                    MatDatepickerModule,
                    MatCheckboxModule,
                    MatSortModule,
                    MatFormFieldModule,
                    MatDividerModule,
                    MatTooltipModule,
                    MatAutocompleteModule,
                    MatRadioModule,
                    MatMomentDateModule,
                    MatListModule,
                    MatOptionModule,
                    MatTabsModule,
                    MatButtonToggleModule,
                    MatChipsModule,
                    MatExpansionModule,
                    MatRippleModule,
                    MatSidenavModule,
                    MatSliderModule
                    //MAT_DIALOG_DEFAULT_OPTIONS
                ],
                exports: [
                    CommonModule,
                    MatToolbarModule,
                    MatButtonModule,
                    MatCardModule,
                    MatInputModule,
                    MatDialogModule,
                    MatTableModule,
                    MatMenuModule,
                    MatIconModule,
                    MatProgressSpinnerModule,
                    MatGridListModule,
                    MatPaginatorModule,
                    MatSelectModule,
                    MatSnackBarModule,
                    MatDatepickerModule,
                    MatCheckboxModule,
                    MatSortModule,
                    MatFormFieldModule,
                    MatDividerModule,
                    MatTooltipModule,
                    MatAutocompleteModule,
                    MatRadioModule,
                    MatMomentDateModule,
                    MatListModule,
                    MatOptionModule,
                    MatTabsModule,
                    MatButtonToggleModule,
                    MatChipsModule,
                    MatExpansionModule,
                    MatRippleModule,
                    MatSidenavModule,
                    MatSliderModule
                    //MAT_DIALOG_DEFAULT_OPTIONS
                ],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AafGridModule {
}
AafGridModule.decorators = [
    { type: NgModule, args: [{
                declarations: [AafGridComponent],
                imports: [
                    CommonModule,
                    MaterialModules,
                    FormsModule,
                    ReactiveFormsModule,
                    NgxUiLoaderModule
                ],
                exports: [AafGridComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AafGridService, AafGridComponent, AafGridModule, MaterialModules as ɵa };

//# sourceMappingURL=aaf-grid.js.map