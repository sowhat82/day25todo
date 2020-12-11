import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  
  newTaskForm: FormGroup
  listDetails: any = {};
  routeState: any;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.listDetails.listID = this.routeState.listID ? JSON.parse(this.routeState.listID) : '';
        this.listDetails.listName = this.routeState.listName ;
        this.listDetails.digitalOceanKey = this.routeState.digitalOceanKey ;
      }
    }
   }

  ngOnInit(): void {

    this.newTaskForm = this.fb.group({
      newTask: this.fb.control('', [Validators.required]),
    })
  }

  async addNewTask(){
    const newTask = new HttpParams()
    .set('taskName', this.newTaskForm.get('newTask').value)
    .set('listID', this.listDetails.listID)
    .set('listName', this.listDetails.listName)

    const httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
//    .set('Access-Control-Allow-Origin', 'http://localhost:4200');

// const result = await this.http.post('/order', newTask.toString(), {headers: httpHeaders}).toPromise()  
    await this.http.post('/addTask', newTask.toString(), {headers: httpHeaders}).toPromise().then(
      function() {
        // success callback
//          window.alert('Order Added!')
      },
      function(response) {
        // failure callback,handle error here
        // response.data.message will be "This is an error!"

        console.log(response)
        window.alert(response.error.message)
      }
    )
    this.router.navigate(['/listItems'],{
      state: {
        listID: this.listDetails.listID,
        listName: this.listDetails.listName,  
        digitalOceanKey: this.listDetails.digitalOceanKey
      }
    })
  }
}
