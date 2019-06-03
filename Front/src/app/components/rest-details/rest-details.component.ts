import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-rest-details',
  templateUrl: './rest-details.component.html',
  styleUrls: ['./rest-details.component.scss'],
  providers: [NgbCarouselConfig]
})
export class RestDetailsComponent implements OnInit {

  images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    
  }

  ngOnInit() {
  }

}
