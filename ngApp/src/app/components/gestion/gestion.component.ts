import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  
  flag:Boolean

  constructor() {
    this.flag = true;
   }

  changeFlag(option):void {
    this.flag = option
  } 


  ngOnInit(): void {

    
  }

}
