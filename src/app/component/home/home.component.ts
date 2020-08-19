import { Component, OnInit } from '@angular/core';
import {IData} from '../../type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public data: IData [] = [];

  constructor() { }

  ngOnInit() {
  }

}
