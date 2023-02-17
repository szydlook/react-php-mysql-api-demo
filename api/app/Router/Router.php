<?php
namespace API\Router;

class Router {
    protected $routes = [[]];

    public function addRoute($method, $path, $action) {
        $this->routes[$method][$path] = $action;
    }

    public function dispatch() {
        $method = strtolower($_SERVER['REQUEST_METHOD']);
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $action = $this->routes[$method][$path[2]] ?? null;
        if ($action != null) {
            $action[0] = new $action[0];
            call_user_func($action);
        } else {
            //
        }
    }
}