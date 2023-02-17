<?php
namespace API\Models;

abstract class Product extends BaseModel {
    protected $sku = null;
    protected $name = null;
    protected $price = null;
    protected $productType = null;
    protected $attribute = null;

    public function __construct($sku, $name, $price) {
        $this->table = "product";
        parent::__construct($this->table);
        
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
    }

    abstract function setAttribute($data);
    
    public function save() {
        try {
            $statement = $this->connection->prepare("INSERT INTO $this->table (sku, name, price, type, attribute) VALUES (?, ?, ?, ?, ?)");
            $statement->bind_param("ssdss", $this->sku, $this->name, $this->price, $this->productType, $this->attribute);    
            $statement->execute();
            $statement->close();
            return ["status" => "success", "message" => "Record created successfully"];
        } catch (\mysqli_sql_exception $e) {
            if ($e->getCode() == 1062) {
                return ["status" => "duplicate", "message" => "Duplicate entry"];
            } else {
                die(json_encode(["status" => "error", "message" => $e->getMessage()]));
            }
        }
    }
}