// web-admin/src/app/delivery.service.ts
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
   * Create delivery.
   * @param data - The package content.
   * @returns {Observable<any>} - Observable containing the updated delivery data.
   */
  createDelivery(delivery: any): Observable<any> {
    return this.http.post(this.apiUrl, delivery);
  }

  /**
   * Get delivery
   * @returns {Observable<any>} - Observable containing the packages.
   */
  getDeliveries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}