var savenumberclicked = 0; // used to count # of click in zaikosuu tyousei
var savesoukoclicked = 0;
var savenumberarray = []; // used to store
var savenumberarray1 = [];
var savenumberarray2 = [];
var arrayfornumber = []; // this one is used to store all the 在庫数変更 string in
// order to check duplicate
var arrayforsouko = [];
var arrayforkinyuu = [];
var arrayforkinyuu2 = [];


var itemarrays = alasql('select detail from item');
var itemstring = [];
for (var i = 0; i < itemarrays.length; i++) {
	itemstring.push(itemarrays[i].detail);
}
itemstring.sort();

/*******************************************************************************
 * for kinyu
 ******************************************************************************/
var countjidoukinyuu = 0;
var countjidoukinyuu2 = 0;
var tempforstockkinyuu = new Map();
var redlightstockmap = new Map(); // 用来记录那些交易量变成负数的货品
var counttekinyuu = 0;
var counttekinyuu2 = 0;

var countkinyuucheck = 0;
var countsyukkocheck = 0;
var allcsvmap = new Map();
var allcsvmap2 = new Map();
var allcsvmap3 = new Map();
var allcsvmap4 = new Map();
var allcsvmap5 = new Map();
var allcsvmap6 = new Map();
var allcsvmapx = new Map();

var countsansyoucheck = 0;

/** ************************************************************* */

var tempforstock = new Map(); // 用来查看仓库转译的时候是否出现了新的stock，出现的话就保存到temp里面去
var maincontent = document.getElementById("pushobj1");
var subcontent = document.getElementById("pushobjx");
var itemprice = alasql('select detail,price from item');
var whouses = alasql('select * from whouse');

var whouseMap = new Map();
var whouseMapRev = new Map();
whouseMap.set(0, "東京１");
whouseMap.set(1, "東京２");
whouseMap.set(2, "大阪");
whouseMap.set(3, "福岡");
whouseMapRev.set("東京１", 0);
whouseMapRev.set("東京２", 1);
whouseMapRev.set("大阪", 2);
whouseMapRev.set("福岡", 3);
var itemzaiko = alasql('select stock, sum(qty) as truebalance from trans group by stock');

var whitmap = new Map();
var whitmapreverse = new Map();
var whit = alasql('select * from stock');

for (var i = 0; i < whit.length; i++) {
	var whitele = whit[i];
	whitmap.set(whitele.stock.id, [ whitele.stock.item, whitele.stock.whouse ]);
	whitmapreverse.set(whitele.stock.item + ',' + whitele.stock.whouse,
			whitele.stock.id);
}

var whmap = new Map();
var wh = alasql('select * from whouse');
for (var i = 0; i < wh.length; i++) {
	var whitele = wh[i];
	whmap.set(whitele.whouse.id, whitele.whouse.name);
}

var itmap = new Map();
var it = alasql('select * from item');
for (var i = 0; i < it.length; i++) {
	var whitele = it[i];
	itmap.set(whitele.item.id, whitele.item.detail);
}

var finalmap = new Map();
for (var i = 0; i < itemzaiko.length; i++) {
	var ize = itemzaiko[i];
	finalmap.set(ize.stock, {
		detail : itmap.get(whitmap.get(ize.stock)[0]),
		whouse : whmap.get(whitmap.get(ize.stock)[1]),
		stock : ize.truebalance
	});
}

// 四个array用来分出四个仓库里面都有啥
var tokyo1 = new Map(), tokyo2 = new Map(), osaka = new Map(), fukuoka = new Map();
var tokyo1cache = new Map(), tokyo2cache = new Map(), osakacache = new Map(), fukuokacache = new Map();
var together = [];
var togethercache = [];

var today = new Date();
var ye = today.getFullYear();
var mo = today.getMonth() + 1;
var day = today.getDate();
console.log(ye + ',' + mo + ',' + day);
var todaystring;
if (mo < 10 && day < 10)
	todaystring = ye + '-0' + mo + '-0' + day;
else if (mo < 10)
	todaystring = ye + '-0' + mo + '-' + day;
else if (day < 10)
	todaystring = ye + '-' + mo + '-0' + day;
else
	todaystring = ye + '-' + mo + '-' + day;
var date = new Date(ye, mo - 1, day);

var flag = 0;
var countmoneychange = 0;
var countnumchange = 0;
var countsoukochange = 0;

/*******************************************************************************
 * initiate the table
 * 
 * 
 ******************************************************************************/

var ptable = $('<table class="table-striped table-condensed" id="ptable" style="width:100%;"></table>');
var ptbody = $('<tbody id="ptbody"></tbody>');
var ntable = $('<table class="table-striped table-condensed" id="ntable" style="width:100%;"></table>');
var ntbody = $('<tbody id="ntbody"></tbody>');
var ftable = $('<table class="table-striped table-condensed" id="ftable" style="width:100%;"></table>');
var ftbody = $('<tbody id="ftbody"></tbody>');

ptbody.appendTo(ptable);
// pasttable.appendTo(pastdiv);
ntbody.appendTo(ntable);
// ntable.appendTo(nowdiv);
ftbody.appendTo(ftable);
// ftable.appendTo(futurediv);

var trp = $('<tr></tr>');
var trn = $('<tr></tr>');
var trf = $('<tr></tr>');
trp.append('<th>アイテム</th>');
trn.append('<th>アイテム</th>');
trf.append('<th>アイテム</th>');
trp.append('<th>倉庫先</th>');
trn.append('<th>倉庫先</th>');
trf.append('<th>倉庫先</th>');
trp.append('<th>数量</th>');
trn.append('<th>数量</th>');
trf.append('<th>数量</th>');
trp.append('<th>入庫日</th>');
trn.append('<th>入庫日</th>');
trf.append('<th>入庫予定日</th>');
trp.append('<th>備考</th>');
trn.append('<th>備考</th>');
trf.append('<th>備考</th>');
trp.append('<th>キャンセル</th>');
trn.append('<th>キャンセル</th>');
trf.append('<th>キャンセル</th>');
trp.append('<th>変更</th>');
trn.append('<th>変更</th>');
trf.append('<th>変更</th>');
trp.appendTo(ptbody);
trn.appendTo(ntbody);
trf.appendTo(ftbody);

// ----------------------------------------------------------------------------//

var ptable2 = $('<table class="table-striped table-condensed" id="ptable2" style="width:100%;"></table>');
var ptbody2 = $('<tbody id="ptbody2"></tbody>');
var ntable2 = $('<table class="table-striped table-condensed" id="ntable2" style="width:100%;"></table>');
var ntbody2 = $('<tbody id="ntbody2"></tbody>');
var ftable2 = $('<table class="table-striped table-condensed" id="ftable2" style="width:100%;"></table>');
var ftbody2 = $('<tbody id="ftbody2"></tbody>');

ptbody2.appendTo(ptable2);
// pasttable.appendTo(pastdiv);
ntbody2.appendTo(ntable2);
// ntable.appendTo(nowdiv);
ftbody2.appendTo(ftable2);
// ftable.appendTo(futurediv);

var trp2 = $('<tr></tr>');
var trn2 = $('<tr></tr>');
var trf2 = $('<tr></tr>');
trp2.append('<th>アイテム</th>');
trn2.append('<th>アイテム</th>');
trf2.append('<th>アイテム</th>');
trp2.append('<th>倉庫元</th>');
trn2.append('<th>倉庫元</th>');
trf2.append('<th>倉庫元</th>');
trp2.append('<th>数量</th>');
trn2.append('<th>数量</th>');
trf2.append('<th>数量</th>');
trp2.append('<th>出庫日</th>');
trn2.append('<th>出庫日</th>');
trf2.append('<th>出庫予定日</th>');
trp2.append('<th>備考</th>');
trn2.append('<th>備考</th>');
trf2.append('<th>備考</th>');
trn2.append('<th>異常</th>');
trf2.append('<th>異常</th>');
trp2.append('<th>キャンセル</th>');
trn2.append('<th>キャンセル</th>');
trf2.append('<th>キャンセル</th>');
trp2.append('<th>変更</th>');
trn2.append('<th>変更</th>');
trf2.append('<th>変更</th>');
trp2.appendTo(ptbody2);
trn2.appendTo(ntbody2);
trf2.appendTo(ftbody2);

/** *************************************************************************************** */

/*******************************************************************************
 * a map item.id -> item.detail refreshed in refresh
 ******************************************************************************/
var itemmap = new Map();

function refresh() { // used to refresh necessary global arguments
	// and it looks dumb
	itemprice = alasql('select detail,price from item');
	itemzaiko = alasql('select stock, sum(qty) as truebalance from trans group by stock');
	whitmap = new Map();
	whitmapreverse = new Map();
	whit = alasql('select * from stock');

	for (var i = 0; i < whit.length; i++) {
		var whitele = whit[i];
		whitmap.set(whitele.stock.id, [ whitele.stock.item,
				whitele.stock.whouse ]);
		whitmapreverse.set(whitele.stock.item + ',' + whitele.stock.whouse,
				whitele.stock.id);
	}

	whmap = new Map();
	var wh = alasql('select * from whouse');
	for (var i = 0; i < wh.length; i++) {
		var whitele = wh[i];
		whmap.set(whitele.whouse.id, whitele.whouse.name);
	}

	itmap = new Map();
	var it = alasql('select * from item');
	for (var i = 0; i < it.length; i++) {
		var whitele = it[i];
		itmap.set(whitele.item.id, whitele.item.detail);
	}

	finalmap = new Map();
	for (var i = 0; i < itemzaiko.length; i++) {
		var ize = itemzaiko[i];
		finalmap.set(ize.stock, {
			detail : itmap.get(whitmap.get(ize.stock)[0]),
			whouse : whmap.get(whitmap.get(ize.stock)[1]),
			stock : ize.truebalance
		});
	}

	console.log(finalmap);

	tokyo1 = new Map(), tokyo2 = new Map(), osaka = new Map(),
			fukuoka = new Map();
	tokyo1cache = new Map(), tokyo2cache = new Map(), osakacache = new Map(),
			fukuokacache = new Map();

	var fm = finalmap.keys();
	while (true) {
		var key = fm.next().value;
		if (key != null) {
			var value = finalmap.get(key);
			if (value.whouse == "東京１") {
				tokyo1.set(key, value);
				tokyo1cache.set(key, value);
			}
			if (value.whouse == "東京２") {
				tokyo2.set(key, value);
				tokyo2cache.set(key, value);
			}
			if (value.whouse == "大阪") {
				osaka.set(key, value);
				osakacache.set(key, value);
			}
			if (value.whouse == "福岡") {
				fukuoka.set(key, value);
				fukuokacache.set(key, value);
			}
		} else
			break;
	}
	together = [];
	togethercache = [];
	together.push(tokyo1);
	together.push(tokyo2);
	together.push(osaka);
	together.push(fukuoka);
	togethercache.push(tokyo1cache);
	togethercache.push(tokyo2cache);
	togethercache.push(osakacache);
	togethercache.push(fukuokacache);

	var itemfromtable = alasql('select id,detail from item');
	for (var i = 0; i < itemfromtable.length; i++) {
		var ele = itemfromtable[i];
		itemmap.set(ele.detail, ele.id);
	}
	
}

// !!!!!!!! remember to set countmoneychange to 0 when triggering other
// functions!!!!!!
// do this if have time : the revenue should change according to the change of
// price
// 另一个问题:当预定出库数量高于实际的库存时,需要在此次交易背后提醒负责人已经没有足够库存了,这个数字是通过计算当年已知的交易来进行计算的.
// 因此在表格输出时,table的最右边还需要另一个提示，那就是给负责人发邮件，提醒库存不足。或者直接取消
// 如何计算收入？直接甩一个数据库。。。。。。。。
// 総売り上げ（総個別） 各倉庫の各月の売り上げ変化図 各倉庫の売り上げ構成 各倉庫の

function instruction() {
	refreshfirstpart();
	countsyukkocheck = 0;
	countsansyoucheck = 0;
	countkinyuucheck = 0;
	clearall();
	document.getElementById("pushobj1").innerHTML = '<h3>注意事項</h3><hr>';
	document.getElementById("pushobj1").innerHTML +='<br><p>1.この在庫管理システムの使用手順は：<ul><li>A.自動入庫記入と緊急手記入</li><li>B.自動出庫記入と緊急手記入</li>\
		<li>C.棚卸（前日の23:59:59時点の実際在庫数を基準とする）</li><li>D.本日入庫チェック</li><li>E.本日出庫チェック</li><li>F.そのほか</li></ul></p>';
	document.getElementById("pushobj1").innerHTML += '<br><p>2.記入した入庫/出庫数と実際の入庫/出庫数について：商品には、出/入庫記録をシステムに登録するという記入日と、実際に出/入庫した日付という二つの属性があります。\
		それゆえ、実際に入庫/出庫するとき、前に記録した情報と不一致する場合もあります。「今年の入庫/出庫誤差参照」機能は、毎月の不一致量をグラフの形で表示する機能です。</p>';
	document.getElementById("pushobj1").innerHTML += '<br><p>3.記入機能は発注･受注だけではなく、遺漏データの記入なども対応できます。</p>';
	document.getElementById("pushobj1").innerHTML += '<br><p>4.「未来在庫不足商品参照」について：すでに記入した発注/受注情報に基づいて、ある商品が未来の某時点で在庫不足になるとシステムが計算を通して\
		判断すると、この機能を使えば商品と商品の情報を参照できます。</p>';
	document.getElementById("pushobj1").innerHTML += '<br><p>5.ホームページには本日の任務リマインダーと在庫数低下商品情報が記載されています。</p>';
    document.getElementById("pushobj1").innerHTML += '<br><p>6.詳しい説明はreadmeを参照してください。</p>';	
}

/** ********************************************************************************************************** */

// this function changes the money
function moneychange() {
	// first, get the list of (item,price);

	countnumchange = 0;
	countsoukochange = 0;
	counttekinyuu = 0;
	counttekinyuu2 = 0;
	countjidoukinyuu = 0;
	countjidoukinyuu2 = 0;
	savenumberclicked = 0;
	savesoukoclicked = 0;
	refreshsecondpart();
	refresh();
	if (countmoneychange === 0) {
		maincontent.innerHTML = "";
		subcontent.innerHTML = "";
		document.getElementById("pushobjxx").innerHTML = '';
		document.getElementById("pushobjx").innerHTML = '';
		document.getElementById("pushobj1").innerHTML = '';
		document.getElementById("pushobj2").innerHTML = '';
		document.getElementById("pushobj3").innerHTML = '';
		if (document.getElementById("rightpanel") != null) {

			document.getElementById("rightpanel").parentNode
					.removeChild(document.getElementById("rightpanel"));
		}
		console.log(itemprice);
		var tdiv = $('<div id="tablediv"></div>');
		var table = $('<table class="table-striped table-condensed table-bordered table-hover" id="moneytable"></table>');
		var tbody = $('<tbody id="moneybody"></tbody>');
		var tr1 = $('<tr></tr>');
		tr1.append('<th>item</th>');
		tr1.append('<th>price</th>');
		tr1.appendTo(tbody);
		for (var i = 0; i < itemprice.length; i++) {
			var ip = itemprice[i];
			var tr2 = $('<tr id="ip' + i + '"></tr>');
			tr2.append('<td>' + ip.detail + '</td>');
			tr2.append('<td>' + ip.price + '</td>');
			tr2.appendTo(tbody);
		}
		tbody.appendTo(table);
		table.appendTo(tdiv);
		tdiv.appendTo($('#pushobj1')); // the table is now built

		// second, build the input list
		// how to make an onclick function on option? use onchange
		$('#pushobjx')
				.append(
						'	<form class="form-inline text-center">\
			<div class="form-group">\
			<label>choose item</label> <select name="q33" class="form-control"\
				id="moneyitem" style="margin-left:10px;" onchange="highlight(this)">\
				<option value="0">未選択</option>\
			</select>\
		</div>\
	</form><br><br>');

		for (var i = 0; i < itemprice.length; i++) {
			var ip = itemprice[i];
			console.log(ip.detail);
			var option = $('<option>');
			option.attr('value', ip.detail);
			option.attr('id', 'iip' + i);
			option.text(ip.detail);
			$('select[name="q33"]').append(option);
		}

		$("#pushobjx")
				.append(
						'	<form class="form-inline text-center">\
	       <div class="form-group has-success has-feedback">\
			<label>enter new price</label><input type="text" name="q34" value="" placeholder="00000" class="form-control" id="newprice"\
			style="margin-left:10px;">\
			</div></form><br><br>\
	');

		$("#pushobjx")
				.append(
						'<button class="btn btn-block btn-info btn-round" onclick="updatemoney()">確定</button><br>');
	}

	countmoneychange++;
}

var moneyid;

function highlight(event) {
	for (var i = 0; i < itemprice.length; i++) {
		$('#ip' + i).removeAttr('style');
	}
	moneyid = event[event.selectedIndex].id.substring(1);
	console.log(moneyid);
	var hightr = $('#' + moneyid);
	hightr.attr('style', 'background-color:yellow;');
	console.log(document.getElementById('' + moneyid));
}

// to test if is a number
function valueIsNaN(v) {
	return v !== v;
}

// how to trigger the enter button in different situations

function updatemoney() {

	var q33 = $("#moneyitem").val() || '';
	$('select[name="q33"]').val(q33);
	console.log(q33);
	if (q33 === '0')
		alert("please select a proper item");
	else {
		var q34 = $("#newprice").val() || '';
		var moneyorder = parseInt(moneyid.substring(2));
		console.log(moneyorder);
		$('input[name="q34"]').val(q34);
		if (!q34) {
			alert("please enter a proper number");
			return;
		}

		for (var i = 0; i < q34.length; i++) {
			if (valueIsNaN(parseInt(q34.charAt(i)))) {
				alert("please enter a proper number");
				return;
			}
		}
		var newprice = parseInt(q34);
		console.log(newprice);
		var rows = document.getElementsByTagName('tr');
		var currentprice = rows[moneyorder + 1].getElementsByTagName('td')[1];
		var currentitem = rows[moneyorder + 1].getElementsByTagName('td')[0].innerText;
		console.log(currentitem);
		currentprice.innerText = q34;
		var arraytoupdate = alasql('select * from item where detail =?',
				[ currentitem ]);
		var trueone = arraytoupdate[0];
		console.log(arraytoupdate);
		var thenewarray = [];
		thenewarray.push(trueone.item.id);
		thenewarray.push(trueone.item.code);
		thenewarray.push(trueone.item.kind);
		thenewarray.push(trueone.item.detail);
		thenewarray.push(trueone.item.maker);
		thenewarray.push(newprice);
		thenewarray.push(trueone.item.unit);
		thenewarray.push(trueone.item.detail);
		console.log(thenewarray);
		alasql(
				'update item SET \
					id = ?,\
					code = ?,\
					kind = ?,\
					detail = ?,\
					maker = ?,\
					price = ?,\
					unit = ?\
					where detail=?',
				thenewarray);
		console
				.log(alasql('select * from item where detail=?',
						[ currentitem ]));
	}
}

/*******************************************************************************
 * 
 * 
 * 
 * 
 ******************************************************************************/
function numchange() {
	// remember to insert the change to trans database
	countmoneychange = 0;
	savenumberclicked = 0;
	countsoukochange = 0;
	savesoukoclicked = 0;
	counttekinyuu = 0;
	counttekinyuu2 = 0;
	countjidoukinyuu = 0;
	countjidoukinyuu2 = 0;
	refreshsecondpart();
	refresh();
	if (countnumchange == 0) {
		maincontent.innerHTML = "";
		subcontent.innerHTML = "";
		document.getElementById("pushobjxx").innerHTML = '';
		document.getElementById("pushobjx").innerHTML = '';
		document.getElementById("pushobj1").innerHTML = '';
		document.getElementById("pushobj2").innerHTML = '';
		document.getElementById("pushobj3").innerHTML = '';
		if (document.getElementById("rightpanel") != null) {

			document.getElementById("rightpanel").parentNode
					.removeChild(document.getElementById("rightpanel"));
		}

		$('#pushobj1')
				.append(
						'	<br><br><form class="form-inline text-center">\
		<div class="form-group">\
		<label>choose warehouse</label> <select name="q35" class="form-control"\
			id="numberwhouse" style="margin-left:10px;" onchange="rotation(this)">\
			<option value="0">未選択</option>\
		</select>\
						<label style="margin-left:20px;">choose item</label> <select name="q36" class="form-control"\
						id="numberitem" style="margin-left:10px;" onchange="rotation2(this)">\
						<option value="0">未選択</option>\
					</select>\
	</div>\
</form><br><br>');
		for (var i = 0; i < whouses.length; i++) {
			var ip = whouses[i];
			console.log(ip.whouse.name);
			var option = $('<option>');
			option.attr('value', ip.whouse.name);
			option.attr('id', 'inw' + i);
			option.text(ip.whouse.name);
			$('select[name="q35"]').append(option);
		}
	}
	// var rowws =
	// document.getElementById("numbertable").rows[1].getElementsByTagName("td");
	// console.log(rowws);
	countnumchange++;
}

function rotation(event) {
	// renew the second select box
	document.getElementById("numberitem").innerHTML = '<option value="0">未選択</option>';
	if (document.getElementById("newnumberr2") != null)
		document.getElementById("newnumberr2").innerHTML = '';
	if (document.getElementById("newmemor2") != null)
		document.getElementById("newmemor2").innerHTML = '';
	if (document.getElementById("currentstock") != null)
		document.getElementById("currentstock").innerHTML = '';
	if (document.getElementById("renewedstockp") != null)
		document.getElementById("renewedstockp").innerHTML = '';
	var numberwhid = event[event.selectedIndex].id;
	console.log(numberwhid);
	if (numberwhid) {
		if (numberwhid == "inw0") { // box with all those in tokyo1
			var inw0 = tokyo1.keys();
			while (true) {
				var key = inw0.next().value;
				if (key != null) {
					var option = $('<option>');
					option.attr('value', tokyo1.get(key).detail);
					option.attr('id', '0inw' + key);
					option.text(tokyo1.get(key).detail);
					$('select[name="q36"]').append(option);
				} else
					break;
			}
		}
		if (numberwhid == "inw1") { // box with all those in tokyo1
			var inw1 = tokyo2.keys();
			while (true) {
				var key = inw1.next().value;
				if (key != null) {
					var option = $('<option>');
					option.attr('value', tokyo2.get(key).detail);
					option.attr('id', '1inw' + key);
					option.text(tokyo2.get(key).detail);
					$('select[name="q36"]').append(option);
				} else
					break;
			}
		}
		if (numberwhid == "inw2") { // box with all those in tokyo1
			var inw2 = osaka.keys();
			while (true) {
				var key = inw2.next().value;
				if (key != null) {
					var option = $('<option>');
					option.attr('value', osaka.get(key).detail);
					option.attr('id', '2inw' + key);
					option.text(osaka.get(key).detail);
					$('select[name="q36"]').append(option);
				} else
					break;
			}

		}
		if (numberwhid == "inw3") { // box with all those in tokyo1
			var inw3 = fukuoka.keys();
			while (true) {
				var key = inw3.next().value;
				if (key != null) {
					var option = $('<option>');
					option.attr('value', fukuoka.get(key).detail);
					option.attr('id', '3inw' + key);
					option.text(fukuoka.get(key).detail);
					$('select[name="q36"]').append(option);
				} else
					break;
			}
		}
	}
}

var tmpwid, tmpiid, tmpwistock;

function rotation2(event) {
	document.getElementById("pushobj2").innerHTML = "";
	var numwhitid = event[event.selectedIndex].id;
	console.log(numwhitid);
	var wid = parseInt(numwhitid.substring(0, 1)); // which whouse
	var iid = parseInt(numwhitid.substring(4)); // which stock
	// var wistock = together[wid][iid].stock;
	var wistock = together[wid].get(iid).stock;
	tmpwid = wid;
	tmpiid = iid;
	tmpwistock = wistock;
	document.getElementById("pushobj2").innerHTML = '<p>the original stock for this item is:<span style="color:red;" id="currentstock"> '
			+ wistock + '</span></p>';
	document.getElementById("pushobj2").innerHTML += '<div><button id="zouka" class="btn btn-default" onclick="zouka(this)"\
		>増加</button>\
		<button id="gensyou" class="btn btn-default" onclick="zouka(this)">減少</button>\
		</div>';
	document.getElementById("pushobj2").innerHTML += '<div><p>please enter the amount: <input name="q37" type="text" class="form-control"\
		placeholder="000" id="newnumberr2"></p></div>';
	document.getElementById("pushobj2").innerHTML += '<div><p>please enter the reason:<input name="q38" type="text" class="form-control"\
		placeholder="記入ミスなどの原因" id="newmemor2"></p></div>';
	document.getElementById("pushobj2").innerHTML += '<div class="alert alert-warning">入力された新在庫数とメモをもう一度確かめてください！</div>';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-round btn-success" onclick="savenumber(this)" id="'
			+ wid
			+ ","
			+ iid
			+ ","
			+ wistock
			+ ","
			+ 'savenumber">確定</button></div>';
	document.getElementById("pushobj2").innerHTML += '<p id="renewedstockp">the current stock for this item is: <span id="renewedstock" style="color:red"></p>';
}

function zouka(b) {
	var id = $(b).attr("id");
	var aa = $("button#zouka"), bb = $("button#gensyou");
	if (id == "zouka") {
		if (aa.hasClass("btn-default") && bb.hasClass("btn-default")) {
			aa.removeClass("btn-default");
			aa.addClass("btn-success");
		} else if (aa.hasClass("btn-default") && bb.hasClass("btn-danger")) {
			bb.removeClass("btn-danger");
			bb.addClass("btn-default");
			aa.removeClass("btn-default");
			aa.addClass("btn-success");
		}
	} else {
		if (bb.hasClass("btn-default")) {
			if (aa.hasClass("btn-success")) {
				aa.removeClass("btn-success");
				aa.addClass("btn-default");
			}
			bb.removeClass("btn-default");
			bb.addClass("btn-danger");
		}
	}
}

function savenumber(b) {
	var flag = false;
	var idarray = $(b).attr("id").split(",");
	console.log(idarray); // wid+stockid+stock
	var thiswhouseid = parseInt(idarray[0]);
	var thisstockid = parseInt(idarray[1]);
	var thisstock = parseInt(idarray[2]);
	console.log(together[thiswhouseid].get(thisstockid).stock);

	if ($("button#gensyou").hasClass("btn-default")
			&& $("button#zouka").hasClass("btn-default")) {
		alert("増加と減少、どっちにしたいですか？");
		return;
	}

	var q37 = $("#newnumberr2").val() || '';
	$('input[name="q37"]').val(q37);
	if (!q37)
		alert("please enter a proper number");
	else {
		for (var i = 0; i < q37.length; i++) {
			if (valueIsNaN(parseInt(q37.charAt(i)))) {
				alert("please enter a proper number");
				return;
			}
		}
		if (parseInt(q37) == 0) {
			alert("You did not actually change the stock");
			return;
		}
		var q38 = $("#newmemor2").val() || '';
		$('input[name="q38"]').val(q38);
		if (!q38) {
			alert("メモを記入してください");
			return;
		}

		// 判断如果是减少的情况，输入的数字是否比原库存量少
		// checked , working
		if ($("button#gensyou").hasClass("btn-danger")
				&& togethercache[thiswhouseid].get(thisstockid).stock < parseInt(q37)) {
			alert("現在の在庫数に超えています");
			return;
		}

		/** ***************************** */
		// for check duplicate
		var zorg = $("button#gensyou").hasClass("btn-danger") ? "減少" : "増加";
		var quanjiatong = thiswhouseid + ',' + thisstockid + ',' + zorg + ','
				+ parseInt(q37) + ',' + q38;
		console.log(quanjiatong);
		if (arrayfornumber.includes(quanjiatong)) {
			alert("duplicate");
			return;
		} else
			arrayfornumber.push(quanjiatong);

		/** ***************************** */

		// now number and memo is prepared, we need to make a table
		if (savenumberclicked == 0) {
			var numdiv = $('<div></div>');
			var numtable = $('<table id="numtable" class="table-striped table-condensed table-bordered table-hover" ></table>'), numtbody = $('<tbody id="numtbody"></tbody>');
			var numtr = $('<tr></tr>');
			numtr.append('<th>商品名</th>');
			numtr.append('<th>倉庫</th>');
			numtr.append('<th>増減</th>');
			numtr.append('<th>数量</th>');
			numtr.append('<th>メモ</th>');
			numtr.append('<th>キャンセル</th>');
			numtr.append('<th>変更</th>')
			numtr.appendTo(numtbody);
			numtbody.appendTo(numtable);
			numtable.appendTo(numdiv);
			numdiv.appendTo($('#pushobjxx'));
			$('#pushobjxx')
					.append(
							'<button class="btn btn-primary" onclick="numbersubmit()"　style="margin:auto;">サブミット</button>');
			savenumberclicked++;
		}

		// remember to change the data in together
		var numtr2 = $('<tr id="' + thiswhouseid + ',' + thisstockid + ','
				+ together[thiswhouseid].get(thisstockid).stock + ','
				+ parseInt(q37) + ',' + q38 + '"></tr>');
		numtr2.append('<td id="' + thisstockid + '">'
				+ together[thiswhouseid].get(thisstockid).detail + '</td>');
		numtr2.append('<td id="' + thiswhouseid + '">'
				+ together[thiswhouseid].get(thisstockid).whouse + '</td>');
		// numtr2.append('<td>' + together[thiswhouseid].get(thisstockid).stock
		// + '</td>');
		if ($("button#zouka").hasClass("btn-success")) {
			numtr2.append('<td id="numhenkosign,' + thiswhouseid + ','
					+ thisstockid + ','
					+ together[thiswhouseid].get(thisstockid).stock + ','
					+ parseInt(q37) + ',' + q38 + '">増加</td>');
			flag = true;
		} else {
			numtr2.append('<td id="numhenkosign,' + thiswhouseid + ','
					+ thisstockid + ','
					+ together[thiswhouseid].get(thisstockid).stock + ','
					+ parseInt(q37) + ',' + q38 + '">減少</td>');
			flag = false;
		}
		numtr2.append('<td id="numhenkonum,' + thiswhouseid + ',' + thisstockid
				+ ',' + together[thiswhouseid].get(thisstockid).stock + ','
				+ parseInt(q37) + ',' + q38 + '">' + parseInt(q37) + '</td>');
		numtr2.append('<td id="numhenkomemo,' + thiswhouseid + ','
				+ thisstockid + ','
				+ together[thiswhouseid].get(thisstockid).stock + ','
				+ parseInt(q37) + ',' + q38 + '">' + q38 + '</td>');
		numtr2
				.append('<td><button class="btn btn-danger btn-xs" onclick="cancelnum(this)" id="x'
						+ thiswhouseid
						+ ','
						+ thisstockid
						+ ','
						+ together[thiswhouseid].get(thisstockid).stock
						+ ','
						+ parseInt(q37) + ',' + q38 + '">キャンセル</button></td>');

		numtr2
				.append('<td><button class="btn btn-info btn-xs" onclick="changenum(this)" id="y'
						+ thiswhouseid
						+ ','
						+ thisstockid
						+ ','
						+ together[thiswhouseid].get(thisstockid).stock
						+ ','
						+ parseInt(q37) + ',' + q38 + '">変更</button></td>');
		numtr2.appendTo($('#numtable'));

		if (flag === true)
			togethercache[thiswhouseid].get(thisstockid).stock += parseInt(q37);
		else
			togethercache[thiswhouseid].get(thisstockid).stock -= parseInt(q37);
		document.getElementById("renewedstock").innerHTML = togethercache[thiswhouseid]
				.get(thisstockid).stock;

		console.log(togethercache[thiswhouseid].get(thisstockid).stock);
		console.log(together[thiswhouseid].get(thisstockid).stock);
	}
}

function changenum(haha) {
	// first, change the three field into input
	var ccc = $(haha)[0].innerHTML;
	if (ccc == "変更") {
		var id = $(haha).attr("id").substring(1);
		var idarrayid = id.split(",");
		var sb0 = idarrayid[0], // whouseid need to change to int
		sb1 = idarrayid[1], // stockid above
		sb2 = idarrayid[2], // original stock above
		sb3 = idarrayid[3], // how much to change above
		sb4 = idarrayid[4]; // memo

		//

		var mdzz = sb0 + ',' + sb1 + ',' + sb2 + ',' + sb3 + ',' + sb4
				+ ',mdzz';
		var mdzz1 = sb0 + ',' + sb1 + ',' + sb2 + ',' + sb3 + ',' + sb4
				+ ',mdzz1';
		var mdzz2 = sb0 + ',' + sb1 + ',' + sb2 + ',' + sb3 + ',' + sb4
				+ ',mdzz2';
		var mdzz3 = sb0 + ',' + sb1 + ',' + sb2 + ',' + sb3 + ',' + sb4
				+ ',mdzz3';
		var numhs = 'numhenkosign,' + sb0 + ',' + sb1 + ',' + sb2 + ',' + sb3
				+ ',' + sb4;
		var parameter = sb0 + ',' + sb1 + ',' + sb2 + ',' + sb3 + ',' + sb4;

		var addorminus = document.getElementById(numhs).innerHTML; // to check
		// it was
		// zouka or
		// gensyou
		// console.log(addorminus);

		console.log(mdzz);

		var trr = document.getElementById(id);
		var tds = trr.getElementsByTagName('td');

		var sb3toint = parseInt(tds[3].innerHTML);
		var sb4tostr = tds[4].innerHTML;

		/** *******delete the record in arrayfornumber************ */
		var qjttod = sb0 + ',' + sb1 + ',' + addorminus + ',' + sb3toint + ','
				+ tds[4].innerHTML;
		console.log(qjttod);
		for (var i = 0; i < arrayfornumber.length; i++) {
			if (arrayfornumber[i] === qjttod) {
				arrayfornumber.splice(i, 1);
				console.log(arrayfornumber);
			}
		}
		/** ******************* */

		tds[2].innerHTML = '<div class="dropdown">\
		<button class="btn btn-default dropdown-toggle" type="button"\
		data-toggle="dropdown" aria-expanded="false" id="'
				+ mdzz
				+ '">'
				+ document.getElementById(numhs).innerHTML
				+ '<span class="caret"></span></button>\
<ul class="dropdown-menu" role="menu"><li role="presentation"><a href="#" onclick="mdzz1(this);" id="'
				+ mdzz1
				+ '">増加</a></li>\
	<li role="presentation"><a href="#" onclick="mdzz2(this);" id="'
				+ mdzz2 + '">減少</a></li>\
</ul>\
</div>';

		// 'sb0+','+sb1+','+sb2+','+sb3+','+sb4+','+'
		tds[3].innerHTML = '<input name="q44" type="text" class="form-control" placeholder='
				+ parseInt($("#newnumberr2").val())
				+ ' id="'
				+ mdzz3
				+ '" size="2" value=' + sb3toint + '>';

		tds[4].innerHTML = '<input type="text" id="mdzz3,' + idarrayid[0] + ","
				+ idarrayid[1] + "," + idarrayid[2] + "," + idarrayid[3] + ","
				+ idarrayid[4] + '" size="4" placeholder='
				+ $("#newmemor2").val() + ' class="form-control" value='
				+ sb4tostr + '>';

		tds[6].innerHTML = '<td><button class="btn btn-success btn-xs" id="y'
				+ idarrayid[0] + ',' + idarrayid[1] + ',' + idarrayid[2] + ','
				+ idarrayid[3] + ',' + idarrayid[4]
				+ '" onclick="changenum(this)">保存</button></td>';

		/** this part deletes the record first in togethercache* */

		// alert(sb3toint);
		if (addorminus === "増加") { // return the sb3toint
			togethercache[parseInt(sb0)].get(parseInt(sb1)).stock -= sb3toint;

		} else {
			togethercache[parseInt(sb0)].get(parseInt(sb1)).stock += sb3toint;
		}

		/** ***************************************************** */

	} else if (ccc == "保存") {
		var id = $(haha).attr("id").substring(1);
		var idarrayid = id.split(",");
		var sb0 = idarrayid[0], // whouseid need to change to int
		sb1 = idarrayid[1], // stockid above
		sb2 = idarrayid[2], // original stock above
		sb3 = idarrayid[3], // how much to change above
		sb4 = idarrayid[4]; // memo
		console.log(idarrayid);
		var trr = document.getElementById(id);
		var tds = trr.getElementsByTagName('td');
		var xxx = id + ',mdzz';
		var xxx1 = id + ',mdzz3';
		var xxx2 = 'mdzz3,' + id;
		var xxx1temp = '#' + xxx1;
		console.log(xxx);
		var zgvalue = document.getElementById(xxx).innerText;
		console.log(zgvalue);
		if (parseInt(document.getElementById(xxx1).value) <= 0) {
			alert("You entered an invalid number");
			return;
		}
		if (!document.getElementById(xxx1).value)
			alert("please enter a proper number");
		else {
			for (var i = 0; i < document.getElementById(xxx1).value.length; i++) {
				if (valueIsNaN(parseInt(document.getElementById(xxx1).value
						.charAt(i)))) {
					alert("please enter a proper number");
					return;
				}
			}
		}
		if (!document.getElementById(xxx2).value) {
			alert("please enter memo");
		}
		if (zgvalue === "減少"
				&& togethercache[parseInt(sb0)].get(parseInt(sb1)).stock
						- parseInt(document.getElementById(xxx1).value) < 0) {
			alert("no enough stock");
			return;
		}
		/**
		 * ***************add the updated record to arrayfornumber and
		 * check******************************
		 */
		var qjttoadd = sb0 + ',' + sb1 + ',' + zgvalue + ','
				+ document.getElementById(xxx1).value + ','
				+ document.getElementById(xxx2).value;
		console.log(qjttoadd);
		for (var i = 0; i < arrayfornumber.length; i++) {
			if (arrayfornumber[i] === qjttoadd) {
				alert("duplicate");
				return;
			}
		}

		/** ********************************************* */

		tds[2].innerHTML = zgvalue;
		tds[3].innerHTML = document.getElementById(xxx1).value;
		tds[4].innerHTML = document.getElementById(xxx2).value;
		tds[6].innerHTML = '<td><button class="btn btn-info btn-xs" id="y'
				+ idarrayid[0] + ',' + idarrayid[1] + ',' + idarrayid[2] + ','
				+ idarrayid[3] + ',' + idarrayid[4]
				+ '" onclick="changenum(this)">変更</button></td>';

		// next do something about when zouka -> gensyou change the number
		// when number is changed change the number
		var sb3toint = parseInt(tds[3].innerHTML);
		if (zgvalue === "増加") {
			togethercache[parseInt(sb0)].get(parseInt(sb1)).stock += sb3toint;
		} else {
			togethercache[parseInt(sb0)].get(parseInt(sb1)).stock -= sb3toint;
		}

		arrayfornumber.push(qjttoadd);

		if (tds[1].innerHTML === document.getElementById("numberwhouse").value
				&& tds[0].innerHTML === document.getElementById("numberitem").value) {
			document.getElementById("renewedstock").innerHTML = togethercache[parseInt(sb0)]
					.get(parseInt(sb1)).stock;
		}

		alert("the current stock of " + tds[0].innerHTML + " in "
				+ tds[1].innerHTML + " is "
				+ togethercache[parseInt(sb0)].get(parseInt(sb1)).stock);
	}

}

