import { Component, OnInit, ChangeDetectorRef, signal, Signal, ViewChild, inject, TemplateRef, ViewEncapsulation} from '@angular/core';
import { AdvertControllerService, AdvertDTO, ViewAdvertDTO } from '../../../client';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, CommonModule, NgbDropdownModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [AuthService, AdvertControllerService]
})
export class ProfileComponent {

  private modalService = inject(NgbModal);
  public selectedAdvert$ = signal<ViewAdvertDTO | null>(null);
  
  public adverts$: Signal<AdvertDTO[] | null>;
  public error$: Signal<string | null>;
  public isLoading$: Signal<boolean> = signal(true); // Signal to track loading status

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

  async logOut() {
    await this.authService.logout();
    this.router.navigate(["/login"]);
  }

  private fetchAdverts() {
    this.isLoading$ = signal(true); // Set loading state to true

    this.advertService.handlePersonAdverts('body')
      .pipe(
        map((response) => {
          console.log('after map')
          console.log(response)
          if (!Array.isArray(response)) {
            throw new Error('Unexpected response format');
          }
          console.log('in map')
          console.log(response);
          return response;
        }),
        catchError((error) => {
          console.log(error)
          this.error$ = signal('Error fetching adverts');
          return of([]); // Return empty array if there's an error
        })
      )
      .subscribe((adverts) => {
        console.log('after subscribe')
        console.log(adverts)
        this.adverts$ = signal(adverts); // Update adverts$ signal
        this.isLoading$ = signal(false); // Set loading state to false
      });
  }

  onDelete(advertId: number | undefined) {
    // Validate the advertId
    if (!advertId) {
      this.error$ = signal('Invalid advert ID');
      return;
    }
    console.log(advertId)
  
    // Call the service to delete the advert
    this.advertService
      .handleDeleteAdvert(advertId)
      .pipe(
        catchError((error) => {
          console.error('Error deleting advert:', error);
          this.error$ = signal('Failed to delete the advert.');
          return of(null); // Return null in case of error
        })
      )
      .subscribe((response) => {
        console.log(response)
        if (response === null) {
          // An error occurred, the error signal is already set
          return;
        }
        setTimeout(() => {
          this.router.navigate(["/profile"]); // Navigate to profile page after a short delay
        }, 1000);
  
        // If successful, set the success message
  
        // Perform additional actions if needed, such as refreshing the list of adverts
        // Example:
      });
    }

    openModalWithAdvert(content: TemplateRef<any>, advertId: number | undefined) {
      if (!advertId) {
        this.error$ = signal('Invalid advert ID');
        return;
      }

      // Reset the selected advert and error message
      this.selectedAdvert$ = signal(null);
      this.error$ = signal(null);

      // Fetch advert details by ID
      this.advertService.seeAdvertDetails(advertId)
        .pipe(
          catchError((error) => {
            console.error('Error fetching advert:', error);
            this.error$ = signal('Failed to fetch advert details.');
            return of(null); // Return null in case of error
          })
        )
        .subscribe((advert) => {
          if (advert) {
            this.selectedAdvert$ = signal(advert); // Update the selected advert
            this.modalService.open(content, { centered: true }); // Open modal
          } else {
            this.error$ = signal('Advert not found.');
          }
        });
    }

}
