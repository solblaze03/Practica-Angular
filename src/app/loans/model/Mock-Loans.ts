import { Customer } from 'src/app/customer/model/Customer';
import { Loan } from './Loan';
import { Game } from 'src/app/game/models/Game';
import { Customer_DATA } from 'src/app/customer/model/mock-customer';
import { GAME_DATA } from 'src/app/game/models/mock-games';

export const LOAN_DATA : Loan[] = [
    {
        id:0,
        customer: Customer_DATA[0],
        game: GAME_DATA[0],
        fechaInicio: "25-05-2025",
        fechaDevolucion: "30-06-2025"
    },
    {
        id: 1,
        customer: Customer_DATA[1],
        game: GAME_DATA[1],
        fechaInicio: "25-05-2025",
        fechaDevolucion: "25-05-2025"
    },
    {
        
        id: 2,
        customer: Customer_DATA[2],
        game: GAME_DATA[2],
        fechaInicio: "25-05-2025",
        fechaDevolucion: "25-05-2025"
    }
]