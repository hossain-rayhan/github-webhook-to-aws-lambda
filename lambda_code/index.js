const https = require('https');

exports.handler = (event, context, callback) => {
  // console.log('Received Data:', JSON.stringify(event, null, 2));
  // console.log('Body:', event.body);

  var obj = JSON.parse(event.body)
  //console.log('Final:', obj.comment.html_url)

  var github_url = "";

  if (obj.issue && obj.comment && obj.comment.html_url) {
    github_url = "Issue Comment: " + obj.action + "\n" + obj.comment.html_url;
  } else if (obj.issue && obj.issue.html_url) {
    github_url = obj.issue.html_url;
  } else if (obj.pull_request && obj.comment && obj.comment.html_url) {
    github_url = "Pull Request Comment: " + obj.action + "\n" + obj.comment.html_url;
  } else if (obj.pull_request && obj.pull_request.html_url) {
    github_url = obj.pull_request.html_url;
  }


  const req = https.request({
    method: 'POST',
    hostname: 'hooks.chime.aws',

    // Don't forget to update the path with you ChimeRoom webhook url.
    path: '/incomingwebhooks/YOUR_CHIME_ROOM_WEBHOOK_URL',
    headers: {
      'Content-Type': 'application/json'
    }
  }, res => {
    callback(null, 'success');
  });

  req.on('error', e => {
    callback(`Error: ${e.message}`);
  });

  req.write(JSON.stringify({
    Content: github_url
  }));

  req.end();
};
