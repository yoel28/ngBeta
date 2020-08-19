import { Component, OnInit } from '@angular/core';
import {IData} from '../../type';
import {AgencyService} from '../../service/agency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public data: IData [] = [];

  constructor(private service: AgencyService) { }

  ngOnInit() {}

  public getReady(): boolean {
    return this.service.isReady;
  }

}
