package personal.reactlearning.simpleboard.auth.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import personal.reactlearning.simpleboard.auth.domain.User;
import personal.reactlearning.simpleboard.auth.util.LoginManager;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    public Map<String, Object> getLoginStatus(HttpServletRequest req){
        User user = LoginManager.getCurrentUser(req);
        boolean isLoggedIn = user!=null;

        HashMap<String, Object> payload = new HashMap<>();
        payload.put("isLoggedIn", isLoggedIn);
        payload.put("username", isLoggedIn? user.getName() : "");

        return payload;
    }
}