// Write selenium javascript page object model code to test the comments.js code.

var webdriver = require('selenium-webdriver');
var assert = require('assert');
var By = webdriver.By;

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

var CommentsPage = function() {
  this.comments = [];
};

CommentsPage.prototype.getComments = function() {
  driver.get('http://localhost:3000/comments');
  driver.wait(function() {
    return driver.findElement(By.tagName('body')).getText().then(function(text) {
      this.comments = JSON.parse(text);
      return this.comments.length > 0;
    });
  }, 10000);
};

CommentsPage.prototype.addComment = function(comment) {
  driver.get('http://localhost:3000/comments');
  driver.findElement(By.tagName('input')).sendKeys(comment);
  driver.findElement(By.tagName('button')).click();
  driver.wait(function() {
    return driver.findElement(By.tagName('body')).getText().then(function(text) {
      return text.indexOf(comment) > -1;
    });
  }, 10000);
};

var commentsPage = new CommentsPage();
commentsPage.getComments();
assert(commentsPage.comments.length > 0, 'Expected comments to be greater than 0');
commentsPage.addComment('Hello World');
assert(commentsPage.comments.length === 1, 'Expected comments to be 1');
assert(commentsPage.comments[0] === 'Hello World', 'Expected first comment to be "Hello World"');

driver.quit();
