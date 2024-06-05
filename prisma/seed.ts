import { PrismaClient } from '@prisma/client'
import { create } from 'domain'
// import uuid
import { v4 as uuidv4 } from 'uuid'


const prisma = new PrismaClient()
const userid = 'aec9d6eb-dbbf-425a-89ad-16cbb438c039';
async function main() {
    const user = await prisma.users.upsert({
        where: { id: userid },
        update: {},
        create: {
            name: 'John Doe',
            email: 'johndoe@me.com',
            address: 'User Address',
            password: 'wkwkland',
            image: 'https://storage.googleapis.com/bangkit-bucket-gambar/user/default.png',
            role: 'user',
            handicraft: {
                create: [
                    {
                        name: 'Can and Bottle Flower Dish',
                        description: 'Soda Cans and Bottles are every where. \nPeople litter and throw them away without recycling or re-using. \nThis instructable will teach you how to make a shallow or deep dish for holding pocket change, candy, other small objects, or even cigarette ash and butts out of aluminum cans and plastic bottles.',
                        image: 'https://content.instructables.com/FCL/9J6G/FFRD8X0I/FCL9J6GFFRD8X0I.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300',
                    },
                    {
                        name: 'Chalk Board Paint Can',
                        description: 'This is super easy, the hardest part is waiting on the paint to dry',
                        image: 'https://content.instructables.com/F1M/Z5CS/GCPZM3IF/F1MZ5CSGCPZM3IF.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300',
                    },
                    {
                        name: 'Coke Can Rose',
                        description: 'This instructable will show you how to make a laptop stand from only one very easy material to come by',
                        image: 'https://content.instructables.com/F1N/Y9Q3/GGPFBAH6/F1NY9Q3GGPFBAH6.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=300',
                    }
                ],
            },
        }
    })
}