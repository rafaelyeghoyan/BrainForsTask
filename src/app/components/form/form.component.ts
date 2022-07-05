import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  data: any[] = [];
  constructor(public fb:FormBuilder, public request: RequestService) { }

  ngOnInit(): void {
    this.getRequest();
  }

  form = this.fb.group({
      firstname: ['',[Validators.required, Validators.maxLength(20),Validators.pattern(/^[A-Z][a-z]{1,20}[^0-9]$/)]],
      lastname: ['',[Validators.required, Validators.maxLength(20),Validators.pattern(/^[A-Z][a-z]{1,20}[^0-9]$/)]],
      phone: ['',[Validators.required, Validators.pattern(/^[^A-Za-z]{1,}$/)]],
      email: ['',[Validators.required,Validators.pattern(/^[a-z,0-9,\.]+@[a-z]+\.+[a-z]{2,4}$/)]],
      username: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(6)]],
      countrys: ['',Validators.required]
  })
  
  getRequest () {
    this.request.getData('http://localhost:3000/users').subscribe((res: any) => {
      this.data = res;
    })
  }

  regist() {
    if(this.k === -1){
      this.request.createData('http://localhost:3000/users', this.form.value).subscribe(() => {
        this.form.reset();
        this.getRequest();
      })
    } else {
      this.request.editData('http://localhost:3000/users',this.k,this.form.value).subscribe(() => {
        this.form.reset();
        this.getRequest();
      })
    }
    this.k = -1;
    this.form.reset();
    this.getRequest();
  }

  delete(num:any){
    this.request.deleteData(`http://localhost:3000/users`,num).subscribe(() => {
      this.getRequest();
    })
  }

  k:number = -1;

  edit(value:any,num:any){
    this.form.patchValue(value);
    this.k = num;
  }
}
