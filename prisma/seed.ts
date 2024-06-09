import { PrismaClient } from "@prisma/client";
import { create } from "domain";
// import uuid
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();
const userid = "aec9d6eb-dbbf-425a-89ad-16cbb438c039";
const wasteid = [
  uuidv4(),
  uuidv4(),
  uuidv4(),
  uuidv4(),
  uuidv4(),
]
const tagid = [
  uuidv4(),
  uuidv4(),
  uuidv4(),
  uuidv4(),
  uuidv4(),
  uuidv4(),
  uuidv4(),
  uuidv4(),
  uuidv4(),
]
async function main() {
  const waste = await prisma.waste.createMany({
    data: [
      {
        id: wasteid[0],
        name: "Cardboard Box",
      },
      {
        id: wasteid[1],
        name: "Plastic",
      },
      {
        id: wasteid[2],
        name: "Plastic Bottles",
      },
      {
        id: wasteid[3],
        name: "Paper",
      },
      {
        id: wasteid[4],
        name: "Panned Drink",
      },
    ],
    skipDuplicates: true,
  });
  console.log(`Created many waste with ids: ${waste}`);

  const tag = await prisma.tag.createMany({
    data: [
      {
        id: tagid[0],
        name: "Tools",
      },
      {
        id: tagid[1],
        name: "Accessories",
      },
      {
        id: tagid[2],
        name: "Lighting",
      },
      {
        id: tagid[3],
        name: "Toys",
      },
      {
        id: tagid[4],
        name: "Fashion",
      },
      {
        id: tagid[5],
        name: "Decoration",
      },
      {
        id: tagid[6],
        name: "Art",
      },
      {
        id: tagid[7],
        name: "Camping",
      },
      {
        id: tagid[8],
        name: "Garden",
      }
    ],
    skipDuplicates: true,
  });
  console.log(`Created many tag with ids: ${tag}`);

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
            name: "Cute Soda Can Hair Clip",
            description:
              "I was looking for something to hold my hair back for a minute and i looked on my desk...i found a can. so i made this little craft! its so easy and it even actually works! so give it a try! oh, and its kinda fashionable too ",
            image: "Fashion,https://content.instructables.com/F5H/KSOS/GGPF3E5O/F5HKSOSGGPF3E5O.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  name: "Crafting staples",
                  description:
                    "I was looking for something to hold my hair back for a minute and i looked on my desk...i found a can. so i made this little craft! its so easy and it even actually works! so give it a try! oh, and its kinda fashionable too",
                  image: "",
                },
                {
                  step_number: 2,
                  name: "Step 2: Cut a Piece From the Can",
                  description:
                    "So i used an Arizona can, but you can use other cans if you want. This particular can had a cute checker pattern so i used that. the Arizona cans that had it were turquoise and pink. so first you need to cut out the part that's checkered. you can just use scissors.",
                  image: "https://content.instructables.com/F10/39TZ/GGPF3EJW/F1039TZGGPF3EJW.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                },
                {
                  step_number: 3,
                  name: "Step 3: Flatten It Out",
                  description: "So for this step just flatten the can piece out against a table or a book or something. you can also do it with your hands. make sure its flat!",
                  image: "https://content.instructables.com/FM8/BCND/GGPET6T1/FM8BCNDGGPET6T1.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                },
                {
                  step_number: 4,
                  name: "Step 4: Cut the Pattern Out",
                  description: "Cut the checkers out. make it a strip about 5 inches. this step is pretty much explained by the picture.",
                  image: "https://content.instructables.com/F9H/8X0K/GGPFB7ZE/F9H8X0KGGPFB7ZE.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                },
                {
                  step_number: 5,
                  name: "Step 5: Fold It! Well, Not Yet...",
                  description:
                    "For this step, its important that you fold the strip lengthwise about in half. its hard to explain. do the same with the edges. only fold a bit down so its not sharp. it should be about a half inch when you're done.",
                  image: "https://content.instructables.com/F5Q/52ZB/GGPFB7ZG/F5Q52ZBGGPFB7ZG.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                },
                {
                  step_number: 6,
                  name: "Step 6: Now Fold It!",
                  description:
                    "Fold in it half, but leave a little bit peeking out. this bit should be just enough to cover the other part of the clip by like a millimeter. now fold this tiny bit over the clip. make sure that when it's open, you can close it by snapping it, like a normal clip. if you can't, trim a little off.",
                  image: "https://content.instructables.com/FAL/24DI/GGPET6VX/FAL24DIGGPET6VX.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                },
                {
                  step_number: 7,
                  name: "Step 7: Yay! You're Finished!",
                  description: "Congrats, you just made a stylish yet el-cheapo hair clip! to put it in your hair just put some hair in it and clip the top over the bottom like a normal clip. enjoy!",
                  image: "https://content.instructables.com/FS6/YQIR/GGPET6XF/FS6YQIRGGPET6XF.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[4],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[1],
                },
                {
                  id_tag: tagid[4],
                },
              ]
            }
          },
          {
            name: "Can and Bottle Flower Dish",
            description:
              "Soda Cans and Bottles are every where. \nPeople litter and throw them away without recycling or re-using. \nThis instructable will teach you how to make a shallow or deep dish for holding pocket change, candy, other small objects, or even cigarette ash and butts out of aluminum cans and plastic bottles.",
            image: "https://content.instructables.com/FCL/9J6G/FFRD8X0I/FCL9J6GFFRD8X0I.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  name: "Crafting staples",
                  image: "",
                  description:
                    "Soda Cans and Bottles are every where. \nPeople litter and throw them away without recycling or re-using. \nThis instructable will teach you how to make a shallow or deep dish for holding pocket change, candy, other small objects, or even cigarette ash and butts out of aluminum cans and plastic bottles.",
                },
                {
                  step_number: 2,
                  name: "Step 2: What You Need",
                  image: "https://content.instructables.com/FYV/W67G/FFRCP2J0/FYVW67GFFRCP2J0.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  description: "A soda or tea (aluminum) can or plastic bottle\nScissors or box knife",
                },
                {
                  step_number: 3,
                  name: "Step 3: Prepare the Can or Bottle",
                  image: "https://content.instructables.com/F3Q/FMKL/FFRCP2JA/F3QFMKLFFRCP2JA.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  description: "Drink the contents of the can or bottle.\nRinse it out.\nYou may want to put on some gloves to keep yourself from getting cut. Aluminum cans are very sharp when you cut them.\nCut the top of the can off.",
                },
                {
                  step_number: 4,
                  name: "Step 4: Mark the Bottom",
                  image: "https://content.instructables.com/FKF/604E/FFRCP2JQ/FKF604EFFRCP2JQ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  description: "Mark the bottom how deep you want your dish to be with a sharpie. \nDont worry, you wont be able to see this mark when you are finished.",
                },
                {
                  step_number: 5,
                  name: "Step 5: Strip Width",
                  image: "https://content.instructables.com/FSE/ERU5/FFRCP2KU/FSEERU5FFRCP2KU.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  description:
                    "Decide on how wide you want each strip to be. \nI normally go with a little under an inch.\nYou can mark this out or eyeball it.\nIf you eyeball it, you will invariable get 2 or 3 strips that are a bit wider than the others. Dont worry too much about this, it will still look good in the end.",
                },
                {
                  step_number: 6,
                  name: "Step 6: Bending",
                  image: "https://content.instructables.com/F50/9LJH/FFRCP2LB/F509LJHFFRCP2LB.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  description: "Once you have cut strips all the way around the can down to your mark, start bending each strip down.\nBend them all down.",
                },
                {
                  step_number: 7,
                  name: "Step 7: Flipping and Bending",
                  image: "https://content.instructables.com/FME/RJ4P/FFRCP2LL/FMERJ4PFFRCP2LL.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  description: "Flip the can around. It's much easier to do this from behind.\nPick one strip to be the first.\nSlip it under the one to the left.",
                },
                {
                  step_number: 8,
                  name: "Step 8: Folding",
                  image: "https://content.instructables.com/F8T/P7HP/FFRD8X11/F8TP7HPFFRD8X11.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  description: "Slip the strip behind the others.\nDont bend this one down completely. You need it to stay as a loop so you can thread the last strip through.",
                },
                {
                  step_number: 9,
                  name: "Step 9: Creasing",
                  image: "https://content.instructables.com/F8L/78NF/FFRD8X1I/F8L78NFFFRD8X1I.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  description: "Do the same to the next strip, but this time crease it.",
                },
                {
                  step_number: 10,
                  name: "Step 10: Around",
                  image: "https://content.instructables.com/FAH/BL5J/FFRD8X1C/FAHBL5JFFRD8X1C.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  description: "Do this for all the strips all the way around the can or bottle.\nWhen you get back to the beginning strip, push the second to last strip around and through.\nCrease them both to finish this stage.",
                },
                {
                  step_number: 11,
                  name: "Step 11: Last Bends",
                  image: "https://content.instructables.com/F9M/6UVY/FFRD8X0N/F9M6UVYFFRD8X0N.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  description:
                    "Then take the ends of the strips that are just hanging out and fold them under. Look at the pictures, they should explain it better than I can.\nYou may need to trip some of the ends off of the strips to get them to fold up perfectly.\nI do this to make sure little hands, like those of my kids, wont get cut.",
                },
                {
                  step_number: 12,
                  name: "Step 12: Finished!",
                  image: "https://content.instructables.com/FV8/5LLL/FFRD8X0S/FV85LLLFFRD8X0S.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  description: "Admire your can or bottle dish and fill it with something!",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[2],
                },
                {
                  id_waste: wasteid[4],
                },
              ]
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[5],
                },
              ],
            }
          },
          {
            name: "Chalk Board Paint Can",
            description: "This is super easy, the hardest part is waiting on the paint to dry",
            image: "https://content.instructables.com/F1M/Z5CS/GCPZM3IF/F1MZ5CSGCPZM3IF.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Crafting staples",
                  description: "This is super easy, the hardest part is waiting on the paint to dry.",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/F4E/QJ85/GCJ0Y6ZV/F4EQJ85GCJ0Y6ZV.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 2: Supplies",
                  description:
                    "*Paint Can (or something else to paint)\n*Cheap Black Paint\n*Chalkboard PaintTo Add A Little Color\nOptional\n*Tape\n*Colored Spray Paint\n*Glitter\nTip#1 When you buy the chalkboard paint, buy it at a hardware store like Lowes or Home Depot. I bought my can at a store and paid $12 for the can. Then I went to Lowes and found the SAME can for $5. Tip#2 For like $3 I found a trigger for the spray paint. Sometimes my hand cramps when I am using cheaper cans of spray paint. The trigger helps SO much. It also feels better when I use the 'nicer' spray paints like Krylon and Valspar.",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FET/GM7B/GCJ0YBV6/FETGM7BGCJ0YBV6.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 3: Base Layer",
                  description:
                    "Working outside in a well ventilated area spray the base coat. Spray very lightly and do 2 or 3 coats to keep it from dripping. If you are using 2 colors for the base paint the lightest first, then tape off the areas you don't want to be painted the darker color, and paint again. I was a little anxious to take a picture, and the spray paint mist was still in the air when I took the first picture, and it came out a BIT blurry. This picture was after I added the 2nd color.",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FTH/PO2D/GCPZM3I5/FTHPO2DGCPZM3I5.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 4: Remove Tape",
                  description: "Pretty self explanatory. The way I did it made stripes.",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/F4W/SSLQ/GCI8KKLJ/F4WSSLQGCI8KKLJ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 5: Tape Again",
                  description:
                    "This time tape off the area you don't want to be covered with the chalkboard paint. I did a stripe around the bottom. Once again, I used scotch tape, but masking tape or painters tape would have been better, but that's not what I had around the house.",
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/FPY/J3J0/GCI8KKLK/FPYJ3J0GCI8KKLK.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 6: Spray With Cheap Black Paint",
                  description:
                    "Because you have to light layers, it can take 4 or 5 layers to completely cover it. It is cheaper to paint the bottom layers with a paint that only cost $.96 a can. My husband says you could only use the cheap stuff and forget the chalkboard paint, but I haven't tried it yet.",
                },
                {
                  step_number: 7,
                  image: "https://content.instructables.com/FW4/PMKP/GCPZM3I8/FW4PMKPGCPZM3I8.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 7: Spray With Chalkboard Paint",
                  description: "I sprayed 2 layers with the chalkboard paint, letting it dry between the layers to make sure it didn't run or drip.",
                },
                {
                  step_number: 8,
                  image: "https://content.instructables.com/F76/JR9N/GCJ0YBW3/F76JR9NGCJ0YBW3.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 8: Remove Tape",
                  description: "Slowly, carefully peel off the tape.",
                },
                {
                  step_number: 9,
                  image: "https://content.instructables.com/F35/7PXW/GCPZM3IC/F357PXWGCPZM3IC.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 9: Cover Up Any Stupid Mistakes",
                  description:
                    "When I painted the top, it was on the ground. The paint stirred up the dirt and landed on the paint. It gave me an idea. The dirt stuck to the paint, and looked bad, but if that stuck, wouldn't glitter? I painted another layer of black on the lid, and quickly sprinkled it with sea foam green extra fine glitter.\nAfter it dried I brushed it off and some of the glitter came off, but most of it stayed.",
                },
                {
                  step_number: 10,
                  image: "https://content.instructables.com/F1M/Z5CS/GCPZM3IF/F1MZ5CSGCPZM3IF.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 10: Dry and You're Done",
                  description:
                    "Make sure you let it dry enough. My paint says let it dry 24 hours before you color on it with chalk. I have used the brush on kind before and it said let it dry for 48 hours. Just follow the instructions on the can/package.\nI plan on putting the chalk IN the can so my niece can color ON the can.",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[4],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[0],
                }
              ],
            }
          },
          {
            name: "Make a Laptop Stand Out of a Soda Can",
            description: "this method is super easy, cheap, and effective, and i'm sure you have two soda cans laying around the house!",
            image: "https://content.instructables.com/F1N/Y9Q3/GGPFBAH6/F1NY9Q3GGPFBAH6.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Crafting staples",
                  description:
                    "I was looking at other instructables for laptop stands, and I didn't have the materials. So what did I do? I made my own! This instructable will show you how to make a laptop stand from only one very easy material to come by: soda cans. This method is super easy, cheap, and effective, and I'm sure you have two soda cans laying around the house!",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FCB/IN1H/GGPF3BQ8/FCBIN1HGGPF3BQ8.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 2: Obtain 2 Cans",
                  description:
                    "Look in your recycling, on your table, or in your car cupholders for a used, empty soda can. It doesn't matter what size. (Or go to your fridge and drink a soda. Then you can use the can.) Or, if you only drink canned beer, use one of those. :)",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FDC/T1XL/GGPET4NM/FDCT1XLGGPET4NM.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 3: Draw the Line on the Can",
                  description: "Take a sharpie. Draw a line around the can at the bottom sloping downwards. Basically, if the can was a carrot, think of slicing it in half at an angle. Remember to draw it all the way around the can.",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/F22/FSJ7/GGPF3BQE/F22FSJ7GGPF3BQE.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 4: Cut the Can",
                  description: "Take a knife (I used a pocketknife) and cut along the line you drew. You can also use scissors or a sharp steak knife or any sharp knife...",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FPK/G2OQ/GGPFB48R/FPKG2OQGGPFB48R.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 5: Enjoy Your Easy, Cheap Laptop Stand!",
                  description: "You're finished! Put them under your laptop. If you're lazy and didn't make two, just put one in the middle of your laptop. Don't worry, they're pretty sturdy, and extremely portable! :D",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[4],
                },
              ]
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[0],
                },
                {
                  id_tag: tagid[1],
                },
              ],
            }
          },
          {
            name: "Alcohol Fueled Soda Bottle Rocket",
            description: "Contest, The Alcohol Fueled Soda Bottle Rocket, the most awesome thing you can do with a soda bottle other than empty it!",
            image: "https://content.instructables.com/F1P/DXOI/F3SYTKMR/F1PDXOIF3SYTKMR.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Step 1: Crafting staples",
                  description: "Hello everybody! Here's my entry for the Launch It! Contest, The Alcohol Fueled Soda Bottle Rocket, the most awesome thing you can do with a soda bottle other than empty it!",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/F6U/73XL/F3SYTKMI/F6U73XLF3SYTKMI.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 2: Getting Started",
                  description:
                    "Right, this is the Alcohol Fueled Soda Bottle Rocket, a rocket made from a soda bottle that is fueled by alcohol and other volatile liquid vapors. I originally posted this thing months ago, but ewihem unposted it since I didn't have any pictures at the time. That was back when I was a noob that didn't use proper grammer. I haven't reposted until now, so I still have rights as the first liquid fueled, combustion rocket on Instructables, despite the fact someone else posted a similar design.So anyway, this rocket is a load of fun, first I'll show you the vids (start with the one on the top and work down) and then I'll give instuctions.",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/F7H/35C7/F3SYTKMM/F7H35C7F3SYTKMM.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 3: Materials and Supplies",
                  description:
                    "Right, the stuff you'll need to the build the rocket are:\n1 clean 2liter soda bottle with lid (duh)\n1 sonic screwdriver or other device to create hole in lid\n2 bamboo barbecue skewers\n4X2 strip of 2D adhesive material, or clear packing tape\n1 pair of hands or more connected to a brain\nStuff to fly the rocket:\nSafety equipment, safety glasses and gloves\nAlcohol (isopropyl or rubbing, the type you get a pharmacy, not the liquer store), and other liquids (you'll see soon)\nEye dropper\nLong handled ignition deice, such as a lighter\nDue to concerns about safety",
                },
                {
                  step_number: 4,
                  image: "",
                  name: "Step 4: Building the Darn Thing",
                  description:
                    "Right, as demonstrated in the video/s, you have to make a hole in the lid/cap/nozzle wanabe, so whip out your handy dandy sonic screwdriver or equivelant and create a hole about 1cm in diameter in the middle of said lid/cap/nozzle wanabe. Size of hole will affect to some degree rocket performance, too small, won't burn right, to large, not as much thrust. Then tape the skewers onto the side of the bottle, as seen in video and pictures (note, in the video and instructions, I use clear packing tape, in the pictures I'm using masking tape for clarity purposes only, it's rather heavy for use on our little rocket). Optional construction:There were some concerns about the safety of the skewers afixed to the rocket, and of stability, so here's some alternative designs.Instead of skewers taped to the sides, tape two straws on in exactly the same manner as the skewers. I would recommend using straws from Burger King, they are thicker than most other straws. If desired, fins can also be added to the rocket, two triangles of cardstock can be bent into a V and tped onto the skewers. It may be neccisary to shape them to allow the ends of the skewers be inserted into the ground and angled. I wouldn't recommend using fins when fueled with just alchol, the slight improvement in predictability of flight path doesn't justify the significant reduction in altitude (from 30-40 ft to 15ft). However on a higher powered version (youl find out later) it would probobly be worth it. Congratulations, youv'e just completed the construction of your own flight ready rocket, and that took what, 3 minutes tops?",
                },
                {
                  step_number: 5,
                  image: "",
                  name: "Step 5: Takeoff! WWWHHHHOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
                  description:
                    "Right, to fly the rocket, gather the materials described earlier and go back to the first step and watch the videos again. Then come back here. Right, what you need to do is go outside to obstruction-free area. Then dribble 5-10 (amunt of fuel will vary with grade of alcohol, I can fly on 5 drops 99%, but 10 are needed for 76%) largeish drops of alcohol into the rocket. If you haven't already screw on the nozzle. Place your finger or a piece of tape over the hole and roll the acohol around inside for about 30-45 seconds to allow it to evaporate. \nDon your safety equipment and move everbody and any flammables away from a patch on the ground that you dont mind lightly scorching. \nMore on safety:\nThis rocket emits flaming vapors and hot gases, sends hot plastic flying erraticly through the air, and your dealing with intoxicating flammable liquids, please use that underdeveloped organ stored away in your skull, and exercise caution.\nInsert the ends of the rockets launch guidance rods/skewers into the ground at a slight angle unill it is stable. Perform countdown, and when ready to launch remove your finger/tape from nozzle, and at arms length with apply igntion source slightly below (1cm) the nozzle opening. With a whuoosh your rocket will leap forth into the heavens about 20-30 feet and tumble back down to the ground.\nIf you are using straws instead of skewers, still insert your skewers into the ground as described above and then slide the straws taped to the rocket over them, creating a mini launch tower. \nTo re-launch, allow the rocket to air out for a minute or so and repeat steps on this page. your rocket will survive 5-7 flights before it will suffer structural failure and melt. At that point you should save your nozzle/cap and make another, using the salvaged nozzle.\nPics coming soon",
                },
                {
                  step_number: 6,
                  image: "",
                  name: "Step 6: Science Scoop, Further Instructables, and Dedication",
                  description:
                    "Right, whats going on here is that we are creating a fuel/air mixture inside of a semi-confined space, igniting it, and derecting the fow of hot gases to create thrust which is directed downward to create lift.This idea is completely my own, I was unaware",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[2],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[3],
                },
              ],
            }
          },
          {
            name: "Eco-safe Hydro/pressure-powered Bottle Rocket With No Cost!",
            description: "i came up with this idea after my dad told me to leave my real bottlerockets alone and i got bored. so... vuala!",
            image: "https://content.instructables.com/FO3/ILAG/FHTOF4QO/FO3ILAGFHTOF4QO.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Step 1: Crafting staples",
                  description: "I came up with this idea after my dad told me to leave my real bottlerockets alone and I got bored. so... vuala!",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/F8Z/9O9V/FHTOF4Q9/F8Z9O9VFHTOF4Q9.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 2: Tools",
                  description: "1 bike needle\n1 bike pump\ninfinite plastic bottles\nthat's all!!!",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FO3/ILAG/FHTOF4QO/FO3ILAGFHTOF4QO.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 3: Launching",
                  description: "Stick the needle through the cap and pump! Note: hold the bottle down until launch. You can also add some water...",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FXR/K000/FHTAIUGQ/FXRK000FHTAIUGQ.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 4: Launch!",
                  description: "Pump and release!!!!",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[2],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[3],
                },
              ],
            }
          },
          {
            name: "Can Stove",
            description: "Build a backpacking stove out of two aluminum cans: design is strong, reliable, and extrordinarily lightweight",
            image: "https://content.instructables.com/F6L/6D5H/TKKEP27ZXDX/F6L6D5HTKKEP27ZXDX.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Step 1: Crafting staples",
                  description:
                    "Build a backpacking stove out of two aluminum cans: design is strong, reliable, and extraordinarily lightweight, burns alcohol fuels, and can be made for next to no investment of money. Boil water rapidly, deploy a 'campfire' in the middle of your house, and amuse yourself, with a stove that weighs ten grams and costs nothing.",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FTX/FHFM/R5AEP27ZXZ3/FTXFHFMR5AEP27ZXZ3.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 2: Assemble Your Parts",
                  description: "You're going to need:\nTwo empty aluminum cans and one full one. The type matters very little, although there are some bottom-brand beer cans that are simply too thin to make a good stove",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FSX/C2V1/6ESEP27ZXXW/FSXC2V16ESEP27ZXXW.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 3: Mark Burner Holes",
                  description: "Using the Sharpie, mark the bottom of one can with 32 holes. Start with two across, then four square, eight, sixteen and finally 32",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FK9/CWP8/MEPEP27ZXWP/FK9CWP8MEPEP27ZXWP.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 4: Puncture With Thumbtacks",
                  description:
                    "Go around the burner puncturing every other hole with a thumbtack, then go around again to get the rest of them. Be careful in this and other steps not to dent the can any more than necessary, handle towards the top and bottom and put pressure as evenly around as possible. The thumbtacks will bend, some of them, so you'll be going through a few.",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/F2V/FMFO/VR6EP27ZXUB/F2VFMFOVR6EP27ZXUB.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 5: Add Center Drain Holes",
                  description:
                    "Take the nail and pound in seven holes in the middle of the bottom in a 'daisy' pattern. These are where the fuel drains into the chamber. The full can works fine to pound in the nail but a hammer works better.",
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/FWH/B3B8/D58EP27ZXT4/FWHB3B8D58EP27ZXT4.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 6: Score a Groove",
                  description: 'Taking the book and the razor blade, score a groove several times around the base of the can, 7/8" up.',
                },
                {
                  step_number: 7,
                  image: "https://content.instructables.com/FTJ/BE7L/SJTEP27ZXRX/FTJBE7LSJTEP27ZXRX.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 7: Cut Can and Peel Along Score",
                  description:
                    "Using the razor blade and scissors if desired, cut through the can near the score, and cut down towards the score at an angle. Peel the aluminum towards the score, and then along the score: it should part easily, leaving a reasonably smooth rim.",
                },
                {
                  step_number: 8,
                  image: "https://content.instructables.com/F62/Y0KN/74BEP27ZXPJ/F62Y0KN74BEP27ZXPJ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 8: Cut Out Bottom Section",
                  description: 'Using your book and razor, score the second can 1 3/8" from the base, and cut and peel along the score to make the bottom of the stove.',
                },
                {
                  step_number: 9,
                  image: "https://content.instructables.com/FGS/UJIU/X7SEP27ZXN5/FGSUJIUX7SEP27ZXN5.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 9: Cut the Middle Wall",
                  description: 'Out of the wall of one of the cans, cut a 1 1/2" by 7" strip',
                },
                {
                  step_number: 10,
                  image: "https://content.instructables.com/FBL/3FDD/651EP27ZXLY/FBL3FDD651EP27ZXLY.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 10: Fit the Wall",
                  description:
                    "Taking the middle strip, fit it to the inside of the top piece. Check the fit, making sure that the edge that contacts the top piece is entirely smooth. Tape down the bottom side of the middle strip with a piece of flue tape or crimp it down with heavy gauge aluminum foil",
                },
                {
                  step_number: 11,
                  image: "https://content.instructables.com/F7U/PGR6/KM1EP27ZXKR/F7UPGR6KM1EP27ZXKR.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 11: Build a Jig",
                  description:
                    "Taking the cut off top of one of the cans, slide it over the bottom of the full can, getting it as tight as you can by pounding it against the table a few times. This lets you drink the full can later, and is used in the next step.",
                },
                {
                  step_number: 12,
                  image: "https://content.instructables.com/F0U/BUX8/N3WEP27ZXHI/F0UBUX8N3WEP27ZXHI.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 12: Cut Notches in Middle Wall",
                  description: "Three V shaped notches in the bottom part of the middle wall, evenly placed.",
                },
                {
                  step_number: 13,
                  image: "https://content.instructables.com/F0U/BUX8/N3WEP27ZXHI/F0UBUX8N3WEP27ZXHI.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 13: Jig the Bottom and Join",
                  description: "Taking the bottom section, press it over the jig and remove. This part is tricky.",
                },
                {
                  step_number: 14,
                  image: "https://content.instructables.com/F5J/IEN2/2LIEP27ZXGB/F5JIEN22LIEP27ZXGB.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 14: Ignite!,You're done!",
                  description:
                    "Due to the double-walled construction and the integral can bottoms, the stove is much stronger than an empty aluminum can and can be expected to last years if you want it to. The best fuel is methanol, which burns blue and ignites quickly. Absolute ethanol is expensive, but denatured alcohol isn't and works well. The photos are taken with Iso-HEET isopropanol, probably 91%, which is what I had on hand",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[4],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[0],
                },
                {
                  id_tag: tagid[7],
                },
              ],
            }
          },
          {
            name: "Can Lanterns",
            description: "Recycle your used drinks cans into potential fire hazards!! A modern take on the paper lantern... now even shinier",
            image: "https://content.instructables.com/FIX/KIRV/G4EEP2LL67Q/FIXKIRVG4EEP2LL67Q.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Step 1: Crafting staples",
                  description: "Recycle your used drinks cans into potential fire hazards!! A modern take on the paper lantern... now even shinier",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FGR/8BFA/EBOEP2LL5WW/FGR8BFAEBOEP2LL5WW.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 2: Materials Needed",
                  description:
                    "You will need:\nAny size or shape of drinks can (Preferably unopened as of yet as we need the flat top to balance the tea light on)\nSomething to put said contents of can in.\nOur friend Mr Stanley the Knife.\nPliers (I find Snub nosed easier of this)\nAlso needed but not pictured:\nA small length of wire ~10cm\nA tea light (those lil lights in a metal pot)\nMatches",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/F74/NY2H/I9UEP2LL5W7/F74NY2HI9UEP2LL5W7.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 3: May Cause Disorientation",
                  description:
                    "Turn the can upside down and puncture the domed bottom with the stanley knife. Contents liable to a splode so do this in a sink or a swiming pool, possbly even a bath. Tip the remaining liquid into the cup for you to sup at leisure (it helps if you turn the can rightside up ontop of the cup and make a small hole at the top - that way the liquid can flow away easier.",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FGZ/HEX9/HXLEP2LL5VI/FGZHEX9HXLEP2LL5VI.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 4: Remove the Top Part",
                  description:
                    "Carefully cut around the dome using the stanley knife so that the middle part falls out. Then use the pliers to bend the sharp edges back in on thenselves so they are flush with the can (it also helps to cut radial lines going to the lip so the metal co-operates better)",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FKV/QU5T/2EOEP2LL63P/FKVQU5T2EOEP2LL63P.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 5: Just Hanging",
                  description: "Make two holes at opposite ends of the top on the other side of the rim. Loop wire through thease and secure the ends by twisting back on itself. Now you can hang burning doom above people _",
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/FDR/DYO1/7DTEP2LL62B/FDRDYO17DTEP2LL62B.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 6: Cut Lines",
                  description:
                    "Carefully cut lines all the way aound along the length of the can using the stanley knife. I wasnt being particularly neat for this one but to help with uniformity and doing interesting diagonals lay strips of masking tape down the length of the can so that they overlap and one edge is visible (this is the one you are going to cut along). Another aid in your quest for neatness is to use scissors to cut these lines as they leave a relatively straight line with no chewing on the sides.",
                },
                {
                  step_number: 7,
                  image: "https://content.instructables.com/FPB/J4UZ/J5AEP2LL60X/FPBJ4UZJ5AEP2LL60X.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 7: Squeeze!!",
                  description:
                    "Push donw on the top and the bottom of the can so that the strips pop out. (some of them might go inwards but you can pull them out easy enough - or have it as a style feature) All you need to do now is to drop the tealight into the lantern (perhaps securing the base with blu-tack) light her up and hang it somewhere (not with string as its directly above the flame and is a sure sign that things will end in tears or the smell of bacon O_O) To aid in lighting this beast you might want to cut a small hole low down on one of the sides so you can poke a match through to the tea light without risk of burninating your fingers.",
                },
                {
                  step_number: 8,
                  image: "https://content.instructables.com/FIX/KIRV/G4EEP2LL67Q/FIXKIRVG4EEP2LL67Q.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 8: Other Ideas",
                  description:
                    "Below are some examples of what you can do to make your lantern more interesting. The plain vanilla version is on the right, next to it is a model using diagonal lines (to make them pop out all you do is twist the can slightly). Next to that i decided to play around with changing where the bends in the middle where (not that this can is right way up as it was made before i realised that using the top as a base is more stable). The last one has been liberally dribbled in glow in the dark paint (which didnt stick as its wall paint) in an experiment to see if it could charge itself (shich it doesnt as the paint is only on the outside - i was worried it might catch fire if i painted the insides).\nSome other ideas i have done (not pictures) have been along the lines of cutting out stencils on the sides of the can but as i had to use a scalpel for this and the blades blunted really quick its hard to go into too much detail - stuff like stars and plantes work well.\nGo on, play around with this and see if you can come up with any intresting ideas - send me pics of any you have made as well. I didnt take any night pictures because my digicam doesnt like them ",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[4],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[0],
                },
                {
                  id_tag: tagid[2],
                },
              ],
            }
          },
          {
            name: "Easy to Make Bottle Head Launcher!",
            description: "Launches bbs airsoft pellets paper or small rocks. Materrials:Bottle, Scissors, Knife (Sharp), Ballons, Rubberbands",
            image: "https://content.instructables.com/F7T/E1RX/FIQ727LB/F7TE1RXFIQ727LB.bmp?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Step 1: Crafting staples",
                  description: "Launches bbs airsoft pellets paper or small rocks. Materrials:Bottle, Scissors, Knife (Sharp), Ballons, Rubberbands (small).",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/F9N/7QJF/FIQ727M3/F9N7QJFFIQ727M3.bmp?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 2: Getting Your Bottle Head!",
                  description: "Using the sharp knife like a saw Cut the bottle head off!",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FST/0AAP/FIQ727MY/FST0AAPFIQ727MY.bmp?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 3: Cut the Ballon",
                  description: "Using the scissors cut the ballon right where it starts to get fat",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FWD/9ZF3/FIQ727N8/FWD9ZF3FIQ727N8.bmp?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 4: Attaching the Balloon",
                  description: "Use your fingers to stretch the balloon over the screwing end of the bottle head",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FTP/V14F/FIQ727NO/FTPV14FFIQ727NO.bmp?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 5: Securing the Balloon",
                  description: "Using the rubber bands Rap around the bottom of baloon to hold securely (u may also glue or tape it(optional))",
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/FUH/OGG8/FIQ71VHH/FUHOGG8FIQ71VHH.bmp?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 6: Assembly Completed!! FIRING UR LAUNCHER!! XD",
                  description: "Simply pull the balloon stretching it with your ammo inside and release your grip. And BOOM YOU'RE DONE!! Please comment.",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[2],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[3],
                },
              ],
            }
          },
          {
            name: "Bottle Rocket Pistol",
            description:
              "There are plenty of bottle rocket plans out there, but I hadn't seen anyone use a quick release coupler as a launch mechanism before. Plus, all other launchers are so large, it seemed to me all you need is the coupler and a valve. I decided to make two so me and the girl can go to the park and have a shootout",
            image: "https://content.instructables.com/FSP/ANL0/ZA6EUN32ROQ/FSPANL0ZA6EUN32ROQ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Step 1: Crafting staples",
                  description:
                    "Pocket-sized water bottle launcher.\nThere are plenty of bottle rocket plans out there, but I hadn't seen anyone use a quick release coupler as a launch mechanism before. Plus, all other launchers are so large, it seemed to me all you need is the coupler and a valve. I decided to make two so me and the girl can go to the park and have a shootout (after all, the bike pump is hers).",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FGK/D85O/GTREUN32R36/FGKD85OGTREUN32R36.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 2: Collect Your Parts.",
                  description:
                    'You will need:\nA set of quick-release garden hose couplers (I had this idea while in an Ace hardware store, and as it happens, this brand works better than the Lowe\'s version which won\'t hold under pressure.)\nRubber tire valves (auto parts store)\n4" of 1/2" PVC (Lowe\'s Depot)\n1/2" PVC cap (ditto)\n1/2" PVC to 3/4" NPT elbow (NPT= National Pipe Thread) (ditto)\n1-2 liter bottle (I like seltzer.) (not shown) extra garden hose gaskets\n\nSupplies!\nPVC cleaner and cement (Lowe\'s Depot)\nTeflon pipe tape (I used the pink, which is thicker.) (ditto)\n\nTools\nSaw (pretty much anything will cut PVC)\n1/2" drill bit and something to make it spin\nChannelock pliers',
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/F5T/T1WX/UG2EUN32RA0/F5TT1WXUG2EUN32RA0.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 3: Cut Off a Hunk of PVC.",
                  description: "The point of this was to make a compact launcher, so cut just a little more than needed for the fittings.",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FNN/WV1M/Y6VEUN32RAR/FNNWV1MY6VEUN32RAR.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 4: Drill the Cap.",
                  description: 'Drill a 1/2" hole in the cap. I carved a flat on the cap to thin the PVC so the rubber tire valve will seat properly.',
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FHY/9MPV/5INEUN32RFE/FHY9MPV5INEUN32RFE.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 5: Install the Valve.",
                  description: "Stick the valve through the cap from the inside, grab it with pliers, and pull. A bit of dishwashing soap will help.",
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/FGY/MZVD/K3FEUN32RGF/FGYMZVDK3FEUN32RGF.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 6: Glue It Up.",
                  description:
                    "For those who are new to joining PVC, I'll explain the whole process. (Those who know, well, you aren't reading through each step, are you?)\n\nIf you've ever wanted to weld in your kitchen, here's your chance! PVC is joined by solvent welding. This just means that you put a goop on the joint that partially dissolves the plastic, jam it together, give it a quarter twist to ensure complete contact, then let the solvent evaporate and it's all permanently joined.\n\nThe cleaner is basically acetone to remove any oil contamination before you put the \"cement\" on.\n\nAllow the joints to set up several hours before pressurizing the weapon.",
                },
                {
                  step_number: 7,
                  image: "https://content.instructables.com/FHM/45HR/XEGEUN32RH4/FHM45HRXEGEUN32RH4.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 7: Attach the Quick Release Couplers.",
                  description:
                    "So, the elbow is threaded 3/4\" NPT (National Pipe Thread) the couplers are threaded GHT (Garden Hose Thread) (really), and the bottle is threaded WHK (Who the Hell Knows?), how are we going to get connections on all these to withstand 50+psi? Teflon pipe tape and brute force! (plus those extra garden hose gaskets).\n\nThe pink teflon tape is thicker than the white stuff, and we're going to need all the help we can get here. Put several wraps around the female coupler threads (clockwise!) and crank it into the elbow with channelock pliers. The incompatible threads will kinda mush together.\n\nThe thread on the bottle is further from matching with the GHT on the male coupler, so in addition to the Teflon tape, put an extra garden hose gasket in the coupler before threading it on (a total of two). As you crank it together, you will see the plastic stress a little. Get it tight, but don't bust the coupler.",
                },
                {
                  step_number: 8,
                  image: "https://content.instructables.com/FSP/ANL0/ZA6EUN32ROQ/FSPANL0ZA6EUN32ROQ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 8: You May Fire When Ready,Gridley.",
                  description: "Fill 1/2 to 1/3 with water, attach bike pump, pressurize to 40-50 psi, pull back the collar on the quick release to launch. (Extra points to those who can tell me who Gridley was.)",
                },
                {
                  step_number: 9,
                  image: "https://content.instructables.com/FYW/C63Y/YQJEUN32RJG/FYWC63YYQJEUN32RJG.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 9: His & Hers Launchers.",
                  description: "",
                },
                {
                  step_number: 10,
                  image: "https://content.instructables.com/FFH/O40L/R7MEUN32RNG/FFHO40LR7MEUN32RNG.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 10: Gratuitous Launching Picture.",
                  description: "Thanks for the photos, Alice!",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[2],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[3],
                },
              ],
            }
          },
          {
            name: "Bottle Gun",
            description: "use this on ur friends to scare them, they will back away and cover their face once they see it pointing at them.  its a lame instrutable but hey, it might help some people",
            image: "https://content.instructables.com/FAH/FKVX/7X0ET9K5H7Y/FAHFKVX7X0ET9K5H7Y.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Step 1: Crafting staples",
                  description:
                    "Use this on your friends to scare them. They will back away and cover their face once they see it pointing at them. It's a lame instructable (1 pic, pretty obvious how to do) but hey, it might help some people. (Sorry for only 1 pic...didn't feel like taking pictures of a bottle =)",
                },
                {
                  step_number: 2,
                  image: "",
                  name: "Step 2: Get Bottle",
                  description: "Just find any bottle. Some bottles will work, and some won't. It should be about a 17 fl. oz. bottle. (bottle of water etc.)",
                },
                {
                  step_number: 3,
                  image: "",
                  name: "Step 3: Loosen & Tighten",
                  description:
                    "First take the cap off and let out a tiny bit of air, then put the cap back on just far enough so that it's right on the edge of letting air out, and not letting air out. (Basically tighten the cap just far enough so that it doesn't leak air.)",
                },
                {
                  step_number: 4,
                  image: "",
                  name: "Step 4: Twist",
                  description: "Twist the bottle so that lots of pressure builds up. Twist as far as possible and hold there.",
                },
                {
                  step_number: 5,
                  image: "",
                  name: "Step 5: Open Cap / Finish!",
                  description:
                    "Now while holding it twisted, point it at somebody and loosen the cap very quickly. The cap will pop off and hit them. Woo! Yes, I know this is a pretty lame instructable but whatever. (You can also do the same thing but tighten the cap a little more, and jump on it.)",
                },
              ],
            },
          },
          {
            name: "Fun Water Bottle Gun",
            description:
              "this is my first instructable by the way so I made a simple amusing one.\nAnyone who put's grandad's eye out or anyone else's eye out or damages them in some odd way with idea takes full responsiblity by using this information to create the item and effect ilustrated",
            image: "https://content.instructables.com/FHC/803B/F4W8PPN7/FHC803BF4W8PPN7.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Step 1: Crafting staples",
                  description:
                    "I 'invented' this in RE and I'm sure others have done it before but mine requires no water and no materials other than the bottle. This is my first instructable by the way, so I made a simple amusing one. Anyone who puts grandad's eye out or anyone else's eye out or damages them in some odd way with idea takes full responsibility by using this information to create the item and effect illustrated.",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FN0/NP9Y/F4W8PPN6/FN0NP9YF4W8PPN6.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 2: Put the Bottle Under Pressure",
                  description: "The best way of doing this is bending it in half or crushing it down as much as possible until the bottle is too hard to squeeze.",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FN0/NP9Y/F4W8PPN6/FN0NP9YF4W8PPN6.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 3: Firing the Cap",
                  description:
                    "The cap should be just tight enough to hold pressure. Wrap your thumb around the cap and in one smooth flick, spin the cap off of the bottle. It will fly away with a satisfying pop. Another variation is to leave that 2/3 full fizzy drink for a little bit longer and flick the cap off; you'll be left with vapor flowing out of the bottle. If you have a 2/3 full bottle of fizzy water, shake it hard for 30 seconds and fire, it sounds like a gunshot and the cap will have much more velocity than the others. Also, if you're getting a drink, it looks really cool to spin the cap off into your hand (this one is for still drinks).",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[2],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[3],
                },
              ],
            }
          },
          {
            name: "How to Make a Soda Can Rocket",
            description: "In this instructable I am going to teach how to make a rocket out of a soda can. It really simple to create and only takes a minute or two.",
            image: "https://content.instructables.com/FT0/TMB3/F33IV2VJ/FT0TMB3F33IV2VJ.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Step 1: Crafting staples",
                  description: "In this instructable, I am going to teach how to make a rocket out of a soda can. It's really simple to create and only takes a minute or two.",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/F54/641E/F2ZML6DV/F54641EF2ZML6DV.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 2: Gather Your Materials",
                  description: "For this quick project you need:\n 1 Empty Soda Can\n 1 Pair of Scissors\n 1 Fire Cracker\n Lighter or Matches",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FJJ/9NC9/F2ZML6GG/FJJ9NC9F2ZML6GG.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 3: Cut Up the Can",
                  description: "Now take your scissors and cut the can in half.",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/F8Q/WCYZ/F2ZML6GH/F8QWCYZF2ZML6GH.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 4: Strip the Cracker (That Was Not Supposed to Be a Joke)",
                  description: "Now you need to take apart the fire cracker leaving only one cracker left connected to the main fuse. Then slip it in the drinking hole of the soda can and connect both sides of the can to each other.",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FVZ/V2JQ/F2ZML6H1/FVZV2JQF2ZML6H1.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 5: Take Er Out Side",
                  description:
                    "Now take the soda can outside and set the can with hole facing down and the fuse sticking out the side. Then light it and run like hell. Update: Youtube took down my video because it said it was inappropriate. WTF mate. I looked at their code of conduct and it talks about not making bombs. Maybe it was taken down because of that. It makes me really mad that they took it down!!! So I uploaded it to google video! Thanks for Watching. Ask questions and make suggestions. Email: joer14@gmail.com. Music for video by my twin brother. He is only 13 years old.",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[4],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[3],
                },
              ],
            }
          },
          {
            name: "Soda Can Stove",
            description:
              "Today i'm going to show you how to build a portable alcohol stove made from two cans\nit burns great. ThereÂ isÂ a lot of steps but it does notÂ take more 10-15 minutes to build.\nÂ p.s. This is my firist instructable, so if there is some thingÂ to make this better please tell me",
            image: "https://content.instructables.com/F4X/3PF1/GDVZEZBU/F4X3PF1GDVZEZBU.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Step 1: Crafting staples",
                  description:
                    "Today I'm going to show you how to build a portable alcohol stove made from two cans. It burns great. There are a lot of steps, but it does not take more than 10-15 minutes to build. P.S. This is my first instructable, so if there is something to make this better please tell me.",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FQV/SON7/GDVZF1EM/FQVSON7GDVZF1EM.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 2: What You Need",
                  description:
                    "Two Cans\nChalk bits\nA razor\nneedle nose pliers\nsharpie or marker\nscissors\nA clamp\na ruler\nan inch thick book\nSharpie sized book\ndenatured alcohol\nmatches\nOptional tools and materials\nWire or coat hanger (I use wire)\nwire cutter\ninsulation can be used instead of chalk\nnewspaper\ntape\nlighting can (a tuna fish can that a soda can will fit in with room to spare)",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FL6/WOMW/GDVZEYRZ/FL6WOMWGDVZEYRZ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 3: Mark the Can",
                  description: "Take your 1in. book and place your marker on the book, twist the can against the sharpie, marking it. You want to mark the bottom of the can as shown.",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/F6L/H5AH/GDVZF1QB/F6LH5AHGDVZF1QB.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 4: Cutting the Can",
                  description:
                    "After both cans are marked, find your screwdriver and get that blade from the knife. Next, get your clamp and both books. Now clamp the blade on the books on a table. The blade should be about half an inch out from the books. Next, grab a can and start to twist the can against the blade. Do not cut the can, simply twist and twist. Keep scoring the side of the can until you start to split it. Then push around the can with your finger; the top should come right off. Repeat with the other can. P.S. have a spare can, it's easy to mess up, so don't get mad.",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FI5/FZRN/GDVZEYXD/FI5FZRNGDVZEYXD.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 5: Punch Some Holes",
                  description:
                    "Take your marker and mark 16 holes around the edge of the can. Start with 4 then add 4 between those then 8 between those eight. This is when you use something small like a thumbtack; if you make bigger holes, make less. Then add some fuel drain holes at the center. Look at the picture. If you're having a hard time punching those holes, make an indent with your tack. Next, push the can against the tack; this will not hurt your fingers as much. This is the top piece.",
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/F8Q/5MS4/GDVZF1KJ/F8Q5MS4GDVZF1KJ.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 6: Inner Chamber Pt. 1",
                  description:
                    "Take your 1in. book and sharpie and mark the top of one of the can as shown. Next, puncture the can at the line. Cut a 2-inch line then in the middle of the line cut towards the top of the can. Next, grab those scissors; cut following the line. When you first cut it does not look pretty, so now clean it up a bit.",
                },
                {
                  step_number: 7,
                  image: "https://content.instructables.com/F0L/DWUJ/GDVZF5MI/F0LDWUJGDVZF5MI.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 7: Inner Chamber Pt. 2",
                  description:
                    "After you have cleaned up those cuts, cut up the middle. The straighter the better. Now cut a small triangle at the bottom of the can about an inch in from the edge as shown in the picture. At the tip of your triangle, cut about halfway up the piece. Next, take this piece and make a cylinder in the inner circle of the other can. Next, being careful, take the can cylinder out and mark the can using the triangle you cut. It is now okay to let the cylinder come apart. From the triangle you drew, draw a line down/up the can, depending on which way you are looking at the can. Now make sure the drawn triangle is at the bottom. Then mark a little over halfway down the can. Next, you should cut to the line that marks a little over halfway, towards the marker triangle.",
                },
                {
                  step_number: 8,
                  image: "https://content.instructables.com/F4M/D4RM/GDVZOKA2/F4MD4RMGDVZOKA2.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 8: Inner Chamber Pt. 3",
                  description:
                    "Now test fit the cuts; it should make the cylinder. If it does not fit evenly as with mine, cut a tiny bit more on one line to make them fit flat. Do not mind the long tail; we'll cut that later. Next, make a line on the cylinder using your sharpie and one of your can bottoms as shown. Then cut along that line. This removes what won't fit right. Now if you want to shorten up the cylinder side tabs you can. If you have masking tape, you can tape the cylinder at the cut using one piece of tape. It will burn off, but for now, it will make it easier. Set this aside for now.",
                },
                {
                  step_number: 9,
                  image: "https://content.instructables.com/FW0/LD2E/GDVZOKD7/FW0LD2EGDVZOKD7.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 9: Crimp the Top",
                  description: "Crimp the bottom of the top can as shown. Do not crimp all the way up the can, only crimp up about an inch.",
                },
                {
                  step_number: 10,
                  image: "https://content.instructables.com/FQC/W38M/GE04OHA6/FQCW38MGE04OHA6.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 10: Put It All Together",
                  description:
                    "First, get the bottom can (the one without holes or crimping), then stick the cylinder with a triangle on the bottom in the bottom can. Now crunch up some chalk and put it in the inner chamber (have all different sizes). Fill it up about 5/8 of the chamber. After that, take your top and try it on. If it does not fit in, crimp it some more. When it goes in, push it down all the way. If it splits, you can make another bottom and try again or go to step 10; if you get it to work without splitting, go to step 11.",
                },
                {
                  step_number: 11,
                  image: "https://content.instructables.com/FS3/37OH/GE04OHP4/FS337OHGE04OHP4.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 11: Fix Your Split",
                  description:
                    "So it Split; well, you can fix it (I did, and it still works great). What you need to fix it is some wire or a wire coat hanger and wire cutters or needle-nose pliers. With a coat hanger or wire, you need at least to cut a 12in. piece. Take your wire and wrap it around the stove; your two tips should touch and have tails. Wrap your tails together with your pliers. This should be with the loop around the cans tightening them. When it's tight, you can cut off most of the tail, leave at least three turns of wire.",
                },
                {
                  step_number: 12,
                  image: "https://content.instructables.com/F5D/DDJI/GDVZEZ8W/F5DDDJIGDVZEZ8W.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 12: Loading Fuel",
                  description:
                    "Use denatured alcohol in a well-ventilated area. Do not light until vapors are gone. Wait thirty seconds or so. Use at your own risk. Alright, let's start; stick your stove in a fireproof/safe place and pour denatured alcohol about a 1/4 dry cup into the inner chamber. To prime the stove, pour some denatured alcohol into your can. If you don't have a can, use tin foil. Wait thirty seconds then light.",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[4],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[0],
                },
                {
                  id_tag: tagid[7],
                }
              ],
            }
          },
          {
            name: "Night Stand Bottle Light",
            description:
              "This Project is based off of Scooter76's Cool LED Night Light. Besides drilling the bottle, which took a while, the circuit part only took about 20 minutes. When drilling, use a special glass drill bit and go slow with minimal pressure. Take breaks and brush away glass dust. Wear proper protection, including safety glasses and a face mask, to avoid inhaling fine particles.",
            image: "https://content.instructables.com/FVR/3L7N/FK3O7S03/FVR3L7NFK3O7S03.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Step 1: Crafting staples",
                  description:
                    "This Project is based off of Scooter76's Cool LED Night Light.Besides drilling the bottle which quite a while since I was trying to be careful not to shatter it, the circuit part of this project only took about 20 minutes.  When you are drilling a glass bottle make sure that you use a special glass drill bit and that you go slow and don't apply much pressure.  Take a break every 30 seconds or so and brush the glass dust away, I used an air can made for computer dust.  Always wear proper protection such as Safety glasses and proper face mask to make sure that you don't inhale the fine particles.",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/F6Z/P11P/FK3O7S14/F6ZP11PFK3O7S14.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 2: Tools Needed",
                  description: "Bottle\nSoldering Iron\nSolder\nPower adapter\nGlass Drill Bit\nLEDs\nResistors\nWire\nShrink Wrap\nPliers\nWire Stripper",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/F58/DASU/FK3O7S13/F58DASUFK3O7S13.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 3: Drill a Hole",
                  description: "Here you drill a hole in the back of your bottle and then feed the power adapter wire through the hole and out of the bottle so you can work on it.",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/F8P/2383/FK3O7S12/F8P2383FK3O7S12.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 4: Switch and Resistors",
                  description:
                    "Here you are going to solder 2 wires to the switch, one on each lead.  Then on one of the leads, attach the 2 100ohm resistors.  For 2 LEDs, you need roughly 180ohms of resistance.  I used 200 because I had a couple 100ohm resistors laying around.  You can always use more resistance but never use less, otherwise you will end up blowing your LED bulbs.  I finished it off with adding some shrink wrap to cover the connections and to protect it.",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FLP/5Y2N/FK3O7S0G/FLP5Y2NFK3O7S0G.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 5: Completing the Circuit",
                  description:
                    "Here you have to set up the wiring to the LEDs.  Connect the positive lead from one LED to the negative lead from the second LED, solder them and apply shrink wrap.  Then from the power adapter, apply the positive wire from the power adapter to the positive side of the LED circuit.  Attach the Negative wire from the power adapter to one of the wires leading up to the switch.  Attach the other wire from the switch to the negative side of the LED circuit and now you have a completed 2 LED light switch.  Test it to make sure it works then heat all the shrink wrap down to protect and cover the soldered connections.",
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/FHG/JZFH/FK3O7S0F/FHGJZFHFK3O7S0F.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 6: Finishing Up",
                  description:
                    "Just put the wires and LEDs inside of the bottle and screw on the top using the original threads from both the bottle and the cap.  Plug in the power adapter and press the on button on top of the bottle and see it light up.\nVery simple and looks great!",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[3],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[0],
                },
                {
                  id_tag: tagid[1],
                },
                {
                  id_tag: tagid[5],
                }
              ],
            }
          },
          {
            name: "Water Bottle Sprinkler Cap",
            description:
              "I use mine to water guerrilla gardens around the park close to where I live.One benefit is that if you don't have access to water close to your garden site you can pack your bike basket full of bottles of water with their original caps on. Then switch to this one when watering.It's really simple.You will need:capneedle thimble Tips for other uses are appreciated in the comments section.",
            image: "https://content.instructables.com/FCI/78HU/FG4AIKJJ/FCI78HUFG4AIKJJ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Step 1: Crafting staples",
                  description:
                    "This instructable describes how to make a simple and ultra-cheap sprinkler cap that you can use with most plastic (PET) bottles. I use mine to water guerrilla gardens around the park close to where I live.One benefit is that if you don't have access to water close to your garden site you can pack your bike basket full of bottles of water with their original caps on. Then switch to this one when watering.It's really simple.You will need:capneedle (or nail if you want bigger holes more water flow)thimble (or hammer if you go with nail size holes)Tips for other uses are appreciated in the comments section.",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FU2/F0NH/FG4AIKJO/FU2F0NHFG4AIKJO.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 2: Find a Suitable Cap",
                  description:
                    "This step is fairly straight forward. Find a cap that fit the bottle(s) you're going to be using it with. You could of course use the cap of the bottle you intend to use but then the only cap you have wont be very tight if you need to transport it full of water.My suggestion: Find a cap. Yes, go out in the urban jungle and forage. You probably won't have to walk very far before you find a recyclable bottle thrown into a garbage can. Take the cap from it (take the bottle only if you need it, there are probably someone out there who need that recycle-fee better than you. If your country have such a recycling system that is).You may want to clean the cap before you move on to the next step..",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/F14/7N91/FG4AIKJL/F147N91FG4AIKJL.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 3: Pierce the Cap",
                  description:
                    "How simple this may seem there are a few things to bear in mind about before you go ahead.Depending on what you'll use the sprinkler for you'll have to decide how many and how big holes you want. The fist cap I made had not so many (15) but big holes (small nail) and quite good water flow.This time I want a finer sprinkler for delicate plants. Therefore I'm using a sewing needle. You'll have to decide what you need.Another thing is to angle the holes so the water won't just go straight down but have a nice kinda 'sprinkling' effect to it..",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[2],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[1],
                },
                {
                  id_tag: tagid[8],
                }
              ],
            }
          },
          // {
          //   name: "How to Make a Vodka Lamp (or Any Other Booze Bottle Light Up)",
          //   description:
          //     "This instructable is very easy and requires no soldering, no knowledge of electronics, heavy drinking and a lot of friends . \nI thought of this because I couldn't cut off the bottoms of bottles without slicing off my own hand and i don't know how to solder and make LEDs work . I'll promise to learn how to solder. No really, shoon, after finishiing thish bottle.",
          //   image: "https://content.instructables.com/FG9/JUY3/F5Y3YUF8/FG9JUY3F5Y3YUF8.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
          //   detail_handicraft: {
          //     create: [
          //       {
          //         step_number: 1,
          //         image: "",
          //         name: "Step 1: Crafting staples",
          //         description:
          //           "It's more like how to make a Coaster Lamp. Using coasters and a led push button lite, you could easily make a Vodka bottle or any other object that is translucent like a glass into a lamp! This instructable is very easy and requires no soldering, no knowledge of electronics, heavy drinking and a lot of friends (optional for the drinking part). I thought of this because I couldn't cut off the bottoms of bottles without slicing off my own hand and i don't know how to solder and make LEDs work . I'll promise to learn how to solder. No really, shoon, after finishiing thish bottle. hic~",
          //       },
          //       {
          //         step_number: 2,
          //         image: "https://content.instructables.com/F2O/KM3C/F5Y3YUEZ/F2OKM3CF5Y3YUEZ.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
          //         name: "Step 2: Gathering Your Materials: the Bottle",
          //         description:
          //           "This is my favorite step of this instructable: Decide what kind of bottle you'll have as your lamp. I chose the Absolut bottles because they are rather iconic and come in frosted versions which i find work best (and delicious in flavors too). Gather all your friends for a party but make should you stay sober enough to pocket the empty bottles later on. Of course you could put a full, brand new Vodka bottle on your coaster lamp but that's a shame isin't it? and sharing is caring, heh.",
          //       },
          //       {
          //         step_number: 3,
          //         image: "https://content.instructables.com/F6D/DL6D/F5Y3YUG3/F6DDL6DF5Y3YUG3.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
          //         name: "Step 3: Materials You'll Need",
          //         description:
          //           "After you've recovered from your hangover, these are the materials you'll need. 1. A cutting mat 2. A cutter (a good sharp one works best) 3. about 9 coasters, or more if you want them stacked higher 4. Any Led push light thingy. I got this from Osram, called 'dot-it' it has 3 very bright leds inside and looks lovely. you push the lights and they switch on, you push them again to switch it off. 5. about 20 minutes, or you cut slowly like me, an hour.",
          //       },
          //       {
          //         step_number: 4,
          //         image: "https://content.instructables.com/F4A/VKR0/F5Y3YUET/F4AVKR0F5Y3YUET.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
          //         name: "Step 4: Trace a Circle Around the Coaster",
          //         description:
          //           "Put the push light on a coaster and trace around it. I wouldn't be totally accurate about it being centered. It will look more natural like a stack of coasters in the day. and no one would guess it's a lamp.",
          //       },
          //       {
          //         step_number: 5,
          //         image: "https://content.instructables.com/FXW/SAZ7/F5Y3YUF4/FXWSAZ7F5Y3YUF4.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
          //         name: "Step 5: Continue Doing So Until You Get About 8 Coasters",
          //         description: "Cut them out and repeat. Trace and cut until you get about 8 rings.",
          //       },
          //       {
          //         step_number: 6,
          //         image: "https://content.instructables.com/FF2/RRXN/F5Y3YUEP/FF2RRXNF5Y3YUEP.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
          //         name: "Step 6: Cut a Smaller Hole",
          //         description: "Cut a smaller hole just for the light button. You don't really need to do this step but I think it looks better this way.",
          //       },
          //       {
          //         step_number: 7,
          //         image: "https://content.instructables.com/F36/R5TF/F5Y3YUF9/F36R5TFF5Y3YUF9.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
          //         name: "Step 7: Building the Lamp Base",
          //         description: "Push the coaster rings through the light.",
          //       },
          //       {
          //         step_number: 8,
          //         image: "https://content.instructables.com/F45/PPT2/F5Y3YUF0/F45PPT2F5Y3YUF0.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
          //         name: "Step 8: Base Done",
          //         description:
          //           "Add the coaster with the smaller hole on top and tada! Your lamp base is done. Optional: I've put some Absolut vodka text on the back of the light as it came with some sticky backing that I didn't need to use and so I covered it up.",
          //       },
          //       {
          //         step_number: 9,
          //         image: "https://content.instructables.com/F2K/KXS6/F5Y3YUF2/F2KKXS6F5Y3YUF2.jpg?auto=web",
          //         name: "Step 9: Put Bottle and Top and Finished",
          //         description: "Place your bottle on top and you're done! Congratulations!",
          //       },
          //     ],
          //   },
          // },
        ],
      },
    },
  });
  console.log(`Created user with id: ${user.id}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
