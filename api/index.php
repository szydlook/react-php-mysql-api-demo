<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

use API\Controllers\ProductController;
use API\Router\Router;

require_once __DIR__ . "/autoload.php";

$router = new Router();
$router->addRoute("get", "list", [ProductController::class, "list"]);
$router->addRoute("post", "add", [ProductController::class, "add"]);
$router->addRoute("post", "delete", [ProductController::class, "delete"]);
$router->dispatch();
