const aws = require("aws-sdk");
const dynamodb = new aws.DynamoDB({
  region: "us-east-2",
  apiVersion: "2012-08-10"
});

exports.handler = (event, context, callback) => {
  const type = event.type;

  if (type === "all") {
    const params = {
      TableName: "notification"
    };

    dynamodb.scan(params, function(err, data) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        console.log(data);

        const items = data.Items.map(item => {
          return {
            subject: item.Subject.S,
            type: item.Type.S,
            description: item.Description.S,
            date: item.DateTime.S
          };
        });

        callback(null, items);
      }
    });
  } else {
    callback(null, "Hello from Lambda");
  }
};
