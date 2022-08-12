import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  bookName = 'stephen+king';
  books: any;
  collection: any = [];
  page = 0;
  paginateFalse = false;
  searchText: any = '';
  tempArry = [];
  spinner = false;

  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.AllBooks();

    this.filterData();
    this.bookService.hideSearchBox(true);
  }
  AllBooks() {
    this.spinner = true;
    this.bookService.AllBooks(this.bookName).subscribe(res => {
      this.books = res.items;
      console.log(this.books)
      this.tempArry = res.items;
      this.paginateFalse = true;
      this.spinner = false;
    }, err => {
      console.log(err)
      this.spinner = false;
    })
  }
  bookAmount(amountType: any) {
    if (amountType.listPrice) {
      return amountType.listPrice.amount
    } else {
      return 'Free'
    }
  }

  bookRating(ratingType: any) {
    if (ratingType.averageRating) {
      return ratingType.averageRating;
    } else {
      return '0';
    }
  }

  filterData() {
    this.bookService.searchData.subscribe(res => {
      if (res == undefined) {
        return
      }
      this.searchText = res;
    }, err => {
      console.log(err, 'error')
    })
  }

  sortedData(type: any) {
    type = type.value;
    let booksArry: any = this.tempArry;
    if (type == 'all') {
      this.AllBooks();
    } else if (type == 'rating') {
      booksArry.sort((a: any, b: any) => {
        if (a.volumeInfo.averageRating == undefined || b.volumeInfo.averageRating == undefined) {
          return
        }
        return b.volumeInfo.averageRating - a.volumeInfo.averageRating;
      });
    } else if (type == 'price') {
      booksArry.sort((a: any, b: any) => {
        if (a.volumeInfo.listPrice == undefined || b.volumeInfo.listPrice.amount == undefined) {
          return
        }
        return b.volumeInfo.listPrice.amount - a.volumeInfo.listPrice.amount;
      });
    } else if (type == 'published') {
      booksArry.sort((a: any, b: any) => {
        let date2 = b.volumeInfo.publishedDate;
        let date1 = a.volumeInfo.publishedDate;
        date2 = new Date(date2);
        date1 = new Date(date1);
        return date2 - date1;
      });
    }
    this.books = booksArry;
  }

}
