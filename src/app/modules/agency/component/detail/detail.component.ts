import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IData} from '../../utils/type';
import {environment} from '../../../../../environments/environment';
import {AgencyService} from '../../service/agency.service';
import {AMOUNT_IMG, TOKEN_ID, TOKEN_LAT, TOKEN_LON} from '../../utils/constant';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit {
  @Input() data: IData;

  public url: string;
  public map: string;

  constructor(private service: AgencyService) { }

  ngOnInit(): void {
    this.url = environment.imgserver.replace(TOKEN_ID, this.getId());
    this.map = environment.mapserver.replace(TOKEN_LAT, this.data.lat.toString())
      .replace(TOKEN_LON, this.data.lon.toString());
  }
  public openMap($event: Event): void {
    if ($event) {
      $event.preventDefault();
      $event.stopImmediatePropagation();
    }
    window.open(this.map);
  }
  public onSave($event: Event): void {
    if ($event) {
      $event.preventDefault();
      $event.stopImmediatePropagation();
    }
    this.data.star = !this.data.star;
    this.service.updateStar(this.data.index, this.data.star);
  }

  private getId(): string {
    return Math.round(Math.random() * AMOUNT_IMG).toString();
  }

}
