$(function() {

function sendRequests(requests){
	for (var i = 0; i < requests.length; i++) {
		var request = requests[i];		
		//assumption #1: I am using a get request to receive these json files,so there for I must create the json files
		$.ajax({
			type: 'GET',
			url: 'src/json/' + request.url,
  			dataType: 'json',
  			success: function(response) {
  				var greeting = $('<div class="greeting">').html(response.greeting);

  				$('#greetingContainer').append(greeting);
  				$('.greeting').each(function() {
					moveGreeting($(this));
				});
  				console.log('response: ', response);
  			}
		});
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
sendRequests(requests);

function moveGreetinFromTo(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

function moveGreeting(greeting) {
	console.log('moved: ', greeting);
	var gcPos = $('#greetingContainer').offset();
	var gcHeight = $('#greetingContainer').height();
	var gcWidth = $('#greetingContainer').width();
	var boxPad = parseInt($('#greetingContainer').css('padding-top').replace('px', ''));
	// get moving box size
	var boxPadHeight = greeting.height();
	var boxPadWidth = greeting.width();
	// set max pos
	maxYCord = gcPos.top + gcHeight - boxPadHeight - boxPad;
	maxXCord = gcPos.left + gcWidth - boxPadWidth - boxPad;
	// set min pos
	minYCord = gcPos.top + boxPad;
	minXCord = gcPos.left + boxPad;
	// set new pos		
	newYCord = moveGreetinFromTo(minYCord, maxYCord);
	newXCord = moveGreetinFromTo(minXCord, maxXCord);
	greeting.animate({
		top: newYCord,
		left: newXCord
		}, 500, function() {
 	 moveGreeting(greeting);
	});
}

});
