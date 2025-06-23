package personal.reactlearning.simpleboard.main.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import personal.reactlearning.simpleboard.main.domain.User;

@Controller
public class MainController {

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
        return "{\"result\":1}";
    }
}


