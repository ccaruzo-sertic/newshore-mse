import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Member } from '../../interfaces/member';
import { MembersService } from '../../services/members.service';
import { MemberProfileComponent } from '../member-profile/member-profile.component';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.sass']
})
export class MembersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'species', 'gender', 'dateOfBirth', 'ancestry', 'hogwartsStudent', 'hogwartsStaff', 'alive', 'image'];
  dataSource: MatTableDataSource<Member> = new MatTableDataSource<Member>();
  houseName: String = this.route.snapshot.paramMap.get('house');
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private membersService: MembersService,
    private route: ActivatedRoute,
    private router: Router
    ) { 

    if (this.houseName) {
      this.membersService.getMembers(this.route.snapshot.paramMap.get('house')).subscribe(members => {
        this.dataSource = new MatTableDataSource<Member>(members);
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: Member, filter: string) => !filter || data.name.toLowerCase().includes(filter);
      })
    } else {
      this.router.navigate(['/']);
    }
  }

  openDialog(row: Member) {
    const dialogRef = this.dialog.open(MemberProfileComponent, {
      width: '300px',
      data: row
    });
  }

  ngOnInit() {

  }
  sortData(sort: Sort) { 
    this.dataSource.sort = this.sort; 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
