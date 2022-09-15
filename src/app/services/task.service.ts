import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, scan } from 'rxjs/operators';
const domain = 'http://114.116.125.115/'
import API from './api'
import { BasicService } from './basic.services';
import { IResponse } from './commonDeclare';
export interface ITask {
    description?: string
    id?: string
    info?: string
    status?: string
    title?: string
}
@Injectable({
    providedIn: 'root',
})
export class TaskService extends BasicService {
    public tasks: ITask[] = []
    constructor(http: HttpClient) {
        super(http)
    }
    getTask() {
        return this.http.get<IResponse<ITask[]>>(domain + API.TASK).pipe(
            catchError(this.handleError)
        );
    }
    modifyTask(params: ITask) {
        return this.http.put<IResponse<{}>>(`${domain}${API.TASK}/${params.id}`, params).pipe(
            catchError(this.handleError)
        );
    }
    deleteTask(params: ITask | undefined) {
        return this.http.delete<IResponse<{}>>(`${domain}${API.TASK}/${params?.id}`).pipe(
            catchError(this.handleError)
        );
    }
}