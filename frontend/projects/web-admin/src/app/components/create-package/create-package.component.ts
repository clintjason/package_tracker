import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackageService } from '../../services/package.service';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.scss']
})
export class CreatePackageComponent {
  packageForm: FormGroup;

  constructor(private fb: FormBuilder, private packageService: PackageService) {
    this.packageForm = this.fb.group({
      name: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      destination: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.packageForm.valid) {
      this.packageService.createPackage(this.packageForm.value).subscribe(response => {
        console.log('Package created', response);
      });
    }
  }
}