/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CustomFormatPipe implements PipeTransform {
    transform(value: string) {
        const regex = /^\d{8}-\d{3}$/;

        console.log(value)
        if (!regex.test(value)) {
            throw new BadRequestException(`The format ${value} must be YYYYMMDD-XXX`)
        }

        return value
    }
}