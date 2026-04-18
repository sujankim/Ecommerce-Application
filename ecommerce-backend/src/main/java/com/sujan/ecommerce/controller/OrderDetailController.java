package com.sujan.ecommerce.controller;

import com.sujan.ecommerce.model.OrderInput;
import com.sujan.ecommerce.repository.OrderDetailRepository;
import com.sujan.ecommerce.service.OrderDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class OrderDetailController {

    private final OrderDetailService orderDetailService;

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/placeOrder")
    public ResponseEntity<String> placeOrder(@RequestBody OrderInput orderInput){
        orderDetailService.placeOrder(orderInput);
        return ResponseEntity.ok("Order placed");
    }
}