function mdzz1(event) {
	var idarraymdzz = $(event).attr("id");
	console.log(idarraymdzz);
	var idformdzz = idarraymdzz.substring(0, idarraymdzz.length - 1);
	console.log(idformdzz);
	document.getElementById(idformdzz).innerHTML = '増加<span class="caret"></span>';
}

function mdzz2(event) {
	var idarraymdzz = $(event).attr("id");
	console.log(idarraymdzz);
	var idformdzz = idarraymdzz.substring(0, idarraymdzz.length - 1);
	console.log(idformdzz);
	document.getElementById(idformdzz).innerHTML = '減少<span class="caret"></span>';
}

function cancelnum(haha) {
	// together never change, but togethercache change

	var id = $(haha).attr("id").substring(1);
	if (document.getElementById('y' + id).innerHTML === "保存") {
		alert("Please finish the change function first");
		return;
	}
	var idarrayid = id.split(",");
	var sb0 = idarrayid[0], // whouseid need to change to int
	sb1 = idarrayid[1], // stockid above
	sb2 = idarrayid[2], // original stock above
	sb3 = idarrayid[3], // how much to change above
	sb4 = idarrayid[4]; // memo
	var trr = document.getElementById(id);
	var tds = trr.getElementsByTagName('td');

	var doa = tds[2].innerHTML;
	var sb3toint = parseInt(tds[3].innerHTML);

	var thingstod = sb0 + ',' + sb1 + ',' + doa + ',' + sb3toint + ','
			+ tds[4].innerHTML;
	for (var i = 0; i < arrayfornumber.length; i++) {
		if (arrayfornumber[i] === thingstod) {
			arrayfornumber.splice(i, 1);
			console.log(arrayfornumber);
		}
	}
	if (tds[2].innerHTML === "増加") {
		togethercache[parseInt(sb0)].get(parseInt(sb1)).stock -= sb3toint;
	} else {
		togethercache[parseInt(sb0)].get(parseInt(sb1)).stock += sb3toint;
	}
	if (tds[1].innerHTML === document.getElementById("numberwhouse").value
			&& tds[0].innerHTML === document.getElementById("numberitem").value) {
		document.getElementById("renewedstock").innerHTML = togethercache[parseInt(sb0)]
				.get(parseInt(sb1)).stock;
	}

	alert("the current stock of " + tds[0].innerHTML + " in "
			+ tds[1].innerHTML + " is "
			+ togethercache[parseInt(sb0)].get(parseInt(sb1)).stock);
	trr.remove();

}

function numbersubmit() {
	// this function only does things of putting trs in the table into trans
	// database
	// how to get the date?
	console.log(whitmapreverse);
	var rows = document.getElementById('numtable').rows;
	// document.getElementById("numbertable").rows[1].getElementsByTagName("td");
	for (var i = 1; i < rows.length; i++) {
		var tds = rows[i].getElementsByTagName("td");
		var arrtoinsert = [];
		var iddd = alasql('SELECT MAX(id) + 1 as id FROM trans')[0].id;
		// console.log(iddd);
		arrtoinsert.push(iddd);
		// next is to push stock
		var a = parseInt(tds[0].id);
		var b = parseInt(tds[1].id) + 1;
		console.log(a + ',' + b);
		// var stokid = parseInt(whitmapreverse.get(a + ',' + b));
		// console.log(stokid);
		// arrtoinsert.push(stokid);
		arrtoinsert.push(a); // stockid
		arrtoinsert.push(todaystring); // date
		// var delta = parseInt(tds[3].innerText) - parseInt(tds[2].innerText);
		// //qty
		var delta = 0;
		if (tds[2].innerHTML === "増加") {
			delta = parseInt(tds[3].innerText);
		} else
			delta = parseInt(tds[3].innerText) * (-1);

		arrtoinsert.push(delta); // qty
		arrtoinsert.push(togethercache[b - 1].get(a).stock); // balance
		arrtoinsert.push(tds[4].innerText); // memo
		arrtoinsert.push(ye);
		arrtoinsert.push(mo);
		arrtoinsert.push(day);
		console.log(arrtoinsert);
		// // ID,STOCK,DATE,QTY,BALANCE,MEMO,YEAR,MONTH,DAY
		alasql(
				'INSERT INTO trans(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arrtoinsert);
	}
	savenumberclicked = 0;
	document.getElementById("pushobjxx").innerHTML = '';
	document.getElementById("pushobjx").innerHTML = '';
	document.getElementById("pushobj1").innerHTML = '';
	document.getElementById("pushobj2").innerHTML = '<p>在庫数調整は完成しました。</p>';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
		                                                onclick = "openpage()">在庫一覧参考</button></div>';
	arrayfornumber = [];
}
// }

function openpage() {
	window.open("zaiko.html");
}

/*******************************************************************************
 * now lets do the warehouse change here
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 ******************************************************************************/

function soukochange() {
	countmoneychange = 0;
	savenumberclicked = 0;
	countnumchange = 0;
	savesoukoclicked = 0;
	counttekinyuu = 0;
	counttekinyuu2 = 0;
	countjidoukinyuu = 0;
	countjidoukinyuu2 = 0;
	refreshsecondpart();
	refresh();
	if (countsoukochange == 0) {
		// make innerHTML = "";

		maincontent.innerHTML = "";
		subcontent.innerHTML = "";
		document.getElementById("pushobjxx").innerHTML = '';
		document.getElementById("pushobj2").innerHTML = '';
		document.getElementById("pushobj3").innerHTML = '';
		if (document.getElementById("rightpanel") != null) {

			document.getElementById("rightpanel").parentNode
					.removeChild(document.getElementById("rightpanel"));
		}

		// next build UI:old souko,item,new souko,num
		$('#pushobj1')
				.append(
						'	<form class="form-inline">\
                <div class="form-group">\
                    <label>元倉庫</label> <select name="q39" class="form-control"\
                           id="soukowhouse" style="margin-left:10px;" onchange="rotation3(this)">\
                              <option value="0">未選択</option></select><br><br>\
				<label style="left-margin:10px;">商品</label> <select name="q40" class="form-control"\
				id="soukoitem" style="margin-left:25px;" onchange="rotation4(this)">\
				<option value="0">未選択</option>\
			            </select></div>\
        </form><br><br>');
		$('#pushobj1')
				.append(
						'	<form class="form-inline">\
                <div class="form-group">\
				 <label>新倉庫</label><select name="q41" class="form-control"\
                id="soukohouse2" style="margin-left:10px;">\
                    <option value="0">未選択</option>\
             </select></div>\
        </form><br>');

		$('#pushobj1')
				.append(
						'<br><form class="form-inline">\
                <div class="form-group">\
				 <label>数量</label> <input name="q42" type="text" class="form-control"\
				placeholder="0000" id="soukoamount" size="9" style="margin-left:10px;"></div>\
        </form>');

		document.getElementById("pushobj1").innerHTML += '<br><br><label>メモ</label><input name="q43" type="text" \
			class="form-control" placeholder="原因記入" id="soukoreason"><br>';
		$('#pushobj1').append('<div id="theoriginalstock"></div>');

		for (var i = 0; i < whouses.length; i++) {
			var ip = whouses[i];
			console.log(ip.whouse.name);
			var option = $('<option>');
			option.attr('value', ip.whouse.name);
			option.attr('id', 'soukow' + i);
			option.text(ip.whouse.name);
			$('select[name="q39"]').append(option);
		}
		for (var i = 0; i < whouses.length; i++) {
			var ip = whouses[i];
			console.log(ip.whouse.name);
			var option = $('<option>');
			option.attr('value', ip.whouse.name);
			option.attr('id', 'sou2kow' + i);
			option.text(ip.whouse.name);
			$('select[name="q41"]').append(option);
		}
	}
	countsoukochange++;
}

function rotation3(event) { // do the rotation job
	document.getElementById("soukoitem").innerHTML = '<option value="0">未選択</option>';
	var numberwhid = event[event.selectedIndex].id;
	// console.log(numberwhid);
	if (numberwhid) {
		if (numberwhid == "soukow0") { // box with all those in tokyo1
			var soukow0 = tokyo1.keys();
			while (true) {
				var key = soukow0.next().value;
				if (key != null) {
					var option = $('<option>');
					option.attr('value', tokyo1.get(key).detail);
					option.attr('id', '0soukow' + key);
					option.text(tokyo1.get(key).detail);
					$('select[name="q40"]').append(option);
				} else
					break;
			}
		}
		if (numberwhid == "soukow1") { // box with all those in tokyo1
			var soukow1 = tokyo2.keys();
			while (true) {
				var key = soukow1.next().value;
				if (key != null) {
					var option = $('<option>');
					option.attr('value', tokyo2.get(key).detail);
					option.attr('id', '1soukow' + key);
					option.text(tokyo2.get(key).detail);
					$('select[name="q40"]').append(option);
				} else
					break;
			}
		}
		if (numberwhid == "soukow2") { // box with all those in tokyo1
			var soukow2 = osaka.keys();
			while (true) {
				var key = soukow2.next().value;
				if (key != null) {
					var option = $('<option>');
					option.attr('value', osaka.get(key).detail);
					option.attr('id', '2soukow' + key);
					option.text(osaka.get(key).detail);
					$('select[name="q40"]').append(option);
				} else
					break;
			}

		}
		if (numberwhid == "soukow3") { // box with all those in tokyo1
			var soukow3 = fukuoka.keys();
			while (true) {
				var key = soukow3.next().value;
				if (key != null) {
					var option = $('<option>');
					option.attr('value', fukuoka.get(key).detail);
					option.attr('id', '3soukow' + key);
					option.text(fukuoka.get(key).detail);
					$('select[name="q40"]').append(option);
				} else
					break;
			}
		}
	}
}

function rotation4(event) {
	document.getElementById("theoriginalstock").innerHTML = "";
	var haha = event[event.selectedIndex].id;
	console.log(haha);
	var hahaw = parseInt(haha.substring(0, 1)); // which whouse
	var hahasid = parseInt(haha.substring(7)); // which item
	var hahaobject = together[hahaw].get(hahasid);
	console.log(hahaobject);
	document.getElementById("theoriginalstock").innerHTML = '<p>The stock of this item in'
			+ " "
			+ whouseMap.get(hahaw)
			+ " "
			+ 'is now:'
			+ " "
			+ '<span id="hahastock" style="color:red">'
			+ hahaobject.stock
			+ '</span></p><br>';
	document.getElementById("theoriginalstock").innerHTML += '<p id="newhousestock"></p>';
	document.getElementById("theoriginalstock").innerHTML += '<br><button onclick="submitsouko(this)"\
		     class="btn btn-round btn-success" id="'
			+ hahaw
			+ ","
			+ hahasid
			+ ","
			+ hahaobject.stock
			+ ","
			+ 'soukosure">確定</button>';
}

function getnewstock(thiswhouseid, thisstockid, q40, q41, q42, q43) {
	// need itemid, new whouseid, in order to find out if we have the stock
	// there
	// var q40 = $("#soukoitem").val();
	var itemiddd = itemmap.get(q40);
	var newwhouse = whouseMapRev.get(q41) + 1; // whitmapreverse里面的仓库是按照1开始算得
	var kkeeyy = itemiddd + ',' + newwhouse;
	console.log(kkeeyy);
	console.log(whitmapreverse);
	var newstockid = whitmapreverse.get(kkeeyy);
	if (newstockid) {
		// 即使是新的仓库里面，这个货物原本也就是存在的，所以我们任务是
		var deltanum = parseInt(q42);
		console.log(deltanum);
		console.log(togethercache[newwhouse - 1].get(newstockid));
		togethercache[newwhouse - 1].get(newstockid).stock += deltanum;
		togethercache[thiswhouseid].get(thisstockid).stock -= deltanum;
		document.getElementById("hahastock").innerHTML = togethercache[thiswhouseid]
				.get(thisstockid).stock;
		document.getElementById("newhousestock").innerHTML = 'After this action, the stock of this item in'
				+ " "
				+ q41
				+ " "
				+ 'is:<span style="color:orange" id="heiheiheihei">'
				+ togethercache[newwhouse - 1].get(newstockid).stock
				+ '</span>';
	} else {
		// build an array to contain the new stock information
		// so when delete, use includes and delete and its ok
		// when do the submit, first update(insert) stock, then update trans
		// delete: i think every trans is independent, so you can do multiple
		// itemid,whouseid,balance
		var deltanum = parseInt(q42);
		if ((!tempforstock.has(kkeeyy))) {
			tempforstock.set(kkeeyy, deltanum);
			console.log(tempforstock);
		} else {
			var originalDeltanum = tempforstock.get(itemiddd + "," + newwhouse);
			tempforstock.set(itemiddd + "," + newwhouse, originalDeltanum
					+ deltanum);

		}
		togethercache[thiswhouseid].get(thisstockid).stock -= deltanum;
		document.getElementById("hahastock").innerHTML = togethercache[thiswhouseid]
				.get(thisstockid).stock;
		document.getElementById("newhousestock").innerHTML = 'After this action, the stock of this item in'
				+ q41
				+ 'is:<span style="color:orange" id="heiheiheihei">'
				+ tempforstock.get(kkeeyy) + '</span>';
	}
	console.log(togethercache);
}

function submitsouko(b) {
	var idarray = $(b).attr("id").split(",");
	console.log(idarray);
	var thiswhouseid = parseInt(idarray[0]);
	var thisstockid = parseInt(idarray[1]);
	var thisstock = parseInt(idarray[2]);
	console.log(together[thiswhouseid].get(thisstockid).stock); // the
	// original(but
	// would change)
	// stock here

	var q41 = $("#soukohouse2").val() || '';
	$('input[name="q41"]').val(q41);
	console.log(q41);
	if (q41 == "0")
		alert("please select the new warehouse");
	if (q41 == $("#soukowhouse").val()) {
		alert("You choose the same warehouse");
		return;
	}
	var q42 = $("#soukoamount").val() || '';
	$('input[name="q42"]').val(q42);
	if (!q42)
		alert("please enter a proper number");
	else {
		for (var i = 0; i < q42.length; i++) {
			if (valueIsNaN(parseInt(q42.charAt(i)))) {
				alert("please enter a proper number");
				return;
			}
		}
		if (parseInt(q42) == 0) {
			alert("You did not actually move the stock");
			return;
		}
		if (parseInt(q42) > togethercache[thiswhouseid].get(thisstockid).stock) {
			alert("現在の在庫数に越えています");
			return;
		}
		var q43 = $("#soukoreason").val() || '';
		$('input[name="q43"]').val(q43);
		if (!q43) {
			alert("メモを記入してください");
			return;
		}
		console.log(q42);
		console.log(q43);

		var element = thiswhouseid + ',' + thisstockid + ',' + q41 + ',' + q42
				+ ',' + q43;
		if (arrayforsouko.includes(element)) {
			alert("duplicate");
			return;
		} else
			arrayforsouko.push(element);
		console.log(arrayforsouko)
		// build the table when clicked = 0
		if (savesoukoclicked == 0) {
			var soukodiv = $('<div></div>');
			var soukotable = $('<table id="soukotable" class="table-striped table-condensed table-bordered table-hover" ></table>'), soukotbody = $('<tbody id="soukotbody"></tbody>');
			var soukotr = $('<tr></tr>');
			soukotr.append('<th>商品名</th>');
			soukotr.append('<th>元倉庫</th>');
			soukotr.append('<th>現倉庫</th>');
			soukotr.append('<th>移動数</th>');
			soukotr.append('<th>メモ</th>');
			soukotr.append('<th>キャンセル</th>');
			soukotr.append('<th>変更</th>'); // 此处已经添加变更，但下方还没有改正
			soukotr.appendTo(soukotbody);
			soukotbody.appendTo(soukotable);
			soukotable.appendTo(soukodiv);
			soukodiv.appendTo($('#pushobjxx'));
			$('#pushobjxx')
					.append(
							'<button class="btn btn-primary" onclick="soukosubmit()"　style="margin:auto;">サブミット</button>');
			savesoukoclicked++;
		}
		var soukotr2 = $('<tr id="isouko,' + thiswhouseid + ',' + thisstockid
				+ ',' + q41 + ','
				+ together[thiswhouseid].get(thisstockid).stock + ','
				+ parseInt(q42) + ',' + q43 + ',' + $("#soukoitem").val()
				+ '"></tr>'); // quanjiatong too much
		soukotr2.append('<td id="souko,' + thisstockid + '">'
				+ together[thiswhouseid].get(thisstockid).detail + '</td>');
		soukotr2.append('<td id="souko,' + thiswhouseid + '">'
				+ together[thiswhouseid].get(thisstockid).whouse + '</td>');
		soukotr2.append('<td>' + q41 + '</td>');
		soukotr2.append('<td>' + parseInt(q42) + '</td>');
		soukotr2.append('<td>' + q43 + '</td>');
		soukotr2
				.append('<td><button class="btn btn-danger btn-xs" onclick="cancelsouko(this)" id="souko,'
						+ thiswhouseid
						+ ','
						+ thisstockid
						+ ','
						+ q41
						+ ','
						+ together[thiswhouseid].get(thisstockid).stock
						+ ','
						+ parseInt(q42)
						+ ','
						+ q43
						+ ','
						+ $("#soukoitem").val() + '">キャンセル</button></td>');
		soukotr2
				.append('<td><button class="btn btn-info btn-xs" onclick="changesouko(this)" id="y,'
						+ thiswhouseid
						+ ','
						+ thisstockid
						+ ','
						+ q41
						+ ','
						+ together[thiswhouseid].get(thisstockid).stock
						+ ','
						+ parseInt(q42)
						+ ','
						+ q43
						+ ','
						+ $("#soukoitem").val() + '">変更</button></td>');
		soukotr2.appendTo($('#soukotable'));

		getnewstock(thiswhouseid, thisstockid, $("#soukoitem").val(), q41,
				parseInt(q42), q43);
	}
}

function cancelsouko(b) {
	// 现在的情况：togethercache里现有的都已经被更新了，tempforstock也是，如果按取消，先要找到kkeeyy在哪里，然后做相应的措施
	// idarray2 [0] souko [1]old whouse id [2]the stock id [3]name of new whouse
	// [4] original stock [5] delta amount [6]memo [7]the name of the item
	var flag = false;
	var idarray2 = $(b).attr("id").split(",");
	var idhaha = $(b).attr("id").substring(6);
	if (document.getElementById('y,' + idhaha).innerHTML === "保存") {
		alert("Please finish the change function first");
		return;
	}
	console.log(idarray2);
	var newwhouseid = whouseMapRev.get(idarray2[3]) + 1;
	console.log(newwhouseid);
	var newitemid = itemmap.get(idarray2[7]);
	var kkeeyy2 = newitemid + ',' + newwhouseid;
	if (tempforstock.has(kkeeyy2)) {
		// new item, not in the database
		var deltanumtobechange = tempforstock.get(kkeeyy2);
		tempforstock.set(kkeeyy2, deltanumtobechange - parseInt(idarray2[5]));
		togethercache[parseInt(idarray2[1])].get(parseInt(idarray2[2])).stock += parseInt(idarray2[5]);
		console.log(tempforstock);
		console.log(togethercache);
	} else {
		var newstockid = whitmapreverse.get(kkeeyy2);
		console.log(togethercache[newwhouseid - 1].get(newstockid));
		togethercache[newwhouseid - 1].get(newstockid).stock -= parseInt(idarray2[5]);
		togethercache[parseInt(idarray2[1])].get(parseInt(idarray2[2])).stock += parseInt(idarray2[5]);
		console.log(tempforstock);
		console.log(togethercache);
		flag = true;
	}
	var id = 'i' + $(b).attr("id");
	console.log(id);
	var trr = document.getElementById(id);
	var tds = trr.getElementsByTagName('td');
	var blublu = idarray2[1] + ',' + idarray2[2] + ',' + tds[2].innerHTML + ','
			+ tds[3].innerHTML + ',' + tds[4].innerHTML;
	for (var i = 0; i < arrayforsouko.length; i++) {
		if (arrayforsouko[i] === blublu) {
			arrayforsouko.splice(i, 1);
		}
	}
	trr.remove();
	if (tds[0].innerHTML === document.getElementById("soukoitem").value) {
		if (tds[1].innerHTML === document.getElementById("soukowhouse").value) {
			document.getElementById("hahastock").innerHTML = togethercache[parseInt(idarray2[1])]
					.get(parseInt(idarray2[2])).stock;
		}
		if (tds[2].innerHTML === document.getElementById("soukohouse2").value) {
			if (flag) { // existed
				var newstockid = whitmapreverse.get(kkeeyy2);
				document.getElementById("heiheiheihei").innerHTML = togethercache[newwhouseid - 1]
						.get(newstockid).stock;
				// alert(togethercache[newwhouseid - 1].get(newstockid).stock);
			} else {
				document.getElementById("heiheiheihei").innerHTML = tempforstock
						.get(kkeeyy2);
			}
		}
	}
}

function changesouko(b) {
	var idarray = $(b).attr("id").substring(2).split(",");
	console.log(idarray);
	var sb0 = idarray[0], sb1 = idarray[1], sb2 = idarray[2], sb3 = idarray[3], sb4 = idarray[4], sb5 = idarray[5], sb6 = idarray[6];

	// sb0 twid; sb1 tsid; sb2 new whouse name; sb3 original stock; sb4 delta;
	// sb5 memo; sb6 item name

	var quanjiatong2 = sb0 + ',' + sb1 + ',' + sb2 + ',' + sb3 + ',' + sb4
			+ ',' + sb5 + ',' + sb6;
	var inputfortds3 = quanjiatong2 + ',ip3';
	var inputfortds4 = quanjiatong2 + ',ip4';
	var inputforchange = 'y,' + quanjiatong2;

	var inner = $(b)[0].innerHTML;
	console.log(inner);
	var idfortr = 'isouko,' + $(b).attr("id").substring(2);
	var trr = document.getElementById(idfortr);
	var tds = trr.getElementsByTagName('td');
	console.log(tds);
	if (inner === "変更") {
		// first change to input

		/** *******delete the record in arrayforsouko************ */
		var qjttod = sb0 + ',' + sb1 + ',' + sb2 + ',' + tds[3].innerHTML + ','
				+ tds[4].innerHTML;
		console.log(qjttod);
		console.log(arrayforsouko);
		for (var i = 0; i < arrayforsouko.length; i++) {
			if (arrayforsouko[i] === qjttod) {
				arrayforsouko.splice(i, 1);
				console.log(arrayforsouko);
			}
		}
		/** ******************* */
		var sb33toint = parseInt(tds[3].innerHTML);
		var sb44tostr = tds[4].innerHTML;
		tds[3].innerHTML = '<input name="q50" type="text" class="form-control"\
			id="'
				+ inputfortds3 + '" size="2" value="' + sb33toint + '">';
		tds[4].innerHTML = '<input name="q51" type="text" class="form-control" id="'
				+ inputfortds4 + '" size="4" value="' + sb44tostr + '">';

		tds[6].innerHTML = '<td><button class="btn btn-success btn-xs" id="'
				+ inputforchange
				+ '" onclick="changesouko(this)">保存</button></td>';

		// second return the number
		var newwhouseid = whouseMapRev.get(sb2) + 1;
		console.log(newwhouseid);
		var newitemid = itemmap.get(sb6);
		var kkeeyy2 = newitemid + ',' + newwhouseid;
		console.log(kkeeyy2);
		if (tempforstock.has(kkeeyy2)) {
			// new item, not in the database
			var deltanumtobechange = tempforstock.get(kkeeyy2);
			tempforstock.set(kkeeyy2, deltanumtobechange - sb33toint);
			togethercache[parseInt(sb0)].get(parseInt(sb1)).stock += sb33toint;
			console.log(tempforstock);
			console.log(togethercache);
		} else {
			var newstockid = whitmapreverse.get(kkeeyy2);
			console.log(togethercache[newwhouseid - 1].get(newstockid));
			togethercache[newwhouseid - 1].get(newstockid).stock -= sb33toint;
			togethercache[parseInt(sb0)].get(parseInt(sb1)).stock += sb33toint;
			console.log(tempforstock);
			console.log(togethercache);
		}
	} else if (inner === "保存") {
		var flag = false;
		var newdelta = document.getElementById(inputfortds3).value;
		var newmemo = document.getElementById(inputfortds4).value;
		if (!newdelta)
			alert("please enter a proper number");
		else {
			for (var i = 0; i < newdelta.length; i++) {
				if (valueIsNaN(parseInt(newdelta.charAt(i)))) {
					alert("please enter a proper number");
					return;
				}
			}
		}

		if (parseInt(newdelta) < 0)
			alert("Youはこっちに来ちゃいな");
		if (togethercache[parseInt(sb0)].get(parseInt(sb1)).stock < parseInt(newdelta))
			alert("Not enough stock");
		if (!newmemo)
			alert("please enter the reason");

		/***********************************************************************
		 * check and add the new record;
		 * 
		 * 
		 **********************************************************************/
		var qjttod = sb0 + ',' + sb1 + ',' + sb2 + ',' + newdelta + ','
				+ newmemo;
		for (var i = 0; i < arrayforsouko.length; i++) {
			if (arrayforsouko[i] === qjttod) {
				alert("This transaction has already existed.");
				return;
			}
		}
		arrayforsouko.push(qjttod);
		console.log(arrayforsouko);

		/***********************************************************************
		 * now that every corner case is handled, renew togethercache change
		 * back innerHTML
		 * 
		 **********************************************************************/
		tds[3].innerHTML = newdelta;
		tds[4].innerHTML = newmemo;
		var sb33toint2 = parseInt(newdelta);
		var newwhouseid = whouseMapRev.get(sb2) + 1;
		console.log(newwhouseid);
		var newitemid = itemmap.get(sb6);
		var kkeeyy2 = newitemid + ',' + newwhouseid;
		if (tempforstock.has(kkeeyy2)) {
			// new item, not in the database
			var deltanumtobechange = tempforstock.get(kkeeyy2);
			tempforstock.set(kkeeyy2, deltanumtobechange + sb33toint2);
			togethercache[parseInt(sb0)].get(parseInt(sb1)).stock -= sb33toint2;
			console.log(tempforstock);
			console.log(togethercache);
		} else {
			var newstockid = whitmapreverse.get(kkeeyy2);
			console.log(togethercache[newwhouseid - 1].get(newstockid));
			togethercache[newwhouseid - 1].get(newstockid).stock += sb33toint2;
			togethercache[parseInt(sb0)].get(parseInt(sb1)).stock -= sb33toint2;
			console.log(tempforstock);
			console.log(togethercache);
			flag = true;
		}

		if (tds[0].innerHTML === document.getElementById("soukoitem").value) {
			if (tds[1].innerHTML === document.getElementById("soukowhouse").value) {
				document.getElementById("hahastock").innerHTML = togethercache[parseInt(sb0)]
						.get(parseInt(sb1)).stock;
			}
			if (tds[2].innerHTML === document.getElementById("soukohouse2").value) {
				if (flag) { // existed
					var newstockid = whitmapreverse.get(kkeeyy2);
					document.getElementById("heiheiheihei").innerHTML = togethercache[newwhouseid - 1]
							.get(newstockid).stock;
					// alert(togethercache[newwhouseid -
					// 1].get(newstockid).stock);
				} else {
					document.getElementById("heiheiheihei").innerHTML = tempforstock
							.get(kkeeyy2);
				}
			}
		}

		tds[6].innerHTML = '<td><button class="btn btn-info btn-xs" id="'
				+ inputforchange
				+ '" onclick="changesouko(this)">変更</button></td>';

	}
}

function soukosubmit() {
	console.log(togethercache);
	console.log(arrayforsouko);

	// renew stock database first
	console.log(tempforstock);
	var tempkeys = tempforstock.keys();
	while (true) {
		var key = tempkeys.next().value;
		if (key != null) {
			var value = parseInt(tempforstock.get(key));
			if (value != 0) {
				var insertostock = [];
				var keyarray = key.split(",");
				var iddd = alasql('SELECT MAX(id) + 1 as id FROM stock')[0].id;
				insertostock.push(iddd);
				insertostock.push(parseInt(keyarray[0]));
				insertostock.push(parseInt(keyarray[1]));
				insertostock.push(value);
				alasql(
						'INSERT INTO stock(\
						id, \
						item, \
						whouse, \
						balance)\
						VALUES(?,?,?,?);',
						insertostock);
			}
		} else
			break;
	}

	whitmap = new Map();
	whitmapreverse = new Map();
	whit = alasql('select * from stock');

	for (var i = 0; i < whit.length; i++) {
		var whitele = whit[i];
		whitmap.set(whitele.stock.id, [ whitele.stock.item,
				whitele.stock.whouse ]);
		whitmapreverse.set(whitele.stock.item + ',' + whitele.stock.whouse,
				whitele.stock.id);
	}
	console.log(whitmapreverse);

	// then add to trans
	// ID,STOCK,DATE,QTY,BALANCE,MEMO,YEAR,MONTH,DAY
	var rows = document.getElementById('soukotable').rows;
	for (var i = 1; i < rows.length; i++) {
		var tds = rows[i].getElementsByTagName("td");
		var arrtoinsert = [];
		var arrtoinsert2 = [];
		var iddd = alasql('SELECT MAX(id) + 1 as id FROM trans')[0].id;
		var iddd2 = iddd + 1;
		/** ************************************************************ */
		arrtoinsert.push(iddd);
		var a = parseInt(tds[0].id.split(",")[1]);
		var b = parseInt(tds[1].id.split(",")[1]) + 1;
		arrtoinsert.push(a); // stockid
		arrtoinsert.push(todaystring); // date
		var c = parseInt(tds[3].innerText) * (-1);
		arrtoinsert.push(c);
		arrtoinsert.push(togethercache[b - 1].get(a).stock);
		arrtoinsert.push(tds[4].innerText); // memo
		arrtoinsert.push(ye);
		arrtoinsert.push(mo);
		arrtoinsert.push(day);
		console.log(arrtoinsert);
		// // ID,STOCK,DATE,QTY,BALANCE,MEMO,YEAR,MONTH,DAY
		alasql(
				'INSERT INTO trans(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arrtoinsert);
		/** ************************************************************ */
		arrtoinsert2.push(iddd2);
		var thisitemid = itemmap.get(tds[0].innerHTML);
		console.log(thisitemid);
		var newwhouseid = parseInt(whouseMapRev.get(tds[2].innerHTML)) + 1;
		console.log(newwhouseid);
		var newstockid2 = whitmapreverse.get(thisitemid + ',' + newwhouseid);
		console.log(newstockid2);
		arrtoinsert2.push(parseInt(newstockid2));
		arrtoinsert2.push(todaystring);
		arrtoinsert2.push(c * (-1));
		var xxcc = 0;
		if (tempforstock.has(thisitemid + ',' + newwhouseid)) {
			xxcc = tempforstock.get(thisitemid + ',' + newwhouseid);
		} else {
			xxcc = togethercache[newwhouseid - 1].get(newstockid2).stock;
		}
		arrtoinsert2.push(parseInt(xxcc));
		arrtoinsert2.push(tds[4].innerText); // memo
		arrtoinsert2.push(ye);
		arrtoinsert2.push(mo);
		arrtoinsert2.push(day);
		alasql(
				'INSERT INTO trans(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arrtoinsert2);

	}
	console.log(alasql('select * from trans'));
	arrayforsouko = [];
	tempforstock = new Map();
	savesoukoclicked = 0;
	document.getElementById("pushobjxx").innerHTML = '';
	document.getElementById("pushobj1").innerHTML = '';
	document.getElementById("pushobjx").innerHTML = '';
	document.getElementById("pushobj2").innerHTML = '';
	document.getElementById("pushobj3").innerHTML = '';
	document.getElementById("pushobj2").innerHTML = '<p>在庫数調整は完成しました。</p>';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
		                                                onclick = "openpage()">在庫一覧参考</button></div>';
	
    countsoukochange = 0;
}

/** ************************************************************************************************************* */

var pastmap = new Map(); // only for kinyuu, record those jdate is before
// today
var nowmap = new Map();

var futuremap = new Map();

function refresh2() {
	countmoneychange = 0;
	countnumchange = 0;
	countsoukochange = 0;
	savenumberclicked = 0;
	savesoukoclicked = 0;
	refresh();

}

function jidoukinyuu() {
	refresh2();
	refreshsecondpart();
	pastmap = new Map(), nowmap = new Map(), futuremap = new Map();
	arrayforkinyuu = [];
	tempforstockkinyuu = new Map();
	countjidoukinyuu2 = 0;
	counttekinyuu = 0;
	counttekinyuu2 = 0;
	console.log(tempforstockkinyuu);
	if (countjidoukinyuu === 0) {
		maincontent.innerHTML = "";
		subcontent.innerHTML = "";
		document.getElementById("pushobjxx").innerHTML = '';
		document.getElementById("pushobj2").innerHTML = '';
		document.getElementById("pushobj3").innerHTML = '';
		if (document.getElementById("rightpanel") != null) {

			document.getElementById("rightpanel").parentNode
					.removeChild(document.getElementById("rightpanel"));
		}
		var todayktable = alasql(
				'select * from snb where NOS = 1 and KYEAR=? and KMONTH=? and KDAY=?',
				[ ye, mo, day ]);
		for (var i = 0; i < todayktable.length; i++) {
			var elee = todayktable[i];
			if (!elee.SITEM) {
				elee = elee.snb;
				var elee2 = elee.SITEM + ',' + elee.WWHOUSE + ',' + elee.QUA
						+ ',' + elee.MEMO + ',' + elee.JYEAR + ','
						+ elee.JMONTH + ',' + elee.JDAY;
				arrayforkinyuu.push(elee2);
			} else {
				var elee2 = elee.SITEM + ',' + elee.WWHOUSE + ',' + elee.QUA
						+ ',' + elee.MEMO + ',' + elee.JYEAR + ','
						+ elee.JMONTH + ',' + elee.JDAY;
				arrayforkinyuu.push(elee2);
			}
		}
		console.log(todayktable);
		console.log(ye + ',' + mo + ',' + day);
		console.log(date);
		console.log(arrayforkinyuu);

		var pastdiv = $('<div></div>');
		var nowdiv = $('<div></div>');
		var futurediv = $('<div></div>');
		var pasttable = $('<table class="table-striped table-condensed table-bordered table-hover" id="pasttable"></table>');
		var pastbody = $('<tbody id="pastbody"></tbody>');
		var nowtable = $('<table class="table-striped table-condensed table-bordered table-hover" id="nowtable"></table>');
		var nowbody = $('<tbody id="nowbody"></tbody>');
		var futuretable = $('<table class="table-striped table-condensed table-bordered table-hover" id="futuretable"></table>');
		var futurebody = $('<tbody id="futurebody"></tbody>');
		pastbody.appendTo(pasttable);
		pasttable.appendTo(pastdiv);
		nowbody.appendTo(nowtable);
		nowtable.appendTo(nowdiv);
		futurebody.appendTo(futuretable);
		futuretable.appendTo(futurediv);

		var tr1 = $('<tr></tr>');
		var tr2 = $('<tr></tr>');
		var tr3 = $('<tr></tr>');
		tr1.append('<th>アイテム</th>');
		tr2.append('<th>アイテム</th>');
		tr3.append('<th>アイテム</th>');
		tr1.append('<th>倉庫先</th>');
		tr2.append('<th>倉庫先</th>');
		tr3.append('<th>倉庫先</th>');
		tr1.append('<th>数量</th>');
		tr2.append('<th>数量</th>');
		tr3.append('<th>数量</th>');
		tr1.append('<th>入庫日</th>');
		tr2.append('<th>入庫日</th>');
		tr3.append('<th>入庫予定日</th>');
		tr1.append('<th>備考</th>');
		tr2.append('<th>備考</th>');
		tr3.append('<th>備考</th>');
		tr1.append('<th>キャンセル</th>');
		tr2.append('<th>キャンセル</th>');
		tr3.append('<th>キャンセル</th>');
		tr1.append('<th>変更</th>');
		tr2.append('<th>変更</th>');
		tr3.append('<th>変更</th>');
		tr1.appendTo(pastbody);
		tr2.appendTo(nowbody);
		tr3.appendTo(futurebody);

		// ID,SITEM,WWHOUSE,KDATE,JDATE,QUA,NOS,KYEAR,KMONTH,KDAY,JYEAR,JMONTH,JDAY,MEMO

		for (var i = 0; i < todayktable.length; i++) {

			/*******************************************************************
			 * add new stock to tempforstockkinyuu
			 ******************************************************************/
			var record = todayktable[i];
			if (!record.SITEM)
				record = record.snb;
			var barcode = record.SITEM + ',' + record.WWHOUSE;
			var thisstockid = whitmapreverse.get(barcode);
			var quanjiatong3 = barcode + ',' + record.QUA + ',' + record.MEMO
					+ ',' + record.JYEAR + ',' + record.JMONTH + ','
					+ record.JDAY;

			/** ******************* new stock ******************************* */
			if (!thisstockid) { // not exist at first
				if (!tempforstockkinyuu.has(barcode)) {
					tempforstockkinyuu.set(barcode, 0);

				}
			}
			/** ************************************************* */

			if ((record.JYEAR == ye && record.JMONTH == mo && record.JDAY < day)
					|| (record.JYEAR == ye && record.JMONTH < mo)
					|| (record.JYEAR < ye)) {
				if (!pastmap.has(barcode)) {
					var value = [];
					var element = record.QUA + "," + record.JDATE + ","
							+ record.MEMO + "," + record.JYEAR + ","
							+ record.JMONTH + "," + record.JDAY;
					value.push(element);
					pastmap.set(barcode, value);
				} else {
					var value = pastmap.get(barcode);
					var element = record.QUA + "," + record.JDATE + ","
							+ record.MEMO + "," + record.JYEAR + ","
							+ record.JMONTH + "," + record.JDAY;
					value.push(element);
					pastmap.set(barcode, value); // barcode里面的whouseid是从1开始算得
				}

				var trpast = $('<tr id="tr,' + barcode + ',' + record.QUA + ','
						+ record.MEMO + ',' + record.JYEAR + ','
						+ record.JMONTH + ',' + record.JDAY + '"></tr>');
				trpast.append('<td>' + itmap.get(record.SITEM) + '</td>');
				trpast.append('<td>' + whouseMap.get(record.WWHOUSE - 1)
						+ '</td>');
				trpast.append('<td id="QUA,' + quanjiatong3 + '">' + record.QUA
						+ '</td>');
				trpast.append('<td id="JDATE,' + quanjiatong3 + '">'
						+ record.JDATE + '</td>'); // -> this is a difficult
				// part when get changed
				trpast.append('<td id="MEMO,' + quanjiatong3 + '">'
						+ record.MEMO + '</td>');
				trpast
						.append('<td><button class="btn btn-danger btn-xs" id="CANCEL,'
								+ quanjiatong3
								+ '" onclick="kinyuucancel(this)">キャンセル</button></td>');
				trpast
						.append('<td><button class="btn btn-info btn-xs seechange" id="CHANGE,'
								+ quanjiatong3
								+ '" onclick="kinyuuchange(this)">変更</button></td>');
				trpast.appendTo(pastbody);

			} else {
				if ((record.JYEAR == ye && record.JMONTH == mo && record.JDAY == day)) {
					if (!nowmap.has(barcode)) {
						var value = [];
						var element = record.QUA + "," + record.JDATE + ","
								+ record.MEMO + "," + record.JYEAR + ","
								+ record.JMONTH + "," + record.JDAY;
						value.push(element);
						nowmap.set(barcode, value);
					} else {
						var value = nowmap.get(barcode);
						var element = record.QUA + "," + record.JDATE + ","
								+ record.MEMO + "," + record.JYEAR + ","
								+ record.JMONTH + "," + record.JDAY;
						value.push(element);
						nowmap.set(barcode, value);
					}

					var trnow = $('<tr id="tr,' + barcode + ',' + record.QUA
							+ ',' + record.MEMO + ',' + record.JYEAR + ','
							+ record.JMONTH + ',' + record.JDAY + '"></tr>');
					trnow.append('<td>' + itmap.get(record.SITEM) + '</td>');
					trnow.append('<td>' + whouseMap.get(record.WWHOUSE - 1)
							+ '</td>');
					trnow.append('<td id="QUA,' + quanjiatong3 + '">'
							+ record.QUA + '</td>');
					trnow.append('<td id="JDATE,' + quanjiatong3 + '">'
							+ record.JDATE + '</td>'); // -> this is a
					// difficult
					// part when get changed
					trnow.append('<td id="MEMO,' + quanjiatong3 + '">'
							+ record.MEMO + '</td>');
					trnow
							.append('<td><button class="btn btn-danger btn-xs" id="CANCEL,'
									+ quanjiatong3
									+ '" onclick="kinyuucancel(this)">キャンセル</button></td>');
					trnow
							.append('<td><button class="btn btn-info btn-xs seechange" id="CHANGE,'
									+ quanjiatong3
									+ '" onclick="kinyuuchange(this)">変更</button></td>');
					trnow.appendTo(nowbody);

				} else {
					if (!futuremap.has(barcode)) {
						var value = [];
						var element = record.QUA + "," + record.JDATE + ","
								+ record.MEMO + "," + record.JYEAR + ","
								+ record.JMONTH + "," + record.JDAY;
						value.push(element);
						futuremap.set(barcode, value);
					} else {
						var value = futuremap.get(barcode);
						var element = record.QUA + "," + record.JDATE + ","
								+ record.MEMO + "," + record.JYEAR + ","
								+ record.JMONTH + "," + record.JDAY;
						value.push(element);
						futuremap.set(barcode, value);
					}

					var trfuture = $('<tr id="tr,' + barcode + ',' + record.QUA
							+ ',' + record.MEMO + ',' + record.JYEAR + ','
							+ record.JMONTH + ',' + record.JDAY + '"></tr>');
					trfuture.append('<td>' + itmap.get(record.SITEM) + '</td>');
					trfuture.append('<td>' + whouseMap.get(record.WWHOUSE - 1)
							+ '</td>');
					trfuture.append('<td id="QUA,' + quanjiatong3 + '">'
							+ record.QUA + '</td>');
					trfuture.append('<td id="JDATE,' + quanjiatong3 + '">'
							+ record.JDATE + '</td>'); // -> this is a
					// difficult
					// part when get changed
					trfuture.append('<td id="MEMO,' + quanjiatong3 + '">'
							+ record.MEMO + '</td>');
					trfuture
							.append('<td><button class="btn btn-danger btn-xs" id="CANCEL,'
									+ quanjiatong3
									+ '" onclick="kinyuucancel(this)">キャンセル</button></td>');
					trfuture
							.append('<td><button class="btn btn-info btn-xs seechange" id="CHANGE,'
									+ quanjiatong3
									+ '" onclick="kinyuuchange(this)">変更</button></td>');
					trfuture.appendTo(futurebody);
				}
			}
		}
		console.log(nowmap); // pastmap and nowmap has been built, now build
		// the
		// table
		console.log(pastmap);
		console.log(futuremap);
		maincontent.innerHTML += '<h3>遺漏記入テーブル</h3>';
		pastdiv.appendTo($("#pushobj1"));
		maincontent.innerHTML += '<br><hr><h3>本日入庫予定テーブル</h3>';
		nowdiv.appendTo($("#pushobj1"));
		maincontent.innerHTML += '<br><hr><h3>発注テーブル</h3>';
		futurediv.appendTo($("#pushobj1"));
		maincontent.innerHTML += '<button style="margin-left:800px" class="btn btn-success btn-lg" onclick="kinyuusubmit()">記入</button>';
		console.log(togethercache);
		console.log(tempforstockkinyuu);

	}
	countjidoukinyuu++;
}

function kinyuucancel(b) {
	// first get quanjiatong
	var ida = $(b).attr("id").substring(6);
	var idarray = $(b).attr("id").split(",");
	var sb1 = idarray[1], sb2 = idarray[2], sb3 = idarray[3], sb4 = idarray[4], sb5 = idarray[5], sb6 = idarray[6], sb7 = idarray[7];
	console.log(idarray);
	ida = "tr" + ida;
	console.log(ida);
	var cda = "CHANGE" + ida.substring(2);
	if (document.getElementById(cda).innerHTML === "保存") {
		alert("Please finish the change function first");
		return;
	}
	var trr = document.getElementById(ida);
	var tds = trr.getElementsByTagName('td');
	var newdatehere = tds[3].innerHTML.split("-");
	var n1 = parseInt(newdatehere[0]), n2 = parseInt(newdatehere[1]), n3 = parseInt(newdatehere[2]);
	var bigbang = sb1 + ',' + sb2 + ',' + tds[2].innerHTML + ','
			+ tds[4].innerHTML + ',' + n1 + ',' + n2 + ',' + n3;
	console.log(bigbang);
	console.log(arrayforkinyuu);

	for (var i = 0; i < arrayforkinyuu.length; i++) {
		if (arrayforkinyuu[i] === bigbang)
			arrayforkinyuu.splice(i, 1);
	}
	console.log(arrayforkinyuu);

	trr.remove();
}

var r1 = 0, r2 = 0, r3 = 0;

function kinyuuchange(b) {
	var changequanjiatong = $(b).attr("id");
	console.log(changequanjiatong);
	var id = $(b).attr("id").substring(7); // quanjiatong3
	console.log(id);

	// 把id里面日期前面的零去掉
	var xid = $(b).attr("id").substring(7).split(",");

	var idarray = $(b).attr("id").split(",");
	var sb1 = idarray[1], sb2 = idarray[2], sb3 = idarray[3], sb4 = idarray[4], sb5 = idarray[5], sb6 = idarray[6], sb7 = idarray[7];
	var inner = $(b)[0].innerHTML;
	console.log(inner);
	var trr = document.getElementById("tr," + id);
	console.log("tr," + id);
	console.log(trr);
	var tds = trr.getElementsByTagName('td');
	/** * */
	// var reneweddate = tds[3].innerHTML.split("-");
	// r1 = parseInt(reneweddate[0]),r2 =
	// parseInt(reneweddate[1]),r3=parseInt(reneweddate[2]);
	// 记录了在按下变更时，最原始的时间数据
	/** * */
	var idforqua = id + ",kc1", idfordate = id + ",kc2", idformemo = id
			+ ",kc3";
	console.log(trr);
	if (inner === "変更") {
		var arar = document.getElementsByClassName("seechange");
		for (var i = 0; i < arar.length; i++) {
			if (arar[i].innerHTML == "保存") {
				alert("変更を完成してください");
				return;
			}
		}
		var bigdatearray = tds[3].innerHTML.split("-");
		console.log(tds[3].innerHTML);
		console.log(bigdatearray);
		var bdate0 = parseInt(bigdatearray[0]), bdate1 = parseInt(bigdatearray[1]), bdate2 = parseInt(bigdatearray[2]);
		console.log(bdate2);
		r1 = parseInt(bigdatearray[0]), r2 = parseInt(bigdatearray[1]),
				r3 = parseInt(bigdatearray[2]);
		console.log('at henko, the old date is : ' + r1 + ',' + r2 + ',' + r3);
		var bigbang = sb1 + ',' + sb2 + ',' + tds[2].innerHTML + ','
				+ tds[4].innerHTML + ',' + bdate0 + ',' + bdate1 + ',' + bdate2;

		for (var i = 0; i < arrayforkinyuu.length; i++) {
			if (arrayforkinyuu[i] === bigbang)
				arrayforkinyuu.splice(i, 1);
		}
		console.log(arrayforkinyuu);
		// 2 3 4 input change
		var tds2 = parseInt(tds[2].innerHTML);
		var tds3 = tds[3].innerHTML;
		var tds4 = tds[4].innerHTML;
		tds[2].innerHTML = '<input name="q60" type="text" class="form-control"\
			id="'
				+ idforqua + '" size="2" value="' + tds2 + '">';
		tds[3].innerHTML = '<input name="q61" type="date" class="form-control"\
			id="'
				+ idfordate + '" value="' + tds3 + '">';
		tds[4].innerHTML = '<input name="q60" type="text" class="form-control"\
			id="'
				+ idformemo + '" size="2" value="' + tds4 + '">';
		tds[6].innerHTML = '<td><button class="btn btn-success btn-xs seechange" id="'
				+ changequanjiatong
				+ '" onclick="kinyuuchange(this)">保存</button></td>';

		// var barcode = sb1 + ',' + sb2;
		// console.log(barcode);
		// if (tempforstockkinyuu.has(barcode)) {
		// var oritemp = tempforstockkinyuu.get(barcode);
		// tempforstockkinyuu.set(barcode, oritemp - tds2);
		// } else {
		// var thisstockid = whitmapreverse.get(barcode);
		// var whouseindex = parseInt(sb2) - 1;
		// togethercache[whouseindex].get(thisstockid).stock -= tds2;
		// }
		//
		// console.log(togethercache);
		// console.log(tempforstockkinyuu);
	} else {

		var newdelta = document.getElementById(idforqua).value;
		var newdate = document.getElementById(idfordate).value;
		var newmemo = document.getElementById(idformemo).value;
		var newdatearr = newdate.split("-");
		console.log(newdatearr);

		if (!newdelta) {
			alert("please enter a proper number");
			return;
		}

		else {
			for (var i = 0; i < newdelta.length; i++) {
				if (valueIsNaN(parseInt(newdelta.charAt(i)))) {
					alert("please enter a proper number");
					return;
				}
			}
		}
		if (!newmemo) {
			alert("メモを記入してください");
			return;
		}

		if (!newdate) {
			alert("日付を記入してください");
			return;
		}

		var checkdup = sb1 + ',' + sb2 + ',' + newdelta + ',' + newmemo + ','
				+ parseInt(newdatearr[0]) + ',' + parseInt(newdatearr[1]) + ','
				+ parseInt(newdatearr[2]);
		console.log(checkdup);
		if (arrayforkinyuu.includes(checkdup)) {
			alert("duplicate");
			return;
		} else {
			arrayforkinyuu.push(checkdup);
		}
		console.log(arrayforkinyuu);
		// var newdatearr = newdate.split("-");
		if ((r1 === ye && r2 === mo && r3 < day) || (r1 === ye && r2 < mo)
				|| (r1 < ye)) {

			console.log('the old date is : ' + r1 + ',' + r2 + ',' + r3);

			if (parseInt(newdatearr[0]) > ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) > mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) > day)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) === day)) {

				for (var j = 0; j < arrayforkinyuu.length; j++) {
					if (arrayforkinyuu[j] === checkdup)
						arrayforkinyuu.splice(j, 1);
				}
				alert("すでに発生した入庫記録です！本日以後の日付に変更することはできません。");
				return;
			} else {
				// var newid = sb1 + ',' + sb2 + ',' + newdelta + ',' + newmemo
				// + ',' + parseInt(newdatearr[0]) + ','
				// + parseInt(newdatearr[1]) + ','
				// + parseInt(newdatearr[2]);
				tds[2].innerHTML = newdelta;
				// trpast.append('<td id="QUA,' + quanjiatong3 + '">' +
				// record.QUA+ '</td>');
				tds[3].innerHTML = newdate;
				tds[4].innerHTML = newmemo;
				tds[5].innerHTML = '<td><button class="btn btn-danger btn-xs" id="CANCEL,'
						+ id
						+ '" onclick="kinyuucancel(this)">キャンセル</button></td>';
				tds[6].innerHTML = '<td><button class="btn btn-info btn-xs seechange" id="CHANGE,'
						+ id
						+ '" onclick="kinyuuchange(this)">変更</button></td>';
			}
		} else if (r1 === ye && r2 === mo && r3 === day) {

			console.log('the old date is : ' + r1 + ',' + r2 + ',' + r3);

			if (parseInt(newdatearr[0]) < ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) < mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) < day)) {
				for (var j = 0; j < arrayforkinyuu.length; j++) {
					if (arrayforkinyuu[j] === checkdup)
						arrayforkinyuu.splice(j, 1);
				}
				alert("まだ入庫していないので、本日以前の日付に変更することはできません。");
				return;
			} else if (parseInt(newdatearr[0]) > ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) > mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) > day)) {
				if (window.confirm("今後入庫予定に移りますか？")) {
					trr.remove();
					// var newid = sb1 + ',' + sb2 + ',' + newdelta + ','
					// + newmemo + ',' + parseInt(newdatearr[0]) + ','
					// + parseInt(newdatearr[1]) + ','
					// + parseInt(newdatearr[2]);
					var trnew = $('<tr id="tr,' + id + '"></tr>');
					trnew.append('<td id="' + id + '">' + tds[0].innerHTML
							+ '</td>');
					trnew.append('<td id="' + id + '">' + tds[1].innerHTML
							+ '</td>');
					trnew.append('<td id="QUA,' + id + '">' + newdelta
							+ '</td>');
					trnew.append('<td id="JDATE,' + id + '">' + newdate
							+ '</td>');
					trnew.append('<td id="MEMO,' + id + '">' + newmemo
							+ '</td>');
					trnew
							.append('<td><button class="btn btn-danger btn-xs" id="CANCEL,'
									+ id
									+ '" onclick="kinyuucancel(this)">キャンセル</button></td>');
					trnew
							.append('<td><button class="btn btn-info btn-xs seechange" id="CHANGE,'
									+ id
									+ '" onclick="kinyuuchange(this)">変更</button></td>');
					console.log(trnew);
					trnew.appendTo($("tbody#futurebody"));
				} else {
					alert("You have entered an invalid date");
				}
			} else {
				// var newid = sb1 + ',' + sb2 + ',' + newdelta + ',' + newmemo
				// + ',' + parseInt(newdatearr[0]) + ','
				// + parseInt(newdatearr[1]) + ','
				// + parseInt(newdatearr[2]);

				tds[2].innerHTML = newdelta;
				tds[3].innerHTML = newdate;
				tds[4].innerHTML = newmemo;
				tds[5].innerHTML = '<td><button class="btn btn-danger btn-xs" id="CANCEL,'
						+ id
						+ '" onclick="kinyuucancel(this)">キャンセル</button></td>';
				tds[6].innerHTML = '<td><button class="btn btn-info btn-xs seechange" id="CHANGE,'
						+ id
						+ '" onclick="kinyuuchange(this)">変更</button></td>';
			}
		} else {
			// future
			console.log('the old date is : ' + r1 + ',' + r2 + ',' + r3);

			if (parseInt(newdatearr[0]) < ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) < mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) < day)) {
				for (var j = 0; j < arrayforkinyuu.length; j++) {
					if (arrayforkinyuu[j] === checkdup)
						arrayforkinyuu.splice(j, 1);
				}
				alert("まだ入庫していないので、本日以前の日付に変更することはできません。");
				return;
			} else if (parseInt(newdatearr[0]) === ye
					&& parseInt(newdatearr[1]) === mo
					&& parseInt(newdatearr[2]) === day) {
				if (window.confirm("本日入庫予定に移りますか？")) {
					trr.remove();
					// var newid = sb1 + ',' + sb2 + ',' + newdelta + ','
					// + newmemo + ',' + parseInt(newdatearr[0]) + ','
					// + parseInt(newdatearr[1]) + ','
					// + parseInt(newdatearr[2]);

					var trnew = $('<tr id="tr,' + id + '"></tr>');
					trnew.append('<td id="' + id + '">' + tds[0].innerHTML
							+ '</td>');
					trnew.append('<td id="' + id + '">' + tds[1].innerHTML
							+ '</td>');
					trnew.append('<td id="QUA,' + id + '">' + newdelta
							+ '</td>');
					trnew.append('<td id="JDATE,' + id + '">' + newdate
							+ '</td>');
					trnew.append('<td id="MEMO,' + id + '">' + newmemo
							+ '</td>');
					trnew
							.append('<td><button class="btn btn-danger btn-xs" id="CANCEL,'
									+ id
									+ '" onclick="kinyuucancel(this)">キャンセル</button></td>');
					trnew
							.append('<td><button class="btn btn-info btn-xs　seechange btn-xs" id="CHANGE,'
									+ id
									+ '" onclick="kinyuuchange(this)">変更</button></td>');
					console.log(trnew);
					trnew.appendTo($("tbody#nowbody"));
				}
			} else {
				// var newid = sb1 + ',' + sb2 + ',' + newdelta + ',' + newmemo
				// + ',' + parseInt(newdatearr[0]) + ','
				// + parseInt(newdatearr[1]) + ','
				// + parseInt(newdatearr[2]);

				tds[2].innerHTML = newdelta;
				tds[3].innerHTML = newdate;
				tds[4].innerHTML = newmemo;
				tds[6].innerHTML = '<td><button class="btn btn-info btn-xs seechange" id="CHANGE,'
						+ id
						+ '" onclick="kinyuuchange(this)">変更</button></td>';
			}

		}
	}
}

