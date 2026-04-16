package com.sujan.ecommerce.controller;

import com.sujan.ecommerce.model.Role;
import com.sujan.ecommerce.service.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/role"})
@AllArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @PostMapping
    public Role createNewRole(@RequestBody Role role) {
        return  roleService.createNewRole(role);
    }
}
