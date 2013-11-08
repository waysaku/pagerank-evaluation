#!/usr/bin/env node

var fs = require('fs');
var commander = require('commander');
var jsonminify = require('jsonminify');
var colors = require('colors');


var VERSION = '0.0.1';


var PageRank = function(matrix, loop) {
    var d = 0.85;

    //行列の転置
    var transposed_matrix = (function() {
        var transposed = new Array();
        for(var i = 0; i < matrix.length; i++) {
            transposed[i] = new Array();
        }

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                transposed[j][i] = matrix[i][j];
            }
        }
        return transposed;
    }());


    //初回の各PageRankは1と置く
    var pagerank = (function() {
        var initial = new Array();
        for (var i = 0; i < transposed_matrix.length; i++) {
            initial[i] = 1;
        }
        return initial;
    }());

    var compute_pr = function() {
        var new_pagerank = new Array();
        for (var i = 0; i < transposed_matrix.length; i++) {
            var cals = transposed_matrix[i];

            var refs_pr = 0;
            for (var j = 0; j < cals.length; j++) {
                if (cals[j] > 0) {
                    refs_pr += pagerank[j] * cals[j];
                }
            }
            new_pagerank[i] = (1 - d) + (d * refs_pr);
        }

        pagerank = new_pagerank;
    };

    return function() {
        for (var i = 0; i < loop; i++) {
            compute_pr();
        }
        return pagerank;
    };
};

var main = exports.main = function main() {

    colors.setTheme({
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        info: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow',
        debug: 'blue',
        error: 'red',
        err: 'red',
        title: 'yellow'
    });
    commander
        .version(VERSION)
        .description('')
        .option('-s --src <src>', 'Read data file path', String)
        .parse(process.argv)
    ;
    if (!commander.src) {
        console.log('\n[ERROR] -s or --src options not found.\n\n'.err);
        process.exit(2);
    }
    var data = JSON.parse(jsonminify(fs.readFileSync(commander.src, 'utf-8')));

    //行列作成用の並び順を定義
    var sort_ctl = {};
    var sort_ctl_byName = new Array();
    var cnt = 0;
    for (var d in data) {
        sort_ctl[d] = cnt;
        sort_ctl_byName[cnt] = d;
        cnt++;
    }

    //行列構築
    var dim1_matrix = new Array();
    for (var dim1 in data) {
        var dim2_matrix = new Array();
        for(var i = 0; i < cnt; i++) {
            dim2_matrix[i] = 0;
        }

        var amount = (function() {
            var amount_cnt = 0;
            for (var i = 0; i < data[dim1].length; i++) {
                amount_cnt += data[dim1][i].weight;
            }
            return amount_cnt;
        }());

        for (var i = 0; i < data[dim1].length; i++) {
            var edge = data[dim1][i];
            dim2_matrix[sort_ctl[edge.dest]] = edge.weight / amount;
        }
        dim1_matrix[sort_ctl[dim1]] = dim2_matrix;
    }

    //debug
    //var foo = new Matrix(dim1_matrix);
    //alert(foo.Print());


    //PageRank計算
    var pr_result = new PageRank(dim1_matrix, 15)();



    var result = new Array();
    for (var i = 0; i < pr_result.length; i++) {
        result.push({"name" : sort_ctl_byName[i], "pagerank" : pr_result[i]});
    }
    result.sort(function(a, b) {
        return (a.pagerank > b.pagerank ? 1 : -1);
    }).reverse();

    var log = "";
    for (var i = 0; i < result.length; i++) {
        log += result[i].name + ":" + result[i].pagerank + "\n";
    }

    console.log(log.info);
};

main(); // run!!
