// I believe this file cannot be used if user is not signed in and reacting. // 


// npm run seed -> to run //



//This file is to seed database

console.log("Seeding the database...")


const db = require("../models/")

// Dropping table -> Seeding Info

db.sequelize.sync({ force: true }).then(() => {

    // Seeding one row of data.
    // const newExample = {
    //     text: "Test 123",
    //     description: "Testing..."
    // };

    // db.Example.create(newExample).then(data => {
    //     console.log(data);
    // });



    // Seeding multiple rows of data.
    const seedArr = [{
        title: "District 9",
        watched: NULL,
        rating: 7,
        poster: 'http://image.tmdb.org/t/p/original/tuGlQkqLxnodDSk6mp5c2wvxUEd.jpg',
        date: '2009-08-05', 
        media_type: '1',
        
    }, {
        title: "Happily N'Ever After",
        watched: NULL,
        rating: 5,
        poster: 'http://image.tmdb.org/t/p/original/p4A9itfMf8cuCsGw4op3HqEqBOG.jpg',
        date: '2007-01-05', 
        media_type: '1'
    }  

    ];

    db.sequelize.sync({ force: true }).then(() => db.Example.bulkCreate(seedArr).then(data => {

        console.log(`Successfully seeded ${data.length} records to the database!`)

    }))
});