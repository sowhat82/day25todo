import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListsComponent } from './components/lists.component';
import { ListItemsComponent } from './components/list-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NewListComponent } from './components/new-list.component';
import { NewTaskComponent } from './components/new-task.component';
import { EditListNameComponent } from './components/edit-list-name.component';

const appRoutes: Routes = [
  { path: '', component: ListsComponent },
  { path: 'listItems', component: ListItemsComponent },
  { path: 'newList', component: NewListComponent },
  { path: 'newTask', component: NewTaskComponent },
  { path: 'editListName', component: EditListNameComponent },
  ];

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    ListItemsComponent,
    NewListComponent,
    NewTaskComponent,
    EditListNameComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule, ReactiveFormsModule, HttpClientModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
