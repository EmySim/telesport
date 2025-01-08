import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component'; // Assurez-vous que le chemin est correct

@NgModule({
  declarations: [BannerComponent],
  imports: [CommonModule],
  exports: [BannerComponent] // Exportez le composant pour qu'il puisse être utilisé dans d'autres modules
})
export class BannerModule { }