import { Customer } from "src/app/customer/model/Customer";
import { Game } from "src/app/game/models/Game";

export class Loan{
    id: number;
    customer: Customer;
    game: Game;
    fechaInicio: string;
    fechaDevolucion: string;
}