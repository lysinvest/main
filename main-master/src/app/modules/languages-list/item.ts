import { Link } from './link';

export class Item {
  id: number;
  name: string;
  code: string;
  img: string;
  iso_639_1: string;
  iso_639_2: Boolean = false;
  link: Link;
}

export class ItemIgnore {
  id: number;
  name: string;
  link: Link;
}

