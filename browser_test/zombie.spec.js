var Browser = require("zombie");
var url = "http://localhost:3000/login";
var browser = new Browser();

describe("testing with zombie", function() {
	it("should have defined headless browser", function(next){
        expect(typeof browser != "undefined").toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

    it("should visit the site and see the login form", function(next) {
        browser.visit(url, function(err) {
            expect(browser.success).toBe(true);
            expect(browser.query("input[value='Login']")).toBeDefined();
            next();
        })
    });

    it("should not be able to login with unregistered email", function(next) {
        browser
        .fill('input[name="email"]', "wrong@email.com")
        .fill('input[name="password"]', "wrongpassword")
        .pressButton('button[name="login"]', function() {
            expect(browser.html("div#failure")).toContain("Email wrong@email.com not found.");
            next();
        });
    });

    it("should not be able to login with incorrect email or password", function(next) {
        browser
        .fill('input[name="email"]', "tejakumt@indiana.edu")
        .fill('input[name="password"]', "wrongpassword")
        .pressButton('button[name="login"]', function() {
            expect(browser.html("div#failure")).toContain("Invalid email or password.");
            next();
        });
    });

    it("should be able to login with correct credentials", function(next) {
        browser
        .fill('input[name="email"]', "tejakumt@indiana.edu")
        .fill('input[name="password"]', "abc123")
        .pressButton('button[name="login"]', function(res) {
            expect(browser.html("div#success")).toContain("Success! You are logged in.");
            next();
        });
    });

    it("should be able to visit add an expense page", function(next) {
        browser.visit("http://localhost:3000/expense", function(err) {
            expect(browser.success).toBe(true);
            next();
        });
    });

    it("should be able to add an expense", function(next) {
        browser
        .fill('input[name="amount"]', 12.01)
        .fill('input[name="description"]', "Test Expense")
        .fill('input[name="createdAt"]', "04/18/2017")
        .pressButton('button[name="add"]', function(res) {
            expect(browser.html("div#success")).toContain("Expense has been added.");
            next();
        });
    });

    it("should be able to visit an expense page", function(next) {
        browser.visit("http://localhost:3000/expense/58f6e69c9496ad5443f84ac4", function(err) {
            expect(browser.success).toBe(true);
            next();
        });
    });

    it("should be able to edit an expense", function(next) {
        browser
        .fill('input[name="amount"]', 13.02)
        .fill('input[name="description"]', "Test Expense Updated")
        .pressButton('button[name="update"]', function(res) {
            expect(browser.html("div#success")).toContain("Expense has been updated.");
            next();
        });
    });

    //Delete expense works perfectly, but will have to change expense id in the url to run tests later.
    //uncomment and use accordingly, Please update expense url accordingly.
    
    /*
    it("should be able to delete an expense", function(next) {
        browser
        .pressButton('button[name="delete"]', function(res) {
            expect(browser.html("div#success")).toContain("Expense has been deleted.");
            next();
        });
    });
    */

});