import { Component, OnInit, ChangeDetectorRef, signal, Signal, ViewChild, inject, TemplateRef, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertDTO, FiltersDTO } from '../../../client';
import { AdvertControllerService } from '../../../client'
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, CommonModule, NgbDropdownModule],
  standalone: true,
  providers: [AuthService, AdvertControllerService]
})
export class HomeComponent {

  private modalService = inject(NgbModal);
  
  authorSearch = ''; 
  titleSearch = ''; 
  genreSearch = ''; 
  
  public adverts$: Signal<AdvertDTO[] | null>;
  public error$: Signal<string | null>;
  public isLoading$: Signal<boolean> = signal(true); // Signal to track loading status

  public filters: FiltersDTO = {
    pageNum: 1,
    title: '',
    author: '',
    genre: '',
  };

  constructor(private authService: AuthService, private router: Router, private advertService: AdvertControllerService) {
        // Initialize signals
        this.adverts$ = signal([]);
        this.error$ = signal(null);
    
        // Fetch adverts using a signal approach
        this.fetchAdverts();
        this.isLoading$ = signal(false);
  }


  loading(): boolean {
    return this.isLoading$();
  }

  async toHome() {
    console.log('Navigating to Home');
    this.router.navigate(["/home"]);
}

  updateFilters(updatedFilters: Partial<FiltersDTO>) {
    // Merge updated filters into existing filters
    this.filters = { ...this.filters, ...updatedFilters };

    // Re-fetch adverts based on the new filters
    this.fetchAdverts();
  }

  private fetchAdverts() {
    this.isLoading$ = signal(true); // Set loading state to true

    this.advertService
      .displayableAdverts(this.filters, 'body')
      .pipe(
        map((response) => {
          if (!Array.isArray(response)) {
            throw new Error('Unexpected response format');
          }
          console.log(response);
          return response;
        }),
        catchError((error) => {
          this.error$ = signal('Error fetching adverts');
          return of([]); // Return empty array if there's an error
        })
      )
      .subscribe((adverts) => {
        this.adverts$ = signal(adverts); // Update adverts$ signal
        this.isLoading$ = signal(false); // Set loading state to false
      });
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

}


    