function kinyuusubmit() {
	flag = false;
	// 删除snb里面的今日记录等
	var arar = document.getElementsByClassName("seechange");
	for (var i = 0; i < arar.length; i++) {
		if (arar[i].innerHTML == "保存") {
			alert("変更を完成してください");
			return;
		}
	}
	console.log(tempforstockkinyuu);
	/***************************************************************************
	 * push into stock new stockid
	 **************************************************************************/

	var tempkeys = tempforstockkinyuu.keys();
	while (true) {
		var key = tempkeys.next().value;
		if (key != null) {
			console.log(key);
			var value = parseInt(tempforstockkinyuu.get(key));
			console.log(value);
			var insertostock = [];
			var keyarray = key.split(",");
			var iddd = alasql('SELECT MAX(id) + 1 as id FROM stock')[0].id;
			insertostock.push(iddd);
			insertostock.push(parseInt(keyarray[0]));
			insertostock.push(parseInt(keyarray[1]));
			insertostock.push(value);
			alasql(
					'INSERT INTO stock(\
						id, \
						item, \
						whouse, \
						balance)\
						VALUES(?,?,?,?);',
					insertostock);
		} else
			break;
	}
	whitmap = new Map();
	whitmapreverse = new Map();
	whit = alasql('select * from stock');

	for (var i = 0; i < whit.length; i++) {
		var whitele = whit[i];
		whitmap.set(whitele.stock.id, [ whitele.stock.item,
				whitele.stock.whouse ]);
		whitmapreverse.set(whitele.stock.item + ',' + whitele.stock.whouse,
				whitele.stock.id);
	}
	console.log(whitmapreverse);
	console.log(alasql('select * from stock'));

	/** ********************************************************* */

	// today and future get to future, past get to trans
	// ID,STOCK,DATE,QTY,BALANCE,MEMO,YEAR,MONTH,DAY
	var rows = document.getElementById("pasttable").rows;
	for (var i = 1; i < rows.length; i++) {
		var tds = rows[i].cells;
		var arraytoinsert = [];
		var iddd = alasql('SELECT MAX(id) + 1 as id FROM trans')[0].id;
		arraytoinsert.push(iddd);
		var a = parseInt(tds[2].id.split(",")[1]);
		var b = parseInt(tds[2].id.split(",")[2]);
		var barcode = a + ',' + b;
		var c = whitmapreverse.get(a + ',' + b);
		arraytoinsert.push(c);
		arraytoinsert.push(tds[3].innerHTML);
		arraytoinsert.push(parseInt(tds[2].innerHTML));
		var y = 0;
		if (tempforstockkinyuu.has(barcode)) {
			var x = tempforstockkinyuu.get(barcode);
			y = x + parseInt(tds[2].innerHTML);
			tempforstockkinyuu.set(barcode, y);
		} else {
			togethercache[b - 1].get(c).stock += parseInt(tds[2].innerHTML);
			y = togethercache[b - 1].get(c).stock;
		}
		console.log(y);

		arraytoinsert.push(y);
		arraytoinsert.push(tds[4].innerHTML);
		var arr = tds[3].innerHTML.split("-");
		arraytoinsert.push(parseInt(arr[0]));
		arraytoinsert.push(parseInt(arr[1]));
		arraytoinsert.push(parseInt(arr[2]));
		alasql(
				'INSERT INTO trans(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arraytoinsert);

	}

	// arrayforsouko = [];
	// tempforstock = new Map();
	// savesoukoclicked = 0;

	/** **************now and futuretable******************** */

	// id,stock,date,qty,balance,memo,year,month,day
	var rows2 = document.getElementById("nowtable").rows;
	if (rows2.length > 1)
		flag = true;
	for (var i = 1; i < rows2.length; i++) {
		var tds = rows2[i].cells;
		var arraytoinsert = [];
		var iddd = 0;
		if (alasql('select * from future') === null
				|| alasql('select * from future').length === 0) {
			iddd = 1;
		} else
			iddd = alasql('SELECT MAX(id) + 1 as id FROM future')[0].id;
		arraytoinsert.push(iddd);
		var a = parseInt(tds[2].id.split(",")[1]);
		console.log(a);
		var b = parseInt(tds[2].id.split(",")[2]);
		var barcode = a + ',' + b;
		var c = whitmapreverse.get(a + ',' + b);
		arraytoinsert.push(c);
		arraytoinsert.push(tds[3].innerHTML);
		arraytoinsert.push(parseInt(tds[2].innerHTML));
		var y = 0;
		if (tempforstockkinyuu.has(barcode)) {
			console.log("true");
			var x = tempforstockkinyuu.get(barcode);
			y = x + parseInt(tds[2].innerHTML);
			tempforstockkinyuu.set(barcode, y);
		} else {
			togethercache[b - 1].get(c).stock += parseInt(tds[2].innerHTML);
			y = togethercache[b - 1].get(c).stock;
		}
		console.log(y);

		arraytoinsert.push(y);
		arraytoinsert.push(tds[4].innerHTML);
		var arr = tds[3].innerHTML.split("-");
		arraytoinsert.push(parseInt(arr[0]));
		arraytoinsert.push(parseInt(arr[1]));
		arraytoinsert.push(parseInt(arr[2]));
		alasql(
				'INSERT INTO future(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arraytoinsert);

	}

	var rows3 = document.getElementById("futuretable").rows;
	for (var i = 1; i < rows3.length; i++) {
		var tds = rows3[i].cells;
		var arraytoinsert = [];
		var iddd = 0;
		if (alasql('select * from future') === null
				|| alasql('select * from future').length === 0) {
			iddd = 1;
		} else
			iddd = alasql('SELECT MAX(id) + 1 as id FROM future')[0].id;
		arraytoinsert.push(iddd);
		var a = parseInt(tds[2].id.split(",")[1]);
		var b = parseInt(tds[2].id.split(",")[2]);
		var barcode = a + ',' + b;
		var c = whitmapreverse.get(a + ',' + b);
		arraytoinsert.push(c);
		arraytoinsert.push(tds[3].innerHTML);
		arraytoinsert.push(parseInt(tds[2].innerHTML));
		var y = 0;
		if (tempforstockkinyuu.has(barcode)) {
			console.log("true");
			var x = tempforstockkinyuu.get(barcode);
			y = x + parseInt(tds[2].innerHTML);
			tempforstockkinyuu.set(barcode, y);
		} else {
			togethercache[b - 1].get(c).stock += parseInt(tds[2].innerHTML);
			y = togethercache[b - 1].get(c).stock;
		}
		console.log(y);

		arraytoinsert.push(y);
		arraytoinsert.push(tds[4].innerHTML);
		var arr = tds[3].innerHTML.split("-");
		arraytoinsert.push(parseInt(arr[0]));
		arraytoinsert.push(parseInt(arr[1]));
		arraytoinsert.push(parseInt(arr[2]));
		alasql(
				'INSERT INTO future(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arraytoinsert);

	}

	pastmap = new Map(), nowmap = new Map(), futuremap = new Map();
	arrayforkinyuu = [];
	tempforstockkinyuu = new Map();
	countjidoukinyuu = 0;

	alasql('DELETE FROM snb WHERE KYEAR=? and KMONTH=? and KDAY=? and NOS = 1',
			[ ye, mo, day ]);
	console.log(alasql('select * from snb'));
	document.getElementById("pushobjxx").innerHTML = '';
	document.getElementById("pushobj1").innerHTML = '';
	document.getElementById("pushobjx").innerHTML = '';
	document.getElementById("pushobj2").innerHTML = '';
	document.getElementById("pushobj3").innerHTML = '';
	document.getElementById("pushobj2").innerHTML = '<p>自動入庫記入は完成しました。</p>';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
		                                                onclick = "openpage()">在庫一覧参考</button></div><br>';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
        onclick = "jidoukn()">自動出庫記入を行う</button></div><br>';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
        onclick = "tekinyuu()">緊急入庫手記入</button></div><br>';
	if (flag === true) {
		document.getElementById("pushobj2").innerHTML += '<div><p>本日に入庫した商品があります。入庫チェックを行ってください。</p><button class="btn btn-primary btn-round"\
            onclick = "kinyuucheck()">入庫チェックへ</button></div>';
	}

	document.getElementById("havefun").innerHTML = "自動記入（済）";

	console.log(alasql('select * from future'));
}

/** ******************************************************************************************************************** */

function tekinyuu() {
	refresh2();
	refreshsecondpart();
	pastmap = new Map(), nowmap = new Map(), futuremap = new Map();
	arrayforkinyuu = [];
	tempforstockkinyuu = new Map();
	countjidoukinyuu = 0;
	countjidoukinyuu2 = 0;
	counttekinyuu2 = 0;

	if (counttekinyuu == 0) {
		maincontent.innerHTML = "";
		subcontent.innerHTML = "";
		document.getElementById("pushobjxx").innerHTML = '';
		document.getElementById("pushobj1").innerHTML = '';
		document.getElementById("pushobj2").innerHTML = '';
		document.getElementById("pushobj3").innerHTML = '';
		if (document.getElementById("rightpanel") != null) {

			document.getElementById("rightpanel").parentNode
					.removeChild(document.getElementById("rightpanel"));
		}

		$('#pushobj1')
				.append(
						'<br>\
<label>倉庫先</label> <select name="q70" class="form-control"\
	id="tekiwhouse1"><option value="0">未選択</option>\
</select>\</div>');

		$('#pushobj1')
				.append(
						'<br>\
<label>アイテム</label> <select name="q71" class="form-control"\
id="tekiitem1"><option value="0">未選択</option>\
</select>\</div><br>');

		for (var i = 0; i < whouses.length; i++) {
			var ip = whouses[i];
			console.log(ip.whouse.name);
			var option = $('<option>');
			option.attr('value', ip.whouse.name);
			option.attr('id', 'tka' + i);
			option.text(ip.whouse.name);
			$('select[name="q70"]').append(option);
		}

		for (var i = 0; i < itemstring.length; i++) {
			var ip = itemstring[i];
			var option = $('<option>');
			option.attr('value', ip);
			option.attr('id', 'itemtka' + i);
			option.text(ip);
			$('select[name="q71"]').append(option);
		}

		document.getElementById("pushobj1").innerHTML += '<div><label>数量:</label>\
			<input name="q74" type="text" class="form-control" id="dream" size="4"\
			 ></div><br>';
		document.getElementById("pushobj1").innerHTML += '<div><label>入庫日付:</label>\
			<button class="btn btn-xs btn-warning" onclick="selecttoday()">本日</button>\
			<input name="q72" type="date" class="form-control" id="happiness" size="4"\
			 ></div>';
		document.getElementById("pushobj1").innerHTML += '<br><div><label>メモ:</label>\
			<input name="q73" type="text" class="form-control" id="flower" size="8"\
			 ></div>';

		document.getElementById("pushobj1").innerHTML += '<br><div><button class="btn btn-success btn-round btn-lg"\
			onclick="coreteki()">記入</button>';

		var rightpanel = $('<div style="margin-top:-600px;margin-left:700px;width:40%;" class="panel panel-warning" id="rightpanel"></div>');
		var body = $("body");
		var rpheading = $('<div class="panel-heading"></div>');
		rpheading
				.append('<div class="btn-group" data-toggle="buttons">\
	<label class="btn btn-warning btn-simple active" onclick="haha(this)" id="pastt">\
		<input type="checkbox" autocomplete="off" name="ch" checked> 遺漏\
	</label>\
	<label class="btn btn-warning btn-simple" onclick="haha(this)" id="nowt">\
		<input type="checkbox" name="ch" autocomplete="off"> 本日入庫\
	</label>\
	<label class="btn btn-warning　btn-simple" onclick="haha(this)" id="futuret">\
		<input type="checkbox" name="ch" autocomplete="off"> 発注\
	</label>\
	<button class="btn btn-info" onclick="tekisubmit()" style="margin-left:180px;">サブミット</button>\
       </div>');
		rpheading.appendTo(rightpanel);
		rightpanel.appendTo(body);

		var rpbody = $('<div class="panel-heading">ここで入力した記録を参照することができます。</div>');
		rpbody.appendTo(rightpanel);

		var container = $('<div id="container"></div>');
		container.appendTo(rightpanel);

	}
	counttekinyuu++;
}

function coreteki() {
	var cangku = document.getElementById("tekiwhouse1").value;
	var dongxi = document.getElementById("tekiitem1").value;
	var shuliang = document.getElementById("dream").value;
	var riqi = document.getElementById("happiness").value;
	var biji = document.getElementById("flower").value;
	console.log(biji);
	if (cangku === "0" || dongxi === "0" || riqi === "" || biji === ""
			|| shuliang === "") {
		alert("Some places remain to be filled");
		return;
	}
	
	if (!shuliang) {
		alert("please enter a proper number");
		return;
	}

	else {
		for (var i = 0; i < shuliang.length; i++) {
			if (valueIsNaN(parseInt(shuliang.charAt(i)))) {
				alert("please enter a proper number");
				return;
			}
		}
	}
	
	
	
	var riqishulie = riqi.split("-");
	var cangkuid = whouseMapRev.get(cangku) + 1;
	var dongxiid = itemmap.get(dongxi);
	var checkshulie = dongxiid + ',' + cangkuid + ',' + shuliang + ',' + biji
			+ ',' + parseInt(riqishulie[0]) + ',' + parseInt(riqishulie[1])
			+ ',' + parseInt(riqishulie[2]);

	console.log(checkshulie);
	console.log(arrayforkinyuu);

	for (var i = 0; i < arrayforkinyuu.length; i++) {
		if (arrayforkinyuu[i] === checkshulie) {
			alert("duplicate");
			return;
		}
	}

	arrayforkinyuu.push(checkshulie);

	var barcode = dongxiid + ',' + cangkuid;
	if (!whitmapreverse.has(barcode)) {
		tempforstockkinyuu.set(barcode, 0);
	}

	console.log(riqishulie);
	console.log(ye + ',' + mo + ',' + day);

	var quanjiatong4 = barcode + ',' + shuliang + ',' + biji + ','
			+ riqishulie[0] + ',' + riqishulie[1] + ',' + riqishulie[2];

	if ((ye === parseInt(riqishulie[0]) && mo === parseInt(riqishulie[1]) && parseInt(riqishulie[2]) < day)
			|| (ye === parseInt(riqishulie[0]) && parseInt(riqishulie[1]) < mo)
			|| (parseInt(riqishulie[0]) < ye)) {
		// add to pastmap

		console.log("in the past");

		if (!pastmap.has(barcode)) {
			var value = [];
			var element = shuliang + "," + riqi + "," + biji + ","
					+ riqishulie[0] + "," + riqishulie[1] + "," + riqishulie[2];
			value.push(element);
			pastmap.set(barcode, value);
		} else {
			var value = pastmap.get(barcode);
			var element = shuliang + "," + riqi + "," + biji + ","
					+ riqishulie[0] + "," + riqishulie[1] + "," + riqishulie[2];
			value.push(element);
			pastmap.set(barcode, value); // barcode里面的whouseid是从1开始算得
		}

		console.log(quanjiatong4);
		var trpast = $('<tr id="tekitr,' + quanjiatong4 + '"></tr>');
		trpast.append('<td>' + dongxi + '</td>');
		trpast.append('<td>' + cangku + '</td>');
		trpast.append('<td id="shuliang,' + quanjiatong4 + '">' + shuliang
				+ '</td>');
		trpast.append('<td id="riqi,' + quanjiatong4 + '">' + riqi + '</td>'); // ->
		// this
		// is a
		// difficult
		// part when get changed
		trpast.append('<td id="biji,' + quanjiatong4 + '">' + biji + '</td>');
		trpast.append('<td><button class="btn btn-danger btn-xs" id="quxiao,'
				+ quanjiatong4
				+ '" onclick="tekicancel(this)">キャンセル</button></td>');
		trpast
				.append('<td><button class="btn btn-info btn-xs helloworld" id="bianji,'
						+ quanjiatong4
						+ '" onclick="tekichange(this)">変更</button></td>');
		trpast.appendTo(ptbody);

	} else {

		if ((parseInt(riqishulie[0]) == ye && parseInt(riqishulie[1]) == mo && parseInt(riqishulie[2]) == day)) {
			if (!nowmap.has(barcode)) {
				var value = [];
				var element = shuliang + "," + riqi + "," + biji + ","
						+ riqishulie[0] + "," + riqishulie[1] + ","
						+ riqishulie[2];
				value.push(element);
				nowmap.set(barcode, value);
			} else {
				var value = nowmap.get(barcode);
				var element = shuliang + "," + riqi + "," + biji + ","
						+ riqishulie[0] + "," + riqishulie[1] + ","
						+ riqishulie[2];
				value.push(element);
				nowmap.set(barcode, value);
			}

			var trnow = $('<tr id="tekitr,' + quanjiatong4 + '"></tr>');
			trnow.append('<td>' + dongxi + '</td>');
			trnow.append('<td>' + cangku + '</td>');
			trnow.append('<td id="shuliang,' + quanjiatong4 + '">' + shuliang
					+ '</td>');
			trnow
					.append('<td id="riqi,' + quanjiatong4 + '">' + riqi
							+ '</td>'); // -> this is a
			// difficult
			// part when get changed
			trnow
					.append('<td id="biji,' + quanjiatong4 + '">' + biji
							+ '</td>');
			trnow
					.append('<td><button class="btn btn-danger btn-xs" id="quxiao,'
							+ quanjiatong4
							+ '" onclick="tekicancel(this)">キャンセル</button></td>');
			trnow
					.append('<td><button class="btn btn-info btn-xs helloworld" id="bianji,'
							+ quanjiatong4
							+ '" onclick="tekichange(this)">変更</button></td>');
			trnow.appendTo(ntbody);

		} else {
			if (!futuremap.has(barcode)) {
				var value = [];
				var element = shuliang + "," + riqi + "," + biji + ","
						+ riqishulie[0] + "," + riqishulie[1] + ","
						+ riqishulie[2];
				value.push(element);
				futuremap.set(barcode, value);
			} else {
				var value = futuremap.get(barcode);
				var element = shuliang + "," + riqi + "," + biji + ","
						+ riqishulie[0] + "," + riqishulie[1] + ","
						+ riqishulie[2];
				value.push(element);
				futuremap.set(barcode, value);
			}

			var trfuture = $('<tr id="tekitr,' + quanjiatong4 + '"></tr>');
			trfuture.append('<td>' + dongxi + '</td>');
			trfuture.append('<td>' + cangku + '</td>');
			trfuture.append('<td id="shuliang,' + quanjiatong4 + '">'
					+ shuliang + '</td>');
			trfuture.append('<td id="riqi,' + quanjiatong4 + '">' + riqi
					+ '</td>'); // -> this is a
			trfuture.append('<td id="biji,' + quanjiatong4 + '">' + biji
					+ '</td>');
			trfuture
					.append('<td><button class="btn btn-danger btn-xs" id="quxiao,'
							+ quanjiatong4
							+ '" onclick="tekicancel(this)">キャンセル</button></td>');
			trfuture
					.append('<td><button class="btn btn-info btn-xs helloworld" id="bianji,'
							+ quanjiatong4
							+ '" onclick="tekichange(this)">変更</button></td>');
			trfuture.appendTo(ftbody);
		}
	}

}

function haha(b) {
	var id = $(b).attr("id");
	document.getElementById("container").innerHTML = '';
	if (id === "pastt") {
		$("div#container").append(ptable);
	} else if (id === "nowt")
		$("div#container").append(ntable);
	else
		$("div#container").append(ftable);
}

function selecttoday() {
	if (mo < 10 && day < 10)
		document.getElementById("happiness").value = ye + "-0" + mo + "-0"
				+ day;
	else if (mo < 10)
		document.getElementById("happiness").value = ye + "-0" + mo + "-" + day;
	else if (day < 10)
		document.getElementById("happiness").value = ye + "-" + mo + "-0" + day;
	else
		document.getElementById("happiness").value = ye + "-" + mo + "-" + day;
}

function tekicancel(b) {
	var ida = $(b).attr("id").substring(6); // you douhao
	var idarray = $(b).attr("id").split(",");
	var sb1 = idarray[1], sb2 = idarray[2], sb3 = idarray[3], sb4 = idarray[4], sb5 = idarray[5], sb6 = idarray[6], sb7 = idarray[7];
	console.log(idarray);
	ida = "tekitr" + ida;
	console.log(ida);
	var cda = "bianji" + ida.substring(6);
	if (document.getElementById(cda).innerHTML === "保存") {
		alert("Please finish the change function first");
		return;
	}
	var trr = document.getElementById(ida);
	var tds = trr.getElementsByTagName('td');
	var ndadate = tds[3].innerHTML.split("-");

	var bigbang = sb1 + ',' + sb2 + ',' + tds[2].innerHTML + ','
			+ tds[4].innerHTML + ',' + parseInt(ndadate[0]) + ','
			+ parseInt(ndadate[1]) + ',' + parseInt(ndadate[2]);
	console.log(bigbang);
	console.log(arrayforkinyuu);

	for (var i = 0; i < arrayforkinyuu.length; i++) {
		if (arrayforkinyuu[i] === bigbang)
			arrayforkinyuu.splice(i, 1);
	}
	console.log(arrayforkinyuu);

	trr.remove();
}

var tekir1 = 0, tekir2 = 0, tekir3 = 0;
function tekichange(b) {
	var changequanjiatong = $(b).attr("id");
	var id = $(b).attr("id").substring(7); // quanjiatong3 mei dou hao
	var idarray = $(b).attr("id").split(",");
	var sb1 = idarray[1], sb2 = idarray[2], sb3 = idarray[3], sb4 = idarray[4], sb5 = idarray[5], sb6 = idarray[6], sb7 = idarray[7];
	var inner = $(b)[0].innerHTML;
	console.log(inner);
	var trr = document.getElementById("tekitr," + id);
	console.log(trr);
	var tds = trr.getElementsByTagName('td');
	var idforqua = id + ",tksb1", idfordate = id + ",tksb2", idformemo = id
			+ ",tksb3";
	console.log(trr);

	if (inner === "変更") {
		var bigdatearray = tds[3].innerHTML.split("-");
		var bdate0 = parseInt(bigdatearray[0]), bdate1 = parseInt(bigdatearray[1]), bdate2 = parseInt(bigdatearray[2]);
		tekir1 = parseInt(bigdatearray[0]), tekir2 = parseInt(bigdatearray[1]),
				tekir3 = parseInt(bigdatearray[2]);
		var bigbang = sb1 + ',' + sb2 + ',' + tds[2].innerHTML + ','
				+ tds[4].innerHTML + ',' + bdate0 + ',' + bdate1 + ',' + bdate2;

		for (var i = 0; i < arrayforkinyuu.length; i++) {
			if (arrayforkinyuu[i] === bigbang)
				arrayforkinyuu.splice(i, 1);
		}
		console.log(arrayforkinyuu);
		// 2 3 4 input change
		var tds2 = parseInt(tds[2].innerHTML);
		var tds3 = tds[3].innerHTML;
		var tds4 = tds[4].innerHTML;
		tds[2].innerHTML = '<input name="q80" type="text" class="form-control"\
			id="'
				+ idforqua + '" size="2" value="' + tds2 + '">';
		tds[3].innerHTML = '<input name="q81" type="date" class="form-control"\
			id="'
				+ idfordate + '" value="' + tds3 + '">';
		tds[4].innerHTML = '<input name="q82" type="text" class="form-control"\
			id="'
				+ idformemo + '" size="2" value="' + tds4 + '">';
		tds[6].innerHTML = '<td><button class="btn btn-success btn-xs helloworld" id="'
				+ changequanjiatong
				+ '" onclick="tekichange(this)">保存</button></td>';
	} else {

		var newdelta = document.getElementById(idforqua).value;
		var newdate = document.getElementById(idfordate).value;
		var newmemo = document.getElementById(idformemo).value;
		var newdatearr = newdate.split("-");
		console.log(newdatearr);

		if (!newdelta) {
			alert("please enter a proper number");
			return;
		}

		else {
			for (var i = 0; i < newdelta.length; i++) {
				if (valueIsNaN(parseInt(newdelta.charAt(i)))) {
					alert("please enter a proper number");
					return;
				}
			}
		}
		if (!newmemo) {
			alert("メモを記入してください");
			return;
		}

		if (!newdate) {
			alert("日付を記入してください");
			return;
		}

		var checkdup = sb1 + ',' + sb2 + ',' + newdelta + ',' + newmemo + ','
				+ parseInt(newdatearr[0]) + ',' + parseInt(newdatearr[1]) + ','
				+ parseInt(newdatearr[2]);
		console.log(checkdup);
		if (arrayforkinyuu.includes(checkdup)) {
			alert("duplicate");
			return;
		} else {
			arrayforkinyuu.push(checkdup);
		}
		console.log(arrayforkinyuu);
		// var newdatearr = newdate.split("-");
		if ((tekir1 === ye && tekir2 === mo && tekir3 < day)
				|| (tekir1 === ye && tekir2 < mo) || (tekir1 < ye)) {

			if (parseInt(newdatearr[0]) > ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) > mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) > day)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) === day)) {

				for (var j = 0; j < arrayforkinyuu.length; j++) {
					if (arrayforkinyuu[j] === checkdup) {
						arrayforkinyuu.splice(j, 1);
					}
				}
				alert("すでに発生した入庫記録です！本日以後の日付に変更することはできません。");
				return;
			} else {
				tds[2].innerHTML = newdelta;
				tds[3].innerHTML = newdate;
				tds[4].innerHTML = newmemo;
				tds[5].innerHTML = '<td><button class="btn btn-danger btn-xs" id="quxiao,'
						+ id
						+ '" onclick="tekicancel(this)">キャンセル</button></td>';
				tds[6].innerHTML = '<td><button class="btn btn-info btn-xs helloworld" id="bianji,'
						+ id + '" onclick="tekichange(this)">変更</button></td>';
			}
		} else if (tekir1 === ye && tekir2 === mo && tekir3 === day) {
			if (parseInt(newdatearr[0]) < ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) < mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) < day)) {
				for (var j = 0; j < arrayforkinyuu.length; j++) {
					if (arrayforkinyuu[j] === checkdup) {
						arrayforkinyuu.splice(j, 1);
					}
				}
				alert("まだ入庫していないので、本日以前の日付に変更することはできません。");
				return;
			} else if (parseInt(newdatearr[0]) > ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) > mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) > day)) {
				if (window.confirm("今後入庫予定に移りますか？")) {
					trr.remove();

					var trnew = $('<tr id="tekitr,' + id + '"></tr>');
					trnew.append('<td>' + tds[0].innerHTML + '</td>');
					trnew.append('<td>' + tds[1].innerHTML + '</td>');
					trnew.append('<td id="shuliang,' + id + '">' + newdelta
							+ '</td>');
					trnew.append('<td id="riqi,' + id + '">' + newdate
							+ '</td>');
					trnew.append('<td id="biji,' + id + '">' + newmemo
							+ '</td>');
					trnew
							.append('<td><button class="btn btn-danger btn-xs" id="quxiao,'
									+ id
									+ '" onclick="tekicancel(this)">キャンセル</button></td>');
					trnew
							.append('<td><button class="btn btn-info btn-xs helloworld" id="bianji,'
									+ id
									+ '" onclick="tekichange(this)">変更</button></td>');
					console.log(trnew);
					trnew.appendTo(ftbody);

				} else {
					alert("You have entered an invalid date");
				}
			} else {
				tds[2].innerHTML = newdelta;
				tds[3].innerHTML = newdate;
				tds[4].innerHTML = newmemo;
				tds[5].innerHTML = '<td><button class="btn btn-danger btn-xs" id="quxiao,'
						+ id
						+ '" onclick="tekicancel(this)">キャンセル</button></td>';
				tds[6].innerHTML = '<td><button class="btn btn-info btn-xs helloworld" id="bianji,'
						+ id + '" onclick="tekichange(this)">変更</button></td>';
			}
		} else {
			// future
			if (parseInt(newdatearr[0]) < ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) < mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) < day)) {
				for (var j = 0; j < arrayforkinyuu.length; j++) {
					if (arrayforkinyuu[j] === checkdup) {
						arrayforkinyuu.splice(j, 1);
					}
				}
				alert("まだ入庫していないので、本日以前の日付に変更することはできません。");
				return;
			} else if (parseInt(newdatearr[0]) === ye
					&& parseInt(newdatearr[1]) === mo
					&& parseInt(newdatearr[2]) === day) {
				if (window.confirm("本日入庫予定に移りますか？")) {
					trr.remove();
					// var newid = sb1 + ',' + sb2 + ',' + newdelta + ','
					// + newmemo + ',' + parseInt(newdatearr[0]) + ','
					// + parseInt(newdatearr[1]) + ','
					// + parseInt(newdatearr[2]);
					var trnew = $('<tr id="tekitr,' + id + '"></tr>');
					trnew.append('<td>' + tds[0].innerHTML + '</td>');
					trnew.append('<td>' + tds[1].innerHTML + '</td>');
					trnew.append('<td id="shuliang,' + id + '">' + newdelta
							+ '</td>');
					trnew.append('<td id="riqi,' + id + '">' + newdate
							+ '</td>');
					trnew.append('<td id="biji,' + id + '">' + newmemo
							+ '</td>');
					trnew
							.append('<td><button class="btn btn-danger btn-xs" id="quxiao,'
									+ id
									+ '" onclick="tekicancel(this)">キャンセル</button></td>');
					trnew
							.append('<td><button class="btn btn-info btn-xs　helloworld" id="bianji,'
									+ id
									+ '" onclick="tekichange(this)">変更</button></td>');
					console.log(trnew);
					trnew.appendTo(ntable);
				}
			} else {
				tds[2].innerHTML = newdelta;
				tds[3].innerHTML = newdate;
				tds[4].innerHTML = newmemo;
				tds[5].innerHTML = '<td><button class="btn btn-danger btn-xs" id="quxiao,'
						+ id
						+ '" onclick="tekicancel(this)">キャンセル</button></td>';
				tds[6].innerHTML = '<td><button class="btn btn-info btn-xs helloworld" id="bianji,'
						+ id + '" onclick="tekichange(this)">変更</button></td>';
			}

		}
	}
}

