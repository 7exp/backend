import { PrismaClient } from "@prisma/client";
import { create } from "domain";
// import uuid
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();
const userid = "aec9d6eb-dbbf-425a-89ad-16cbb438c039";
const wasteid = [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()];
const tagid = [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()];
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
        name: "Canned Drink",
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
      },
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
              ],
            },
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
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[5],
                },
              ],
            },
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
                },
              ],
            },
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
              ],
            },
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
            },
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
            },
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
            },
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
            },
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
            },
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
            },
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
            },
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
            },
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
                },
              ],
            },
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
                },
              ],
            },
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
                },
              ],
            },
          },
          {
            name: "Orchid Miniature From Paper",
            description:
              "Hello, everyone!Previously, I made the Houseplant Miniature from paper and also Plant Miniature From Paper. This time I am going to show you how I made orchids miniature from paper. The orchids that I made were Paphiopedilum liemianum and Phalaenopsis bellina, both are protected plant species in Indonesia. This project would be perfect for your miniature dollhouse, more than that, you can give it to your beloved 'plant mom'.Let's rock!",
            image: "https://content.instructables.com/F8P/KOEH/LWNJVHPV/F8PKOEHLWNJVHPV.png?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",

            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Crafting staples",
                  description:
                    'Hello, everyone! Previously, I made the Houseplant Miniature from paper and also Plant Miniature From Paper. This time I am going to show you how I made orchids miniature from paper. The orchids that I made were Paphiopedilum liemianum and Phalaenopsis bellina, both are protected plant species in Indonesia. This project would be perfect for your miniature dollhouse, more than that, you can give it to your beloved "plant mom". Let\'s rock!',
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FX0/15SS/LWNJV4ZL/FX015SSLWNJV4ZL.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 2: Paphiopedilum Liemianum - Morphology",
                  description:
                    "Paphiopedilum liemianum is a terrestrial orchid species that is endemic to Northern Sumatra, Indonesia. This species is characterized by pouch shaped-lip, rounded at the ends, pink and fade towards the edge, leathery and ribbon leaves with a prominent middle rib, leaf color dark green at the upper surface and green with purple grape spotting at the lower surface with trichomes at the edge leaves. Inflorescence emerges from the tip of the stem, supporting approximately 8 flowers. The flowers stay fresh for up to 3 weeks. They are marketed as pot plant with high value because of their unique and exotic flowers. (Source: Repository UNAIR)",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/F05/G2UP/LWM4FA4F/F05G2UPLWM4FA4F.png?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 3: Paphiopedilum Liemianum - Lip",
                  description:
                    "The lip of Paphiopedilum liemianum is like a tube/sac. Cut 0.1 cm x 4.5 cm strips from purple-magenta colored paper. I used a 0.2 cm diameter cylindrical object (the cap of my glue applicator) to make the outer of a tight coil. I usually make this outer ring for a tight coil to have a consistent size of several tight coils. Then I rolled the 0.1 cm x 4.5 cm paper strip and placed it inside the outer ring. Now I have a 0.2 cm in diameter tight coil. To turn this coil into a dome-like shape, I used my tweezers to give a little push to the coil to achieve that dome shape. Secure the dome with a little PVAc glue. Cut 0.3 cm width strips from purple-magenta colored paper. Wrap this strip outside the dome and secure it with PVAc glue.",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FOP/C2HF/LWM4FD51/FOPC2HFLWM4FD51.png?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 4: Paphiopedilum Liemianum - Dorsal Sepal",
                  description: "Cut the dark green paper into the shape as you can see in the picture. I added some white lines on the edges of the dorsal sepal using a white gel pen. Glue it to the lip of the flower.",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FP2/3R3D/LWM4FD5K/FP23R3DLWM4FD5K.png?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 5: Paphiopedilum Liemianum - Petal",
                  description:
                    "I cut lime green paper into a seaweed-like shape to make the petals of Paphiopedilum liemianum. I added some purple stripes on the petals using a purple gel pen. Then I glue the petals on the dorsal sepal as you can see in the picture.",
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/FVT/5EBN/LWM4FD6K/FVT5EBNLWM4FD6K.png?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 6: Paphiopedilum Liemianum - Synsepal",
                  description: "This part is like the cape of the flower. I cut dark green paper into a spade-like form. Then glue it on the back of the dorsal sepal.",
                },
                {
                  step_number: 7,
                  image: "https://content.instructables.com/FGO/E019/LWM4FGN1/FGOE019LWM4FGN1.png?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 7: Paphiopedilum Liemianum - Staminode",
                  description: "For this part, I just cut a little from a 0.5-width paper strip, then I crumpled it. After that, I glued it on top of the petal.",
                },
                {
                  step_number: 8,
                  image: "https://content.instructables.com/F0L/B5GT/LWM4FGOO/F0LB5GTLWM4FGOO.png?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 8: Paphiopedilum Liemianum - Peduncle",
                  description: "This time I tried to make two flowers in one plant. So the peduncle (stalk) needed to be branched. I used a thin wire and covered it with dark green paper (you can use floral tape).",
                },
                {
                  step_number: 9,
                  image: "https://content.instructables.com/FII/AL1D/LWM4FGSA/FIIAL1DLWM4FGSA.png?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 9: Paphiopedilum Liemianum - Leaves",
                  description: "I cut the leaves from dark green paper, as you can see in the picture. Then I rolled the leaves around the peduncle and secure it with glue.",
                },
                {
                  step_number: 10,
                  image: "https://content.instructables.com/FN8/N128/LWM4FGU9/FN8N128LWM4FGU9.png?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 10: Paphiopedilum Liemianum - the Pot",
                  description:
                    "I used this technique so many times to make a ring coil. I used a 1 cm width paper strip and also my cutting pen with 0.5 cm diameter (you can use a regular pen or any cylindrical object) to help me make the coil. I simply rolled my strip around my cutting pen, adding a little glue to the beginning end to keep it still. Then roll the paper (I rolled up to 3 layers of paper so that the pot looked thicker than the actual thickness of the paper). Glue to secure the paper when you reach the end of the strip. The ring is complete. Remove gently from the cutting pen. Cut a circle for the base of the pot. I glued some crumpled dark brown paper inside the pot to resemble soil and then I put the whole Paphiopedilum liemianum inside the pot.",
                },
                {
                  step_number: 11,
                  image: "https://content.instructables.com/FIN/6462/LWNJV3BU/FIN6462LWNJV3BU.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 11: Phalaenopsis Bellina - Morphology",
                  description:
                    "Phalaenopsis bellina is an orchid endemic to Borneo, Indonesia. Flowers are star-shaped, 5â€“6 cm in size, deeply saturated fuchsia or violet near the base of sepals and petals. The interior half of the lower sepals typically display more coloration than other sepals and petals. Inflorescences emerge from the leaf axils arranged alternately on the main stem. Oftentimes during development, they puncture the epidermis at the base of the leaves. A single inflorescence typically carries only 2 or 3 flowers at a time, however, more has been observed. Leaves of Phalaenopsis bellina are thick, succulent leaves. They are oval, light to medium green, and sometimes wavy. When mounted, leaves grow so that older, lower leaves are shifted towards the sides while new growth points downwards, in order to expose as much surface area to sunlight. Potted plants do not display this growth habit, so it is often recommended that plants be grown mounted to best expose leaves to light. Phalaenopsis bellina has a fibrous root system, with roots usually emerging near the base of the stem. Roots are thick and are capable of holding water for extended periods of drought. Dense root hairs emerge from the velamen and root tips to anchor plants to host trees or mounts. (Source: Wikipedia)",
                },
                {
                  step_number: 12,
                  image: "https://content.instructables.com/FER/FA0F/LWM4FM1I/FERFA0FLWM4FM1I.png?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 12: Phalaenopsis Bellina - Leaves",
                  description:
                    "For Phalaenopsis bellina, it's best to make the leaves first, because while we wait for the leaves to dry, we can make the other part of the plant. The leaves are quite longer and wider than the Paphiopedilum liemianum's leaves. They also have a glossy appearance on the surface. I cut the leaves shape from dark green paper and applied PVAc glue on the surface to make the leaves look glossy. Wait until dry about 20-30 minutes.",
                },
                {
                  step_number: 13,
                  image: "https://content.instructables.com/FJ7/OZFR/LWM4FM3Z/FJ7OZFRLWM4FM3Z.png?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 13: Phalaenopsis Bellina - Tepal and Column",
                  description:
                    "The Phalaenopsis bellina flower consists of inner and outer tepals, but to make it simple, I cut the white paper into a star-like shape. Then I added green and fuchsia colors to mimic the actual color of the orchid. For the green color, I used a gel pen, and for fuchsia, I used paper (you can use a marker). To make the column of the flower, I made a small coil using a 0.1 cm width paper strip. Then I glued it on the center of the tepal.",
                },
                {
                  step_number: 14,
                  image: "https://content.instructables.com/F4W/GLGU/LWM4FM6K/F4WGLGULWM4FM6K.png?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 14: Phalaenopsis Bellina - Lip",
                  description:
                    'For this part, I used fuchsia-colored paper and then cut it into a spoon-like shape. To make the "spoon" slightly more concave, I pushed the "spoon" part on the EVA foam with a straight pin. I also cut a tiny piece of mustard color paper to make the lateral lip of this orchid and glued it under the fuchsia lip.',
                },
                {
                  step_number: 15,
                  image: "https://content.instructables.com/FW6/RGYJ/LWM4EZGE/FW6RGYJLWM4EZGE.gif?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 15: Phalaenopsis Bellina - Mount",
                  description:
                    "This time I didn't place the orchid inside a pot, rather I decided to mount the orchid. I used a 3 mm thick EVA foam in the size of 1 cm x 1.5 cm. Then I stab the foam using a push pin. Like the actual orchid that needs moss to be able to attach and grow properly on the mount, I also added a moss-like object for this orchid miniature. I crumpled a black sewing thread and then added glue to it to stiffen the thread. Then I added green moss to them using small cuts from a green satin ribbon. Then I glued it on the EVA foam using super glue. Now it's time to glue all those parts to the mount. First I glued the leaves. I arranged it in a zig-zag direction, with larger leaves on the bottom. Secondly, I glue the stalk (I used the same method from the previous stalk/peduncle, but this time it's a single stalk, no branch). Then I glued the flower to the stalk. For this orchid I used the super glue to glue the parts.",
                },
                {
                  step_number: 16,
                  image: "https://content.instructables.com/FA6/6V8F/LWNJVCS8/FA66V8FLWNJVCS8.png?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 16: Final Thoughts",
                  description:
                    "I had so much fun with this project. Before, I was never interested in orchids. For this miniature project, at first, I had an idea to make a miniature of endangered plants in Indonesia, but then I came to learn that Indonesia is home to so many beautiful yet endangered orchid species. If you have any questions or suggestions regarding this project, feel free to leave a comment, or contact me on my Instagram @quinzyvarira. I will also post some footage of the process of making these orchids on my Instagram. I hope you enjoy this instructable as much as I do, and see you in the next instructable!",
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
                  id_tag: tagid[1],
                },
                {
                  id_tag: tagid[5],
                },
                {
                  id_tag: tagid[6],
                },
              ],
            },
          },
          {
            name: "Cardboard Lampshade",
            description:
              "Hi, I'm a student Industrial Product Design. We've got the design challenge to make a new concept with corrugated fiberboard and start from an existing box. I've used an box from a lamp. With that in mind I've tried to make a new lampshade to decorate old sockets or maybe refresh it with a new design. In this tutorial I'll show you how to upcycle your corrugated fiberboard to make an easy lampshade!",
            image: "https://content.instructables.com/FUK/GEDF/IJLZZ87N/FUKGEDFIJLZZ87N.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Crafting Staples",
                  description:
                    "Hi, I'm a student in Industrial Product Design. We've got the design challenge to make a new concept with corrugated fiberboard and start from an existing box. I've used a box from a lamp. With that in mind, I've tried to make a new lampshade to decorate old sockets or maybe refresh them with a new design. In this tutorial, I'll show you how to upcycle your corrugated fiberboard to make an easy lampshade!",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FM6/NE3S/IJLZZ81G/FM6NE3SIJLZZ81G.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 2: The Things You Need",
                  description: "Corrugated fiberboard box: the size depends on how big you want your lampshade to be. Cutter, Ruler, Pencil, Wood glue, Clothespins",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/F0J/CSVX/IJLZZ97U/F0JCSVXIJLZZ97U.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 3 Cutting the Shape(s)",
                  description:
                    "If you want to make a small lampshade you can print out the picture and resize it to your wishes. Draw it on the fiberboard and cut. But I wanted to make a big one so I had to cut them all separately. After you've cut out your shape(s), you have to bend the sides.",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FST/NGQN/IJLZZ842/FSTNGQNIJLZZ842.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 4 Glueing the Parts",
                  description:
                    "After you've bent all the sides comes the tricky part. You have to glue on the small stroke and add some wood glue. To keep it in place I've used some clothespins. This helps a lot to keep them together! Let it dry for half an hour.",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FUK/GEDF/IJLZZ87N/FUKGEDFIJLZZ87N.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 5 Finishing Off",
                  description: "Now admire your work because you're almost finished! Erase some pencil marks and all you need to do know is pinch a hole in the center of the top side with a size of 1cm.",
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/F6S/35HG/IJLZZ8HO/F6S35HGIJLZZ8HO.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 6 Hanging Up Your Lampshade",
                  description:
                    "In the last step, you have to turn off the lights. Unplug your socket and put the wire through the hole in the top. Re-attach your socket and turn on the lights. Make sure you connect the right colors! If you've followed the steps correctly, it should look like the lampshade I've made! I hope you've enjoyed it and don't forget to comment or give it a like!",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[0],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[2],
                },
                {
                  id_tag: tagid[5],
                },
              ],
            },
          },
          {
            name: "Best Paper Airplane Ever (Flies Like a Beauty!)",
            description: "This is a very good paper airplane for beginners who are getting into making paper airplanes. It's simple and fast to make, and with the right conditions and modifications, can fly really well!",
            image: "https://content.instructables.com/FLU/34O8/LWKOZEEY/FLU34O8LWKOZEEY.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",

            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Crafting Staples",
                  description: "This is a very good paper airplane for beginners who are getting into making paper airplanes. It's simple and fast to make, and with the right conditions and modifications, can fly really well!",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/F2P/MM2Y/LWKOZB9F/F2PMM2YLWKOZB9F.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 2: Vertical Fold",
                  description: "Fold the paper vertically from the left side to the right side. It should look like this.",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FP2/SW5Q/LWKOZBD6/FP2SW5QLWKOZBD6.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 3: Fold Top Corners",
                  description: "Unfold the paper. Take the top 2 corners and fold them until the center crease line. It should look like this.",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FF8/HGCC/LWKOZBC0/FF8HGCCLWKOZBC0.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 4: Fold the Top Corners Downwards",
                  description: "Grab the very top of where the two previously folded corners meet. Pull it down to the very bottom. The result should look somewhat like an envelope.",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FWY/UOF7/LWKOZBCU/FWYUOF7LWKOZBCU.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 5: Repeat Step 2",
                  description: "Repeat Step 2 and fold the top corners towards the center crease. Your fold's result should look like this.",
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/FTF/BCXK/LWKOZBC9/FTFBCXKLWKOZBC9.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 6: Repeat Step 4",
                  description: "Repeat Step 4 and fold the top corners towards the center crease. Your fold's result should look like this. (I know this is repetitive but bear with me here).",
                },
                {
                  step_number: 7,
                  image: "https://content.instructables.com/FMQ/NL63/LWKOZB9O/FMQNL63LWKOZB9O.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 7: Undo and Fold Triangle",
                  description: "Unfold the last 2 steps. You should a small triangle sticking out from the bottom. Fold it up so it looks like this.",
                },
                {
                  step_number: 8,
                  image: "https://content.instructables.com/F81/NMEC/LWKOZBCJ/F81NMECLWKOZBCJ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 8: Redo and Final Folds",
                  description: "Now, fold the plane back into what it looked like in Step 5. Then, fold it in half, and remember to fold downwards. It should look like this.",
                },
                {
                  step_number: 9,
                  image: "https://content.instructables.com/FWC/OA0D/LWKOZBDJ/FWCOA0DLWKOZBDJ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 9: Bask in Glory",
                  description: "Fold it back out and you should have something that looks like this. Fly this around and impress your friends with your skills. If you want some modifications for this, let me know!",
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
                  id_tag: tagid[3],
                },
              ],
            },
          },
          {
            name: "Ultimate Paper Wallet",
            description: 'This DIY folded paper wallet will hold over ten credit cards and several bills, yet is only 1/4" thick and will easily fit in a back pocket.',
            image: "https://content.instructables.com/FMF/E8BS/F11S8RPJ/FMFE8BSF11S8RPJ.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Crafting Staples",
                  description: 'This DIY folded paper wallet will hold over ten credit cards and several bills, yet is only 1/4" thick and will easily fit in a back pocket.',
                },
                {
                  step_number: 2,
                  image: "",
                  name: "Step 2: Assemble Your Materials",
                  description: 'Materials needed:\n- 9" x 12" piece of heavy paper (the front 1/2 of a manilla envelope works well)\n- 10 credit cards (or however many you will need to carry)\n- 1 pencil or pen',
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FKO/5Y9M/F11S8RQ0/FKO5Y9MF11S8RQ0.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
                  name: "Step 3: Fold Sheet in Half",
                  description: "This will give you a guideline for the center of the sheet.",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FCL/UKV4/F11S8RQ3/FCLUKV4F11S8RQ3.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
                  name: "Step 4: Unfold",
                  description: "Unfold - the crease should be pointing up as in the photo.",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FXR/KCOQ/F11S8RQ7/FXRKCOQF11S8RQ7.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
                  name: 'Step 5: Fold to About 3/4" to 1" From the Edge',
                  description: 'Fold to about 3/4" - 1" from the edge.',
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/FN3/7UUW/F11S8RQG/FN37UUWF11S8RQG.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
                  name: "Step 6: Fold Back So New Fold Meets the Center Line",
                  description: "Fold back so the new fold meets the center line.",
                },
                {
                  step_number: 7,
                  image: "https://content.instructables.com/FC5/O1WW/F11S8RQS/FC5O1WWF11S8RQS.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
                  name: "Step 7: Repeat Last 2 Folds for Other End",
                  description: "Turn paper around 180 degrees and repeat the last 2 folds for the other end.",
                },
                {
                  step_number: 8,
                  image: "https://content.instructables.com/FS5/7DEM/F11S8RR1/FS57DEMF11S8RR1.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
                  name: "Step 8: Not As Tricky As It Looks...",
                  description: "Unfold just the center of the fanfold to get the compound fold shown in the photo.",
                },
                {
                  step_number: 9,
                  image: "https://content.instructables.com/F7D/NNON/F11S8RR8/F7DNNONF11S8RR8.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
                  name: "Step 9: Turn the Paper Over and Fold the Bottom Edge",
                  description: 'Turn the paper over and fold the bottom edge up about 1 1/2".',
                },
                {
                  step_number: 10,
                  image: "https://content.instructables.com/F1Z/Q9ZQ/F11S8RRF/F1ZQ9ZQF11S8RRF.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
                  name: "Step 10: Insert Cards",
                  description: "Insert your credit cards under each side of the center flap.",
                },
                {
                  step_number: 11,
                  image: "https://content.instructables.com/FGF/6GX4/F11S8RRS/FGF6GX4F11S8RRS.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
                  name: "Step 11: Fold & Mark the Top Flap",
                  description: "Fold the top down tightly over the cards.",
                },
                {
                  step_number: 12,
                  image: "https://content.instructables.com/FNF/MN0N/F11S8RRY/FNFMN0NF11S8RRY.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
                  name: "Step 12: Fold at Mark",
                  description: "Unfold the top flap and make a new fold at the mark. (Mark is just visible in the photo).",
                },
                {
                  step_number: 13,
                  image: "https://content.instructables.com/FR5/QOEG/F11S8RS5/FR5QOEGF11S8RS5.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
                  name: "Step 13: Turn the Whole Thing Over",
                  description: "Turn the whole thing over- keep the cards in place.",
                },
                {
                  step_number: 14,
                  image: "https://content.instructables.com/FKN/NHDO/F11S8RSH/FKNNHDOF11S8RSH.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
                  name: "Step 14: Fold the Ends",
                  description: "Fold the ends in tightly against the cards.",
                },
                {
                  step_number: 15,
                  image: "https://content.instructables.com/F03/EAER/F11S8RSN/F03EAERF11S8RSN.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
                  name: "Step 15: Tuck in the Ends",
                  description: "Tuck one end into the other as in the photo.",
                },
                {
                  step_number: 16,
                  image: "https://content.instructables.com/FC0/QE7F/F11S8RSY/FC0QE7FF11S8RSY.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
                  name: "Step 16: Turn the Whole Thing Over and Fold the Top Flap Down",
                  description: "Turn the whole thing over and fold the top flap down.",
                },
                {
                  step_number: 17,
                  image: "https://content.instructables.com/FHW/BKSQ/F11S8RTA/FHWBKSQF11S8RTA.jpg?auto=webp&fit=bounds&frame=1&width=1024auto=webp&frame=1&height=300",
                  name: "Step 17: That's It!",
                  description: "Keep your cards inside, and tuck bills into the outer flap on the back of the wallet.",
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
                  id_tag: tagid[1],
                },
                {
                  id_tag: tagid[4],
                },
              ],
            },
          },
          {
            name: "How to Make a Cardboard Laptop Stand",
            description:
              "In this instructable I will show you how to make a sturdy laptop stand out of cardboard. Why pay over 30 pounds/$60 for a flimsy plastic laptop stand, when you can make a stronger and more environmentally friendly stand for free?! When I thought of this idea I was skeptical and didn't think the cardboard would be able to support the heavy laptop, but after a bit of brainstorming and some strength tests I thought it was possible and decided to give it a go. When I had finished making it I tentatively lowered my laptop onto the stand, half expecting it to crumble and my laptop slide off the desk. Fortunately the process was uneventful and my laptop was perfectly happy sitting on top of its swanky new stand. Even though the initial test was a success I didn't want to publish an ible that would fall apart in a few days and drop people's laptops, so I decided to go the distance and do an endurance test. Now it's just under two weeks since the first test and every day I have put the laptop on the stand in the morning and left it there all day and then taken it off in the evening. Results: Perfect, The stand is like new, nothing bent, frayed or crumpled, it's been really good having the screen elevated, much more ergonomic than usual.",
            image: "https://content.instructables.com/FTI/54JC/FYAJBX65/FTI54JCFYAJBX65.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Crafting Staples",
                  description:
                    "In this instructable, I will show you how to make a sturdy laptop stand out of cardboard. Why pay over 30 pounds/$60 for a flimsy plastic laptop stand when you can make a stronger and more environmentally friendly stand for free? When I thought of this idea, I was skeptical and didn't think the cardboard would be able to support the heavy laptop. But after a bit of brainstorming and some strength tests, I thought it was possible and decided to give it a go. When I had finished making it, I tentatively lowered my laptop onto the stand, half expecting it to crumble and my laptop slide off the desk. Fortunately, the process was uneventful, and my laptop was perfectly happy sitting on top of its swanky new stand. Even though the initial test was a success, I didn't want to publish an Instructable that would fall apart in a few days and drop people's laptops. So, I decided to go the distance and do an endurance test. Now it's just under two weeks since the first test, and every day I have put the laptop on the stand in the morning and left it there all day and then taken it off in the evening. Results: Perfect. The stand is like new, nothing bent, frayed, or crumpled. It's been really good having the screen elevated, much more ergonomic than usual.",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FJV/4J8K/FXR6UIEZ/FJV4J8KFXR6UIEZ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 2: Get Cardboard",
                  description:
                    "Pretty easy, everyone has some laying around. If you don't have any:\n- Ask friends\n- Ask in shops\n- Look behind shops\n- Ask at supermarkets\n- Ask parents\n- Go to recycling center\n- Ask anywhere that sells things, they will have some.",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/F7C/RLZR/FXV3AD28/F7CRLZRFXV3AD28.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 3: Cut Shapes",
                  description: "Now you have got the cardboard you can get started cutting out the shapes. You will need a knife.",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/F7O/UBRM/FXR6UIF6/F7OUBRMFXR6UIF6.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 4: Check It All Fits",
                  description: "Using some pins, put all the pieces together and check you have the right sizes. Dressmakers pins are perfect.",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/F94/X9Q9/FXR6VNB3/F94X9Q9FXR6VNB3.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 5: Glue !",
                  description:
                    "Now you have all the shapes cut and they all fit together we can assemble the stand. I used a hot glue gun for my stand but PVA or superglue would work just as well. Before gluing, I would recommend tracing out where you want the stands to be, this makes it easier and you are less likely to get it wrong. Glue the support bar to the base first. Then glue the stand sections to the base and support, then add the back and front. The laptop will be resting on the front panel so use plenty of glue to make sure it's strong. In fact, use lots of glue all over. Remember, spare the glue, spoil the stand! Let the glue dry for a bit before you test the stand.",
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/FTI/54JC/FYAJBX65/FTI54JCFYAJBX65.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 6: Finished !",
                  description:
                    "Now get your laptop and enjoy ergonomic bliss! I am really pleased with this laptop stand, it's very strong and suits my needs perfectly. Thanks for reading. Don't forget to subscribe! Check out all my other Instructables.",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[0],
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
              ],
            },
          },
          {
            name: 'Cardboard Pencil Holder "Stabb-it"',
            description:
              "Here's the Stabb-it, a cardboard pencil holder two school colleagues, Kim B. Deland and Simon Hamel, and myself made! Easy to build with laser cutting (or with an x-acto knife) and fun to use, you literally \"stab\" the pencil holder with your drawing/writing stuff! Submitted by DIN 2012, Université de Montréal, industrial design program, for the Instructables Sponsorship Program. You will need: 1 X cardboard sheet of approximately 385mm (15,16 inches) of height and 590mm (23,12 inches) of length. (I found mine in the recycle bin and adjusted it to fit inside the laser cutting machine) 1 X 4 inches long carriage bolt with a diameter of 3/8 inch 1 X 3/8 inch nut 1 X 3/8 inch washer The illustrator file provided with the instructable for the laser cutting machine (there's also a pdf version",
            image: "https://content.instructables.com/F7U/5IF7/H1LWPJV5/F7U5IF7H1LWPJV5.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",

            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Crafting Staples",
                  description:
                    "Here's the Stabb-it, a cardboard pencil holder made by school colleagues Kim B. Deland, Simon Hamel, and myself! Easy to build with laser cutting (or with an x-acto knife) and fun to use, you literally \"stab\" the pencil holder with your drawing/writing stuff! Submitted by DIN 2012, Université de Montréal, industrial design program, for the Instructables Sponsorship Program. You will need: 1 X cardboard sheet of approximately 385mm (15,16 inches) of height and 590mm (23,12 inches) of length. (I found mine in the recycle bin and adjusted it to fit inside the laser cutting machine) 1 X 4 inches long carriage bolt with a diameter of 3/8 inch 1 X 3/8 inch nut 1 X 3/8 inch washer The illustrator file provided with the instructable for the laser cutting machine (there's also a pdf version)",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FGI/V1MM/H1LWPJW4/FGIV1MMH1LWPJW4.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 2: Laser Cutting",
                  description:
                    "Send the illustrator file to the laser cutting machine with an accordingly fitting size cardboard sheet depending on the size of your machine if the suggested cardboard size doesn't fit. You should end up with two spare cardboard squares out of the 24 on the .ai file since you'll be needing 22 of them later on. (the two extra squares are not included in the picture)",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FE3/ZMFF/H1JUGVVK/FE3ZMFFH1JUGVVK.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 3: Assembly",
                  description: "Simple stuff now! Stack the 22 cardboard squares on the bolt. Put the washer. Put the nut. Pretty simple isn't it? :)",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/F31/U8FE/H1JUIISF/F31U8FEH1JUIISF.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 4: Stab the Stabb-it and Twist It!",
                  description:
                    "Now that your Stabb-it is complete, feel free to stab it with your pen, pencils, and other small tools! As it gets older and wears out, it will start to look like an old book with old pages and get a new look! You can also twist your pencil holder and obtain interesting shapes and have your own little modern art sculpture on your desk! :)",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[0],
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
              ],
            },
          },
          {
            name: "DIY Paper Curtain",
            description:
              "Paper is environmentally friendly. Paper is versatile. Paper is fabulous. You've always wanted to make a beautiful, feasible and useful piece of furniture out of very little material (which you always have at home) for someone or even for yourself in a short period of time? Then follow this instruction step by step and learn how to design a simple yet beautiful, modern curtain with 35 threads out of everyday paper. A proven protection against insects with an additional decorative effect. Dimensions: Approximately length 90cm & height 200cm. The 2-hour-DIY-project 'Paper as material' examines everyday paper as a medium, which supports creativity, concentration and manual skills for anyone. After this instruction one is going to hold a natural, beautiful and ready-to-use piece of furniture in the hands, which brings space to glow, etc...",
            image: "https://content.instructables.com/FO5/IRWF/LW24973Y/FO5IRWFLW24973Y.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Crafting Staples",
                  description:
                    'Paper is environmentally friendly. Paper is versatile. Paper is fabulous. You\'ve always wanted to make a beautiful, feasible and useful piece of furniture out of very little material (which you always have at home) for someone or even for yourself in a short period of time? Then follow this instruction step by step and learn how to design a simple yet beautiful, modern curtain with 35 threads out of everyday paper ⏤ A proven protection against insects with an additional decorative effect. :) Dimensions: Approx. length 90cm & height 200cm. The 2-hour-DIY-project "Paper as material" examines everyday paper as a medium, which supports creativity, concentration and manual skills for anyone. After this instruction one is going to hold a natural, beautiful and ready-to-use piece of furniture in the hands, which brings space to glow, etc…',
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FAL/HZPA/LW24976U/FALHZPALW24976U.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 2: Supplies",
                  description: "To bring this project to life you will need different supplies. Here's is a list of them: Scissors, A ruler, Square-sized paper in various colors, A rather thick line, Pole out of metal or wood",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FUO/A6TL/LW2496T7/FUOA6TLLW2496T7.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 3: Origami Folding",
                  description:
                    "First of all, you have to fold the paper in the middle into a half and then fold it another time in the middle into the other half. The next step is to fold the paper diagonally twice. Then you should fold the squared paper into the middle. After that hide the lower corners in the top middle of the paper. Knock over the tips on both sides (left and right) to the bottom. Bring the bottom triangle up and hide the tip of it on the other side of the butterfly.",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FAK/WOZC/LW3JP4AQ/FAKWOZCLW3JP4AQ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 4: Making the Knots",
                  description: "Then tie the knots on the string. You can leave approx. 5 cm space between the knots. The origami butterflies can now be threaded onto the knots.",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FST/E6RT/LW3JP46A/FSTE6RTLW3JP46A.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 5: Finalizing the Project",
                  description: "Hang the finished strings on the metal rod.",
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
                  id_tag: tagid[5],
                },
                {
                  id_tag: tagid[6],
                },
              ],
            },
          },
          {
            name: "DIY Notebooks",
            description:
              "While commercially available notebooks have a nice polished feel to them, they are extremely expensive. If you use a large number of them, there is a considerable savings from making your own. If you professionally print the paper stock for them, they have the added benefit of customizable page layouts, for example, storyboards, grids, plain paper or normal lined paper.",
            image: "https://content.instructables.com/FDG/SNIX/FT7PR644/FDGSNIXFT7PR644.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=d5685481d8087e147ebf2839c4017e05",

            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Crafting Staples",
                  description:
                    "While commercially available notebooks have a nice polished feel to them, they are extremely expensive. If you use a large number of them, there is a considerable savings from making your own. If you professionally print the paper stock for them, they have the added benefit of customizable page layouts, for example, storyboards, grids, plain paper or normal lined paper.",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FVZ/49VG/FT7PR5ZT/FVZ49VGFT7PR5ZT.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 2: Materials and Tools",
                  description:
                    "Materials: Corrugated Cardboard (Don't get fancy, cut it out of a box), 18 sheets of 8.5 x 11\" paper, Thread, Wood glue (PVA) or any glue with some flexibility (White glue would work as well), Cheesecloth (although any kind of coarse woven fabric should work). Tools: Text editing program such as Pages (Mac) or Word. (Textedit or Wordpad would also work), Black and white printer (or a local copy shop), Needle (Blunt is good, for the sake of your fingers), Guillotine (optional, but makes the cutting so much more precise, not to mention a few hundred times faster) and either 2 or more Clamps and Small (6 inch by 8 inch or thereabouts) pieces of plywood or a vice.",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FCT/2H40/FT7PR66F/FCT2H40FT7PR66F.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 3: Designing the Paper",
                  description:
                    "Obviously, the first step is to design the paper. Some websites have lined paper patterns that can be downloaded and printed. Since we are making our own notebook, we might as well design the paper as well. If you are making a blank notebook, skip to step 4. Open a new file in your text editing program, and set the margins to 0 and 8.5 so that the printed document will fill the page. The top and bottom margins can be set near the top and bottom as well, but I like having extra space at the top of the notebook. Next, fill the paper with underscores if you are making lined paper, or the pattern you want to appear on your pages. The notebook will be around 4 x 5.5 inches, so remember that each page in your document must contain 4 notebook pages. The fold line of the finished sheets will be on the center of the pages, so leave room for trimming on both sides. The attached lined pdf will work, but it must be printed double-sided.",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FUA/QDEZ/FT7PURRP/FUAQDEZFT7PURRP.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 4: Printing the Paper",
                  description:
                    "If you are making multiple notebooks, it might be cheaper to get these pages printed at a local print shop. If you cannot print double-sided, this will be much easier, although feeding the sheets through the printer twice is an option. Before you print all 18 pages, it is a good idea to print a few tests. Set your printer to the lowest ink volume and quality, and print a page to test the spacing of the elements. If you are happy with the design, print 18 copies of it double-sided (Keep in mind that you will have to set the printer to 36, since each sheet of paper has 2 sides. If you have a photocopier, it may be cheaper to make one, and photocopy another 17.",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FYL/FZ7A/FTNHEDNZ/FYLFZ7AFTNHEDNZ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 5: Cutting",
                  description:
                    "First, cut the sheets in half horizontally (making pieces of paper 8.5 x 5.5 inches), then cut 3/4 of an inch off each side, making the pages 7 x 5.5 inches. You can do this by hand, but it is much easier to use a guillotine. Making sure to remove any members of the French aristocracy, set the guide on the guillotine to 5.5 inches, and cut all the paper to this dimension as shown in the picture. Next, set the guide to 3/4 of an inch, and cut that amount off each end of the sheets.",
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/FEL/ZJIG/FTO53YDJ/FELZJIGFTO53YDJ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 6: Folding",
                  description:
                    "This step is the most mind-numbing, but it is much easier with some simple set up. Clamp a piece of wood to your work table or desk. Push the end of a piece of paper against it, then fold the other half over to meet it. Make the crease as sharp as possible, with a fingernail, or a folding tool. Repeat this for all the pages of the book.",
                },
                {
                  step_number: 7,
                  image: "https://content.instructables.com/F7M/IW5V/FTNHEDPM/F7MIW5VFTNHEDPM.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 7: Preparing Signatures",
                  description:
                    "Divide the freshly folded paper into 6 piles of 6 pieces each. Put the pages together, nesting them inside each other as illustrated below. Fold the signatures closed, and align the pages by tapping the edges on a table. Stack the signatures and align the edges. Place them between the two pieces of plywood and clamp tightly (or use a vice), with the spine edge protruding 1/4 inch above the edge of the plywood.",
                },
                {
                  step_number: 8,
                  image: "https://content.instructables.com/FBH/SR0I/FTNHEDQQ/FBHSR0IFTNHEDQQ.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 8: Preparing for Stitching",
                  description:
                    "Before stitching the notebook, you will need to make pilot holes for the needle. Make 4 cuts in the stack of signatures, 0.5 and 1.75 inches from each edge as indicated by black lines in the picture. Only cut deep enough to puncture all 6 pages in each signature. This will probably be 1/16 of an inch or less. Don't cut any farther than you have to, it will make the stitching harder.",
                },
                {
                  step_number: 9,
                  image: "https://content.instructables.com/F5V/HH7M/FTNHEF18/F5VHH7MFTNHEF18.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 9: Stitching",
                  description:
                    "Unclamp the signatures and thread a needle. Tie a large knot at the long end of the thread that will not slip through the hole through the first signature. Pass the needle through (left to right) the first hole, then out the second, in the third, and out the fourth. Do the same from right to left. Before beginning the next row, loop it around the closest part of the previous row, and pull tight. Repeat this until the last stitch. On that stitch, loop the end of the thread around the end of the previous row multiple times, and tie it tightly to avoid the signatures coming apart.",
                },
                {
                  step_number: 10,
                  image: "https://content.instructables.com/FG6/6Q9Z/FTNHEFRF/FG66Q9ZFTNHEFRF.jpg?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300",
                  name: "Step 10: Reinforcing the Book",
                  description:
                    "Put the stitched pile of signatures in the vice/clamps again, with about 1/2 inch protruding. Spread glue (PVA wood glue or white glue both work well) on the pages, leaving some space on each end so that the glue does not get between the pages. Lay a small piece of cheesecloth over the glue and spread a bit more on top to ensure that it is well attached. Leave this to dry for a few hours.",
                },
                {
                  step_number: 11,
                  image: "",
                  name: "Step 11: Making the Cover",
                  description:
                    "Lay the sewn signatures out on the piece of cardboard you want to use for the cover. Figure out the measurement based on the amount of 'overhang' you want on the cover. Make sure the cardboard is oriented with the corrugations traveling up-down, not left-right. This will come in handy later. The cover piece should wrap around the spine and have a bit of overhang to protect the page edges. Use an X-acto knife to cut the cardboard to the right shape. You might want to round the corners.",
                },
                {
                  step_number: 12,
                  image: "",
                  name: "Step 12: Attaching the Cover",
                  description: "Find the middle of the cover and mark it. Center the stitched signatures on it and glue them down. Once the glue has dried, crease and fold the cover together.",
                },
                {
                  step_number: 13,
                  image: "https://content.instructables.com/FRA/4ZPH/FTNHEFTI/FRA4ZPHFTNHEFTI.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 13: Finishing",
                  description:
                    "The notebook also needs a strap to hold it closed. Run an elastic or a piece of guitar string through one of the corrugations and glue it in place. A low guitar string works well because it has a loop at one end that can be used as a fastener. If you are using elastic, knot the two ends together, and then slide the knot into the corrugation to hide it.",
                },
                {
                  step_number: 14,
                  image: "https://content.instructables.com/FTU/Y1GK/FTNHEFTM/FTUY1GKFTNHEFTM.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300",
                  name: "Step 14: Variations",
                  description:
                    "If you are varying the page number, the stitching pattern is easily adaptable for more signatures. Try to keep the signatures below 8 sheets each to keep the page ends aligned. Try cutting out designs with plain printer paper and gluing them on the cover. Go crazy!",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[0],
                },
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
              ],
            },
          },
          {
            name: "Recycle Plastic Grocery Bags, Wire Hangers and Newspaper Into Loons!",
            description:
              "ou can do your bit to re-use and recycle them. There are the normal ways - i.e. use them again, or give them up all together by using cloth bags. However, here's one off-beat way to use them up and create something completely different! You can use them when making papier-mache loons. Of course you will need a few other rubbish things too....",
            image: "https://content.instructables.com/FXK/D429/FGAGY8VQ/FXKD429FGAGY8VQ.jpg?auto=webp&frame=1&fit=bounds&md=07168eff904cde0c86fca0a8c5a8a20b",

            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Crafting Staples",
                  description:
                    "While commercially available notebooks have a nice polished feel to them, they are extremely expensive. If you use a large number of them, there is a considerable savings from making your own. If you professionally print the paper stock for them, they have the added benefit of customizable page layouts, for example, storyboards, grids, plain paper or normal lined paper.",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FAS/TW7Q/FEMY2RHU/FASTW7QFEMY2RHU.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=c9eb59b8d42018b6df1e6ad9d3a056af",
                  name: "Step 2: Things You Will Need!",
                  description:
                    "You will need Lots of old newspapers Lots of old plastic grocery bags (don't you hate these?) One(or maybe two)nasty wire hangers from the dry cleaners A few small pieces of cardboard from old boxes, i.e. cereal boxes, cat food boxes, or any old box you could normally recycle.Flour, salt and water from your kitchen.Masking tape (you probably have some lurking in the basement! You can even use the empty roll of tape for strengthening the neck!) A mixing bowl Patience!(and a few old paints and paint brushes to finish off!)",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FRJ/COH5/FENTSO6V/FRJCOH5FENTSO6V.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=bf69f557228312ea21f7d351987a10d8",
                  name: "Step 3: Take the Nasty Wire Coat Hanger!",
                  description: "Take one of those nasty wire coat hangers, that come from the dry cleaners, and twist it into a shape similar to the one in the photograph (cat audience optional!) Take care with the pointed ends!",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FEG/11I3/FENTSO7I/FEG11I3FENTSO7I.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=136e14cec49e5f72c730b6524380756c",
                  name: "Step 4: Stuff the Bags!",
                  description: "Choose one of the bags to be the stuffee! Stuff the other bags inside it. The finished stuffed bag must be a bit moldable, so don't stuff the life out of it!",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FCJ/A7F1/FENTSO7R/FCJA7F1FENTSO7R.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=136e14cec49e5f72c730b6524380756c",
                  name: "Step 5: Stuff the Coat Hanger!",
                  description:
                    "When you have enough bags stuffed in the first bag, put your nasty old coat hanger shape into the bag! Push it down and pull the bags around it, so the bottom is flat and you have a sort of rounded loon body. You can insert an oval of thin cardboard at the bottom if you wish. Keep bags in place round the neck with a piece of masking tape. See picture two for what it should now look like...(again cat is optional).",
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/FGD/KX5W/FENTSO8N/FGDKX5WFENTSO8N.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=b35f53fffd8675506209f250b6ba0d61",
                  name: "Step 6:  Creating the Neck",
                  description:
                    "Take another plastic grocery bag and bind round the exposed part of the coat hanger to form the basis of the neck. Keep the bag in place by using masking tape. You do not have to be neat at this point in the process!",
                },
                {
                  step_number: 7,
                  image: "https://content.instructables.com/FC0/B68T/FENTSOBA/FC0B68TFENTSOBA.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=a01d6724b2f73555884fd3bec8f075f3",
                  name: "Step 7: Binding the Body With Masking Tape!",
                  description:
                    "Now you have to cover the body completely with masking tape! Every piece of the plastic grocery bags must be covered. Do not leave any gaps. This is now a controlled form for creating a papier mache critter. You will be able to adjust the shape you want if the bag is not too full. Another reason for covering with masking tape is because the strips of newspaper and paste will stick more effectively to the tape. It is difficult to stick them to the plastic bag.Using a coloured grocery bag helps as it makes it easy to see if you have covered all of your form. By the way you can always adjust the shape of your loon when it comes to the papier-mache-ing bit!",
                },
                {
                  step_number: 8,
                  image: "https://content.instructables.com/FTH/1XC0/FENTSOBZ/FTH1XC0FENTSOBZ.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=17efb413c54f2b5eec0ff748624d3a6a",
                  name: "Step 8: Making the Flour and Water Paste",
                  description:
                    "When you have your basic loon form, prepare a mixture of paste out of flour, water and a spoonful of salt (salt helps prevent your creation from going mouldy after it has dried out).When you mix your paste, take a bowl and put another of those grocery bags in it. This is a good idea, as when you have finished with your paste, you can take the grocery bag and just throw it in the garbage, leaving very little mess in the bowl or anywhere else. Of course if you don't want to waste a grocery bag, just clean up the bowl afterwards and use that bag to help make another loon! Recipe for paste1/2 cup of flour and a large spoonful of salt in the bowl.Add 1 cup of warm water and mix it up with your hands.It should be like thick creamy soup. Add more flour to thicken it or more water to thin it. If you want more paste just double or triple up the ingredients in this ratio.",
                },
                {
                  step_number: 9,
                  image: "https://content.instructables.com/F4L/4MDC/FENTSOCK/F4L4MDCFENTSOCK.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=6f63405ca0ab801c0730bbd40fdfa496",
                  name: "Step 9: Using Up Your Old Newspapers",
                  description:
                    "Although most places will let you recycle your newspapers with trash pick-ups, you can use them up this way instead - it's still not a waste! So take your old newspapers and start tearing them into thinnish strips. Tearing is better than cutting, as the torn edges will meld and blend better as you apply them to your loon with the paste.You need to have smaller irregular shapes too! (By the way I read recently that in 2007 a record 56 % of used paper in the US was recycled. That's 360 pounds for every man, woman and child in the country! However, we need to work on reclaiming that 44% still out there which is being wasted!)Every ton of paper recycled saves more than 3.3 cubic yards of landfill space ",
                },
                {
                  step_number: 10,
                  image: "https://content.instructables.com/FBQ/2LCQ/FEMY2RWC/FBQ2LCQFEMY2RWC.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=8eb3f21771fd5874faa1b3667b867f2e",
                  name: "Apply the Newspapers to Your Loon Using the Paste!",
                  description:
                    "Take the strips, or pieces, one at a time and paste them onto the loon shape. You can either dangle the strips in the paste and then apply, or you can use a brush or piece of foam to apply the paste to the loon and then put the paper on that way. Overlap the pieces well. Smooth the paper strips or pieces with your hands with paste on your fingers too! Make sure you cover the entire form, with NO masking tape showing at all! This will be your first coating of papier-mache. You will probably have to apply three or four coats of paper before you are through and after each application you have to let the form dry. This is where the patience comes in, as at this time of year you can't dry outside unless you are somewhere warm (which I am not!) If you strategically dry with a hair drier, you are wasting electricity!",
                },
                {
                  step_number: 11,
                  image: "",
                  name: "Step 11: The First Layer of Newspaper Has Been Applied!",
                  description:
                    "Here you can see that I have applied the first layer of newspaper all over the loon shape (including the underside, which you can't see) It is very wet. You will need to let this dry before adding another coating of newspaper. I hate this waiting part!As you build up the extra layers you can fill in any lumps, bumps or dips in your form by adding extra layers of newpapers in a selective manner. I will need to build up my loon's head and neck as it is too small at the moment, and I can do this by using the scrap pieces of cardboard strategically affixed with masking tape and then covered over with the newspaper and paste mix. I can even pad the head and neck part out with extra plastic grocery bags and reapply the tape, etc. until I get a shape I am happy with.",
                },
                {
                  step_number: 12,
                  image: "https://content.instructables.com/FZP/ZZFT/FEMY2T5N/FZPZZFTFEMY2T5N.jpg?auto=webp&frame=1&width=1024&fit=bounds&md=5ca70d46593be84ff23745173d82fbeb",
                  name: "Step 12: Revamping the Neck and Head",
                  description:
                    "As I was not satisfied with the shape of the head and neck, I took another piece of grocery bag (a corner) and fashioned it into a better head and taped it on with the masking tape. I will now have to go over this new part with more of the newspaper papier-mache, but that's o.k. However, I now have a form that I really like. I also strengthened and reinforced the neck by cutting pieces off the empty roll from one of the rolls of masking tape and taping them on. This makes the neck really strong and thicker too.",
                },
                {
                  step_number: 13,
                  image: "https://content.instructables.com/F00/7FJM/FEMY2UBQ/F007FJMFEMY2UBQ.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=131e95181598e2d0775c73832d590551",
                  name: "Step 13: Final Coat of Papier-mache Has Been Applied",
                  description:
                    "I have now applied 4 coats of papier-mache to my loon. Now I have to wait for it to be completely dry before painting. If it were warm and sunny outside, I could dry it quickly using the sun's energy, which is free! As it is still wintery here in NY, I have been placing my wet loon overnight in the cupboard with the gas heating boiler, where the heat from there has been drying the papier-mache nicely. Before you paint, get a piece of sand paper and rub over your loon to smooth out any rough spots, and bumps. Make sure the loon is completely dry before you do this, or you will rip it apart!",
                },
                {
                  step_number: 14,
                  image: "https://content.instructables.com/F7I/SJHH/FEVP6UTM/F7ISJHHFEVP6UTM.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=c223499b62279fbf489229f9f2f2f32f",
                  name: "Step 14: Paint the Loon White!",
                  description:
                    "I have put a base coat of white acrylic paint on the top side of my loon. When it's dry I will turn upside down and paint the underside. I would recommend a couple of coats to get a smooth finish and to hide the newsprint that shows through. Even if you are going to paint it red, white and blue, I would recommend a coat of white paint first.....Then put on a coat of black paint over the head and back. You can add the white dots and black lines later.",
                },
                {
                  step_number: 15,
                  image: "https://content.instructables.com/FHR/JF1D/FF48NULZ/FHRJF1DFF48NULZ.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=38e1748f46f7f991fd35975d893fb5ed",
                  name: "Step 15: Painting the Loon",
                  description: "Add the details to your loon. I use cheap acrylic paint. If you make a mistake you can always wait for the paint to dry and re-do. Don't forget loons always have red eyes!",
                },
                {
                  step_number: 16,
                  image: "https://content.instructables.com/F2U/MW9E/FFFKNK0B/F2UMW9EFFFKNK0B.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=afc4fdbfa292e820dfa970e3a4c43655",
                  name: "Step 16: The Finished Loon (and Friends)",
                  description:
                    "Here is the finished loon in glorious black and white (and red eye!). However you can do your own thing. You can make a psychdelic bird - you are the artist! You can make anything you like out of those grocery bags if you use this instructable as a guide.To preserve your critters for the next generation, you can cover them with a clear varnish, which makes them nice and shiny as well. (Do not use one of those spray varnishes, as these are definitely NOT green!) Behold, you have created art out of trash!",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[1],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[5],
                },
                {
                  id_tag: tagid[6],
                },
              ],
            },
          },
          {
            name: "How to Make a Plastic Bullet Kite",
            description: "A super easy and cheap to make that also flies like a mighty eagle on a sunny day. Not to mention it's rather good at demonstrating some basics of aerodynamic theory: lift, gravity and drag.",
            image: "https://content.instructables.com/FQ1/OHES/G825RF4C/FQ1OHESG825RF4C.jpg?auto=webp&frame=1&fit=bounds&md=3194d8d29e01e5244f1ea99a7ea5fa05",

            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Crafting Staples",
                  description:
                    "While commercially available notebooks have a nice polished feel to them, they are extremely expensive. If you use a large number of them, there is a considerable savings from making your own. If you professionally print the paper stock for them, they have the added benefit of customizable page layouts, for example, storyboards, grids, plain paper or normal lined paper.",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FJW/392B/F5GE3D06/FJW392BF5GE3D06.jpg?auto=webp&frame=1&fit=bounds&md=687b77e435e18cc2054daf1fdfd80726",
                  name: "Step 2: Things You Will Need...",
                  description:
                    "In order to make your kite you will need:-A sheet of plastic that measures 33 1/2 by 24. I used a very large plastic bag but a sturdy black bin bag is about right too -A smaller sheet of plastic measuring 19 1/2 by 26. This is about the size of a standard carrier bag, but again bin bags or any plastic sheeting is good.-3 balsa wood dowels 24 long. I've used 6mm dowels, but larger ones will also work. Balsa dowels are available from craft shops and hardware shops, but if neither are available, garden canes are also a good alternative (the green sticks to keep plants on the straight an narrow)-Sticky tape, double sided sticky tape and reinforced sticky tape. I used a heavy duty cloth gaffer tape, but gaffer tape or all weather tape of any sort will work well.-Kite line and handle. Available from specialists and some toy shops and online. In the UK, Kite Shop has a massive range or stuff. A mid weight fishing line can also be used and is a bit cheaper and re-usable.-Hole punch, scissors, marker pen and tape measure",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FIV/LLY0/F5GE3D1Y/FIVLLY0F5GE3D1Y.jpg?auto=webp&frame=1&fit=bounds&md=1effeb7109dac5c4876fbd1f8db42d49",
                  name: "Step 3: Making Your Pattern...",
                  description:
                    "Fold your larger sheet or plastic in half and mark the pattern on to it. I use white board marker to mark my measurements and then permanent marker in a different colour to mark my cutting line. This comes from many years of cutting down the wrong line and having some very squint patterns.Once you are happy with your patter cut it out. Make sure the fold stays in the same place. You might want to tape the fold together to stop any movement or rather than use a fold draw out the entire kite pattern as a whole and cut it out that way.Do the same for the sleeve pattern using the smaller sheet of plastic. The line down the middle of this pattern is not a cutting line. It is just the marker for the middle of the sleeve, you'll see why in a bit...",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FRJ/L39D/F5HVHPO9/FRJL39DF5HVHPO9.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=b873e79beae4848c2ad0fc83a0aacc8b",
                  name: "Step 4: Putting the Dowels in Place",
                  description:
                    "Position the 3 dowels in place as shown in the photo and sticky tape them in place. Use as much sticky tape as you feel necessary. I put 3 wide strips of it on the top, bottom and middle of the dowels.Make sure that the sticky tape goes right round the dowel and sticks to the plastic. You don't want your dowels falling out mid flight. Loosing an eye by kite is not cool. I find a rolling motion when sticking the tape down eliminates this risk.",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FUV/DWG9/F5HVHPOX/FUVDWG9F5HVHPOX.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=5d53cb6148ce4ce946ffccb65f000291",
                  name: "Step 5: Attaching the Sleeve",
                  description:
                    "Put a strip of double sided sticky tape down the entire length of the centre dowel. This is were the centre line you marked on the sleeve comes in handy.You need to match the centre line to the line of double sided sticky tape. Since the double sided sticky tape is by nature, very sticky, you only get one shot at this, particularly since the plastic is liable to stretch and tear if you try and remove it if wrongly positioned.The easiest way to do the is to fold the sleeve in half along the centre line and place it on the double sided sticky tape, taking care to align top and bottom.",
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/F9A/0AXE/F5HVHPPG/F9A0AXEF5HVHPPG.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=a1fd0033dcb1d959f936d06f0f0b8d59",
                  name: "Step 6:  Securing the Sleeve",
                  description:
                    "The sleeve needs to be secured on both sides in order to create tunnels for the wind to pass through and give the kite lift.The sleeve is secured with sticky tape on either side, as close to the dowels as possible.To prevent accidentally sticking in the wrong place, Fold the kite underneath itself, out of the way and attach the length of sticky tape to the sleeve. Once the tape is in place, hold it out of the way and unfold the kite back in to place. Carefully line up the edge of the sleeve with the outside of the dowel and secure into place. Make sure the sticky tape runs from top to bottom, any spaces will allow air to escape from the tunnels and hinder your kites flight.",
                },
                {
                  step_number: 7,
                  image: "https://content.instructables.com/FIM/PK1P/F5HVHPQU/FIMPK1PF5HVHPQU.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=2774ad0fa566240a646cf78cb4916124",
                  name: "Step 7: Reinforce Your Kite",
                  description:
                    "If your turn your kite over, you'll realise it is now looking very kitey indeed.To make sure you don't loose your kite on it's maiden flight, you need to reinforce all the points of stress. This includes where bridle will be tied and where the spars are.A bridle is the string or line that is permanently attached to the kite. It is this which you attach to your line in order to fly it. A kite has a bridle so that it is easy to attach and detach from a line rather than tying fiddly knots all the time.The spars are what your doweling becomes as soon as it is attached in place. They give the kite it's structure, although not all kites have spars.But, reinforcing. The picture shows you all the points that need to be reinforced with the reinforced sticky tape. This won't always look particularly pretty, but you won't see it once it's in the sky. If there is any overhang of tape, just trim it.",
                },
                {
                  step_number: 8,
                  image: "https://content.instructables.com/F4D/DK98/F5HVHPRZ/F4DDK98F5HVHPRZ.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=4425f73e636fe99df0ab282d8562b24b",
                  name: "Step 8: Punching Holes",
                  description:
                    "Punch the holes for your bridle to go through.Using the hole punch, line up the corner of the kite, which you reinforced in the previous step and punch a hole. Make sure the hole isn't too close to the edges.",
                },
                {
                  step_number: 9,
                  image: "https://content.instructables.com/FBQ/NSNS/F5HVHPT8/FBQNSNSF5HVHPT8.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=eae82e9fbc77e4e60476fba348d359c0",
                  name: "Step 9: What Your Kite Should Look Like by Now",
                  description:
                    "You are now ready to attached the bridle line to the kite. This is the string that stays permanatly attached to the kite that allows a kite line and handle to be attached to when ready for use.There are various methods for doing this. A length of kite line should be attached between points A and B. Tie a loop in this string, this is where you will attach your standard kite line to in order to fly your kite.",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[1],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[3],
                },
              ],
            },
          },
          {
            name: "Plastic Wrap Sculptures!",
            description: "Sculptures made of plastic wrap and packing tape, how odd...As I'm sure some of you, maybe many of you, have not seen a plastic wrap sculpture before, I will show you some pictures first.",
            image: "https://content.instructables.com/FYE/PSQD/FIQAOIYG/FYEPSQDFIQAOIYG.jpg?auto=webp&frame=1&fit=bounds&md=c39f921fa61b77d1d62cd174ae9f1e63",

            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Crafting Staples",
                  description:
                    "While commercially available notebooks have a nice polished feel to them, they are extremely expensive. If you use a large number of them, there is a considerable savings from making your own. If you professionally print the paper stock for them, they have the added benefit of customizable page layouts, for example, storyboards, grids, plain paper or normal lined paper.",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FTX/ZV66/FIQAOIZP/FTXZV66FIQAOIZP.jpg?auto=webp&frame=1&width=1024&fit=bounds&md=f7090a6dd08fc297bb418b94e90a9890",
                  name: "Step 2: Materials",
                  description:
                    "This project uses only a few cheap materials (depending on where you get them)...Plastic wrap (What brand is up to you, some sticks better than others and sometimes you may not want that... so it's all up to you)Packing tape (go for the clear packing tape for a nice clean look)Scissors (it's not pictured but you need 'em)An item to wrap (if it is your first/second try make sure to have something you don't mind getting cut a little. After you have some practice it is easier not to cut things)",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FXR/17CX/FIQAOJ0A/FXR17CXFIQAOJ0A.jpg?auto=webp&frame=1&height=1024&fit=bounds&md=f7090a6dd08fc297bb418b94e90a9890",
                  name: "Step 3: Wrapping...",
                  description:
                    "The first real step is to wrap your model in the plastic wrap. Get EVERY nook and cranny. Believe me, if you don't you WILL regret it. It is nearly impossible to correct that mistake later on....Do not worry about detail in this step, for now just get the plastic wrap around the model not too tight.And remember, don't be afraid to wrap it twice!",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FQW/B16J/FIQAOJ1E/FQWB16JFIQAOJ1E.jpg?auto=webp&frame=1&width=1024&fit=bounds&md=f1b94d0dcd1d195a11c5dfec4db7b4f2",
                  name: "Step 4: Packing Tape...",
                  description:
                    "After you have double checked that is completely covered with the plastic wrap, bring out the scissors and the tape.You will be taping everywhere on the model. Everywhere. This is another thing you don't want to muss up. If you don't get a spot the first time around you can come back with more tape. But after this step there is nearly no turning back.Use your fingers to press down on the tape in certain areas where you want detail. The tape will typically stay depending on the brand.If some tape is sticking out, feel free to just cut it off and tape over the area.",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FZ4/Y9XK/FIQAOJ3H/FZ4Y9XKFIQAOJ3H.jpg?auto=webp&frame=1&width=1024&fit=bounds&md=14a9eda9f010a4126e090616fb0f4e4b",
                  name: "Step 5: Removing the Model...",
                  description:
                    "Now that you have (hopefully) successfully finished all the wrapping, we need to remove the model. This is achieved by cutting a few simple lines in the wrap.Cut a small hole in the plastic and cut through to create an opening. Depending on how complex your sculpture is, you may need more cuts to allow for easier removal. Just keep in mind, it may be easier to remove but it is harder to put back together with more cuts.",
                },
                {
                  step_number: 6,
                  image: "https://content.instructables.com/FGL/0Y4H/FIQAOJ8L/FGL0Y4HFIQAOJ8L.jpg?auto=webp&frame=1&width=1024&fit=bounds&md=2ebde9a7b0edbf6cde178eb00c7271b3",
                  name: "Step 6: Taping It Back...",
                  description:
                    "In the previous step you cut up your sculpture and now you presumably have a mess of plastic that may or may not look how you want it to... This is how you put it back together.Using just a small strip of plastic at a time, connect two corresponding sides of the plastic and place the tape on top. For better results, place your hand inside and press upward while the other hand presses downward on the tape.Continue this process until it is all taped up.",
                },
                {
                  step_number: 7,
                  image: "https://content.instructables.com/FX9/DID4/FIQAOJA1/FX9DID4FIQAOJA1.jpg?auto=webp&frame=1&width=1024&fit=bounds&md=2ebde9a7b0edbf6cde178eb00c7271b3",
                  name: "Step 7: Finished!",
                  description: "Now you're finished! Put it somewhere fun!",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[1],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[5],
                },
              ],
            },
          },
          {
            name: "Knit Plastic Bag Handbag",
            description: "This project explains how to spin yarn from ordinary plastic grocery bags. This yarn can then be knit into a handbag.",
            image: "https://content.instructables.com/F9G/QATB/F68BAEZG/F9GQATBF68BAEZG.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=90a5326d2d26b3f8c7d8798068dcde88",

            detail_handicraft: {
              create: [
                {
                  step_number: 1,
                  image: "",
                  name: "Crafting Staples",
                  description:
                    "While commercially available notebooks have a nice polished feel to them, they are extremely expensive. If you use a large number of them, there is a considerable savings from making your own. If you professionally print the paper stock for them, they have the added benefit of customizable page layouts, for example, storyboards, grids, plain paper or normal lined paper.",
                },
                {
                  step_number: 2,
                  image: "https://content.instructables.com/FFB/BEN0/F68BAEZH/FFBBEN0F68BAEZH.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=7bf83d53655dbe0c8a9c904adf56bcb1",
                  name: "Step 2: Cut Plastic Bags Into Strips",
                  description: "Follow a spiral pattern around the bag to get one long strip from the entire bag. Don't use your best sewing scissors for this. Cutting plastic bags dulls scissors quickly.",
                },
                {
                  step_number: 3,
                  image: "https://content.instructables.com/FB7/HZ5T/F68BAEZI/FB7HZ5TF68BAEZI.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=269c50f874b5aae60c4efbb2bffce036",
                  name: "Step 3: Attach End of Plastic Strip to Spindle Tip and Spin",
                  description:
                    "Spindles are the simplest way to spin fiber, or plastic bags. The pictured spindle is a round piece of wood with a dowel glued through it. The end of the dowel has two narrow saw cuts at the end to attach the end of the string to .Once attached, grab the spindle by the point of attachment and spin between your fingers. The weight on the bottom keeps the spindle spinning. Hold the plastic strip in your other hand and pay out the strip as it twists into yarn.",
                },
                {
                  step_number: 4,
                  image: "https://content.instructables.com/FXF/YHAW/F68BAEZE/FXFYHAWF68BAEZE.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=9cc0b572dcb25c1580fb732410e62857",
                  name: "Step 4:  Continue Spinning",
                  description: "As the spun yarn gets longer, wrap the yarn around the stick portion of the spindle and re-attach at the tip. Keep goiing.",
                },
                {
                  step_number: 5,
                  image: "https://content.instructables.com/FED/397C/F68BAEZA/FED397CF68BAEZA.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=d35ffc8e32df2516f157868a1e28e935",
                  name: "Step 5: RSpin Together Two Strips of Plastic.",
                  description:
                    "When you get to the end of one strip of plastic, you don't need to tie one strip to the next. Just overlap the two ends, fold them together and continue spinning. The twisting together will be enough to join the two strips.",
                },
                {
                  step_number: 6,
                  image: "",
                  name: "Step 6: Knit Your Plastic Yarn",
                  description:
                    "Sadly, I don't have action pictures of this step. The bag shown has a very simple pattern. The body of the bag is a long strip of nothing but knit stitch. The handles are another long strip of the same stitch. The two pieces were sewn together using more plastic yarn.This bag was a first attempt. Some suggestions for improvement.1. The fabric is surprisingly heavy duty. Keep to purse size, or make something you don't plan on lugging around. This large tote bag is a little bulky.2. Have fun with color.",
                },
              ],
            },
            waste_handicraft: {
              create: [
                {
                  id_waste: wasteid[1],
                },
              ],
            },
            tag_handicraft: {
              create: [
                {
                  id_tag: tagid[0],
                },
                {
                  id_tag: tagid[4],
                },
              ],
            },
          },
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
