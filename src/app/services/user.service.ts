import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
const domain = 'http://114.116.125.115/'
import API from './api'
import { BasicService } from './basic.services';
import { IResponse } from './commonDeclare';

interface ILoginParams {
  username: string
  password: string
}
interface ILoginResult {
  accessToken: string
  id: string
  name: string
}
@Injectable({
  providedIn: 'root',
})
export class UserService extends BasicService {
  constructor(http: HttpClient) {
    super(http)
  }
  login(params: ILoginParams) {
    return this.http.post<IResponse<ILoginResult>>(domain + API.LOGIN, params).pipe(
      catchError(this.handleError)
    );
  }
}