function tekisubmit() {
	flag = false;
	// 删除snb里面的今日记录等
	var arar = document.getElementsByClassName("helloworld");
	for (var i = 0; i < arar.length; i++) {
		if (arar[i].innerHTML == "保存") {
			alert("変更を完成してください");
			return;
		}
	}

	/***************************************************************************
	 * push into stock new stockid
	 **************************************************************************/

	var tempkeys = tempforstockkinyuu.keys();
	while (true) {
		var key = tempkeys.next().value;
		if (key != null) {
			var value = parseInt(tempforstockkinyuu.get(key));
			var insertostock = [];
			var keyarray = key.split(",");
			var iddd = alasql('SELECT MAX(id) + 1 as id FROM stock')[0].id;
			insertostock.push(iddd);
			insertostock.push(parseInt(keyarray[0]));
			insertostock.push(parseInt(keyarray[1]));
			insertostock.push(value);
			alasql(
					'INSERT INTO stock(\
						id, \
						item, \
						whouse, \
						balance)\
						VALUES(?,?,?,?);',
					insertostock);
		} else
			break;
	}
	whitmap = new Map();
	whitmapreverse = new Map();
	whit = alasql('select * from stock');

	for (var i = 0; i < whit.length; i++) {
		var whitele = whit[i];
		whitmap.set(whitele.stock.id, [ whitele.stock.item,
				whitele.stock.whouse ]);
		whitmapreverse.set(whitele.stock.item + ',' + whitele.stock.whouse,
				whitele.stock.id);
	}
	console.log(whitmapreverse);

	/** ********************************************************* */

	document.getElementById("container").innerHTML = '';
	$("div#container").append(ptable);
	var rows = document.getElementById("ptable").rows;
	console.log(rows.length);
	for (var i = 1; i < rows.length; i++) {
		var tds = rows[i].cells;
		var arraytoinsert = [];
		var iddd = alasql('SELECT MAX(id) + 1 as id FROM trans')[0].id;
		arraytoinsert.push(iddd);
		var a = parseInt(tds[2].id.split(",")[1]);
		var b = parseInt(tds[2].id.split(",")[2]);
		var barcode = a + ',' + b;
		var c = whitmapreverse.get(a + ',' + b);
		arraytoinsert.push(c);
		arraytoinsert.push(tds[3].innerHTML);
		arraytoinsert.push(parseInt(tds[2].innerHTML));
		var y = 0;
		if (tempforstockkinyuu.has(barcode)) {
			var x = tempforstockkinyuu.get(barcode);
			y = x + parseInt(tds[2].innerHTML);
			tempforstockkinyuu.set(barcode, y);
		} else {
			togethercache[b - 1].get(c).stock += parseInt(tds[2].innerHTML);
			y = togethercache[b - 1].get(c).stock;
		}
		console.log(y);

		arraytoinsert.push(y);
		arraytoinsert.push(tds[4].innerHTML);
		var arr = tds[3].innerHTML.split("-");
		arraytoinsert.push(parseInt(arr[0]));
		arraytoinsert.push(parseInt(arr[1]));
		arraytoinsert.push(parseInt(arr[2]));
		alasql(
				'INSERT INTO trans(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arraytoinsert);

	}
	document.getElementById("container").innerHTML = '';
	$("div#container").append(ntable);
	var rows2 = document.getElementById("ntable").rows;
	console.log(rows2.length);
	if (rows2.length > 1)
		flag = true;
	for (var i = 1; i < rows2.length; i++) {
		var tds = rows2[i].cells;
		var arraytoinsert = [];
		var iddd = 0;
		if (alasql('select * from future') === null
				|| alasql('select * from future').length === 0) {
			iddd = 1;
		} else
			iddd = alasql('SELECT MAX(id) + 1 as id FROM future')[0].id;
		arraytoinsert.push(iddd);
		var a = parseInt(tds[2].id.split(",")[1]);
		var b = parseInt(tds[2].id.split(",")[2]);
		var barcode = a + ',' + b;
		var c = whitmapreverse.get(a + ',' + b);
		arraytoinsert.push(c);
		arraytoinsert.push(tds[3].innerHTML);
		arraytoinsert.push(parseInt(tds[2].innerHTML));
		var y = 0;
		if (tempforstockkinyuu.has(barcode)) {
			console.log("true");
			var x = tempforstockkinyuu.get(barcode);
			y = x + parseInt(tds[2].innerHTML);
			tempforstockkinyuu.set(barcode, y);
		} else {
			togethercache[b - 1].get(c).stock += parseInt(tds[2].innerHTML);
			y = togethercache[b - 1].get(c).stock;
		}
		console.log(y);

		arraytoinsert.push(y);
		arraytoinsert.push(tds[4].innerHTML);
		var arr = tds[3].innerHTML.split("-");
		arraytoinsert.push(parseInt(arr[0]));
		arraytoinsert.push(parseInt(arr[1]));
		arraytoinsert.push(parseInt(arr[2]));
		alasql(
				'INSERT INTO future(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arraytoinsert);

	}

	document.getElementById("container").innerHTML = '';
	$("div#container").append(ftable);
	var rows3 = document.getElementById("ftable").rows;
	for (var i = 1; i < rows3.length; i++) {
		var tds = rows3[i].cells;
		var arraytoinsert = [];
		var iddd = 0;
		if (alasql('select * from future') === null
				|| alasql('select * from future').length === 0) {
			iddd = 1;
		} else
			iddd = alasql('SELECT MAX(id) + 1 as id FROM future')[0].id;
		arraytoinsert.push(iddd);
		var a = parseInt(tds[2].id.split(",")[1]);
		var b = parseInt(tds[2].id.split(",")[2]);
		var barcode = a + ',' + b;
		var c = whitmapreverse.get(a + ',' + b);
		arraytoinsert.push(c);
		arraytoinsert.push(tds[3].innerHTML);
		arraytoinsert.push(parseInt(tds[2].innerHTML));
		var y = 0;
		if (tempforstockkinyuu.has(barcode)) {
			console.log("true");
			var x = tempforstockkinyuu.get(barcode);
			y = x + parseInt(tds[2].innerHTML);
			tempforstockkinyuu.set(barcode, y);
		} else {
			togethercache[b - 1].get(c).stock += parseInt(tds[2].innerHTML);
			y = togethercache[b - 1].get(c).stock;
		}
		console.log(y);

		arraytoinsert.push(y);
		arraytoinsert.push(tds[4].innerHTML);
		var arr = tds[3].innerHTML.split("-");
		arraytoinsert.push(parseInt(arr[0]));
		arraytoinsert.push(parseInt(arr[1]));
		arraytoinsert.push(parseInt(arr[2]));
		alasql(
				'INSERT INTO future(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arraytoinsert);

	}

	pastmap = new Map(), nowmap = new Map(), futuremap = new Map();
	arrayforkinyuu = [];
	tempforstockkinyuu = new Map();
	counttekinyuu = 0;

	console.log(alasql('select * from trans'));
	console.log(alasql('select * from future'));

	document.getElementById("pushobjxx").innerHTML = '';
	document.getElementById("pushobj1").innerHTML = '';
	document.getElementById("pushobjx").innerHTML = '';
	document.getElementById("pushobj2").innerHTML = '';
	document.getElementById("pushobj3").innerHTML = '';
	if (document.getElementById("rightpanel") != null) {

		document.getElementById("rightpanel").parentNode.removeChild(document
				.getElementById("rightpanel"));
	}
	document.getElementById("pushobj2").innerHTML = '<p>入庫手記入は完成しました。</p>';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
        onclick = "jidoukn()">自動出庫記入を行う</button></div><br>';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
		                                                onclick = "openpage()">在庫一覧参考</button></div><br>';
	if (flag === true) {
		document.getElementById("pushobj2").innerHTML += '<div><p>本日に入庫した商品があります。入庫チェックを行ってください。</p><button class="btn btn-primary btn-round"\
            onclick = "kinyuucheck()">入庫チェックへ</button></div>';
	}
	ptable = $('<table class="table-striped table-condensed" id="ptable" style="width:100%;"></table>');
	ptbody = $('<tbody id="ptbody"></tbody>');
	ntable = $('<table class="table-striped table-condensed" id="ntable" style="width:100%;"></table>');
	ntbody = $('<tbody id="ntbody"></tbody>');
	ftable = $('<table class="table-striped table-condensed" id="ftable" style="width:100%;"></table>');
	ftbody = $('<tbody id="ftbody"></tbody>');

	ptbody.appendTo(ptable);
	// pasttable.appendTo(pastdiv);
	ntbody.appendTo(ntable);
	// ntable.appendTo(nowdiv);
	ftbody.appendTo(ftable);
	// ftable.appendTo(futurediv);

	trp = $('<tr></tr>');
	trn = $('<tr></tr>');
	trf = $('<tr></tr>');
	trp.append('<th>アイテム</th>');
	trn.append('<th>アイテム</th>');
	trf.append('<th>アイテム</th>');
	trp.append('<th>倉庫先</th>');
	trn.append('<th>倉庫先</th>');
	trf.append('<th>倉庫先</th>');
	trp.append('<th>数量</th>');
	trn.append('<th>数量</th>');
	trf.append('<th>数量</th>');
	trp.append('<th>入庫日</th>');
	trn.append('<th>入庫日</th>');
	trf.append('<th>入庫予定日</th>');
	trp.append('<th>備考</th>');
	trn.append('<th>備考</th>');
	trf.append('<th>備考</th>');
	trp.append('<th>キャンセル</th>');
	trn.append('<th>キャンセル</th>');
	trf.append('<th>キャンセル</th>');
	trp.append('<th>変更</th>');
	trn.append('<th>変更</th>');
	trf.append('<th>変更</th>');
	trp.appendTo(ptbody);
	trn.appendTo(ntbody);
	trf.appendTo(ftbody);
}

/** ********************************************************************************************************** */

var pastmap2 = new Map();
var nowmap2 = new Map();
var futuremap2 = new Map();
var arrinarr = [];

function jidoukn() {
	refresh2();
	refreshsecondpart();
	pastmap2 = new Map(), nowmap2 = new Map(), futuremap2 = new Map();
	arrayforkinyuu2 = [];
	redlightstockmap = new Map();
	countjidoukinyuu = 0;
	counttekinyuu = 0;
	counttekinyuu2 = 0;
	if (countjidoukinyuu2 === 0) {
		console.log(alasql('select * from snb'));
		maincontent.innerHTML = "";
		subcontent.innerHTML = "";
		document.getElementById("pushobjxx").innerHTML = '';
		document.getElementById("pushobj2").innerHTML = '';
		document.getElementById("pushobj3").innerHTML = '';
		if (document.getElementById("rightpanel") != null) {
			document.getElementById("rightpanel").parentNode
					.removeChild(document.getElementById("rightpanel"));
		}
		var futurecsv = alasql('select * from future');
		console.log(futurecsv);

		var todayktable = alasql(
				'select * from snb where NOS = 2 and KYEAR=? and KMONTH=? and KDAY=?',
				[ ye, mo, day ]);

		console.log(todayktable);

		/***********************************************************************
		 * 造出了一个记录future，以及今天记录出库的东西，以及这些东西出去后他们的变化趋势
		 * 
		 * 
		 * 
		 **********************************************************************/
		// !!!!the most important logic part for this problem
		allcsvmap = new Map();
		for (var i = 0; i < futurecsv.length; i++) { // for fcsvmap
			var futurecsvele = futurecsv[i];
			if (!futurecsvele.stock)
				futurecsvele = futurecsvele.future; // 确保不是null

			var whit = whitmap.get(futurecsvele.stock);
			var twhouseid = parseInt(whit[1]) - 1;
			var originalstock = 0;
			if (!togethercache[twhouseid].get(futurecsvele.stock)) originalstock=0;
			else originalstock = togethercache[twhouseid].get(futurecsvele.stock).stock;
			console.log(originalstock);
			//console.log(finalmap.get(futurecsvele.stock).stock); // same

			if (allcsvmap.has(futurecsvele.stock)) {
				var value = allcsvmap.get(futurecsvele.stock);
				var object = {
					date : futurecsvele.date,
					quant : futurecsvele.qty,
					balance : originalstock,
					memo : futurecsvele.memo
				};
				value.push(object);
				allcsvmap.set(futurecsvele.stock, value);

			} else {
				var value = [];
				var object = {
					date : futurecsvele.date,
					quant : futurecsvele.qty,
					balance : originalstock,
					memo : futurecsvele.memo
				};
				value.push(object);
				allcsvmap.set(futurecsvele.stock, value);
			}
		}

		for (var i = 0; i < todayktable.length; i++) {
			var record = todayktable[i];
			if (!record.SITEM)
				record = record.snb;
			var barcode = record.SITEM + ',' + record.WWHOUSE;
			var thisstockid = whitmapreverse.get(barcode);
			var originalstock = togethercache[record.WWHOUSE - 1]
					.get(thisstockid).stock;
			console.log(originalstock);

			if (allcsvmap.has(thisstockid)) {
				var value = allcsvmap.get(thisstockid);
				var object = {
					date : record.JDATE,
					quant : record.QUA * (-1),
					balance : originalstock,
					memo : record.MEMO
				};
				value.push(object);
				allcsvmap.set(thisstockid, value);

			} else {
				var value = [];
				var object = {
					date : record.JDATE,
					quant : record.QUA * (-1),
					balance : originalstock,
					memo : record.MEMO
				};
				value.push(object);
				allcsvmap.set(thisstockid, value);
			}
		}

		var tempkeys = allcsvmap.keys();
		while (true) {
			var key = tempkeys.next().value;
			if (key != null) {
				var value = allcsvmap.get(key);
				value.sort(compare);
				console.log(value);
				allcsvmap.set(key, value);
			} else
				break;
		}

		var tempkeys2 = allcsvmap.keys();
		while (true) {
			var key = tempkeys2.next().value;
			if (key != null) {
				var value = allcsvmap.get(key);
				for (var i = 0; i < value.length; i++) {
					if (i === 0)
						value[i].balance = value[i].balance + value[i].quant;
					else {
						value[i].balance = value[i - 1].balance
								+ value[i].quant;
					}
					console.log(value[i].balance);
				}
			} else
				break;
		}

		console.log(allcsvmap);

		/** ******************************************************************* */

		for (var i = 0; i < todayktable.length; i++) {
			var elee = todayktable[i];
			if (!elee.SITEM)
				elee = elee.snb;
			var elee2 = elee.SITEM + ',' + elee.WWHOUSE + ',' + elee.QUA + ','
					+ elee.MEMO + ',' + elee.JYEAR + ',' + elee.JMONTH + ','
					+ elee.JDAY;
			arrayforkinyuu2.push(elee2);
		}
		console.log(todayktable);
		console.log(ye + ',' + mo + ',' + day);
		console.log(date);
		console.log(arrayforkinyuu2);

		var pastdiv = $('<div></div>');
		var nowdiv = $('<div></div>');
		var futurediv = $('<div></div>');
		var pasttable = $('<table class="table-striped table-condensed table-bordered table-hover" id="pasttable"></table>');
		var pastbody = $('<tbody id="pastbody"></tbody>');
		var nowtable = $('<table class="table-striped table-condensed table-bordered table-hover" id="nowtable"></table>');
		var nowbody = $('<tbody id="nowbody"></tbody>');
		var futuretable = $('<table class="table-striped table-condensed table-bordered table-hover" id="futuretable"></table>');
		var futurebody = $('<tbody id="futurebody"></tbody>');
		pastbody.appendTo(pasttable);
		pasttable.appendTo(pastdiv);
		nowbody.appendTo(nowtable);
		nowtable.appendTo(nowdiv);
		futurebody.appendTo(futuretable);
		futuretable.appendTo(futurediv);

		var tr1 = $('<tr></tr>');
		var tr2 = $('<tr></tr>');
		var tr3 = $('<tr></tr>');
		tr1.append('<th>アイテム</th>');
		tr2.append('<th>アイテム</th>');
		tr3.append('<th>アイテム</th>');
		tr1.append('<th>倉庫元</th>');
		tr2.append('<th>倉庫元</th>');
		tr3.append('<th>倉庫元</th>');
		tr1.append('<th>数量</th>');
		tr2.append('<th>数量</th>');
		tr3.append('<th>数量</th>');
		tr1.append('<th>出庫日</th>');
		tr2.append('<th>出庫日</th>');
		tr3.append('<th>出庫予定日</th>');
		tr1.append('<th>備考</th>');
		tr2.append('<th>備考</th>');
		tr3.append('<th>備考</th>');
		tr2.append('<th>異常</th>');
		tr3.append('<th>異常</th>');
		tr1.append('<th>キャンセル</th>');
		tr2.append('<th>キャンセル</th>');
		tr3.append('<th>キャンセル</th>');
		tr1.append('<th>変更</th>');
		tr2.append('<th>変更</th>');
		tr3.append('<th>変更</th>');
		tr1.appendTo(pastbody);
		tr2.appendTo(nowbody);
		tr3.appendTo(futurebody);

		// //////////////////////////////////////////////////////////////////////////////////////////////////

		for (var i = 0; i < todayktable.length; i++) {

			var record = todayktable[i];
			if (!record.SITEM)
				record = record.snb;
			var barcode = record.SITEM + ',' + record.WWHOUSE;
			var thisstockid = whitmapreverse.get(barcode);
			var quanjiatong3 = barcode + ',' + record.QUA + ',' + record.MEMO
					+ ',' + record.JYEAR + ',' + record.JMONTH + ','
					+ record.JDAY;
			if ((record.JYEAR == ye && record.JMONTH == mo && record.JDAY < day)
					|| (record.JYEAR == ye && record.JMONTH < mo)
					|| (record.JYEAR < ye)) {
				if (!pastmap.has(barcode)) {
					var value = [];
					console.log(barcode);
					var balance = togethercache[record.WWHOUSE - 1]
							.get(thisstockid).stock;
					console.log(balance);
					var element = record.QUA + "," + record.JDATE + ","
							+ record.MEMO + "," + record.JYEAR + ","
							+ record.JMONTH + "," + record.JDAY;
					value.push(element);
					pastmap.set(barcode, value);
				} else {
					var value = pastmap.get(barcode);
					var element = record.QUA + "," + record.JDATE + ","
							+ record.MEMO + "," + record.JYEAR + ","
							+ record.JMONTH + "," + record.JDAY;
					value.push(element);
					pastmap.set(barcode, value); // barcode里面的whouseid是从1开始算得
				}

				var trpast = $('<tr id="tr,' + barcode + ',' + record.QUA + ','
						+ record.MEMO + ',' + record.JYEAR + ','
						+ record.JMONTH + ',' + record.JDAY + '"></tr>');
				trpast.append('<td>' + itmap.get(record.SITEM) + '</td>');
				trpast.append('<td>' + whouseMap.get(record.WWHOUSE - 1)
						+ '</td>');
				trpast.append('<td id="QUA,' + quanjiatong3 + '">' + record.QUA
						+ '</td>');
				trpast.append('<td id="JDATE,' + quanjiatong3 + '">'
						+ record.JDATE + '</td>'); // -> this is a difficult
				// part when get changed
				trpast.append('<td id="MEMO,' + quanjiatong3 + '">'
						+ record.MEMO + '</td>');
				trpast
						.append('<td><button class="btn btn-danger btn-xs" id="CANCEL,'
								+ quanjiatong3
								+ '" onclick="kinyuucancel_x(this)">キャンセル</button></td>');
				trpast
						.append('<td><button class="btn btn-info btn-xs seechange_x" id="CHANGE,'
								+ quanjiatong3
								+ '" onclick="kinyuuchange_x(this)">変更</button></td>');
				trpast.appendTo(pastbody);

			} else {
				if ((record.JYEAR == ye && record.JMONTH == mo && record.JDAY == day)) {
					if (!nowmap.has(barcode)) {
						var value = [];
						var element = record.QUA + "," + record.JDATE + ","
								+ record.MEMO + "," + record.JYEAR + ","
								+ record.JMONTH + "," + record.JDAY;
						value.push(element);
						nowmap.set(barcode, value);
					} else {
						var value = nowmap.get(barcode);
						var element = record.QUA + "," + record.JDATE + ","
								+ record.MEMO + "," + record.JYEAR + ","
								+ record.JMONTH + "," + record.JDAY;
						value.push(element);
						nowmap.set(barcode, value);
					}

					var trnow = $('<tr id="tr,' + barcode + ',' + record.QUA
							+ ',' + record.MEMO + ',' + record.JYEAR + ','
							+ record.JMONTH + ',' + record.JDAY + '"></tr>');
					trnow.append('<td>' + itmap.get(record.SITEM) + '</td>');
					trnow.append('<td>' + whouseMap.get(record.WWHOUSE - 1)
							+ '</td>');
					trnow.append('<td id="QUA,' + quanjiatong3 + '">'
							+ record.QUA + '</td>');
					trnow.append('<td id="JDATE,' + quanjiatong3 + '">'
							+ record.JDATE + '</td>'); // -> this is a
					// difficult
					// part when get changed
					trnow.append('<td id="MEMO,' + quanjiatong3 + '">'
							+ record.MEMO + '</td>');

					var valuearr = allcsvmap.get(thisstockid);
					for (var j = 0; j < valuearr.length; j++) {
						if (valuearr[j].memo == record.MEMO
								&& Math.abs(valuearr[j].quant) === record.QUA) {
							if (valuearr[j].balance < 0) {
								trnow
										.append('<td><button id="UNS,'
												+ quanjiatong3
												+ '" class="btn btn-xs btn-warning" data-html="true" onclick="shownoenough(this)" data-toggle="popover" title="取引明細">不足</button></td>');
							   break;
							} else
								trnow.append('<td></td>');
						}
					}

					trnow
							.append('<td><button class="btn btn-danger btn-xs" id="CANCEL,'
									+ quanjiatong3
									+ '" onclick="kinyuucancel_x(this)">キャンセル</button></td>');
					trnow
							.append('<td><button class="btn btn-info btn-xs seechange_x" id="CHANGE,'
									+ quanjiatong3
									+ '" onclick="kinyuuchange_x(this)">変更</button></td>');
					trnow.appendTo(nowbody);

				} else {
					if (!futuremap.has(barcode)) {
						var value = [];
						var element = record.QUA + "," + record.JDATE + ","
								+ record.MEMO + "," + record.JYEAR + ","
								+ record.JMONTH + "," + record.JDAY;
						value.push(element);
						futuremap.set(barcode, value);
					} else {
						var value = futuremap.get(barcode);
						var element = record.QUA + "," + record.JDATE + ","
								+ record.MEMO + "," + record.JYEAR + ","
								+ record.JMONTH + "," + record.JDAY;
						value.push(element);
						futuremap.set(barcode, value);
					}

					var trfuture = $('<tr id="tr,' + barcode + ',' + record.QUA
							+ ',' + record.MEMO + ',' + record.JYEAR + ','
							+ record.JMONTH + ',' + record.JDAY + '"></tr>');
					trfuture.append('<td>' + itmap.get(record.SITEM) + '</td>');
					trfuture.append('<td>' + whouseMap.get(record.WWHOUSE - 1)
							+ '</td>');
					trfuture.append('<td id="QUA,' + quanjiatong3 + '">'
							+ record.QUA + '</td>');
					trfuture.append('<td id="JDATE,' + quanjiatong3 + '">'
							+ record.JDATE + '</td>'); // -> this is a
					// difficult
					// part when get changed
					trfuture.append('<td id="MEMO,' + quanjiatong3 + '">'
							+ record.MEMO + '</td>');

					var valuearr = allcsvmap.get(thisstockid);
					for (var j = 0; j < valuearr.length; j++) {
						if (valuearr[j].memo == record.MEMO
								&& Math.abs(valuearr[j].quant) === record.QUA) {
							if (valuearr[j].balance < 0) {
								trfuture
										.append('<td><button id="UNS,'
												+ quanjiatong3
												+ '" class="btn btn-xs btn-warning" data-html="true" onclick="shownoenough(this)" data-toggle="popover" title="取引明細">不足</button></td>');
							} else
								trfuture.append('<td></td>');
						}
					}

					trfuture
							.append('<td><button class="btn btn-danger btn-xs" id="CANCEL,'
									+ quanjiatong3
									+ '" onclick="kinyuucancel_x(this)">キャンセル</button></td>');
					trfuture
							.append('<td><button class="btn btn-info btn-xs seechange_x" id="CHANGE,'
									+ quanjiatong3
									+ '" onclick="kinyuuchange_x(this)">変更</button></td>');
					trfuture.appendTo(futurebody);
				}
			}

		}
		console.log(nowmap); // pastmap and nowmap has been built, now build
		// the
		// table
		console.log(pastmap);
		console.log(futuremap);
		maincontent.innerHTML += '<h3>遺漏記入テーブル</h3>';
		pastdiv.appendTo($("#pushobj1"));
		maincontent.innerHTML += '<br><hr><h3>本日出庫予定テーブル</h3>';
		nowdiv.appendTo($("#pushobj1"));
		maincontent.innerHTML += '<br><hr><h3>受注テーブル</h3>';
		futurediv.appendTo($("#pushobj1"));
		maincontent.innerHTML += '<button style="margin-left:800px" class="btn btn-success btn-lg" onclick="kinyuusubmit_x()">記入</button>';
		console.log(togethercache);
		console.log(redlightstockmap);
	}
	countjidoukinyuu2++;
}

function kinyuucancel_x(b) {
	// 主要修改的是allcsvmap，然后再看有没有不足。
	var ida = $(b).attr("id").substring(6);
	var idarray = $(b).attr("id").split(",");
	var sb1 = idarray[1], sb2 = idarray[2], sb3 = idarray[3], sb4 = idarray[4], sb5 = idarray[5], sb6 = idarray[6], sb7 = idarray[7];
	console.log(idarray);

	// idarray里面记载的都是最新的数据
	ida = "tr" + ida;
	console.log(ida);
	var cda = "CHANGE" + ida.substring(2);
	if (document.getElementById(cda).innerHTML === "保存") {
		alert("Please finish the change function first");
		return;
	}
	var trr = document.getElementById(ida);
	var tds = trr.getElementsByTagName('td');
	var newdatehere = tds[3].innerHTML.split("-");
	var n1 = parseInt(newdatehere[0]), n2 = parseInt(newdatehere[1]), n3 = parseInt(newdatehere[2]);
	var bigbang = sb1 + ',' + sb2 + ',' + tds[2].innerHTML + ','
			+ tds[4].innerHTML + ',' + n1 + ',' + n2 + ',' + n3;
	console.log(bigbang);
	console.log(arrayforkinyuu2);

	for (var i = 0; i < arrayforkinyuu2.length; i++) {
		if (arrayforkinyuu2[i] === bigbang)
			arrayforkinyuu2.splice(i, 1);
	}
	console.log(arrayforkinyuu2);

	trr.remove();

	// /////////////////////////////////////update the allcsvmap
	var barcode = sb1 + ',' + sb2;
	var thisstockid = whitmapreverse.get(barcode);
	var arraytochange = allcsvmap.get(thisstockid);
	console.log(arraytochange);
	var originalstock = finalmap.get(thisstockid).stock;
	console.log(originalstock);
	for (var i = 0; i < arraytochange.length; i++) {
		if (Math.abs(arraytochange[i].quant) === parseInt(tds[2].innerHTML)
				&& arraytochange[i].memo === tds[4].innerHTML) {
			arraytochange.splice(i, 1);
		}
	}

	for (var i = 0; i < arraytochange.length; i++) {
		if (i === 0)
			arraytochange[i].balance = originalstock + arraytochange[i].quant;
		else {
			arraytochange[i].balance = arraytochange[i - 1].balance
					+ arraytochange[i].quant;
		}
		console.log(arraytochange[i].balance);
	}

	console.log(allcsvmap);

	// check todaytable and futuretable
	var nowrows = document.getElementById("nowtable").rows;
	for (var i = 1; i < nowrows.length; i++) {
		var nowtr = nowrows[i];
		var tds = nowtr.cells;
		var nowtridarray = nowtr.id.split(",");
		var bianhuanquanjiatong = nowtr.id.substring(3);
		var thatstockid = whitmapreverse.get(nowtridarray[1] + ','
				+ nowtridarray[2]);
		var arraytochacha = allcsvmap.get(thatstockid);
		for (var j = 0; j < arraytochacha.length; j++) {
			if (Math.abs(arraytochacha[j].quant) === parseInt(tds[2].innerHTML)
					&& arraytochacha[j].memo === tds[4].innerHTML) {
				if (arraytochacha[j].balance < 0) {
					tds[5].innerHTML = '<td><button id="UNS,'
							+ bianhuanquanjiatong
							+ '" class="btn btn-xs btn-warning" data-html="true" onclick="shownoenough(this)" data-toggle="popover" title="取引明細">不足</button></td>';
				} else
					tds[5].innerHTML = '';
			}
		}
	}

	var futurerows = document.getElementById("futuretable").rows;
	for (var i = 1; i < futurerows.length; i++) {
		var futuretr = futurerows[i];
		var tds = futuretr.cells;
		var ftridarray = futuretr.id.split(",");
		var bianhuanquanjiatong = futuretr.id.substring(3);
		console.log(tds[5].innerHTML);
		console.log(bianhuanquanjiatong);
		var thatstockid = whitmapreverse.get(ftridarray[1] + ','
				+ ftridarray[2]);
		var arraytochacha = allcsvmap.get(thatstockid);
		for (var j = 0; j < arraytochacha.length; j++) {
			if (Math.abs(arraytochacha[j].quant) === parseInt(tds[2].innerHTML)
					&& arraytochacha[j].memo === tds[4].innerHTML) {
				if (arraytochacha[j].balance < 0) {
					tds[5].innerHTML = '<td><button id="UNS,'
							+ bianhuanquanjiatong
							+ '" class="btn btn-xs btn-warning" data-html="true" onclick="shownoenough(this)" data-toggle="popover" title="取引明細">不足</button></td>';
				} else
					tds[5].innerHTML = '';
			}
		}

	}
}

var s1, s2, s3;
var oldmemo = "";
var oldqua = 0;
var olddate = "";
function kinyuuchange_x(b) {
	var changequanjiatong = $(b).attr("id");
	var id = $(b).attr("id").substring(7); // quanjiatong3
	console.log(id);

	// 把id里面日期前面的零去掉
	var xid = $(b).attr("id").substring(7).split(",");

	var idarray = $(b).attr("id").split(",");
	var sb1 = idarray[1], sb2 = idarray[2], sb3 = idarray[3], sb4 = idarray[4], sb5 = idarray[5], sb6 = idarray[6], sb7 = idarray[7];
	var inner = $(b)[0].innerHTML;
	console.log(inner);
	var trr = document.getElementById("tr," + id);
	console.log("tr," + id);
	console.log(trr);
	var tds = trr.getElementsByTagName('td');
	var idforqua = id + ",kc1", idfordate = id + ",kc2", idformemo = id
			+ ",kc3";

	console.log(trr);
	if (inner === "変更") {
		var arar = document.getElementsByClassName("seechange_x");
		for (var i = 0; i < arar.length; i++) {
			if (arar[i].innerHTML == "保存") {
				alert("変更を完成してください");
				return;
			}
		}
		var bigdatearray = tds[3].innerHTML.split("-");
		var bdate0 = parseInt(bigdatearray[0]), bdate1 = parseInt(bigdatearray[1]), bdate2 = parseInt(bigdatearray[2]);
		s1 = parseInt(bigdatearray[0]), s2 = parseInt(bigdatearray[1]),
				s3 = parseInt(bigdatearray[2]);
		oldmemo = tds[4].innerHTML;
		oldqua = parseInt(tds[2].innerHTML);
		olddate = tds[3].innerHTML;
		console.log('the old date is: ' + s1 + ',' + s2 + ',' + s3
				+ ';; the old quantity is: ' + oldqua + ';;; the old memo is'
				+ oldmemo);
		var bigbang = sb1 + ',' + sb2 + ',' + tds[2].innerHTML + ','
				+ tds[4].innerHTML + ',' + bdate0 + ',' + bdate1 + ',' + bdate2;

		for (var i = 0; i < arrayforkinyuu2.length; i++) {
			if (arrayforkinyuu2[i] === bigbang)
				arrayforkinyuu2.splice(i, 1);
		}
		console.log(arrayforkinyuu2);
		// 2 3 4 input change
		var tds2 = parseInt(tds[2].innerHTML);
		var tds3 = tds[3].innerHTML;
		var tds4 = tds[4].innerHTML;
		tds[2].innerHTML = '<input name="q90" type="text" class="form-control"\
			id="'
				+ idforqua + '" size="2" value="' + tds2 + '">';
		tds[3].innerHTML = '<input name="q91" type="date" class="form-control"\
			id="'
				+ idfordate + '" value="' + tds3 + '">';
		tds[4].innerHTML = '<input name="q92" type="text" class="form-control"\
			id="'
				+ idformemo + '" size="2" value="' + tds4 + '">';

		if (bdate0 < ye || (bdate0 === ye && bdate1 < mo)
				|| (bdate0 === ye && bdate1 === mo && bdate2 < day)) {
			tds[6].innerHTML = '<td><button class="btn btn-success btn-xs seechange_x" id="'
					+ changequanjiatong
					+ '" onclick="kinyuuchange_x(this)">保存</button></td>';
		} else {
			tds[7].innerHTML = '<td><button class="btn btn-success btn-xs seechange_x" id="'
					+ changequanjiatong
					+ '" onclick="kinyuuchange_x(this)">保存</button></td>';
		}

	} else {

		var newdelta = document.getElementById(idforqua).value;
		var newdate = document.getElementById(idfordate).value;
		var newmemo = document.getElementById(idformemo).value;
		var newdatearr = newdate.split("-");
		console.log(newdatearr);

		if (!newdelta || parseInt(newdelta) === 0) {
			alert("please enter a proper number");
			return;
		}

		else {
			for (var i = 0; i < newdelta.length; i++) {
				if (valueIsNaN(parseInt(newdelta.charAt(i)))) {
					alert("please enter a proper number");
					return;
				}
			}
		}
		if (!newmemo) {
			alert("メモを記入してください");
			return;
		}

		if (!newdate) {
			alert("日付を記入してください");
			return;
		}

		var checkdup = sb1 + ',' + sb2 + ',' + newdelta + ',' + newmemo + ','
				+ parseInt(newdatearr[0]) + ',' + parseInt(newdatearr[1]) + ','
				+ parseInt(newdatearr[2]);
		console.log(checkdup);
		if (arrayforkinyuu2.includes(checkdup)) {
			alert("duplicate");
			return;
		} else {
			arrayforkinyuu2.push(checkdup);
		}
		console.log(arrayforkinyuu2);
		if ((s1 === ye && s2 === mo && s3 < day) || (s1 === ye && s2 < mo)
				|| (s1 < ye)) {

			if (parseInt(newdatearr[0]) > ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) > mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) > day)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) === day)) {
				for (var j = 0; j < arrayforkinyuu2.length; j++) {
					if (arrayforkinyuu2[j] === checkdup)
						arrayforkinyuu2.splice(j, 1);
				}
				alert("すでに発生した出庫記録です！本日以後の日付に変更することはできません。");
				return;
			} else {
				var thisstockid_check = whitmapreverse.get(sb1 + ',' + sb2);
				var arraytochange_check = allcsvmap.get(thisstockid_check);
				console.log(arraytochange_check);
				var originalstock_check = finalmap.get(thisstockid_check).stock;
				console.log(originalstock_check);
				var lastbalance;
				for (var i = 0; i < arraytochange_check.length; i++) {
					if (Math.abs(arraytochange_check[i].quant) === oldqua
							&& arraytochange_check[i].memo === oldmemo
							&& arraytochange_check[i].date === olddate) {
						if (i === 0)
							lastbalance = originalstock_check;
						else
							lastbalance = arraytochange_check[i - 1].balance;
						console.log(lastbalance);
						if (lastbalance - newdelta < 0) {
							for (var j = 0; j < arrayforkinyuu2.length; j++) {
								if (arrayforkinyuu2[j] === checkdup)
									arrayforkinyuu2.splice(j, 1);
							}
							alert("在庫不足になります");
							return;
						}
					}
				}
				tds[2].innerHTML = newdelta;
				tds[3].innerHTML = newdate;
				tds[4].innerHTML = newmemo;
				tds[5].innerHTML = '<td><button class="btn btn-danger btn-xs" id="CANCEL,'
						+ id
						+ '" onclick="kinyuucancel_x(this)">キャンセル</button></td>';
				tds[6].innerHTML = '<td><button class="btn btn-info btn-xs seechange_x" id="CHANGE,'
						+ id
						+ '" onclick="kinyuuchange_x(this)">変更</button></td>';

				update_allcsvmap(sb1, sb2, oldqua, oldmemo, olddate, newdate,
						newdelta, newmemo);

			}
		} else if (s1 === ye && s2 === mo && s3 === day) {

			console.log('the old date is: ' + s1 + ',' + s2 + ',' + s3
					+ ';; the old quantity is: ' + oldqua
					+ ';;; the old memo is' + oldmemo);

			if (parseInt(newdatearr[0]) < ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) < mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) < day)) {
				for (var j = 0; j < arrayforkinyuu2.length; j++) {
					if (arrayforkinyuu2[j] === checkdup)
						arrayforkinyuu2.splice(j, 1);
				}
				alert("まだ入庫していないので、本日以前の日付に変更することはできません。");
				return;
			} else if (parseInt(newdatearr[0]) > ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) > mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) > day)) {
				if (window.confirm("今後入庫予定に移りますか？")) {
					trr.remove();
					var trnew = $('<tr id="tr,' + id + '"></tr>');
					trnew.append('<td id="' + id + '">' + tds[0].innerHTML
							+ '</td>');
					trnew.append('<td id="' + id + '">' + tds[1].innerHTML
							+ '</td>');
					trnew.append('<td id="QUA,' + id + '">' + newdelta
							+ '</td>');
					trnew.append('<td id="JDATE,' + id + '">' + newdate
							+ '</td>');
					trnew.append('<td id="MEMO,' + id + '">' + newmemo
							+ '</td>');

					trnew.append('<td></td>');

					trnew
							.append('<td><button class="btn btn-danger btn-xs" id="CANCEL,'
									+ id
									+ '" onclick="kinyuucancel_x(this)">キャンセル</button></td>');
					trnew
							.append('<td><button class="btn btn-info btn-xs seechange_x" id="CHANGE,'
									+ id
									+ '" onclick="kinyuuchange_x(this)">変更</button></td>');
					console.log(trnew);
					trnew.appendTo($("tbody#futurebody"));
					update_allcsvmap(sb1, sb2, oldqua, oldmemo, olddate,
							newdate, newdelta, newmemo);
				} else {
					alert("You have entered an invalid date");
				}
			} else {
				tds[2].innerHTML = newdelta;
				tds[3].innerHTML = newdate;
				tds[4].innerHTML = newmemo;
				tds[6].innerHTML = '<td><button class="btn btn-danger btn-xs" id="CANCEL,'
						+ id
						+ '" onclick="kinyuucancel_x(this)">キャンセル</button></td>';
				tds[7].innerHTML = '<td><button class="btn btn-info btn-xs seechange_x" id="CHANGE,'
						+ id
						+ '" onclick="kinyuuchange_x(this)">変更</button></td>';
				update_allcsvmap(sb1, sb2, oldqua, oldmemo, olddate, newdate,
						newdelta, newmemo);
			}
		} else {
			// future
			console.log('the old date is: ' + s1 + ',' + s2 + ',' + s3
					+ ';; the old quantity is: ' + oldqua
					+ ';;; the old memo is' + oldmemo);

			if (parseInt(newdatearr[0]) < ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) < mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) < day)) {
				for (var j = 0; j < arrayforkinyuu2.length; j++) {
					if (arrayforkinyuu2[j] === checkdup)
						arrayforkinyuu2.splice(j, 1);
				}
				alert("まだ入庫していないので、本日以前の日付に変更することはできません。");
				return;
			} else if (parseInt(newdatearr[0]) === ye
					&& parseInt(newdatearr[1]) === mo
					&& parseInt(newdatearr[2]) === day) {
				if (window.confirm("本日入庫予定に移りますか？")) {
					trr.remove();
					// var newid = sb1 + ',' + sb2 + ',' + newdelta + ','
					// + newmemo + ',' + parseInt(newdatearr[0]) + ','
					// + parseInt(newdatearr[1]) + ','
					// + parseInt(newdatearr[2]);

					var trnew = $('<tr id="tr,' + id + '"></tr>');
					trnew.append('<td id="' + id + '">' + tds[0].innerHTML
							+ '</td>');
					trnew.append('<td id="' + id + '">' + tds[1].innerHTML
							+ '</td>');
					trnew.append('<td id="QUA,' + id + '">' + newdelta
							+ '</td>');
					trnew.append('<td id="JDATE,' + id + '">' + newdate
							+ '</td>');
					trnew.append('<td id="MEMO,' + id + '">' + newmemo
							+ '</td>');

					trnew.append('<td></td>');

					trnew
							.append('<td><button class="btn btn-danger btn-xs" id="CANCEL,'
									+ id
									+ '" onclick="kinyuucancel_x(this)">キャンセル</button></td>');
					trnew
							.append('<td><button class="btn btn-info btn-xs　seechange_x btn-xs" id="CHANGE,'
									+ id
									+ '" onclick="kinyuuchange_x(this)">変更</button></td>');
					console.log(trnew);
					trnew.appendTo($("tbody#nowbody"));
					update_allcsvmap(sb1, sb2, oldqua, oldmemo, olddate,
							newdate, newdelta, newmemo);
				}
			} else {

				tds[2].innerHTML = newdelta;
				tds[3].innerHTML = newdate;
				tds[4].innerHTML = newmemo;
				tds[7].innerHTML = '<td><button class="btn btn-info btn-xs seechange_x" id="CHANGE,'
						+ id
						+ '" onclick="kinyuuchange_x(this)">変更</button></td>';
				update_allcsvmap(sb1, sb2, oldqua, oldmemo, olddate, newdate,
						newdelta, newmemo);
			}

		}

	}

}

