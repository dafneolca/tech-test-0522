import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from './post.interface';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements AfterViewInit {

  displayedColumns: string[] = ['userId', 'id', 'title'];
  dataSource: MatTableDataSource<Post> = new MatTableDataSource<Post>();
  dataSize: number;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public postsService: PostsService) { }

  ngAfterViewInit() {
    this.getData();
  }

  getData(){
    this.postsService.getPosts().subscribe((posts: Post[])=> {
      this.dataSource = new MatTableDataSource(posts);
      this.dataSource.sort = this.sort;
      this.dataSize = posts.length;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(filter){
    const filterValue = (filter.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
