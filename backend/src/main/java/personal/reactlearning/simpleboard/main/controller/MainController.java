package personal.reactlearning.simpleboard.main.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import personal.reactlearning.simpleboard.main.LoginManager;
import personal.reactlearning.simpleboard.main.domain.User;
import personal.reactlearning.simpleboard.main.mapper.MainMapper;

import java.util.HashMap;
import java.util.Map;

@Controller
public class MainController {

    @Autowired
    JdbcTemplate jdbcTemplate;
    @Autowired
    private MainMapper mainMapper;

    @RequestMapping("/")
    public String main(HttpServletRequest req, HttpServletResponse res){
        if(LoginManager.getCurrentUser(req)!=null) return "redirect:http://localhost:3000/articles";
        return "redirect:http://localhost:3000";
    }

    @GetMapping("/loginStatus")
    @ResponseBody
    public int getLoginStatus(HttpServletRequest req){
        return LoginManager.getLoginStatus(req);
    }

    @PostMapping("/signup")
    @ResponseBody
    public int signUp(@RequestBody User user){
        return mainMapper.insertUser(user);
    }

    @PostMapping("/signin")
    @ResponseBody
    public Map signIn(@RequestBody User guest, HttpServletRequest req, HttpServletResponse res){
        HashMap<String, Object> resultMap = new HashMap<>();
        User member = mainMapper.selectUser(guest);

        int result = member==null? -1 : 1;
        String username = member==null? "unknown" : member.getName();
        if(result==1) LoginManager.registerUser(req.getSession(), member);

        resultMap.put("result", result);
        resultMap.put("username", username);
        return resultMap;
    }

    @GetMapping("/logout")
    public int logout(HttpServletRequest req, HttpServletResponse res){
        LoginManager.removeUser(req.getSession());
        return 1;
    }
}
