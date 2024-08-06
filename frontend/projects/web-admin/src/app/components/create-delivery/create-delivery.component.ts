import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackageService } from '../../services/package.service';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-create-delivery',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.scss']
})
export class CreateDeliveryComponent implements OnInit {
  deliveryForm: FormGroup;
  packages: any[] = [];

  constructor(
    private fb: FormBuilder,
    private packageService: PackageService,
    private deliveryService: DeliveryService
  ) {
    this.deliveryForm = this.fb.group({
      packageId: ['', Validators.required],
      driver: ['', Validators.required],
      eta: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.packageService.getPackages().subscribe(packages => {
      this.packages = packages;
    });
  }

  onSubmit() {
    if (this.deliveryForm.valid) {
      this.deliveryService.createDelivery(this.deliveryForm.value).subscribe(response => {
        console.log('Delivery created', response);
      });
    }
  }
}