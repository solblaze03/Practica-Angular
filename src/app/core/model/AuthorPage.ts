import { Author } from "src/app/author/model/Author";
import { Pageable } from './Pageable';


export class AuthorPage {
    content: Author[];
    pageable: Pageable;
    totalElements: number;
}