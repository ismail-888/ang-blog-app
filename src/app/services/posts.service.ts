import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/compat/app'


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs: AngularFirestore) { }


  loadFeatured() {
    return this.afs
      .collection('post', ref => ref.where('isFeatured', '==', true).limit(4))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() ;
            const id = a.payload.doc.id;
            return { id, data};
          })
        )
      );
  }


  loadLatest(){
    return this.afs
    .collection('post', ref => ref.orderBy('createdAt'))
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() ;
          const id = a.payload.doc.id;
          return { id, data};
        })
      )
    );
  }


  loadCategoryPosts(categoryId:string){
    return this.afs
    .collection('post', ref => ref.where('category.categoryId', '==', categoryId).limit(4))
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() ;
          const id = a.payload.doc.id;
          return { id, data};
        })
      )
    );
  }


  loadOnePost(postId:string){
      return this.afs.doc(`post/${postId}`).valueChanges();
  }

  loadSimilar(catId:string){
    return this.afs
    .collection('post', ref => ref.where('category.categoryId', '==', catId).limit(4))
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() ;
          const id = a.payload.doc.id;
          return { id, data};
        })
      )
    );
  }


  countViews(postId:string){
    const viewsCount={
      views: firebase.default.firestore.FieldValue.increment(1)
    }
    this.afs.doc(`post/${postId}`).update(viewsCount).then(()=>{
      console.log('Views Count Updated ..!')
    })
  }

}
