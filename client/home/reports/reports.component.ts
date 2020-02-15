import { Component, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription, empty } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiService, NavigationService, UserService } from '../../shared/services';

@Component({
  templateUrl: './reports.component.html'
})
export class HomeReportsComponent {
  statuses: any[] = [];
  selectedStatus = '';

  years: any[] = [];
  selectedYear = '';

  searchQuery: string = null;
  @ViewChild('search') searchInput: NgModel;

  records: any[] = null;
  paginationLink: string = null;
  isLoading = true;

  apiSubscription: Subscription;

  constructor(protected api: ApiService, protected currentUser: UserService, protected navigation: NavigationService, protected route: ActivatedRoute) { }

  ngOnInit() {
    this.api.statuses.index().subscribe((response: HttpResponse<any>) => {
      this.statuses = response.body;
    });
    this.api.reports.years().subscribe((response: HttpResponse<any>) => {
      this.years = response.body;
    });
    this.refresh();
  }

  ngAfterViewInit() {
    if (this.searchInput) {
      this.searchInput.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged()
        )
        .subscribe((value: any) => {
          if (this.searchQuery != null) {
            this.refresh();
          }
        });
    }
  }

  refresh() {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
    this.records = [];
    this.isLoading = true;
    this.paginationLink = null;
    let params = new HttpParams();
    if (this.selectedYear != '') {
      params = params.set('year', this.selectedYear);
    }
    if (this.selectedStatus != '') {
      params = params.set('status', this.selectedStatus);
    }
    if (this.searchQuery) {
      params = params.set('search', this.searchQuery);
    }
    this.apiSubscription = this.api.responses.index(params).subscribe((response: HttpResponse<any>) => this.handleResponse(response));
  }

  handleResponse(response: HttpResponse<any>) {
    this.isLoading = false;
    if (this.records == null) {
      this.records = response.body;
    } else {
      this.records = this.records.concat(response.body);
    }
    this.paginationLink = this.api.parsePaginationLink(response.headers.get('Link')).next;
  }

  onLoadMore(paginationLink: string) {
    this.isLoading = true;
    this.paginationLink = null;
    this.apiSubscription = this.api.get(paginationLink).subscribe(response => this.handleResponse(response));
  }
}
