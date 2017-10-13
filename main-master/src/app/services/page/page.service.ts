import { Injectable } from '@angular/core';
import { Link } from './link';

@Injectable()
export class PageService {
    public links: Array<Link> = [];
    constructor() {
    }
}
