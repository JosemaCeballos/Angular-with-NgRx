import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'clientFilter'
})

export class SearchPipe implements PipeTransform {

    transform(value: any, ...args: any) {
        if (!!args[0] === false) {
            console.log("pega aqui")
            return value
        }
        return value.filter((val: any) => {
            let result = (val.name.toLowerCase().indexOf(args[0].toLowerCase()) !== -1) ||
                (val.age.toString().includes(args[0])) ||
                (val.email.toLowerCase().indexOf(args[0].toLowerCase()) !== -1)
            return result
        })
    }
}