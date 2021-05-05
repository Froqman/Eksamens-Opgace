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
    case "PUT":
      await put(context, req);
      break;
    default:
      context.res = {
        body: "Method not accepted",
      };
      break;
  }

  /*
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

    */

  //context.res = {
  // status: 200, /* Defaults to 200 */

  //  body: responseMessage
  // };

  async function put(context, req) {
    try {
      let id = req.query.id;
      let user = req.body;
      let updatedUser = await db.update(id, user);
      context.res = {
        updatedUser,
      };
    } catch (error) {
      context.res = {
        status: 400,
        body: `No way - ${error.message}`,
      };
    }
  }

  //laver vores asynkrone funktioner til vores requests, bruger try/catch til at opfange mulige fejl i koden
  async function get(context, req) {
    try {
      let name = req.query.name;
      let _user = await db.select(name);
      console.log(_user);
      const users = [
        {
          id: 1,
          firstName: "Stine",
          lastName: "Blondine",
          gender: "F",
          photos: [
            "https://www.byrdie.com/thmb/fLsxKLnkeZWgt54cWlUCw8ya1KE=/1716x1716/smart/filters:no_upscale()/Screen-Shot-2020-08-31-at-2.57.48-PM-ab7152b68d9042838d10c0ff58f8d3bf.jpg",
          ],
        },
        {
          id: 2,
          firstName: "Mette",
          lastName: "Brunette",
          gender: "F",
          photos: [
            "https://www.byrdie.com/thmb/org7vjwhUIORAG2Ks3Xw50H1cr4=/525x525/smart/filters:no_upscale()/cdn.cliqueinc.com__cache__posts__180809__brunette-hair-inspiration-180809-1502668753787-main.700x0c-80b5a2c2422a49b495311bfbe5e23dd5-43fa3777b26b4a1680b277a1ab666574-58550a98291844d4ab163442f9827888.jpg",
          ],
        },
        {
          id: 3,
          firstName: "Chad",
          lastName: "Brad",
          gender: "M",
          photos: [
            "https://pbs.twimg.com/profile_images/1299844654360391686/y9E9WTOd.jpg",
          ],
        },
        {
          id: 4,
          firstName: "Brad",
          lastName: "Pitt",
          gender: "M",
          photos: [
            "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2020%2F07%2F21%2Fgettyimages-1172158100-2000.jpg",
          ],
        },
      ];
      context.res = {
        body: users,
      };
    } catch (error) {
      context.res = {
        status: 400,
        body: `No way - ${error.message}`,
      };
    }
  }

  async function post(context, req) {
    try {
      let payload = req.body;
      await db.insert(payload);
      context.res = {
        body: { status: "Success" },
      };
    } catch (error) {
      context.res = {
        status: 400,
        body: error.message,
      };
    }
  }
};
