import { Category } from 'src/app/models/category';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit{


  categoryArray: Category[] = [];

constructor(private categoryService:CategoriesService){

}
  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val=>{
        this.categoryArray=val;
    })
  }
  

}
