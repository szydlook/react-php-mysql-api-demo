<?php
namespace API\Models;

class DVD extends Product {
    public function __construct($sku, $name, $price) {
        parent::__construct($sku, $name, $price);
        $this->productType = "DVD";
    }

    public function setAttribute($data) {
        $this->attribute = "Size: $data->size MB";
    }
}