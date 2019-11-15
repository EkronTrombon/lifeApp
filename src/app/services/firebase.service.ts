import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Todo } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private myTodos: Observable<Todo[]>;
  private myTodosCollection: AngularFirestoreCollection<Todo>;

  constructor(private afs: AngularFirestore) {
    this.myTodosCollection = this.afs.collection<Todo>('myTodos');
    this.myTodos = this.myTodosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getMyTodos(): Observable<Todo[]> {
    return this.myTodos;
  }

  getMyTodo(id: string): Observable<Todo> {
    return this.myTodosCollection.doc<Todo>(id).valueChanges().pipe(
      take(1),
      map(idea => {
        idea.id  = id;
        return idea;
      })
    );
  }

  addMyTodo(myTodo: Todo): Promise<DocumentReference> {
    return this.myTodosCollection.add(myTodo);
  }

  updateMyTodo(myTodo: Todo): Promise<void> {
    return this.myTodosCollection.doc(myTodo.id).update({
      todo: myTodo.todo,
      done: myTodo.done
    });
  }

  deleteMyTodo(id: string): Promise<void> {
    return this.myTodosCollection.doc(id).delete();
  }
}
