const AWS = require('aws-sdk');
var ses = new AWS.SES({
    region: 'us-east-1'
});

const handleSNS = (event, context, callback) => {
    // console.log(event.Records[0].Sns);
    // var event_data = [JSON.parse(event).message];
    
    console.log("Data from Simple Notification Service"+JSON.stringify(event));
    

    const mainFunction = async() => {
        sendEmail()
    }
    mainFunction();

    const sendEmail = () => {
        var sender = "admin@prod.csye6225saurabh.me"
        
        var to_address = JSON.parse(event.Records[0].Sns.Message).email;
        var accesstoken = JSON.parse(event.Records[0].Sns.Message).token;


        return new Promise((resolve, reject)=> {
            var eParams = {
                Destination: {
                    ToAddresses: [to_address]
                },
                Message: {
                    Body: {
                        Html: {
                            //Data: links
                            Data: '<html><head>' +
                                '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
                                '<title>' + "Email Verification for the User" + '</title>' +
                                '</head><body>' +
                                `Hello User,`+
                                '<br><br>' +
                                `Your Email ID is ${to_address}. `+
                                '<br><br>' +
                                'Verify your account with the provided link. Note that the link is valid for 5 mins.' +
                                '<br><br>' +
                                "<a href=\"http://" + "prod.csye6225saurabh.me" + "/v1/verifyUserEmail?email=" + to_address + "&token=" + accesstoken + "\">" +
                                "http://" + "prod.csye6225saurabh.me" + "/v1/verifyUserEmail?email=" + to_address + "&token=" + accesstoken + "</a>"
                                +'</body></html>'
                        }
                    },
                    Subject: {
                        Data: "Verification Email"
                    }
                },
                Source: sender
            };
            ses.sendEmail(eParams, (err, data2) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    context.succeed(event);
                    resolve(data2);
                }
            });
        });
    }
}

module.export = handleSNS