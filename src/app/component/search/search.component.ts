import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IData} from '../../type';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {AgencyService} from '../../service/agency.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  @Output() output = new EventEmitter<IData []> ();
  public value = new FormControl('');

  constructor(private service: AgencyService) { }

  ngOnInit(): void {
    this.output.emit(this.getOutput(this.value.value));
    this.value.valueChanges
      .pipe(debounceTime(500))
      .subscribe( x => this.output.emit(this.getOutput(x)));
  }
  private getOutput(filter: string): IData [] {
    return this.service.getData()
      .filter( x => Object.values(x).join().toLowerCase().includes(filter.toLowerCase()));
  }

}
