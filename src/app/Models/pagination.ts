export class Pagination {
    // The number of elements in the page
    limit: number =  10;
    // The total number of elements
    totalElements: number = 0;
    // The total number of pages
    totalPages: number = 0;
    // The current page number
    pageNumber: number= 1;
   
    next_page: number = 0;
    prev_page: number = 0;
    per_page: number = 60;
    current_page: number = 0;
}