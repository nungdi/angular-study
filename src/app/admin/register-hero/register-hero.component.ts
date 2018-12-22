import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { ToasterService } from 'angular2-toaster';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register-hero',
  templateUrl: './register-hero.component.html',
  styleUrls: ['./register-hero.component.scss']
})
export class RegisterHeroComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService, private toastService: ToasterService) {
    this.form = this.fb.group(
      {
        name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
        email: [null, Validators.compose([Validators.required, Validators.email])],
        sex: [null, Validators.required],
        country: [null, Validators.required],
        address: null,
        photo: null
      }
    );
  }

  ngOnInit() {
  }

  register() {
    console.log(this.form.valid);

    if (!this.form.valid) {
      // 유효성 검사
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.controls[key];
        control.markAsTouched({onlySelf: true});
      });
      return;
    }

    // 서버에 등록
    const sendForm = Object.assign({}, this.form.value);
    this.adminService.addHero(sendForm)
      .subscribe(body => {
        console.log(body);
        // 성공 토스트 팝업 호출
        this.toastService.pop('success', 'success', '등록되었습니다!');
        // form 초기화
        this.form.reset({});
      });
  }

  fileUpload(event: any) {
    console.log(event);

    const formData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);

    this.adminService.uploadImage(formData)
      .subscribe(body => {
        console.log(body);
        this.form.controls['photo'].setValue('http://eastflag.co.kr:3000' + body['value']);
      });
  }
}
