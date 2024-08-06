import { Component, OnInit } from '@angular/core';
import { PackageService } from './package.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-package-tracker',
  templateUrl: './package-tracker.component.html',
  styleUrls: ['./package-tracker.component.scss']
})
export class PackageTrackerComponent implements OnInit {
  packageId: string = '';  // Default value for packageId
  package: any;
  delivery: any;
  ws: WebSocketSubject<any> | undefined;  // Default value for ws

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {}

  trackPackage() {
    this.packageService.getPackage(this.packageId).subscribe(pkg => {
      this.package = pkg;
      if (pkg.active_delivery_id) {
        this.packageService.getDelivery(pkg.active_delivery_id).subscribe(delivery => {
          this.delivery = delivery;
          this.setupWebSocket(delivery.delivery_id);
        });
      }
    });
  }

  setupWebSocket(deliveryId: string) {
    this.ws = new WebSocketSubject(`${environment.wsUrl}/deliveries/${deliveryId}`);
    this.ws.subscribe(
      msg => this.updateDelivery(msg),
      err => console.error(err),
      () => console.log('Complete')
    );
  }

  updateDelivery(msg: any) {
    if (msg.event === 'location_changed') {
      this.delivery.location = msg.location;
    } else if (msg.event === 'status_changed') {
      this.delivery.status = msg.status;
    }
  }
}