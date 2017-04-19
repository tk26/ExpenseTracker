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
});