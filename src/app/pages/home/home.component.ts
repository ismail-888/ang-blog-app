import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

  featuredPostsArray: Array<Object> = [];
  LatestPostArray!:Array<Object>
  constructor(private postService: PostsService) {
   
  }

  ngOnInit(): void {
    this.postService.loadFeatured().subscribe(val => {
      this.featuredPostsArray=val
    });


    this.postService.loadLatest().subscribe(val=>{
      this.LatestPostArray=val;
    })


  }




}
