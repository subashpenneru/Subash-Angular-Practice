import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'serverFilter'
})
export class ServerFilterPipe implements PipeTransform {

    transform(value: any, limit: any, prop: any) {
        if(value.length === 0 || limit.trim() === '') {
            return value;
        } else {
            const resArr = [];
            value.forEach(e => {
                if(e[prop].includes(limit)) {
                    resArr.push(e);
                }
            });
            return resArr;
        }
    }
}