//@ts-ignore
import { DataTypes, Model} from 'https://deno.land/x/denodb/mod.ts';

export class Flight extends Model {
    static table = 'flights';
    static timestamps = true;
  
    static fields = {
      id: { primaryKey: true, autoIncrement: true },
      departure: DataTypes.STRING,
      destination: DataTypes.STRING,
      flightDuration: DataTypes.FLOAT,
    };
  
    static defaults = {
      flightDuration: 2.5,
    };
  }   

//export default Flight