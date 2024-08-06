import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiUrl = `${environment.apiUrl}/deliveries`;

  constructor(private http: HttpClient) {}

  /**
   * Get delivery by ID.
   * @param deliveryId - The ID of the delivery to fetch.
   * @returns {Observable<any>} - Observable containing the delivery data.
   */
  getDelivery(deliveryId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${deliveryId}`);
  }

  /**
   * Update delivery location.
   * @param deliveryId - The ID of the delivery to update.
   * @param location - The new location of the delivery.
   * @returns {Observable<any>} - Observable containing the updated delivery data.
   */
  updateLocation(deliveryId: string, location: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${deliveryId}/location`, { location });
  }

  /**
   * Update delivery status.
   * @param deliveryId - The ID of the delivery to update.
   * @param status - The new status of the delivery.
   * @returns {Observable<any>} - Observable containing the updated delivery data.
   */
  updateStatus(deliveryId: string, status: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${deliveryId}/status`, { status });
  }
}