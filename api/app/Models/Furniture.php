<?php
namespace API\Models;

class Furniture extends Product {
    public function __construct($sku, $name, $price) {
        parent::__construct($sku, $name, $price);
        $this->productType = "Furniture";
    }

    public function setAttribute($data) {
        $this->attribute = "Dimension: {$data->height}x{$data->width}x{$data->length} cm";
    }
}