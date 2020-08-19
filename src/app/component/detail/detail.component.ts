import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IData} from '../../type';
import {environment} from '../../../environments/environment';
import {AgencyService} from '../../service/agency.service';

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
    this.url = environment.imgserver.replace(':id', this.getId());
    this.map = environment.mapserver.replace(':lat', this.data.lat.toString())
      .replace(':lon', this.data.lon.toString());
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
    return Math.round(Math.random() * 50).toString();
  }

}
