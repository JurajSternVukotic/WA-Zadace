import express from 'express';
const app = express();
import { connectToDatabase } from './db.js';

app.use(express.json());
import cors from 'cors';
app.use(cors());

app.get('/', (req, res) => {
    res.send('Pizza app');
    });
    const PORT = 3000;
    app.listen(PORT, error => {
    if (error) {
    console.log('Greška prilikom pokretanja servera', error);
    }
    console.log(`Pizza poslužitelj dela na http://localhost:${PORT}`);
    });

let db = await connectToDatabase();

app.get('/pizze', async (req, res) => {
    let pizze_collection = db.collection('pizze');
    let cijena_query = req.query.cijena;
    let naziv_query = req.query.naziv;
    try {
        let sortObj = {};
        if (cijena_query === '1' || cijena_query === '-1') {
          sortObj.cijena = Number(cijena_query);
        }
        if (naziv_query === '1' || naziv_query === '-1') {
          sortObj.naziv = Number(naziv_query);
        }
        
        let pizze = await pizze_collection.find().sort(sortObj).toArray();
            res.status(200).json(pizze);
    } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.message || 'Unknown error' });

    }
    });
app.get('/narudzbe/:id', async (req, res) => {
    let narudzbe_collection = db.collection('narudzbe');
    let id_param = req.params.id;
    let narudzba = await narudzbe_collection.findOne({ _id: new ObjectId(id_param) }); 
    if (!narudzba) {
    return res.status(404).json({ error: 'Narudžba nije pronađena' });
    }
    res.status(200).json(narudzba);
    });
