import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  data: any = [];

  constructor(public http: HttpClient) { }

  getData(url: string) {
    return this.http.get(url);
  }

  createData(url: string, body: any) {
    return this.http.post(url, body);
  }

  deleteData(url: string, id: number) {
    return this.http.delete(url + '/' + id);
  }

  editData(url: string, id: number, body: any) {
    return this.http.put(url + '/' + id, body);
  }
}
