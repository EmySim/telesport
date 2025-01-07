import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';  
import { BannerComponent } from 'src/app/component/banner/banner.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public loading: boolean = true;  // État de chargement

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    // Charger les données initiales
    this.olympicService.loadInitialData().subscribe((data) => {
      this.olympics$ = this.olympicService.getOlympics();
      this.loading = false;  // Désactive l'état de chargement une fois les données chargées
    });
  }
}
