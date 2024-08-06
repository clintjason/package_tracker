// src/app/material.module.ts
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }