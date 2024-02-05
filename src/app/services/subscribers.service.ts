import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Sub } from '../models/sub';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor( private afs:AngularFirestore) { }

  addSubs(subData: any){
    this.afs.collection('subscribers').add(subData).then(()=>{
      console.log('Subscriber Saved Successfully!')
    })
  }

  checkSubs(subEmail:string){
    return this.afs.collection('subscribers',ref=>ref.where('email','==',subEmail)).get()
  }

}
