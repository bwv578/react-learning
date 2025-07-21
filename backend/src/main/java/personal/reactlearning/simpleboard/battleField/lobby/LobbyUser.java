package personal.reactlearning.simpleboard.battleField.lobby;

import lombok.Data;
import personal.reactlearning.simpleboard.auth.domain.User;

@Data
public class LobbyUser extends User {
    private int status;
    private String message;
    private Boolean myself;
    private String gameId;

    public LobbyUser patchUserInfo(User userInfo){
        this.userCode = userInfo.getUserCode();
        this.name = userInfo.getName();
        this.id = userInfo.getId();
        this.sessionId = userInfo.getSessionId();
        return this;
    }
}
