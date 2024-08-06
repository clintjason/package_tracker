// src/app/components/list-packages/list-packages.component.ts
import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../services/package.service';

@Component({
  selector: 'app-list-packages',
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.scss']
})
export class ListPackagesComponent implements OnInit {
  packages: any[] = [];
  displayedColumns: string[] = ['name', 'weight', 'destination'];

  constructor(private packageService: PackageService) { }

  ngOnInit(): void {
    this.packageService.getPackages().subscribe(packages => {
      this.packages = packages;
    });
  }
}