import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { PhotosService } from '../services/photos.service';
import { Photo } from './photo.interface';
import { ImageModalComponent } from '../image-modal/image-modal.component';

export interface SortOptions {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})

export class PhotosComponent implements AfterViewInit {

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: Photo[] = [];
  dataSourcePaged: Photo[] = [];
  
  // Pagination
  dataSize: number;
  length: number = 0;
  pageSize: number = 50;
  pageSizeOptions: number[] = [10, 50, 100, 150]

  // Filter
  // searchInput: string = '';

  // For responsive style
  breakpoint: number = 3;

  sortOptions: SortOptions[] = [
    {value: 'title', viewValue: 'Name ASC'},
    {value: 'id', viewValue: 'ID ASC'},
    {value: 'clear', viewValue: 'Clear'},
  ];

  constructor(private photosService: PhotosService, public dialog: MatDialog) { }

  ngAfterViewInit(){
    this.getData();
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;
  }

  getData(){
    this.photosService.getPhotos().subscribe((photos: Photo[])=> {
      this.dataSource = photos;
      this.length = this.dataSource.length
      this.dataSize = photos.length;
      this.dataSourcePaged = this.dataSource.slice(0, 50);
    })
  }

  // Pagination
  onPageChange(event){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }
    this.dataSourcePaged = this.dataSource.slice(startIndex, endIndex);
  }

  //to adjust to screen size
  onResize(event) { 
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 3;
  }

  onViewImage(image){
    this.dialog.open(ImageModalComponent, {
      data: {
        imageUrl: image.url,
        title: image.title
      },
    });
  }

  applyFilter(filter){
    const filterValue = (filter.target as HTMLInputElement).value;
    console.log('filter value', filterValue.trim())
    const newData = this.dataSource.filter((photo)=> photo.title == filterValue)
  }

  selectedValue(event){
    this.onSort(event.value)
  }

  onSort(sortType?){
    let sorted;
    switch (sortType) {
      case 'id':
        sorted = this.dataSource.sort((a, b) => (a.id < b.id) ? -1 : 1)
        this.dataSourcePaged = sorted.slice(0, 50);
        break;
      case 'title':
        sorted = this.dataSource.sort((a, b) => (a.title < b.title) ? -1 : 1)
        this.dataSourcePaged = sorted.slice(0, 50);
        break;
      default:
        this.getData();
    }

  }


}
