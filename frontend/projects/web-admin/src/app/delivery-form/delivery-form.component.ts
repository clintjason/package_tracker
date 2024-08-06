import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryService } from '../services/delivery.service';
import { PackageService } from '../services/package.service';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss']
})
export class DeliveryFormComponent implements OnInit {
  deliveryForm: FormGroup | undefined;
  packages: any[] = [];

  constructor(private fb: FormBuilder, private deliveryService: DeliveryService, private packageService: PackageService) {}

  ngOnInit(): void {
    this.deliveryForm = this.fb.group({
      packageId: ['', Validators.required],
      driver: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.packageService.getPackages().subscribe(packages => {
      this.packages = packages;
    });
  }

  onSubmit() {
    if (this.deliveryForm?.valid) {
      this.deliveryService.createDelivery(this.deliveryForm?.value).subscribe(
        response => console.log('Delivery created successfully', response),
        error => console.error('Error creating delivery', error)
      );
    }
  }
}