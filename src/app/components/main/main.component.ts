import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../../models/User';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  private subscriptions = new Subscription();
  showUser: User;

  defaultFormValues: any = {
    gender: "",
    additional: ""
  };

  constructor(private dataService: DataService) { }


  myFromModel = new FormGroup({
    firstName: new FormControl('', { validators: [Validators.minLength(3), Validators.required], updateOn: 'blur' }),
    lastName: new FormControl('', { validators: [Validators.minLength(3), Validators.required], updateOn: 'blur' }),
    email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'blur' }),
    gender: new FormControl(this.defaultFormValues.gender, { validators: [], updateOn: 'blur' }),
    street: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
    town: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
    country: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
    additional: new FormControl('', { validators: [], updateOn: 'blur' })
  })

  /**
   * getting form values and send to dataService
   */
  onSubmit(): void {
    const userValues = this.myFromModel.value;
    this.dataService.addUser(userValues);
    this.myFromModel.reset(this.defaultFormValues);
    this.logUser();
  }

  /**
   * subscribe and log current user
   */
  logUser(): void {
    const sub = this.dataService.person.subscribe((data: User) => {
      this.showUser = data;
      console.log(this.showUser);
    });
    this.subscriptions.add(sub);
    this.subscriptions.unsubscribe();
  }

}
