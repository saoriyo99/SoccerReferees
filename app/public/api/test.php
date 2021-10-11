<?php
//Every variable begins with a dollar sign
$foo = "to be";
$bar = "or not to be\n";
//Dynamically typed
$num = 2;
$hel = "something " . $num;
//Print, . is to concatenate
echo $foo . " " . $bar;
//Newline doesn't always work
echo $num * $num;
//Array
$arr = [1,3,6,4,];
//Object, still an array, PHP structures
$arr2 = [
    "first" => "Kristy",
    "second" => "Thirds",
    "stuff" => "Yes"
];
// echo $arr2[first];
//Program structure is same
if (true) {
    echo "True \n";
} else {
    echo "False \n";
}

while (true) {
    break;
}

foreach($arr2 as $key => $val) {
    echo "<li>".$key." is ".$val."</li>\n"; //will never do this, html and php are separated
}

//$arr as json
echo json_encode($arr);
echo json_encode($arr2, JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR);

//PHP and JS: camelCase for variables
//Contants: UPPER_SNAKE_CASE
//PascalCase for class names
//snake_case
//kebab-case