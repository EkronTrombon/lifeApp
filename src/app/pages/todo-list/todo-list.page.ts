import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Todo } from '../../interfaces/interfaces';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  myTodos: Todo[] = [];
  showTodo = false;
  newTodo: Todo = {
    todo: '',
    done: false
  }

  constructor(private firebaseService: FirebaseService,
              private uiService: UiService) { }

  ngOnInit() {
    this.firebaseService.getMyTodos().subscribe(resp => {
      this.myTodos = resp;
    });
  }

  checkTodo(event, todo: Todo) {
    if (event.detail.checked) {
      todo.done = true;
    } else {
      todo.done = false;
    }
    this.firebaseService.updateMyTodo(todo);
  }

  saveNewTodo() {
    this.firebaseService.addMyTodo(this.newTodo).then(() => {
      this.showTodo = false;
      this.newTodo = {
        todo: '',
        done: false
      };
    });
  }

  deleteTodo(todo: Todo) {
    this.firebaseService.deleteMyTodo(todo.id).then(() => {
      this.uiService.presentToast('TODO deleted successfully');
    });
  }

}
