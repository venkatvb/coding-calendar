		// data-style="toast" data-content="This is a toast! Lorem lipsum dolor sit amet..." data-toggle="snackbar" data-timeout="0"
    var localData;
		function fn()
		{
        var hhour = window.localStorage.timehour;
        var hminute = window.localStorage.timeminute;
        var hresult = window.localStorage.codingcalendardata; 
        $("#contestcontent").removeClass('hide');
        console.log( hresult );
        if( hresult != null )
        {
          $(".loading").hide();
          var offtest = JSON.parse( hresult );
          var offcount = offtest.count;
          var correctstring = "' style='float: right; color: green;'><i class='clock mdi-action-alarm-on' data-content='Your preferences saved!' data-toggle='snackbar' data-timeout='5'></i></span></h4>";
          var falsestring = "' style='float: right; color: red;'><i class='clock mdi-action-alarm-off' data-content='Your preferences saved!' data-toggle='snackbar' data-timeout='5'></i></span></h4>"
          for(var i=0;i<offcount;i++) 
          {
            var result = window.localStorage.getItem(offtest.data[i].ID);
            console.log(result);
            var htmlcontent = "<div class='jumbotron'><h4>" +offtest.data[i].name+
                      " <span class='setalarm icon-preview' id='" + offtest.data[i].ID + ( ( result == "true") ? correctstring : falsestring ) +
                      "Start Time : "+offtest.data[i].starttime+"<br> End Time : "+ offtest.data[i].endtime+
                      "<br>"+" URL : "+offtest.data[i].URL+
                       "</div>";
            $("#contestcontent").append(htmlcontent);
          }
        }





	     ref='http://json2jsonp.com/?url=http://codingcalendar.azurewebsites.net/getJsn?hour='+hhour+'&minute='+hminute+'&callback=success';
			//ref = 'http://json2jsonp.com/?url=http://venkatvb.web44.net/api/data';
			var x=$.ajax({
		    	url: ref,
		    	dataType: 'jsonp',
			})
	    	.success (function(response) {
	    		$(".loading").hide();
      			localData = JSON.stringify(response);
      			var test = JSON.parse(localData);
      			var count = test.count;
            var correctstring = "' style='float: right; color: green;'><i class='clock mdi-action-alarm-on' data-content='Your preferences saved!' data-toggle='snackbar' data-timeout='5'></i></span></h4>";
            var falsestring = "' style='float: right; color: red;'><i class='clock mdi-action-alarm-off' data-content='Your preferences saved!' data-toggle='snackbar' data-timeout='5'></i></span></h4>"
      			for(var i=0;i<count;i++) {
              var result = window.localStorage.getItem(test.data[i].ID);
              console.log(result);
      				var htmlcontent = "<div class='jumbotron'><h4>" +test.data[i].name+
      									" <span class='setalarm icon-preview' id='" + test.data[i].ID + ( ( result == "true") ? correctstring : falsestring ) +
      									"Start Time : "+test.data[i].starttime+"<br> End Time : "+ test.data[i].endtime+
      									"<br>"+" URL : "+test.data[i].URL+
      								   "</div>";
      				$("#contestcontent").append(htmlcontent);
      			}
        		window.localStorage.setItem('codingcalendardata', localData);
                $(".setalarm").click(function() {
                if( $(this).children('.clock').hasClass('mdi-action-alarm-off') )
                {
                 $(this).children('.clock').removeClass('mdi-action-alarm-off').addClass('mdi-action-alarm-on'); 
                 $(this).css('color', 'green');
                 // code for setting the localStorage
                  alert( $(this).attr('id'));
                  window.localStorage.setItem($(this).attr('id'), 'true'); 
                }
                else
                {
                  $(this).children('.clock').removeClass('mdi-action-alarm-on').addClass('mdi-action-alarm-off'); 
                 $(this).css('color', 'red');
                 // removing from the localStorage
                 window.localStorage.setItem($(this).attr('id'), null); 
                }
            });

        	})
            .error (function(response) {
  		     	alert(response);
    		});
		}

		fn();
