import { Controller, Get, Queries, Route, Security, Tags, Post, Put, Delete, Body, Request, Response } from "tsoa";
import apiResponseBuilder from "../../helpers/apiResponseBuilder";
import { Achievement } from "../../types/achievements/achievement";
import { ImagesService } from "./images.service";

@Tags("Image")
@Security("jwt")
@Route("images")
export default class ImagesController extends Controller {

  @Post("/upload")
  public async upload(@Request() req: any) {
    const data = await new ImagesService().uploadImage(req, req.res);

    return data;
  }
}
