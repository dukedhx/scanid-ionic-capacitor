import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanidPageRoutingModule } from './scanid-routing.module';

import { ScanidPage } from './scanid.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ScanidPageRoutingModule],
  declarations: [ScanidPage],
})
export class ScanidPageModule {}
