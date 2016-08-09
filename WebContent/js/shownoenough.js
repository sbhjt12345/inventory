//<li><a href="#" onclick="usallgraph()">各倉庫総収支</a></li>
//				        <li><a href="#" onclick="usmonthgraph()">各倉庫収支（月別）</a></li>
//				        <li><a href="#" onclick="uspie()">各倉庫収支構成図</a></li>
var whichyear = 0;
var whichitem = '';
var labels1 = ['東京１','東京2','大阪','福岡'];
var y2014_re = [1256.78,1346.54,2134.4,1098.75];
var y2014_co = [989.76,978.5,1890.35,1090];
var y2015_re = [1111,1235.68,2345,1070.65];
var y2015_co = [1000.56,1000.58,2016,1050.45];
var y2016_re = [540.36,520.11,1210,620.5];
var y2016_co = [490,480,987.5,500.25];

/*********************************************************************/
var geyue2014shourutokyo1 = [150,90.78,100.45,100.55,200,82,120,61,74,86,92,100];
var geyue2014shourutokyo2 = [60,80,100,120,140,140,140,100.54,80,70,150,166];
var geyue2014shouruosaka = [140,160,180,180,200.4,120,180,169,178,144,200,283];
var geyue2014shourufukuoka = [80,80,60,40,120,90,78,84,112,67,87.78,200];

var geyue2014zhichutokyo1 =[81,82,83,84,85,86,87,88,75.76,80,80,78];
var geyue2014zhichutokyo2 = [77,78,79,80,81,82,83,84,85,83,83,83.5];
var geyue2014zhichuosaka = [120,140,130,140,112,135,127,110.35,130,122,312,312];
var geyue2014zhichufukuoka =[98,97,69,123,100,87,92,98,87,96,76,70];
var shouruquan2014 = [];
shouruquan2014.push(geyue2014shourutokyo1);
shouruquan2014.push(geyue2014shourutokyo2);
shouruquan2014.push(geyue2014shouruosaka);
shouruquan2014.push(geyue2014shourufukuoka);
var zhichuquan2014 = [];
zhichuquan2014.push(geyue2014zhichutokyo1);
zhichuquan2014.push(geyue2014zhichutokyo2);
zhichuquan2014.push(geyue2014zhichuosaka);
zhichuquan2014.push(geyue2014zhichufukuoka);

//var y2016_re = [540.36,520.11,1210,620.5];
//var y2016_co = [490,480,987.5,500.25];
var geyue2016shourutokyo1 = [100,89,98,111,78,64.36];
var geyue2016shourutokyo2 = [80,98,67,78,88,109.11];
var geyue2016shouruosaka = [200,188,212,210,178,222];
var geyue2016shourufukuoka = [120.5,68,132,78,129,93];

var geyue2016zhichutokyo1 = [70,80,90,100,70,80];
var geyue2016zhichutokyo2 = [80,80,80,80,80,80];
var geyue2016zhichuosaka = [87.5,197,163,222,138,180];
var geyue2016zhichufukuoka = [100,120,80,98.5,112,110];
var shouruquan2016 = [];
shouruquan2016.push(geyue2016shourutokyo1);
shouruquan2016.push(geyue2016shourutokyo2);
shouruquan2016.push(geyue2016shouruosaka);
shouruquan2016.push(geyue2016shourufukuoka);
var zhichuquan2016 = [];
zhichuquan2016.push(geyue2016zhichutokyo1);
zhichuquan2016.push(geyue2016zhichutokyo2);
zhichuquan2016.push(geyue2016zhichuosaka);
zhichuquan2016.push(geyue2016zhichufukuoka);

//----------------------------------------------------
var geyue2015shourutokyo1 = [100,88,125,98,79,54,121,55,68,98,125,100];
var geyue2015shourutokyo2 = [100.68,135,68,72,99,111,167,98,92,193,100,0];
var geyue2015shouruosaka = [211,221,187,198,186,205,213,179,195,198,200,152];
var geyue2015shourufukuoka = [86,78,98,77,68,104,87,69,99,101.65,102,101];

var geyue2015zhichutokyo1 = [80,85,82,98,158,51,88,99,68,89,52.56,50];
var geyue2015zhichutokyo2 = [85,158,80,82,52.58,68,89,51,50,88,99,98];
var geyue2015zhichuosaka = [145,168,198,177,160,234,167,118,156,189,154,150];
var geyue2015zhichufukuoka = [90.45,90,88,77,66,99,123,45,67,77,128,100];
var shouruquan2015 = [];
shouruquan2015.push(geyue2015shourutokyo1);
shouruquan2015.push(geyue2015shourutokyo2);
shouruquan2015.push(geyue2015shouruosaka);
shouruquan2015.push(geyue2015shourufukuoka);
var zhichuquan2015 = [];
zhichuquan2015.push(geyue2015zhichutokyo1);
zhichuquan2015.push(geyue2015zhichutokyo2);
zhichuquan2015.push(geyue2015zhichuosaka);
zhichuquan2015.push(geyue2015zhichufukuoka);


//-----------------------------------------------------------------------
var t1ks2014 = ["P-16 HOZAN リードペンチ","GA-H170M-D3H","PSD316G1600KH","Athlon5350","PSD316G1600KH","ST8000AS0002","H170-PRO"];
var t1ks14 = [10, 20, 50, 20, 5, 50, 15];
var t1ks14_1 = [15, 50, 25, 15, 5, 50, 20];

var t1ks2015 = ["P-16 HOZAN リードペンチ","GA-H170M-D3H","PSD316G1600KH","Athlon5350","PSD316G1600KH","ST8000AS0002","H170-PRO","H110M-HDV"];
var t1ks15 = [15,10,20,35,40,80,15,5];         //220
var t1ks15_1 = [5,25,35,45,10,40,30,30];

var t1ks2016 =  ["P-16 HOZAN リードペンチ","GA-H170M-D3H","PSD316G1600KH","Athlon5350","PSD316G1600KH","ST8000AS0002","H170-PRO","H110M-HDV","W3U1600HQ-4G","極厚純綿シリコンすべり止め軍手"];
var t1ks16 = [20,30,40,50,60,70,80,90,10,10];
var t1ks16_1 = [10,10,10,40,40,50,60,80,80,80];

