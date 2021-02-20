import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  person = new BehaviorSubject<User>(null);


//add new user to person
  addUser(person):void {
    const user: User = {
      Name: `${person.firstName}, ${person.lastName}`,
      Email: `${person.email}`,
      Address: `${person.street}, ${person.town}, ${person.country}`,
      Additional: `${person?.gender} ${person.gender && person.additional ? ',' : ''} ${person?.additional}`,
    }
    
    this.person.next(user);
  }

}
