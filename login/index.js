// module.exports = async function (context, req) {
//     context.log('JavaScript HTTP trigger function processed a request.');

//     const name = (req.query.name || (req.body && req.body.name));
//     const responseMessage = name
//         ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//         : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//     context.res = {
//         // status: 200, /* Defaults to 200 */
//         body: responseMessage
//     };
// }

const db = require("../shared/db");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  try {
    await db.startDB(); // starter vores database
  } catch (error) {
    console.log("fejl ved forbindelse til DB", error.message);
  }
  switch (req.method) {
    case "GET":
      await get(context, req);
      break;
    case "POST":
      await post(context, req);
      break;
    default:
      context.res = {
        body: "please get or post",
      };
      break;
  }
};

async function get(context, req) {
  try {
    let email = req.query.email;
    let hashed_password = req.query.hashed_password;
    let user = await db.login(email, hashed_password);
    context.res = {
      body: user,
    };
  } catch (error) {
    context.res = {
      status: 400,
      body: `No way Jose - ${error.message}`,
    };
  }
}
async function post(context, req) {
  try {
    let email = req.query.email;
    let hashed_password = req.query.hashed_password;
    await db.login(email, hashed_password);
    context.res
      .status(302)
      .set("location", "http://localhost:7071/dashboard")
      .send();
  } catch (error) {
    context.res = {
      status: 400,
      body: error.message,
    };
  }
}
