import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AgencyService} from '../../service/agency.service';
import {IData} from '../../utils/type';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditComponent implements OnInit {
  public form: FormGroup;

  constructor(private routeActive: ActivatedRoute, private router: Router, private service: AgencyService) { }

  ngOnInit() {
    this.initForm(
      this.service.getDataDetail(+this.routeActive.snapshot.paramMap.get('id'))
    );

  }
  public onSubmit($event?: Event): void {
    if ($event) {
      $event.preventDefault();
    }
    if (this.form.valid) {
      this.service.save(this.form.value);
    }
    this.router.navigate(['/agency']);
  }

  private initForm(data?: IData) {
    this.form = new FormGroup(
      {
        agencia: new FormControl(data.agencia, Validators.required),
        provincia: new FormControl(data.provincia, Validators.required),
        departamento: new FormControl(data.departamento, Validators.required),
        direccion: new FormControl(data.direccion, Validators.required),
        distrito: new FormControl(data.distrito, Validators.required),
        index: new FormControl(data.index, Validators.required),
        star: new FormControl(data.star || false, Validators.required),
        lat: new FormControl(data.lat, Validators.required),
        lon: new FormControl(data.lon, Validators.required)
      }
    );
  }

}