app.get('/pizze/:naziv', async (req, res) => {
    let pizze_collection = db.collection('pizze');
    let naziv_param = req.params.naziv;
    let pizza = await pizze_collection.findOne({ naziv: naziv_param });
    res.status(200).json(pizza);
    });

    app.post('/pizze', async (req, res) => {
        let pizze_collection = db.collection('pizze');
        let { naziv, cijena, slika, sastojci } = req.body;
      
        if (typeof naziv !== 'string' || naziv.trim() === '') {
          return res.status(400).json({ error: 'Naziv je obavezan i mora biti string' });
        }
      
        if (typeof cijena !== 'number' || isNaN(cijena)) {
          return res.status(400).json({ error: 'Cijena je obavezna i mora biti broj' });
        }
      
        if (typeof slika !== 'string' || slika.trim() === '') {
          return res.status(400).json({ error: 'Slika je obavezna i mora biti string (URL)' });
        }
      
        if (!Array.isArray(sastojci) || sastojci.length === 0 || !sastojci.every(s => typeof s === 'string')) {
          return res.status(400).json({ error: 'Sastojci moraju biti polje stringova' });
        }
      
        try {
          let result = await pizze_collection.insertOne({ naziv, cijena, slika, sastojci });
          res.status(201).json({ insertedId: result.insertedId });
        } catch (error) {
          console.error(error);
          res.status(400).json({ error: 'Pogreška prilikom dodavanja pizze' });
        }
      });
      

        app.post('/narudzbe', async (req, res) => {
            let narudzbe_collection = db.collection('narudzbe');
            let novaNarudzba = req.body;
            let obavezniKljucevi = ['kupac', 'adresa', 'broj_telefona', 'narucene_pizze'];
            let obavezniKljuceviStavke = ['naziv', 'količina', 'veličina'];
            let pizze_collection = db.collection('pizze');
            let dostupne_pizze = await pizze_collection.find().toArray();
            if (!obavezniKljucevi.every(kljuc => kljuc in novaNarudzba)) {
            return res.status(400).json({ error: 'Nedostaju obavezni ključevi' });
            }

            if (!novaNarudzba.narucene_pizze.every(stavka => dostupne_pizze.some(pizza => pizza.naziv
                === stavka.naziv))) {
                return res.status(400).json({ error: 'Odabrali ste pizzu koju nemamo u ponudi' });
                }
        if (!novaNarudzba.narucene_pizze.every(stavka => obavezniKljuceviStavke.every(kljuc =>
            kljuc in stavka))) {
            return res.status(400).json({ error: 'Nedostaju obavezni ključevi u stavci narudžbe'
            });
            }
            if (
            !novaNarudzba.narucene_pizze.every(stavka => {
            return Number.isInteger(stavka.količina) && stavka.količina > 0 && ['mala',
            'srednja', 'velika'].includes(stavka.veličina);
            })
            ) {
            return res.status(400).json({ error: 'Neispravni podaci u stavci narudžbe' });
            }
            try {
            let result = await narudzbe_collection.insertOne(novaNarudzba);
            res.status(201).json({ insertedId: result.insertedId });
            } catch (error) {
            console.log(error.errorResponse);
            res.status(400).json({ error: error.errorResponse });
            }
            });

            app.patch('/pizze/:naziv', async (req, res) => {
                let pizze_collection = db.collection('pizze');
                let naziv_param = req.params.naziv;
                let novaCijena = req.body.cijena;
                try {
                let result = await pizze_collection.updateOne({ naziv: naziv_param }, { $set: {
                cijena: novaCijena } });
                if (result.modifiedCount === 0) {
                return res.status(404).json({ error: 'Pizza nije pronađena' });
                }
                res.status(200).json({ modifiedCount: result.modifiedCount });
                } catch (error) {
                console.log(error.errorResponse);
                res.status(400).json({ error: error.errorResponse });
                }
                });

                app.patch('/narudzbe/:id', async (req, res) => {
                    let narudzbe_collection = db.collection('narudzbe');
                    let id_param = req.params.id;
                    let noviStatus = req.body.status; 
                    try {
                    let result = await narudzbe_collection.updateOne({ _id: new ObjectId(id_param) }, {
                    $set: { status: noviStatus } });
                    if (result.modifiedCount === 0) {
                    return res.status(404).json({ error: 'Narudžba nije pronađena' });
                    }res.status(200).json({ modifiedCount: result.modifiedCount });
                } catch (error) {
                console.log(error.errorResponse);
                res.status(400).json({ error: error.errorResponse });
                }
                });

                app.put('/pizze', async (req, res) => {
                    let pizze_collection = db.collection('pizze');
                    let noviMeni = req.body;
                    try {
                    await pizze_collection.deleteMany({}); 
                    let result = await pizze_collection.insertMany(noviMeni);
                    res.status(200).json({ insertedCount: result.insertedCount });
                    } catch (error) {
                    console.log(error.errorResponse);
                    res.status(400).json({ error: error.errorResponse });
                    }
                    });

                    app.delete('/pizze', async (req, res) => {
                        let pizze_collection = db.collection('pizze');
                        try {
                        let result = await pizze_collection.deleteMany({}); 
                        res.status(200).json({ deletedCount: result.deletedCount });
                        } catch (error) {
                        console.log(error.errorResponse);
                        res.status(400).json({ error: error.errorResponse });
                        }
                        });

                        app.patch('/pizze', async (req, res) => {
                            let pizze_collection = db.collection('pizze');
                            try {
                            let result = await pizze_collection.updateMany({ cijena: { $lt: 15 } }, { $inc: {
                            cijena: 2 } }); 
                            res.status(200).json({ modifiedCount: result.modifiedCount });
                            } catch (error) {
                            console.log(error.errorResponse);
                            res.status(400).json({ error: error.errorResponse });
                            }
                            });

                            app.post('/narudzba', async (req, res) => {
                                const { ime, adresa, telefon, pizza_stavke } = req.body;
                              
                                if (typeof ime !== 'string' || ime.trim() === '') {
                                  return res.status(400).json({ error: 'Ime je obavezno i mora biti string.' });
                                }
                                if (typeof adresa !== 'string' || adresa.trim() === '') {
                                  return res.status(400).json({ error: 'Adresa je obavezna i mora biti string.' });
                                }
                              
                                const telefonStr = String(telefon).trim();
                                if (telefonStr === '' || !/^\d+$/.test(telefonStr)) {
                                  return res.status(400).json({ error: 'Telefon mora biti broj ili string koji se sastoji samo od brojeva.' });
                                }
                              
                                if (!Array.isArray(pizza_stavke) || pizza_stavke.length === 0) {
                                  return res.status(400).json({ error: 'pizza_stavke mora biti polje s barem jednom stavkom.' });
                                }
                              
                                for (let i = 0; i < pizza_stavke.length; i++) {
                                  let { naziv, kolicina, velicina } = pizza_stavke[i];
                              
                                  if (typeof naziv !== 'string' || naziv.trim() === '') {
                                    return res.status(400).json({ error: `Stavka ${i + 1}: Naziv je obavezan i mora biti string.` });
                                  }
                              
                                  let k = Number(kolicina);
                                  if (isNaN(k) || k <= 0) {
                                    return res.status(400).json({ error: `Stavka ${i + 1}: Količina mora biti broj veći od 0.` });
                                  }
                              
                                  if (!['mala', 'srednja', 'velika'].includes(velicina)) {
                                    return res.status(400).json({ error: `Stavka ${i + 1}: Veličina mora biti 'mala', 'srednja' ili 'velika'.` });
                                  }
                                }
                              
                                let pizze_collection = db.collection('pizze');
                                let pizza_narudzbe_collection = db.collection('pizza_narudzbe');
                              
                                let ukupna_cijena = 0;
                                let stavkeZaSpremanje = [];
                              
                                for (let stavka of pizza_stavke) {
                                  let { naziv, kolicina, velicina } = stavka;
                                  let pizza = await pizze_collection.findOne({ naziv: naziv });
                                  if (!pizza) {
                                    return res.status(400).json({ error: `Pizza '${naziv}' nije pronađena.` });
                                  }
                                                            
                                  let item_price = pizza * kolicina;
                                  ukupna_cijena += item_price;
                              
                                  stavkeZaSpremanje.push({
                                    naziv,
                                    kolicina,
                                    velicina,
                                    ukupna_cijena: item_price
                                  });
                                }
                              
                                let novaNarudzba = {
                                  ime,
                                  adresa,
                                  telefon: telefonStr,
                                  pizza_stavke: stavkeZaSpremanje,
                                  ukupna_cijena
                                };
                              
                                try {
                                  let result = await pizza_narudzbe_collection.insertOne(novaNarudzba);
                                  res.status(201).json({ insertedId: result.insertedId, ukupna_cijena });
                                } catch (error) {
                                  console.error(error);
                                  res.status(400).json({ error: 'Greška prilikom dodavanja narudžbe' });
                                }
                              });
                              