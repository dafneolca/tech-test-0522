import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { Post } from '../../interfaces/post.interface';

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

  isFiltered: boolean = false;

  // Pagination
  dataSize: number;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 50, 100];

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public generalService: GeneralService) { }

  ngAfterViewInit() {
    this.getData();
  }

  getData(){
    this.generalService.getPosts().subscribe((posts: Post[])=> {
      this.dataSource = new MatTableDataSource(posts);
      this.dataSource.sort = this.sort;
      this.dataSize = posts.length;
      this.dataSource.paginator = this.paginator;
      this.isFiltered =  false;
    })
  }

  applyFilter(filterVal){
    this.dataSource.filter = filterVal.trim().toLowerCase();
    this.isFiltered =  true;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}