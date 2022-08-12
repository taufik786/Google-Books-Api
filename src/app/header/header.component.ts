import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  searchText = '';
  searchBox = true;
  searchSubs!: Subscription;

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.searchSubs = this.booksService.hideSearch.subscribe(res => {
      this.searchBox = res;
    })
  }

  enterText(text: any) {
    this.booksService.dataTransfer(this.searchText);
  }

  ngOnDestroy(): void {
    this.searchSubs.unsubscribe();
  }

}
