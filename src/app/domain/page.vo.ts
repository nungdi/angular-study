export class PageVo {
  constructor (public pageIndex: number, // 1부터 시작
               public pageSize: number,
               public totalCount: number) {
  }
}
