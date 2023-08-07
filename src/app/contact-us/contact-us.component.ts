import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  formData: any = {};

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  submitForm() {
    if (!this.formData.name || !this.formData.email || !this.formData.mobile || !this.formData.comment) {
      // Handle form validation errors, if needed
      return;
    }

    // Make API call to submit the contact query
    this.http.post('/api/contact', this.formData).subscribe(
      (response) => {
        // Handle successful response, e.g., show a success message
        console.log('Query submitted successfully!', response);

        // Show a success notification
        this.showSuccessNotification();
      },
      (error) => {
        // Handle API call errors, e.g., show an error message
        console.error('Error submitting query:', error);

        // Show an error notification
        this.showErrorNotification();
      }
    );

    // Reset form data after submission (optional)
    this.formData = {};
  }

  // Helper method to show success notification
  private showSuccessNotification() {
    this.snackBar.open('Query submitted successfully!', 'Close', {
      duration: 3000, // Set the duration for the notification to display (in milliseconds)
      panelClass: ['success-snackbar'] // Optional CSS class for styling the success notification
    });
  }

  // Helper method to show error notification
  private showErrorNotification() {
    this.snackBar.open('Error submitting query. Please try again.', 'Close', {
      duration: 3000, // Set the duration for the notification to display (in milliseconds)
      panelClass: ['error-snackbar'] // Optional CSS class for styling the error notification
    });
  }
}
