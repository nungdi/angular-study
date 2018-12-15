import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mydate'
})
export class MydatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // 첫번째 파라미터는 파이프 앞의 변수
    console.log('first value:', value);
    // 두번째 파라미터는 mydata: 다음에 오는 변수
    console.log('second args:', args);
    return value + 'aaa';
    // if (args === '$') {
    //   return (value as number) / 1100 + args;
    // } else if (args === 'yen') {
    //   return (value as number) / 120 + args;
    // }
  }

}
