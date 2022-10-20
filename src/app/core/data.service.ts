import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allBooks, allReaders } from 'app/data';
import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import { Observable, throwError } from 'rxjs';
import { LoggerService } from './logger.service';
import { catchError } from 'rxjs/operators';
import { BookTrackerError } from 'app/models/bookTrackerError';


@Injectable()
export class DataService {
  mostPopularBook: Book = allBooks[0];

  getAuthorRecommendation(readerID: number): Promise<string>{
    return new Promise((resolve, rejects) => {
      setTimeout(() => {
        if(readerID > 0){
          resolve('Dr. Seuss')
        }else{
          rejects('Invalid reader Id')
        }
      }, 2000);
    })
  }

  constructor(private loggerService: LoggerService,
              private http: HttpClient) { }

  setMostPopularBook(popularBook: Book): void{
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[] | BookTrackerError>{
    return this.http.get<Reader[]>('/api/readers').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<BookTrackerError>{
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';

    return throwError(dataError);
  }

  getReaderById(id: number): Reader{
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Book[]{
    return allBooks;
  }

  getBookById(id: number): Book{
    return allBooks.find(book => book.bookID === id);
  }
}
