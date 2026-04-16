package com.sujan.ecommerce.service;

import com.sujan.ecommerce.config.JwtRequestFilter;
import com.sujan.ecommerce.model.*;
import com.sujan.ecommerce.repository.OrderDetailRepository;
import com.sujan.ecommerce.repository.ProductRepository;
import com.sujan.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderDetailService {

    private static final String ORDER_PLACE = "Placed";

    private final OrderDetailRepository orderDetailRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public void placeOrder(OrderInput orderInput) {
        List<OrderProductQuantity> orderProductQuantityList = orderInput.getOrderProductQuantityList();

        for(OrderProductQuantity orderProductQuantity : orderProductQuantityList) {
            Product product = productRepository.findById(orderProductQuantity.getProductId()).get();

            String currentUser = JwtRequestFilter.CURRENT_USER;
            User user = userRepository.findById(currentUser).get();

            OrderDetail orderDetail = new OrderDetail(
                    orderInput.getFullName(),
                    orderInput.getFullAddress(),
                    orderInput.getContactNumber(),
                    orderInput.getAlternateContactNumber(),
                    ORDER_PLACE,
                    product.getProductActualPrice() *  orderProductQuantity.getOrderQuantity(),
                    product,
                    user
            );

            orderDetailRepository.save(orderDetail);
        }
    }
}
