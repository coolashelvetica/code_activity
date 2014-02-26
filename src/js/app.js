$(function() {
	var activeRequests = 0;
	var waitToSend = 100; 
	var MAX_REQUESTS = 3; //assumtion #2: The Web Service may change the max requests later
	$('.okay').click(function() {
		
		$('#welcome').fadeOut();
		function checkRequestQue (request, isDep) { //check the que and if there are less that 3 requests pending then send the request
			if (activeRequests >= MAX_REQUESTS) {
				setTimeout(function() {checkRequestQue(request, isDep)}, waitToSend); //wait before checking again
			} else {
				activeRequests++;
				$.ajax({
						type: 'GET',
						url: 'src/json/' + request.url,
			  			dataType: 'json',
			  			success: function(response) {
			  				if (!isDep) { //only show the greeting if it is not a dependency
			  					var translation = $('<div class="translation">').html(response.translation);
				  				var greeting = $('<div class="greeting">').html(response.greeting);
				  				$(greeting).append(translation);
				  				$('#greetingContainer').append(greeting);
				  				$('.greeting').each(function() {
									moveGreeting($(this));
								});
				  			}
							activeRequests--; //when response is received then remove request from que
			  			}
					});
			}
		}
		function sendRequests(requests){
			for (var i = 0; i < requests.length; i++) {
				var request = requests[i];		
				if (request.dependencies.length > 0) {
					var depsCount = request.dependencies.length;
					for (var j = 0; j < request.dependencies.length; j++) {
						var depRequest = request.dependencies[j];
						checkRequestQue(depRequest, true); 
						depsCount--;
						if (depsCount === 0) { //once all the dependencies have been received get the original request
							checkRequestQue(request, false);
						}
					}
				} else {
					checkRequestQue(request, false);
				}
				
			}
		}

		function moveGreetinFromTo(from, to){
			return Math.floor(Math.random() * (to - from + 1) + from);
		}
		function moveGreeting(greeting) {
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
				}, 2000, function() {
		 	 moveGreeting(greeting);
			});
		}
		var requests = [];

		for (var i = 0; i < 10; i++) {
		  var deps = [];
		  while (i && Math.random() > 0.5) {
			deps.push(requests[Math.floor(Math.random() * i)]);
		  }
			requests.push({url: i + '.json', dependencies: deps});
			//assumption #1: I am using a get request to receive these json files,so there for I must create the json files
		}
		sendRequests(requests);
		$('#greetingContainer').on('click', '.greeting', function(e){
		    $($(e.currentTarget)[0].firstElementChild).fadeToggle();
		});
	});

});
