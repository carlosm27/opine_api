//@ts-ignore
import { opine, json, Router } from "https://deno.land/x/opine@2.1.5/mod.ts";

//@ts-ignore
import {Flight} from '../model/Flight.ts';
//@ts-ignore
import { readAll } from "https://deno.land/std/streams/conversion.ts";



 export const appFlight = opine();


 appFlight.get("/flight", async function(req, res) {
     try {
        const flights = await Flight.all()
         res.json(flights)
     } catch(err) {
         console.log(err)
         res.setStatus(500).send({error: 'Something went wrong'})
     }     
});

appFlight.get("/flight/:id", async function(req, res) {

    const id = req.params.id;

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

appFlight.post('/flight',  function(req, res) {
    
    const flight =  Flight.create(req.body) 
    try {
        res.setStatus(200).json(req.body)
    } catch (err) {
        console.log(err)
        res.setStatus(500).send({error: 'Something went wrong'})
  
    }
});



appFlight.put("/flight/:id", async function(req, res) {

    const body = req.body
    
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
appFlight.delete("/flight/:id", async function(req, res) {

    const id = req.params.id;
    

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