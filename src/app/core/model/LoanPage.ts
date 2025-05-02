import { Loan } from "src/app/loans/model/Loan";
import { Pageable } from "./Pageable";

export class LoanPage {
    content: Loan[];
    pageable: Pageable;
    totalElements: number;
}