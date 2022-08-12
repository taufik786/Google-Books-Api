import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  book: any = [];
  constructor(private bookService: BooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.singleBook(res.id);
      this.bookService.hideSearchBox(false);
    })
  }

  singleBook(id: any) {
    this.bookService.SingleBook(id).subscribe(res => {
      this.book = res;
    })
  }

}
