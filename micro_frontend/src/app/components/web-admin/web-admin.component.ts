import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-web-tracker',
  template: `<div #container></div>`,
})
export class WebAdminComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  async ngOnInit() {
    const module = await loadRemoteModule({
      remoteEntry: 'http://localhost:4203/remoteEntry.js',
      remoteName: 'webAdmin',
      exposedModule: './App',
    });

    const factory = this.container.createComponent(module['default']);
    factory.changeDetectorRef.detectChanges();
  }
}