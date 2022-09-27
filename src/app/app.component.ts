import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Todo';
  auth:boolean=false
  currentUrl:string='http://localhost:4200/login'
  ngOnInit(): void {
    console.log(window.location.href)
    this.currentUrl=window.location.href
    this.auth = localStorage.getItem('token')==='true'?true:false
  }
}
