import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/shared/user-detail.service';
import { UserDetail } from 'src/app/shared/user-detail.model';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-register-table',
  templateUrl: './register-table.component.html',
  styleUrls: ['./register-table.component.scss']
})
export class RegisterTableComponent implements OnInit {
  public loading: boolean = false;

  constructor(public  service: UserDetailService) { }

  ngOnInit(): void {
    this.loading = true;
    this.service.refreshList().then( _ => this.loading = false);

  }

  populateForm(user: any) {
    //TODO: api ask change big letter to small leter
    console.log(user);
    var temp = new UserDetail;
    temp.UserID = user.userID;
    temp.Username = user.username;
    temp.Password = user.password;
    temp.Email = user.email;
    this.service.formData = temp;
  }
  onDelete(PMId) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteUser(PMId)
        .subscribe(res => {
          this.service.refreshList();
        },
          err => {
            console.log(err);
          })
    }
  }

}
