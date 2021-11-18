const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const cors = require("cors");
const app = express();

const typeDefs = `
    type Query{
        users: [user]
    }
    type user{
        id: ID,
        fname:String,
        lname:String,
        email:String,
        phone:Int
    }
   type Mutation {
        addUser(fname: String,lname:String,email: String,phone:Int):user
      }
    type Mutation {
        updateUser(id:ID,fname: String,lname:String,email: String,phone:Int):user
    }
    type Mutation {
        deleteUser(id:ID ):user
    }
`;
const users1 =[]
let nextId =1;
const resolvers = {
    Query: {
        users: () => {return users1},
    },
    Mutation: {
        addUser: (root, args) => {
          const newUser = { id: nextId++, fname: args.fname, lname: args.lname,email: args.email,phone: args.phone};
          users1.push(newUser);
          return newUser;
        },
        updateUser: (root, args) => {
           
            let index = users1.findIndex((i) => i.id == args.id);

            if(index != -1 ){
                         
                users1[index].fname = args.fname;
                users1[index].lname = args.lname
                users1[index].email =args.email
                users1[index].phone = args.phone;
            
            }
            //const newUser = { id: nextId++, fname: args.fname, lname: args.lname,email: args.email,phone: args.phone};
            //users1.push(newUser);
            return args;
          },
          deleteUser: (root, args) => {
            // const newUser = { id: nextId++, fname: args.fname, lname: args.lname,email: args.email,phone: args.phone};
            // users1.push(newUser);
            users1.forEach((k, i) => {
               if (k.id === parseInt(args.id)) {
                    users1.splice(i,1);
                }
              });
             
            return args;
          },
      },
};
let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();
const httpserver = http.createServer(app);
//app.use("*",cors({ origin: 'http://localhost:3000' }))
app.use(cors());
app.get("/rest", function (req, res) {
    res.json({ data: "api working" });
});

app.listen(4000, function () {
    console.log(`server running on port 4000`);
    console.log(`gql path is ${apolloServer.graphqlPath}`);
});