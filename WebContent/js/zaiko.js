console.log(alasql('select * from trans'));


// 検索ボックス作成
var rows = alasql('SELECT * FROM whouse;');
for (var i = 0; i < rows.length; i++) {
	var row = rows[i];
	var option = $('<option>');
	option.attr('value', row.whouse.id);
	option.text(row.whouse.name);
	$('select[name="q1"]').append(option);
}

var rows = alasql('SELECT * FROM kind;');
for (var i = 0; i < rows.length; i++) {
	var row = rows[i];
	var option = $('<option>');
	option.attr('value', row.kind.id);
	option.text(row.kind.text);
	$('select[name="q2"]').append(option);
}

// 検索条件の取得
var q1 = parseInt($.url().param('q1') || '0');
$('select[name="q1"]').val(q1);
var q2 = parseInt($.url().param('q2') || '0');
$('select[name="q2"]').val(q2);
var q3 = $.url().param('q3') || '';
$('input[name="q3"]').val(q3);

// SQLの生成
//JOIN trans on trans.stock = stock.id\
var sql = 'SELECT * \
	FROM stock \
	JOIN whouse ON whouse.id = stock.whouse \
	JOIN item ON item.id = stock.item \
	JOIN kind ON kind.id = item.kind \
	WHERE item.code LIKE ? ';

sql += q1 ? 'AND whouse.id = ' + q1 + ' ' : '';
sql += q2 ? 'AND kind.id = ' + q2 + ' ' : '';

// SQL実行
var stocks = alasql(sql, [ q3 + '%' ]);


// to get the actual balance from this fucking stupidly organized database
// remember : use the transmap instead od the stock database in order to get the actual balance dynamically.
var transfers = alasql('select stock,sum(qty) as truebalance from trans group by stock');
var transmap = new Map();
for (var i=0;i<transfers.length;i++){
	transmap.set(transfers[i].stock,transfers[i].truebalance);
}
console.log(transmap);

//console.log(transfers);
console.log(stocks);

for (var i=0;i<stocks.length;i++){
	var stocktmp = stocks[i];
	if (transmap.get(stocktmp.stock.id) == null){
		stocks.splice(i,1);
	}
}

console.log(stocks);

// HTML作成
var tbody = $('#tbody-stocks');
for (var i = 0; i < stocks.length; i++) {
	var stock = stocks[i];
	var tr;
	tr = $('<tr data-href="stock.html?id=' + stock.stock.id + '"></tr>');
	tr.append('<td>' + stock.whouse.name + '</td>');
	tr.append('<td>' + stock.kind.text + '</td>');
	tr.append('<td>' + stock.item.code + '</td>');
	tr.append('<td>' + stock.item.maker + '</td>');
	tr.append('<td>' + stock.item.detail + '<span class="stockid" style="visibility:hidden">'+ stock.item.code+'</span></td>');
	tr.append('<td style="text-align: right;">' + numberWithCommas(stock.item.price) + '</td>');
	tr.append('<td style="text-align: right;">' + transmap.get(stock.stock.id) + '</td>');
	tr.append('<td>' + stock.item.unit + '</td>');
	tr.appendTo(tbody);
}

// クリック動作
$('tbody > tr').css('cursor', 'pointer').on('click', function() {
	window.location = $(this).attr('data-href');
});


//document.getElementById("showthename").innerHTML='<span>Welcome! User '+ localStorage.getItem("name")+'</span>'; 

$("#thebiggestone").DataTable({
	"order":[[3,"asc"]]
});

var myMap = new Map();
for (var i=0;i<stocks.length;i++){
	var stock = stocks[i];
	myMap.set(stock.item.code,stock);
}
//console.log(myMap);


//var table = document.getElementById('thebiggestone');
//var rows = table.rows;
//alert(rows.length);






