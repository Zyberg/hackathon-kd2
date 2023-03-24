import { prisma, paginate } from "../../boot/prisma";
import { AppError } from "../../exceptions/AppError";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { Achievement } from "../../types/achievements/achievement";
import formidable from 'formidable'
import path from 'path'
import type { Request, Response} from "express"

export class ImagesService {

  public async uploadImage(request: Request, res: Response ) {
    const folder = path.join(__dirname, 'public')

    const form = formidable({ multiples: true });

    console.log(form)

    form.parse(request, (err, fields, files) => {
        console.log('\n-----------')
        console.log('Fields', fields)
        console.log('Received:', Object.keys(files))
        console.log()
        res.send('Thank you')
    });

  }
}
