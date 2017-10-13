import * as _ from 'underscore';

export class PaginationService {
  getPagination(totalItems: number, currentPage: number = 1, perPage: number) {
    let totalPages = Math.ceil(totalItems / perPage);
    let startPage: number, endPage: number;
    if (totalPages <= 7) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 7;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 6;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 4;
      }
    }
    let startIndex = (currentPage - 1) * perPage;
    let endIndex = Math.min(startIndex + perPage - 1, totalItems - 1);
    let pages = _.range(startPage, endPage + 1);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      perPage: perPage,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
