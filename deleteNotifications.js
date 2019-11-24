const aws = require("aws-sdk");
const dynamodb = new aws.DynamoDB({
  region: "us-east-2",
  apiVersion: "2012-08-10"
});

exports.handler = (event, context, callback) => {
  const type = event.type;

  const params = {
    Key: {
      DateTime: {
        S: type
      }
    },

    TableName: "notification"
  };

  dynamodb.deleteItem(params, function(err, data) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log(data);
      callback(null, data);
    }
  });
};
