const db = require('../shared/db')

// module.exports = async function (context, req) {
//     context.log('JavaScript HTTP trigger function processed a request.');

//     try {
//         await db.startDB(); // starter vores database
//     } catch (error){
//         console.log("fejl ved forbindelse til DB", error.message)
//     } 
//     switch (req.method) {
//         case 'GET':
//             await get(context, req);
//             break;
//             case 'POST':
//                 await post(context, req);
//                 break
//             default:
//                 context.res = {
//                     body: "please get or post"
//                 };
//                 break
//     }

//     /*
//     const name = (req.query.name || (req.body && req.body.name));
//     const birthday = (req.query.birthday || (req.body && req.body.birthday));
//     const email = (req.query.email || (req.body && req.body.email));
//     const gender = (req.query.gender || (req.body && req.body.gender));
//     const country = (req.query.country || (req.body && req.body.country));
//     //const hashed = (req.query.hashed_password || (req.body && req.body.hashed_password));

//     const responseMessage = name
//         ?  name + " " + birthday + " " + email + " " + gender + " " + " "+ country + " " + "orale"
//         : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//         const sql_stmt = `insert into users (name, birthday, email, gender, country)
//         values ('Christian','1999-06-28','123j@gmail.com','male', 'den')`

//     */

//     //context.res = {
//         // status: 200, /* Defaults to 200 */
        
//       //  body: responseMessage
//    // }; 

//    //laver vores asynkrone funktioner til vores requests, bruger try/catch til at opfange mulige fejl i koden
//    async function get(context, req){
//        try{
//             let name = req.query.name;
//             let user = await db.select(name)
//             context.res = {
//                 body: user
//             };
//        } catch(error){
//             context.res = {
//                 status: 400, 
//                 body: `No user - ${error.message}`
//             }
//        }
//    }

//    async function post(context, req){
//     try{
//             let payload = req.body;
//             await db.insert(payload)
//             context.res = {
//                 body: {status: 'Success'}
//             }
//     } catch(error){
//             context.res = {
//                 status: 400, 
//                 body: error.message
//             }

//     }
// }

// }





const users = [
    {id: 1, firstName: 'ole', lastName: 'jensen', gender: 'male', photos: 'https://www.kristeligt-dagblad.dk/sites/default/files/styles/main-wide-944/public/2017/01/bent_christensen.teolog.2016.jpg' },
    {id: 2, firstName: 'per', lastName: 'oste', gender: 'male', photos: 'https://images.sn.dk/82/1307882_605_0_0_0_0_0_4.jpg' },
    {id: 3, firstName: 'olga', lastName: 'person', gender: 'female', photos: 'https://www.rothamsted.ac.uk/sites/default/files/person-profile-images/olga-sayanova.jpg' },
    {id: 4, firstName: 'olivia', lastName: 'hansen', gender: 'female', photos: 'https://media-exp1.licdn.com/dms/image/C4E03AQHnWTImuqnKnQ/profile-displayphoto-shrink_200_200/0/1517451024660?e=1623888000&v=beta&t=_pNrS32YYB6opavd5OzuHDD3ksjeMTduV8l6YqV0U28' },

]

