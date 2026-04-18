package com.sujan.ecommerce.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sujan.ecommerce.model.ImageModel;
import com.sujan.ecommerce.model.Product;
import com.sujan.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addNewProduct(@RequestPart("product") String productJson,
                                           @RequestPart("imageFile") MultipartFile[] files) {
        try {
            Product product = objectMapper.readValue(productJson, Product.class);

            if (product.getProductName() == null || product.getProductName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(createErrorResponse("Product name is required"));
            }

            if (files == null || files.length == 0) {
                return ResponseEntity.badRequest().body(createErrorResponse("At least one image file is required"));
            }

            Set<ImageModel> images = uploadImages(files);
            product.setProductImages(images);
            Product savedProduct = productService.addNewProduct(product);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);

        } catch (com.fasterxml.jackson.core.JsonProcessingException e) {
            return ResponseEntity.badRequest().body(createErrorResponse("Invalid JSON format"));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Error processing files"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Server error occurred: " + e.getMessage()));
        }
    }

    private Set<ImageModel> uploadImages(MultipartFile[] multipartFiles) throws IOException {
        Set<ImageModel> imageModels = new HashSet<>();

        for (MultipartFile file : multipartFiles) {
            if (file.isEmpty()) {
                throw new IOException("Empty file detected: " + file.getOriginalFilename());
            }

            if (file.getSize() > 10 * 1024 * 1024) {
                throw new IOException("File too large: " + file.getOriginalFilename());
            }

            String contentType = file.getContentType();
            if (contentType == null || !isValidImageType(contentType)) {
                throw new IOException("Invalid file type for: " + file.getOriginalFilename());
            }

            ImageModel imageModel = new ImageModel(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            imageModels.add(imageModel);
        }

        return imageModels;
    }

    private boolean isValidImageType(String contentType) {
        return contentType.equals("image/jpeg") ||
                contentType.equals("image/jpg") ||
                contentType.equals("image/png") ||
                contentType.equals("image/gif") ||
                contentType.equals("image/webp");
    }

    private Map<String, String> createErrorResponse(String message) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Bad Request");
        error.put("message", message);
        return error;
    }

    @GetMapping
    public List<Product>  getAllProducts() {
        return productService.getAllProducts();
    }
    
    @GetMapping({"/{productId}"})
    public Product getProductDetailsById(@PathVariable("productId") Integer productId) {
        return  productService.getProductDetailsById(productId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping({"/{productId}"})
    public void deleteProductDetails(@PathVariable("productId") Integer productId) {
        productService.deleteProductDetails(productId);
    }

    @GetMapping("/getProductDetails/{isSingleProductCheckout}/{productId}")
    @PreAuthorize("hasRole('USER')")
    public List<Product> getProductDetails(@PathVariable boolean isSingleProductCheckout,
                                           @PathVariable Integer productId) {
        return productService.getProductDetails(isSingleProductCheckout, productId);
    }

}