//@ts-ignore
import { Database, SQLite3Connector } from 'https://deno.land/x/denodb/mod.ts';
//@ts-ignore
import {Business} from './model/Flight.ts';


const connector = new SQLite3Connector({
    filepath: './database.sqlite',
  });
  
export const db = new Database(connector);

db.link([Business])



export default db