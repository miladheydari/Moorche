var Crawler = require("crawler");
var fs = require('fs');

var c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
            console.log("func");
        } else {
            var $ = res.$;

            // $ is Cheerio by default a lean implementation of core jQuery designed
            // specifically for the server fs.writeFile("test.txt", $("title").text(),
            // function(err) {     if(err) {         return         process .stdout
            //    .write(err);     }     process     .stdout .write("The file was saved!");
            // }); msht - row - more
            // console.log($("#ctl00_dlcinemaonline").html());

            $("#ctl00_dlcinemaonline tr").each(function () {

                        $(this).trigger('touch');
            });


            $("#ctl00_dlcinemaonline tr td .showtime--items_step .showtime--items_step-header").each(function () {

                if ($(this).children().eq(0).children().eq(1).children().eq(0).text().trim() == "سینما پیروزی تهران") {
                    console.log($(this).html());

                    $(this).ready(function () {
                        $(this).click(function () {
                            console.log(($(this).text().trim() + "\r\n"));

                        });
                    });
                }
            });
        }

        done();
    }
});

function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

let q = [
    "https://cinematicket.org/?p=nfilmdetail&fid=1658&fileid=3387&t=%D9%85%D8%AA%D8%B1%DB%8C%20%D8%B4%DB%8C%D8%B4%20%D9%88%20%D9%86%DB%8C%D9%85",
];

c.queue(q);