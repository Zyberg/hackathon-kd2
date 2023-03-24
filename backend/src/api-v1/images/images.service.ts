import formidable from "formidable";
import path from "path";
import type { Request, Response } from "express";

export class ImagesService {
  public async uploadImage(request: Request, res: Response) {
    const folder = path.join(__dirname, "../../../", "public/images");
    const form = formidable({
      multiples: true,
      uploadDir: folder,
      keepExtensions: true,
    });


    var formfields = await new Promise(function (resolve, reject) {
      form.parse(request, function (err, fields, files) {
        if (err) {
          reject(err);
          return;
        }
        console.log("\n-----------");
        console.log("Fields", fields);
        console.log("Received:", Object.keys(files));
        console.log();
        console.log(
          "within form.parse method, subject field of fields object is: " +
            fields.subjects
        );
        resolve(fields);
      }); // form.parse
    });


    return 'a';
  }
}
