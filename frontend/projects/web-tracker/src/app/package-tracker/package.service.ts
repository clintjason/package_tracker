import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPackage(packageId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/packages/${packageId}`);
  }

  getDelivery(deliveryId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/deliveries/${deliveryId}`);
  }
}
