import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Team } from 'src/app/data/team';
import { CountryService } from 'src/app/service/country.service';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamForm = new FormGroup({
    name: new FormControl(''),
    country: new FormControl(''),
    couch: new FormControl(''),
  });

  showModal: boolean = false;

  teams: Team[] = [];

  countries = [];

  constructor(
    private countryService: CountryService,
    private teamService: TeamService
  ) { }

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
        console.log(this.countries);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  loadAllData(){
    this.teamService.getAllData().subscribe(
      (response) => {
        console.log(response);
        this.teams = response['data'];
      },
      (error) => {
        console.log(error)
      }
    )
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
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