function kinyuusubmit_x() {
	// finish the normal things
	// past go to past
	flag = false;
	var nearray = [];
	// 删除snb里面的今日记录等
	var arar = document.getElementsByClassName("seechange_x");
	for (var i = 0; i < arar.length; i++) {
		if (arar[i].innerHTML == "保存") {
			alert("変更を完成してください");
			return;
		}
	}

	var rows = document.getElementById("pasttable").rows;
	for (var i = 1; i < rows.length; i++) {
		var tds = rows[i].cells;
		console.log(tds[5].innerText);
		var arraytoinsert = [];
		var iddd = alasql('SELECT MAX(id) + 1 as id FROM trans')[0].id;
		arraytoinsert.push(iddd);
		var a = parseInt(tds[2].id.split(",")[1]);
		var b = parseInt(tds[2].id.split(",")[2]);
		var barcode = a + ',' + b;
		var c = whitmapreverse.get(a + ',' + b);
		arraytoinsert.push(c);
		arraytoinsert.push(tds[3].innerHTML);
		arraytoinsert.push(parseInt(tds[2].innerHTML) * (-1));
		var y = 0;

		var iroiroarr = allcsvmap.get(c);
		for (var j = 0; j < iroiroarr.length; j++) {
			if (tds[4].innerHTML === iroiroarr[j].memo
					&& parseInt(tds[2].innerHTML) === Math
							.abs(parseInt(iroiroarr[j].quant))
					&& tds[3].innerHTML === iroiroarr[j].date) {
				y = iroiroarr[j].balance;
				break;
			}
		}

		arraytoinsert.push(y);
		arraytoinsert.push(tds[4].innerHTML);
		var arr = tds[3].innerHTML.split("-");
		arraytoinsert.push(parseInt(arr[0]));
		arraytoinsert.push(parseInt(arr[1]));
		arraytoinsert.push(parseInt(arr[2]));
		alasql(
				'INSERT INTO trans(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arraytoinsert);

	}

	var rows2 = document.getElementById("nowtable").rows;
	if (rows2.length > 1)
		flag = true;
	for (var i = 1; i < rows2.length; i++) {
		var tds = rows2[i].cells;
		var busokuornot = tds[5].innerText;
		var arraytoinsert = [];
		var iddd = 0;
		if (alasql('select * from future') === null
				|| alasql('select * from future').length === 0) {
			iddd = 1;
		} else
			iddd = alasql('SELECT MAX(id) + 1 as id FROM future')[0].id;
		arraytoinsert.push(iddd);
		var a = parseInt(tds[2].id.split(",")[1]);
		console.log(a);
		var b = parseInt(tds[2].id.split(",")[2]);
		var barcode = a + ',' + b;
		var c = whitmapreverse.get(a + ',' + b);

		if (busokuornot === "不足") {
			if (!nearray.includes(c))
				nearray.push(c);
		}

		arraytoinsert.push(c);
		arraytoinsert.push(tds[3].innerHTML);
		arraytoinsert.push(parseInt(tds[2].innerHTML) * (-1));
		var y = 0;
		var iroiroarr = allcsvmap.get(c);
		for (var j = 0; j < iroiroarr.length; j++) {
			if (tds[4].innerHTML === iroiroarr[j].memo
					&& parseInt(tds[2].innerHTML) === Math
							.abs(parseInt(iroiroarr[j].quant))
					&& tds[3].innerHTML === iroiroarr[j].date) {
				y = iroiroarr[j].balance;
				break;
			}
		}
		console.log(y);

		arraytoinsert.push(y);
		arraytoinsert.push(tds[4].innerHTML);
		var arr = tds[3].innerHTML.split("-");
		arraytoinsert.push(parseInt(arr[0]));
		arraytoinsert.push(parseInt(arr[1]));
		arraytoinsert.push(parseInt(arr[2]));
		alasql(
				'INSERT INTO future(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arraytoinsert);

	}

	var rows3 = document.getElementById("futuretable").rows;
	for (var i = 1; i < rows3.length; i++) {
		var tds = rows3[i].cells;
		var busokuornot = tds[5].innerText;
		var arraytoinsert = [];
		var iddd = 0;
		if (alasql('select * from future') === null
				|| alasql('select * from future').length === 0) {
			iddd = 1;
		} else
			iddd = alasql('SELECT MAX(id) + 1 as id FROM future')[0].id;
		arraytoinsert.push(iddd);
		var a = parseInt(tds[2].id.split(",")[1]);
		var b = parseInt(tds[2].id.split(",")[2]);
		var barcode = a + ',' + b;
		var c = whitmapreverse.get(a + ',' + b);
		if (busokuornot === "不足") {
			if (!nearray.includes(c))
				nearray.push(c);
		}
		arraytoinsert.push(c);
		arraytoinsert.push(tds[3].innerHTML);
		arraytoinsert.push(parseInt(tds[2].innerHTML) * (-1));
		var y = 0;
		var iroiroarr = allcsvmap.get(c);
		for (var j = 0; j < iroiroarr.length; j++) {
			if (tds[4].innerHTML === iroiroarr[j].memo
					&& parseInt(tds[2].innerHTML) === Math
							.abs(parseInt(iroiroarr[j].quant))
					&& tds[3].innerHTML === iroiroarr[j].date) {
				y = iroiroarr[j].balance;
				break;
			}
		}
		console.log(y);

		arraytoinsert.push(y);
		arraytoinsert.push(tds[4].innerHTML);
		var arr = tds[3].innerHTML.split("-");
		arraytoinsert.push(parseInt(arr[0]));
		arraytoinsert.push(parseInt(arr[1]));
		arraytoinsert.push(parseInt(arr[2]));
		alasql(
				'INSERT INTO future(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arraytoinsert);

	}
	console.log(alasql('select * from future'));

	alasql('DELETE FROM snb WHERE KYEAR=? and KMONTH=? and KDAY=? and NOS = 2',
			[ ye, mo, day ]);
	console.log(alasql('select * from snb'));
	document.getElementById("pushobjxx").innerHTML = '';
	document.getElementById("pushobj1").innerHTML = '';
	document.getElementById("pushobjx").innerHTML = '';
	document.getElementById("pushobj2").innerHTML = '';
	document.getElementById("pushobj3").innerHTML = '';
	document.getElementById("pushobj2").innerHTML = '<p>本日の出庫自動記入は完成しました。</p>';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
		                                                onclick = "openpage()">在庫一覧参考</button></div><br>';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
        onclick = "dasabi()">出庫緊急手記入</button></div><br>';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
        onclick = "tnorosi()">棚卸</button></div><br>';
	

	if (flag === true) {
		document.getElementById("pushobj2").innerHTML += '<div><p>本日に出庫した商品があります。出庫チェックを行ってください。</p><button class="btn btn-primary btn-round"\
            onclick = "syukkocheck()">出庫チェックへ</button></div>';
	}

	document.getElementById("havefun2").innerHTML = "自動記入（済）";

	// the last thing : show out the warning
	var netable = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
	var netbody = $('<tbody></tbody>');
	var netr = $('<tr></tr>');
	netr.append('<th>item</th>');
	netr.append('<th>warehouse</th>');
	netr.append('<th>date</th>');
	netr.append('<th>quantity</th>');
	netr.append('<th>balance</th>');
	netr.append('<th>memo</th>');
	netr.appendTo(netbody);
	netbody.appendTo(netable);
	console.log(nearray);
	for (var i = 0; i < nearray.length; i++) {
		var nevalue = allcsvmap.get(nearray[i]);
		for (var j = 0; j < nevalue.length; j++) {
			if (nevalue[j].balance < 0) {

				var tdtr = $('<tr></tr>');
				tdtr.append('<td>' + finalmap.get(nearray[i]).detail + '</td>');
				tdtr.append('<td>' + finalmap.get(nearray[i]).whouse + '</td>');
				tdtr.append('<td>' + nevalue[j].date + '</td>');
				tdtr.append('<td>' + nevalue[j].quant + '</td>');
				tdtr.append('<td>' + nevalue[j].balance + '</td>');
				tdtr.append('<td>' + nevalue[j].memo + '</td>');
				tdtr.appendTo(netbody);
			}

		}
	}

	if (nearray.length >= 1) {
		document.getElementById("pushobj2").innerHTML += '<hr><p style="color:red"><strong>異常出庫テーブル：こちらの商品は将来在庫不足になるので、各担当倉庫に連絡を取ってください。</strong></p>';
		$("#pushobj2").append(netable);
		document.getElementById("pushobj2").innerHTML += '<hr><p>連絡方法：</p><br>';
		document.getElementById("pushobj2").innerHTML += '<div>東京１：03-1234-5678<br>東京２：03-5432-9876<br>大阪：03-1212-3434<br>福岡：03-6543-5645</div>';
	}

	pastmap2 = new Map(), nowmap2 = new Map(), futuremap2 = new Map();
	arrayforkinyuu2 = [];
	allcsvmap = new Map();
	countjidoukinyuu2 = 0;

}
// -------------------------------------------------------------------------------------------------------------------------//

var allcsvmap2 = new Map();

function dasabi() {
	refresh2();
	refreshsecondpart();
	pastmap2 = new Map(), nowmap2 = new Map(), futuremap2 = new Map();
	arrayforkinyuu2 = [];
	allcsvmap2 = new Map();
	countjidoukinyuu = 0;
	countjidoukinyuu2 = 0;
	counttekinyuu = 0;

	if (counttekinyuu2 == 0) {
		maincontent.innerHTML = "";
		subcontent.innerHTML = "";
		document.getElementById("pushobjxx").innerHTML = '';
		document.getElementById("pushobj1").innerHTML = '';
		document.getElementById("pushobj2").innerHTML = '';
		document.getElementById("pushobj3").innerHTML = '';
		if (document.getElementById("rightpanel") != null) {

			document.getElementById("rightpanel").parentNode
					.removeChild(document.getElementById("rightpanel"));
		}

		var futurecsv = alasql('select * from future');
		console.log(futurecsv);

		for (var i = 0; i < futurecsv.length; i++) { // for fcsvmap
			var futurecsvele = futurecsv[i];
			if (!futurecsvele.stock)
				futurecsvele = futurecsvele.future; // 确保不是null

			var whit = whitmap.get(futurecsvele.stock);
			var twhouseid = parseInt(whit[1]) - 1;
			var originalstock = togethercache[twhouseid]
					.get(futurecsvele.stock).stock;
			console.log(originalstock);
			console.log(finalmap.get(futurecsvele.stock).stock); // same

			if (allcsvmap2.has(futurecsvele.stock)) {
				var value = allcsvmap2.get(futurecsvele.stock);
				var object = {
					date : futurecsvele.date,
					quant : futurecsvele.qty,
					balance : originalstock,
					memo : futurecsvele.memo
				};
				value.push(object);
				allcsvmap2.set(futurecsvele.stock, value);

			} else {
				var value = [];
				var object = {
					date : futurecsvele.date,
					quant : futurecsvele.qty,
					balance : originalstock,
					memo : futurecsvele.memo
				};
				value.push(object);
				allcsvmap2.set(futurecsvele.stock, value);
			}
		}
		// not sorted yet
		var tempkeys = allcsvmap2.keys();
		while (true) {
			var key = tempkeys.next().value;
			if (key != null) {
				var value = allcsvmap2.get(key);
				value.sort(compare);
				console.log(value);
				allcsvmap2.set(key, value);
			} else
				break;
		}

		var tempkeys2 = allcsvmap2.keys();
		while (true) {
			var key = tempkeys2.next().value;
			if (key != null) {
				var value = allcsvmap2.get(key);
				for (var i = 0; i < value.length; i++) {
					if (i === 0)
						value[i].balance = value[i].balance + value[i].quant;
					else {
						value[i].balance = value[i - 1].balance
								+ value[i].quant;
					}
					console.log(value[i].balance);
				}
			} else
				break;
		}

		$('#pushobj1')
				.append(
						'<br>\
<label>倉庫先</label> <select name="q100" class="form-control"\
	id="tekiwhouse2" onchange="rockroll(this)"><option value="0">未選択</option>\
</select>\</div>');

		$('#pushobj1')
				.append(
						'<br>\
<label>アイテム</label> <select name="q101" class="form-control"\
id="tekiitem2"><option value="0">未選択</option>\
</select>\</div><br>');

		for (var i = 0; i < whouses.length; i++) {
			var ip = whouses[i];
			console.log(ip.whouse.name);
			var option = $('<option>');
			option.attr('value', ip.whouse.name);
			option.attr('id', 'tka' + i);
			option.text(ip.whouse.name);
			$('select[name="q100"]').append(option);
		}

		document.getElementById("pushobj1").innerHTML += '<div><label>数量:</label>\
			<input name="q104" type="text" class="form-control" id="dream" size="4"\
			 ></div><br>';
		document.getElementById("pushobj1").innerHTML += '<div><label>入庫日付:</label>\
			<button class="btn btn-xs btn-warning" onclick="selecttoday()">本日</button>\
			<input name="q102" type="date" class="form-control" id="happiness" size="4"\
			 ></div>';
		document.getElementById("pushobj1").innerHTML += '<br><div><label>メモ:</label>\
			<input name="q103" type="text" class="form-control" id="flower" size="8"\
			 ></div>';

		document.getElementById("pushobj1").innerHTML += '<br><div><button class="btn btn-success btn-round btn-lg"\
			onclick="dasabicore()">記入</button>';

		var rightpanel = $('<div style="margin-top:-600px;margin-left:700px;width:40%;" class="panel panel-warning" id="rightpanel"></div>');
		var body = $("body");
		var rpheading = $('<div class="panel-heading"></div>');
		rpheading
				.append('<div class="btn-group" data-toggle="buttons">\
	<label class="btn btn-warning btn-simple active" onclick="hahaca(this)" id="pastt">\
		<input type="checkbox" autocomplete="off" name="ch" checked> 遺漏\
	</label>\
	<label class="btn btn-warning btn-simple" onclick="hahaca(this)" id="nowt">\
		<input type="checkbox" name="ch" autocomplete="off"> 本日出庫\
	</label>\
	<label class="btn btn-warning　btn-simple" onclick="hahaca(this)" id="futuret">\
		<input type="checkbox" name="ch" autocomplete="off"> 受注\
	</label>\
	<button class="btn btn-info" onclick="tekisubmit_x()" style="margin-left:180px;">サブミット</button>\
       </div>');
		rpheading.appendTo(rightpanel);
		rightpanel.appendTo(body);

		var rpbody = $('<div class="panel-heading">ここで入力した記録を参照することができます。</div>');
		rpbody.appendTo(rightpanel);

		var container = $('<div id="container"></div>');
		container.appendTo(rightpanel);

	}
	counttekinyuu2++;
	console.log(allcsvmap2);
	console.log(alasql('select * from future'));
}

function rockroll(event) {
	document.getElementById("tekiitem2").innerHTML = '<option value="0">未選択</option>';
	var numberwhid = event[event.selectedIndex].id;
	if (numberwhid) {
		if (numberwhid == "tka0") { // box with all those in tokyo1
			var soukow0 = tokyo1.keys();
			while (true) {
				var key = soukow0.next().value;
				if (key != null) {
					var option = $('<option>');
					option.attr('value', tokyo1.get(key).detail);
					option.attr('id', '0tka' + key);
					option.text(tokyo1.get(key).detail);
					$('select[name="q101"]').append(option);
				} else
					break;
			}
		}
		if (numberwhid == "tka1") { // box with all those in tokyo1
			var soukow1 = tokyo2.keys();
			while (true) {
				var key = soukow1.next().value;
				if (key != null) {
					var option = $('<option>');
					option.attr('value', tokyo2.get(key).detail);
					option.attr('id', '1tka' + key);
					option.text(tokyo2.get(key).detail);
					$('select[name="q101"]').append(option);
				} else
					break;
			}
		}
		if (numberwhid == "tka2") { // box with all those in tokyo1
			var soukow2 = osaka.keys();
			while (true) {
				var key = soukow2.next().value;
				if (key != null) {
					var option = $('<option>');
					option.attr('value', osaka.get(key).detail);
					option.attr('id', '2tka' + key);
					option.text(osaka.get(key).detail);
					$('select[name="q101"]').append(option);
				} else
					break;
			}

		}
		if (numberwhid == "tka3") { // box with all those in tokyo1
			var soukow3 = fukuoka.keys();
			while (true) {
				var key = soukow3.next().value;
				if (key != null) {
					var option = $('<option>');
					option.attr('value', fukuoka.get(key).detail);
					option.attr('id', '3tka' + key);
					option.text(fukuoka.get(key).detail);
					$('select[name="q101"]').append(option);
				} else
					break;
			}
		}
	}

}

function hahaca(b) {
	var id = $(b).attr("id");
	document.getElementById("container").innerHTML = '';
	if (id === "pastt") {
		$("div#container").append(ptable2);
	} else if (id === "nowt") {
		$("div#container").append(ntable2);
		var nowrows = document.getElementById("ntable2").rows;
		for (var i = 1; i < nowrows.length; i++) {
			var nowtr = nowrows[i];
			console.log("haha");
			var tds = nowtr.cells;
			var nowtridarray = nowtr.id.split(",");
			var bianhuanquanjiatong = nowtr.id.substring(7);
			var thatstockid = whitmapreverse.get(nowtridarray[1] + ','
					+ nowtridarray[2]);
			if (dizstockid = thatstockid) {
				var arraytochacha = allcsvmap2.get(thatstockid);
				for (var j = 0; j < arraytochacha.length; j++) {
					if (Math.abs(arraytochacha[j].quant) === parseInt(tds[2].innerHTML)
							&& arraytochacha[j].memo === tds[4].innerHTML
							&& arraytochacha[j].date === tds[3].innerHTML) {
						if (arraytochacha[j].balance < 0) {
							tds[5].innerHTML = '<td><button id="UNS,'
									+ bianhuanquanjiatong
									+ '" class="btn btn-xs btn-warning" data-html="true" onclick="shownoenough2(this)" data-toggle="popover" title="取引明細">不足</button></td>';
						} else
							tds[5].innerHTML = '';
					}
				}

			}
		}
	}

	else {
		$("div#container").append(ftable2);
		var futurerows = document.getElementById("ftable2").rows;
		for (var i = 1; i < futurerows.length; i++) {
			var futuretr = futurerows[i];
			var tds = futuretr.cells;
			var ftridarray = futuretr.id.split(",");
			var bianhuanquanjiatong = futuretr.id.substring(7);
			console.log(tds[5].innerHTML);
			console.log(bianhuanquanjiatong);
			var thatstockid = whitmapreverse.get(ftridarray[1] + ','
					+ ftridarray[2]);
			if (dizstockid = thatstockid) {
				var arraytochacha = allcsvmap2.get(thatstockid);
				for (var j = 0; j < arraytochacha.length; j++) {
					if (Math.abs(arraytochacha[j].quant) === parseInt(tds[2].innerHTML)
							&& arraytochacha[j].memo === tds[4].innerHTML
							&& arraytochacha[j].date === tds[3].innerHTML) {
						if (arraytochacha[j].balance < 0) {
							tds[5].innerHTML = '<td><button id="UNS,'
									+ bianhuanquanjiatong
									+ '" class="btn btn-xs btn-warning" data-html="true" onclick="shownoenough2(this)" data-toggle="popover" title="取引明細">不足</button></td>';
						} else
							tds[5].innerHTML = '';
					}
				}
			}
		}
	}

}

function dasabicore() {

	// trnow and trfuture need busoku to be added

	var cangku = document.getElementById("tekiwhouse2").value;
	var dongxi = document.getElementById("tekiitem2").value;
	var shuliang = document.getElementById("dream").value;
	var riqi = document.getElementById("happiness").value;
	var biji = document.getElementById("flower").value;

	console.log(cangku + ',' + dongxi + ',' + shuliang + ',' + riqi + ','
			+ biji);

	if (cangku === "0" || dongxi === "0" || riqi === "" || biji === ""
			|| shuliang === "") {
		alert("Some places remain to be filled");
		return;
	}
	
	if (!shuliang) {
		alert("please enter a proper number");
		return;
	}

	else {
		for (var i = 0; i < shuliang.length; i++) {
			if (valueIsNaN(parseInt(shuliang.charAt(i)))) {
				alert("please enter a proper number");
				return;
			}
		}
	}
	var riqishulie = riqi.split("-");
	var cangkuid = whouseMapRev.get(cangku) + 1;
	var dongxiid = itemmap.get(dongxi);
	var checkshulie = dongxiid + ',' + cangkuid + ',' + shuliang + ',' + biji
			+ ',' + parseInt(riqishulie[0]) + ',' + parseInt(riqishulie[1])
			+ ',' + parseInt(riqishulie[2]);

	console.log(checkshulie);
	console.log(arrayforkinyuu2);

	for (var i = 0; i < arrayforkinyuu2.length; i++) {
		if (arrayforkinyuu2[i] === checkshulie) {
			alert("duplicate");
			return;
		}
	}
	arrayforkinyuu2.push(checkshulie);
	console.log(arrayforkinyuu2);

	var barcode = dongxiid + ',' + cangkuid;
	var quanjiatong4 = barcode + ',' + shuliang + ',' + biji + ','
			+ riqishulie[0] + ',' + riqishulie[1] + ',' + riqishulie[2];
	var dizstockid = whitmapreverse.get(barcode);

	// ------------------------------------------------------------------------------------------------------------------//

	if ((ye === parseInt(riqishulie[0]) && mo === parseInt(riqishulie[1]) && parseInt(riqishulie[2]) < day)
			|| (ye === parseInt(riqishulie[0]) && parseInt(riqishulie[1]) < mo)
			|| (parseInt(riqishulie[0]) < ye)) {
		// add to pastmap
		var originalstockk = finalmap.get(dizstockid).stock;
		if (!allcsvmap2.has(dizstockid)) {
			if (shuliang > originalstockk) {
				for (var m = 0; m < arrayforkinyuu2.length; m++) {
					if (arrayforkinyuu2[m] === checkshulie) {
						arrayforkinyuu2.splice(m, 1);
					}
				}
				console.log(arrayforkinyuu2);
				alert("現在庫数に超えています");
				return;
			}
			var newarrayincsv = [];
			var object = {
				balance : originalstockk - shuliang,
				date : riqi,
				memo : biji,
				quant : shuliang * (-1)
			};
			newarrayincsv.push(object);
			allcsvmap2.set(dizstockid, newarrayincsv);
		} else {

			var arraytodosth = allcsvmap2.get(dizstockid);
			var object = {
				balance : 0,
				date : riqi,
				memo : biji,
				quant : shuliang * (-1)
			};
			console.log(bidaxiao(riqi, arraytodosth[0].date));
			console.log(riqi);
			console.log(arraytodosth[0].date);
			if (arraytodosth.length === 0) {
				if (originalstockk - shuliang < 0) {
					for (var v = 0; v < arrayforkinyuu2.length; v++) {
						if (arrayforkinyuu2[v] === checkshulie) {
							arrayforkinyuu2.splice(v, 1);
						}
					}
					console.log("why");
					alert("現在庫数に超えています");
					return;
				} else {
					object.balance = originalstockk - shuliang;
					arraytodosth.push(object);
				}
			} else if (arraytodosth.length === 1) {
				if (bidaxiao(riqi, arraytodosth[0].date) >= 0) {
					var bbbala = arraytodosth[0].balance - shuliang;
					console.log(bbbala + 8);
					if (bbbala < 0) {
						for (var v = 0; v < arrayforkinyuu2.length; v++) {
							if (arrayforkinyuu2[v] === checkshulie) {
								arrayforkinyuu2.splice(v, 1);
							}
						}
						console.log("why");
						alert("現在庫数に超えています");
						return;
					} else {
						arraytodosth.push(object);
						arraytodosth.sort(compare);
						for (var w = 0; w < arraytodosth.length; w++) {
							var hereiam = arraytodosth[w];
							if (w === 0)
								hereiam.balance = originalstockk
										+ hereiam.quant;
							else
								hereiam.balance = arraytodosth[w - 1].balance
										+ hereiam.quant;
						}
					}
				} else {
					var x1 = originalstockk - shuliang;
					var x2 = x1 + arraytodosth[0].quant;
					console.log(x1, ',' + x2);
					if (x1 < 0 || x2 < 0) {
						for (var v = 0; v < arrayforkinyuu2.length; v++) {
							if (arrayforkinyuu2[v] === checkshulie) {
								arrayforkinyuu2.splice(v, 1);
							}
						}
						console.log("why");
						alert("現在庫数に超えています");
						return;
					} else {
						arraytodosth.push(object);
						arraytodosth.sort(compare);
						for (var w = 0; w < arraytodosth.length; w++) {
							var hereiam = arraytodosth[w];
							if (w === 0)
								hereiam.balance = originalstockk
										+ hereiam.quant;
							else
								hereiam.balance = arraytodosth[w - 1].balance
										+ hereiam.quant;
						}
					}

				}

			} else {
				for (var m = 0; m < arraytodosth.length - 1; m++) {
					var heil = arraytodosth[m], heil2 = arraytodosth[m + 1];
					if (bidaxiao(riqi, heil.date) >= 0
							&& bidaxiao(riqi, heil2.date) < 0) {
						if (bidaxiao(heil2.date, todaystring) < 0) {
							console.log("we are here");
							var b2 = heil.balance - shuliang + heil2.quant;
							if (b2 < 0) {
								for (var v = 0; v < arrayforkinyuu2.length; v++) {
									if (arrayforkinyuu2[v] === checkshulie) {
										arrayforkinyuu2.splice(v, 1);
									}
								}
								console.log("why");
								alert("現在庫数に超えています。入力データをもう一度確認してください。");
								return;
							}
						}
						var b1 = heil.balance - shuliang;
						if (b1 < 0) {
							for (var v = 0; v < arrayforkinyuu2.length; v++) {
								if (arrayforkinyuu2[v] === checkshulie) {
									arrayforkinyuu2.splice(v, 1);
								}
							}
							console.log("why");
							alert("現在庫数に超えています");
							return;
						} else {
							arraytodosth.push(object);
							arraytodosth.sort(compare);
							for (var w = 0; w < arraytodosth.length; w++) {
								var hereiam = arraytodosth[w];
								if (w === 0)
									hereiam.balance = originalstockk
											+ hereiam.quant;
								else
									hereiam.balance = arraytodosth[w - 1].balance
											+ hereiam.quant;
							}
							break;
						}
					} else if (bidaxiao(riqi, heil2.date) >= 0
							&& m === arraytodosth.length - 2) {
						var b1 = heil2.balance - shuliang;
						if (b1 < 0) {
							for (var v = 0; v < arrayforkinyuu2.length; v++) {
								if (arrayforkinyuu2[v] === checkshulie) {
									arrayforkinyuu2.splice(v, 1);
								}
							}
							console.log("why");
							alert("現在庫数に超えています");
							return;
						} else {
							arraytodosth.push(object);
							// arraytodosth.sort(compare);
							arraytodosth[arraytodosth.length - 1].balance = arraytodosth[arraytodosth.length - 2].balance
									- shuliang;
							break;
						}
					} else if (bidaxiao(riqi, heil.date) < 0 && m === 0) {
						console.log("smallers");
						if (shuliang > originalstockk) {
							for (var v = 0; v < arrayforkinyuu2.length; v++) {
								if (arrayforkinyuu2[v] === checkshulie) {
									arrayforkinyuu2.splice(v, 1);
								}
							}
							console.log("why");
							alert("現在庫数に超えています");
							return;
						}
						var heica = originalstockk - shuliang;
						console.log(arraytodosth);
						console.log(heica);
						console.log(checkshulie);
						for (var z = 0; z < arraytodosth.length; z++) {
							if (bidaxiao(todaystring, arraytodosth[z].date) > 0) {
								console.log(arraytodosth[z]);
								heica += arraytodosth[z].quant;
								console.log(heica);
								if (heica < 0) {
									console.log("here");
									console.log(arrayforkinyuu2);
									for (var v = 0; v < arrayforkinyuu2.length; v++) {
										console.log(arrayforkinyuu2[v]);
										console.log(checkshulie);
										if (arrayforkinyuu2[v] === checkshulie) {
											console.log("bingo");
											arrayforkinyuu2.splice(v, 1);
										}
									}
									console.log("why");
									console.log(arrayforkinyuu2);
									alert("現在庫数に超えています");
									return;
								}
							}
						}
						arraytodosth.push(object);
						arraytodosth.sort(compare);
						for (var w = 0; w < arraytodosth.length; w++) {
							var hereiam = arraytodosth[w];
							if (w === 0)
								hereiam.balance = originalstockk
										+ hereiam.quant;
							else
								hereiam.balance = arraytodosth[w - 1].balance
										+ hereiam.quant;
						}
						break;
					}
				}
			}

		}
		console.log(allcsvmap2);

		// ----------------------------------------------------------------------------------------------------------//
		console.log("in the past");

		if (!pastmap2.has(barcode)) {
			var value = [];
			var element = shuliang + "," + riqi + "," + biji + ","
					+ riqishulie[0] + "," + riqishulie[1] + "," + riqishulie[2];
			value.push(element);
			pastmap2.set(barcode, value);
		} else {
			var value = pastmap2.get(barcode);
			var element = shuliang + "," + riqi + "," + biji + ","
					+ riqishulie[0] + "," + riqishulie[1] + "," + riqishulie[2];
			value.push(element);
			pastmap2.set(barcode, value); // barcode里面的whouseid是从1开始算得
		}

		console.log(quanjiatong4);
		var trpast2 = $('<tr id="tekitr,' + quanjiatong4 + '"></tr>');
		trpast2.append('<td>' + dongxi + '</td>');
		trpast2.append('<td>' + cangku + '</td>');
		trpast2.append('<td id="shuliang,' + quanjiatong4 + '">' + shuliang
				+ '</td>');
		trpast2.append('<td id="riqi,' + quanjiatong4 + '">' + riqi + '</td>'); // ->
		// this
		// is a
		// difficult
		// part when get changed
		trpast2.append('<td id="biji,' + quanjiatong4 + '">' + biji + '</td>');
		trpast2.append('<td><button class="btn btn-danger btn-xs" id="quxiao,'
				+ quanjiatong4
				+ '" onclick="tekicancel_x(this)">キャンセル</button></td>');
		trpast2
				.append('<td><button class="btn btn-info btn-xs helloworld_x" id="bianji,'
						+ quanjiatong4
						+ '" onclick="tekichange_x(this)">変更</button></td>');
		trpast2.appendTo(ptbody2);

	} else {

		if ((parseInt(riqishulie[0]) == ye && parseInt(riqishulie[1]) == mo && parseInt(riqishulie[2]) == day)) {

			// to do : push into allcsvmap2, sort,check

			// if (!nowmap2.has(barcode)) {
			// var value = [];
			// var element = shuliang + "," + riqi + "," + biji + ","
			// + riqishulie[0] + "," + riqishulie[1] + ","
			// + riqishulie[2];
			// value.push(element);
			// nowmap2.set(barcode, value);
			// } else {
			// var value = nowmap.get(barcode);
			// var element = shuliang + "," + riqi + "," + biji + ","
			// + riqishulie[0] + "," + riqishulie[1] + ","
			// + riqishulie[2];
			// value.push(element);
			// nowmap2.set(barcode, value);
			// }

			var trnow2 = $('<tr id="tekitr,' + quanjiatong4 + '"></tr>');
			trnow2.append('<td>' + dongxi + '</td>');
			trnow2.append('<td>' + cangku + '</td>');
			trnow2.append('<td id="shuliang,' + quanjiatong4 + '">' + shuliang
					+ '</td>');
			trnow2.append('<td id="riqi,' + quanjiatong4 + '">' + riqi
					+ '</td>'); // -> this is a
			// difficult
			// part when get changed
			trnow2.append('<td id="biji,' + quanjiatong4 + '">' + biji
					+ '</td>');

			trnow2.append('<td></td>');

			trnow2
					.append('<td><button class="btn btn-danger btn-xs" id="quxiao,'
							+ quanjiatong4
							+ '" onclick="tekicancel_x(this)">キャンセル</button></td>');
			trnow2
					.append('<td><button class="btn btn-info btn-xs helloworld_x" id="bianji,'
							+ quanjiatong4
							+ '" onclick="tekichange_x(this)">変更</button></td>');
			trnow2.appendTo(ntbody2);

			update_allcsvmap2(dizstockid, shuliang, riqi, biji);

		} else {
			if (!futuremap2.has(barcode)) {
				var value = [];
				var element = shuliang + "," + riqi + "," + biji + ","
						+ riqishulie[0] + "," + riqishulie[1] + ","
						+ riqishulie[2];
				value.push(element);
				futuremap2.set(barcode, value);
			} else {
				var value = futuremap2.get(barcode);
				var element = shuliang + "," + riqi + "," + biji + ","
						+ riqishulie[0] + "," + riqishulie[1] + ","
						+ riqishulie[2];
				value.push(element);
				futuremap2.set(barcode, value);
			}

			var trfuture2 = $('<tr id="tekitr,' + quanjiatong4 + '"></tr>');
			trfuture2.append('<td>' + dongxi + '</td>');
			trfuture2.append('<td>' + cangku + '</td>');
			trfuture2.append('<td id="shuliang,' + quanjiatong4 + '">'
					+ shuliang + '</td>');
			trfuture2.append('<td id="riqi,' + quanjiatong4 + '">' + riqi
					+ '</td>'); // -> this is a
			trfuture2.append('<td id="biji,' + quanjiatong4 + '">' + biji
					+ '</td>');

			trfuture2.append('<td></td>');

			trfuture2
					.append('<td><button class="btn btn-danger btn-xs" id="quxiao,'
							+ quanjiatong4
							+ '" onclick="tekicancel_x(this)">キャンセル</button></td>');
			trfuture2
					.append('<td><button class="btn btn-info btn-xs helloworld_x" id="bianji,'
							+ quanjiatong4
							+ '" onclick="tekichange_x(this)">変更</button></td>');
			trfuture2.appendTo(ftbody2);

			update_allcsvmap2(dizstockid, shuliang, riqi, biji);
		}
	}
	console.log(arrayforkinyuu2);
}

function tekicancel_x(b) {
	var ida = $(b).attr("id").substring(6); // you douhao
	var idarray = $(b).attr("id").split(",");
	var sb1 = idarray[1], sb2 = idarray[2], sb3 = idarray[3], sb4 = idarray[4], sb5 = idarray[5], sb6 = idarray[6], sb7 = idarray[7];
	console.log(idarray);
	ida = "tekitr" + ida;
	console.log(ida);
	var cda = "bianji" + ida.substring(6);
	if (document.getElementById(cda).innerHTML === "保存") {
		alert("Please finish the change function first");
		return;
	}
	var trr = document.getElementById(ida);
	var tds = trr.getElementsByTagName('td');
	var ndadate = tds[3].innerHTML.split("-");

	var bigbang = sb1 + ',' + sb2 + ',' + tds[2].innerHTML + ','
			+ tds[4].innerHTML + ',' + parseInt(ndadate[0]) + ','
			+ parseInt(ndadate[1]) + ',' + parseInt(ndadate[2]);
	console.log(bigbang);
	console.log(arrayforkinyuu2);

	for (var i = 0; i < arrayforkinyuu2.length; i++) {
		if (arrayforkinyuu2[i] === bigbang)
			arrayforkinyuu2.splice(i, 1);
	}
	console.log(arrayforkinyuu2);

	trr.remove();

	// next handle the csvmap
	var datstockid = whitmapreverse.get(sb1 + ',' + sb2);
	var tds2 = parseInt(tds[2].innerHTML), tds3 = tds[3].innerHTML, tds4 = tds[4].innerHTML;
	var kyou;
	if (mo < 10 && day < 10)
		kyou = ye + "-0" + mo + "-0" + day;
	else if (mo < 10)
		kyou = ye + "-0" + mo + "-" + day;
	else if (day < 10)
		kyou = ye + "-" + mo + "-0" + day;
	else
		kyou = ye + "-" + mo + "-" + day;
	if (bidaxiao(kyou, tds3) > 0)
		kyou = 2;
	else if (bidaxiao(kyou, tds3) === 0)
		kyou = 1;
	else
		kyou = 0;

	delete_allcsvmap2(datstockid, tds2, tds3, tds4, kyou);

}

var tekir_11 = 0, tekir_12 = 0, tekir_13 = 0;
var oldmemo_1 = "";
var oldqua_1 = 0;
var olddate_1 = "";
function tekichange_x(b) {
	var changequanjiatong = $(b).attr("id");
	var ida = $(b).attr("id").substring(6); // you douhao
	var id = $(b).attr("id").substring(7); // mei douhao
	var idarray = $(b).attr("id").split(",");
	var sb1 = idarray[1], sb2 = idarray[2], sb3 = idarray[3], sb4 = idarray[4], sb5 = idarray[5], sb6 = idarray[6], sb7 = idarray[7];
	console.log(idarray);
	ida = "tekitr" + ida;
	var inner = $(b)[0].innerHTML;
	console.log(inner);
	var trr = document.getElementById("tekitr," + id);
	console.log(trr);
	var tds = trr.getElementsByTagName('td');
	var idforqua = id + ",tksb1", idfordate = id + ",tksb2", idformemo = id
			+ ",tksb3";
	console.log(trr);
	if (inner === "変更") {
		var bigdatearray = tds[3].innerHTML.split("-");
		var bdate0 = parseInt(bigdatearray[0]), bdate1 = parseInt(bigdatearray[1]), bdate2 = parseInt(bigdatearray[2]);
		tekir_11 = parseInt(bigdatearray[0]),
				tekir_12 = parseInt(bigdatearray[1]),
				tekir_13 = parseInt(bigdatearray[2]);
		var bigbang = sb1 + ',' + sb2 + ',' + tds[2].innerHTML + ','
				+ tds[4].innerHTML + ',' + bdate0 + ',' + bdate1 + ',' + bdate2;

		for (var i = 0; i < arrayforkinyuu2.length; i++) {
			if (arrayforkinyuu2[i] === bigbang)
				arrayforkinyuu2.splice(i, 1);
		}
		console.log(arrayforkinyuu2);
		// 2 3 4 input change
		var tds2 = parseInt(tds[2].innerHTML);
		var tds3 = tds[3].innerHTML;
		var tds4 = tds[4].innerHTML;

		oldqua_1 = parseInt(tds[2].innerHTML);
		oldmemo_1 = tds[4].innerHTML;
		olddate_1 = tds[3].innerHTML;

		tds[2].innerHTML = '<input name="q110" type="text" class="form-control"\
			id="'
				+ idforqua + '" size="2" value="' + tds2 + '">';
		tds[3].innerHTML = '<input name="q111" type="date" class="form-control"\
			id="'
				+ idfordate + '" value="' + tds3 + '">';
		tds[4].innerHTML = '<input name="q112" type="text" class="form-control"\
			id="'
				+ idformemo + '" size="2" value="' + tds4 + '">';
		if (bdate0 < ye || (bdate0 === ye && bdate1 < mo)
				|| (bdate0 === ye && bdate1 === mo && bdate2 < day)) {
			tds[6].innerHTML = '<td><button class="btn btn-success btn-xs helloworld_x" id="'
					+ changequanjiatong
					+ '" onclick="tekichange_x(this)">保存</button></td>';
		} else {
			tds[7].innerHTML = '<td><button class="btn btn-success btn-xs helloworld_x" id="'
					+ changequanjiatong
					+ '" onclick="tekichange_x(this)">保存</button></td>';
		}
	} else {
		var newdelta = document.getElementById(idforqua).value;
		var newdate = document.getElementById(idfordate).value;
		var newmemo = document.getElementById(idformemo).value;
		console.log(newdelta);
		console.log(newdate);
		console.log(newmemo);
		var newdatearr = newdate.split("-");

		if (!newdelta) {
			alert("please enter a proper number");
			return;
		}

		else {
			for (var i = 0; i < newdelta.length; i++) {
				if (valueIsNaN(parseInt(newdelta.charAt(i)))) {
					alert("please enter a proper number");
					return;
				}
			}
		}
		if (!newmemo) {
			alert("メモを記入してください");
			return;
		}

		if (!newdate) {
			alert("日付を記入してください");
			return;
		}
		newdelta = parseInt(newdelta);
		console.log(newdelta);
		var checkdup = sb1 + ',' + sb2 + ',' + newdelta + ',' + newmemo + ','
				+ parseInt(newdatearr[0]) + ',' + parseInt(newdatearr[1]) + ','
				+ parseInt(newdatearr[2]);
		console.log(checkdup);
		if (arrayforkinyuu2.includes(checkdup)) {
			alert("duplicate");
			return;
		} else {
			arrayforkinyuu2.push(checkdup);
		}
		console.log(arrayforkinyuu2);

		if ((tekir_11 === ye && tekir_12 === mo && tekir_13 < day)
				|| (tekir_11 === ye && tekir_12 < mo) || (tekir_11 < ye)) {

			if (parseInt(newdatearr[0]) > ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) > mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) > day)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) === day)) {

				for (var j = 0; j < arrayforkinyuu2.length; j++) {
					if (arrayforkinyuu2[j] === checkdup) {
						arrayforkinyuu2.splice(j, 1);
					}
				}
				alert("すでに発生した入庫記録です！本日以後の日付に変更することはできません。");
				return;
			} else {
				var thisstockid_check = whitmapreverse.get(sb1 + ',' + sb2);
				var arraytochange_check = allcsvmap2.get(thisstockid_check);
				console.log(arraytochange_check);
				var originalstock_check = finalmap.get(thisstockid_check).stock;
				console.log(originalstock_check);
				var lastbalance = originalstock_check;
				for (var i = 0; i < arraytochange_check.length; i++) {
					if (!(Math.abs(arraytochange_check[i].quant) === oldqua_1
							&& arraytochange_check[i].memo === oldmemo_1 && arraytochange_check[i].date === olddate_1)
							&& (bidaxiao(todaystring,
									arraytochange_check[i].date) > 0)) {
						lastbalance += arraytochange_check[i].quant;
					}
				}

				if (lastbalance - newdelta < 0) {
					for (var j = 0; j < arrayforkinyuu2.length; j++) {
						if (arrayforkinyuu2[j] === checkdup) {
							arrayforkinyuu2.splice(j, 1);
						}
					}
					alert("過去の在庫は不足になります。");
					return;

				}
				tds[2].innerHTML = newdelta;
				tds[3].innerHTML = newdate;
				tds[4].innerHTML = newmemo;
				tds[5].innerHTML = '<td><button class="btn btn-danger btn-xs" id="quxiao,'
						+ id
						+ '" onclick="tekicancel_x(this)">キャンセル</button></td>';
				tds[6].innerHTML = '<td><button class="btn btn-info btn-xs helloworld_x" id="bianji,'
						+ id
						+ '" onclick="tekichange_x(this)">変更</button></td>';

				// recalculate
				realupdate_allcsvmap2(sb1, sb2, oldqua_1, oldmemo_1, olddate_1,
						newdate, newdelta, newmemo);
			}
		} else if (tekir_11 === ye && tekir_12 === mo && tekir_13 === day) {

			console.log('the old date is: ' + tekir_11 + ',' + tekir_12 + ','
					+ tekir_13 + ';; the old quantity is: ' + oldqua_1
					+ ';;; the old memo is' + oldmemo_1);

			if (parseInt(newdatearr[0]) < ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) < mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) < day)) {
				for (var j = 0; j < arrayforkinyuu2.length; j++) {
					if (arrayforkinyuu2[j] === checkdup)
						arrayforkinyuu2.splice(j, 1);
				}
				alert("まだ入庫していないので、本日以前の日付に変更することはできません。");
				return;
			} else if (parseInt(newdatearr[0]) > ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) > mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) > day)) {
				if (window.confirm("今後入庫予定に移りますか？")) {
					trr.remove();

					var trnew = $('<tr id="tekitr,' + id + '"></tr>');
					trnew.append('<td>' + tds[0].innerHTML + '</td>');
					trnew.append('<td>' + tds[1].innerHTML + '</td>');
					trnew.append('<td id="shuliang,' + id + '">' + newdelta
							+ '</td>');
					trnew.append('<td id="riqi,' + id + '">' + newdate
							+ '</td>');
					trnew.append('<td id="biji,' + id + '">' + newmemo
							+ '</td>');
					trnew.append('<td></td>');
					trnew
							.append('<td><button class="btn btn-danger btn-xs" id="quxiao,'
									+ id
									+ '" onclick="tekicancel_x(this)">キャンセル</button></td>');
					trnew
							.append('<td><button class="btn btn-info btn-xs helloworld_x" id="bianji,'
									+ id
									+ '" onclick="tekichange_x(this)">変更</button></td>');
					console.log(trnew);
					trnew.appendTo(ftbody2);
					console.log(allcsvmap2);
					realupdate_allcsvmap2(sb1, sb2, oldqua_1, oldmemo_1,
							olddate_1, newdate, newdelta, newmemo);
				} else {
					alert("You have entered an invalid date");
				}
			} else {
				tds[2].innerHTML = newdelta;
				tds[3].innerHTML = newdate;
				tds[4].innerHTML = newmemo;
				tds[6].innerHTML = '<td><button class="btn btn-danger btn-xs" id="quxiao,'
						+ id
						+ '" onclick="tekicancel_x(this)">キャンセル</button></td>';
				tds[7].innerHTML = '<td><button class="btn btn-info btn-xs helloworld_x" id="bianji,'
						+ id
						+ '" onclick="tekichange_x(this)">変更</button></td>';
				realupdate_allcsvmap2(sb1, sb2, oldqua_1, oldmemo_1, olddate_1,
						newdate, newdelta, newmemo);
			}
		} else {
			if (parseInt(newdatearr[0]) < ye
					|| (parseInt(newdatearr[0]) === ye && parseInt(newdatearr[1]) < mo)
					|| (parseInt(newdatearr[0]) === ye
							&& parseInt(newdatearr[1]) === mo && parseInt(newdatearr[2]) < day)) {
				for (var j = 0; j < arrayforkinyuu2.length; j++) {
					if (arrayforkinyuu2[j] === checkdup) {
						arrayforkinyuu2.splice(j, 1);
					}
				}
				alert("まだ入庫していないので、本日以前の日付に変更することはできません。");
				return;
			} else if (parseInt(newdatearr[0]) === ye
					&& parseInt(newdatearr[1]) === mo
					&& parseInt(newdatearr[2]) === day) {
				if (window.confirm("本日入庫予定に移りますか？")) {
					trr.remove();
					var trnew = $('<tr id="tekitr,' + id + '"></tr>');
					trnew.append('<td>' + tds[0].innerHTML + '</td>');
					trnew.append('<td>' + tds[1].innerHTML + '</td>');
					trnew.append('<td id="shuliang,' + id + '">' + newdelta
							+ '</td>');
					trnew.append('<td id="riqi,' + id + '">' + newdate
							+ '</td>');
					trnew.append('<td id="biji,' + id + '">' + newmemo
							+ '</td>');
					trnew.append('<td></td>');
					trnew
							.append('<td><button class="btn btn-danger btn-xs" id="quxiao,'
									+ id
									+ '" onclick="tekicancel_x(this)">キャンセル</button></td>');
					trnew
							.append('<td><button class="btn btn-info btn-xs　helloworld_x" id="bianji,'
									+ id
									+ '" onclick="tekichange_x(this)">変更</button></td>');
					console.log(trnew);
					trnew.appendTo(ntable2);
					realupdate_allcsvmap2(sb1, sb2, oldqua_1, oldmemo_1,
							olddate_1, newdate, newdelta, newmemo);
				}
			} else {
				tds[2].innerHTML = newdelta;
				tds[3].innerHTML = newdate;
				tds[4].innerHTML = newmemo;
				tds[6].innerHTML = '<td><button class="btn btn-danger btn-xs" id="quxiao,'
						+ id
						+ '" onclick="tekicancel_x(this)">キャンセル</button></td>';
				tds[7].innerHTML = '<td><button class="btn btn-info btn-xs helloworld_x" id="bianji,'
						+ id
						+ '" onclick="tekichange_x(this)">変更</button></td>';
				realupdate_allcsvmap2(sb1, sb2, oldqua_1, oldmemo_1, olddate_1,
						newdate, newdelta, newmemo);
			}

		}

	}
	console.log(allcsvmap2);
}

