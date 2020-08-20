import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IData} from '../../utils/type';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {AgencyService} from '../../service/agency.service';
import {DEBOUNCETIME_INPUT, TOKEN_EMPTY} from '../../utils/constant';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  @Output() output = new EventEmitter<IData []> ();
  public value = new FormControl(TOKEN_EMPTY);

  constructor(private service: AgencyService) { }

  ngOnInit(): void {
    this.output.emit(this.getOutput(this.value.value));
    this.value.valueChanges
      .pipe(debounceTime(DEBOUNCETIME_INPUT))
      .subscribe( x => this.output.emit(this.getOutput(x)));
  }
  private getOutput(filter: string): IData [] {
    return this.service.getData()
      .filter( x => Object.values(x).join().toLowerCase().includes(filter.toLowerCase()));
  }

}
