<?php
namespace API\Controllers;

class ProductController {
    public function list() {
        $model = "API\\Models\\BaseModel";
        $baseModel = class_exists($model) ? new $model("product") : die(json_encode(["message" => "Class $model does not exist"]));
        echo json_encode($baseModel->getAll());
    }

    public function add() {
        $data = json_decode(file_get_contents('php://input'));
        $model = "API\\Models\\" . $data->productType;
        $product = class_exists($model) ? new $model($data->sku, $data->name, $data->price) : die(json_encode(["message" => "Class $model does not exist"]));
        $product->setAttribute($data);
        echo json_encode($product->save());
    }

    public function delete() {
        $data = json_decode(file_get_contents('php://input'), true);
        $model = "API\\Models\\BaseModel";
        $baseModel = class_exists($model) ? new $model("product") : die(json_encode(["message" => "Class $model does not exist"]));
        echo json_encode($baseModel->delete($data));    }
}