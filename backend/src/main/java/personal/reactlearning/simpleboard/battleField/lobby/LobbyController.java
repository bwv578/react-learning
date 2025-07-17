package personal.reactlearning.simpleboard.battleField.lobby;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;
import personal.reactlearning.simpleboard.auth.util.LoginManager;

import java.util.List;

@RestController
@RequestMapping("/battlefield/api/lobby")
public class LobbyController {

    @GetMapping("/users")
    public List<LobbyUser> getUsers(HttpServletRequest req, HttpServletResponse res){
        return LobbyManager.getUsers();
    }

    @PostMapping("/users")
    public int putUser(@RequestBody LobbyUser newbie, HttpServletRequest req,
                        HttpServletResponse res){
        newbie.patchUserInfo(LoginManager.getCurrentUser(req));
        return LobbyManager.putLobbyUser(newbie);
    }

    @DeleteMapping("/users")
    public int removeUser(HttpServletRequest req, HttpServletResponse res){
        return LobbyManager.removeLobbyUser(
                LoginManager.getCurrentUser(req).getId()
        );
    }

}

