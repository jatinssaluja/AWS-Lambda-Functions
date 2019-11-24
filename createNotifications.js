const aws = require("aws-sdk");
const dynamodb = new aws.DynamoDB({
  region: "us-east-2",
  apiVersion: "2012-08-10"
});

exports.handler = (event, context, callback) => {
  const dateTime = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  const { subject, type, description } = event;

  const params = {
    Item: {
      DateTime: {
        S: dateTime
      },

      Subject: {
        S: subject
      },

      Type: {
        S: type
      },

      Description: {
        S: description
      }
    },

    TableName: "notification"
  };

  dynamodb.putItem(params, function(err, data) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log(data);
      callback(null, data);
    }
  });
};
