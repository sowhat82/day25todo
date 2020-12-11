import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists = []

  constructor(private http: HttpClient, private router: Router) { }

  async ngOnInit(): Promise<void> {

    this.lists = await this.http.get<any>('/lists').toPromise()   
  
  }

  async deleteList(listID: string){
    const httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')

    await this.http.post<any>('/deleteList', "listID="+listID.toString(), {headers: httpHeaders}).toPromise()
    
    this.lists = await this.http.get<any>('/lists').toPromise()   

    console.info(this.lists)

  }

  routeToListItems(listID: number, listName: string){

    this.router.navigate(['/listItems'], {
      state: {
        listID: listID,
        listName: listName
      }
    }) 

  }
}
