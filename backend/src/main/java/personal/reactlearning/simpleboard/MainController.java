package personal.reactlearning.simpleboard;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import personal.reactlearning.simpleboard.auth.util.LoginManager;

@Controller
public class MainController {
    @RequestMapping("/")
    public String main(HttpServletRequest req, HttpServletResponse res){
        if(LoginManager.getCurrentUser(req)!=null) return "redirect:http://localhost:3000/community/articles";
        return "redirect:http://localhost:3000";
    }
}
