import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
   userId:string = ''
  constructor(private activeRout:ActivatedRoute, private userServ: UserService,
    private _snackBar: MatSnackBar, private routr:Router) { }

  ngOnInit(): void {
    this.activeRout.params.subscribe(data=>{
        this.userId = data.id
    });

    if(this.userId)
    {
       this.userServ.delteUser(this.userId).subscribe(data=>{
          this._snackBar.open("user is deleted successfullly");
          this.routr.navigate(['list']);
       },err=>{
        this._snackBar.open("user is not deleted",err);
       })
    }
  }

}
