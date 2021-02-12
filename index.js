const https = require('https');
const fs = require('fs');
const crypto = require('crypto');

https.get('https://coderbyte.com/api/challenges/json/age-counting', (resp) => {
  let result = '';

  resp.on('data', (data) => {
    result += data;
  });

  resp.on('end', () => {
    result = JSON.parse(result);
    const keys = [];
    const arrayData = result.data.split(',');
    arrayData.forEach((data, index) => {
      if (data.trim().search('age=32') !== -1) {
        keys.push(arrayData[index - 1].split('=')[1]);
      }
    });

    keys.push('');
    fs.writeFile('output.txt',
      keys.join('\n'),
      (err) => {
        if (err) {
          console.log(err);
        } else {
          const sha1 = crypto.createHash('sha1')
            .update('output.txt')
            .digest('hex');
          console.log(`File ${sha1} created`);
        }
      });
  });
});
