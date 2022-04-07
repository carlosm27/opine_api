//@ts-ignore
import { opine, Router } from "https://deno.land/x/opine@2.1.5/mod.ts";
//@ts-ignore
import { db } from "./db.ts";
//@ts-ignore
import {flights, appFlight} from "./router/flightRouter.ts"

const app = opine();
const router = Router()

const PORT = 3000;

app.get("/", function(req, res) {
    res.send("Hello, welcome to Flights Airlines. ")
});
app.use("/all", flights);
app.use("/new", appFlight);


await db.sync()

app.listen(PORT)

console.log(`https:\\localhost: ${PORT}`);