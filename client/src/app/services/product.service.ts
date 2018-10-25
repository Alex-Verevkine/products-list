import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProductVM } from '../interfaces/IProduct';
@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {}

    create(data) {
        const url = '/product';
        return this.http.post<IProductVM>(url, data);
    }

    get(filter = '', sort = '', skip = 0, limit = 0, page = undefined) {
        const url = (page >= 0 ? `/product/get/${page}` : '/product/get/') + `?filter=${filter}&sort=${sort}&skip=${skip}&limit=${limit}`;
        return this.http.get<IProductVM>(url);
    }

    delete(id) {
        const url = `/product/${id}`;
        return this.http.delete<IProductVM>(url);
    }

    update(id, data) {
        const url = `/product/${id}`;
        return this.http.patch<IProductVM>(url, data);
    }

    count() {
        const url = '/product/count';
        return this.http.get<Number>(url);
    }
}
