import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/shared/user-detail.service';
import { NgForm } from '@angular/forms';
import { UserDetail } from 'src/app/shared/user-detail.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  constructor(public service:UserDetailService) { }
  datafromService:UserDetail;

  ngOnInit(): void {
    this.resetForm();
    this.datafromService = this.service.formData;
  }

  test(){
    console.log(this.service.formData);
    this.service.formData = this.service.formData;
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      UserID: 0,
      Username: '',
      Password: '',
      Email: ''
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.UserID == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postUser().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
  updateRecord(form: NgForm) {
    this.service.putUser().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
