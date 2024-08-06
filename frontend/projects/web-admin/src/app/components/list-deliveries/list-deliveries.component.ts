import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-list-deliveries',
  templateUrl: './list-deliveries.component.html',
  styleUrls: ['./list-deliveries.component.scss']
})
export class ListDeliveriesComponent implements OnInit {
  deliveries: any[] = [];
  displayedColumns: string[] = ['package', 'driver', 'eta'];

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.deliveryService.getDeliveries().subscribe(deliveries => {
      this.deliveries = deliveries;
    });
  }
}