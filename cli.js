/* 
   Sample usage of SolixE1600 class
   will write schedule.json and homepage.json to the current directory
   or pushes schedule to device if json file is specified as first parameter
*/
const fs = require("fs");

const SolixE1600 = require("./SolixE1600.js");

const app = async() => {
        let configuration = {
            
        }
        if(typeof process.env.ANKER_USERNAME == 'undefined') {
            console.log("SET ANKER_USERNAME=your@mail.com");
            process.exit(1);
        } else {
            configuration.username = process.env.ANKER_USERNAME;
        }   
        if(typeof process.env.ANKER_PASSWORD == 'undefined') {
            console.log("SET ANKER_PASSWORD=yourAppPassword");
            process.exit(2);
        } else {
            configuration.password = process.env.ANKER_PASSWORD;
        }   
        if(typeof process.env.ANKER_COUNTRY == 'undefined') {
            console.log("SET ANKER_COUNTRY=2-LETT-CODE");
            process.exit(3);
        } else {
            configuration.country = process.env.ANKER_COUNTRY;
        }   
        const mysolix = new SolixE1600(configuration);
        let homepage = await mysolix.getSitehomepage();
        console.log(process.argv);
        if(typeof process.argv[2] !== 'undefined') {
            console.log("Writing new Schedule");
            const schedule = JSON.parse(fs.readFileSync(process.argv[2]));
            await mysolix.setSchedule(schedule);
        } else {
            fs.writeFileSync("homepage.json", JSON.stringify(homepage));
            const schedule = await mysolix.getSchedule();
            fs.writeFileSync("schedule.json", JSON.stringify(schedule));
        }
}

app();