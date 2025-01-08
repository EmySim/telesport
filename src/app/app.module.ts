import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BannerComponent } from '../app/componants/banner/banner.component'; // Importation du composant Banner
import {BannerModule } from '../app/componants/banner/banner.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import animations
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from '../app/componants/pie-chart/pie-chart.component';
@NgModule({
  declarations: [
    AppComponent, 
    NotFoundComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    NgxChartsModule,
    PieChartComponent,
    HomeComponent,
    BannerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
