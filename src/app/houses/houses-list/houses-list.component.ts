import { Component, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MembersService } from '../../services/members.service';
import { House } from '../../interfaces/house';

@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.sass']
})
export class HousesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'totalMembers'];
  dataSource: MatTableDataSource<House> = new MatTableDataSource<House>();

  constructor(private membersService: MembersService) { 
    this.membersService.getHouses().subscribe(houses => {
      console.log("HOUS",(houses));
      this.dataSource = new MatTableDataSource<House>(houses);
    })
  }

  ngOnInit(): void {
  }

}