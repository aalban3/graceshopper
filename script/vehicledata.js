const vehicles = [
  {
    make: "Nagasaki",
    model: "Dinghy",
    class: "boats",
    price: 12000,
    quantity: 50,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/4/4e/Nagasaki-GTAV-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/9/92/Dinghy-GTAV-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "If you like your dinghies like you like your prophylactics then this is the one for you. A lightweight, high capacity rigid-hulled inflatable boat that's good enough for a team of sailors on shore leave.",
  },
  {
    make: "Pegassi",
    model: "Tempesta",
    class: "sports",
    price: 300000,
    quantity: 27,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/d/db/Pegassi-Logo-GTAO.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/7/76/Tempesta-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "At some point, asking \"So how fast it is?\" is like asking the guy who just put his fist through your ribs \"So how strong are you?\" It's not about the speed anymore. It's not about the style, either, because one touch of the gas and it's little more than a blur. You just know that deep down there's an itch only this car can scratch, and you lack any of the personal qualities you'll need to resist.",
  },
  {
    make: "Pegassi",
    model: "Tezeract",
    class: "sports",
    price: 400000,
    quantity: 4,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/d/db/Pegassi-Logo-GTAO.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/e/e6/Tezeract-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "Ladies and gentlemen, we have crossed the frontier. The motorcar has evolved. The first member of a new and alien species has arrived, and it does not come in peace. The Tezeract's only purpose is to wage a silent war of annihilation on anything else that dares to call itself a means of transport. As of now, there's a right side of history. Choose wisely.",
  },
  {
    make: "Albany",
    model: "Cavalcade",
    class: "suv",
    price: 50000,
    quantity: 50,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/1/1a/Albany-GTAO-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/1/14/Cavalcade2-GTAV-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "The glory days of the excessively-large, gas-guzzling SUV might be over, but the Cavalcade is here to stay.",
  },
  {
    make: "Coil",
    model: "Raiden",
    class: "electric",
    price: 70000,
    quantity: 20,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/5/5a/Coil-Logo-GTAO.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/0/00/Raiden-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "The Raiden is a masterpiece of understatement. If it pulled up next to you, you wouldn't bother to look up. But then the lights go green, and you see it put down the kind of noiseless acceleration that internal combustion can only dream of. Your iFruit falls from your snotty grip, and you think: maybe the world's not so bad after all.",
  },
  {
    make: "Grotti",
    model: "Itali GTO",
    class: "sports",
    price: 130000,
    quantity: 4,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/3/35/Grotti-GTAV-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/7/76/ItaliGTO-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "When you think of lightweight redesigns, you probably think of carbon fiber bodywork and stripped-out interiors. But that's just for beginners. Step inside the Itali GTO, and the air you're breathing has increased hydrogen content for extra lift. Grotti have even taken the controversial step of obliging potential owners to do their part by shaving their body hair and removing at least one kidney. Sometimes you have to suffer for perfection.",
  },
  {
    make: "Grotti",
    model: "Furia",
    class: "sports",
    price: 120000,
    quantity: 15,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/3/35/Grotti-GTAV-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/b/b9/Furia-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "Who needs a super car? Who needs to throw their cash at the finest leather upholstery, godly specs and a body so seductive Aphrodite herself would have bowed down to it? Who needs an all-out-tarmac-tearing-sound-barrier-breaking-sexy-racing-dream-machine? You do. The Grotti Furia - worth selling your second kidney for.",
  },
  {
    make: "Progen",
    model: "GP1",
    class: "sports",
    price: 160000,
    quantity: 21,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/7/79/Progen-Logo-GTAO.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/4/4b/GP1-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "Seasons will change, fashions will come and go, economies will tank, the wholesome popstars of today will be leaking their own bondage tapes tomorrow - but the GP1 will always remain. This is what defined supercars for a generation, perhaps for all time: as pure and flawless as the smile of a newborn.",
  },
  {
    make: "Jobiult",
    model: "P-996 Lazer",
    class: "planes",
    price: 990000,
    quantity: 3,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/6/6e/Name-IV-Jobuilt.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/5/56/P996LAZER-GTAV-front.png/revision/latest/scale-to-width-down/700",
    description:
      "Who doesn't remember their first time? Borrowing one of these from Fort Zancudo for a joy ride. But now you're older and wiser, you're ready for a tactical fighter to call your own. Time to come of age.",
  },
  {
    make: "Nagasaki",
    model: "Blazer Aqua",
    class: "offroad",
    price: 9000,
    quantity: 30,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/4/4e/Nagasaki-GTAV-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/2/29/BlazerAqua-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "If you're a farmer in one of the close-knit communities on the shores of the Alamo Sea, chances are you're legally blind. But apart from that it's your lucky day, because not only does Nagasaki's latest quad come with weapons, it's also fully amphibious, so you can career off the road and into the highly infectious water without a second thought.",
  },
  {
    make: "Obey",
    model: "9F Cabrio",
    class: "sports",
    price: 120000,
    quantity: 25,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/3/38/Obey-Logo-Badge-GTAO.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/6/64/9FCabrio-GTAV-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "There's nothing wrong with the standard Obey 9F, but this is San Andreas. Spend the extra 5k and get the convertible version. You spend enough of your life in air conditioning already.",
  },
  {
    make: "Vapid",
    model: "Guardian",
    class: "offroad",
    price: 52000,
    quantity: 50,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/3/33/Vapid-GTAO-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/3/3c/Guardian-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "Medium-duty commercial truck for heavy-duty consumers. Finally, it's a pick-up to go with your two gallon sodas and twenty piece buckets for once. And the ultra-powerful engine can haul you out your bedroom when you weigh in at three tonnes.",
  },
  {
    make: "Lampadati",
    model: "Toro",
    class: "boats",
    price: 300000,
    quantity: 15,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/3/3f/Lampadati-Logo-GTAO.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/c/c2/Toro2-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "From the Italian lakes to the Vespucci, Los Santos canals - experience a level of refinement that only blood money can buy: timber from protected rainforests, six inch lacquer finishing, and twin v12 engines that can cold-press juice a blue whale. This level of balls-out hedonism would be grotesque in a supercar but it's somehow acceptable in a super speedboat... right?",
  },
  {
    make: "Benefactor",
    model: "Dubsta 6X6",
    class: "offroad",
    price: 350000,
    quantity: 3,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/1/1d/Benefactor-GTAO-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/9/9f/Dubsta6x6-GTAV-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "Is it an SUV? Is it a muscle car? Is it serious military hardware for the oligarch market? It's all of the above with six wheels and a bulletproof shell (if you pay for the extras). No dictator or business leader should be seen without it.",
  },
  {
    make: "Ubermacht",
    model: "Oracle XS",
    class: "sedan",
    price: 32000,
    quantity: 20,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/c/cc/Revolter-GTAV-detail.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/2/2b/Oracle-GTAV-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "If you're a farmer in one of the close-knit communities on the shores of the Alamo Sea, chances are you're legally blind. But apart from that it's your lucky day, because not only does Nagasaki's latest quad come with weapons, it's also fully amphibious, so you can career off the road and into the highly infectious water without a second thought.",
  },
  {
    make: "Pegassi",
    model: "Toros",
    class: "suv",
    price: 250000,
    quantity: 30,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/d/db/Pegassi-Logo-GTAO.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/5/50/Toros-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "What do a 23rd Century hypercar and a family-friendly SUV have in common? More than you might think. They both turn you into a leadfooted, tailgating sociopath the moment you touch the gas. And they both do roughly the same miles per gallon as a burning oil well. With all that shared DNA, it was only a matter of time before someone left them in a dark showroom to see if they would breed – and the Toros is the result.",
  },
];

module.exports = vehicles;
