import { HttpException, HttpStatus } from "@nestjs/common";

export class ReglaNegocioException extends HttpException {
    constructor(mensaje: string) {
        super(mensaje, HttpStatus.BAD_REQUEST);
    }
}