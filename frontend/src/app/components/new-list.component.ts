import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {

  newListForm: FormGroup
  digitalOceanKey: any
  file: string

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {


    this.newListForm = this.fb.group({
      newList: this.fb.control('', [Validators.required]),
      imageFile: ['']
    })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.newListForm.get('imageFile').setValue(this.file);
    }
  }

  async addNewList(){

    // add image to digital ocean
    const formData = new FormData();

    // formData.set('name', this.newListForm.get('profile').value);
    formData.set('name', 'test');

    formData.set('image-file', this.file);

    this.digitalOceanKey = await this.http.post<any>('/uploadImage', formData).toPromise()

    console.info(this.digitalOceanKey)

    const params = new HttpParams()
    .set('listName', this.newListForm.get('newList').value)
    .set('digitalOceanKey', this.digitalOceanKey.key)

    const httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
//    .set('Access-Control-Allow-Origin', 'http://localhost:4200');

// const result = await this.http.post('/order', newList.toString(), {headers: httpHeaders}).toPromise()  
    await this.http.post('/addList', params, {headers: httpHeaders}).toPromise().then(
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
    this.router.navigate(['/'])
  }



}
