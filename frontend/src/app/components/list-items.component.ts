import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  listDetails: any = {};
  routeState: any;
  tasks = []
  constructor(private router: Router, private http: HttpClient) {
    
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.listDetails.listID = this.routeState.listID ? JSON.parse(this.routeState.listID) : '';
        this.listDetails.listName = this.routeState.listName   ;
        this.listDetails.digitalOceanKey = this.routeState.digitalOceanKey  ;
      }
    }

    console.info (this.listDetails)

   }

  async ngOnInit(): Promise<void> {
    //get tasks with a certain list ID
    this.tasks = await this.http.get<any>('/tasks/'+this.listDetails.listID).toPromise() 
    console.info(this.tasks)
  }

  addNewTask(){

    this.router.navigate(['/newTask'], {
      state: {
        listID: this.listDetails.listID,
        listName: this.listDetails.listName,
        digitalOceanKey: this.listDetails.digitalOceanKey
      }
    }) 
  }

  async deleteTask(taskID: string){
    const httpHeaders = new HttpHeaders()

    const params = new HttpParams()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('taskID', taskID)
    .set('listID', this.listDetails.listID)

    // await this.http.post<any>('/deleteTask', "taskID="+taskID.toString(), {headers: httpHeaders}).toPromise()
    await this.http.post<any>('/deleteTask', params, {headers: httpHeaders}).toPromise()
    
    this.tasks = await this.http.get<any>('/tasks/'+this.listDetails.listID).toPromise() 

    console.info(this.tasks)

  }

  editListName(){
    this.router.navigate(['/editListName'], {
      state: {
        listID: this.listDetails.listID,
      }
    }) 
  }
}
