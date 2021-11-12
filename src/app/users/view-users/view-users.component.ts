import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
   userId:string='';
   userDetails:any;
  constructor(private userServ: UserService, private activRoute: ActivatedRoute) { }

  ngOnInit(): void {
     this.activRoute.params.subscribe(data =>{
       this.userId = data.id;
     })
    this.userServ.viewUser(this.userId).subscribe(data =>{
      this.userDetails = data;
    })
  }


}
