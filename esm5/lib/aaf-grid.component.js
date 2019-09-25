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
var AafGridComponent = /** @class */ (function () {
    function AafGridComponent(location, router, ngxService) {
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
    // Return boolean to check Object type 
    /**
     * @param {?} columnName
     * @return {?}
     */
    AafGridComponent.prototype.isObj = 
    // Return boolean to check Object type 
    /**
     * @param {?} columnName
     * @return {?}
     */
    function (columnName) {
        /** @type {?} */
        var returnObj = false;
        if (this.objectColumn.length > 0) {
            this.objectColumn.map((/**
             * @param {?} val
             * @param {?} key
             * @return {?}
             */
            function (val, key) {
                if (val.name == columnName) {
                    returnObj = true;
                }
            }));
        }
        return returnObj;
    };
    // At initilizing time set configuration also set data source
    // At initilizing time set configuration also set data source
    /**
     * @return {?}
     */
    AafGridComponent.prototype.ngOnInit = 
    // At initilizing time set configuration also set data source
    /**
     * @return {?}
     */
    function () {
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
        var paginationObj = { size: this.paginationObj.pageSize, page: this.paginationObj.pageNo };
        this.getListData({}, paginationObj);
    };
    // For redirection 
    // For redirection 
    /**
     * @param {?} event
     * @return {?}
     */
    AafGridComponent.prototype.handleRedirection = 
    // For redirection 
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var preparedArray = [];
        preparedArray.push('/');
        this.config.customFilters.redirection.map((/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            preparedArray.push(val);
        }));
        if (event.target.value != '') {
            preparedArray.push(event.target.value);
        }
        this.router.navigate(preparedArray);
    };
    // Take caring of all actions
    // Take caring of all actions
    /**
     * @param {?=} actionName
     * @param {?=} actionRow
     * @param {?=} actionValue
     * @return {?}
     */
    AafGridComponent.prototype.handleActions = 
    // Take caring of all actions
    /**
     * @param {?=} actionName
     * @param {?=} actionRow
     * @param {?=} actionValue
     * @return {?}
     */
    function (actionName, actionRow, actionValue) {
        /** @type {?} */
        var actionInfo = { row: actionRow, dataInfo: actionValue };
        this.listActions[actionName](actionInfo);
    };
    // Prepare Pagination Obj
    // Prepare Pagination Obj
    /**
     * @return {?}
     */
    AafGridComponent.prototype.prepareFirstPagePagination = 
    // Prepare Pagination Obj
    /**
     * @return {?}
     */
    function () {
        return { size: this.paginationObj.pageSize, page: this.paginationObj.pageNo };
    };
    // On SUbmit of All Filters
    // On SUbmit of All Filters
    /**
     * @param {?} filterData
     * @return {?}
     */
    AafGridComponent.prototype.onSubmit = 
    // On SUbmit of All Filters
    /**
     * @param {?} filterData
     * @return {?}
     */
    function (filterData) {
        if (this.formUserId) {
            filterData.userId = this.formUserId;
        }
        this.getListData(filterData, this.prepareFirstPagePagination());
    };
    // Call to Fetch Data commonly
    // Call to Fetch Data commonly
    /**
     * @param {?=} filterInfo
     * @param {?=} pagingInfo
     * @return {?}
     */
    AafGridComponent.prototype.getListData = 
    // Call to Fetch Data commonly
    /**
     * @param {?=} filterInfo
     * @param {?=} pagingInfo
     * @return {?}
     */
    function (filterInfo, pagingInfo) {
        var _this = this;
        this.ngxService.start();
        /** @type {?} */
        var queryDataObj = { 'fiterData': filterInfo, 'pageInfo': pagingInfo };
        this.dataProvider.getData(queryDataObj).subscribe((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) {
            _this.ngxService.stop();
            _this.data = new MatTableDataSource(resp.result.rows);
            _this.paginationObj.totalCount = resp.result.totalRows;
            _this.paginationObj.pageSize = resp.result.pageSize;
            _this.paginationObj.pageNo = resp.result.pageIndex;
            _this.refreshConfiguration();
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            alert('Something went wrong...');
        }), (/**
         * @return {?}
         */
        function () {
            _this.ngxService.stop();
        }));
    };
    // On Page Change Event
    // On Page Change Event
    /**
     * @param {?=} pageEvent
     * @return {?}
     */
    AafGridComponent.prototype.onPageChange = 
    // On Page Change Event
    /**
     * @param {?=} pageEvent
     * @return {?}
     */
    function (pageEvent) {
        this.paginationObj = {
            totalCount: pageEvent.length,
            pageNo: pageEvent.pageIndex,
            pageSize: pageEvent.pageSize
        };
        this.getListData({}, this.prepareFirstPagePagination());
        return pageEvent;
    };
    // Prepare DataSource in the Array as per the Listing requirment
    // Prepare DataSource in the Array as per the Listing requirment
    /**
     * @param {?} dataSource
     * @return {?}
     */
    AafGridComponent.prototype.getDataSource = 
    // Prepare DataSource in the Array as per the Listing requirment
    /**
     * @param {?} dataSource
     * @return {?}
     */
    function (dataSource) {
        this.paginationObj.totalCount = dataSource.length;
        /** @type {?} */
        var finalKitDataSource = new Array();
        finalKitDataSource['dataSource'] = dataSource;
        return finalKitDataSource;
    };
    // Do refresh all the Listing configuration
    // Do refresh all the Listing configuration
    /**
     * @return {?}
     */
    AafGridComponent.prototype.refreshConfiguration = 
    // Do refresh all the Listing configuration
    /**
     * @return {?}
     */
    function () {
        this.data.sort = this.sort;
        this.selection = new SelectionModel(true, []);
        // All Events need to asign here
        this.backEvent = this.listHeader.backInfo.action;
    };
    // Advance Search button
    // Advance Search button
    /**
     * @return {?}
     */
    AafGridComponent.prototype.advanceSearch = 
    // Advance Search button
    /**
     * @return {?}
     */
    function () {
        this.advancedSearch = true;
        this.advanceFilter = !this.advanceFilter;
    };
    // Back to Dashboard page
    // Back to Dashboard page
    /**
     * @return {?}
     */
    AafGridComponent.prototype.backToDashboard = 
    // Back to Dashboard page
    /**
     * @return {?}
     */
    function () {
        this.location.back();
    };
    // Kit Filtering Action
    // Kit Filtering Action
    /**
     * @return {?}
     */
    AafGridComponent.prototype.kitFilters = 
    // Kit Filtering Action
    /**
     * @return {?}
     */
    function () {
        this.getListData();
    };
    // Assigned Kit Filter Action
    // Assigned Kit Filter Action
    /**
     * @return {?}
     */
    AafGridComponent.prototype.assignedKitFilters = 
    // Assigned Kit Filter Action
    /**
     * @return {?}
     */
    function () {
        this.getListData();
    };
    /** Whether the number of selected elements matches the total number of rows. */
    /**
     * Whether the number of selected elements matches the total number of rows.
     * @return {?}
     */
    AafGridComponent.prototype.isAllSelected = /**
     * Whether the number of selected elements matches the total number of rows.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var numSelected = this.selection.selected.length;
        /** @type {?} */
        var numRows = this.data.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    /**
     * Selects all rows if they are not all selected; otherwise clear selection.
     * @return {?}
     */
    AafGridComponent.prototype.masterToggle = /**
     * Selects all rows if they are not all selected; otherwise clear selection.
     * @return {?}
     */
    function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.data.data.forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return _this.selection.select(row); }));
    };
    /** The label for the checkbox on the passed row */
    /**
     * The label for the checkbox on the passed row
     * @param {?=} row
     * @return {?}
     */
    AafGridComponent.prototype.checkboxLabel = /**
     * The label for the checkbox on the passed row
     * @param {?=} row
     * @return {?}
     */
    function (row) {
        if (!row) {
            return (this.isAllSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.selection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    AafGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aaf-grid',
                    template: "<!-- Filters Info -->\r\n<div [ngClass]=\"['list-top-header','row',rootClasses.root]\">\r\n    <section *ngIf=\"listHeader\"\r\n        [ngClass]=\"['tondo-regular','d-i-block','p-0',rootClasses.headerTitle,diffrentiateAssignKits ? 'col-sm-12':'col-sm-3']\">\r\n        <div *ngIf=\"listHeader.backInfo\" class=\"d-i-block pdl-30\">\r\n            <p class=\"m-0\">\r\n                <a href=\"JavaScript:Void(0);\" (click)=\"this[backEvent]()\">\r\n                    <img class=\"back-icon\" src=\"assets/fonts/svg/{{ listHeader.backInfo.imageName }}\" />\r\n                    <span class=\"back\">{{listHeader.backInfo.title}}</span>\r\n                </a>\r\n            </p>\r\n        </div>\r\n        <div *ngIf=\"listHeader.listTitle\" class=\"d-i-block\">\r\n            <p class=\"list-title\">\r\n                {{listHeader.listTitle}}\r\n            </p>\r\n        </div>\r\n    </section>\r\n    <div\r\n        [ngClass]=\"['text-right','p-0',rootClasses.filters,rootClasses.headerTitle,diffrentiateAssignKits ? 'col-sm-12':'col-sm-9']\">\r\n        <section class=\"d-i-block kits\" [ngClass]=\"{ 'section-kit': advancedSearch }\">\r\n            <div *ngIf=\"!advanceFilter\">\r\n                <div *ngIf=\"filterInfo.default\">\r\n                    <form #filterForm=\"ngForm\" (ngSubmit)=\"onSubmit(filterForm.value)\"\r\n                        [ngClass]=\"{'row': !diffrentiateAssignKits}\">\r\n                        <div *ngFor=\"let defaultFilter of filterInfo.default; let i = index\">\r\n                            <div *ngIf=\"defaultFilter.inputType == 'text'\" class=\"d-i-block\">\r\n                                <mat-form-field class=\"input-border\" [ngClass]=\"{ 'input-kit': advancedSearch }\">\r\n                                    <mat-label *ngIf=\"defaultFilter.label\">{{defaultFilter.label}}</mat-label>\r\n                                    <input matInput [placeholder]=\"defaultFilter.placeHolder\"\r\n                                        [ngClass]=\"['form-control',defaultFilter.div_class]\" [name]=\"defaultFilter.key\"\r\n                                        ngModel>\r\n                                </mat-form-field>\r\n                                <mat-form-field class=\"float-right\" *ngIf=\"defaultFilter.isDropdown\">\r\n                                    <select matNativeControl *ngIf=\"filterInfo.dropdownData\"\r\n                                        (change)=\"handleRedirection($event)\">\r\n                                        <option [value]=\"optionInfo.value\"\r\n                                            *ngFor=\"let optionInfo of filterInfo.dropdownData\">\r\n                                            {{optionInfo.label}}\r\n                                        </option>\r\n                                    </select>\r\n                                </mat-form-field>\r\n                            </div>\r\n                            <div *ngIf=\"defaultFilter.inputType == 'select'\">\r\n                                <mat-select [name]=\"defaultFilter.key\" ngModel *ngIf=\"defaultFilter.options\"\r\n                                    placeholder=\"{{defaultFilter.placeholder}}\">\r\n                                    <mat-option [value]=\"actionOptions\"\r\n                                        *ngFor=\"let actionOptions of defaultFilter.options\">\r\n                                        {{actionOptions}}\r\n                                    </mat-option>\r\n                                </mat-select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"d-i-block float-right\" *ngIf=\"filterInfo.searchButton\">\r\n                            <div class=\"d-i-block\">\r\n                                <button type=\"submit\" class=\"search-btn\">Search</button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n            <div *ngIf=\"advanceFilter && !diffrentiateAssignKits\" class=\"d-i-block\">\r\n                <div *ngIf=\"filterInfo.advance\" class=\"d-i-block filter-parent\">\r\n                    <form #filterForm=\"ngForm\" (ngSubmit)=\"onSubmit(filterForm.value)\"\r\n                        [ngClass]=\"{'row': !diffrentiateAssignKits}\">\r\n                        <div *ngFor=\"let advanceFilter of filterInfo.advance\" class=\"d-i-block select-option\">\r\n                            <div *ngIf=\"advanceFilter.inputType == 'text'\" class=\"d-i-block\">\r\n                                <mat-form-field class=\"input-border\">\r\n                                    <mat-label *ngIf=\"advanceFilter.label\">{{advanceFilter.label}}</mat-label>\r\n                                    <input matInput [placeholder]=\"advanceFilter.placeHolder\" [name]=\"advanceFilter.key\"\r\n                                        ngModel>\r\n                                </mat-form-field>\r\n                            </div>\r\n                            <div *ngIf=\"advanceFilter.inputType == 'select'\" class=\"mat-opt\">\r\n                                <mat-select [name]=\"advanceFilter.key\" ngModel *ngIf=\"advanceFilter.options\"\r\n                                    [placeholder]=\"advanceFilter.placeHolder\">\r\n                                    <mat-option [value]=\"actionOptions\"\r\n                                        *ngFor=\"let actionOptions of advanceFilter.options\">\r\n                                        {{actionOptions}}\r\n                                    </mat-option>\r\n                                </mat-select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"d-i-block float-right\" *ngIf=\"filterInfo.searchButton\">\r\n                            <div class=\"d-i-block\">\r\n                                <button type=\"submit\" class=\"search-btn\">Search</button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </section>\r\n        <div *ngIf=\"filterInfo.searchButton && !diffrentiateAssignKits\">\r\n            <div class=\"search-btn-adv\">\r\n                <a class=\"a-search\" (click)=\"advanceSearch()\">Advanced Search</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- \r\n    Table Structure Starts from Here \r\n    need to add if condition *ngIf=\"data\" in table so that console error will be removed\r\n-->\r\n<div [ngClass]=\"['table-responsive',rootClasses.grid]\">\r\n    <table [ngClass]=\"[data !== undefined ? 'visible': 'hidden']\" mat-table [dataSource]=\"data\" matSort\r\n        class=\"mat-elevation-z8 table-column\">\r\n        <!-- CheckBox Implementation -->\r\n        <ng-container *ngIf=\"checkBoxFunction\" matColumnDef=\"select\">\r\n            <th mat-header-cell *matHeaderCellDef>\r\n                <mat-checkbox (change)=\"$event ? masterToggle() : null\"\r\n                    [checked]=\"selection.hasValue() && isAllSelected()\"\r\n                    [indeterminate]=\"selection.hasValue() && !isAllSelected()\" [aria-label]=\"checkboxLabel()\">\r\n                </mat-checkbox>\r\n            </th>\r\n            <td mat-cell *matCellDef=\"let row\">\r\n                <mat-checkbox (click)=\"$event.stopPropagation()\" (change)=\"$event ? selection.toggle(row) : null\"\r\n                    [checked]=\"selection.isSelected(row)\" [aria-label]=\"checkboxLabel(row)\">\r\n                </mat-checkbox>\r\n            </td>\r\n        </ng-container>\r\n        <!-- Dynamic Column with Header Implementation -->\r\n        <ng-container *ngFor=\"let column of columns\" matColumnDef=\"{{column.name}}\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>{{column.label}}</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n                <ng-container *ngIf=\"isObj(column.name);then objectTemplate else stringTemplate\"></ng-container>\r\n                <ng-template #objectTemplate>\r\n                    <ng-container *ngFor=\"let columnObj of objectColumn\">\r\n                        <div *ngIf=\"columnObj.name == column.name\">\r\n                            <ul class=\"m-0 p-0\">\r\n                                <li *ngFor=\"let columnObjKeys of columnObj.dataColumns\">\r\n                                    {{element[columnObjKeys]}}\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                    </ng-container>\r\n                </ng-template>\r\n                <ng-template #stringTemplate>\r\n                    <p>{{element[column.name]}}</p>\r\n                </ng-template>\r\n            </td>\r\n        </ng-container>\r\n        <!-- Actions Column Implementation -->\r\n        <ng-container matColumnDef=\"actions\">\r\n            <th mat-header-cell *matHeaderCellDef></th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n                <ng-container *ngFor=\"let action of actionInfo\">\r\n                    <mat-select *ngIf=\"action.type === 'select' && action.options\" placeholder=\"{{action.name}}\"\r\n                        (selectionChange)=\"handleActions(action.actionHandler,element,$event.value)\">\r\n                        <mat-option [value]=\"actionOptions\" *ngFor=\"let actionOptions of action.options\">\r\n                            {{actionOptions}}\r\n                        </mat-option>\r\n                    </mat-select>\r\n                    <div *ngIf=\"action.type === 'button'\" class=\"d-i-block f-16 img-wrapper\"\r\n                        (click)=\"handleActions(action.actionHandler,element)\">\r\n                        <figure *ngIf=\"action.icon\" class=\"text-center m-0\">\r\n                            <img src=\"assets/fonts/svg/{{ action.iconName }}\" alt=\"\">\r\n                        </figure>\r\n                        <ng-container *ngIf=\"action.titlecondition;then conditionalString else simpleString\">\r\n                        </ng-container>\r\n                        <ng-template #conditionalString>\r\n                            <div *ngIf=\"action.titlecondition == 'append'\">\r\n                                {{ element[action.conditionType.source] + action.conditionType.name}}\r\n                            </div>\r\n                            <div *ngIf=\"action.titlecondition == 'conditional'\">\r\n                                <ng-container *ngFor=\"let toggeling of action.conditionType.condition\">\r\n                                    <div *ngIf=\"toggeling.check == element[action.conditionType.source]\">\r\n                                        {{toggeling.name}}\r\n                                    </div>\r\n                                </ng-container>\r\n                            </div>\r\n                        </ng-template>\r\n                        <ng-template #simpleString>\r\n                            {{action.name}}\r\n                        </ng-template>\r\n                    </div>\r\n                </ng-container>\r\n            </td>\r\n        </ng-container>\r\n        <div>\r\n            <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n        </div>\r\n        <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\" (click)=\"selection.toggle(row)\"></tr>\r\n    </table>\r\n    <mat-paginator (page)=\"pageEvent=onPageChange($event)\" [pageSize]=\"paginationObj.pageSize\"\r\n        [length]=\"paginationObj.totalCount\" class=\"custom-pagination\" [pageSizeOptions]=\"[5, 10, 20]\"\r\n        showFirstLastButtons></mat-paginator>\r\n</div>",
                    styles: [".list-top-header{padding:18px 14px 0;border:1px solid #707070;overflow:hidden}.back{font-size:18px;color:#ed1c24;padding:0 20px 0 15px}.list-title{font-size:26px;color:#ed1c24}.back-icon{height:auto;width:30px;vertical-align:top}.input-border{width:148px;height:39px}.input-border input{padding:5px 0 5px 10px;border:1px solid #d7dae2;margin:0;height:39px;border-radius:2px;width:147px;box-shadow:1px 1px 1px 1px #d7dae2}.input-border .mat-form-field-wrapper{padding-bottom:0}.search-btn{height:39px;width:155px;outline:0;border:none;font-size:18px;color:#ed1c24;padding:0;border-radius:3px;background:#f5f5f5;margin:0 13px}.a-search{color:#01a9f4!important;font-size:13px;cursor:pointer}.list-top-header .tondo-regular.d-i-block{vertical-align:top;margin-right:0}.search-btn-adv{text-align:right;width:77.5%;padding:10px 0}.select-option{display:inline-block;width:148px;vertical-align:top;box-shadow:1px 1px 1px 1px #d7dae2;margin:0 17px}.filter-parent{vertical-align:top}.filter-parent .mat-opt{padding:9px 10px;border:1px solid #d7dae2;border-radius:3px}.default-block{margin-right:17px}.input-kit{width:248px;margin-right:20px}.input-kit input{width:248px}.section-kit{text-align:left;margin-right:16px;padding-top:4px}.user-header .section-kit,.user-header .section-kit .input-kit,.user-header .section-kit div{width:100%;height:100%}.table-column td.mat-cell,td.mat-footer-cell,th.mat-header-cell{font-size:17px;font-family:tondo-regular;color:#707070;padding:12px 0 10px 25px;vertical-align:top}.m-0 a:hover{text-decoration:none}.input-search-box{height:65px!important;width:100%!important;color:#fff;padding-left:23px;border:none;font-size:22px;background:#707070}.img-wrapper{margin-left:51px;cursor:pointer;width:75px;text-align:center;vertical-align:top}.img-wrapper figure.text-center.m-0{padding-bottom:12px}.filters-asigned-kits .section-kit,.filters-asigned-kits .section-kit .d-i-block,.filters-asigned-kits .section-kit .input-kit{width:100%;font-size:22px;color:#fff}.filters-asigned-kits .section-kit{height:65px}.filters-asigned-kits .section-kit .input-border input{border:none}.pdl-30{padding-left:30px}.role-grid .img-wrapper{margin-left:0}@media screen and (max-width:767px){.list-title{font-size:20px;margin:0}.list-top-header{padding-bottom:0}.input-search-box{font-size:14px;height:45px!important}.user-header .mat-form-field-appearance-legacy .mat-form-field-label{font-size:16px;line-height:1}.role-grid .table-column td ul.m-0 li{font-size:14px;line-height:1}.role-grid .table-column td ul.m-0 li:last-child{font-size:18px;line-height:1}.search-box{height:50px}.img-wrapper{margin-left:0;width:80px;text-align:center}.back{font-size:16px;padding:0 10px}.img-wrapper figure.text-center.m-0{padding-bottom:5px}.img-wrapper figure.text-center.m-0 img{width:20%}.table-column{margin-bottom:20px}.list-top-header .tondo-regular.d-i-block{margin-right:0}.input-kit{width:150px;margin-right:20px}}"]
                }] }
    ];
    /** @nocollapse */
    AafGridComponent.ctorParameters = function () { return [
        { type: Location },
        { type: Router },
        { type: NgxUiLoaderService }
    ]; };
    AafGridComponent.propDecorators = {
        config: [{ type: Input }],
        dataProvider: [{ type: Input }],
        actionProvider: [{ type: Input }],
        paginator: [{ type: ViewChild, args: [MatPaginator,] }],
        sort: [{ type: ViewChild, args: [MatSort,] }]
    };
    return AafGridComponent;
}());
export { AafGridComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWFmLWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYWFmLWdyaWQvIiwic291cmNlcyI6WyJsaWIvYWFmLWdyaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBWSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFJbkQ7SUFrREUsMEJBQ1UsUUFBa0IsRUFDbEIsTUFBYyxFQUNkLFVBQThCO1FBRjlCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGVBQVUsR0FBVixVQUFVLENBQW9CO1FBakN4QyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFNbEMsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsMkJBQXNCLEdBQVksS0FBSyxDQUFDO1FBR3hDLGtCQUFhLEdBQUc7WUFDZCxVQUFVLEVBQUUsQ0FBQztZQUNiLE1BQU0sRUFBRSxDQUFDO1lBQ1QsUUFBUSxFQUFFLEVBQUU7U0FDYixDQUFBO0lBcUJELENBQUM7SUFFRCx1Q0FBdUM7Ozs7OztJQUN2QyxnQ0FBSzs7Ozs7O0lBQUwsVUFBTSxVQUFVOztZQUNWLFNBQVMs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OztJQUMzQixnQ0FBVTs7SUFDVixxQ0FBZTs7SUFDZixtQ0FBYTs7SUFDYiw0Q0FBa0M7O0lBQ2xDLHNDQUFnQjs7SUFDaEIsc0NBQWdCOztJQUNoQix1Q0FBaUI7O0lBQ2pCLHVDQUFpQjs7SUFDakIsc0NBQWdCOztJQUNoQiwwQ0FBK0I7O0lBQy9CLHlDQUErQjs7SUFDL0Isa0RBQXdDOztJQUN4QywwQ0FBb0I7O0lBQ3BCLHVDQUFpQjs7SUFDakIseUNBSUM7O0lBQ0QsdUNBQWlCOztJQUVqQixxQ0FBaUQ7O0lBRWpELGdDQUFrQzs7SUFDbEMscUNBQXFCOztJQUdyQixxQ0FBZTs7SUFDZixvQ0FBYzs7SUFDZCw2Q0FBdUI7O0lBQ3ZCLHFDQUFlOztJQUNmLHNDQUFnQjs7SUFDaEIsd0NBQWtCOzs7OztJQUVoQixvQ0FBMEI7Ozs7O0lBQzFCLGtDQUFzQjs7Ozs7SUFDdEIsc0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdFRhYmxlRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IE1hdFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcbmltcG9ydCB7IE1hdFBhZ2luYXRvcixQYWdlRXZlbnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wYWdpbmF0b3InO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFhZkdyaWREYXRhUHJvdmlkZXIgfSBmcm9tICcuL2FhZi1ncmlkLWRhdGEtcHJvdmlkZXInO1xuaW1wb3J0IHsgTmd4VWlMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnbmd4LXVpLWxvYWRlcic7XG5pbXBvcnQgeyBBY3Rpb25zUHJvdmlkZXIgfSBmcm9tICcuL2FjdGlvbnMtcHJvdmlkZXInO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FhZi1ncmlkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FhZi1ncmlkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYWFmLWdyaWQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFhZkdyaWRDb21wb25lbnQ8VD4gaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIC8vIEFsbCB0aGUgY29uZmlndXJhdGlvbiBuZWVkIHRvIHBhc3MgaW4gQ29uZmlnIHZhcmlhYmxlIFxuICBASW5wdXQoKSBjb25maWc6IGFueTtcbiAgLy8gQWxsIHRoZSBEYXRhIFNvdXJjZSBuZWVkIHRvIHBhc3MgYXMgaW4gRGF0YVByb3ZpZGVyIEZvcm1cbiAgQElucHV0KCkgZGF0YVByb3ZpZGVyOiBBYWZHcmlkRGF0YVByb3ZpZGVyPFQ+O1xuICAvLyBIZXJlIHdlIGFyZSBkZWZpbm5nIGFsbCB0aGUgYWN0aW9uIFByb3ZpZGVyc1xuICBASW5wdXQoKSBhY3Rpb25Qcm92aWRlcjogQWN0aW9uc1Byb3ZpZGVyO1xuXG4gIGRpc3BsYXlpbmdDb2x1bW5zOiBhbnk7XG4gIGRpc3BsYXlpbmdEYXRhU291cmNlOiBhbnk7XG4gIGRpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdO1xuICBkYXRhOiBhbnk7XG4gIHNlbGVjdGlvbjogYW55O1xuICBjb2x1bW5zOiBhbnk7XG4gIGNoZWNrQm94RnVuY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgYWN0aW9uSW5mbzogYW55O1xuICBmaWx0ZXJJbmZvOiBhbnk7XG4gIGl0ZW1QZXJQYWdlOiBhbnk7XG4gIGxpc3RpbmdUeXBlOiBhbnk7XG4gIGxpc3RIZWFkZXI6IGFueTtcbiAgYWR2YW5jZWRTZWFyY2g6IGJvb2xlYW4gPSB0cnVlO1xuICBhZHZhbmNlRmlsdGVyOiBib29sZWFuID0gZmFsc2U7XG4gIGRpZmZyZW50aWF0ZUFzc2lnbktpdHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZGF0YVNvdXJjZUluZm86IGFueTtcbiAgcm9vdENsYXNzZXM6IGFueTtcbiAgcGFnaW5hdGlvbk9iaiA9IHtcbiAgICB0b3RhbENvdW50OiAwLFxuICAgIHBhZ2VObzogMCxcbiAgICBwYWdlU2l6ZTogMTBcbiAgfVxuICBsaXN0QWN0aW9uczogYW55O1xuICAvLyBGb3IgQW5ndWxhciBQYWdpbmF0aW9uIHdlIG5lZWQgcmVmIG9mIE1hdFBhZ2luYXRvclxuICBAVmlld0NoaWxkKE1hdFBhZ2luYXRvcikgcGFnaW5hdG9yOiBNYXRQYWdpbmF0b3I7XG4gIC8vIEZvciBBbmd1bGFyIFNvcnRpbmcgd2UgbmVlZCByZWYgb2YgTWF0U29ydFxuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG4gIHBhZ2VFdmVudDogUGFnZUV2ZW50O1xuXG4gIC8vIEV2ZW50IEhhbmRsZXJzIHBhc3MgZnJvbSBDb25maWd1cmF0aW9uIHdpbGwgZ29pbmcgdG8gYXNzaWduIG9uIHRoZXNlIGRlZmluZWQgdmFyaWFibGVzXG4gIGJhY2tFdmVudDogYW55O1xuICBkb0ZpbHRlcjogYW55O1xuICBkZWxldGVBc3NpZ25lZEtpdDogYW55O1xuICBraXROdW1iZXI6IGFueTtcbiAgZm9ybVVzZXJJZDogYW55O1xuICBvYmplY3RDb2x1bW46IGFueTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIG5neFNlcnZpY2U6IE5neFVpTG9hZGVyU2VydmljZVxuICApIHtcblxuICB9XG5cbiAgLy8gUmV0dXJuIGJvb2xlYW4gdG8gY2hlY2sgT2JqZWN0IHR5cGUgXG4gIGlzT2JqKGNvbHVtbk5hbWUpIHtcbiAgICBsZXQgcmV0dXJuT2JqID0gZmFsc2U7XG4gICAgaWYgKHRoaXMub2JqZWN0Q29sdW1uLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMub2JqZWN0Q29sdW1uLm1hcCgodmFsLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHZhbC5uYW1lID09IGNvbHVtbk5hbWUpIHtcbiAgICAgICAgICByZXR1cm5PYmogPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybk9iajtcbiAgfVxuICAvLyBBdCBpbml0aWxpemluZyB0aW1lIHNldCBjb25maWd1cmF0aW9uIGFsc28gc2V0IGRhdGEgc291cmNlXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucyA9IHRoaXMuY29uZmlnLmZpbmFsRHluYW1pY0Rpc3BsYXlDb2x1bW5zO1xuICAgIHRoaXMuY2hlY2tCb3hGdW5jdGlvbiA9IHRoaXMuY29uZmlnLmZ1bmN0aW9uYWxpdHlDaGVja0JveDtcbiAgICB0aGlzLmNvbHVtbnMgPSB0aGlzLmNvbmZpZy5jb2x1bW5EYXRhO1xuICAgIHRoaXMuZmlsdGVySW5mbyA9IHRoaXMuY29uZmlnLmN1c3RvbUZpbHRlcnM7XG4gICAgdGhpcy5hY3Rpb25JbmZvID0gdGhpcy5jb25maWcuYWN0aW9uQXR0cjtcbiAgICB0aGlzLmxpc3RpbmdUeXBlID0gdGhpcy5jb25maWcuY29uZmlndXJhdGlvbkZvcjtcbiAgICB0aGlzLml0ZW1QZXJQYWdlID0gdGhpcy5jb25maWcuaXRlbVBlclBhZ2U7XG4gICAgdGhpcy5saXN0SGVhZGVyID0gdGhpcy5jb25maWcubGlzdEhlYWRlcjtcbiAgICB0aGlzLmRhdGFTb3VyY2VJbmZvID0gdGhpcy5jb25maWcuc291cmNlRGF0YUluZm87XG4gICAgdGhpcy5yb290Q2xhc3NlcyA9IHRoaXMuY29uZmlnLnJvb3RDbGFzc2VzO1xuICAgIC8vIEFsbCBFdmVudHMgbmVlZCB0byBhc2lnbiBoZXJlXG4gICAgdGhpcy5iYWNrRXZlbnQgPSB0aGlzLmxpc3RIZWFkZXIuYmFja0luZm8uYWN0aW9uO1xuICAgIHRoaXMuZG9GaWx0ZXIgPSB0aGlzLmZpbHRlckluZm8uc2VhcmNoQWN0aW9uO1xuICAgIHRoaXMubGlzdEFjdGlvbnMgPSB0aGlzLmFjdGlvblByb3ZpZGVyO1xuICAgIHRoaXMub2JqZWN0Q29sdW1uID0gdGhpcy5jb25maWcub2JqZWN0Q29sdW1uO1xuXG4gICAgaWYgKCh0aGlzLmxpc3RpbmdUeXBlID09ICd1c2Vyc0RhdGEnKSB8fCAodGhpcy5saXN0aW5nVHlwZSA9PSAndXNlcnMnKSB8fCAodGhpcy5saXN0aW5nVHlwZSA9PSAncm9sZScpKVxuICAgICAgdGhpcy5kaWZmcmVudGlhdGVBc3NpZ25LaXRzID0gdHJ1ZVxuICAgIGVsc2VcbiAgICAgIHRoaXMuZGlmZnJlbnRpYXRlQXNzaWduS2l0cyA9IGZhbHNlXG5cbiAgICAvLyBXZSByZXF1aXJlIGRhdGFTb3VyY2UgaGVyZSBTbyB3ZSBuZWVkIHRvIGNhbGwgZ2V0TGlzdERhdGEgZnVuY3Rpb24gZnJvbSBuZ09uSXRcbiAgICBsZXQgcGFnaW5hdGlvbk9iaiA9IHsgc2l6ZTogdGhpcy5wYWdpbmF0aW9uT2JqLnBhZ2VTaXplLCBwYWdlOiB0aGlzLnBhZ2luYXRpb25PYmoucGFnZU5vIH07XG4gICAgdGhpcy5nZXRMaXN0RGF0YSh7fSwgcGFnaW5hdGlvbk9iaik7XG4gIH1cbiAgLy8gRm9yIHJlZGlyZWN0aW9uIFxuICBoYW5kbGVSZWRpcmVjdGlvbihldmVudCkge1xuICAgIGxldCBwcmVwYXJlZEFycmF5ID0gW107XG4gICAgcHJlcGFyZWRBcnJheS5wdXNoKCcvJyk7XG4gICAgdGhpcy5jb25maWcuY3VzdG9tRmlsdGVycy5yZWRpcmVjdGlvbi5tYXAodmFsID0+IHtcbiAgICAgIHByZXBhcmVkQXJyYXkucHVzaCh2YWwpO1xuICAgIH0pO1xuICAgIGlmIChldmVudC50YXJnZXQudmFsdWUgIT0gJycpIHtcbiAgICAgIHByZXBhcmVkQXJyYXkucHVzaChldmVudC50YXJnZXQudmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShwcmVwYXJlZEFycmF5KTtcbiAgfVxuICAvLyBUYWtlIGNhcmluZyBvZiBhbGwgYWN0aW9uc1xuICBoYW5kbGVBY3Rpb25zKGFjdGlvbk5hbWU/OiBhbnksIGFjdGlvblJvdz86IGFueSwgYWN0aW9uVmFsdWU/OiBhbnkpIHtcbiAgICBsZXQgYWN0aW9uSW5mbyA9IHsgcm93OiBhY3Rpb25Sb3csIGRhdGFJbmZvOiBhY3Rpb25WYWx1ZSB9O1xuICAgIHRoaXMubGlzdEFjdGlvbnNbYWN0aW9uTmFtZV0oYWN0aW9uSW5mbyk7XG4gIH1cbiAgLy8gUHJlcGFyZSBQYWdpbmF0aW9uIE9ialxuICBwcmVwYXJlRmlyc3RQYWdlUGFnaW5hdGlvbigpIHtcbiAgICByZXR1cm4geyBzaXplOiB0aGlzLnBhZ2luYXRpb25PYmoucGFnZVNpemUsIHBhZ2U6IHRoaXMucGFnaW5hdGlvbk9iai5wYWdlTm8gfTtcbiAgfVxuICAvLyBPbiBTVWJtaXQgb2YgQWxsIEZpbHRlcnNcbiAgb25TdWJtaXQoZmlsdGVyRGF0YTogYW55KSB7XG4gICAgaWYgKHRoaXMuZm9ybVVzZXJJZCkge1xuICAgICAgZmlsdGVyRGF0YS51c2VySWQgPSB0aGlzLmZvcm1Vc2VySWQ7XG4gICAgfVxuICAgIHRoaXMuZ2V0TGlzdERhdGEoZmlsdGVyRGF0YSwgdGhpcy5wcmVwYXJlRmlyc3RQYWdlUGFnaW5hdGlvbigpKTtcbiAgfVxuICAvLyBDYWxsIHRvIEZldGNoIERhdGEgY29tbW9ubHlcbiAgZ2V0TGlzdERhdGEoZmlsdGVySW5mbz86IGFueSwgcGFnaW5nSW5mbz86IGFueSkgeyAgICAgXG4gICAgdGhpcy5uZ3hTZXJ2aWNlLnN0YXJ0KCk7XG4gICAgbGV0IHF1ZXJ5RGF0YU9iaiA9IHsgJ2ZpdGVyRGF0YSc6IGZpbHRlckluZm8sICdwYWdlSW5mbyc6IHBhZ2luZ0luZm8gfTtcbiAgICB0aGlzLmRhdGFQcm92aWRlci5nZXREYXRhKHF1ZXJ5RGF0YU9iaikuc3Vic2NyaWJlKFxuICAgICAgcmVzcCA9PiB7ICAgICAgICAgICAgICAgIFxuICAgICAgICB0aGlzLm5neFNlcnZpY2Uuc3RvcCgpO1xuICAgICAgICB0aGlzLmRhdGEgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKHJlc3AucmVzdWx0LnJvd3MpO1xuICAgICAgICB0aGlzLnBhZ2luYXRpb25PYmoudG90YWxDb3VudCA9IHJlc3AucmVzdWx0LnRvdGFsUm93cztcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uT2JqLnBhZ2VTaXplID0gcmVzcC5yZXN1bHQucGFnZVNpemU7XG4gICAgICAgIHRoaXMucGFnaW5hdGlvbk9iai5wYWdlTm8gPSByZXNwLnJlc3VsdC5wYWdlSW5kZXg7XG4gICAgICAgIHRoaXMucmVmcmVzaENvbmZpZ3VyYXRpb24oKTsgICAgICAgIFxuICAgICAgfSxcbiAgICAgIGVyciA9PiB7XG4gICAgICAgIGFsZXJ0KCdTb21ldGhpbmcgd2VudCB3cm9uZy4uLicpO1xuICAgICAgfSxcbiAgICAgICgpPT57XG4gICAgICAgIHRoaXMubmd4U2VydmljZS5zdG9wKCk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuICAvLyBPbiBQYWdlIENoYW5nZSBFdmVudFxuICBvblBhZ2VDaGFuZ2UocGFnZUV2ZW50PzogUGFnZUV2ZW50KSB7XG4gICAgdGhpcy5wYWdpbmF0aW9uT2JqID0ge1xuICAgICAgdG90YWxDb3VudDogcGFnZUV2ZW50Lmxlbmd0aCxcbiAgICAgIHBhZ2VObzogcGFnZUV2ZW50LnBhZ2VJbmRleCxcbiAgICAgIHBhZ2VTaXplOiBwYWdlRXZlbnQucGFnZVNpemVcbiAgICB9XG4gICAgdGhpcy5nZXRMaXN0RGF0YSh7fSwgdGhpcy5wcmVwYXJlRmlyc3RQYWdlUGFnaW5hdGlvbigpKTtcbiAgICByZXR1cm4gcGFnZUV2ZW50O1xuICB9XG4gIC8vIFByZXBhcmUgRGF0YVNvdXJjZSBpbiB0aGUgQXJyYXkgYXMgcGVyIHRoZSBMaXN0aW5nIHJlcXVpcm1lbnRcbiAgZ2V0RGF0YVNvdXJjZShkYXRhU291cmNlOiBhbnkpIHtcbiAgICB0aGlzLnBhZ2luYXRpb25PYmoudG90YWxDb3VudCA9IGRhdGFTb3VyY2UubGVuZ3RoO1xuICAgIGxldCBmaW5hbEtpdERhdGFTb3VyY2UgPSBuZXcgQXJyYXkoKTtcbiAgICBmaW5hbEtpdERhdGFTb3VyY2VbJ2RhdGFTb3VyY2UnXSA9IGRhdGFTb3VyY2U7XG4gICAgcmV0dXJuIGZpbmFsS2l0RGF0YVNvdXJjZTtcbiAgfVxuICAvLyBEbyByZWZyZXNoIGFsbCB0aGUgTGlzdGluZyBjb25maWd1cmF0aW9uXG4gIHJlZnJlc2hDb25maWd1cmF0aW9uKCkge1xuICAgIHRoaXMuZGF0YS5zb3J0ID0gdGhpcy5zb3J0O1xuICAgIHRoaXMuc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbk1vZGVsKHRydWUsIFtdKTtcbiAgICAvLyBBbGwgRXZlbnRzIG5lZWQgdG8gYXNpZ24gaGVyZVxuICAgIHRoaXMuYmFja0V2ZW50ID0gdGhpcy5saXN0SGVhZGVyLmJhY2tJbmZvLmFjdGlvbjsgICAgXG4gIH1cbiAgLy8gQWR2YW5jZSBTZWFyY2ggYnV0dG9uXG4gIGFkdmFuY2VTZWFyY2goKSB7XG4gICAgdGhpcy5hZHZhbmNlZFNlYXJjaCA9IHRydWU7XG4gICAgdGhpcy5hZHZhbmNlRmlsdGVyID0gIXRoaXMuYWR2YW5jZUZpbHRlcjtcbiAgfVxuICAvLyBCYWNrIHRvIERhc2hib2FyZCBwYWdlXG4gIGJhY2tUb0Rhc2hib2FyZCgpIHtcbiAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcbiAgfVxuICAvLyBLaXQgRmlsdGVyaW5nIEFjdGlvblxuICBraXRGaWx0ZXJzKCkge1xuICAgIHRoaXMuZ2V0TGlzdERhdGEoKTtcbiAgfVxuICAvLyBBc3NpZ25lZCBLaXQgRmlsdGVyIEFjdGlvblxuICBhc3NpZ25lZEtpdEZpbHRlcnMoKSB7XG4gICAgdGhpcy5nZXRMaXN0RGF0YSgpO1xuICB9XG4gIC8qKiBXaGV0aGVyIHRoZSBudW1iZXIgb2Ygc2VsZWN0ZWQgZWxlbWVudHMgbWF0Y2hlcyB0aGUgdG90YWwgbnVtYmVyIG9mIHJvd3MuICovXG4gIGlzQWxsU2VsZWN0ZWQoKSB7XG4gICAgY29uc3QgbnVtU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGg7XG4gICAgY29uc3QgbnVtUm93cyA9IHRoaXMuZGF0YS5kYXRhLmxlbmd0aDtcbiAgICByZXR1cm4gbnVtU2VsZWN0ZWQgPT09IG51bVJvd3M7XG4gIH1cbiAgLyoqIFNlbGVjdHMgYWxsIHJvd3MgaWYgdGhleSBhcmUgbm90IGFsbCBzZWxlY3RlZDsgb3RoZXJ3aXNlIGNsZWFyIHNlbGVjdGlvbi4gKi9cbiAgbWFzdGVyVG9nZ2xlKCkge1xuICAgIHRoaXMuaXNBbGxTZWxlY3RlZCgpID9cbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNsZWFyKCkgOlxuICAgICAgdGhpcy5kYXRhLmRhdGEuZm9yRWFjaChyb3cgPT4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0KHJvdykpO1xuICB9XG4gIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSBjaGVja2JveCBvbiB0aGUgcGFzc2VkIHJvdyAqL1xuICBjaGVja2JveExhYmVsKHJvdz86IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKCFyb3cpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLmlzQWxsU2VsZWN0ZWQoKSA/ICdzZWxlY3QnIDogJ2Rlc2VsZWN0J30gYWxsYDtcbiAgICB9XG4gICAgcmV0dXJuIGAke3RoaXMuc2VsZWN0aW9uLmlzU2VsZWN0ZWQocm93KSA/ICdkZXNlbGVjdCcgOiAnc2VsZWN0J30gcm93ICR7cm93LnBvc2l0aW9uICsgMX1gO1xuICB9XG5cblxufVxuIl19