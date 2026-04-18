package com.sujan.ecommerce.service;

import com.sujan.ecommerce.model.Product;
import com.sujan.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product addNewProduct(Product product){
        return productRepository.save(product);
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public Product getProductDetailsById(Integer productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));
    }


    public void deleteProductDetails(@PathVariable Integer productId){
        productRepository.deleteById(productId);
    }

    public List<Product> getProductDetails(boolean isSingleProductCheckout,
                                           Integer productId) {
        if(isSingleProductCheckout){
            //we are going to buy single product

            List<Product> list = new ArrayList<>();
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));
            list.add(product);
            return list;
        }else{
            //we are going to checkout entire cart
        }

        return new ArrayList<>();
    }
}
