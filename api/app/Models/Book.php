<?php
namespace API\Models;

class Book extends Product {
    public function __construct($sku, $name, $price) {
        parent::__construct($sku, $name, $price);
        $this->productType = "Book";
    }

    public function setAttribute($data) {
        $this->attribute = "Weight: $data->weight kg";
    }
}