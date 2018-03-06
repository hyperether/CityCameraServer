import { Injectable } from '@angular/core';
import { HttpService} from "../_core/index";
import { environment } from '../../environments/environment';
import { User } from '../_model/index';

@Injectable()
export class UserService {

    constructor(private http: HttpService) { }

    getAllUsers() {
        return this.http.get('/user/list').map((res) => res.json());
    }
    register(user: User) {
        return this.http.post('/user/register', user).map((res) => res.json());
    }

    update(user: User) {
        return this.http.put('/user/' + user._id,{isAdmin:user.isAdmin});
    }
}
