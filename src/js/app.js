$(function() {

function sendRequests(requests){
	for (var i = 0; ; < requests.length; i++) {
		var request = requests[i];
		console.log('request: ', request);
	}
}

var requests = [];

for (var i = 0; i < 10; i++) {
  var deps = [];
  while (i && Math.random() > 0.5) {
	deps.push(requests[Math.floor(Math.random() * i)]);
  }
	requests.push({url: i + '.json', dependencies: deps});
}
sendRequests(requests);
});
