import { PrismaClient } from "@prisma/client";
import { create } from "domain";
// import uuid
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();
const userid = "aec9d6eb-dbbf-425a-89ad-16cbb438c039";
async function main() {
  const user = await prisma.users.upsert({
    where: { id: userid },
    update: {},
    create: {
      name: "John Doe",
      email: "johndoe@me.com",
      address: "User Address",
      password: "wkwkland",
      image: "https://storage.googleapis.com/bangkit-bucket-gambar/user/default.png",
      role: "user",
      handicraft: {
        create: [
          {
            name: "Can and Bottle Flower Dish",
            description:
              "Soda Cans and Bottles are every where. \nPeople litter and throw them away without recycling or re-using. \nThis instructable will teach you how to make a shallow or deep dish for holding pocket change, candy, other small objects, or even cigarette ash and butts out of aluminum cans and plastic bottles.",
            image: "https://content.instructables.com/FCL/9J6G/FFRD8X0I/FCL9J6GFFRD8X0I.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
          },
          {
            name: "Chalk Board Paint Can",
            description: "This is super easy, the hardest part is waiting on the paint to dry",
            image: "https://content.instructables.com/F1M/Z5CS/GCPZM3IF/F1MZ5CSGCPZM3IF.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
          },
          {
            name: "Make a Laptop Stand Out of a Soda Can",
            description: "this method is super easy, cheap, and effective, and i'm sure you have two soda cans laying around the house!",
            image: "https://content.instructables.com/F1N/Y9Q3/GGPFBAH6/F1NY9Q3GGPFBAH6.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
          },
          {
            name: "Alcohol Fueled Soda Bottle Rocket,Rockets",
            description: "Contest, The Alcohol Fueled Soda Bottle Rocket, the most awesome thing you can do with a soda bottle other than empty it!",
            image: "https://content.instructables.com/F1P/DXOI/F3SYTKMR/F1PDXOIF3SYTKMR.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
          },
          {
            name: "Eco-safe Hydro/pressure-powered Bottle Rocket With No Cost!",
            description: "i came up with this idea after my dad told me to leave my real bottlerockets alone and i got bored. so... vuala!",
            image: "https://content.instructables.com/FO3/ILAG/FHTOF4QO/FO3ILAGFHTOF4QO.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
          },
          {
            name: "Can Stove,Camping",
            description: "Build a backpacking stove out of two aluminum cans: design is strong, reliable, and extrordinarily lightweight",
            image: "https://content.instructables.com/F6L/6D5H/TKKEP27ZXDX/F6L6D5HTKKEP27ZXDX.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
          },
          {
            name: "Can Lanterns,Lighting",
            description: "Recycle your used drinks cans into potential fire hazards!! A modern take on the paper lantern... now even shinier",
            image: "https://content.instructables.com/FIX/KIRV/G4EEP2LL67Q/FIXKIRVG4EEP2LL67Q.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
          },
          {
            name: "Easy to Make Bottle Head Launcher!",
            description: "Launches bbs airsoft pellets paper or small rocks. Materrials:Bottle, Scissors, Knife (Sharp), Ballons, Rubberbands",
            image: "https://content.instructables.com/F7T/E1RX/FIQ727LB/F7TE1RXFIQ727LB.bmp?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
          },
          {
            name: "Bottle Rocket Pistol,Rockets",
            description:
              "There are plenty of bottle rocket plans out there, but I hadn't seen anyone use a quick release coupler as a launch mechanism before. Plus, all other launchers are so large, it seemed to me all you need is the coupler and a valve. I decided to make two so me and the girl can go to the park and have a shootout",
            image: "https://content.instructables.com/FSP/ANL0/ZA6EUN32ROQ/FSPANL0ZA6EUN32ROQ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
          },
          {
            name: "Bottle Gun,Launchers",
            description: "use this on ur friends to scare them, they will back away and cover their face once they see it pointing at them.  its a lame instrutable but hey, it might help some people",
            image: "https://content.instructables.com/FAH/FKVX/7X0ET9K5H7Y/FAHFKVX7X0ET9K5H7Y.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
          },
          {
            name: "Fun Water Bottle Gun,Water",
            description:
              "this is my first instructable by the way so I made a simple amusing one.\nAnyone who put's grandad's eye out or anyone else's eye out or damages them in some odd way with idea takes full responsiblity by using this information to create the item and effect ilustrated",
            image: "https://content.instructables.com/FHC/803B/F4W8PPN7/FHC803BF4W8PPN7.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
          },
          {
            name: "How to Make a Soda Can Rocket",
            description: "In this instructable I am going to teach how to make a rocket out of a soda can. It really simple to create and only takes a minute or two.",
            image: "https://content.instructables.com/FT0/TMB3/F33IV2VJ/FT0TMB3F33IV2VJ.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
          },
          {
            name: "Soda Can Stove,Camping",
            description:
              "Today i'm going to show you how to build a portable alcohol stove made from two cans\nit burns great. ThereÂ isÂ a lot of steps but it does notÂ take more 10-15 minutes to build.\nÂ p.s. This is my firist instructable, so if there is some thingÂ to make this better please tell me",
            image: "https://content.instructables.com/F4X/3PF1/GDVZEZBU/F4X3PF1GDVZEZBU.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
          },
          {
            name: "Night Stand Bottle Light",
            description:
              "This Project is based off of Scooter76's Cool LED Night Light. Besides drilling the bottle, which took a while, the circuit part only took about 20 minutes. When drilling, use a special glass drill bit and go slow with minimal pressure. Take breaks and brush away glass dust. Wear proper protection, including safety glasses and a face mask, to avoid inhaling fine particles.",
            image: "https://content.instructables.com/FVR/3L7N/FK3O7S03/FVR3L7NFK3O7S03.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
          },
          {
            name: "Water Bottle Sprinkler Cap",
            description:
              "I use mine to water guerrilla gardens around the park close to where I live.One benefit is that if you don't have access to water close to your garden site you can pack your bike basket full of bottles of water with their original caps on. Then switch to this one when watering.It's really simple.You will need:capneedle thimble Tips for other uses are appreciated in the comments section.",
            image: "https://content.instructables.com/FCI/78HU/FG4AIKJJ/FCI78HUFG4AIKJJ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
          },
          {
            name: "How to Make a Vodka Lamp (or Any Other Booze Bottle Light Up)",
            description:
              "This instructable is very easy and requires no soldering, no knowledge of electronics, heavy drinking and a lot of friends . \nI thought of this because I couldn't cut off the bottoms of bottles without slicing off my own hand and i don't know how to solder and make LEDs work . I'll promise to learn how to solder. No really, shoon, after finishiing thish bottle.",
            image: "https://content.instructables.com/FG9/JUY3/F5Y3YUF8/FG9JUY3F5Y3YUF8.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
          },
        ],
      },
    },
  });
}
