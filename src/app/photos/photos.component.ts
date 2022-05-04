import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { PhotosService } from '../services/photos.service';
import { Photo } from './photo.interface';
import { ImageModalComponent } from '../image-modal/image-modal.component';



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
  dataSize: number;

  length: number = 0;
  pageSize: number = 50;
  pageSizeOptions: number[] = [10, 50, 100, 150]

  // For responsive style
  breakpoint: number = 3;

  searchInput: string = '';

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
    const newData = this.dataSource.filter(photo=> photo.title == filterValue)

    console.log('new data: ', newData)
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }


}
