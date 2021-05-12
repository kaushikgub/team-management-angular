import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Team } from '../data/models';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  baseUrl: string = `${environment.baseApi}/teams`;


  constructor(private http:HttpClient) { }

  getAllData(){
    return this.http.get(this.baseUrl);
  }

  getData(id: number){
    return this.http.get(`${this.baseUrl}/${id}/edit`);
  }
  
  saveData(data: Team){
    return this.http.post(`${this.baseUrl}`, data);
  }

  deleteData(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateData(id: number, data: Team){
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}
