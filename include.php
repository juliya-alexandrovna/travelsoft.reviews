<?php

\Bitrix\Main\Loader::includeModule("iblock");

$classes = array(
    
    "travelsoft\\reviews\\Statistics" => "lib/Statistics.php",
    "travelsoft\\reviews\\Reviews" => "lib/Reviews.php",
    "travelsoft\\reviews\\Cache" => "lib/Cache.php"
);
CModule::AddAutoloadClasses("travelsoft.reviews", $classes);

if (!function_exists("dm")) {
    function dm($var) {
        echo "<pre>";print_r($var);echo "</pre>";
    }
}