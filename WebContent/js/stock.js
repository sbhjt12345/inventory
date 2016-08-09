// ID取得
var id = parseInt($.url().param('id'));
$("input[name=id]").val(id);

var itemzaiko = alasql('select stock, sum(qty) as truebalance from trans group by stock');
var izmap = new Map();
for (var i=0;i<itemzaiko.length;i++){
	var iz = itemzaiko[i];
	if (!iz.stock) iz = iz.trans;
	izmap.set(iz.stock,iz.truebalance);
}

console.log(izmap);

// 商品情報読み込み
var sql = 'SELECT * \
	FROM stock \
	JOIN whouse ON whouse.id = stock.whouse \
	JOIN item ON item.id = stock.item \
	JOIN kind ON kind.id = item.kind \
	WHERE stock.id = ?';
var row = alasql(sql, [ id ])[0];
$('#image').attr('src', 'img/' + row.item.id + '.jpg');
$('#whouse').text(row.whouse.name);
$('#code').text(row.item.code);
$('#maker').text(row.item.maker);
$('#detail').text(row.item.detail);
$('#price').text(numberWithCommas(row.item.price));
var balance = izmap.get(row.stock.id); // 入出庫で利用
console.log(row.stock);
$('#balance').text(balance);

// トランザクション読み込み
var rows = alasql('SELECT * FROM trans WHERE stock = ?', [ id ]);
var tbody = $('#tbody-transs');
for (var i = 0; i < rows.length; i++) {
	var row = rows[i];
	var tr = $('<tr>').appendTo(tbody);
	tr.append('<td>' + row.trans.date + '</td>');
	tr.append('<td>' + row.trans.qty + '</td>');
	tr.append('<td>' + row.trans.balance + '</td>');
	tr.append('<td>' + row.trans.memo + '</td>');
}

// 入庫・出庫処理
$('#update').on('click', function() {
	var date = $('input[name="date"]').val();
	var datearray = date.split("-");
	var y1 = parseInt(datearray[0]);
	var m1 = parseInt(datearray[1]);
	var d1 = parseInt(datearray[2]);
	var qty = parseInt($('input[name="qty"]').val());
	var memo = $('textarea[name="memo"]').val();
	
	alasql('UPDATE stock SET balance = ? WHERE id = ?', [ balance + qty, id ]);
	var trans_id = alasql('SELECT MAX(id) + 1 as id FROM trans')[0].id;
	alasql('INSERT INTO trans VALUES(?,?,?,?,?,?,?,?,?)', [ trans_id, id, date, qty, balance + qty, memo,y1,m1,d1]);
	//console.log(alasql('select * from '))
	window.location.assign('stock.html?id=' + id);
});
