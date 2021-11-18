exports.resolvers = {
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