import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../services/posts.service';

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const ELEMENT_DATA: Post[] = [
  // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
];


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  displayedColumns: string[] = ['user-id', 'id', 'title', 'body'];
  dataSource;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  // @ViewChild('paginator') paginator!: MatPaginator;

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((res)=> {
      console.log('res: ', res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    })
  }
}
