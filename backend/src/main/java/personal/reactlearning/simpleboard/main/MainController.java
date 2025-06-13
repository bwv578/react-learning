package personal.reactlearning.simpleboard.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @RequestMapping("/")
    public String main(){
        return "redirect:http://localhost:3000";
    }

}
