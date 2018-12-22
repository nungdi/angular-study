import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mydate'
})
export class MydatePipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    // 첫번째 파라메터는 파이프 앞의 변수
    // 두번째 파라메터는 mydate: 다음에 오는 변수
    console.log('first value: ', value);
    console.log('second agrs: ', args );

    // 환율 변환 예제
    /*    let result = 0;
        switch (args) {
          case '$':
            result = (value as number) / 1100
            break;
          case 'yen':
            result = (value as number) / 120
            break;
        }
        return result;*/

    // 날짜 변환
    return (value as string).substring(0, 16);
  }

}
