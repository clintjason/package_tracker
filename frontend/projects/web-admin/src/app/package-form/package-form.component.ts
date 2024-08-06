import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackageService } from '../services/package.service';

@Component({
  selector: 'app-package-form',
  templateUrl: './package-form.component.html',
  styleUrls: ['./package-form.component.scss']
})
export class PackageFormComponent implements OnInit {
  packageForm: FormGroup | undefined;

  constructor(private fb: FormBuilder, private packageService: PackageService) {}

  ngOnInit(): void {
    this.packageForm = this.fb.group({
      description: ['', Validators.required],
      weight: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      depth: ['', Validators.required],
      from_name: ['', Validators.required],
      from_address: ['', Validators.required],
      to_name: ['', Validators.required],
      to_address: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.packageForm?.valid) {
      this.packageService.createPackage(this.packageForm?.value).subscribe(
        response => console.log('Package created successfully', response),
        error => console.error('Error creating package', error)
      );
    }
  }
}