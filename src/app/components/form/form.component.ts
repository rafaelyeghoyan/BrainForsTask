import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

 
  constructor(public fb:FormBuilder) { }

  ngOnInit(): void {
  }

  form = this.fb.group({
      firstname: ['',[Validators.required, Validators.maxLength(20)]],
      lastname: ['',[Validators.required, Validators.maxLength(20)]],
      phone: ['',[Validators.required, Validators.pattern(/^[^A-Za-z]{1,}$/)]],
      email: ['',[Validators.required,Validators.pattern(/^[a-z,0-9,\.]+@[a-z]+\.+[a-z]{2,4}$/)]],
      username: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(6)]],
      countrys: ['',Validators.required]
  })

  i:number = 1;

  valuechange(){
    console.log(this.i);
    this.i++;
    if(this.i == 4){
      this.i = 1;
    }
  }

  regist() {
    console.log(this.form.value)
    this.form.reset({countrys: ''});
  }

}
