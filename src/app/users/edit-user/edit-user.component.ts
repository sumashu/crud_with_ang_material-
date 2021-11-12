import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
   userId: string='';
   userDetails : any;
   editFormUser: FormGroup = new FormGroup({});
   dataLoaded:boolean = false;
   
  constructor(private activeRout:ActivatedRoute, private userServ: UserService,
    private _snackBar: MatSnackBar, private routr:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.activeRout.params.subscribe(data => {
      this.userId = data.id
    });

    if(this.userId!=='')
    {
      //view user detials
      this.userServ.viewUser(this.userId).toPromise().then(data =>{
             this.userDetails = data;
             console.log(this.userDetails);

             //build the form here
            this.editFormUser = this.formBuilder.group({
              'name':new FormControl(this.userDetails.name,[Validators.required,Validators.minLength(3)]),
              'email':new FormControl(this.userDetails.email,[Validators.required,Validators.email])
            });
            this.dataLoaded = true;

      }).catch(error=>{
        console.log("data is not getting fetched",error);
      })
    }

     
     
  }
  updateUSer()
  {
    //console.log(this.editFormUser.value)
    this.userServ.editUser(this.userId,this.editFormUser.value).subscribe(data=>{
      this._snackBar.open("user is updated successfullly");
    },err=>{
      this._snackBar.open("user is not update");
    });
  }

}
