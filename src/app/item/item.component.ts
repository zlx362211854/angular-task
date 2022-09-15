import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArrayElement } from '../services/commonDeclare';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  public isEdit: boolean = false
  public editedDescription: string | undefined
  public editedTitle: string | undefined
  constructor(private taskServices: TaskService) { }


  @Input() item: ArrayElement<typeof this.taskServices.tasks> | undefined;
  @Input() refresh: (() => void) | undefined
  @Output() getSubmitValue = new EventEmitter<any>();
  ngOnInit(): void {
    this.editedDescription = this.item?.description
    this.editedTitle = this.item?.title
  }

  isComplete() {
    if (!this.item) return false
    if (this.item.status === 'TODO') {
      return false
    }
    if (this.item.status === 'DONE') {
      return true
    }
    return false
  }

  handleDone() {
    if (this.item?.status === 'TODO') {
      this.taskServices.modifyTask({ ...this.item, status: 'DONE' }).subscribe(data => {
        const { code } = data
        if (code === 200) {
          this.refresh?.()
        }
      })
    }
  }
  handleEdit() {
    if (this.isEdit) {
      this.taskServices.modifyTask({ ...this.item, description: this.editedDescription, title: this.editedTitle }).subscribe(data => {
        const { code } = data
        if (code === 200) {
          this.refresh?.()
        }
      })
    }
    this.isEdit = !this.isEdit
  }

  handleDelete() {
    const del = window.confirm('are you sure to delete this item?')
    if (del) {
      this.taskServices.deleteTask(this.item).subscribe(data => {
        const { code } = data
        if (code === 200) {
          this.refresh?.()
        }
      })
    }
  }



}
