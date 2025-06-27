package personal.reactlearning.simpleboard.main;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import personal.reactlearning.simpleboard.main.domain.User;

import java.util.HashMap;

public class LoginManager {
    private static LoginManager instance;
    private LoginManager (){};
    public static LoginManager getInstance(){
        if(instance==null) instance = new LoginManager();
        return instance;
    }

    /** loggedInUsers
     * k: session id
     * v: User
     */
    private static volatile HashMap<HttpSession, User> loggedInUsers = new HashMap<>();
    public static synchronized void registerUser(HttpSession session, User user){
        loggedInUsers.put(session, user);
    }
    public synchronized void removeUser(HttpSession session, User user){
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
}
