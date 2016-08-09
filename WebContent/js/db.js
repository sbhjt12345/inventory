var DB = {};

DB.init = function() {
	if (window.confirm('DBが初期化されます。よろしいですか？')) {
		DB.load();
	}
};

DB.load = function() {
	alasql.options.joinstar = 'overwrite';

	// 分類
	alasql('DROP TABLE IF EXISTS kind;');
	alasql('CREATE TABLE kind(id INT IDENTITY, text STRING);');
	var pkind = alasql.promise('SELECT MATRIX * FROM CSV("data/KIND-KIND.csv", {headers: true})').then(function(kinds) {
		for (var i = 0; i < kinds.length; i++) {
			var kind = kinds[i];
			alasql('INSERT INTO kind VALUES(?,?);', kind);
		}
	});

	// アイテム
	alasql('DROP TABLE IF EXISTS item;');
	alasql('CREATE TABLE item(id INT IDENTITY, code STRING, kind INT, detail STRING, maker STRING, price INT, unit STRING);');
	var pitem = alasql.promise('SELECT MATRIX * FROM CSV("data/ITEM-ITEM.csv", {headers: true})').then(function(items) {
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			alasql('INSERT INTO item VALUES(?,?,?,?,?,?,?);', item);
		}
	});

	// 倉庫
	alasql('DROP TABLE IF EXISTS whouse;');
	alasql('CREATE TABLE whouse(id INT IDENTITY, name STRING, addr STRING, tel STRING);');
	var pwhouse = alasql.promise('SELECT MATRIX * FROM CSV("data/WHOUSE-WHOUSE.csv", {headers: true})').then(
			function(whouses) {
				for (var i = 0; i < whouses.length; i++) {
					var whouse = whouses[i];
					alasql('INSERT INTO whouse VALUES(?,?,?,?);', whouse);
				}
			});

	// 在庫
	alasql('DROP TABLE IF EXISTS stock;');
	alasql('CREATE TABLE stock(id INT IDENTITY, item INT, whouse INT, balance INT);');
	var pstock = alasql.promise('SELECT MATRIX * FROM CSV("data/STOCK-STOCK.csv", {headers: true})').then(
			function(stocks) {
				for (var i = 0; i < stocks.length; i++) {
					var stock = stocks[i];
					alasql('INSERT INTO stock VALUES(?,?,?,?);', stock);
				}
			});

	// トランザクション
	alasql('DROP TABLE IF EXISTS trans;');
	alasql('CREATE TABLE trans(id INT IDENTITY, stock INT, date DATE, qty INT, balance INT, memo STRING, year INT, month INT, day INT);');
	var ptrans = alasql.promise('SELECT MATRIX * FROM CSV("data/TRANS-TRANS.csv", {headers: true})').then(
			function(transs) {
				for (var i = 0; i < transs.length; i++) {
					var trans = transs[i];
					alasql('INSERT INTO trans VALUES(?,?,?,?,?,?,?,?,?);', trans);
				}
			});
	
	//password
    alasql('DROP TABLE IF EXISTS pass;');
    alasql('CREATE TABLE pass(userid STRING IDENTITY, password STRING,name STRING);');
    var ppass = alasql.promise('SELECT MATRIX * FROM CSV("data/PASS-PASS.csv",{headers:true})').then(
           function(passs){
        	   for (var i=0;i<passs.length;i++){
        		   var pass = passs[i];
        		   alasql('INSERT INTO pass VALUES(?,?,?);',pass);
        	   }
           });
    
    // snb 
    alasql('DROP TABLE IF EXISTS snb');
    alasql('CREATE TABLE snb(ID INT IDENTITY,SITEM INT,WWHOUSE INT,KDATE DATE,JDATE DATE,QUA INT,NOS INT,KYEAR INT,KMONTH INT,KDAY INT,JYEAR INT,JMONTH INT,JDAY INT,MEMO STRING)');
    var psnb = alasql.promise('select MATRIX * FROM CSV("data/SNB-SNB.csv",{headers:true})').then(
    	function (snbs){
    		for (var i=0;i<snbs.length;i++){
    			var snb = snbs[i];
    			alasql('INSERT INTO snb VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',snb);
    		}
    	});
    
    //future - only for in
    alasql('DROP TABLE IF EXISTS future');
    alasql('CREATE TABLE future(id INT IDENTITY, stock INT, date DATE, qty INT, balance INT, memo STRING, year INT, month INT, day INT);');
    var pfuture = alasql.promise('SELECT MATRIX * FROM CSV("data/FUTURE-FUTURE.csv", {headers: true})').then(
			function(futures) {
				for (var i = 0; i < futures.length; i++) {
					var trans = futures[i];
					alasql('INSERT INTO future VALUES(?,?,?,?,?,?,?,?,?);', trans);
				}
			});
    // jisai - only for in
    alasql('DROP TABLE IF EXISTS jisai');
    alasql('CREATE TABLE jisai(id INT IDENTITY, stock INT, date DATE, qty INT, memo STRING, year INT, month INT, day INT);');
    var pjisai = alasql.promise('SELECT MATRIX * FROM CSV("data/JISAI-JISAI.csv", {headers: true})').then(
			function(jisais) {
				for (var i = 0; i < jisais.length; i++) {
					var trans = jisais[i];
					alasql('INSERT INTO jisai VALUES(?,?,?,?,?,?,?,?);', trans);
				}
			});
    alasql('DROP TABLE IF EXISTS tana');
    alasql('CREATE TABLE tana(id INT IDENTITY, stock INT, balance INT);');
    var ptana = alasql.promise('SELECT MATRIX * FROM CSV("data/TANA-TANA.csv",{headers:true})').then(
    	function (tanas) {
    		for (var i=0;i<tanas.length;i++){
    			var trans = tanas[i];
    			alasql('INSERT INTO tana VALUES(?,?,?);',trans);
    		}
    	});
    
    
    
	// リロード
	Promise.all([ pkind, pitem, pwhouse, pstock, ptrans,ppass,psnb,pfuture,pjisai,ptana]).then(function() {
		window.location.reload(true);
	});
};

DB.remove = function() {
	if (window.confirm('DBが削除されます。よろしいですか？')) {
		alasql('DROP localStorage DATABASE STK')
	}
};

// 桁区切り
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// DO NOT CHANGE!
alasql.promise = function(sql, params) {
	return new Promise(function(resolve, reject) {
		alasql(sql, params, function(data, err) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

// データベース接続
try {
	alasql('ATTACH localStorage DATABASE STK;');
	alasql('USE STK;');
	// MUST ADD LINE WHEN CREATING NEW TABLE!
	alasql.options.joinstar = 'json';
	alasql('SELECT * FROM kind WHERE id = 1;');
	alasql('SELECT * FROM item WHERE id = 1;');
	alasql('SELECT * FROM whouse WHERE id = 1;');
	alasql('SELECT * FROM stock WHERE id = 1;');
	alasql('SELECT * FROM trans WHERE id = 1;');
} catch (e) {
	alasql('CREATE localStorage DATABASE STK;');
	alasql('ATTACH localStorage DATABASE STK;');
	alasql('USE STK;');
	DB.load();
}
