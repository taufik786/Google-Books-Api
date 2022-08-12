import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipes implements PipeTransform {
  transform(value: any, filterText: any, keyName:any) {
    console.log(value,'vvvv')
    console.log(keyName,'kkkkkkkk')
    if(value == undefined){
      return
    }

    const resultArray = [];
    for(const item of value) {
      console.log(item.volumeInfo.title['The Stand'],'itemmmm')
      if(item.volumeInfo[keyName] == filterText) {
        resultArray.push(item)
      }
    }
    // console.log(resultArray)
    return resultArray;
  }
}