function tekisubmit_x() {
	flag = false;
	var nearray = [];
	var arar = document.getElementsByClassName("helloworld_x");
	for (var i = 0; i < arar.length; i++) {
		if (arar[i].innerHTML == "保存") {
			alert("変更を完成してください");
			return;
		}
	}

	document.getElementById("container").innerHTML = '';
	$("div#container").append(ptable2);
	var rows = document.getElementById("ptable2").rows;
	console.log(rows.length);
	for (var i = 1; i < rows.length; i++) {
		var tds = rows[i].cells;
		var arraytoinsert = [];
		var iddd = alasql('SELECT MAX(id) + 1 as id FROM trans')[0].id;
		arraytoinsert.push(iddd);
		var a = parseInt(tds[2].id.split(",")[1]);
		var b = parseInt(tds[2].id.split(",")[2]);
		var barcode = a + ',' + b;
		var c = whitmapreverse.get(a + ',' + b);
		arraytoinsert.push(c);
		arraytoinsert.push(tds[3].innerHTML);
		arraytoinsert.push(parseInt(tds[2].innerHTML) * (-1));
		var y = 0;
		var iroiroarr = allcsvmap2.get(c);
		for (var j = 0; j < iroiroarr.length; j++) {
			if (tds[4].innerHTML === iroiroarr[j].memo
					&& parseInt(tds[2].innerHTML) === Math
							.abs(parseInt(iroiroarr[j].quant))
					&& tds[3].innerHTML === iroiroarr[j].date) {
				y = iroiroarr[j].balance;
				break;
			}
		}
		console.log(y);

		arraytoinsert.push(y);
		arraytoinsert.push(tds[4].innerHTML);
		var arr = tds[3].innerHTML.split("-");
		arraytoinsert.push(parseInt(arr[0]));
		arraytoinsert.push(parseInt(arr[1]));
		arraytoinsert.push(parseInt(arr[2]));
		alasql(
				'INSERT INTO trans(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arraytoinsert);

	}

	document.getElementById("container").innerHTML = '';
	$("div#container").append(ntable2);
	var rows2 = document.getElementById("ntable2").rows;
	if (rows2.length > 1)
		flag = true;
	for (var i = 1; i < rows2.length; i++) {
		var tds = rows2[i].cells;
		var busokuornot = tds[5].innerText;
		var arraytoinsert = [];
		var iddd = 0;
		if (alasql('select * from future') === null
				|| alasql('select * from future').length === 0) {
			iddd = 1;
		} else
			iddd = alasql('SELECT MAX(id) + 1 as id FROM future')[0].id;
		arraytoinsert.push(iddd);
		var a = parseInt(tds[2].id.split(",")[1]);
		console.log(a);
		var b = parseInt(tds[2].id.split(",")[2]);
		var barcode = a + ',' + b;
		var c = whitmapreverse.get(a + ',' + b);

		if (busokuornot === "不足") {
			if (!nearray.includes(c))
				nearray.push(c);
		}

		arraytoinsert.push(c);
		arraytoinsert.push(tds[3].innerHTML);
		arraytoinsert.push(parseInt(tds[2].innerHTML) * (-1));
		var y = 0;
		var iroiroarr = allcsvmap2.get(c);
		for (var j = 0; j < iroiroarr.length; j++) {
			if (tds[4].innerHTML === iroiroarr[j].memo
					&& parseInt(tds[2].innerHTML) === Math
							.abs(parseInt(iroiroarr[j].quant))
					&& tds[3].innerHTML === iroiroarr[j].date) {
				y = iroiroarr[j].balance;
				break;
			}
		}
		console.log(y);

		arraytoinsert.push(y);
		arraytoinsert.push(tds[4].innerHTML);
		var arr = tds[3].innerHTML.split("-");
		arraytoinsert.push(parseInt(arr[0]));
		arraytoinsert.push(parseInt(arr[1]));
		arraytoinsert.push(parseInt(arr[2]));
		alasql(
				'INSERT INTO future(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arraytoinsert);

	}

	document.getElementById("container").innerHTML = '';
	$("div#container").append(ftable2);
	var rows3 = document.getElementById("ftable2").rows;
	for (var i = 1; i < rows3.length; i++) {
		var tds = rows3[i].cells;
		var busokuornot = tds[5].innerText;
		var arraytoinsert = [];
		var iddd = 0;
		if (alasql('select * from future') === null
				|| alasql('select * from future').length === 0) {
			iddd = 1;
		} else
			iddd = alasql('SELECT MAX(id) + 1 as id FROM future')[0].id;
		arraytoinsert.push(iddd);
		var a = parseInt(tds[2].id.split(",")[1]);
		var b = parseInt(tds[2].id.split(",")[2]);
		var barcode = a + ',' + b;
		var c = whitmapreverse.get(a + ',' + b);
		if (busokuornot === "不足") {
			if (!nearray.includes(c))
				nearray.push(c);
		}
		arraytoinsert.push(c);
		arraytoinsert.push(tds[3].innerHTML);
		arraytoinsert.push(parseInt(tds[2].innerHTML) * (-1));
		var y = 0;
		var iroiroarr = allcsvmap2.get(c);
		for (var j = 0; j < iroiroarr.length; j++) {
			if (tds[4].innerHTML === iroiroarr[j].memo
					&& parseInt(tds[2].innerHTML) === Math
							.abs(parseInt(iroiroarr[j].quant))
					&& tds[3].innerHTML === iroiroarr[j].date) {
				y = iroiroarr[j].balance;
				break;
			}
		}
		console.log(y);

		arraytoinsert.push(y);
		arraytoinsert.push(tds[4].innerHTML);
		var arr = tds[3].innerHTML.split("-");
		arraytoinsert.push(parseInt(arr[0]));
		arraytoinsert.push(parseInt(arr[1]));
		arraytoinsert.push(parseInt(arr[2]));
		alasql(
				'INSERT INTO future(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arraytoinsert);

	}
	console.log(alasql('select * from future'));
	document.getElementById("pushobjxx").innerHTML = '';
	document.getElementById("pushobj1").innerHTML = '';
	document.getElementById("pushobjx").innerHTML = '';
	document.getElementById("pushobj2").innerHTML = '';
	document.getElementById("pushobj3").innerHTML = '';
	if (document.getElementById("rightpanel") != null) {

		document.getElementById("rightpanel").parentNode.removeChild(document
				.getElementById("rightpanel"));
	}
	document.getElementById("pushobj2").innerHTML = '<p>出庫緊急記入は完成しました。</p>';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
		                                                onclick = "openpage()">在庫一覧参考</button></div><br>';
	
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
        onclick = "tnorosi()">棚卸</button></div><br>';
	if (flag === true) {
		document.getElementById("pushobj2").innerHTML += '<div><p>本日に出庫した商品があります。出庫チェックを行ってください。</p><button class="btn btn-primary btn-round"\
            onclick = "syukkocheck()">出庫チェックへ</button></div>';
	}

	var netable = $('<table class="table-condensed table-striped table-bordered table-hover"></table>');
	var netbody = $('<tbody></tbody>');
	var netr = $('<tr></tr>');
	netr.append('<th>item</th>');
	netr.append('<th>warehouse</th>');
	netr.append('<th>date</th>');
	netr.append('<th>quantity</th>');
	netr.append('<th>balance</th>');
	netr.append('<th>memo</th>');
	netr.appendTo(netbody);
	netbody.appendTo(netable);
	console.log(nearray);
	for (var i = 0; i < nearray.length; i++) {
		var nevalue = allcsvmap2.get(nearray[i]);
		for (var j = 0; j < nevalue.length; j++) {
			if (nevalue[j].balance < 0) {

				var tdtr = $('<tr></tr>');
				tdtr.append('<td>' + finalmap.get(nearray[i]).detail + '</td>');
				tdtr.append('<td>' + finalmap.get(nearray[i]).whouse + '</td>');
				tdtr.append('<td>' + nevalue[j].date + '</td>');
				tdtr.append('<td>' + nevalue[j].quant + '</td>');
				tdtr.append('<td>' + nevalue[j].balance + '</td>');
				tdtr.append('<td>' + nevalue[j].memo + '</td>');
				tdtr.appendTo(netbody);
			}

		}
	}

	if (nearray.length >= 1) {
		document.getElementById("pushobj2").innerHTML += '<hr><p style="color:red"><strong>異常出庫テーブル：こちらの商品は将来在庫不足になるので、各担当倉庫に連絡を取ってください。</strong></p>';
		$("#pushobj2").append(netable);
		document.getElementById("pushobj2").innerHTML += '<hr><p>連絡方法：</p><br>';
		document.getElementById("pushobj2").innerHTML += '<div>東京１：03-1234-5678<br>東京２：03-5432-9876<br>大阪：03-1212-3434<br>福岡：03-6543-5645</div>';
	}

	pastmap2 = new Map(), nowmap2 = new Map(), futuremap2 = new Map();
	arrayforkinyuu2 = [];
	allcsvmap2 = new Map();
	counttekinyuu2 = 0;
	ptable2 = $('<table class="table-striped table-condensed" id="ptable2" style="width:100%;"></table>');
	 ptbody2 = $('<tbody id="ptbody2"></tbody>');
	 ntable2 = $('<table class="table-striped table-condensed" id="ntable2" style="width:100%;"></table>');
	 ntbody2 = $('<tbody id="ntbody2"></tbody>');
	 ftable2 = $('<table class="table-striped table-condensed" id="ftable2" style="width:100%;"></table>');
	 ftbody2 = $('<tbody id="ftbody2"></tbody>');

	ptbody2.appendTo(ptable2);
	// pasttable.appendTo(pastdiv);
	ntbody2.appendTo(ntable2);
	// ntable.appendTo(nowdiv);
	ftbody2.appendTo(ftable2);
	// ftable.appendTo(futurediv);

	 trp2 = $('<tr></tr>');
	 trn2 = $('<tr></tr>');
	 trf2 = $('<tr></tr>');
	trp2.append('<th>アイテム</th>');
	trn2.append('<th>アイテム</th>');
	trf2.append('<th>アイテム</th>');
	trp2.append('<th>倉庫元</th>');
	trn2.append('<th>倉庫元</th>');
	trf2.append('<th>倉庫元</th>');
	trp2.append('<th>数量</th>');
	trn2.append('<th>数量</th>');
	trf2.append('<th>数量</th>');
	trp2.append('<th>出庫日</th>');
	trn2.append('<th>出庫日</th>');
	trf2.append('<th>出庫予定日</th>');
	trp2.append('<th>備考</th>');
	trn2.append('<th>備考</th>');
	trf2.append('<th>備考</th>');
	trn2.append('<th>異常</th>');
	trf2.append('<th>異常</th>');
	trp2.append('<th>キャンセル</th>');
	trn2.append('<th>キャンセル</th>');
	trf2.append('<th>キャンセル</th>');
	trp2.append('<th>変更</th>');
	trn2.append('<th>変更</th>');
	trf2.append('<th>変更</th>');
	trp2.appendTo(ptbody2);
	trn2.appendTo(ntbody2);
	trf2.appendTo(ftbody2);
}
/*******************************************************************************
 * HELPER FUNCTIONS
 * 
 * 
 ******************************************************************************/

function compare(a, b) {
	var aa = a.date;
	var bb = b.date;
	var tmpa = "", tmpb = "";
	for (var i = 0; i < aa.length; i++) {
		if (aa.charAt(i) != '-')
			tmpa += aa.charAt(i);
	}
	for (var i = 0; i < bb.length; i++) {
		if (bb.charAt(i) != '-')
			tmpb += bb.charAt(i);
	}

	return parseInt(tmpa) - parseInt(tmpb);
}

function update_allcsvmap(sb1, sb2, oldqua, oldmemo, olddate, newdate,
		newdelta, newmemo) {
	var barcode = sb1 + ',' + sb2;
	var thisstockid = whitmapreverse.get(barcode);
	console.log(thisstockid);
	var arraytochange = allcsvmap.get(thisstockid);
	console.log(arraytochange);
	var originalstock = finalmap.get(thisstockid).stock;
	console.log(originalstock);
	for (var i = 0; i < arraytochange.length; i++) {
		if (Math.abs(arraytochange[i].quant) === oldqua
				&& arraytochange[i].memo === oldmemo
				&& arraytochange[i].date === olddate) {
			arraytochange.splice(i, 1);
			break;
		}
	}

	console.log(arraytochange);

	var obj = {
		balance : 0,
		date : newdate,
		memo : newmemo,
		quant : newdelta * (-1)
	};
	arraytochange.push(obj);
	// s删除，insert,重新排序，再计算

	arraytochange.sort(compare);

	for (var i = 0; i < arraytochange.length; i++) {
		if (i === 0)
			arraytochange[i].balance = originalstock + arraytochange[i].quant;
		else {
			arraytochange[i].balance = arraytochange[i - 1].balance
					+ arraytochange[i].quant;
		}
		console.log(arraytochange[i].balance);
	}

	console.log(arraytochange);
	console.log(allcsvmap);

	// check if there is sth already minus 0 in nowtable and futuretable
	var nowrows = document.getElementById("nowtable").rows;
	for (var i = 1; i < nowrows.length; i++) {
		var nowtr = nowrows[i];
		var tds = nowtr.cells;
		var nowtridarray = nowtr.id.split(",");
		var bianhuanquanjiatong = nowtr.id.substring(3);
		var thatstockid = whitmapreverse.get(nowtridarray[1] + ','
				+ nowtridarray[2]);
		var arraytochacha = allcsvmap.get(thatstockid);
		for (var j = 0; j < arraytochacha.length; j++) {
			if (Math.abs(arraytochacha[j].quant) === parseInt(tds[2].innerHTML)
					&& arraytochacha[j].memo === tds[4].innerHTML) {
				if (arraytochacha[j].balance < 0) {
					tds[5].innerHTML = '<td><button id="UNS,'
							+ bianhuanquanjiatong
							+ '" class="btn btn-xs btn-warning" data-html="true" onclick="shownoenough(this)" data-toggle="popover" title="取引明細">不足</button></td>';
				} else
					tds[5].innerHTML = '';
			}
		}
	}

	// ------------------------------------------------------------------------
	var futurerows = document.getElementById("futuretable").rows;
	for (var i = 1; i < futurerows.length; i++) {
		var futuretr = futurerows[i];
		var tds = futuretr.cells;
		var ftridarray = futuretr.id.split(",");
		var bianhuanquanjiatong = futuretr.id.substring(3);
		console.log(tds[5].innerHTML);
		console.log(bianhuanquanjiatong);
		var thatstockid = whitmapreverse.get(ftridarray[1] + ','
				+ ftridarray[2]);
		var arraytochacha = allcsvmap.get(thatstockid);
		for (var j = 0; j < arraytochacha.length; j++) {
			if (Math.abs(arraytochacha[j].quant) === parseInt(tds[2].innerHTML)
					&& arraytochacha[j].memo === tds[4].innerHTML) {
				if (arraytochacha[j].balance < 0) {
					tds[5].innerHTML = '<td><button id="UNS,'
							+ bianhuanquanjiatong
							+ '" class="btn btn-xs btn-warning" data-html="true" onclick="shownoenough(this)" data-toggle="popover" title="取引明細">不足</button></td>';
				} else
					tds[5].innerHTML = '';
			}
		}

	}

}

// realupdate_allcsvmap2(sb1, sb2, oldqua_1, oldmemo_1, olddate_1,
// newdate, newdelta, newmemo);
function realupdate_allcsvmap2(sb1, sb2, oldqua_1, oldmemo_1, olddate_1,
		newdate, newdelta, newmemo) {
	var barcode = sb1 + ',' + sb2;
	console.log(newdelta + 1000);
	console.log(olddate_1 + ',' + oldmemo_1 + ',' + oldqua_1);
	var thisstockid = whitmapreverse.get(barcode);
	console.log(thisstockid);
	var arraytochange = allcsvmap2.get(thisstockid);
	// console.log(arraytochange);
	var originalstock = finalmap.get(thisstockid).stock;
	console.log(originalstock);
	for (var i = 0; i < arraytochange.length; i++) {
		console.log(arraytochange[i]);
		if (Math.abs(arraytochange[i].quant) === oldqua_1
				&& arraytochange[i].memo === oldmemo_1
				&& arraytochange[i].date === olddate_1) {
			arraytochange.splice(i, 1);
			break;
		}
	}
	var obj = {
		balance : 0,
		date : newdate,
		memo : newmemo,
		quant : newdelta * (-1)
	};
	arraytochange.push(obj);
	// s删除，insert,重新排序，再计算

	arraytochange.sort(compare);
	console.log(arraytochange);
	for (var i = 0; i < arraytochange.length; i++) {
		if (i === 0)
			arraytochange[i].balance = originalstock + arraytochange[i].quant;
		else {
			arraytochange[i].balance = arraytochange[i - 1].balance
					+ arraytochange[i].quant;
		}
		console.log(arraytochange[i].balance);
	}

	if (document.getElementById("ntable2") != null) {
		var nowrows = document.getElementById("ntable2").rows;
		for (var i = 1; i < nowrows.length; i++) {
			var nowtr = nowrows[i];
			console.log("haha");
			var tds = nowtr.cells;
			var nowtridarray = nowtr.id.split(",");
			var bianhuanquanjiatong = nowtr.id.substring(7);
			var thatstockid = whitmapreverse.get(nowtridarray[1] + ','
					+ nowtridarray[2]);
			if (dizstockid = thatstockid) {
				var arraytochacha = allcsvmap2.get(thatstockid);
				for (var j = 0; j < arraytochacha.length; j++) {
					if (Math.abs(arraytochacha[j].quant) === parseInt(tds[2].innerHTML)
							&& arraytochacha[j].memo === tds[4].innerHTML
							&& arraytochacha[j].date === tds[3].innerHTML) {
						if (arraytochacha[j].balance < 0) {
							tds[5].innerHTML = '<td><button id="UNS,'
									+ bianhuanquanjiatong
									+ '" class="btn btn-xs btn-warning" data-html="true" onclick="shownoenough2(this)" data-toggle="popover" title="取引明細">不足</button></td>';
						} else
							tds[5].innerHTML = '';
					}
				}

			}
		}
	}
	if (document.getElementById("ftable2") != null) {
		var futurerows = document.getElementById("ftable2").rows;
		for (var i = 1; i < futurerows.length; i++) {
			var futuretr = futurerows[i];
			var tds = futuretr.cells;
			var ftridarray = futuretr.id.split(",");
			var bianhuanquanjiatong = futuretr.id.substring(7);
			console.log(tds[5].innerHTML);
			console.log(bianhuanquanjiatong);
			var thatstockid = whitmapreverse.get(ftridarray[1] + ','
					+ ftridarray[2]);
			if (dizstockid = thatstockid) {
				var arraytochacha = allcsvmap2.get(thatstockid);
				for (var j = 0; j < arraytochacha.length; j++) {
					if (Math.abs(arraytochacha[j].quant) === parseInt(tds[2].innerHTML)
							&& arraytochacha[j].memo === tds[4].innerHTML
							&& arraytochacha[j].date === tds[3].innerHTML) {
						if (arraytochacha[j].balance < 0) {
							tds[5].innerHTML = '<td><button id="UNS,'
									+ bianhuanquanjiatong
									+ '" class="btn btn-xs btn-warning" data-html="true" onclick="shownoenough2(this)" data-toggle="popover" title="取引明細">不足</button></td>';
						} else
							tds[5].innerHTML = '';
					}
				}
			}
		}
	}
}

// double click to start busoku

function shownoenough(b) {
	console.log("haha");
	var bestid = $(b).attr("id");
	var bestidarray = $(b).attr("id").split(",");
	var bcode = bestidarray[1] + ',' + bestidarray[2];
	var thstockid = whitmapreverse.get(bcode);
	console.log(thstockid);
	var transarr = allcsvmap.get(thstockid);
	var tratable = $('<table class="table-condensed table-striped table-bordered table-hover"></table>'), trabody = $('<tbody></tbody>');
	trabody.appendTo(tratable);
	var tr = $('<tr></tr>');
	tr.append('<th>日付</th>');
	tr.append('<th>出庫量</th>');
	tr.append('<th>残量</th>');
	tr.append('<th>メモ</th>');
	tr.appendTo(trabody);
	for (var i = 0; i < transarr.length; i++) {
		var trele = $('<tr></tr>');
		var single = transarr[i];
		if (single.balance >= 0) {
			trele.append('<td>' + single.date + '</td>');
			trele.append('<td>' + single.quant + '</td>');
			trele.append('<td>' + single.balance + '</td>');
			trele.append('<td>' + single.memo + '</td>');
			trele.appendTo(trabody);
		} else {
			trele.append('<td style="color:red;font-weight:bold">'
					+ single.date + '</td>');
			trele.append('<td style="color:red;font-weight:bold">'
					+ single.quant + '</td>');
			trele.append('<td style="color:red;font-weight:bold">'
					+ single.balance + '</td>');
			trele.append('<td style="color:red;font-weight:bold">'
					+ single.memo + '</td>');
			trele.appendTo(trabody);
		}

	}
	var content = tratable;
	console.log(content);
	$(b).popover({
		content : content
	});
}

function bidaxiao(aa, bb) {
	var tmpa = "", tmpb = "";
	for (var i = 0; i < aa.length; i++) {
		if (aa.charAt(i) != '-')
			tmpa += aa.charAt(i);
	}
	for (var i = 0; i < bb.length; i++) {
		if (bb.charAt(i) != '-')
			tmpb += bb.charAt(i);
	}

	return parseInt(tmpa) - parseInt(tmpb);
}

function update_allcsvmap2(dizstockid, shuliang, riqi, biji) {
	console.log(document.getElementById("ntable"));
	var originalstockkk = finalmap.get(dizstockid).stock;
	var object = {
		balance : originalstockkk - shuliang,
		date : riqi,
		memo : biji,
		quant : shuliang * (-1)
	};
	if (!allcsvmap2.has(dizstockid)) {
		var aaaarr = [];
		aaaarr.push(object);
		allcsvmap2.set(dizstockid, aaaarr);
	} else {
		var the_array = allcsvmap2.get(dizstockid);
		the_array.push(object);
		the_array.sort(compare);
		for (var i = 0; i < the_array.length; i++) {
			var obj = the_array[i];
			if (i === 0)
				obj.balance = originalstockkk + obj.quant;
			else
				obj.balance = the_array[i - 1].balance + obj.quant;
		}
	}
	console.log(allcsvmap2);

	if (document.getElementById("ntable2") != null) {
		var nowrows = document.getElementById("ntable2").rows;
		for (var i = 1; i < nowrows.length; i++) {
			var nowtr = nowrows[i];
			console.log("haha");
			var tds = nowtr.cells;
			var nowtridarray = nowtr.id.split(",");
			var bianhuanquanjiatong = nowtr.id.substring(7);
			var thatstockid = whitmapreverse.get(nowtridarray[1] + ','
					+ nowtridarray[2]);
			if (dizstockid = thatstockid) {
				var arraytochacha = allcsvmap2.get(thatstockid);
				for (var j = 0; j < arraytochacha.length; j++) {
					if (Math.abs(arraytochacha[j].quant) === parseInt(tds[2].innerHTML)
							&& arraytochacha[j].memo === tds[4].innerHTML
							&& arraytochacha[j].date === tds[3].innerHTML) {
						if (arraytochacha[j].balance < 0) {
							tds[5].innerHTML = '<td><button id="UNS,'
									+ bianhuanquanjiatong
									+ '" class="btn btn-xs btn-warning" data-html="true" onclick="shownoenough2(this)" data-toggle="popover" title="取引明細">不足</button></td>';
						} else
							tds[5].innerHTML = '';
					}
				}

			}
		}
	}
	if (document.getElementById("ftable2") != null) {
		var futurerows = document.getElementById("ftable2").rows;
		for (var i = 1; i < futurerows.length; i++) {
			var futuretr = futurerows[i];
			var tds = futuretr.cells;
			var ftridarray = futuretr.id.split(",");
			var bianhuanquanjiatong = futuretr.id.substring(7);
			console.log(tds[5].innerHTML);
			console.log(bianhuanquanjiatong);
			var thatstockid = whitmapreverse.get(ftridarray[1] + ','
					+ ftridarray[2]);
			if (dizstockid = thatstockid) {
				var arraytochacha = allcsvmap2.get(thatstockid);
				for (var j = 0; j < arraytochacha.length; j++) {
					if (Math.abs(arraytochacha[j].quant) === parseInt(tds[2].innerHTML)
							&& arraytochacha[j].memo === tds[4].innerHTML
							&& arraytochacha[j].date === tds[3].innerHTML) {
						if (arraytochacha[j].balance < 0) {
							tds[5].innerHTML = '<td><button id="UNS,'
									+ bianhuanquanjiatong
									+ '" class="btn btn-xs btn-warning" data-html="true" onclick="shownoenough2(this)" data-toggle="popover" title="取引明細">不足</button></td>';
						} else
							tds[5].innerHTML = '';
					}
				}
			}
		}
	}
}

function shownoenough2(b) {
	var bestid = $(b).attr("id");
	var bestidarray = $(b).attr("id").split(",");
	console.log(bestidarray);
	var bcode = bestidarray[1] + ',' + bestidarray[2];
	var thstockid = whitmapreverse.get(bcode);
	console.log(thstockid);
	var transarr = allcsvmap2.get(thstockid);
	var tratable = $('<table class="table-condensed table-striped table-bordered table-hover"></table>'), trabody = $('<tbody></tbody>');
	trabody.appendTo(tratable);
	var tr = $('<tr></tr>');
	tr.append('<th>日付</th>');
	tr.append('<th>出庫量</th>');
	tr.append('<th>残量</th>');
	tr.append('<th>メモ</th>');
	tr.appendTo(trabody);
	for (var i = 0; i < transarr.length; i++) {
		var trele = $('<tr></tr>');
		var single = transarr[i];
		if (single.balance >= 0) {
			trele.append('<td>' + single.date + '</td>');
			trele.append('<td>' + single.quant + '</td>');
			trele.append('<td>' + single.balance + '</td>');
			trele.append('<td>' + single.memo + '</td>');
			trele.appendTo(trabody);
		} else {
			trele.append('<td style="color:red;font-weight:bold">'
					+ single.date + '</td>');
			trele.append('<td style="color:red;font-weight:bold">'
					+ single.quant + '</td>');
			trele.append('<td style="color:red;font-weight:bold">'
					+ single.balance + '</td>');
			trele.append('<td style="color:red;font-weight:bold">'
					+ single.memo + '</td>');
			trele.appendTo(trabody);
		}

	}
	var content = tratable;
	console.log(content);
	$(b).popover({
		content : content
	});
}

function delete_allcsvmap2(datstockid, tds2, tds3, tds4, kyou) {
	// num, date, memo
	var array_d_a2 = allcsvmap2.get(datstockid);
	var oda2 = finalmap.get(datstockid).stock;
	for (var i = 0; i < array_d_a2.length; i++) {
		var qb = array_d_a2[i];
		if (Math.abs(qb.quant) === tds2 && tds3 === qb.date && tds4 === qb.memo) {
			array_d_a2.splice(i, 1);
			break;
		}
	}
	array_d_a2.sort(compare);
	for (var i = 0; i < array_d_a2.length; i++) {
		var qb = array_d_a2[i];
		if (i === 0)
			qb.balance = oda2 + qb.quant;
		else
			qb.balance = array_d_a2[i - 1] + qb.quant;
	}

	if (document.getElementById("ntable2") != null) {
		var nowrows = document.getElementById("ntable2").rows;
		for (var i = 1; i < nowrows.length; i++) {
			var nowtr = nowrows[i];
			console.log("haha");
			var tds = nowtr.cells;
			var nowtridarray = nowtr.id.split(",");
			var bianhuanquanjiatong = nowtr.id.substring(7);
			var thatstockid = whitmapreverse.get(nowtridarray[1] + ','
					+ nowtridarray[2]);
			if (dizstockid = thatstockid) {
				var arraytochacha = allcsvmap2.get(thatstockid);
				for (var j = 0; j < arraytochacha.length; j++) {
					if (Math.abs(arraytochacha[j].quant) === parseInt(tds[2].innerHTML)
							&& arraytochacha[j].memo === tds[4].innerHTML
							&& arraytochacha[j].date === tds[3].innerHTML) {
						if (arraytochacha[j].balance < 0) {
							tds[5].innerHTML = '<td><button id="UNS,'
									+ bianhuanquanjiatong
									+ '" class="btn btn-xs btn-warning" data-html="true" onclick="shownoenough2(this)" data-toggle="popover" title="取引明細">不足</button></td>';
						} else
							tds[5].innerHTML = '';
					}
				}

			}
		}
	} else if (futurerows = document.getElementById("ftable2") != null) {
		var futurerows = document.getElementById("ftable2").rows;
		for (var i = 1; i < futurerows.length; i++) {
			var futuretr = futurerows[i];
			var tds = futuretr.cells;
			var ftridarray = futuretr.id.split(",");
			var bianhuanquanjiatong = futuretr.id.substring(7);
			console.log(tds[5].innerHTML);
			console.log(bianhuanquanjiatong);
			var thatstockid = whitmapreverse.get(ftridarray[1] + ','
					+ ftridarray[2]);
			if (dizstockid = thatstockid) {
				var arraytochacha = allcsvmap2.get(thatstockid);
				for (var j = 0; j < arraytochacha.length; j++) {
					if (Math.abs(arraytochacha[j].quant) === parseInt(tds[2].innerHTML)
							&& arraytochacha[j].memo === tds[4].innerHTML
							&& arraytochacha[j].date === tds[3].innerHTML) {
						if (arraytochacha[j].balance < 0) {
							tds[5].innerHTML = '<td><button id="UNS,'
									+ bianhuanquanjiatong
									+ '" class="btn btn-xs btn-warning" data-html="true" onclick="shownoenough2(this)" data-toggle="popover" title="取引明細">不足</button></td>';
						} else
							tds[5].innerHTML = '';
					}
				}
			}
		}
	}

}

function clearall() {
	maincontent.innerHTML = "";
	subcontent.innerHTML = "";
	document.getElementById("pushobjxx").innerHTML = '';
	document.getElementById("pushobjx").innerHTML = '';
	document.getElementById("pushobj1").innerHTML = '';
	document.getElementById("pushobj2").innerHTML = '';
	document.getElementById("pushobj3").innerHTML = '';
	if (document.getElementById("rightpanel") != null) {

		document.getElementById("rightpanel").parentNode.removeChild(document
				.getElementById("rightpanel"));
	}
}

function refreshsecondpart() {
	countsyukkocheck = 0;
	countsansyoucheck = 0;
	countkinyuucheck === 0
}
// ************************************************************************************************************************//
// ************************************************************************************************************************//
// ******************PART 2 DEAD
// DATAS*************************************************************************************//
function refreshfirstpart() {
	countmoneychange = 0;
	countnumchange = 0;
	countsoukochange = 0;
	savenumberclicked = 0;
	savesoukoclicked = 0;
	counttekinyuu = 0;
	counttekinyuu2 = 0;
	countjidoukinyuu = 0;
	countjidoukinyuu2 = 0;
	refresh();

}

function kinyuucheck() {

	refreshfirstpart();
	countsyukkocheck = 0;
	countsansyoucheck = 0;
	countkinyuucheck = 0;
	if (countkinyuucheck === 0) {
		maincontent.innerHTML = "";
		subcontent.innerHTML = "";
		document.getElementById("pushobjxx").innerHTML = '';
		document.getElementById("pushobjx").innerHTML = '';
		document.getElementById("pushobj1").innerHTML = '';
		document.getElementById("pushobj2").innerHTML = '';
		document.getElementById("pushobj3").innerHTML = '';
		if (document.getElementById("rightpanel") != null) {

			document.getElementById("rightpanel").parentNode
					.removeChild(document.getElementById("rightpanel"));
		}

		var array1 = [], array2 = [], array3 = [];
		// array1 for green , array2 for book no sent, array3 for sent no book
		var todaya = [], jisaia = [];
		var todaybook = alasql(
				'select * from　future where year=? and month=? and day=? and qty>0',
				[ ye, mo, day ]);
		var jisaiarray = alasql(
				'select * from jisai where year=? and month=? and day=? and qty>0',
				[ ye, mo, day ]);

		console.log(todaybook);
		console.log(jisaiarray);
		// id,stock,date,qty,balance,memo,year,month,day
		for (var i = 0; i < todaybook.length; i++) {
			var ele = todaybook[i];
			if (!ele.stock)
				ele = ele.future;
			var tmpstr = ele.stock + ',' + Math.abs(ele.qty) + ',' + ele.memo;
			todaya.push(tmpstr);
		}
		for (var i = 0; i < jisaiarray.length; i++) {
			var ele = jisaiarray[i];
			if (!ele.stock)
				ele = ele.jisai;
			var tmpstr = ele.stock + ',' + Math.abs(ele.qty) + ',' + ele.memo;
			jisaia.push(tmpstr);
		}

		console.log(todaya);
		console.log(jisaia);

		for (var i = 0; i < todaya.length; i++) {
			var eleto = todaya[i];
			var flag = false;
			for (var j = 0; j < jisaia.length; j++) {
				var eleji = jisaia[j];
				if (eleto === eleji) {
					array1.push(eleto);
					// todaya.splice(i,1);
					jisaia.splice(j, 1);
					flag = true;
					break;
				}
			}
			if (flag === false) {
				array2.push(eleto);
			}
		}

		for (var i = 0; i < jisaia.length; i++) {
			array3.push(jisaia[i]);
		}

		console.log(array1);
		console.log(array2);
		console.log(array3);

		var checklicate = [];

		for (var i = 0; i < array2.length; i++) {
			var ele = array2[i];
			var elearray = ele.split(",");
			var tstockid = parseInt(elearray[0]), quanta = parseInt(elearray[1]), mama = elearray[2];
			var howmuch = 0;
			if (checklicate.includes(tstockid))
				continue;
			else {
				checklicate.push(tstockid);
				for (var j = 0; j < array1.length; j++) {
					if (parseInt(array1[j].split(",")[0]) === tstockid) {
						howmuch += parseInt(array1[j].split(",")[1]);
					}
				}
				for (var j = 0; j < array3.length; j++) {
					if (parseInt(array3[j].split(",")[0]) === tstockid) {
						howmuch += parseInt(array3[j].split(",")[1]);
					}
				}

				if (!allcsvmap3.has(tstockid)) {
					var arrayx = [];
					var balace = 0;
					if (finalmap.get(tstockid) != null) balace = finalmap.get(tstockid).stock;
					var obj = {
						balance : balace + howmuch,
						date : todaystring,
						memo : "今日の実際入庫状況まとめ",
						quant : howmuch
					};
					arrayx.push(obj);
					var anothersky = alasql(
							'select * from future where stock=? and date>?', [
									tstockid, todaystring ]);
					console.log(anothersky);
					for (var w = 0; w < anothersky.length; w++) {
						var ccc = anothersky[w];
						if (!ccc.stock)
							ccc = ccc.future;
						var obj2 = {
							balance : 0,
							date : ccc.date,
							memo : ccc.memo,
							quant : ccc.qty
						};
						console.log(obj2);
						arrayx.push(obj2);
					}
					allcsvmap3.set(tstockid, arrayx);
				}
			}
		}

		var fm = allcsvmap3.keys();
		while (true) {
			var key = fm.next().value;
			if (key != null) {
				var value = allcsvmap3.get(key);
				value.sort(compare);
				// calculate
				for (var v = 0; v < value.length; v++) {
					if (v != 0) {
						value[v].balance = value[v - 1].balance
								+ value[v].quant;
					}
				}
			} else
				break;
		}
		console.log(allcsvmap3);
		// allcsvmap3 contains data of trans from today(calculated) to future;
		// allcsvmap3 only contains those that are in the red table

		var greentable = $('<table id="greentable" class="table-condensed table-striped table-bordered table-hover"></table>');
		var greenbody = $('<tbody id="greenbody"></tbody>');
		var yellowtable = $('<table id="yellowtable" class="table-condensed table-striped table-bordered table-hover"></table>');
		var yellowbody = $('<tbody id="yellowbody"></tbody>');
		var redtable = $('<table id="redtable" class="table-condensed table-striped table-bordered table-hover"></table>');
		var redbody = $('<tbody id="redbody"></tbody>');
		var greentr = $('<tr></tr>');
		var yellowtr = $('<tr></tr>');
		var redtr = $('<tr></tr>');
		greentr.append('<th>item</th>');
		greentr.append('<th>whouse</th>');
		greentr.append('<th>quantity</th>');
		greentr.append('<th>memo</th>');
		yellowtr.append('<th>item</th>');
		yellowtr.append('<th>whouse</th>');
		yellowtr.append('<th>quantity</th>');
		yellowtr.append('<th>memo</th>');
		redtr.append('<th>item</th>');
		redtr.append('<th>whouse</th>');
		redtr.append('<th>quantity</th>');
		redtr.append('<th>memo</th>');
		redtr.append('<th>異常</th>');
		greentr.appendTo(greenbody);
		greenbody.appendTo(greentable);
		yellowtr.appendTo(yellowbody);
		yellowbody.appendTo(yellowtable);
		redtr.appendTo(redbody);
		redbody.appendTo(redtable);
		for (var i = 0; i < array1.length; i++) {
			var trgreen = $('<tr></tr>');
			var ele = array1[i];
			var elearray = ele.split(",");
			var barcode = whitmap.get(parseInt(elearray[0]));
			trgreen.append('<td style="color:green;">' + itmap.get(barcode[0])
					+ '</td>');
			trgreen.append('<td style="color:green;">'
					+ whouseMap.get(parseInt(barcode[1]) - 1) + '</td>');
			trgreen.append('<td style="color:green;">' + elearray[1] + '</td>');
			trgreen.append('<td style="color:green;">' + elearray[2] + '</td>');
			trgreen.appendTo(greenbody);
		}

		for (var i = 0; i < array2.length; i++) {
			var trgreen = $('<tr></tr>');
			var ele = array2[i];
			var elearray = ele.split(",");
			console.log(elearray);
			var barcode = whitmap.get(parseInt(elearray[0]));
			var tstockid = parseInt(elearray[0]), quanta = parseInt(elearray[1]), mama = elearray[2];
			trgreen.append('<td style="color:red;">' + itmap.get(barcode[0])
					+ '</td>');
			trgreen.append('<td style="color:red;">'
					+ whouseMap.get(parseInt(barcode[1]) - 1) + '</td>');
			trgreen.append('<td style="color:red;">' + elearray[1] + '</td>');
			trgreen.append('<td style="color:red;">' + elearray[2] + '</td>');
			var arraytocheck_here = allcsvmap3.get(tstockid);
			for (var j = 0; j < arraytocheck_here.length; j++) {
				var diu = arraytocheck_here[j];
				if (diu.balance < 0) {
					trgreen
							.append('<td><button id="'
									+ tstockid
									+ '" class="btn btn-xs btn-warning" data-html="true" onclick="sne(this)"\
							data-toggle="popover" title="取引明細">緊急</button></td>');

				}
			}

			trgreen.appendTo(redbody);
		}

		for (var i = 0; i < array3.length; i++) {
			var trgreen = $('<tr></tr>');
			var ele = array3[i];
			var elearray = ele.split(",");
			var barcode = whitmap.get(parseInt(elearray[0]));
			trgreen.append('<td style="color:orange;">'
					+ itmap.get(parseInt(barcode[0])) + '</td>');
			trgreen.append('<td style="color:orange;">'
					+ whouseMap.get(parseInt(barcode[1]) - 1) + '</td>');
			trgreen
					.append('<td style="color:orange;">' + elearray[1]
							+ '</td>');
			trgreen
					.append('<td style="color:orange;">' + elearray[2]
							+ '</td>');
			trgreen.appendTo(yellowbody);
		}
		document.getElementById("pushobj1").innerHTML += '<br><h3>予定通り商品表</h3>';
		$("#pushobj1").append(greentable);
		document.getElementById("pushobj1").innerHTML += '<br><hr><br><h3>予定したが実際届いてない商品表</h3>';
		$("#pushobj1").append(redtable);
		document.getElementById("pushobj1").innerHTML += '<br><hr><br><h3>予定してなかったがが実際届いた商品表</h3>';
		$("#pushobj1").append(yellowtable);
		document.getElementById("pushobjx").innerHTML += '<br><button class="btn btn-round btn-info btn-large"\
			 onclick="deadcheck1()">確定＆修正</button>';
	}
	countkinyuucheck++;
}

function sne(b) {
	var tstockid = parseInt($(b).attr("id"));
	var transarr = allcsvmap3.get(tstockid);
	var tratable = $('<table class="table-condensed table-striped table-bordered table-hover"></table>'), trabody = $('<tbody></tbody>');
	trabody.appendTo(tratable);
	var tr = $('<tr></tr>');
	tr.append('<th>日付</th>');
	tr.append('<th>入庫量</th>');
	tr.append('<th>残量</th>');
	tr.append('<th>メモ</th>');
	tr.appendTo(trabody);
	for (var i = 0; i < transarr.length; i++) {
		if (i === 0) {
			var trele = $('<tr></tr>');
			var single = transarr[i];
			trele.append('<td>' + single.date + '</td>');
			trele.append('<td>' + single.quant + '</td>');
			trele.append('<td>' + single.balance + '</td>');
			trele.append('<td>' + single.memo + '</td>');
			trele.appendTo(trabody);
			var trele2 = $('<tr></tr>');
			trele2.append('<td style="color:green;"><strong>未来予定<strong></td>');
			trele2.append('<td></td>');
			trele2.append('<td></td>');
			trele2.append('<td></td>');
			trele2.appendTo(trabody);

		} else {
			var trele = $('<tr></tr>');
			var single = transarr[i];
			if (single.balance >= 0) {
				trele.append('<td>' + single.date + '</td>');
				trele.append('<td>' + single.quant + '</td>');
				trele.append('<td>' + single.balance + '</td>');
				trele.append('<td>' + single.memo + '</td>');
				trele.appendTo(trabody);
			} else {
				trele.append('<td style="color:red;font-weight:bold">'
						+ single.date + '</td>');
				trele.append('<td style="color:red;font-weight:bold">'
						+ single.quant + '</td>');
				trele.append('<td style="color:red;font-weight:bold">'
						+ single.balance + '</td>');
				trele.append('<td style="color:red;font-weight:bold">'
						+ single.memo + '</td>');
				trele.appendTo(trabody);
			}

		}
	}
	var content = tratable;
	$(b).popover({
		content : content,
		container : 'body'
	});
}

function deadcheck1() {
	allcsvmap4 = new Map();
	var greenrows = document.getElementById("greentable").rows;
	for (var i = 1; i < greenrows.length; i++) {
		var gr = greenrows[i].cells;
		console.log(gr);
		var itemid = itemmap.get(gr[0].innerHTML);
		var wid = whouseMapRev.get(gr[1].innerHTML) + 1;
		var tsid = whitmapreverse.get(itemid + ',' + wid);
		if (!allcsvmap4.has(tsid)) {
			var ati = [];
			var object3 = {
				balance : 0,
				date : todaystring,
				memo : gr[3].innerHTML,
				quant : parseInt(gr[2].innerHTML)
			};
			ati.push(object3);
			allcsvmap4.set(tsid, ati);
		} else {
			var object3 = {
				balance : 0,
				date : todaystring,
				memo : gr[3].innerHTML,
				quant : parseInt(gr[2].innerHTML)
			};
			allcsvmap4.get(tsid).push(object3);
		}
	}
	var yellowrows = document.getElementById("yellowtable").rows;
	for (var i = 1; i < yellowrows.length; i++) {
		var gr = yellowrows[i].cells;
		console.log(gr);
		var itemid = itemmap.get(gr[0].innerHTML);
		var wid = whouseMapRev.get(gr[1].innerHTML) + 1;
		var tsid = whitmapreverse.get(itemid + ',' + wid);
		if (!allcsvmap4.has(tsid)) {
			var ati = [];
			var object3 = {
				balance : 0,
				date : todaystring,
				memo : gr[3].innerHTML,
				quant : parseInt(gr[2].innerHTML)
			};
			ati.push(object3);
			allcsvmap4.set(tsid, ati);
		} else {
			var object3 = {
				balance : 0,
				date : todaystring,
				memo : gr[3].innerHTML,
				quant : parseInt(gr[2].innerHTML)
			};
			allcsvmap4.get(tsid).push(object3);
		}
	}

	var fm = allcsvmap4.keys();
	while (true) {
		var key = fm.next().value;
		if (key != null) {
			var value = allcsvmap4.get(key);
			// value.sort(compare);
			// calculate
			for (var v = 0; v < value.length; v++) {
				if (v != 0) {
					value[v].balance = value[v - 1].balance + value[v].quant;
				} else
					value[v].balance = finalmap.get(key).stock + value[v].quant;
			}
		} else
			break;
	}

	console.log(allcsvmap4);

	var vm = allcsvmap4.keys();
	while (true) {
		var key = vm.next().value;
		if (key != null) {
			var value = allcsvmap4.get(key);

			for (var j = 0; j < value.length; j++) {
				var arraytoinsert = [];
				var abi = value[j];
				// ID,STOCK,DATE,QTY,BALANCE,MEMO,YEAR,MONTH,DAY
				var iddd = alasql('SELECT MAX(id) + 1 as id FROM trans')[0].id;
				arraytoinsert.push(iddd);
				arraytoinsert.push(key);
				arraytoinsert.push(todaystring);
				arraytoinsert.push(parseInt(abi.quant));
				arraytoinsert.push(parseInt(abi.balance));
				arraytoinsert.push(abi.memo);
				arraytoinsert.push(parseInt(ye));
				arraytoinsert.push(parseInt(mo));
				arraytoinsert.push(parseInt(day));
				alasql(
						'INSERT INTO trans(\
						id, \
						stock, \
						date, \
						qty, \
						balance, \
						memo, \
						year, \
						month, \
						day)\
						VALUES(?,?,?,?,?,?,?,?,?);',
						arraytoinsert);

			}
		} else
			break;
	}
	console.log(alasql('select * from trans'));
	// delete
	// alasql('DELETE FROM snb WHERE KYEAR=? and KMONTH=? and KDAY=? and NOS =
	// 2',[ ye, mo, day ]);
	alasql('delete from future where year=? and month=? and day=? and qty>0', [
			ye, mo, day ]);
	alasql('delete from jisai where year=? and month=? and day=? and qty>0', [
			ye, mo, day ]);
	document.getElementById("pushobjxx").innerHTML = '';
	document.getElementById("pushobj1").innerHTML = '';
	document.getElementById("pushobjx").innerHTML = '';
	document.getElementById("pushobj2").innerHTML = '';
	document.getElementById("pushobj3").innerHTML = '';
	document.getElementById("pushobj2").innerHTML = '<p>本日の入庫チェックは完成しました。</p>';
	document.getElementById("havecheck").innerHTML = '本日入庫チェック（済み）';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
		                                                onclick = "openpage()">在庫一覧参考</button></div><br>';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
        onclick = "syukkocheck()">本日出庫チェック</button></div>';
	countkinyuucheck = 0;
	allcsvmap3 = new Map();
	allcsvmap4 = new Map();
}

function syukkocheck() {
	refreshfirstpart();
	countkinyuucheck = 0;
	countsansyoucheck = 0;
	if (countsyukkocheck === 0) {
		maincontent.innerHTML = "";
		subcontent.innerHTML = "";
		document.getElementById("pushobjxx").innerHTML = '';
		document.getElementById("pushobjx").innerHTML = '';
		document.getElementById("pushobj1").innerHTML = '';
		document.getElementById("pushobj2").innerHTML = '';
		document.getElementById("pushobj3").innerHTML = '';
		if (document.getElementById("rightpanel") != null) {

			document.getElementById("rightpanel").parentNode
					.removeChild(document.getElementById("rightpanel"));
		}

		var array1 = [], array2 = [], array3 = [];
		// array1 for green , array2 for book no sent, array3 for sent no book
		var todaya = [], jisaia = [];
		var todaybook = alasql(
				'select * from　future where year=? and month=? and day=? and qty<0',
				[ ye, mo, day ]);
		var jisaiarray = alasql(
				'select * from jisai where year=? and month=? and day=? and qty<0',
				[ ye, mo, day ]);

		console.log(todaybook);
		console.log(jisaiarray);

		// all minus now

		for (var i = 0; i < todaybook.length; i++) {
			var ele = todaybook[i];
			if (!ele.stock)
				ele = ele.future;
			var tmpstr = ele.stock + ',' + Math.abs(ele.qty) + ',' + ele.memo;
			todaya.push(tmpstr);
		}
		for (var i = 0; i < jisaiarray.length; i++) {
			var ele = jisaiarray[i];
			if (!ele.stock)
				ele = ele.jisai;
			var tmpstr = ele.stock + ',' + Math.abs(ele.qty) + ',' + ele.memo;
			jisaia.push(tmpstr);
		}

		console.log(todaya);
		console.log(jisaia);

		for (var i = 0; i < todaya.length; i++) {
			var eleto = todaya[i];
			var flag = false;
			for (var j = 0; j < jisaia.length; j++) {
				var eleji = jisaia[j];
				if (eleto === eleji) {
					array1.push(eleto);
					// todaya.splice(i,1);
					jisaia.splice(j, 1);
					flag = true;
					break;
				}
			}
			if (flag === false) {
				array2.push(eleto);
			}
		}

		for (var i = 0; i < jisaia.length; i++) {
			array3.push(jisaia[i]);
		}

		console.log(array1);
		console.log(array2);
		console.log(array3);

		var checklicate = [];

		for (var i = 0; i < array3.length; i++) {
			var ele = array3[i];
			var elearray = ele.split(",");
			var tstockid = parseInt(elearray[0]), quanta = parseInt(elearray[1]), mama = elearray[2];
			var howmuch = 0;
			if (checklicate.includes(tstockid))
				continue;
			else {
				checklicate.push(tstockid);
				for (var j = 0; j < array1.length; j++) {
					if (parseInt(array1[j].split(",")[0]) === tstockid) {
						howmuch -= parseInt(array1[j].split(",")[1]);
					}
				}
				for (var j = 0; j < array3.length; j++) {
					if (parseInt(array3[j].split(",")[0]) === tstockid) {
						howmuch -= parseInt(array3[j].split(",")[1]);
					}
				}

				if (!allcsvmap5.has(tstockid)) {
					var arrayx = [];
					var obj = {
						balance : finalmap.get(tstockid).stock + howmuch,
						date : todaystring,
						memo : "今日の実際出庫状況まとめ",
						quant : howmuch
					};
					arrayx.push(obj);
					var anothersky = alasql(
							'select * from future where stock=? and date>?', [
									tstockid, todaystring ]);
					console.log(anothersky);
					for (var w = 0; w < anothersky.length; w++) {
						var ccc = anothersky[w];
						if (!ccc.stock)
							ccc = ccc.future;
						var obj2 = {
							balance : 0,
							date : ccc.date,
							memo : ccc.memo,
							quant : ccc.qty
						};
						console.log(obj2);
						arrayx.push(obj2);
					}
					allcsvmap5.set(tstockid, arrayx);
				}
			}
		}
		var fm = allcsvmap5.keys();
		while (true) {
			var key = fm.next().value;
			if (key != null) {
				var value = allcsvmap5.get(key);
				value.sort(compare);
				// calculate
				for (var v = 0; v < value.length; v++) {
					if (v != 0) {
						value[v].balance = value[v - 1].balance
								+ value[v].quant;
					}
				}
			} else
				break;
		}
		console.log(allcsvmap5);
		var greentable = $('<table id="greentable" class="table-condensed table-striped table-bordered table-hover"></table>');
		var greenbody = $('<tbody id="greenbody"></tbody>');
		var yellowtable = $('<table id="yellowtable" class="table-condensed table-striped table-bordered table-hover"></table>');
		var yellowbody = $('<tbody id="yellowbody"></tbody>');
		var redtable = $('<table id="redtable" class="table-condensed table-striped table-bordered table-hover"></table>');
		var redbody = $('<tbody id="redbody"></tbody>');
		var greentr = $('<tr></tr>');
		var yellowtr = $('<tr></tr>');
		var redtr = $('<tr></tr>');
		greentr.append('<th>item</th>');
		greentr.append('<th>whouse</th>');
		greentr.append('<th>quantity</th>');
		greentr.append('<th>memo</th>');

		yellowtr.append('<th>item</th>');
		yellowtr.append('<th>whouse</th>');
		yellowtr.append('<th>quantity</th>');
		yellowtr.append('<th>memo</th>');
		yellowtr.append('<th>異常</th>');

		redtr.append('<th>item</th>');
		redtr.append('<th>whouse</th>');
		redtr.append('<th>quantity</th>');
		redtr.append('<th>memo</th>');

		greentr.appendTo(greenbody);
		greenbody.appendTo(greentable);
		yellowtr.appendTo(yellowbody);
		yellowbody.appendTo(yellowtable);
		redtr.appendTo(redbody);
		redbody.appendTo(redtable);
		for (var i = 0; i < array1.length; i++) {
			var trgreen = $('<tr></tr>');
			var ele = array1[i];
			var elearray = ele.split(",");
			var barcode = whitmap.get(parseInt(elearray[0]));
			trgreen.append('<td style="color:green;">' + itmap.get(barcode[0])
					+ '</td>');
			trgreen.append('<td style="color:green;">'
					+ whouseMap.get(parseInt(barcode[1]) - 1) + '</td>');
			trgreen.append('<td style="color:green;">' + elearray[1] + '</td>');
			trgreen.append('<td style="color:green;">' + elearray[2] + '</td>');
			trgreen.appendTo(greenbody);
		}

		for (var i = 0; i < array2.length; i++) {
			var trgreen = $('<tr></tr>');
			var ele = array2[i];
			var elearray = ele.split(",");
			console.log(elearray);
			var barcode = whitmap.get(parseInt(elearray[0]));
			var tstockid = parseInt(elearray[0]), quanta = parseInt(elearray[1]), mama = elearray[2];
			trgreen.append('<td style="color:red;">' + itmap.get(barcode[0])
					+ '</td>');
			trgreen.append('<td style="color:red;">'
					+ whouseMap.get(parseInt(barcode[1]) - 1) + '</td>');
			trgreen.append('<td style="color:red;">' + elearray[1] + '</td>');
			trgreen.append('<td style="color:red;">' + elearray[2] + '</td>');

			trgreen.appendTo(redbody);
		}

		for (var i = 0; i < array3.length; i++) {
			var trgreen = $('<tr></tr>');
			var ele = array3[i];
			var elearray = ele.split(",");
			var barcode = whitmap.get(parseInt(elearray[0]));
			var tstockid = parseInt(elearray[0]), quanta = parseInt(elearray[1]), mama = elearray[2];
			trgreen.append('<td style="color:orange;">'
					+ itmap.get(parseInt(barcode[0])) + '</td>');
			trgreen.append('<td style="color:orange;">'
					+ whouseMap.get(parseInt(barcode[1]) - 1) + '</td>');
			trgreen
					.append('<td style="color:orange;">' + elearray[1]
							+ '</td>');
			trgreen
					.append('<td style="color:orange;">' + elearray[2]
							+ '</td>');
			var arraytocheck_here = allcsvmap5.get(tstockid);

			console.log(arraytocheck_here);
			for (var j = 0; j < arraytocheck_here.length; j++) {
				var diu = arraytocheck_here[j];
				if (diu.balance < 0) {
					trgreen
							.append('<td><button id="'
									+ tstockid
									+ '" class="btn btn-xs btn-warning" data-html="true" onclick="sne2(this)"\
							data-toggle="popover" title="取引明細">緊急</button></td>');

				}
			}
			trgreen.appendTo(yellowbody);
		}
		document.getElementById("pushobj1").innerHTML += '<br><h3>予定通り商品表</h3>';
		$("#pushobj1").append(greentable);
		document.getElementById("pushobj1").innerHTML += '<br><hr><br><h3>予定したが実際出庫してなかった商品表</h3>';
		$("#pushobj1").append(redtable);
		document.getElementById("pushobj1").innerHTML += '<br><hr><br><h3>予定してなかったがが実際出庫した商品表</h3>';
		$("#pushobj1").append(yellowtable);
		document.getElementById("pushobjx").innerHTML += '<br><button class="btn btn-round btn-info btn-large"\
			 onclick="deadcheck2()">確定＆修正</button>';

	}
	countsyukkocheck++;
}

function sne2(b) {
	var tstockid = parseInt($(b).attr("id"));
	var transarr = allcsvmap5.get(tstockid);
	var tratable = $('<table class="table-condensed table-striped table-bordered table-hover"></table>'), trabody = $('<tbody></tbody>');
	trabody.appendTo(tratable);
	var tr = $('<tr></tr>');
	tr.append('<th>日付</th>');
	tr.append('<th>入庫量</th>');
	tr.append('<th>残量</th>');
	tr.append('<th>メモ</th>');
	tr.appendTo(trabody);
	for (var i = 0; i < transarr.length; i++) {
		if (i === 0) {
			var trele = $('<tr></tr>');
			var single = transarr[i];
			trele.append('<td>' + single.date + '</td>');
			trele.append('<td>' + single.quant + '</td>');
			trele.append('<td>' + single.balance + '</td>');
			trele.append('<td>' + single.memo + '</td>');
			trele.appendTo(trabody);
			var trele2 = $('<tr></tr>');
			trele2.append('<td style="color:green;"><strong>未来予定<strong></td>');
			trele2.append('<td></td>');
			trele2.append('<td></td>');
			trele2.append('<td></td>');
			trele2.appendTo(trabody);

		} else {
			var trele = $('<tr></tr>');
			var single = transarr[i];
			if (single.balance >= 0) {
				trele.append('<td>' + single.date + '</td>');
				trele.append('<td>' + single.quant + '</td>');
				trele.append('<td>' + single.balance + '</td>');
				trele.append('<td>' + single.memo + '</td>');
				trele.appendTo(trabody);
			} else {
				trele.append('<td style="color:red;font-weight:bold">'
						+ single.date + '</td>');
				trele.append('<td style="color:red;font-weight:bold">'
						+ single.quant + '</td>');
				trele.append('<td style="color:red;font-weight:bold">'
						+ single.balance + '</td>');
				trele.append('<td style="color:red;font-weight:bold">'
						+ single.memo + '</td>');
				trele.appendTo(trabody);
			}

		}
	}
	var content = tratable;
	$(b).popover({
		content : content,
		container : 'body'
	});
}
function deadcheck2() {
	allcsvmap6 = new Map();
	var greenrows = document.getElementById("greentable").rows;
	for (var i = 1; i < greenrows.length; i++) {
		var gr = greenrows[i].cells;
		console.log(gr);
		var itemid = itemmap.get(gr[0].innerHTML);
		var wid = whouseMapRev.get(gr[1].innerHTML) + 1;
		var tsid = whitmapreverse.get(itemid + ',' + wid);
		if (!allcsvmap6.has(tsid)) {
			var ati = [];
			var object3 = {
				balance : 0,
				date : todaystring,
				memo : gr[3].innerHTML,
				quant : parseInt(gr[2].innerHTML) * (-1)
			};
			ati.push(object3);
			allcsvmap6.set(tsid, ati);
		} else {
			var object3 = {
				balance : 0,
				date : todaystring,
				memo : gr[3].innerHTML,
				quant : parseInt(gr[2].innerHTML) * (-1)
			};
			allcsvmap6.get(tsid).push(object3);
		}
	}
	var yellowrows = document.getElementById("yellowtable").rows;
	for (var i = 1; i < yellowrows.length; i++) {
		var gr = yellowrows[i].cells;
		console.log(gr);
		var itemid = itemmap.get(gr[0].innerHTML);
		var wid = whouseMapRev.get(gr[1].innerHTML) + 1;
		var tsid = whitmapreverse.get(itemid + ',' + wid);
		if (!allcsvmap6.has(tsid)) {
			var ati = [];
			var object3 = {
				balance : 0,
				date : todaystring,
				memo : gr[3].innerHTML,
				quant : parseInt(gr[2].innerHTML) * (-1)
			};
			ati.push(object3);
			allcsvmap6.set(tsid, ati);
		} else {
			var object3 = {
				balance : 0,
				date : todaystring,
				memo : gr[3].innerHTML,
				quant : parseInt(gr[2].innerHTML) * (-1)
			};
			allcsvmap6.get(tsid).push(object3);
		}
	}

	var fm = allcsvmap6.keys();
	while (true) {
		var key = fm.next().value;
		if (key != null) {
			var value = allcsvmap6.get(key);
			// value.sort(compare);
			// calculate
			for (var v = 0; v < value.length; v++) {
				if (v != 0) {
					value[v].balance = value[v - 1].balance + value[v].quant;
				} else
					value[v].balance = finalmap.get(key).stock + value[v].quant;
			}
		} else
			break;
	}
	console.log(allcsvmap6);
	var vm = allcsvmap6.keys();
	while (true) {
		var key = vm.next().value;
		if (key != null) {
			var value = allcsvmap6.get(key);

			for (var j = 0; j < value.length; j++) {
				var arraytoinsert = [];
				var abi = value[j];
				// ID,STOCK,DATE,QTY,BALANCE,MEMO,YEAR,MONTH,DAY
				var iddd = alasql('SELECT MAX(id) + 1 as id FROM trans')[0].id;
				arraytoinsert.push(iddd);
				arraytoinsert.push(key);
				arraytoinsert.push(todaystring);
				arraytoinsert.push(parseInt(abi.quant));
				arraytoinsert.push(parseInt(abi.balance));
				arraytoinsert.push(abi.memo);
				arraytoinsert.push(parseInt(ye));
				arraytoinsert.push(parseInt(mo));
				arraytoinsert.push(parseInt(day));
				alasql(
						'INSERT INTO trans(\
						id, \
						stock, \
						date, \
						qty, \
						balance, \
						memo, \
						year, \
						month, \
						day)\
						VALUES(?,?,?,?,?,?,?,?,?);',
						arraytoinsert);

			}
		} else
			break;
	}

	console.log(alasql('select * from trans'));
	// delete
	// alasql('DELETE FROM snb WHERE KYEAR=? and KMONTH=? and KDAY=? and NOS =
	// 2',[ ye, mo, day ]);
	alasql('delete from future where year=? and month=? and day=? and qty<0', [
			ye, mo, day ]);
	alasql('delete from jisai where year=? and month=? and day=? and qty<0', [
			ye, mo, day ]);
	document.getElementById("pushobjxx").innerHTML = '';
	document.getElementById("pushobj1").innerHTML = '';
	document.getElementById("pushobjx").innerHTML = '';
	document.getElementById("pushobj2").innerHTML = '';
	document.getElementById("pushobj3").innerHTML = '';
	document.getElementById("pushobj2").innerHTML = '<p>本日の出庫チェックは完成しました。</p>';
	document.getElementById("havecheck2").innerHTML = '本日出庫チェック（済み）';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
		                                                onclick = "openpage()">在庫一覧参考</button></div>';
	countsyukkocheck = 0;
	allcsvmap5 = new Map();
	allcsvmap6 = new Map();

}

function sansyou() {
	refreshfirstpart();
	countkinyuucheck = 0;
	countsyukkocheck = 0;
	console.log(alasql('select * from trans'));
	console.log(alasql('select * from future'));
	if (countsansyoucheck === 0) {
		clearall();
		$('#pushobj1')
				.append(
						'	<form class="form-inline">\
        <div class="form-group">\
            <label>倉庫</label> <select name="q140" class="form-control"\
                   id="soukoforsansyou" style="margin-left:10px;" onchange="rollingstone(this)">\
                      <option value="0">未選択</option></select><br><br>\
		<label style="left-margin:10px;">商品</label> <select name="q141" class="form-control"\
		id="itemforsansyou" style="margin-left:10px;">\
		<option value="0">未選択</option>\
	            </select></div>\
</form><br><br>');
		for (var i = 0; i < whouses.length; i++) {
			var ip = whouses[i];
			console.log(ip.whouse.name);
			var option = $('<option>');
			option.attr('value', ip.whouse.name);
			option.attr('id', 'soukoforsansyou' + i);
			option.text(ip.whouse.name);
			$('select[name="q140"]').append(option);
		}
		$('#pushobj1')
				.append(
						'<button onclick="olddays()" class="btn btn-info" id="olddays">これまでの出入庫履歴</button>\
				<br><br><button onclick="newdays()" class="btn btn-success" id="newdays">これからの出入庫予定</button>\
				<br><br><label>Start date: </label> <input name="q142" type="date" class="form-control"\
				 id="startdate" style="margin-left:10px;">\
				<br><br><label>End date: </label> <input name="q142" type="date" class="form-control"\
				 id="enddate" style="margin-left:10px;">\
				<br><br>');

		$('#pushobj1')
				.append(
						'<br><br><button onclick="letsparty()" class="btn btn-lg btn-info">検索</button>');
	}
	countsansyoucheck++;
	console.log(alasql('select * from future'));
}

function olddays() {
	document.getElementById("enddate").value = todaystring;
	document.getElementById("startdate").value = '';
}
function newdays() {
	document.getElementById("enddate").value = '';
	document.getElementById("startdate").value = todaystring;
}

function rollingstone(event) {
	document.getElementById("itemforsansyou").innerHTML = '<option value="0">未選択</option>';
	var numberwhid = event[event.selectedIndex].id;
	console.log(numberwhid);
	if (numberwhid) {
		if (numberwhid === "soukoforsansyou0") {
			console.log("gere");
			var inw0 = tokyo1.keys();
			console.log(inw0);
			while (true) {
				var key = inw0.next().value;
				if (key != null) {
					console.log(key);
					var option = $('<option>');
					option.attr('value', tokyo1.get(key).detail);
					option.attr('id', '0itemforsansyou' + key);
					option.text(tokyo1.get(key).detail);
					$('select[name="q141"]').append(option);
				} else
					break;
			}
		}
		if (numberwhid === "soukoforsansyou1") {
			var inw0 = tokyo2.keys();
			while (true) {
				var key = inw0.next().value;
				if (key != null) {
					var option = $('<option>');
					option.attr('value', tokyo2.get(key).detail);
					option.attr('id', '1itemforsansyou' + key); // key should be
					// stockid
					option.text(tokyo2.get(key).detail);
					$('select[name="q141"]').append(option);
				} else
					break;
			}
		}
		if (numberwhid === "soukoforsansyou2") {
			var inw0 = osaka.keys();
			while (true) {
				var key = inw0.next().value;
				if (key != null) {
					var option = $('<option>');
					option.attr('value', osaka.get(key).detail);
					option.attr('id', '2itemforsansyou' + key);
					option.text(osaka.get(key).detail);
					$('select[name="q141"]').append(option);
				} else
					break;
			}
		}
		if (numberwhid === "soukoforsansyou3") {
			var inw0 = fukuoka.keys();
			while (true) {
				var key = inw0.next().value;
				if (key != null) {
					var option = $('<option>');
					option.attr('value', fukuoka.get(key).detail);
					option.attr('id', '3itemforsansyou' + key);
					option.text(fukuoka.get(key).detail);
					$('select[name="q141"]').append(option);
				} else
					break;
			}
		}

	}
}

function letsparty() {
	var ws = document.getElementById("soukoforsansyou").value;
	var im = document.getElementById("itemforsansyou").value;
	var sdt = document.getElementById("startdate").value;
	var edt = document.getElementById("enddate").value;
	document.getElementById("pushobjx").innerHTML = '';
	if (ws ==="0" || im === "0") {
		alert("Please complete the form");
		return;
	}
	console.log(ws + ',' + im + ',' + sdt + ',' + edt);
	var wsid = whouseMapRev.get(ws) + 1;
	var imid = itemmap.get(im);
	var stalkerid = whitmapreverse.get(imid + ',' + wsid);
	var motherarray = alasql('select * from trans where stock=?', [ stalkerid ]);
	var daughterarray = alasql('select * from future where stock=?',
			[ stalkerid ]);
	var kidarray = [];
	for (var i = 0; i < motherarray.length; i++) {
		var bl = motherarray[i];
		if (!bl.date)
			bl = bl.trans;
		var obj = {
			balance : bl.balance,
			date : bl.date,
			memo : bl.memo,
			quant : bl.qty
		};
		kidarray.push(obj);
	}
	for (var i = 0; i < daughterarray.length; i++) {
		var bl = daughterarray[i];
		if (!bl.date)
			bl = bl.future;
		var obj = {
			balance : bl.balance,
			date : bl.date,
			memo : bl.memo,
			quant : bl.qty
		};
		kidarray.push(obj);
	}
	kidarray.sort(compare);
	for (var v = 0; v < kidarray.length; v++) {
		if (v === 0)
			kidarray[v].balance = kidarray[v].quant;
		else
			kidarray[v].balance = kidarray[v - 1].balance + kidarray[v].quant;
	}
	console.log(kidarray);

	var rirekitable = $('<table class="table-condensed table-striped table-bordered table-hover" style="width:120%;"></table>');
	var rirekibody = $('<tbody></tbody>');
	rirekibody.appendTo(rirekitable);
	var rirekitr = $('<tr></tr>');
	rirekitr.append('<th>日付</th>');
	rirekitr.append('<th>出/入庫</th>');
	rirekitr.append('<th>数量</th>');
	rirekitr.append('<th>残量</th>');
	rirekitr.append('<th>メモ</th>');
	rirekitr.appendTo(rirekibody);

	if (!sdt && !edt) {
		var border = motherarray.length;
		for (var i = 0; i < kidarray.length; i++) {
			var rritr = $('<tr></tr>');
			if (i === border) {
				var rritr2 = $('<tr></tr>');
				rritr2.append('<td><strong>未来予定</strong></td>');
				rritr2.append('<td></td>');
				rritr2.append('<td></td>');
				rritr2.append('<td></td>');
				rritr2.append('<td></td>');
				rritr2.append('<td></td>');
				rritr2.appendTo(rirekibody);
			}
			if (kidarray[i].quant > 0) {
				rritr.append('<td style="color:lightseagreen;">'
						+ kidarray[i].date + '</td>');
				rritr.append('<td style="color:lightseagreen;">入庫</td>');
				rritr.append('<td style="color:lightseagreen;">'
						+ kidarray[i].quant + '</td>');
				rritr.append('<td style="color:lightseagreen;">'
						+ kidarray[i].balance + '</td>');
				rritr.append('<td style="color:lightseagreen;">'
						+ kidarray[i].memo + '</td>');
				rritr.appendTo(rirekibody);
			} else {
				rritr.append('<td style="color:darkorange;">'
						+ kidarray[i].date + '</td>');
				rritr.append('<td style="color:darkorange;">出庫</td>');
				rritr.append('<td style="color:darkorange;">'
						+ kidarray[i].quant + '</td>');
				rritr.append('<td style="color:darkorange;">'
						+ kidarray[i].balance + '</td>');
				rritr.append('<td style="color:darkorange;">'
						+ kidarray[i].memo + '</td>');
				rritr.appendTo(rirekibody);
			}

		}
		rirekitable.appendTo($("#pushobjx"));
	}

	else {
		if (sdt && edt) {
			if (bidaxiao(sdt, edt) > 0) {
				alert("invalid date input");
				return;
			} else {
				var flaggg = false;
				// first, they are all smaller than todaystring
				if (bidaxiao(sdt, edt) === 0) {
					console.log("same");
					console.log(bidaxiao(sdt, todaystring));
					if (bidaxiao(sdt, todaystring) === 0) {
						if (window.confirm("今日の入庫/出庫チェックはすでに行いましたか？")) {
							for (var i = 0; i < kidarray.length; i++) {
								if (bidaxiao(kidarray[i].date, todaystring) === 0) {
									var rritr = $('<tr></tr>');
									if (kidarray[i].quant > 0) {
										rritr
												.append('<td style="color:lightseagreen;">'
														+ kidarray[i].date
														+ '</td>');
										rritr
												.append('<td style="color:lightseagreen;">入庫</td>');
										rritr
												.append('<td style="color:lightseagreen;">'
														+ kidarray[i].quant
														+ '</td>');
										rritr
												.append('<td style="color:lightseagreen;">'
														+ kidarray[i].balance
														+ '</td>');
										rritr
												.append('<td style="color:lightseagreen;">'
														+ kidarray[i].memo
														+ '</td>');
										rritr.appendTo(rirekibody);
									} else {
										rritr
												.append('<td style="color:darkorange;">'
														+ kidarray[i].date
														+ '</td>');
										rritr
												.append('<td style="color:darkorange;">出庫</td>');
										rritr
												.append('<td style="color:darkorange;">'
														+ kidarray[i].quant
														+ '</td>');
										rritr
												.append('<td style="color:darkorange;">'
														+ kidarray[i].balance
														+ '</td>');
										rritr
												.append('<td style="color:darkorange;">'
														+ kidarray[i].memo
														+ '</td>');
										rritr.appendTo(rirekibody);
									}
								}
							}
							rirekitable.appendTo($("#pushobjx"));

						} else {
							alert("まず今日の入庫/出庫をおこなってください。");
							return;
						}
					} else if (bidaxiao(sdt, todaystring) > 0) {
						var rritr2 = $('<tr></tr>');
						rritr2.append('<td><strong>未来予定</strong></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.appendTo(rirekibody);
						for (var i = 0; i < kidarray.length; i++) {
							if (kidarray[i].date === sdt) {
								var rritr = $('<tr></tr>');
								if (kidarray[i].quant > 0) {
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].date
													+ '</td>');
									rritr
											.append('<td style="color:lightseagreen;">入庫</td>');
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].quant
													+ '</td>');
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].balance
													+ '</td>');
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].memo
													+ '</td>');
									rritr.appendTo(rirekibody);
								} else {
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].date
													+ '</td>');
									rritr
											.append('<td style="color:darkorange;">出庫</td>');
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].quant
													+ '</td>');
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].balance
													+ '</td>');
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].memo
													+ '</td>');
									rritr.appendTo(rirekibody);
								}
							}
						}
						rirekitable.appendTo($("#pushobjx"));
					} else {
						for (var i = 0; i < kidarray.length; i++) {
							if (kidarray[i].date === sdt) {
								var rritr = $('<tr></tr>');
								if (kidarray[i].quant > 0) {
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].date
													+ '</td>');
									rritr
											.append('<td style="color:lightseagreen;">入庫</td>');
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].quant
													+ '</td>');
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].balance
													+ '</td>');
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].memo
													+ '</td>');
									rritr.appendTo(rirekibody);
								} else {
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].date
													+ '</td>');
									rritr
											.append('<td style="color:darkorange;">出庫</td>');
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].quant
													+ '</td>');
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].balance
													+ '</td>');
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].memo
													+ '</td>');
									rritr.appendTo(rirekibody);
								}
							}
						}
						rirekitable.appendTo($("#pushobjx"));
					}
				}

				else {
					if (bidaxiao(todaystring, edt) >= 0) { // 都是过去的数据
						for (var i = 0; i < kidarray.length; i++) {
							if (bidaxiao(sdt, kidarray[i].date) <= 0
									&& bidaxiao(kidarray[i].date, edt) <= 0) {
								var rritr = $('<tr></tr>');
								if (kidarray[i].quant > 0) {
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].date
													+ '</td>');
									rritr
											.append('<td style="color:lightseagreen;">入庫</td>');
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].quant
													+ '</td>');
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].balance
													+ '</td>');
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].memo
													+ '</td>');
									rritr.appendTo(rirekibody);
								} else {
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].date
													+ '</td>');
									rritr
											.append('<td style="color:darkorange;">出庫</td>');
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].quant
													+ '</td>');
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].balance
													+ '</td>');
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].memo
													+ '</td>');
									rritr.appendTo(rirekibody);
								}
							}
						}
						rirekitable.appendTo($("#pushobjx"));
					} else if (bidaxiao(todaystring, sdt) > 0
							&& bidaxiao(edt, todaystring) > 0) {
						flaggg = true;
						for (var i = 0; i < kidarray.length; i++) {
							var dis = kidarray[i];
							if ((i != 0 && bidaxiao(dis.date, todaystring) > 0 && bidaxiao(
									kidarray[i - 1].date, todaystring) <= 0)
									|| (i === 0 && bidaxiao(dis.date,
											todaystring) > 0)) {
								var rritr2 = $('<tr></tr>');
								rritr2.append('<td><strong>未来予定</strong></td>');
								rritr2.append('<td></td>');
								rritr2.append('<td></td>');
								rritr2.append('<td></td>');
								rritr2.append('<td></td>');
								rritr2.append('<td></td>');
								rritr2.appendTo(rirekibody);
							}
							if (bidaxiao(sdt, kidarray[i].date) <= 0
									&& bidaxiao(kidarray[i].date, edt) <= 0) {
								var rritr = $('<tr></tr>');
								if (kidarray[i].quant > 0) {
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].date
													+ '</td>');
									rritr
											.append('<td style="color:lightseagreen;">入庫</td>');
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].quant
													+ '</td>');
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].balance
													+ '</td>');
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].memo
													+ '</td>');
									rritr.appendTo(rirekibody);
								} else {
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].date
													+ '</td>');
									rritr
											.append('<td style="color:darkorange;">出庫</td>');
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].quant
													+ '</td>');
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].balance
													+ '</td>');
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].memo
													+ '</td>');
									rritr.appendTo(rirekibody);
								}
							}
						}
						rirekitable.appendTo($("#pushobjx"));
					} else if (bidaxiao(todaystring, sdt) <= 0) {
						flaggg = true;
						var rritr2 = $('<tr></tr>');
						rritr2.append('<td><strong>未来予定</strong></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.appendTo(rirekibody);
						for (var i = 0; i < kidarray.length; i++) {
							if (bidaxiao(sdt, kidarray[i].date) <= 0
									&& bidaxiao(kidarray[i].date, edt) <= 0) {
								var rritr = $('<tr></tr>');
								if (kidarray[i].quant > 0) {
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].date
													+ '</td>');
									rritr
											.append('<td style="color:lightseagreen;">入庫</td>');
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].quant
													+ '</td>');
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].balance
													+ '</td>');
									rritr
											.append('<td style="color:lightseagreen;">'
													+ kidarray[i].memo
													+ '</td>');
									rritr.appendTo(rirekibody);
								} else {
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].date
													+ '</td>');
									rritr
											.append('<td style="color:darkorange;">出庫</td>');
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].quant
													+ '</td>');
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].balance
													+ '</td>');
									rritr
											.append('<td style="color:darkorange;">'
													+ kidarray[i].memo
													+ '</td>');
									rritr.appendTo(rirekibody);
								}
							}
						}
						rirekitable.appendTo($("#pushobjx"));
					}
				}
			}
		}

		// ======================================================================================================================
		else if (!sdt && edt) {
			if (bidaxiao(edt, todaystring) <= 0) {
				for (var i = 0; i < kidarray.length; i++) {
					if (bidaxiao(kidarray[i].date, edt) <= 0) {
						var rritr = $('<tr></tr>');
						if (kidarray[i].quant > 0) {
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].date + '</td>');
							rritr
									.append('<td style="color:lightseagreen;">入庫</td>');
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].quant + '</td>');
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].balance + '</td>');
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].memo + '</td>');
							rritr.appendTo(rirekibody);
						} else {
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].date + '</td>');
							rritr
									.append('<td style="color:darkorange;">出庫</td>');
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].quant + '</td>');
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].balance + '</td>');
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].memo + '</td>');
							rritr.appendTo(rirekibody);
						}
					}
				}
				rirekitable.appendTo($("#pushobjx"));
			} else {
				for (var i = 0; i < kidarray.length; i++) {
					var bishi = kidarray[i];
					if ((i != 0 && bidaxiao(bishi.date, todaystring) > 0 && bidaxiao(
							kidarray[i - 1].date, todaystring) <= 0)
							|| (i === 0 && bidaxiao(bishi.date, todaystring) > 0)) {
						var rritr2 = $('<tr></tr>');
						rritr2.append('<td><strong>未来予定</strong></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.appendTo(rirekibody);
					}
					if (bidaxiao(kidarray[i].date, edt) <= 0) {
						var rritr = $('<tr></tr>');
						if (kidarray[i].quant > 0) {
							
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].date + '</td>');
							rritr
									.append('<td style="color:lightseagreen;">入庫</td>');
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].quant + '</td>');
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].balance + '</td>');
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].memo + '</td>');
							rritr.appendTo(rirekibody);
						} else {
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].date + '</td>');
							rritr
									.append('<td style="color:darkorange;">出庫</td>');
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].quant + '</td>');
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].balance + '</td>');
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].memo + '</td>');
							rritr.appendTo(rirekibody);
						}
					}
				}
				rirekitable.appendTo($("#pushobjx"));
			}
		} else if (sdt && !edt) {
			console.log("from now");
			if (bidaxiao(todaystring, sdt) < 0) {
				var rritr2 = $('<tr></tr>');
				rritr2.append('<td><strong>未来予定</strong></td>');
				rritr2.append('<td></td>');
				rritr2.append('<td></td>');
				rritr2.append('<td></td>');
				rritr2.append('<td></td>');
				rritr2.append('<td></td>');
				rritr2.appendTo(rirekibody);

				for (var i = 0; i < kidarray.length; i++) {
					if (bidaxiao(kidarray[i].date, sdt) >= 0) {
						var rritr = $('<tr></tr>');
						if (kidarray[i].quant > 0) {
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].date + '</td>');
							rritr
									.append('<td style="color:lightseagreen;">入庫</td>');
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].quant + '</td>');
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].balance + '</td>');
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].memo + '</td>');
							rritr.appendTo(rirekibody);
						} else {
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].date + '</td>');
							rritr
									.append('<td style="color:darkorange;">出庫</td>');
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].quant + '</td>');
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].balance + '</td>');
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].memo + '</td>');
							rritr.appendTo(rirekibody);
						}
					}
				}
				rirekitable.appendTo($("#pushobjx"));
			} else {
				console.log("woca");
				for (var i = 0; i < kidarray.length; i++) {
					var ershi = kidarray[i];
					if ((i != 0 && bidaxiao(ershi.date, todaystring) > 0 && bidaxiao(
							todaystring, kidarray[i - 1].date) >= 0)
							|| (i === 0 && bidaxiao(ershi, todaystring) > 0)) {
						var rritr2 = $('<tr></tr>');
						rritr2.append('<td><strong>未来予定</strong></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.append('<td></td>');
						rritr2.appendTo(rirekibody);
					}
					if (bidaxiao(ershi.date, sdt) > 0) {
						console.log("inside");
						console.log(ershi.date);
						var rritr = $('<tr></tr>');
						if (kidarray[i].quant > 0) {
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].date + '</td>');
							rritr
									.append('<td style="color:lightseagreen;">入庫</td>');
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].quant + '</td>');
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].balance + '</td>');
							rritr.append('<td style="color:lightseagreen;">'
									+ kidarray[i].memo + '</td>');
							rritr.appendTo(rirekibody);
						} else {
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].date + '</td>');
							rritr
									.append('<td style="color:darkorange;">出庫</td>');
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].quant + '</td>');
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].balance + '</td>');
							rritr.append('<td style="color:darkorange;">'
									+ kidarray[i].memo + '</td>');
							rritr.appendTo(rirekibody);
						}
					}
				}
				rirekitable.appendTo($("#pushobjx"));
			}
		}
	}
}

