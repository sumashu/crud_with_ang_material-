import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../users/list-users/list-users.component';



@Injectable({
  providedIn: 'root'
})
export class UserService {
   baseUrl: string= 'https://jsonplaceholder.cypress.io/';
  constructor(private _http:HttpClient) { }

  listUSers():Observable<User[]>
  {
    return this._http.get<User[]>(this.baseUrl + 'users'); 
  }

  viewUser(id:string)
  {
    return this._http.get(this.baseUrl + 'users/'+id);
  }

  addUser(userObj:any)
  {
    return this._http.post(this.baseUrl + 'users', userObj);
  }

  delteUser(id:string)
  {
   return this._http.delete(this.baseUrl + 'users/'+ id);
  }
  editUser(id:any, userObj:any)
  {
    return this._http.put(this.baseUrl + 'users/'+ id,userObj);
  }

}
