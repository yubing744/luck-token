var LuckToken = artifacts.require("./LuckToken.sol");

contract('LuckToken', function(accounts) {
	var luckToken;

    beforeEach(function(done) {
        LuckToken.deployed().then(function(instance) {
			luckToken = instance;
			done();
        });
	});
	
	describe("#symbol", function(){
		it("symbol should be LUCK", function(done) {
			luckToken.symbol().then(function(text) {
				expect(text).to.equal("LUCK");
				done();
			});
		});
	});

	describe("#name", function(){
		it("name should be Ok", function(done) {
			luckToken.name().then(function(text) {
				expect(text).to.equal("幸运币");
				done();
			});
		});
	});

	describe("#buy", function(){
		it("buy 1 ether should be Ok", function(done) {
			var amount = "1";

			luckToken.buy({from: accounts[1], gas: 1000000, value: web3.toWei(amount, "ether")}).then(function(text) {
				return luckToken.balanceOf(accounts[1]);
			}).then(function(val){
				expect(val.toNumber()).to.equal(10000);
				
				return luckToken.balanceOf(accounts[0]);
			}).then(function(val){
				expect(val.toNumber()).to.equal(999999999 - 10000);
				done();
			});
		});

		it("buy less than 0.0001 ether should Fail", function(done) {
			var amount = "0.00009";

			luckToken.buy({from: accounts[1], gas: 1000000, value: web3.toWei(amount, "ether")}).then(function(text) {
				return luckToken.balanceOf(accounts[1]);
			}).catch(function(e){
				done();
			});
		});
	});

	describe("#bless", function(){
		it("bless 'No Bug!' should be Ok", function(done) {
			var amount = "1";

			luckToken.buy({from: accounts[2], gas: 1000000, value: web3.toWei(amount, "ether")}).then(function(txid){
				return luckToken.bless("No Bug!", 20, {from: accounts[2], gas: 1000000});
			}).then(function(txid){
				return luckToken.balanceOf(accounts[2]);
			}).then(function(val){
				expect(val.toNumber()).to.equal(9980);
				done();
			});
		});

		it("bless 'No Bug!', but no LUCK Token should fail", function(done) {
			var amount = "1";

			luckToken.bless("No Bug!", 20, {from: accounts[3], gas: 1000000}).catch(function(e){
				done();
			});
		});
	});

	describe("#fallback", function(){
		it("buy 1 ether should be Ok", function(done) {
			var amount = "1";

			web3.eth.sendTransaction({
				from: accounts[3], 
				to: luckToken.address, 
				value: web3.toWei(amount, "ether"),
				gas: 1000000
			});

			luckToken.balanceOf(accounts[3]).then(function(val){
				expect(val.toNumber()).to.equal(10000);
				done();
			});
		});
	});
	
});