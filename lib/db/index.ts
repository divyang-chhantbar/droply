import {drizzle} from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";

import * as schema from "./schema";

// lets connect to the database

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql , {schema});

export {sql};

// from the db whatever the operations like inserting into db , adding something all done through drizzle okay and we are also exporting sql as sometimes we might not need drizzle and can directly use raw sql queries .