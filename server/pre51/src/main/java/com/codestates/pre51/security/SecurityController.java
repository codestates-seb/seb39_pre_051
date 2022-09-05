package com.codestates.pre51.security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/security")
public class SecurityController {
    private final SecurityService securityService;

    public SecurityController(SecurityService securityService) {
        this.securityService = securityService;
    }

    @GetMapping("/create/token")
    public Map<String,Object> createToken(@RequestParam(value="subject") String subject){
        String token = securityService.createToken(subject,(2*1000*60));
        Map<String,Object> map = new LinkedHashMap<>();
        map.put(subject,token);
        return map;
    }

    @GetMapping("/get/subject")
    public Map<String,Object> getSubject(@RequestParam(value="token") String token){
        String subject = securityService.getSubject(token);
        Map<String,Object> map = new LinkedHashMap<>();
        map.put("result",subject);
        return map;
    }
}
