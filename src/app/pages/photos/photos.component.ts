import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GeneralService } from '../../services/general.service';
import { Photo } from '../../interfaces/photo.interface';
import { ImageModalComponent } from '../../components/image-modal/image-modal.component';

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

  isFiltered: boolean = false;
  
  // Pagination
  dataSize: number;
  length: number = 0;
  pageSize: number = 12;
  pageSizeOptions: number[] = [12, 30, 90, 120];

  // For responsive style
  breakpoint: number = 3;

  sortOptions: SortOptions[] = [
    {value: 'title', viewValue: 'Name ASC'},
    {value: 'id', viewValue: 'ID ASC'},
    {value: 'clear', viewValue: 'Clear'},
  ];

  constructor(
    private generalService: GeneralService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngAfterViewInit(){
    this.getData();
    setTimeout(()=> this.breakpoint = (window.innerWidth <= 800) ? 1 : 3, 0)
  }

  getData(){
    this.generalService.getPhotos().subscribe((photos: Photo[])=> {
      this.dataSource = photos;
      this.length = this.dataSource.length
      this.dataSize = photos.length;
      this.dataSourcePaged = this.getPaginatedData(this.dataSource)
      this.pageSizeOptions = [...this.pageSizeOptions, this.dataSize];
    }, 
    (err) => {
      this.openSnackBar(`${err.status} - ${err.name}`, 'X')
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

  // Responsive size
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

  applyFilter(filterVal){
    if (!filterVal){
      this.isFiltered = false;
      return this.getData();
    }
    const filterValue = filterVal;
    const newData = this.dataSource.filter((photo)=>{
       return photo.title.includes(filterValue)
    })
    this.dataSource = newData;
    this.dataSourcePaged = this.getPaginatedData(this.dataSource);
    this.isFiltered = true;
  }

  selectedValue(event){
    this.onSort(event.value)
  }

  onSort(sortType?){
    let sorted;
    switch (sortType) {
      case 'id':
        sorted = this.dataSource.sort((a, b) => (a.id < b.id) ? -1 : 1)
        this.dataSourcePaged = this.getPaginatedData(sorted);
        break;
      case 'title':
        sorted = this.dataSource.sort((a, b) => (a.title < b.title) ? -1 : 1)
        this.dataSourcePaged = this.getPaginatedData(sorted);
        break;
      default:
        this.getData();
    }
  }

  getPaginatedData(dataArr){
    return dataArr.slice(0, this.pageSize);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }
}