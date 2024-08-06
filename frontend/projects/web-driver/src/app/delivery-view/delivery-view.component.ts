// web-driver/src/app/delivery-view/delivery-view.component.ts
import { Component, OnInit } from '@angular/core';
import { DeliveryService } from './services/delivery.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-delivery-view',
  templateUrl: './delivery-view.component.html',
  styleUrls: ['./delivery-view.component.css']
})
export class DeliveryViewComponent implements OnInit {
  deliveryId: string = '';
  delivery: any;
  package: any;
  ws: WebSocketSubject<any> | null = null;

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {}

  loadDelivery() {
    this.deliveryService.getDelivery(this.deliveryId).subscribe(delivery => {
      this.delivery = delivery;
      this.package = delivery.package;
      this.setupWebSocket(delivery.delivery_id);
      this.updateLocationEvery20Seconds();
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

  updateLocationEvery20Seconds() {
    navigator.geolocation.watchPosition(position => {
      const location = { lat: position.coords.latitude, lng: position.coords.longitude };
      this.ws?.next({ event: 'location_changed', delivery_id: this.delivery.delivery_id, location });
    }, err => console.error(err), { timeout: 20000 });
  }
}