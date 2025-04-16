const dbUtils=require('./dbUtils')
var nodemailer = require('nodemailer');

const sendMail=()=>{
  let query=`select * from mailQue where status='que' order by id asc limit 1`
  dbUtils.dbConnection('query', query).then(function (result) {
    if(result.length!=0){
      let dbData=result[0]
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'noreply.navigatortourism@gmail.com',
          pass: 'sxfhtthsrnyiwxbp'
        }

        // host: 'navigatortourism.com',
        // port: 465,
        // secure: true, // true for 465, false for other ports
        // auth: {
        //   user: 'noreply@navigatortourism.com', // your domain email address
        //   pass: '4Yfh8B{U-o@+' // your password
        // }
      });
      
      var mailOptions = {
        from: 'Navigator Tourism <noreply.navigatortourism@gmail.com>',
        to: dbData.toMail,
        subject: dbData.subject,
        html: dbData.body
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        }
        else {
          console.log('Email sent: ' + info.response);
          let query=`update mailQue set status='sent', sentTime=NOW() where id=${dbData.id}`
          dbUtils.dbConnection('query', query).then(function (result) {
            console.log(result)
          }).catch(function (error) {
            console.log(error)
        })
        }
      });
    }
    else{
      console.log('No email to sent')
    }
    }).catch(function (error) {
      console.log(error)
  })
}

const runSchedule=()=>{
  sendMail()
}

/*--------------------exportion of custom module--------------------*/
module.exports.runSchedule = runSchedule
/*--------------------exportion of custom module end--------------------*/
