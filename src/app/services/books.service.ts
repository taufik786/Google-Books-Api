import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";

const booksApi = 'https://www.googleapis.com/books/v1/volumes';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  searchData = new BehaviorSubject<any>(null);
  // hideSearch = new Subject<boolean>;
  hideSearch = new BehaviorSubject<any>(true);

  constructor(private http: HttpClient) { }

  AllBooks(data: any) {
    return this.http.get<any>(`${booksApi}?q=${data}&maxResults=40`);
  }

  SingleBook(id: any) {
    return this.http.get<any>(`${booksApi}/${id}`);
  }

  dataTransfer(data: any) {
    return this.searchData.next(data);
  }

  hideSearchBox(data:boolean){
    return this.hideSearch.next(data);
  }
}
