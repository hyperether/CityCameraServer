import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { AlertService, FolderService, ModalService } from '../_services/index';
import { SessionService, HttpService } from '../_core/index';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {
  listFolders: any;
  users: any;
  files: any;
  error: any;
  //hide/show img for local or s3 storage
  localImg: boolean = false;
  s3Img: boolean = true;
  selected: Number;
  select;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _FolderService: FolderService,
    private _AlertService: AlertService,
    private _SesionService: SessionService,
    private _ModalService: ModalService,

  ) { }

  ngOnInit() {
    this.users = JSON.parse(this._SesionService.getUser());
    this.getAllFolders();
  }
  getAllFolders() {
    this._FolderService.getFolders().subscribe(data => {
      this.listFolders = data.folders;
    }, error => {
      this.error = JSON.parse(error._body);
      this._AlertService.error('Can\'t load folders' + error);
    });
  }
  listFiles(folder) {
    this.selected = 0;
    this.select = function (index) {
      this.selected = index;
    };
    this._FolderService.getFilesForFolder(folder).subscribe(files => {
      if (files.path !== null) {
        this.localImg = true;
        this.s3Img = false;
      }
      this.files = files.files;
    }, error => {
      this.error = JSON.parse(error._body);
      this._AlertService.error('Can\'t load files' + error);
    });
  }
  deleteFile(file) {
    this._ModalService.confirmThis("Are You sure you want delete this image?", () => {
      var idDb = file._id;
      this._FolderService.deleteFile(idDb).subscribe(files => {
        let index = this.files.indexOf(file)
        this.files.splice(index, 1);
      }, error => {
        this.error = JSON.parse(error._body);
        this._AlertService.error('Can\'t delete file' + error);
      });
    }, () => {
      //ACTION: Do this if user says NO
      console.log("Do nothing");
    })
  }
}
