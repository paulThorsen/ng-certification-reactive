import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { DayForecast } from '../core/models/day-forecast';
import { WeatherService } from '../core/weather.service';

const FORECASTED_DAYS = 5;

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  zipCode = null;
  weatherConditionsForZip$: Observable<DayForecast>;

  constructor(private route: ActivatedRoute, private weather: WeatherService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const zipCode = parseInt(params.get('zipCode'));
      this.zipCode = zipCode;

      // Only subscription is in the template
      this.weatherConditionsForZip$ = this.weather
        .getDayForecaseByZip(zipCode, FORECASTED_DAYS)
        // Broadcast to multiple "| async" pipes at once without multiple calls to services
        .pipe(share());
    });
  }
}