//var ol = document.getElementById('numofshit');
//if (rows.length<1){
//	alert("buddy, there is currently no element in the system");
//}
//else{
//	for (var i=1;i<=rows.length;i++){
//		if (i===1){
//			var li = $('<li data-target="#carousel-example-generic" data-slide-to="' + i + '" class="active"></li>' );
//			li.appendTo(ol);
//		}
//		else {
//			var li = $('<li data-target="#carousel-example-generic" data-slide-to="' + i + '></li>' );
//			li.appendTo(ol);
//		}
//		
//	}
//}
//
//




///** this part tries to have slide show show the pic and basic info of the item **/
//var inner = document.getElementById('numofshit2');             // the inner body of carousel
//var spaninside = document.getElementsByClassName("stockid");       //all the stockids, remember to use innerHTML
//
//for (var i=1;i<=rows.length;i++){
//	var code = spaninside[i-1].innerHTML;
//	var stockk = myMap.get(code);
//    if (i===1){
//		var divv2 = $('<div class="item active"></div>');
//		divv2.append('<img src="img/' + code + '.jpg" alt=""/>');
////		var divv2 = $('<div class="carousel-caption"></div>');
//		divv2.append('<span class="text-success" style="font-weight: bold;font-stretch: expanded;">倉庫: ' +stockk.whouse.name + '</span>');
//    	divv2.append('<br>');
//    	divv2.append('<span class="text-success" style="font-weight: bold;font-stretch: expanded;">分類: ' +stockk.kind.text+ '</span>');
//    	divv2.append('<br>');
//    	divv2.append('<span style="color:black">コード: ' + code+'</span>');
//    	divv2.append('<br>');
//    	divv2.append('<span style="color:black">メーカー: '+stockk.item.maker+'</span>');
//    	divv2.append('<br>');
//    	divv2.append('<span style="color:black">詳細: '+stockk.item.detail+'</span>');
//    	divv2.append('<br>');
//    	divv2.append('<span style="color:black">金額: '+numberWithCommas(stockk.item.price)+'</span>');
//    	divv2.append('<br>');
//    	divv2.append('<span style="color:black">残量: '+numberWithCommas(stockk.item.price)+stockk.item.unit+'</span>');
//    	divv2.append('<br>');
////		divv2.appendTo(divv);
//		divv2.appendTo(inner);
//    }
//    else{
//		var divv2 = $('<div class="item"></div>');
//    	divv2.append('<img src="img/' + code + '.jpg" alt=""/>');
////    	var divv2 = $('<div class="carousel-caption"></div>');
//		divv2.append('<span class="text-success" style="font-weight: bold;font-stretch: expanded;">倉庫: ' +stockk.whouse.name + '</span>');
//    	divv2.append('<br>');
//    	divv2.append('<span class="text-success" style="font-weight: bold;font-stretch: expanded;">分類: ' +stockk.kind.text+ '</span>');
//    	divv2.append('<br>');
//    	divv2.append('<span style="color:black">コード: ' + code+'</span>');
//    	divv2.append('<br>');
//    	divv2.append('<span style="color:black">メーカー: '+stockk.item.maker+'</span>');
//    	divv2.append('<br>');
//    	divv2.append('<span style="color:black">詳細: '+stockk.item.detail+'</span>');
//    	divv2.append('<br>');
//    	divv2.append('<span style="color:black">金額: '+numberWithCommas(stockk.item.price)+'</span>');
//    	divv2.append('<br>');
//    	divv2.append('<span style="color:black">残量: '+numberWithCommas(stockk.item.price)+stockk.item.unit+'</span>');
//    	divv2.append('<br>');
////		divv2.appendTo(divv);
//        divv2.appendTo(inner);
//    }
//}







