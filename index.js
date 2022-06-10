const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
app.use(cors())
app.use(express.json())
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@myportfolio.iqvju1j.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const projectsCollection = client.db("MyPortfolio").collection("Projects")

        // All Projects
        app.get('/allProjects', async (req, res) => {
            const query = {};
            const cursor = projectsCollection.find(query);
            const projects = await cursor.toArray();
            res.send(projects);
        })

        // Projects Details
        app.get('/allProjects/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const project = await projectsCollection.findOne(query);
            res.send(project);
        });
    }
    finally {

    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Mission MyPortfolio Operation!!!')
})

app.listen(port, () => {
    console.log(`BackEnd is Running ${port}`)
})