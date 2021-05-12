import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Team} from 'src/app/data/team';
import {CountryService} from 'src/app/service/country.service';
import {TeamService} from 'src/app/service/team.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamForm = new FormGroup({
    name: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    couch: new FormControl('', Validators.required),
  });

  showModal: boolean = false;

  teams: Team[] = [];

  countries = [];

  constructor(
    private countryService: CountryService,
    private teamService: TeamService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.loadCountries();
    this.loadAllData();
  }

  modalOpen() {
    this.showModal = true;
  }

  modalClose() {
    this.showModal = false;
  }

  loadCountries() {
    this.countryService.getCountries().subscribe(
      (response) => {
        this.countries = response['data'];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadAllData() {
    this.teamService.getAllData().subscribe(
      (response) => {
        console.log(response);
        this.teams = response['data'];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submit() {
    console.log(this.teamForm.value);
    this.teamService.saveData(this.teamForm.value).subscribe(
      (response) => {
        console.log(response);
        this.teams.push({
          id: parseInt(response['data'].id),
          name: response['data'].name,
          country: response['data'].country,
          couch: response['data'].couch
        });
        this.showModal = false;
        this.toastr.success(response['message'], 'Success')
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(id: number) {
    this.teamService.deleteData(id).subscribe(
      (response) => {
        console.log(response['message']);
        this.teams = this.teams.filter(obj => obj.id !== id);
        this.toastr.info(response['message'], 'Success')
      }, (error) => {
        console.log(error);
      }
    );
  }

}