//for (var i=1;i<=rows.length;i++){
//	var code = rows[i].getElementsByTagName('td')[2].innerHTML;
//    if (i===1){
//    	var divv = $('<div class="item active"></div>');
//    	divv.append('<img src="img/' + code + '.jpg" alt=""/>');
//    	var divv2 = $('<div class="carousel-caption"></div>');
//    	
//    	//problem its not dynamic
//    	// use alasql, build a hashmap<id,json> to store the json information, and then if(contains...)
//
//    	divv2.append('<span class="text-success" style="font-weight: bold;font-stretch: expanded;">倉庫: ' +rows[i].getElementsByTagName('td')[0].innerHTML + '</span>');
//    	divv2.append('<br>');
//    	divv2.append('<br>');
//    	divv2.append('<span class="text-success" style="font-weight: bold;font-stretch: expanded;">分類: ' +rows[i].getElementsByTagName('td')[1].innerHTML + '</span>');
//    	divv2.append('<br>');
//    	divv2.append('<span style="color:black">倉庫</span>');
//    	divv2.append('<br>');
//    	divv2.append('<span style="color:black">倉庫</span>');
//    	divv2.append('<br>');
//    	divv2.appendTo(divv);
//        divv.appendTo(inner);
//    }
//    else{
//    	var divv = $('<div class="item"></div>');
//    	divv.append('<img src="img/' + code + '.jpg" alt=""/>');
//        divv.appendTo(inner);
//    }
//}

