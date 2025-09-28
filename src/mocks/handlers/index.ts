import { bookDetailHandlers } from "./bookDetailHandlers";
import { libListHandlers } from "./libListHandlers";

export const handlers = [
...libListHandlers,
...bookDetailHandlers
];
