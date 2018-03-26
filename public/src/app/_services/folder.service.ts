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

    getFolders() {
        return this.http.get('/file/folders/' + this._SesionService.getUserId())
            .map((res) => res.json());
    }

    getFilesForFolder(folder) {
        return this.http.get('/file/' + this._SesionService.getUserId() + '/' + folder + '/files')
            .map((res) => res.json());
    }

    deleteFile(fileId) {
        return this.http.delete('/file/' + this._SesionService.getUserId() + '/delete/' + fileId)
    }

}
