import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private apiUrl = `${environment.apiUrl}/packages`;

  constructor(private http: HttpClient) {}

  /**
   * Create package.
   * @param pkg - The package content.
   * @returns {Observable<any>} - Observable containing the updated delivery data.
   */
  createPackage(pkg: any): Observable<any> {
    return this.http.post(this.apiUrl, pkg);
  }

  /**
   * Get packages
   * @returns {Observable<any>} - Observable containing the packages.
   */
  getPackages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}