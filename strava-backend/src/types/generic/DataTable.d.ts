import type { PAGINATION_ORDER } from "../../boot/prisma";

export interface DataTableQuery {
    q?: string;
    field?: string;
    order?: PAGINATION_ORDER;
    page?: number;
    perPage?: number;
}