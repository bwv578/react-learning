package personal.reactlearning.simpleboard.main.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import personal.reactlearning.simpleboard.main.domain.User;
import personal.reactlearning.simpleboard.main.mapper.MainMapper;

import javax.sql.DataSource;

@Controller
public class MainController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    private MainMapper mainMapper;

    @RequestMapping("/")
    public String main(){
        return "redirect:http://localhost:3000";
    }

    @PostMapping("/signup")
    @ResponseBody
    public String signUp(@RequestBody User user){
        System.out.println(user);
        return "{\"result\":1}";
    }

    @PostMapping("/signin")
    @ResponseBody
    public String signIn(@RequestBody User user){
        System.out.println(user);
        mainMapper.insertTest();
        return "{\"result\":1}";
    }
}
