import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemComponent } from '../item/item.component';
import { TaskService } from '../services/task.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor(private taskService: TaskService) {
  }

  public lists: typeof this.taskService.tasks = []

  ngOnChanges() {
    console.log('on change')
  }
  ngOnInit(): void {
    this.getList()
  }
  refresh = () => {
    this.getList()
  }
  getList() {
    this.taskService.getTask().subscribe(data => {
      this.lists = data.result
    })
  }
  onEmitSubmit(val: any) {

  }

  onFormSubmit(form: NgForm) {
    console.log(form.value, 'vvvv')
  }
}