function tnorosi(){
	refreshfirstpart();
	countsyukkocheck = 0;
	countsansyoucheck = 0;
	countkinyuucheck = 0;
	clearall();
	console.log(alasql('select * from tana'));
	var trueb = alasql('select * from tana');
	var realzaiko = new Map();
	for (var i=0;i<trueb.length;i++){
		var value = [];
		var tb = trueb[i];
		if (!tb.balance) tb=tb.tana;
		value.push(tb.balance);
		realzaiko.set(tb.stock,value);
	}
	for (var i=0;i<itemzaiko.length;i++){
		var iz = itemzaiko[i];
		if (!iz.stock) iz=iz.trans;
		if (realzaiko.has(iz.stock)){
			var value = realzaiko.get(iz.stock);
			value.push(iz.truebalance);
		}
		else {
			var value = [];
			value.push(0);
			value.push(iz.truebalance);
			realzaiko.set(iz.stock,value);
		}
	}
	console.log(realzaiko);
	
	var tanatable = $('<table id="tanatable" class="table table-condensed table-striped table-bordered table-hover"></table>');
	var tanabody = $('<tbody id="tanabody"></tbody>');
	tanabody.appendTo(tanatable);
	var tanatr = $('<tr></tr>');
	tanatr.append('<th>商品名</th>');
	tanatr.append('<th>倉庫</th>');
	tanatr.append('<th>記録在庫数</th>');
	tanatr.append('<th>実際在庫数</th>');
	tanatr.append('<th>差異値</th>');
	tanatr.appendTo(tanabody);
	var fm = realzaiko.keys();
	while (true) {
		var key = fm.next().value;
		if (key != null) {
			var value = realzaiko.get(key);
			if (value[0] != value[1]){
				var thisitem = finalmap.get(key).detail;
				var thishouse = finalmap.get(key).whouse;
				var tanatdtr = $('<tr></tr>');
				tanatdtr.append('<td>'+ thisitem +'</td>');
				tanatdtr.append('<td>'+ thishouse +'</td>');
				tanatdtr.append('<td>'+ value[1] +'</td>');
				tanatdtr.append('<td>'+ value[0] +'</td>');
				var delt = value[0] - value[1];
				tanatdtr.append('<td style="color:crimson;">'+ delt +'</td>');
				tanatdtr.appendTo(tanabody);
			}
		} else
			break;
	}
	document.getElementById("pushobj1").innerHTML += '<h3>不一致商品一覧</h3><hr>';
	tanatable.appendTo($("#pushobj1"));
	document.getElementById("pushobjxx").innerHTML += '<button class="btn btn-lg btn-success"\
		style="margin-left:200px;" onclick="tanasubmit()">確定＆修正</button>';
}

