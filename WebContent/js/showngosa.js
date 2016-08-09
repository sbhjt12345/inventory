//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var labels1 = ['東京１','東京2','大阪','福岡'];
var nforgosa1 = [15,12,19,15,22,14];
var nforgosa2 = [10,22,13,14,15,11];
var nforgosa3 = [22,21,30,14,15,23];
var nforgosa4 = [15,14,21,12,11,13];
var sforgosa1 = [17,7,13,20,12,11,80];
var sforgosa2 = [11,8,9,12,10,11,61];
var sforgosa3 = [9,17,13,15,22,5,81];
var sforgosa4 = [7,11,12,15,8,10,63];
var shouruquan2014 = [];
var rilegou = [97,82,125,86];
shouruquan2014.push(nforgosa1);
shouruquan2014.push(nforgosa2);
shouruquan2014.push(nforgosa3);
shouruquan2014.push(nforgosa4);


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

document.getElementById("show").innerHTML = '<h3>2016年各倉庫各月入庫誤差</h3>';  
document.getElementById("show").innerHTML += '<br>\
	<label style="color:red;margin-left:20px;">東京１</label>\
	<label style="color:lightcoral;margin-left:20px;">東京２</label>\
	<label style="color:gold;margin-left:20px;">大阪</label>\
	<label style="color:darkgoldenrod;margin-left:20px;">福岡</label>';
document.getElementById("showmonthus").innerHTML = '';
document.getElementById("show2").innerHTML = '';
document.getElementById('showwhat').innerHTML = '';
document.getElementById("showmoneyus").innerHTML = '';
document.getElementById("showallus").innerHTML = '';
//$("#showallus").removeClass("ct-vertial");
//$("#showallus").addClass("ct-square");
//$("#showwhat").addClass("ct-square");

var chart = new Chartist.Line('.ct-chart', {
	  labels: ['1', '2', '3', '4', '5', '6'],
	  series: [
	    nforgosa1,
	    nforgosa2,
	    nforgosa3,
	    nforgosa4
	  ]
	}, {
	  low: 0
	});

	// Let's put a sequence number aside so we can use it in the event callbacks
	var seq = 0,
	  delays = 80,
	  durations = 500;

	// Once the chart is fully created we reset the sequence
	chart.on('created', function() {
	  seq = 0;
	});

	// On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
	chart.on('draw', function(data) {
	  seq++;

	  if(data.type === 'line') {
	    // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
	    data.element.animate({
	      opacity: {
	        // The delay when we like to start the animation
	        begin: seq * delays + 1000,
	        // Duration of the animation
	        dur: durations,
	        // The value where the animation should start
	        from: 0,
	        // The value where it should end
	        to: 1
	      }
	    });
	  } else if(data.type === 'label' && data.axis === 'x') {
	    data.element.animate({
	      y: {
	        begin: seq * delays,
	        dur: durations,
	        from: data.y + 100,
	        to: data.y,
	        // We can specify an easing function from Chartist.Svg.Easing
	        easing: 'easeOutQuart'
	      }
	    });
	  } else if(data.type === 'label' && data.axis === 'y') {
	    data.element.animate({
	      x: {
	        begin: seq * delays,
	        dur: durations,
	        from: data.x - 100,
	        to: data.x,
	        easing: 'easeOutQuart'
	      }
	    });
	  } else if(data.type === 'point') {
	    data.element.animate({
	      x1: {
	        begin: seq * delays,
	        dur: durations,
	        from: data.x - 10,
	        to: data.x,
	        easing: 'easeOutQuart'
	      },
	      x2: {
	        begin: seq * delays,
	        dur: durations,
	        from: data.x - 10,
	        to: data.x,
	        easing: 'easeOutQuart'
	      },
	      opacity: {
	        begin: seq * delays,
	        dur: durations,
	        from: 0,
	        to: 1,
	        easing: 'easeOutQuart'
	      }
	    });
	  } else if(data.type === 'grid') {
	    // Using data.axis we get x or y which we can use to construct our animation definition objects
	    var pos1Animation = {
	      begin: seq * delays,
	      dur: durations,
	      from: data[data.axis.units.pos + '1'] - 30,
	      to: data[data.axis.units.pos + '1'],
	      easing: 'easeOutQuart'
	    };

	    var pos2Animation = {
	      begin: seq * delays,
	      dur: durations,
	      from: data[data.axis.units.pos + '2'] - 100,
	      to: data[data.axis.units.pos + '2'],
	      easing: 'easeOutQuart'
	    };

	    var animations = {};
	    animations[data.axis.units.pos + '1'] = pos1Animation;
	    animations[data.axis.units.pos + '2'] = pos2Animation;
	    animations['opacity'] = {
	      begin: seq * delays,
	      dur: durations,
	      from: 0,
	      to: 1,
	      easing: 'easeOutQuart'
	    };

	    data.element.animate(animations);
	  }
	});

	// For the sake of the example we update the chart every time it's created with a delay of 10 seconds
	chart.on('created', function() {
	  if(window.__exampleAnimateTimeout) {
	    clearTimeout(window.__exampleAnimateTimeout);
	    window.__exampleAnimateTimeout = null;
	  }
	  window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 12000000);
	});
	
	var hahatable = $('<table class="table-condensed table-striped table-hover table-bordered"></table>');
	var hahabody = $('<tbody></tbody>');
	hahabody.appendTo(hahatable);
	var hahatr = $('<tr></tr>');
	hahatr.append('<th>倉庫</th>');
	hahatr.append('<th>1月</th>');
	hahatr.append('<th>2月</th>');
	hahatr.append('<th>3月</th>');
	hahatr.append('<th>4月</th>');
	hahatr.append('<th>5月</th>');
	hahatr.append('<th>6月</th>');
	hahatr.append('<th>総計</th>')
	hahatr.appendTo(hahabody);
	for (var i=0;i<=3;i++){
		var hahahatr = $('<tr></tr>');
		hahahatr.append('<td>'+ labels1[i] +'</td>');
		hahahatr.append('<td style="color:green">'+ shouruquan2014[i][0] +'</td>');
		hahahatr.append('<td style="color:green">'+ shouruquan2014[i][1] +'</td>');
		hahahatr.append('<td style="color:green">'+ shouruquan2014[i][2] +'</td>');
		hahahatr.append('<td style="color:green">'+ shouruquan2014[i][3] +'</td>');
		hahahatr.append('<td style="color:green">'+ shouruquan2014[i][4] +'</td>');
		hahahatr.append('<td style="color:green">'+ shouruquan2014[i][5] +'</td>');
		hahahatr.append('<td style="color:green">'+ rilegou[i] +'</td>');
		hahahatr.appendTo(hahabody);
	}
	document.getElementById("showmonthus").innerHTML = '<h4>2016年各倉庫各月誤差表<br></h4>';
	$("#showmonthus").append(hahatable);