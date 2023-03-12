// @ts-nocheck
import type { PaginationResult } from "paginate-prisma";
// tslint:disable-next-line:no-duplicate-imports
import {prisma, paginate, PAGINATION_ORDER} from "../../boot/prisma";

interface APIRequestAll {
    q?: string;
    field?: string;
    order?: PAGINATION_ORDER;
    page?: number;
    perPage?: number;
}

export class AchievementsService {
    public async getAllAchievements({
                                 q,
                                 field,
                                 order,
                                 page,
                                 perPage,
                             }: APIRequestAll): Promise<PaginationResult | null> {
        try {
            const query = {};
            // TODO: generalize
            // TODO: add searchable fields somewhere else
            /*
            if (q != null && q != '' && field != null)
              query[field] = q;
            */

            const data = await paginate(prisma.achievement)(
                query,
                {
                    sort: {
                        field,
                        order,
                    },
                },
            );

            return data;
        } catch (e: any) {
            console.error(e);
            return null;
        }
    }
}