/*********************************************************************/
function showallus(b){
    var xxx = $(b).attr("id");
    if (isNaN(parseInt(xxx))) whichitem = xxx;
    else whichyear = parseInt(xxx);
    if (whichyear===0 && whichitem!=''){
		//document.getElementById("show").innerHTML = '<h3>年度：'+ whichyear +'年</h3>';
    	document.getElementById("showmonthus").innerHTML = '';
		document.getElementById("show2").innerHTML = '';
		document.getElementById('showwhat').innerHTML = '';
		document.getElementById("showmoneyus").innerHTML = '';
		document.getElementById("showallus").innerHTML = '';
	}
    else if (whichyear!=0 && whichitem===''){
    	document.getElementById("show").innerHTML = '<h3>年度：'+ whichyear +'年</h3>';
    	document.getElementById("showmonthus").innerHTML = '';
		document.getElementById("show2").innerHTML = '';
		document.getElementById('showwhat').innerHTML = '';
		document.getElementById("showmoneyus").innerHTML = '';
		document.getElementById("showallus").innerHTML = '';
    }
    else {
    	if (whichitem === "world"){
			if (whichyear===2014){
				document.getElementById("show").innerHTML = '<h3>年度：'+ whichyear +'年</h3>';
				document.getElementById("showmonthus").innerHTML = '';
				document.getElementById("show2").innerHTML = '';
				document.getElementById('showwhat').innerHTML = '';
				document.getElementById("showmoneyus").innerHTML = '';
				document.getElementById("showallus").innerHTML = '';
				$("#showallus").addClass("ct-vertial");
				new Chartist.Bar('.ct-chart', {
					  labels: labels1,
					  series: [
					    y2014_re,
					    y2014_co
					  ]
					}, {
					  seriesBarDistance: 10,
					  axisX: {
					    offset: 10
					  },
					  axisY: {
					    offset: 80,
					    labelInterpolationFnc: function(value) {
					      return value + ' 万'
					    },
					    scaleMinSpace: 15
					  }
					});
				
				var table2014 = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
				var body2014 =$('<tbody></tbody>');body2014.appendTo(table2014);
				var tr2014 = $('<tr></tr>');
				tr2014.append('<th>倉庫</th>');
				tr2014.append('<th>売上</th>');
				tr2014.append('<th>支出</th>');
				tr2014.appendTo(body2014);
				var sx = 0, sy=0;
				for (var i=0;i<4;i++){
					var tr20144 = $('<tr></tr>');
					tr20144.append('<td>'+ labels1[i] +'</td>');
					tr20144.append('<td style="color:green">'+ y2014_re[i] +'</td>');
					sx+= y2014_re[i];
					tr20144.append('<td style="color:red">'+ y2014_co[i] +'</td>');
					sy += y2014_co[i];
					tr20144.appendTo(body2014);
				}
				var tr201444 = $('<tr></tr>');
				tr201444.append('<td>合計</td>');
				tr201444.append('<td style="color:green">'+ sx +'</td>');
				tr201444.append('<td style="color:red">'+ sy +'</td>');
				tr201444.appendTo(body2014);
				document.getElementById("showmonthus").innerHTML += '<br><hr><strong style="margin-left:20px;">2014年度収支表(単位：万円)</strong><br><br>';
				$('#showmonthus').append(table2014);
			}
			else if (whichyear === 2015){
				document.getElementById("show").innerHTML = '<h3>年度：'+ whichyear +'年</h3>';
				document.getElementById("showmonthus").innerHTML = '';
				document.getElementById("show2").innerHTML = '';
				document.getElementById('showwhat').innerHTML = '';
				document.getElementById("showmoneyus").innerHTML = '';
				document.getElementById("showallus").innerHTML = '';
				$("#showallus").addClass("ct-vertial");
				new Chartist.Bar('.ct-chart', {
					  labels: labels1,
					  series: [
					    y2015_re,
					    y2015_co
					  ]
					}, {
					  seriesBarDistance: 10,
					  axisX: {
					    offset: 10
					  },
					  axisY: {
					    offset: 80,
					    labelInterpolationFnc: function(value) {
					      return value + ' 万'
					    },
					    scaleMinSpace: 15
					  }
					});
				
				var table2014 = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
				var body2014 =$('<tbody></tbody>');body2014.appendTo(table2014);
				var tr2014 = $('<tr></tr>');
				tr2014.append('<th>倉庫</th>');
				tr2014.append('<th>売上</th>');
				tr2014.append('<th>支出</th>');
				tr2014.appendTo(body2014);
				var sx = 0, sy=0;
				for (var i=0;i<4;i++){
					var tr20144 = $('<tr></tr>');
					tr20144.append('<td>'+ labels1[i] +'</td>');
					tr20144.append('<td style="color:green">'+ y2015_re[i] +'</td>');
					sx+= y2015_re[i];
					tr20144.append('<td style="color:red">'+ y2015_co[i] +'</td>');
					sy += y2015_co[i];
					tr20144.appendTo(body2014);
				}
				var tr201444 = $('<tr></tr>');
				tr201444.append('<td>合計</td>');
				tr201444.append('<td style="color:green">'+ sx +'</td>');
				tr201444.append('<td style="color:red">'+ sy +'</td>');
				tr201444.appendTo(body2014);
				document.getElementById("showmonthus").innerHTML += '<br><hr><strong style="margin-left:20px;">2015年度収支表(単位：万円)</strong><br><br>';
				$('#showmonthus').append(table2014);	
			}
			else {
				document.getElementById("show").innerHTML = '<h3>年度：'+ whichyear +'年</h3>';
				document.getElementById("showmonthus").innerHTML = '';
				document.getElementById("show2").innerHTML = '';
				document.getElementById('showwhat').innerHTML = '';
				document.getElementById("showmoneyus").innerHTML = '';
				document.getElementById("showallus").innerHTML = '';
				$("#showallus").addClass("ct-vertial");
				new Chartist.Bar('.ct-chart', {
					  labels: labels1,
					  series: [
					    y2016_re,
					    y2016_co
					  ]
					}, {
					  seriesBarDistance: 10,
					  axisX: {
					    offset: 10
					  },
					  axisY: {
					    offset: 80,
					    labelInterpolationFnc: function(value) {
					      return value + ' 万'
					    },
					    scaleMinSpace: 15
					  }
					});
				
				var table2014 = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
				var body2014 =$('<tbody></tbody>');body2014.appendTo(table2014);
				var tr2014 = $('<tr></tr>');
				tr2014.append('<th>倉庫</th>');
				tr2014.append('<th>売上</th>');
				tr2014.append('<th>支出</th>');
				tr2014.appendTo(body2014);
				var sx = 0, sy=0;
				for (var i=0;i<4;i++){
					var tr20144 = $('<tr></tr>');
					tr20144.append('<td>'+ labels1[i] +'</td>');
					tr20144.append('<td style="color:green">'+ y2016_re[i] +'</td>');
					sx+= y2016_re[i];
					tr20144.append('<td style="color:red">'+ y2016_co[i] +'</td>');
					sy += y2016_co[i];
					tr20144.appendTo(body2014);
				}
				var tr201444 = $('<tr></tr>');
				tr201444.append('<td>合計</td>');
				tr201444.append('<td style="color:green">'+ sx +'</td>');
				tr201444.append('<td style="color:red">'+ sy +'</td>');
				tr201444.appendTo(body2014);
				document.getElementById("showmonthus").innerHTML += '<br><hr><strong style="margin-left:20px;">2016年度収支表(単位：万円)</strong><br><br>';
				$('#showmonthus').append(table2014);
			}
    	}
    	else if (whichitem==='japan'){
    		if (whichyear === 2014){
    			document.getElementById("show").innerHTML = '<h3>'+ whichyear + '年各倉庫収入</h3>';  
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
    			$("#showallus").removeClass("ct-vertial");
    			$("#showallus").addClass("ct-square");
    			$("#showwhat").addClass("ct-square");
    			var chart = new Chartist.Line('.ct-chart', {
    				  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    				  series: [
    				    [150,90.78,100.45,100.55,200,82,120,61,74,86,92,100],
    				    [60,80,100,120,140,140,140,100.54,80,70,150,166],
    				    [140,160,180,180,200.4,120,180,169,178,144,200,283],
    				    [80,80,60,40,120,90,78,84,112,67,87.78,200]
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
    				
    				var hahatable = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
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
    				hahatr.append('<th>7月</th>');
    				hahatr.append('<th>8月</th>');
    				hahatr.append('<th>9月</th>');
    				hahatr.append('<th>10月</th>');
    				hahatr.append('<th>11月</th>');
    				hahatr.append('<th>12月</th>');
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
    					hahahatr.append('<td style="color:green">'+ shouruquan2014[i][6] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2014[i][7] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2014[i][8] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2014[i][9] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2014[i][10] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2014[i][11] +'</td>');
    					hahahatr.appendTo(hahabody);
    				}
    				document.getElementById("showmonthus").innerHTML = '<h4>'+ whichyear + '年収入表(単位：万円)<br></h4>';
    				$("#showmonthus").append(hahatable);
    				
    				
    				
    				document.getElementById("show2").innerHTML = '<hr><h3>'+ whichyear +'年各倉庫支出</h3><br>';
    				
    				var chart = new Chartist.Line('.ct-chart1', {
      				  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      				  series: [
      				    [81,82,83,84,85,86,87,88,75.76,80,80,78],
      				    [77,78,79,80,81,82,83,84,85,83,83,83.5],
      				    [120,140,130,140,112,135,127,110.35,130,122,312,312],
      				    [98,97,69,123,100,87,92,98,87,96,76,70]
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
      				
      				var hahatable2 = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
    				var hahabody2 = $('<tbody></tbody>');
    				hahabody2.appendTo(hahatable2);
    				var hahatr2 = $('<tr></tr>');
    				hahatr2.append('<th>倉庫</th>');
    				hahatr2.append('<th>1月</th>');
    				hahatr2.append('<th>2月</th>');
    				hahatr2.append('<th>3月</th>');
    				hahatr2.append('<th>4月</th>');
    				hahatr2.append('<th>5月</th>');
    				hahatr2.append('<th>6月</th>');
    				hahatr2.append('<th>7月</th>');
    				hahatr2.append('<th>8月</th>');
    				hahatr2.append('<th>9月</th>');
    				hahatr2.append('<th>10月</th>');
    				hahatr2.append('<th>11月</th>');
    				hahatr2.append('<th>12月</th>');
    				hahatr2.appendTo(hahabody2);
    				for (var i=0;i<=3;i++){
    					var hahahatr = $('<tr></tr>');
    					hahahatr.append('<td>'+ labels1[i] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2014[i][0] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2014[i][1] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2014[i][2] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2014[i][3] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2014[i][4] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2014[i][5] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2014[i][6] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2014[i][7] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2014[i][8] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2014[i][9] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2014[i][10] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2014[i][11] +'</td>');
    					hahahatr.appendTo(hahabody2);
    				}
    				document.getElementById("showmoneyus").innerHTML = '<h4>'+ whichyear + '年支出表（単位：万円）<br></h4>';
    				$("#showmoneyus").append(hahatable2);
    				
    				//--------------------------------------------------
    				var hahatable3 = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
    				var hahabody3 = $('<tbody></tbody>');
    				hahabody3.appendTo(hahatable3);
    				var hahatr3 = $('<tr></tr>');
    				hahatr3.append('<th>倉庫</th>');
    				hahatr3.append('<th>1月</th>');
    				hahatr3.append('<th>2月</th>');
    				hahatr3.append('<th>3月</th>');
    				hahatr3.append('<th>4月</th>');
    				hahatr3.append('<th>5月</th>');
    				hahatr3.append('<th>6月</th>');
    				hahatr3.append('<th>7月</th>');
    				hahatr3.append('<th>8月</th>');
    				hahatr3.append('<th>9月</th>');
    				hahatr3.append('<th>10月</th>');
    				hahatr3.append('<th>11月</th>');
    				hahatr3.append('<th>12月</th>');
    				hahatr3.appendTo(hahabody3);
    				for (var i=0;i<=3;i++){
    					var hahahatr = $('<tr></tr>');
    					hahahatr.append('<td>'+ labels1[i] +'</td>');
    					var m1 = shouruquan2014[i][0]-zhichuquan2014[i][0];
    					hahahatr.append('<td style="color:darkgoldenrod">'+ m1.toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2014[i][1]-zhichuquan2014[i][1]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2014[i][2]-zhichuquan2014[i][2]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2014[i][3]-zhichuquan2014[i][3]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2014[i][4]-zhichuquan2014[i][4]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2014[i][5]-zhichuquan2014[i][5]).toFixed(2)+'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2014[i][6]-zhichuquan2014[i][6]).toFixed(2)+'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2014[i][7]-zhichuquan2014[i][7]).toFixed(2)+'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2014[i][8]-zhichuquan2014[i][8]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2014[i][9]-zhichuquan2014[i][9]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2014[i][10]-zhichuquan2014[i][10]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2014[i][11]-zhichuquan2014[i][11]).toFixed(2) +'</td>');
    					hahahatr.appendTo(hahabody3);
    				}
    				document.getElementById("showmoneyus").innerHTML += '<br><hr><h4>'+ whichyear + '年収益表（単位：万円）<br></h4>';
    				$("#showmoneyus").append(hahatable3);		
    		}
    		else if (whichyear===2015){
    			document.getElementById("show").innerHTML = '<h3>'+ whichyear + '年各倉庫収入</h3>';  
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
    			$("#showallus").removeClass("ct-vertial");
    			$("#showallus").addClass("ct-square");
    			$("#showwhat").addClass("ct-square");
    			var chart = new Chartist.Line('.ct-chart', {
    				  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    				  series: [
    				    geyue2015shourutokyo1,
    				    geyue2015shourutokyo2,
    				    geyue2015shouruosaka,
    				    geyue2015shourufukuoka
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
    				
    				var hahatable = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
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
    				hahatr.append('<th>7月</th>');
    				hahatr.append('<th>8月</th>');
    				hahatr.append('<th>9月</th>');
    				hahatr.append('<th>10月</th>');
    				hahatr.append('<th>11月</th>');
    				hahatr.append('<th>12月</th>');
    				hahatr.appendTo(hahabody);
    				for (var i=0;i<=3;i++){
    					var hahahatr = $('<tr></tr>');
    					hahahatr.append('<td>'+ labels1[i] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2015[i][0] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2015[i][1] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2015[i][2] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2015[i][3] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2015[i][4] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2015[i][5] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2015[i][6] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2015[i][7] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2015[i][8] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2015[i][9] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2015[i][10] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2015[i][11] +'</td>');
    					hahahatr.appendTo(hahabody);
    				}
    				document.getElementById("showmonthus").innerHTML = '<h4>'+ whichyear + '年収入表（単位：万円）<br></h4>';
    				$("#showmonthus").append(hahatable);
    				
    				
    				
    				document.getElementById("show2").innerHTML = '<hr><h3>'+ whichyear +'年各倉庫支出</h3><br>';
    				
    				var chart = new Chartist.Line('.ct-chart1', {
      				  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      				  series: [
      				    geyue2015zhichutokyo1,
      				    geyue2015zhichutokyo2,
      				    geyue2015zhichuosaka,
      				    geyue2015zhichufukuoka
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
      				
      				var hahatable2 = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
    				var hahabody2 = $('<tbody></tbody>');
    				hahabody2.appendTo(hahatable2);
    				var hahatr2 = $('<tr></tr>');
    				hahatr2.append('<th>倉庫</th>');
    				hahatr2.append('<th>1月</th>');
    				hahatr2.append('<th>2月</th>');
    				hahatr2.append('<th>3月</th>');
    				hahatr2.append('<th>4月</th>');
    				hahatr2.append('<th>5月</th>');
    				hahatr2.append('<th>6月</th>');
    				hahatr2.append('<th>7月</th>');
    				hahatr2.append('<th>8月</th>');
    				hahatr2.append('<th>9月</th>');
    				hahatr2.append('<th>10月</th>');
    				hahatr2.append('<th>11月</th>');
    				hahatr2.append('<th>12月</th>');
    				hahatr2.appendTo(hahabody2);
    				for (var i=0;i<=3;i++){
    					var hahahatr = $('<tr></tr>');
    					hahahatr.append('<td>'+ labels1[i] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2015[i][0] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2015[i][1] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2015[i][2] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2015[i][3] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2015[i][4] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2015[i][5] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2015[i][6] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2015[i][7] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2015[i][8] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2015[i][9] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2015[i][10] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2015[i][11] +'</td>');
    					hahahatr.appendTo(hahabody2);
    				}
    				document.getElementById("showmoneyus").innerHTML = '<h4>'+ whichyear + '年支出表（単位：万円）<br></h4>';
    				$("#showmoneyus").append(hahatable2);
    				
    				//--------------------------------------------------
    				var hahatable3 = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
    				var hahabody3 = $('<tbody></tbody>');
    				hahabody3.appendTo(hahatable3);
    				var hahatr3 = $('<tr></tr>');
    				hahatr3.append('<th>倉庫</th>');
    				hahatr3.append('<th>1月</th>');
    				hahatr3.append('<th>2月</th>');
    				hahatr3.append('<th>3月</th>');
    				hahatr3.append('<th>4月</th>');
    				hahatr3.append('<th>5月</th>');
    				hahatr3.append('<th>6月</th>');
    				hahatr3.append('<th>7月</th>');
    				hahatr3.append('<th>8月</th>');
    				hahatr3.append('<th>9月</th>');
    				hahatr3.append('<th>10月</th>');
    				hahatr3.append('<th>11月</th>');
    				hahatr3.append('<th>12月</th>');
    				hahatr3.appendTo(hahabody3);
    				for (var i=0;i<=3;i++){
    					var hahahatr = $('<tr></tr>');
    					hahahatr.append('<td>'+ labels1[i] +'</td>');
    					var m1 = shouruquan2015[i][0]-zhichuquan2015[i][0];
    					hahahatr.append('<td style="color:darkgoldenrod">'+ m1.toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2015[i][1]-zhichuquan2015[i][1]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2015[i][2]-zhichuquan2015[i][2]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2015[i][3]-zhichuquan2015[i][3]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2015[i][4]-zhichuquan2015[i][4]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2015[i][5]-zhichuquan2015[i][5]).toFixed(2)+'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2015[i][6]-zhichuquan2015[i][6]).toFixed(2)+'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2015[i][7]-zhichuquan2015[i][7]).toFixed(2)+'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2015[i][8]-zhichuquan2015[i][8]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2015[i][9]-zhichuquan2015[i][9]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2015[i][10]-zhichuquan2015[i][10]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2015[i][11]-zhichuquan2015[i][11]).toFixed(2) +'</td>');
    					hahahatr.appendTo(hahabody3);
    				}
    				document.getElementById("showmoneyus").innerHTML += '<br><hr><h4>'+ whichyear + '年収益表（単位：万円）<br></h4>';
    				$("#showmoneyus").append(hahatable3);	
    		}
    		else{
    			document.getElementById("show").innerHTML = '<h3>'+ whichyear + '年各倉庫収入</h3>';  
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
    			$("#showallus").removeClass("ct-vertial");
    			$("#showallus").addClass("ct-square");
    			$("#showwhat").addClass("ct-square");
    			var chart = new Chartist.Line('.ct-chart', {
    				  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    				  series: [
    				    geyue2016shourutokyo1,
    				    geyue2016shourutokyo2,
    				    geyue2016shouruosaka,
    				    geyue2016shourufukuoka
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
    				
    				var hahatable = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
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
    				
    				hahatr.appendTo(hahabody);
    				for (var i=0;i<=3;i++){
    					var hahahatr = $('<tr></tr>');
    					hahahatr.append('<td>'+ labels1[i] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2016[i][0] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2016[i][1] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2016[i][2] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2016[i][3] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2016[i][4] +'</td>');
    					hahahatr.append('<td style="color:green">'+ shouruquan2016[i][5] +'</td>');
    					
    					hahahatr.appendTo(hahabody);
    				}
    				document.getElementById("showmonthus").innerHTML = '<h4>'+ whichyear + '年収入表（単位：万円）<br></h4>';
    				$("#showmonthus").append(hahatable);
    				
    				
    				
    				document.getElementById("show2").innerHTML = '<hr><h3>'+ whichyear +'年各倉庫支出</h3><br>';
    				
    				var chart = new Chartist.Line('.ct-chart1', {
      				  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      				  series: [
      				    geyue2016zhichutokyo1,
      				    geyue2016zhichutokyo2,
      				    geyue2016zhichuosaka,
      				  geyue2016zhichufukuoka
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
      				
      				var hahatable2 = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
    				var hahabody2 = $('<tbody></tbody>');
    				hahabody2.appendTo(hahatable2);
    				var hahatr2 = $('<tr></tr>');
    				hahatr2.append('<th>倉庫</th>');
    				hahatr2.append('<th>1月</th>');
    				hahatr2.append('<th>2月</th>');
    				hahatr2.append('<th>3月</th>');
    				hahatr2.append('<th>4月</th>');
    				hahatr2.append('<th>5月</th>');
    				hahatr2.append('<th>6月</th>');
    				hahatr2.appendTo(hahabody2);
    				for (var i=0;i<=3;i++){
    					var hahahatr = $('<tr></tr>');
    					hahahatr.append('<td>'+ labels1[i] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2016[i][0] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2016[i][1] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2016[i][2] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2016[i][3] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2016[i][4] +'</td>');
    					hahahatr.append('<td style="color:red">'+ zhichuquan2016[i][5] +'</td>');
    					
    					hahahatr.appendTo(hahabody2);
    				}
    				document.getElementById("showmoneyus").innerHTML = '<h4>'+ whichyear + '年支出表（単位：万円）<br></h4>';
    				$("#showmoneyus").append(hahatable2);
    				
    				//--------------------------------------------------
    				var hahatable3 = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
    				var hahabody3 = $('<tbody></tbody>');
    				hahabody3.appendTo(hahatable3);
    				var hahatr3 = $('<tr></tr>');
    				hahatr3.append('<th>倉庫</th>');
    				hahatr3.append('<th>1月</th>');
    				hahatr3.append('<th>2月</th>');
    				hahatr3.append('<th>3月</th>');
    				hahatr3.append('<th>4月</th>');
    				hahatr3.append('<th>5月</th>');
    				hahatr3.append('<th>6月</th>');
    				
    				hahatr3.appendTo(hahabody3);
    				for (var i=0;i<=3;i++){
    					var hahahatr = $('<tr></tr>');
    					hahahatr.append('<td>'+ labels1[i] +'</td>');
    					var m1 = shouruquan2016[i][0]-zhichuquan2016[i][0];
    					hahahatr.append('<td style="color:darkgoldenrod">'+ m1.toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2016[i][1]-zhichuquan2016[i][1]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2016[i][2]-zhichuquan2016[i][2]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2016[i][3]-zhichuquan2016[i][3]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2016[i][4]-zhichuquan2016[i][4]).toFixed(2) +'</td>');
    					hahahatr.append('<td style="color:darkgoldenrod">'+ (shouruquan2016[i][5]-zhichuquan2016[i][5]).toFixed(2)+'</td>');
    					
    					hahahatr.appendTo(hahabody3);
    				}
    				document.getElementById("showmoneyus").innerHTML += '<br><hr><h4>'+ whichyear + '年収益表（単位：万円）<br></h4>';
    				$("#showmoneyus").append(hahatable3);	
    		}
    	}
    	else{
            if (whichyear===2014){
            	
            	document.getElementById("show").innerHTML = '<hr><h3>'+ whichyear +'年収入構成</h3>';
            	document.getElementById("show").innerHTML += '<br>\
            		<label style="color:red;margin-left:20px">P-16 HOZAN リードペンチ</label>\
            		<label style="color:lightcoral;margin-left:20px">GA-H170M-D3H</label>\
            		<label style="color:gold;margin-left:20px">PSD316G1600KH</label>\
            		<label style="color:darkgoldenrod;margin-left:20px">Athlon5350</label>\
            		<label style="color:dimgrey;margin-left:20px">PSD316G1600KH</label>\
            		<label style="color:forestgreen;margin-left:20px">ST8000AS0002</label>\
            		<label style="color:blue;margin-left:20px">H170-PRO</label>';
				document.getElementById("showmonthus").innerHTML = '';
				document.getElementById("show2").innerHTML = '';
				document.getElementById('showwhat').innerHTML = '';
				document.getElementById("showmoneyus").innerHTML = '';
				document.getElementById("showallus").innerHTML = '';
				
				//document.getElementById("")
				
				
				var chart = new Chartist.Pie('.ct-chart', {
					  series: [10, 20, 50, 20, 5, 50, 15],
					  labels: [1, 2, 3, 4, 5, 6, 7]
					}, {
					  donut: true,
					  showLabel: false
					});

					chart.on('draw', function(data) {
					  if(data.type === 'slice') {
					    // Get the total path length in order to use for dash array animation
					    var pathLength = data.element._node.getTotalLength();

					    // Set a dasharray that matches the path length as prerequisite to animate dashoffset
					    data.element.attr({
					      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
					    });

					    // Create animation definition while also assigning an ID to the animation for later sync usage
					    var animationDefinition = {
					      'stroke-dashoffset': {
					        id: 'anim' + data.index,
					        dur: 1000,
					        from: -pathLength + 'px',
					        to:  '0px',
					        easing: Chartist.Svg.Easing.easeOutQuint,
					        // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
					        fill: 'freeze'
					      }
					    };

					    // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
					    if(data.index !== 0) {
					      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
					    }

					    // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
					    data.element.attr({
					      'stroke-dashoffset': -pathLength + 'px'
					    });

					    // We can't use guided mode as the animations need to rely on setting begin manually
					    // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
					    data.element.animate(animationDefinition, false);
					  }
					});

					// For the sake of the example we update the chart every time it's created with a delay of 8 seconds
					chart.on('created', function() {
					  if(window.__anim21278907124) {
					    clearTimeout(window.__anim21278907124);
					    window.__anim21278907124 = null;
					  }
					  window.__anim21278907124 = setTimeout(chart.update.bind(chart), 1000000000);
					});
					
					
					var hahatable = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
    				var hahabody = $('<tbody></tbody>');
    				hahabody.appendTo(hahatable);
    				var hahatr = $('<tr></tr>');
    				hahatr.append('<th>商品</th>');
    				hahatr.append('<th>構成比(%)</th>');
    				hahatr.appendTo(hahabody);
    				for (var i=0;i<7;i++){
    					var hahahatr = $('<tr></tr>');
    					hahahatr.append('<td>'+t1ks2014[i]+'</td>');
    					hahahatr.append('<td>'+((t1ks14[i]/170)*100).toFixed(2)+'</td>');
    					hahahatr.appendTo(hahatable);
    				}
    				document.getElementById("showmonthus").innerHTML = '<h4>'+ whichyear + '年収入構成表<br></h4>';
    				$("#showmonthus").append(hahatable);
    				
    				document.getElementById("showmonthus").innerHTML += '<br><hr><h5>'+ whichyear +'年支出構成</h5>';
    				document.getElementById("showmonthus").innerHTML += '<br>\
                		<label style="color:red;margin-left:20px">P-16 HOZAN リードペンチ</label>\
                		<label style="color:lightcoral;margin-left:20px">GA-H170M-D3H</label>\
                		<label style="color:gold;margin-left:20px">PSD316G1600KH</label>\
                		<label style="color:darkgoldenrod;margin-left:20px">Athlon5350</label>\
                		<label style="color:dimgrey;margin-left:20px">PSD316G1600KH</label>\
                		<label style="color:forestgreen;margin-left:20px">ST8000AS0002</label>\
                		<label style="color:blue;margin-left:20px">H170-PRO</label>';
    				
    				
    				var chart = new Chartist.Pie('.ct-chart1', {
  					  series: [15, 50, 25, 15, 5, 50, 20],
  					  labels: [1, 2, 3, 4, 5, 6, 7]
  					}, {
  					  donut: true,
  					  showLabel: false
  					});

  					chart.on('draw', function(data) {
  					  if(data.type === 'slice') {
  					    // Get the total path length in order to use for dash array animation
  					    var pathLength = data.element._node.getTotalLength();

  					    // Set a dasharray that matches the path length as prerequisite to animate dashoffset
  					    data.element.attr({
  					      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
  					    });

  					    // Create animation definition while also assigning an ID to the animation for later sync usage
  					    var animationDefinition = {
  					      'stroke-dashoffset': {
  					        id: 'anim' + data.index,
  					        dur: 1000,
  					        from: -pathLength + 'px',
  					        to:  '0px',
  					        easing: Chartist.Svg.Easing.easeOutQuint,
  					        // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
  					        fill: 'freeze'
  					      }
  					    };

  					    // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
  					    if(data.index !== 0) {
  					      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
  					    }

  					    // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
  					    data.element.attr({
  					      'stroke-dashoffset': -pathLength + 'px'
  					    });

  					    // We can't use guided mode as the animations need to rely on setting begin manually
  					    // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
  					    data.element.animate(animationDefinition, false);
  					  }
  					});

  					// For the sake of the example we update the chart every time it's created with a delay of 8 seconds
  					chart.on('created', function() {
  					  if(window.__anim21278907124) {
  					    clearTimeout(window.__anim21278907124);
  					    window.__anim21278907124 = null;
  					  }
  					  window.__anim21278907124 = setTimeout(chart.update.bind(chart), 1000000000);
  					});
  					
  					var hahatable2 = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
    				var hahabody2 = $('<tbody></tbody>');
    				hahabody2.appendTo(hahatable2);
    				var hahatr2 = $('<tr></tr>');
    				hahatr2.append('<th>商品</th>');
    				hahatr2.append('<th>構成比(%)</th>');
    				hahatr2.appendTo(hahabody2);
    				for (var i=0;i<7;i++){
    					var hahahatr = $('<tr></tr>');
    					hahahatr.append('<td>'+t1ks2014[i]+'</td>');
    					hahahatr.append('<td>'+((t1ks14_1[i]/170)*100).toFixed(2)+'</td>');
    					hahahatr.appendTo(hahatable2);
    				}
    				document.getElementById("showmoneyus").innerHTML = '<h4>'+ whichyear + '年支出構成表<br></h4>';
    				$("#showmoneyus").append(hahatable2);	
            }
            else if (whichyear===2015){
            	document.getElementById("show").innerHTML = '<hr><h3>'+ whichyear +'年収入構成</h3>';
            	document.getElementById("show").innerHTML += '<br>\
            		<label style="color:red;margin-left:20px">P-16 HOZAN リードペンチ</label>\
            		<label style="color:lightcoral;margin-left:20px">GA-H170M-D3H</label>\
            		<label style="color:gold;margin-left:20px">PSD316G1600KH</label>\
            		<label style="color:darkgoldenrod;margin-left:20px">Athlon5350</label>\
            		<label style="color:dimgrey;margin-left:20px">PSD316G1600KH</label>\
            		<label style="color:forestgreen;margin-left:20px">ST8000AS0002</label>\
            		<label style="color:blue;margin-left:20px">H170-PRO</label>\
            		<label style="color:indigo;margin-left:20px">H110M-HDV</label>';
				document.getElementById("showmonthus").innerHTML = '';
				document.getElementById("show2").innerHTML = '';
				document.getElementById('showwhat').innerHTML = '';
				document.getElementById("showmoneyus").innerHTML = '';
				document.getElementById("showallus").innerHTML = '';
				
				
				var chart = new Chartist.Pie('.ct-chart', {
					  series: t1ks15,
					  labels: [1, 2, 3, 4, 5, 6, 7,8]
					}, {
					  donut: true,
					  showLabel: false
					});

					chart.on('draw', function(data) {
					  if(data.type === 'slice') {
					    // Get the total path length in order to use for dash array animation
					    var pathLength = data.element._node.getTotalLength();

					    // Set a dasharray that matches the path length as prerequisite to animate dashoffset
					    data.element.attr({
					      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
					    });

					    // Create animation definition while also assigning an ID to the animation for later sync usage
					    var animationDefinition = {
					      'stroke-dashoffset': {
					        id: 'anim' + data.index,
					        dur: 1000,
					        from: -pathLength + 'px',
					        to:  '0px',
					        easing: Chartist.Svg.Easing.easeOutQuint,
					        // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
					        fill: 'freeze'
					      }
					    };

					    // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
					    if(data.index !== 0) {
					      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
					    }

					    // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
					    data.element.attr({
					      'stroke-dashoffset': -pathLength + 'px'
					    });

					    // We can't use guided mode as the animations need to rely on setting begin manually
					    // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
					    data.element.animate(animationDefinition, false);
					  }
					});

					// For the sake of the example we update the chart every time it's created with a delay of 8 seconds
					chart.on('created', function() {
					  if(window.__anim21278907124) {
					    clearTimeout(window.__anim21278907124);
					    window.__anim21278907124 = null;
					  }
					  window.__anim21278907124 = setTimeout(chart.update.bind(chart), 1000000000);
					});
					
					var hahatable = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
    				var hahabody = $('<tbody></tbody>');
    				hahabody.appendTo(hahatable);
    				var hahatr = $('<tr></tr>');
    				hahatr.append('<th>商品</th>');
    				hahatr.append('<th>構成比(%)</th>');
    				hahatr.appendTo(hahabody);
    				for (var i=0;i<8;i++){
    					var hahahatr = $('<tr></tr>');
    					hahahatr.append('<td>'+t1ks2015[i]+'</td>');
    					hahahatr.append('<td>'+((t1ks15[i]/220)*100).toFixed(2)+'</td>');
    					hahahatr.appendTo(hahatable);
    				}
    				document.getElementById("showmonthus").innerHTML = '<h4>'+ whichyear + '年収入構成表<br></h4>';
    				$("#showmonthus").append(hahatable);
					
    				//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    				document.getElementById("showmonthus").innerHTML += '<br><hr><h5>'+ whichyear +'年支出構成</h5>';
    				document.getElementById("showmonthus").innerHTML += '<br>\
                		<label style="color:red;margin-left:20px">P-16 HOZAN リードペンチ</label>\
                		<label style="color:lightcoral;margin-left:20px">GA-H170M-D3H</label>\
                		<label style="color:gold;margin-left:20px">PSD316G1600KH</label>\
                		<label style="color:darkgoldenrod;margin-left:20px">Athlon5350</label>\
                		<label style="color:dimgrey;margin-left:20px">PSD316G1600KH</label>\
                		<label style="color:forestgreen;margin-left:20px">ST8000AS0002</label>\
                		<label style="color:blue;margin-left:20px">H170-PRO</label>\
    					<label style="color:indigo;margin-left:20px">H110M-HDV</label>';
    				
    				
    				var chart = new Chartist.Pie('.ct-chart1', {
  					  series: t1ks15_1,
  					  labels: [1, 2, 3, 4, 5, 6, 7,8]
  					}, {
  					  donut: true,
  					  showLabel: false
  					});

  					chart.on('draw', function(data) {
  					  if(data.type === 'slice') {
  					    // Get the total path length in order to use for dash array animation
  					    var pathLength = data.element._node.getTotalLength();

  					    // Set a dasharray that matches the path length as prerequisite to animate dashoffset
  					    data.element.attr({
  					      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
  					    });

  					    // Create animation definition while also assigning an ID to the animation for later sync usage
  					    var animationDefinition = {
  					      'stroke-dashoffset': {
  					        id: 'anim' + data.index,
  					        dur: 1000,
  					        from: -pathLength + 'px',
  					        to:  '0px',
  					        easing: Chartist.Svg.Easing.easeOutQuint,
  					        // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
  					        fill: 'freeze'
  					      }
  					    };

  					    // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
  					    if(data.index !== 0) {
  					      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
  					    }

  					    // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
  					    data.element.attr({
  					      'stroke-dashoffset': -pathLength + 'px'
  					    });

  					    // We can't use guided mode as the animations need to rely on setting begin manually
  					    // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
  					    data.element.animate(animationDefinition, false);
  					  }
  					});

  					// For the sake of the example we update the chart every time it's created with a delay of 8 seconds
  					chart.on('created', function() {
  					  if(window.__anim21278907124) {
  					    clearTimeout(window.__anim21278907124);
  					    window.__anim21278907124 = null;
  					  }
  					  window.__anim21278907124 = setTimeout(chart.update.bind(chart), 1000000000);
  					});
  					
  					var hahatable2 = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
    				var hahabody2 = $('<tbody></tbody>');
    				hahabody2.appendTo(hahatable2);
    				var hahatr2 = $('<tr></tr>');
    				hahatr2.append('<th>商品</th>');
    				hahatr2.append('<th>構成比(%)</th>');
    				hahatr2.appendTo(hahabody2);
    				for (var i=0;i<8;i++){
    					var hahahatr = $('<tr></tr>');
    					hahahatr.append('<td>'+t1ks2015[i]+'</td>');
    					hahahatr.append('<td>'+((t1ks15_1[i]/170)*100).toFixed(2)+'</td>');
    					hahahatr.appendTo(hahatable2);
    				}
    				document.getElementById("showmoneyus").innerHTML = '<h4>'+ whichyear + '年支出構成表<br></h4>';
    				$("#showmoneyus").append(hahatable2);	
    				
				
            }
            else if (whichyear===2016){
            	//"W3U1600HQ-4G","極厚純綿シリコンすべり止め軍手"
            	
            	document.getElementById("show").innerHTML = '<hr><h3>'+ whichyear +'年収入構成</h3>';
            	document.getElementById("show").innerHTML += '<br>\
            		<label style="color:red;margin-left:20px">P-16 HOZAN リードペンチ</label>\
            		<label style="color:lightcoral;margin-left:20px">GA-H170M-D3H</label>\
            		<label style="color:gold;margin-left:20px">PSD316G1600KH</label>\
            		<label style="color:darkgoldenrod;margin-left:20px">Athlon5350</label>\
            		<label style="color:dimgrey;margin-left:20px">PSD316G1600KH</label>\
            		<label style="color:forestgreen;margin-left:20px">ST8000AS0002</label>\
            		<label style="color:blue;margin-left:20px">H170-PRO</label>\
            		<label style="color:indigo;margin-left:20px">H110M-HDV</label>\
            		<label style="color:darksalmon;margin-left:20px">W3U1600HQ-4G</label>\
            		<label style="color:goldenrod;margin-left:20px">極厚純綿シリコンすべり止め軍手</label>';
				document.getElementById("showmonthus").innerHTML = '';
				document.getElementById("show2").innerHTML = '';
				document.getElementById('showwhat').innerHTML = '';
				document.getElementById("showmoneyus").innerHTML = '';
				document.getElementById("showallus").innerHTML = '';
				
				var chart = new Chartist.Pie('.ct-chart', {
					  series: t1ks16,
					  labels: [1, 2, 3, 4, 5, 6, 7,8,9,10]
					}, {
					  donut: true,
					  showLabel: false
					});

					chart.on('draw', function(data) {
					  if(data.type === 'slice') {
					    // Get the total path length in order to use for dash array animation
					    var pathLength = data.element._node.getTotalLength();

					    // Set a dasharray that matches the path length as prerequisite to animate dashoffset
					    data.element.attr({
					      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
					    });

					    // Create animation definition while also assigning an ID to the animation for later sync usage
					    var animationDefinition = {
					      'stroke-dashoffset': {
					        id: 'anim' + data.index,
					        dur: 1000,
					        from: -pathLength + 'px',
					        to:  '0px',
					        easing: Chartist.Svg.Easing.easeOutQuint,
					        // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
					        fill: 'freeze'
					      }
					    };

					    // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
					    if(data.index !== 0) {
					      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
					    }

					    // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
					    data.element.attr({
					      'stroke-dashoffset': -pathLength + 'px'
					    });

					    // We can't use guided mode as the animations need to rely on setting begin manually
					    // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
					    data.element.animate(animationDefinition, false);
					  }
					});

					// For the sake of the example we update the chart every time it's created with a delay of 8 seconds
					chart.on('created', function() {
					  if(window.__anim21278907124) {
					    clearTimeout(window.__anim21278907124);
					    window.__anim21278907124 = null;
					  }
					  window.__anim21278907124 = setTimeout(chart.update.bind(chart), 1000000000);
					});
					
					var hahatable = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
  				var hahabody = $('<tbody></tbody>');
  				hahabody.appendTo(hahatable);
  				var hahatr = $('<tr></tr>');
  				hahatr.append('<th>商品</th>');
  				hahatr.append('<th>構成比(%)</th>');
  				hahatr.appendTo(hahabody);
  				for (var i=0;i<10;i++){
  					var hahahatr = $('<tr></tr>');
  					hahahatr.append('<td>'+t1ks2016[i]+'</td>');
  					hahahatr.append('<td>'+((t1ks16[i]/220)*100).toFixed(2)+'</td>');
  					hahahatr.appendTo(hahatable);
  				}
  				document.getElementById("showmonthus").innerHTML = '<h4>'+ whichyear + '年収入構成表<br></h4>';
  				$("#showmonthus").append(hahatable);
				
  				//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  				document.getElementById("showmonthus").innerHTML += '<br><hr><h5>'+ whichyear +'年支出構成</h5>';
				document.getElementById("showmonthus").innerHTML += '<br>\
            		<label style="color:red;margin-left:20px">P-16 HOZAN リードペンチ</label>\
            		<label style="color:lightcoral;margin-left:20px">GA-H170M-D3H</label>\
            		<label style="color:gold;margin-left:20px">PSD316G1600KH</label>\
            		<label style="color:darkgoldenrod;margin-left:20px">Athlon5350</label>\
            		<label style="color:dimgrey;margin-left:20px">PSD316G1600KH</label>\
            		<label style="color:forestgreen;margin-left:20px">ST8000AS0002</label>\
            		<label style="color:blue;margin-left:20px">H170-PRO</label>\
					<label style="color:indigo;margin-left:20px">H110M-HDV</label>\
					<label style="color:darksalmon;margin-left:20px">W3U1600HQ-4G</label>\
					<label style="color:goldenrod;margin-left:20px">極厚純綿シリコンすべり止め軍手</label>';
				
				var chart = new Chartist.Pie('.ct-chart1', {
					  series: t1ks16_1,
					  labels: [1, 2, 3, 4, 5, 6, 7,8,9,10]
					}, {
					  donut: true,
					  showLabel: false
					});

					chart.on('draw', function(data) {
					  if(data.type === 'slice') {
					    // Get the total path length in order to use for dash array animation
					    var pathLength = data.element._node.getTotalLength();

					    // Set a dasharray that matches the path length as prerequisite to animate dashoffset
					    data.element.attr({
					      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
					    });

					    // Create animation definition while also assigning an ID to the animation for later sync usage
					    var animationDefinition = {
					      'stroke-dashoffset': {
					        id: 'anim' + data.index,
					        dur: 1000,
					        from: -pathLength + 'px',
					        to:  '0px',
					        easing: Chartist.Svg.Easing.easeOutQuint,
					        // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
					        fill: 'freeze'
					      }
					    };

					    // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
					    if(data.index !== 0) {
					      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
					    }

					    // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
					    data.element.attr({
					      'stroke-dashoffset': -pathLength + 'px'
					    });

					    // We can't use guided mode as the animations need to rely on setting begin manually
					    // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
					    data.element.animate(animationDefinition, false);
					  }
					});

					// For the sake of the example we update the chart every time it's created with a delay of 8 seconds
					chart.on('created', function() {
					  if(window.__anim21278907124) {
					    clearTimeout(window.__anim21278907124);
					    window.__anim21278907124 = null;
					  }
					  window.__anim21278907124 = setTimeout(chart.update.bind(chart), 1000000000);
					});
					
					var hahatable2 = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
  				var hahabody2 = $('<tbody></tbody>');
  				hahabody2.appendTo(hahatable2);
  				var hahatr2 = $('<tr></tr>');
  				hahatr2.append('<th>商品</th>');
  				hahatr2.append('<th>構成比(%)</th>');
  				hahatr2.appendTo(hahabody2);
  				for (var i=0;i<10;i++){
  					var hahahatr = $('<tr></tr>');
  					hahahatr.append('<td>'+t1ks2016[i]+'</td>');
  					hahahatr.append('<td>'+((t1ks16_1[i]/170)*100).toFixed(2)+'</td>');
  					hahahatr.appendTo(hahatable2);
  				}
  				document.getElementById("showmoneyus").innerHTML = '<h4>'+ whichyear + '年支出構成表<br></h4>';
  				$("#showmoneyus").append(hahatable2);	
				
            }
    	}
    }
}

