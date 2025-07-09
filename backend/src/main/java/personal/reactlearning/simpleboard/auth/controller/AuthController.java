package personal.reactlearning.simpleboard.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import personal.reactlearning.simpleboard.auth.service.AuthService;
import personal.reactlearning.simpleboard.auth.util.LoginManager;
import personal.reactlearning.simpleboard.auth.domain.User;
import personal.reactlearning.simpleboard.auth.mapper.AuthMapper;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    JdbcTemplate jdbcTemplate;
    @Autowired
    private AuthMapper authMapper;
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public int signUp(@RequestBody User user){
        return authMapper.insertUser(user);
    }

    @PostMapping("/signin")
    public Map<String, Object> signIn(@RequestBody User guest, HttpServletRequest req, HttpServletResponse res){
        HashMap<String, Object> resultMap = new HashMap<>();
        User member = authMapper.selectUser(guest);
        if(member!=null) LoginManager.registerUser(req.getSession(), member);
        return authService.getLoginStatus(req);
    }

    @GetMapping("/loginStatus")
    public Map<String, Object> getLoginStatus(HttpServletRequest req){
        return authService.getLoginStatus(req);
    }

    @GetMapping("/logout")
    public int logout(HttpServletRequest req, HttpServletResponse res){
        LoginManager.removeUser(req.getSession());
        return 1;
    }
}
