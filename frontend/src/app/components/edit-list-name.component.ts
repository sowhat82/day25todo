import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-list-name',
  templateUrl: './edit-list-name.component.html',
  styleUrls: ['./edit-list-name.component.css']
})
export class EditListNameComponent implements OnInit {

  editListForm: FormGroup
  listDetails: any = {};
  routeState: any;
  
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.listDetails.listID = this.routeState.listID ? JSON.parse(this.routeState.listID) : '';
        this.listDetails.digitalOceanKey = this.routeState.digitalOceanKey;
      }
    }
   }

  ngOnInit(): void {

    this.editListForm = this.fb.group({
      newList: this.fb.control('', [Validators.required]),
    })

  }

  async editListName(){
        // add to SQL
        const params = new HttpParams()
        .set('listName', this.editListForm.get('newList').value)
        .set('listID', this.listDetails.listID)
    
        const httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')

        const result = await this.http.post('/editListName', params, {headers: httpHeaders}).toPromise().then(
          function() {
            // success callback
          },
          function(response) {
            // failure callback,handle error here
            console.log(response)
            window.alert(response.error.message)
          }
        )

        this.router.navigate(['/listItems'], {
          state: {
            listID: this.listDetails.listID,
            listName: this.editListForm.get('newList').value,
            digitalOceanKey: this.listDetails.digitalOceanKey
          }
        })
  }
    
}