function change(b){
	var tmp = b.innerText;
	
	if (tmp=="総体在庫一覧"){
		var containers = document.getElementById("thewholeone");
		containers.innerHTML = "";
		var table = $('<table id="thebiggestone" class="table table-hover table-condensed table-striped table-bordered"></table>');
		var thead = $('<thead></thead>');
		var tr2 = $('<tr></tr>');
		tr2.append('<th>倉庫</th>');
		tr2.append('<th>分類</th>');
		tr2.append('<th>コード</th> ');
		tr2.append('<th>メーカー</th>');
		tr2.append('<th>詳細</th>');
		tr2.append('<th>金額</th>');
		tr2.append('<th>残量</th>');
		tr2.append('<th>単位</th>');
		tr2.appendTo(thead);
		thead.appendTo(table);
		
		var tbody = $('<tbody id="tbody-stocks"></tbody>');
		for (var i = 0; i < stocks.length; i++) {
			var stock = stocks[i];
			var tr = $('<tr data-href="stock.html?id=' + stock.stock.id + '"></tr>');
			tr.append('<td>' + stock.whouse.name + '</td>');
			tr.append('<td>' + stock.kind.text + '</td>');
			tr.append('<td>' + stock.item.code + '</td>');
			tr.append('<td>' + stock.item.maker + '</td>');
			tr.append('<td>' + stock.item.detail + '<span class="stockid" style="visibility:hidden">'+ stock.item.code+'</span></td>');
			tr.append('<td style="text-align: right;">' + numberWithCommas(stock.item.price) + '</td>');
			tr.append('<td style="text-align: right;">' + transmap.get(stock.stock.id) + '</td>');
			tr.append('<td>' + stock.item.unit + '</td>');
			tr.appendTo(tbody);
		}
		tbody.appendTo(table);
		table.appendTo(containers);
		$('tbody > tr').css('cursor', 'pointer').on('click', function() {
			window.location = $(this).attr('data-href');
		});
		$("#thebiggestone").DataTable({
			"order":[[3,"asc"]]
		});
		
	}
	
	else if (tmp=="倉庫別"){
		var containers = document.getElementById("thewholeone");
		var warehouseArray = alasql("select w.name from whouse w");
		containers.innerHTML = '';
		var bread = $('<ol class="breadcrumb"></ol>');
		for (var i=0;i<warehouseArray.length;i++){
			var elementOfBread = $('<li><a href="#souko'+ i +'">'+warehouseArray[i].name+'</a></li>');
			elementOfBread.appendTo(bread);
		}
		bread.appendTo(containers);
		console.log(stocks);
		
		
		for (var i=0;i<warehouseArray.length;i++){
			var warename = warehouseArray[i].name;
			console.log(warename);
			var thetable = [];
			for (var j=0;j<stocks.length;j++){
				if (stocks[j].whouse.name===warename) thetable.push(stocks[j]);
			}                                                          //the array for every warehouse is now built
			console.log(thetable);
			// build the table for every whouse
			var subtitle = $('<h4 id="souko'+ i +'">倉庫:' + warename +'の在庫一覧</h4>');
			subtitle.appendTo(containers);
			var subtable = $('<table class="table table-hover table-condensed table-striped table-bordered"><thead><tr><th>倉庫</th><th>分類</th><th>コード</th><th>メーカー</th><th>詳細</th><th>金額</th><th>残量</th><th>単位</th></tr></thead></table>');
//			var subthead = $('<thead><tr><th>倉庫</th><th>分類</th><th>コード</th><th>メーカー</th><th>詳細</th><th>金額</th><th>残量</th><th>単位</th></tr></thead>');
//			var tr2 = $('<tr><th>倉庫</th><th>分類</th><th>コード</th><th>メーカー</th><th>詳細</th><th>金額</th><th>残量</th><th>単位</th></tr>');
//			tr2.append('<th>倉庫</th>');
//			tr2.append('<th>分類</th>');
//			tr2.append('<th>コード</th> ');
//			tr2.append('<th>メーカー</th>');
//			tr2.append('<th>詳細</th>');
//			tr2.append('<th>金額</th>');
//			tr2.append('<th>残量</th>');
//			tr2.append('<th>単位</th>');
//			tr2.appendTo(subthead);
//			subthead.appendTo(subtable);
			
			var subtbody = $('<tbody id="whouseof' + i+ '"></tbody>');
			subtbody.appendTo(subtable);
//			var subtbody = $('#whouseof'+ i);
//			console.log(subtbody.innerHTML);
			for (var m = 0;m<thetable.length;m++){
				var tatmp = thetable[m];
				var tr3 = $('<tr data-href="stock.html?id=' + tatmp.stock.id + '"></tr>');
				tr3.append('<td>'+ tatmp.whouse.name +'</td>');
				tr3.append('<td>'+ tatmp.kind.text +'</td>');
				tr3.append('<td>' + tatmp.item.code + '</td>');
				tr3.append('<td>' + tatmp.item.maker + '</td>');
				tr3.append('<td>' + tatmp.item.detail +'</td>');
				tr3.append('<td style="text-align: right;">' + numberWithCommas(tatmp.item.price) + '</td>');
				tr3.append('<td style="text-align: right;">' + transmap.get(tatmp.stock.id) + '</td>');
				tr3.append('<td>' + tatmp.item.unit + '</td>');
				tr3.appendTo(subtbody);
			}
			subtable.appendTo(containers);
			var miaomiao = $('<br><hr><br>');
			miaomiao.appendTo(containers);
			
		}
	}
	else if (tmp=="詳細別"){
		var containers = document.getElementById("thewholeone");
		var codeArray = alasql("select distinct code from item");
		containers.innerHTML = '';
		var bread = $('<ol class="breadcrumb"></ol>');
		for (var i=0;i<codeArray.length;i++){
			var elementOfBread = $('<li><a href="#code'+ i +'">'+codeArray[i].code+'</a></li>');
			elementOfBread.appendTo(bread);
		}
		bread.appendTo(containers);
		
		
		for (var i=0;i<codeArray.length;i++){
			var codename = codeArray[i].code;
			console.log(codename);
			var thetable = [];
			for (var j=0;j<stocks.length;j++){
				if (stocks[j].item.code === codename) thetable.push(stocks[j]);
			}                                                          //the array for every warehouse is now built
			console.log(thetable);
			// build the table for every whouse
			var subtitle = $('<h3 id="code'+ i +'"><span class="label label-warning">コード:' + codename +'の在庫一覧</span></h3>');
//			var subtitle = $('<h4 id="code'+ i +'">コード:' + codename +'の在庫一覧</h4>');
			subtitle.appendTo(containers);
			var subtable = $('<table class="table table-hover table-condensed table-striped table-bordered"></table>');
			var subthead = $('<thead></thead>');
			var tr2 = $('<tr></tr>');
			tr2.append('<th>倉庫</th>');
			tr2.append('<th>分類</th>');
			tr2.append('<th>コード</th> ');
			tr2.append('<th>メーカー</th>');
			tr2.append('<th>詳細</th>');
			tr2.append('<th>金額</th>');
			tr2.append('<th>残量</th>');
			tr2.append('<th>単位</th>');
			tr2.appendTo(subthead);
			subthead.appendTo(subtable);
			
			var subtbody = $('<tbody id="codeof' + codename + '"></tbody>');
			
			for (var m = 0;m<thetable.length;m++){
				var tatmp = thetable[m];
				var tr3;
				if (i%2==1) tr3 = $('<tr class="success" data-href="stock.html?id=' + tatmp.stock.id + '"></tr>');
				else tr3 = $('<tr data-href="stock.html?id=' + tatmp.stock.id + '"></tr>');
				tr3.append('<td>'+ tatmp.whouse.name +'</td>');
				tr3.append('<td>'+ tatmp.kind.text +'</td>');
				tr3.append('<td>' + tatmp.item.code + '</td>');
				tr3.append('<td>' + tatmp.item.maker + '</td>');
				tr3.append('<td>' + tatmp.item.detail +'</td>');
				tr3.append('<td style="text-align: right;">' + numberWithCommas(tatmp.item.price) + '</td>');
				tr3.append('<td style="text-align: right;">' + transmap.get(tatmp.stock.id) + '</td>');
				tr3.append('<td>' + tatmp.item.unit + '</td>');
				tr3.appendTo(subtbody);
			}
			subtbody.appendTo(subtable);
			subtable.appendTo(containers);
			var miaomiao = $('<br><hr><br>');
			miaomiao.appendTo(containers);
		}	
	}
	else if (tmp=="メーカー別"){
		var containers = document.getElementById("thewholeone");
		var makerArray = alasql("select distinct maker from item");
		containers.innerHTML = '';
		var bread = $('<ol class="breadcrumb"></ol>');
		for (var i=0;i<makerArray.length;i++){
			var elementOfBread = $('<li><a href="#maker'+ i +'">'+makerArray[i].maker+'</a></li>');
			elementOfBread.appendTo(bread);
		}
		bread.appendTo(containers);
		console.log(makerArray);
		
		for (var i=0;i<makerArray.length;i++){
			var makername = makerArray[i].maker;
			console.log(makername);
			var thetable = [];
			for (var j=0;j<stocks.length;j++){
				if (stocks[j].item.maker === makername) thetable.push(stocks[j]);
			}                                                          //the array for every warehouse is now built
			console.log(thetable);
			// build the table for every whouse
			var subtitle = $('<h3 id="maker'+ i +'"><span class="label label-warning">メーカー:' + makername +'の在庫一覧</span></h3>');
//			var subtitle = $('<h4 id="code'+ i +'">コード:' + codename +'の在庫一覧</h4>');
			subtitle.appendTo(containers);
			var subtable = $('<table class="table table-hover table-condensed table-striped table-bordered"></table>');
			var subthead = $('<thead></thead>');
			var tr2 = $('<tr></tr>');
			tr2.append('<th>倉庫</th>');
			tr2.append('<th>分類</th>');
			tr2.append('<th>コード</th> ');
			tr2.append('<th>メーカー</th>');
			tr2.append('<th>詳細</th>');
			tr2.append('<th>金額</th>');
			tr2.append('<th>残量</th>');
			tr2.append('<th>単位</th>');
			tr2.appendTo(subthead);
			subthead.appendTo(subtable);
			
			var subtbody = $('<tbody id="makerof' + makername + '"></tbody>');
			
			for (var m = 0;m<thetable.length;m++){
				var tatmp = thetable[m];
				var tr3;
				if (i%2==1) tr3 = $('<tr class="success" data-href="stock.html?id=' + tatmp.stock.id + '"></tr>');
				else tr3 = $('<tr data-href="stock.html?id=' + tatmp.stock.id + '"></tr>');
				tr3.append('<td>'+ tatmp.whouse.name +'</td>');
				tr3.append('<td>'+ tatmp.kind.text +'</td>');
				tr3.append('<td>' + tatmp.item.code + '</td>');
				tr3.append('<td>' + tatmp.item.maker + '</td>');
				tr3.append('<td>' + tatmp.item.detail +'</td>');
				tr3.append('<td style="text-align: right;">' + numberWithCommas(tatmp.item.price) + '</td>');
				tr3.append('<td style="text-align: right;">' + transmap.get(tatmp.stock.id) + '</td>');
				tr3.append('<td>' + tatmp.item.unit + '</td>');
				tr3.appendTo(subtbody);
			}
			subtbody.appendTo(subtable);
			subtable.appendTo(containers);
			var miaomiao = $('<br><hr><br>');
			miaomiao.appendTo(containers);
		}	
	
	}
	else if (tmp=="コード別"){
		var containers = document.getElementById("thewholeone");
		var kindArray = alasql("select distinct text from kind");
		containers.innerHTML = '';
		var bread = $('<ol class="breadcrumb"></ol>');
		for (var i=0;i<kindArray.length;i++){
			var elementOfBread = $('<li><a href="#kind'+ i +'">'+kindArray[i].text+'</a></li>');
			elementOfBread.appendTo(bread);
		}
		bread.appendTo(containers);
		console.log(kindArray);
		
		
		for (var i=0;i<kindArray.length;i++){
			var kindname = kindArray[i].text;
			console.log(kindname);
			var thetable = [];
			for (var j=0;j<stocks.length;j++){
				if (stocks[j].kind.text === kindname) thetable.push(stocks[j]);
			}                                                          //the array for every warehouse is now built
			console.log(thetable);
			// build the table for every whouse
			var subtitle = $('<h3 id="kind'+ i +'"><span class="label label-warning">分類:' + kindname +'の在庫一覧</span></h3>');
//			var subtitle = $('<h4 id="code'+ i +'">コード:' + codename +'の在庫一覧</h4>');
			subtitle.appendTo(containers);
			var subtable = $('<table class="table table-hover table-condensed table-striped table-bordered"></table>');
			var subthead = $('<thead></thead>');
			var tr2 = $('<tr></tr>');
			tr2.append('<th>倉庫</th>');
			tr2.append('<th>分類</th>');
			tr2.append('<th>コード</th> ');
			tr2.append('<th>メーカー</th>');
			tr2.append('<th>詳細</th>');
			tr2.append('<th>金額</th>');
			tr2.append('<th>残量</th>');
			tr2.append('<th>単位</th>');
			tr2.appendTo(subthead);
			subthead.appendTo(subtable);
			
			var subtbody = $('<tbody id="kindof' + kindname + '"></tbody>');
			
			for (var m = 0;m<thetable.length;m++){
				var tatmp = thetable[m];
				var tr3;
				if (i%2==1) tr3 = $('<tr class="success" data-href="stock.html?id=' + tatmp.stock.id + '"></tr>');
				else tr3 = $('<tr data-href="stock.html?id=' + tatmp.stock.id + '"></tr>');
				tr3.append('<td>'+ tatmp.whouse.name +'</td>');
				tr3.append('<td>'+ tatmp.kind.text +'</td>');
				tr3.append('<td>' + tatmp.item.code + '</td>');
				tr3.append('<td>' + tatmp.item.maker + '</td>');
				tr3.append('<td>' + tatmp.item.detail +'</td>');
				tr3.append('<td style="text-align: right;">' + numberWithCommas(tatmp.item.price) + '</td>');
				tr3.append('<td style="text-align: right;">' + transmap.get(tatmp.stock.id) + '</td>');
				tr3.append('<td>' + tatmp.item.unit + '</td>');
				tr3.appendTo(subtbody);
			}
			subtbody.appendTo(subtable);
			subtable.appendTo(containers);
			var miaomiao = $('<br><hr><br>');
			miaomiao.appendTo(containers);
		}
	}
}

$('.carousel').carousel();
$('#myModal').modal();
