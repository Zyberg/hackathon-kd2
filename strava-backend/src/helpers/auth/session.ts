import expressSession from "express-session";
import { PrismaClient } from "@prisma/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

export const sessionStore = new PrismaSessionStore(new PrismaClient(), {
  checkPeriod: 2 * 60 * 1000, //ms
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

// TODO: investigate session package options
export const session = expressSession({
  secret: "this_is_a_secret",
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
  rolling: true, // forces resetting of max age
  cookie: {
    maxAge: 360000,
    secure: false, // this should be true only when you don't want to show it for security reason
  },
})


// Extend 