export interface ListPaginationDto<T>{
    currentPage:number,
    hasMore: boolean,
    limit:number,
    data:T
}