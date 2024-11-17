// server/data.js

class Proizvod {
  constructor(id, naziv, cijena, velicine) {
    this.id = id;
    this.naziv = naziv;
    this.cijena = cijena;
    this.velicine = velicine;
  }
}

const proizvodi = [
  new Proizvod(1, "Obična crna majica", 100, ["XS", "S", "M", "L"]),
  new Proizvod(2, "Levi's 501 traperice", 110, ["S", "M", "L"]),
  new Proizvod(3, "Zimska kapa", 40, "onesize"),
  new Proizvod(4, "Čarape Adidas", 20, ["34-36", "37-39", "40-42"]),
  new Proizvod(5, "Tenisice Nike", 200, [
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
  ]),
];

class Narudzba {
  constructor(id, naruceni_proizvodi) {
    this.id = id;
    this.naruceni_proizvodi = naruceni_proizvodi;
  }

  get ukupnaCijena() {
    const ukupno = this.naruceni_proizvodi.reduce((suma, currProizvod) => {
      const pronadeni_proizvod = proizvodi.find(
        (p) => p.id === currProizvod.id
      );
      if (pronadeni_proizvod && pronadeni_proizvod.cijena) {
        return (
          suma + pronadeni_proizvod.cijena * currProizvod.narucena_kolicina
        );
      }
      return suma;
    }, 0);
    return ukupno;
  }
}

let narudzbe = [
  new Narudzba(1, [
    { id: 1, velicina: "M", narucena_kolicina: 2 },
    { id: 3, velicina: "onesize", narucena_kolicina: 1 },
  ]),
];

export { Proizvod, proizvodi, Narudzba, narudzbe };
