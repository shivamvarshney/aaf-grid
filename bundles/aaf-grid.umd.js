(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/collections'), require('@angular/material/sort'), require('@angular/material/paginator'), require('@angular/router'), require('@angular/core'), require('@angular/material/checkbox'), require('@angular/common'), require('@angular/material/table'), require('@angular/material/select'), require('@angular/material/snack-bar'), require('@angular/material/datepicker'), require('@angular/material/autocomplete'), require('@angular/material/radio'), require('@angular/material-moment-adapter'), require('@angular/material'), require('@angular/forms'), require('ngx-ui-loader')) :
    typeof define === 'function' && define.amd ? define('aaf-grid', ['exports', '@angular/cdk/collections', '@angular/material/sort', '@angular/material/paginator', '@angular/router', '@angular/core', '@angular/material/checkbox', '@angular/common', '@angular/material/table', '@angular/material/select', '@angular/material/snack-bar', '@angular/material/datepicker', '@angular/material/autocomplete', '@angular/material/radio', '@angular/material-moment-adapter', '@angular/material', '@angular/forms', 'ngx-ui-loader'], factory) :
    (factory((global['aaf-grid'] = {}),global.ng.cdk.collections,global.ng.material.sort,global.ng.material.paginator,global.ng.router,global.ng.core,global.ng.material.checkbox,global.ng.common,global.ng.material.table,global.ng.material.select,global.ng.material['snack-bar'],global.ng.material.datepicker,global.ng.material.autocomplete,global.ng.material.radio,global.ng['material-moment-adapter'],global.ng.material,global.ng.forms,global.ngxUiLoader));
}(this, (function (exports,collections,sort,paginator,router,i0,checkbox,common,table,select,snackBar,datepicker,autocomplete,radio,materialMomentAdapter,material,forms,ngxUiLoader) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AafGridService = /** @class */ (function () {
        function AafGridService() {
        }
        AafGridService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        AafGridService.ctorParameters = function () { return []; };
        /** @nocollapse */ AafGridService.ngInjectableDef = i0.defineInjectable({ factory: function AafGridService_Factory() { return new AafGridService(); }, token: AafGridService, providedIn: "root" });
        return AafGridService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     */
    var AafGridComponent = /** @class */ (function () {
        function AafGridComponent(location, router$$1, ngxService) {
            this.location = location;
            this.router = router$$1;
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
                    this.objectColumn.map(( /**
                     * @param {?} val
                     * @param {?} key
                     * @return {?}
                     */function (val, key) {
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
                this.config.customFilters.redirection.map(( /**
                 * @param {?} val
                 * @return {?}
                 */function (val) {
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
                this.dataProvider.getData(queryDataObj).subscribe(( /**
                 * @param {?} resp
                 * @return {?}
                 */function (resp) {
                    _this.ngxService.stop();
                    _this.data = new table.MatTableDataSource(resp.result.rows);
                    _this.paginationObj.totalCount = resp.result.totalRows;
                    _this.paginationObj.pageSize = resp.result.pageSize;
                    _this.paginationObj.pageNo = resp.result.pageIndex;
                    _this.refreshConfiguration();
                }), ( /**
                 * @param {?} err
                 * @return {?}
                 */function (err) {
                    alert('Something went wrong...');
                }), ( /**
                 * @return {?}
                 */function () {
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
                this.selection = new collections.SelectionModel(true, []);
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
                    this.data.data.forEach(( /**
                     * @param {?} row
                     * @return {?}
                     */function (row) { return _this.selection.select(row); }));
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
            { type: i0.Component, args: [{
                        selector: 'aaf-grid',
                        template: "<!-- Filters Info -->\r\n<div [ngClass]=\"['list-top-header','row',rootClasses.root]\">\r\n    <section *ngIf=\"listHeader\"\r\n        [ngClass]=\"['tondo-regular','d-i-block','p-0',rootClasses.headerTitle,diffrentiateAssignKits ? 'col-sm-12':'col-sm-3']\">\r\n        <div *ngIf=\"listHeader.backInfo\" class=\"d-i-block pdl-30\">\r\n            <p class=\"m-0\">\r\n                <a href=\"JavaScript:Void(0);\" (click)=\"this[backEvent]()\">\r\n                    <img class=\"back-icon\" src=\"assets/fonts/svg/{{ listHeader.backInfo.imageName }}\" />\r\n                    <span class=\"back\">{{listHeader.backInfo.title}}</span>\r\n                </a>\r\n            </p>\r\n        </div>\r\n        <div *ngIf=\"listHeader.listTitle\" class=\"d-i-block\">\r\n            <p class=\"list-title\">\r\n                {{listHeader.listTitle}}\r\n            </p>\r\n        </div>\r\n    </section>\r\n    <div\r\n        [ngClass]=\"['text-right','p-0',rootClasses.filters,rootClasses.headerTitle,diffrentiateAssignKits ? 'col-sm-12':'col-sm-9']\">\r\n        <section class=\"d-i-block kits\" [ngClass]=\"{ 'section-kit': advancedSearch }\">\r\n            <div *ngIf=\"!advanceFilter\">\r\n                <div *ngIf=\"filterInfo.default\">\r\n                    <form #filterForm=\"ngForm\" (ngSubmit)=\"onSubmit(filterForm.value)\"\r\n                        [ngClass]=\"{'row': !diffrentiateAssignKits}\">\r\n                        <div *ngFor=\"let defaultFilter of filterInfo.default; let i = index\">\r\n                            <div *ngIf=\"defaultFilter.inputType == 'text'\" class=\"d-i-block\">\r\n                                <mat-form-field class=\"input-border\" [ngClass]=\"{ 'input-kit': advancedSearch }\">\r\n                                    <mat-label *ngIf=\"defaultFilter.label\">{{defaultFilter.label}}</mat-label>\r\n                                    <input matInput [placeholder]=\"defaultFilter.placeHolder\"\r\n                                        [ngClass]=\"['form-control',defaultFilter.div_class]\" [name]=\"defaultFilter.key\"\r\n                                        ngModel>\r\n                                </mat-form-field>\r\n                                <mat-form-field class=\"float-right\" *ngIf=\"defaultFilter.isDropdown\">\r\n                                    <select matNativeControl *ngIf=\"filterInfo.dropdownData\"\r\n                                        (change)=\"handleRedirection($event)\">\r\n                                        <option [value]=\"optionInfo.value\"\r\n                                            *ngFor=\"let optionInfo of filterInfo.dropdownData\">\r\n                                            {{optionInfo.label}}\r\n                                        </option>\r\n                                    </select>\r\n                                </mat-form-field>\r\n                            </div>\r\n                            <div *ngIf=\"defaultFilter.inputType == 'select'\">\r\n                                <mat-select [name]=\"defaultFilter.key\" ngModel *ngIf=\"defaultFilter.options\"\r\n                                    placeholder=\"{{defaultFilter.placeholder}}\">\r\n                                    <mat-option [value]=\"actionOptions\"\r\n                                        *ngFor=\"let actionOptions of defaultFilter.options\">\r\n                                        {{actionOptions}}\r\n                                    </mat-option>\r\n                                </mat-select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"d-i-block float-right\" *ngIf=\"filterInfo.searchButton\">\r\n                            <div class=\"d-i-block\">\r\n                                <button type=\"submit\" class=\"search-btn\">Search</button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n            <div *ngIf=\"advanceFilter && !diffrentiateAssignKits\" class=\"d-i-block\">\r\n                <div *ngIf=\"filterInfo.advance\" class=\"d-i-block filter-parent\">\r\n                    <form #filterForm=\"ngForm\" (ngSubmit)=\"onSubmit(filterForm.value)\"\r\n                        [ngClass]=\"{'row': !diffrentiateAssignKits}\">\r\n                        <div *ngFor=\"let advanceFilter of filterInfo.advance\" class=\"d-i-block select-option\">\r\n                            <div *ngIf=\"advanceFilter.inputType == 'text'\" class=\"d-i-block\">\r\n                                <mat-form-field class=\"input-border\">\r\n                                    <mat-label *ngIf=\"advanceFilter.label\">{{advanceFilter.label}}</mat-label>\r\n                                    <input matInput [placeholder]=\"advanceFilter.placeHolder\" [name]=\"advanceFilter.key\"\r\n                                        ngModel>\r\n                                </mat-form-field>\r\n                            </div>\r\n                            <div *ngIf=\"advanceFilter.inputType == 'select'\" class=\"mat-opt\">\r\n                                <mat-select [name]=\"advanceFilter.key\" ngModel *ngIf=\"advanceFilter.options\"\r\n                                    [placeholder]=\"advanceFilter.placeHolder\">\r\n                                    <mat-option [value]=\"actionOptions\"\r\n                                        *ngFor=\"let actionOptions of advanceFilter.options\">\r\n                                        {{actionOptions}}\r\n                                    </mat-option>\r\n                                </mat-select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"d-i-block float-right\" *ngIf=\"filterInfo.searchButton\">\r\n                            <div class=\"d-i-block\">\r\n                                <button type=\"submit\" class=\"search-btn\">Search</button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </section>\r\n        <div *ngIf=\"filterInfo.searchButton && !diffrentiateAssignKits\">\r\n            <div class=\"search-btn-adv\">\r\n                <a class=\"a-search\" (click)=\"advanceSearch()\">Advanced Search</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- \r\n    Table Structure Starts from Here \r\n    need to add if condition *ngIf=\"data\" in table so that console error will be removed\r\n-->\r\n<div [ngClass]=\"['table-responsive',rootClasses.grid]\">\r\n    <table [ngClass]=\"[data !== undefined ? 'visible': 'hidden']\" mat-table [dataSource]=\"data\" matSort\r\n        class=\"mat-elevation-z8 table-column\">\r\n        <!-- CheckBox Implementation -->\r\n        <ng-container *ngIf=\"checkBoxFunction\" matColumnDef=\"select\">\r\n            <th mat-header-cell *matHeaderCellDef>\r\n                <mat-checkbox (change)=\"$event ? masterToggle() : null\"\r\n                    [checked]=\"selection.hasValue() && isAllSelected()\"\r\n                    [indeterminate]=\"selection.hasValue() && !isAllSelected()\" [aria-label]=\"checkboxLabel()\">\r\n                </mat-checkbox>\r\n            </th>\r\n            <td mat-cell *matCellDef=\"let row\">\r\n                <mat-checkbox (click)=\"$event.stopPropagation()\" (change)=\"$event ? selection.toggle(row) : null\"\r\n                    [checked]=\"selection.isSelected(row)\" [aria-label]=\"checkboxLabel(row)\">\r\n                </mat-checkbox>\r\n            </td>\r\n        </ng-container>\r\n        <!-- Dynamic Column with Header Implementation -->\r\n        <ng-container *ngFor=\"let column of columns\" matColumnDef=\"{{column.name}}\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>{{column.label}}</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n                <ng-container *ngIf=\"isObj(column.name);then objectTemplate else stringTemplate\"></ng-container>\r\n                <ng-template #objectTemplate>\r\n                    <ng-container *ngFor=\"let columnObj of objectColumn\">\r\n                        <div *ngIf=\"columnObj.name == column.name\">\r\n                            <ul class=\"m-0 p-0\">\r\n                                <li *ngFor=\"let columnObjKeys of columnObj.dataColumns\">\r\n                                    {{element[columnObjKeys]}}\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                    </ng-container>\r\n                </ng-template>\r\n                <ng-template #stringTemplate>\r\n                    <p>{{element[column.name]}}</p>\r\n                </ng-template>\r\n            </td>\r\n        </ng-container>\r\n        <!-- Actions Column Implementation -->\r\n        <ng-container matColumnDef=\"actions\">\r\n            <th mat-header-cell *matHeaderCellDef></th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n                <ng-container *ngFor=\"let action of actionInfo\">\r\n                    <mat-select *ngIf=\"action.type === 'select' && action.options\" placeholder=\"{{action.name}}\"\r\n                        (selectionChange)=\"handleActions(action.actionHandler,element,$event.value)\">\r\n                        <mat-option [value]=\"actionOptions\" *ngFor=\"let actionOptions of action.options\">\r\n                            {{actionOptions}}\r\n                        </mat-option>\r\n                    </mat-select>\r\n                    <div *ngIf=\"action.type === 'button'\" class=\"d-i-block f-16 img-wrapper\"\r\n                        (click)=\"handleActions(action.actionHandler,element)\">\r\n                        <figure *ngIf=\"action.icon\" class=\"text-center m-0\">\r\n                            <img src=\"assets/fonts/svg/{{ action.iconName }}\" alt=\"\">\r\n                        </figure>\r\n                        <ng-container *ngIf=\"action.titlecondition;then conditionalString else simpleString\">\r\n                        </ng-container>\r\n                        <ng-template #conditionalString>\r\n                            <div *ngIf=\"action.titlecondition == 'append'\">\r\n                                {{ element[action.conditionType.source] + action.conditionType.name}}\r\n                            </div>\r\n                            <div *ngIf=\"action.titlecondition == 'conditional'\">\r\n                                <ng-container *ngFor=\"let toggeling of action.conditionType.condition\">\r\n                                    <div *ngIf=\"toggeling.check == element[action.conditionType.source]\">\r\n                                        {{toggeling.name}}\r\n                                    </div>\r\n                                </ng-container>\r\n                            </div>\r\n                        </ng-template>\r\n                        <ng-template #simpleString>\r\n                            {{action.name}}\r\n                        </ng-template>\r\n                    </div>\r\n                </ng-container>\r\n            </td>\r\n        </ng-container>\r\n        <div>\r\n            <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n        </div>\r\n        <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\" (click)=\"selection.toggle(row)\"></tr>\r\n    </table>\r\n    <mat-paginator (page)=\"pageEvent=onPageChange($event)\" [pageSize]=\"paginationObj.pageSize\"\r\n        [length]=\"paginationObj.totalCount\" class=\"custom-pagination\" [pageSizeOptions]=\"[5, 10, 20]\"\r\n        showFirstLastButtons></mat-paginator>\r\n</div>",
                        styles: [".list-top-header{padding:18px 14px 0;border:1px solid #707070;overflow:hidden}.back{font-size:18px;color:#ed1c24;padding:0 20px 0 15px}.list-title{font-size:26px;color:#ed1c24}.back-icon{height:auto;width:30px;vertical-align:top}.input-border{width:148px;height:39px}.input-border input{padding:5px 0 5px 10px;border:1px solid #d7dae2;margin:0;height:39px;border-radius:2px;width:147px;box-shadow:1px 1px 1px 1px #d7dae2}.input-border .mat-form-field-wrapper{padding-bottom:0}.search-btn{height:39px;width:155px;outline:0;border:none;font-size:18px;color:#ed1c24;padding:0;border-radius:3px;background:#f5f5f5;margin:0 13px}.a-search{color:#01a9f4!important;font-size:13px;cursor:pointer}.list-top-header .tondo-regular.d-i-block{vertical-align:top;margin-right:0}.search-btn-adv{text-align:right;width:77.5%;padding:10px 0}.select-option{display:inline-block;width:148px;vertical-align:top;box-shadow:1px 1px 1px 1px #d7dae2;margin:0 17px}.filter-parent{vertical-align:top}.filter-parent .mat-opt{padding:9px 10px;border:1px solid #d7dae2;border-radius:3px}.default-block{margin-right:17px}.input-kit{width:248px;margin-right:20px}.input-kit input{width:248px}.section-kit{text-align:left;margin-right:16px;padding-top:4px}.user-header .section-kit,.user-header .section-kit .input-kit,.user-header .section-kit div{width:100%;height:100%}.table-column td.mat-cell,td.mat-footer-cell,th.mat-header-cell{font-size:17px;font-family:tondo-regular;color:#707070;padding:12px 0 10px 25px;vertical-align:top}.m-0 a:hover{text-decoration:none}.input-search-box{height:65px!important;width:100%!important;color:#fff;padding-left:23px;border:none;font-size:22px;background:#707070}.img-wrapper{margin-left:51px;cursor:pointer;width:75px;text-align:center;vertical-align:top}.img-wrapper figure.text-center.m-0{padding-bottom:12px}.filters-asigned-kits .section-kit,.filters-asigned-kits .section-kit .d-i-block,.filters-asigned-kits .section-kit .input-kit{width:100%;font-size:22px;color:#fff}.filters-asigned-kits .section-kit{height:65px}.filters-asigned-kits .section-kit .input-border input{border:none}.pdl-30{padding-left:30px}.role-grid .img-wrapper{margin-left:0}@media screen and (max-width:767px){.list-title{font-size:20px;margin:0}.list-top-header{padding-bottom:0}.input-search-box{font-size:14px;height:45px!important}.user-header .mat-form-field-appearance-legacy .mat-form-field-label{font-size:16px;line-height:1}.role-grid .table-column td ul.m-0 li{font-size:14px;line-height:1}.role-grid .table-column td ul.m-0 li:last-child{font-size:18px;line-height:1}.search-box{height:50px}.img-wrapper{margin-left:0;width:80px;text-align:center}.back{font-size:16px;padding:0 10px}.img-wrapper figure.text-center.m-0{padding-bottom:5px}.img-wrapper figure.text-center.m-0 img{width:20%}.table-column{margin-bottom:20px}.list-top-header .tondo-regular.d-i-block{margin-right:0}.input-kit{width:150px;margin-right:20px}}"]
                    }] }
        ];
        /** @nocollapse */
        AafGridComponent.ctorParameters = function () {
            return [
                { type: common.Location },
                { type: router.Router },
                { type: ngxUiLoader.NgxUiLoaderService }
            ];
        };
        AafGridComponent.propDecorators = {
            config: [{ type: i0.Input }],
            dataProvider: [{ type: i0.Input }],
            actionProvider: [{ type: i0.Input }],
            paginator: [{ type: i0.ViewChild, args: [paginator.MatPaginator,] }],
            sort: [{ type: i0.ViewChild, args: [sort.MatSort,] }]
        };
        return AafGridComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    //MAT_DIALOG_DEFAULT_OPTIONS
    var MaterialModules = /** @class */ (function () {
        function MaterialModules() {
        }
        MaterialModules.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatToolbarModule,
                            material.MatButtonModule,
                            material.MatCardModule,
                            material.MatInputModule,
                            material.MatDialogModule,
                            table.MatTableModule,
                            material.MatMenuModule,
                            material.MatIconModule,
                            material.MatProgressSpinnerModule,
                            material.MatGridListModule,
                            material.MatPaginatorModule,
                            select.MatSelectModule,
                            snackBar.MatSnackBarModule,
                            datepicker.MatDatepickerModule,
                            checkbox.MatCheckboxModule,
                            material.MatSortModule,
                            material.MatFormFieldModule,
                            material.MatDividerModule,
                            material.MatTooltipModule,
                            autocomplete.MatAutocompleteModule,
                            radio.MatRadioModule,
                            materialMomentAdapter.MatMomentDateModule,
                            material.MatListModule,
                            material.MatOptionModule,
                            material.MatTabsModule,
                            material.MatButtonToggleModule,
                            material.MatChipsModule,
                            material.MatExpansionModule,
                            material.MatRippleModule,
                            material.MatSidenavModule,
                            material.MatSliderModule
                            //MAT_DIALOG_DEFAULT_OPTIONS
                        ],
                        exports: [
                            common.CommonModule,
                            material.MatToolbarModule,
                            material.MatButtonModule,
                            material.MatCardModule,
                            material.MatInputModule,
                            material.MatDialogModule,
                            table.MatTableModule,
                            material.MatMenuModule,
                            material.MatIconModule,
                            material.MatProgressSpinnerModule,
                            material.MatGridListModule,
                            material.MatPaginatorModule,
                            select.MatSelectModule,
                            snackBar.MatSnackBarModule,
                            datepicker.MatDatepickerModule,
                            checkbox.MatCheckboxModule,
                            material.MatSortModule,
                            material.MatFormFieldModule,
                            material.MatDividerModule,
                            material.MatTooltipModule,
                            autocomplete.MatAutocompleteModule,
                            radio.MatRadioModule,
                            materialMomentAdapter.MatMomentDateModule,
                            material.MatListModule,
                            material.MatOptionModule,
                            material.MatTabsModule,
                            material.MatButtonToggleModule,
                            material.MatChipsModule,
                            material.MatExpansionModule,
                            material.MatRippleModule,
                            material.MatSidenavModule,
                            material.MatSliderModule
                            //MAT_DIALOG_DEFAULT_OPTIONS
                        ],
                    },] }
        ];
        return MaterialModules;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AafGridModule = /** @class */ (function () {
        function AafGridModule() {
        }
        AafGridModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [AafGridComponent],
                        imports: [
                            common.CommonModule,
                            MaterialModules,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            ngxUiLoader.NgxUiLoaderModule
                        ],
                        exports: [AafGridComponent]
                    },] }
        ];
        return AafGridModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.AafGridService = AafGridService;
    exports.AafGridComponent = AafGridComponent;
    exports.AafGridModule = AafGridModule;
    exports.ɵa = MaterialModules;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=aaf-grid.umd.js.map