//@ts-ignore
import { opine, json, Router } from "https://deno.land/x/opine@2.1.5/mod.ts";

//@ts-ignore
import {Flight} from '../models/Flight.ts';
//@ts-ignore
import { readAll } from "https://deno.land/std/streams/conversion.ts";


 export const flights = Router();
 export const appFlight = opine();


flights.get("/", async function(req, res) {
     try {
        const flights = await Flight.all()
         res.json(flights)
     } catch(err) {
         console.log(err)
         res.setStatus(500).send({error: 'Something went wrong'})
     }     
});

flights.get("/:id", async function(req, res) {

    const id = req.params.id;
    console.log(id)

    try {
        const flight = await Flight.where('id', req.params.id).first()
        if (!flight) {
        res.setStatus(400).send("Flight not found")
        }
        req.body = flight
        res.setStatus(200).json(req.body)
        console.log(req.body)
    } catch (err) {
        console.log(err)
        res.setStatus(500).send({error: 'Something went wrong'})
  
    }        

});

appFlight.use(json());

appFlight.post('/',  function(req, res) {
    const name = req.body;
    console.log(name)
    const flight =  Flight.create(req.body) 
    try {
        res.setStatus(200).json(req.body)
    } catch (err) {
        console.log(err)
        res.setStatus(500).send({error: 'Something went wrong'})
  
    }
});



appFlight.put("/:id", async function(req, res) {

    const body = req.body
    //console.log(body)
    try {
        const flight = await Flight.where('id', req.params.id).first()

        if (!flight) {
            res.setStatus(400).send("Flight not found")
        }   
        const flights = Flight.where('id', req.params.id).update(req.body)
        req.body = flights
        res.setStatus(200).send({flights: "updated"}) 

    } catch (err) {
        console.log(err)
        res.setStatus(500).send({error: 'Something went wrong'})
      
    }
});
flights.delete("/:id", async function(req, res) {

    const id = req.params.id;
    console.log(id)

    try {
        const flight = await Flight.where('id', req.params.id).first()
        if (!flight) {
        res.setStatus(400).send("Flight not found")
        }
        flight.delete()
        res.setStatus(200).send("Flight deleted")
        
    } catch (err) {
        console.log(err)
        res.setStatus(500).send({error: 'Something went wrong'})
  
    }        

});