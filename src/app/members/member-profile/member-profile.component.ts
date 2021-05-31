import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Member } from '../../interfaces/member';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.sass']
})
export class MemberProfileComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MemberProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Member
    ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
