// server/data.js

class Proizvod {
  constructor(
    id,
    naziv,
    cijena,
    velicine,
    opis,
    slike,
    dostupne_boje,
    karakteristike
  ) {
    this.id = id;
    this.naziv = naziv;
    this.cijena = cijena;
    this.velicine = velicine;
    this.opis = opis;
    this.slike = slike;
    this.dostupne_boje = dostupne_boje;
    this.karakteristike = karakteristike;
  }
}
const proizvodi = [
  new Proizvod(
    1,
    "Obična crna majica",
    80,
    ["XS", "S", "M", "L"],
    "Obična crna majica. Nema puno šta reći o njoj, radi ono što treba i nije potrgana! Od sada je dostupna i u drugim bojama!",
    [
      "https://img.freepik.com/premium-photo/man-black-shirt-stands-front-wall-with-black-shirt-it_662214-122518.jpg",
      "https://freshcleantees.com/cdn/shop/files/BLACK-CREW-STUDIO-RESHOOT-FRONT-2_96e5474f-ae60-4393-a524-7959419fd00a_737x980.jpg?v=1721844091",
      "https://img.freepik.com/premium-photo/black-t-shirt-mockup-african-man_662214-6549.jpg",
      "https://t3.ftcdn.net/jpg/03/67/70/90/360_F_367709096_AfVVxoGDhkEiZpmuPFZd1NfxMRAMIqEI.jpg",
    ],
    ["Black", "White", "Blue", "Red"],
    {
      Materijal: "100% pamuk",
      Težina: "200g",
      Održavanje: "Pranje na 30°C, ne sušenje u sušilici",
    }
  ),

  new Proizvod(
    2,
    "Levi's 501 traperice",
    110,
    ["S", "M", "L"],
    "U ovim trapericama će vam svi davati komplimente.",
    [
      "https://media.johnlewiscontent.com/i/JohnLewis/006483969?fmt=auto",
      "https://lsco.scene7.com/is/image/lsco/005170244-dynamic1-pdp?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=1840",
      "https://davesnewyork.com/cdn/shop/products/L_F15_men_04511_1907_F_584x700.jpg?v=1603913529",
      "https://lsco.scene7.com/is/image/lsco/005500260-back-pdp?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=1840",
    ],
    ["Blue", "Black"],
    {
      Materijal: "Denim 100%",
      Težina: "600g",
      Održavanje: "Pranje na hladno, ne glačati",
    }
  ),

  new Proizvod(
    3,
    "Zimska kapa",
    40,
    "onesize",
    "Kapa kako bi vam čuvala misli toplima...",
    [
      "https://i.pinimg.com/236x/15/85/a3/1585a3285206d77b4531ce616693fc22.jpg",
      "https://cdn.suitdirect.co.uk/upload/siteimages/large/0066832_290_a.jpg",
      "https://images.squarespace-cdn.com/content/v1/56bac4878a65e27aeda62204/1541128307650-FIFLDFGGUJ2KEHA76ZOV/IMG_8438.jpg?format=1500w",
      "https://media.boohoo.com/i/boohoo/bmm10500_black_xl?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit",
    ],
    ["Black", "Grey", "Blue"],
    {
      Materijal: "Akril 100%",
      Težina: "50g",
      Održavanje: "Ručno pranje, ne sušenje na direktnoj sunčevoj svjetlosti",
    }
  ),

  new Proizvod(
    4,
    "Čarape Adidas",
    20,
    ["34-36", "37-39", "40-42"],
    "Veoma prozračne i udobne!",
    [
      "https://pbs.twimg.com/media/F6xlo6TXQAAd9Br.jpg",
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/a2a3283619da483c8d74ab56011d58dc_9366/Athletic_Cushioned_Low-Cut_Socks_6_Pairs_XL_Black_B93222_03_standard.jpg?v=1721844091",
      "https://xcdn.next.co.uk/COMMON/Items/Default/Default/ItemImages/AltItemShot/315x472/N39099s.jpg",
      "https://m.media-amazon.com/images/I/51ux4i5pJ6L._AC_UY1000_.jpg",
    ],
    ["Black", "White", "Grey"],
    {
      Materijal: "100% poliamid",
      Težina: "30g",
      Održavanje: "Pranje na 40°C, sušenje na zraku",
    }
  ),

  new Proizvod(
    5,
    "Tenisice Nike",
    200,
    ["38", "39", "40", "41", "42", "43", "44", "45"],
    "Najbolje Nike tenisice za trčanje!",
    [
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/ea4b6be4-a997-479d-a7fa-4107e6dd7479/AIR+FORCE+1+%2707.png",
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F03%2Fmschf-lil-nas-x-nike-air-max-97-satan-shoes-human-blood-ink-666-jesus-shoe-am97-release-info-0.jpg?q=75&w=800&cbr=1&fit=max",
      "https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/Search/676/450805.jpg?im=Resize,width=350",
      "https://static.ftshp.digital/img/p/2/2/3/5/6/8/223568-full_product.jpg",
    ],
    ["White", "Black", "Red"],
    {
      Materijal: "Gore-Tex, EVA pjena",
      Težina: "250g",
      Održavanje: "Pranje na hladno, ne sušenje u sušilici",
    }
  ),
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
