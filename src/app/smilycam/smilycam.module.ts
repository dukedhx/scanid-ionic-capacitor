import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmilycamPageRoutingModule } from './Smilycam-routing.module';

import { SmilycamPage } from './smilycam.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SmilycamPageRoutingModule],
  declarations: [SmilycamPage],
})
export class SmilycamPageModule {}
