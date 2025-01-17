import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component'; 
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import animations
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    NgxChartsModule,
    PieChartComponent,
    HomeComponent,
    HeaderComponent,
    NotFoundComponent,
    TooltipComponent,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}