// npm run seed -> to run //

//This file is to seed database

console.log("Seeding the database...")


const db = require("../models/")

// Dropping table - seeding one row of info

 db.sequelize.sync({ force: true }).then(() => {
 	const watchList = {
 		title: "Schitt's Creek",
 		watched: "false"
 	};
​
 	db.watchList.create(watchList).then(data => {
 		console.log(data);
 	});

});


// const seedArr = [{
//     text: "Test 123",
//     description: "Testing..."
// }, {
//     text: "Testing multiple seeds",
//     description: "dgsdfgdgfhdfgh"
// }, {
//     text: "Lorem",
//     description: "Ipsum"
// }
// ];

// db.sequelize.sync({ force: true }).then(() => db.Example.bulkCreate(seedArr).then(data => {
    
//     console.log(`Successfully seeded ${data.length} records to the database!`)
// }))