package com.sujan.ecommerce.controller;

import com.sujan.ecommerce.dto.JwtRequest;
import com.sujan.ecommerce.dto.JwtResponse;
import com.sujan.ecommerce.service.JwtService;
import com.sujan.ecommerce.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@AllArgsConstructor
public class JwtController {

    private final JwtUtil jwtUtil;
    private final JwtService jwtService;

    @PostMapping({"/authenticate"})
    public JwtResponse createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        return jwtService.createJwtToken(jwtRequest);

    }
}
