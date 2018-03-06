import { Injectable } from '@angular/core';

import { HttpService, SessionService } from "../_core/index";
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
import { User } from '../_model/index';

@Injectable()
export class FolderService {
    users: any;
    constructor(
        private http: HttpService,
        private _SesionService: SessionService) {

    }

    ngOnInit() { };

    folders() {
        return this.http.get('/file/folders')
            .map((res) => res.json());
    }
    getFoldersById() {
        return this.http.get('/file/folders/' + this._SesionService.getUserId())
            .map((res) => res.json());
    }
    getlistFiles(folder) {
        return this.http.get('/file/' + folder + '/files')
            .map((res) => res.json());
    }
    getFilesById(folder) {
        return this.http.get('/file/' + this._SesionService.getUserId() + '/' + folder + '/files')
            .map((res) => res.json());
    }

    deleteFile(fileId) {
        return this.http.delete('/file/' + this._SesionService.getUserId() + '/delete/' + fileId)
    }
    deleteFileAdmin(fileId) {
        return this.http.delete('/file/delete/' + fileId)
    }
}
