import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Category, CategoryData } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore) { }

  loadData():Observable<Category[]> {
    return this.afs
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as CategoryData;
            const id = a.payload.doc.id;
            return { id, data:{category:data.category} };
          })
        )
      );
  }
}
