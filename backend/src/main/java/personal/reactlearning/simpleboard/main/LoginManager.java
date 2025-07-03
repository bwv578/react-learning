package personal.reactlearning.simpleboard.main;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import personal.reactlearning.simpleboard.main.domain.User;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

public class LoginManager {
    private LoginManager (){};

    /** loggedInUsers
     * k: session id
     * v: User
     */
    private static final ConcurrentHashMap<HttpSession, User> loggedInUsers = new ConcurrentHashMap<>();
    public static void registerUser(HttpSession session, User user){
        loggedInUsers.put(session, user);
    }
    public static void removeUser(HttpSession session){
        loggedInUsers.remove(session);
    }
    public static User getCurrentUser(HttpServletRequest req){
        return loggedInUsers.get(req.getSession());
    };
    public static int getCurrentUserCode(HttpServletRequest req){
        User currentUser = getCurrentUser(req);
        if(currentUser==null) return 0;
        return currentUser.getUserCode();
    }
    public static int getLoginStatus(HttpServletRequest req){
        if(getCurrentUser(req)==null) return 0;
        return 1;
    }
}
