import { Component, AfterViewInit, EventEmitter, OnInit } from '@angular/core';
import { tap, switchMap, filter, map, catchError, startWith } from 'rxjs/operators';
import { of, Observable, merge, from, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';


export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  favorite: boolean;
  created_at: string;
  number: number;
  state: string;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  stateCtrl = new FormControl();
  filteredIssues: GithubIssue[] = [];
  favorites = new BehaviorSubject([]);

  data: GithubIssue[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  sort = 'created';
  order = 'desc';
  page = 1;
  pageSize = 50;

  loadMore = new EventEmitter();
  filterValue: string;
  favoriteLsKey = 'favorites';
  displayMode: boolean;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    const favoritesSrt = localStorage.getItem(this.favoriteLsKey);
    if (favoritesSrt) {
      const favorites = JSON.parse(favoritesSrt);
      this.favorites.next(favorites);
    }

  }

  ngAfterViewInit() {

    merge(this.loadMore)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          // tslint:disable-next-line: no-non-null-assertion
          return this.getRepoIssues(
            this.sort, this.order, this.page);
        }),
        map(data => {
          this.page++;
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          return data.items;
        }),
        tap(data => {
          this.data = [...this.data, ...data];
        }),
        tap(() => {
          this.updateFavorites();
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe(data => {
        this.updateFilteredResults();
      });

    this.stateCtrl.valueChanges.subscribe(value => {
      this.filterValue = value;
      this.updateFilteredResults();
    });

    this.favorites.pipe(
      tap(list => {
        localStorage.setItem(this.favoriteLsKey, JSON.stringify(list));
      })
    )
      .subscribe(() => {
        this.updateFavorites();
      });
  }

  updateFilteredResults() {
    const filterValue = this.filterValue && this.filterValue.toLowerCase();
    this.filteredIssues = this.data
      .filter(state => filterValue ? state.title.toLowerCase().indexOf(filterValue) > -1 : true)
      .filter(state => this.displayMode ? state.favorite : true);
  }

  loadMoreIssues() {
    this.loadMore.emit(true);
  }

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
      `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.httpClient.get<GithubApi>(requestUrl);
  }

  switchFavorite(issue: GithubIssue) {
    issue.favorite ? this.removeFromFavorite(issue.number) : this.addToFavorite(issue.number);
  }

  addToFavorite(id: number) {
    const favorites = this.favorites.getValue();
    favorites.push(id);
    this.favorites.next(favorites);
  }

  removeFromFavorite(id: number) {
    const favorites = this.favorites.getValue();
    const index = favorites.findIndex(element => element === id);
    if (index > -1) {
      favorites.splice(index, 1);
      this.favorites.next(favorites);
    }
  }

  updateFavorites() {
    const favorites = this.favorites.getValue();
    this.data.forEach(row => {
      row.favorite = favorites.includes(row.number);
    });

  }

  switchDisplayMode() {
    this.displayMode = !this.displayMode;
    this.updateFilteredResults();
  }
}


