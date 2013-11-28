pagerank-evaluation
===================
This is Employee Evaluation Tool which is tried to compute by PageRank Algorithm.

## Required
node.js

## Install 

```
$ npm install -g pagerank-evaluation
```


## Input data
    {
        "tanaka_taro":[
    			{"dest":"kataoka_michio", "weight":8},
    			{"dest":"takemoto_michiko", "weight":5},
    			{"dest":"hachiuma_yoshiko", "weight":3}
    		    ],
        "kataoka_michio":[
    			{"dest":"tanaka_taro", "weight":8},
    			{"dest":"hachiuma_yoshiko", "weight":5},
    			{"dest":"morishita_shinji", "weight":3}
    		    ],
        "nakai_miho":[
    			{"dest":"morishita_shinji", "weight":8},
    			{"dest":"hachiuma_yoshiko", "weight":5},
    			{"dest":"takemoto_michiko", "weight":3}
    		    ],
        "morishita_shinji":[
    			{"dest":"kataoka_michio", "weight":8},
    			{"dest":"tanaka_taro", "weight":5},
    			{"dest":"hachiuma_yoshiko", "weight":3}
    		    ],
        "takemoto_michiko":[
    			{"dest":"tanaka_taro", "weight":8},
    			{"dest":"morishita_shinji", "weight":5},
    			{"dest":"hachiuma_yoshiko", "weight":3}
    		    ]
    }
This data specify tanaka_taro vote to kataoka_michio,  takemoto_michiko, hachiuma_yoshiko.  
weight property is vote weight.  
vote weight can be set with no limit. when compute vote weight, it will compute relative from amount vote weight.  

## execute

execute command line.  

```
$ pagerank-evaluation --src {data json file path}
tanaka_taro:0.6633301730387455
kataoka_michio:0.6038515957681376
morishita_shinji:0.4033105890758094
takemoto_michiko:0.3503446853603615
nakai_miho:0.15000000000000002
```

### command option

```
$ pagerank-evaluation --help

  Usage: pagerank-evaluation [options]

  Options:

    -h, --help      output usage information
    -V, --version   output the version number
    -s --src <src>  Read data file path
```