function tanasubmit(){
	var rows = document.getElementById("tanatable").rows;
	for (var i=1;i<rows.length;i++){
		var tds = rows[i].cells;
		var arraytoinsert = [];
		var iddd = alasql('SELECT MAX(id) + 1 as id FROM trans')[0].id;
		arraytoinsert.push(iddd);
		var a = itemmap.get(tds[0].innerHTML);
		console.log(a);
		var b = whouseMapRev.get(tds[1].innerHTML)+1;
		console.log(b);
		var c = whitmapreverse.get(a+','+b);
		console.log(c);
		arraytoinsert.push(c);
		//ID,STOCK,DATE,QTY,BALANCE,MEMO,YEAR,MONTH,DAY
		arraytoinsert.push(todaystring);
		arraytoinsert.push(parseInt(tds[4].innerHTML));
		arraytoinsert.push(parseInt(tds[3].innerHTML));
		arraytoinsert.push("棚卸による在庫数変動");
		arraytoinsert.push(ye);
		arraytoinsert.push(mo);
		arraytoinsert.push(day);
		alasql(
				'INSERT INTO trans(\
				id, \
				stock, \
				date, \
				qty, \
				balance, \
				memo, \
				year, \
				month, \
				day)\
				VALUES(?,?,?,?,?,?,?,?,?);',
				arraytoinsert);
	}
	console.log(alasql('select * from trans'));
	document.getElementById("pushobjxx").innerHTML = '';
	document.getElementById("pushobj1").innerHTML = '';
	document.getElementById("pushobjx").innerHTML = '';
	document.getElementById("pushobj2").innerHTML = '';
	document.getElementById("pushobj3").innerHTML = '';
	if (document.getElementById("rightpanel") != null) {

		document.getElementById("rightpanel").parentNode.removeChild(document
				.getElementById("rightpanel"));
	}
	document.getElementById("pushobj2").innerHTML = '<p>棚卸しは完成しました。</p>';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
		                                                onclick = "openpage()">在庫一覧参考</button></div><br>';
	document.getElementById("pushobj2").innerHTML += '<div><button class="btn btn-primary btn-round"\
        onclick = "kinyuucheck()">本日入庫チェック</button></div><br>';
	document.getElementById("tanaorosi").innerHTML = '棚卸（済）';
}


function showusgraph(){
	refreshfirstpart();
	countsyukkocheck = 0;
	countsansyoucheck = 0;
	countkinyuucheck = 0;
	clearall();
	window.open("shownoenough.html");
}


function gosa(b){
	refreshfirstpart();
	countsyukkocheck = 0;
	countsansyoucheck = 0;
	countkinyuucheck = 0;
	clearall();
	var bxid = $(b).attr("id");
	if (bxid === "ngosa") {
		window.open("showngosa.html");
	}
	else{
		window.open("showsgosa.html");
	}
	
}

function sweethome(){
	refreshfirstpart();
	countsyukkocheck = 0;
	countsansyoucheck = 0;
	countkinyuucheck = 0;
	clearall();
	console.log(alasql('select * from snb'));
	var iftoday = alasql('select * from snb where KYEAR=? and KMONTH=? and KDAY=? and NOS=1',[ye,mo,day]);
	var iftoday2 = alasql('select * from snb where KYEAR=? and KMONTH=? and KDAY=? and NOS=2',[ye,mo,day]);
	console.log(iftoday2);
	var futoday = alasql('select * from future where year=? and month=? and day=? and qty>0', [ye, mo, day ]);
	var futoday2 = alasql('select * from future where year=? and month=? and day=? and qty<0', [ye, mo, day ]);
	var thatstoday = alasql('select * from jisai where year=? and month=? and day=? and qty>0', [ye, mo, day ]);
	var thatstoday2 = alasql('select * from jisai where year=? and month=? and day=? and qty<0', [ye, mo, day ]);
	console.log(ye+','+mo+','+day);
	console.log(thatstoday2);
	
	document.getElementById("pushobj1").innerHTML = '<h3>本日のリマインダー</h3>';
	
	if (iftoday.length>0){
		document.getElementById("pushobj1").innerHTML += '<br><hr><h5>1.本日の入庫記入データが入りました。自動入庫記入を行ってください：</h5><button onclick="jidoukinyuu()"\
			                                        class="btn btn-primary btn-xs" style="margin-left:10px;">Click here</button>';
	}
	if (iftoday2.length>0){
		document.getElementById("pushobj1").innerHTML += '<br><hr><h5>2.本日の出庫記入データが入りました。自動出庫記入を行ってください：</h5><button onclick="jidoukn()"\
			                                        class="btn btn-success btn-xs" style="margin-left:10px;">Click here</button>';
	}
	
	document.getElementById("pushobj1").innerHTML += '<br><br><hr><h5>3.本日の棚卸を行ってください(すでに行った場合は無視してください)：</h5><button onclick="tnorosi()"\
        class="btn btn-info btn-xs" style="margin-left:10px;">Click here</button>';
	
	if (futoday.length>0 || thatstoday.length>0){
		document.getElementById("pushobj1").innerHTML += '<br><hr><h5>4.入庫記入が終わったら、本日の入庫チェックを行ってください：</h5><button onclick="kinyuucheck()"\
            class="btn btn-warning btn-xs" style="margin-left:10px;">Click here</button>';
	}
	if (futoday2.length>0 || thatstoday2.length>0){
		document.getElementById("pushobj1").innerHTML += '<br><hr><h5>5.出庫記入が終わったら、本日の出庫チェックを行ってください：</h5><button onclick="syukkocheck()"\
            class="btn btn-danger btn-xs" style="margin-left:10px;">Click here</button>';
	}
	
	
	var smalltable =$('<table class="table-striped table-condensed table-bordered table-hover"></table>');
	var smallbody = $('<tbody></tbody>');
	smallbody.appendTo(smalltable);
	var smalltr = $('<tr></tr>');
	smalltr.append('<th>商品</th>');
	smalltr.append('<th>倉庫</th>');
	smalltr.append('<th>残量</th>');
	smalltr.appendTo(smallbody);
	for (var i=0;i<itemzaiko.length;i++){
		var miao = itemzaiko[i];
		if (!miao.stock) miao = miao.trans;
		if (miao.truebalance<=10){
			var smtr = $('<tr></tr>');
			var itid = whitmap.get(miao.stock)[0];
			var whtid = whitmap.get(miao.stock)[1];
			smtr.append('<td>'+ itmap.get(itid) +'</td>');
			smtr.append('<td>'+ whouseMap.get(whtid-1) +'</td>');
			smtr.append('<td style="color:red;">'+ miao.truebalance +'</td>');
			smtr.appendTo(smallbody);
		}
	}
	
	document.getElementById("pushobj3").innerHTML = '<h4>現時点で、在庫数10以下の商品</h4><br>';
	$("#pushobj3").append(smalltable);
}

function showthefuture(){
	refreshfirstpart();
	countsyukkocheck = 0;
	countsansyoucheck = 0;
	countkinyuucheck = 0;
	clearall();
	
	allcsvmapx = new Map();
	var smallkids = [];
	var weilai = alasql('select * from future');
	console.log(weilai);
	for (var i=0;i<weilai.length;i++){
		var wl = weilai[i];
		if (!wl.memo) wl = wl.future;
		var objj = {balance:0,date:wl.date,memo:wl.memo,quant:wl.qty};
		if (allcsvmapx.has(wl.stock)){
			var arrei = allcsvmapx.get(wl.stock);
			arrei.push(objj);
		}
		else {
			var arrei = [];
			arrei.push(objj);
			allcsvmapx.set(wl.stock,arrei);
		}
		
		
	}
	
	var fm = allcsvmapx.keys();
	while (true) {
		var key = fm.next().value;
		if (key != null) {
			var value = allcsvmapx.get(key);
			value.sort(compare);
			// calculate
			for (var v = 0; v < value.length; v++) {
				if (v != 0) {
					value[v].balance = value[v - 1].balance
							+ value[v].quant;
				}
				else value[v].balance = finalmap.get(key).stock+value[v].quant;
			}
		} else
			break;
	}
	console.log(allcsvmapx);
	
	var quetable = $('<table class="table-condensed table-striped table-hover table-bordered">');
	var quebody = $('<tbody></tbody>');
	quebody.appendTo(quetable);
	var quetr = $('<tr></tr>');
	quetr.append('<th>商品</th>');
	quetr.append('<th>倉庫</th>');
	quetr.append('<th>詳細</th>');
	quetr.appendTo(quebody);
	var dm = allcsvmapx.keys();
	while (true){
		var key = dm.next().value;
		if (key!=null){
			var value = allcsvmapx.get(key);
			for (var v=0;v<value.length;v++){
				if (value[v].balance<0){
					var itid = whitmap.get(key)[0];
					var witid = whitmap.get(key)[1]-1;
					var que = $('<tr></tr>');
					que.append('<td>'+ itmap.get(itid) +'</td>');
					que.append('<td>'+ whouseMap.get(witid) +'</td>');
					que.append('<td><button id="'
							+ key
							+ '" class="btn btn-xs btn-warning" data-html="true" onclick="que(this)"\
					data-toggle="popover" title="取引明細">詳細</button></td>');
					que.appendTo(quetable);
					break;
				}
			}
		}
		else break;
	}
	document.getElementById("pushobj1").innerHTML = '<h3>未来の某時点で在庫不足になる商品参照</h3>'
	$("#pushobj1").append(quetable);	
}

function que(b){
	var queid = parseInt($(b).attr("id"));
	var transarr = allcsvmapx.get(queid);
	var tratable = $('<table class="table-condensed table-striped table-hover table-bordered"></table>'), trabody = $('<tbody></tbody>');
	trabody.appendTo(tratable);
	var tr = $('<tr></tr>');
	tr.append('<th>日付</th>');
	tr.append('<th>出庫量</th>');
	tr.append('<th>残量</th>');
	tr.append('<th>メモ</th>');
	tr.appendTo(trabody);
	for (var i = 0; i < transarr.length; i++) {
		var trele = $('<tr></tr>');
		var single = transarr[i];
		if (single.balance >= 0) {
			trele.append('<td>' + single.date + '</td>');
			trele.append('<td>' + single.quant + '</td>');
			trele.append('<td>' + single.balance + '</td>');
			trele.append('<td>' + single.memo + '</td>');
			trele.appendTo(trabody);
		} else {
			trele.append('<td style="color:red;font-weight:bold">'
					+ single.date + '</td>');
			trele.append('<td style="color:red;font-weight:bold">'
					+ single.quant + '</td>');
			trele.append('<td style="color:red;font-weight:bold">'
					+ single.balance + '</td>');
			trele.append('<td style="color:red;font-weight:bold">'
					+ single.memo + '</td>');
			trele.appendTo(trabody);
		}

	}
	var content = tratable;
	console.log(content);
	$(b).popover({
		content : content
	});
}



function lastone(){
	refreshfirstpart();
	countsyukkocheck = 0;
	countsansyoucheck = 0;
	countkinyuucheck = 0;
	clearall();
	window.open("zaiko.html");
}



