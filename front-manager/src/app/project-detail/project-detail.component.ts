import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {getProjectStyleFile} from '@angular/cdk/schematics';

@Component({
  selector: 'app-project-detail',
  styleUrl: './project-detail.component.scss',
  standalone: false,
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent implements OnInit {


  constructor(public fb: FormBuilder) {
  }

  ngOnInit() {

  }

  protected readonly getProjectStyleFile = getProjectStyleFile;
}
