//@ts-ignore
import { opine} from "https://deno.land/x/opine@2.1.5/mod.ts";
//@ts-ignore
import { db } from "./db.ts";
//@ts-ignore
import {appFlight} from "./routers/Routers.ts"

const app = opine();


const PORT = 3000;

app.get("/home", function(req, res) {
    res.send("Hello, welcome to Flights Airlines. ")
});

app.use("/", appFlight);


await db.sync()

app.listen(PORT)

console.log(`https://localhost:${PORT}`)
