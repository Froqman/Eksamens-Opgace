const db = require('/../shared/db')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const birthday = (req.query.birthday || (req.body && req.body.birthday));
    const email = (req.query.email || (req.body && req.body.email));
    const gender = (req.query.gender || (req.body && req.body.gender));
    const country = (req.query.country || (req.body && req.body.country));
    //const hashed = (req.query.hashed_password || (req.body && req.body.hashed_password));

    const responseMessage = name
        ?  name + " " + birthday + " " + email + " " + gender + " " + " "+ country + " " + "orale"
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

        const sql_stmt = `insert into users (name, birthday, email, gender, country)
        values ('Christian','1999-06-28','123j@gmail.com','male', 'den')`

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}



