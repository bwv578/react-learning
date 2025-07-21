package personal.reactlearning.simpleboard.battleField.games;

import lombok.Data;
import personal.reactlearning.simpleboard.battleField.lobby.LobbyUser;

import java.util.ArrayList;
import java.util.List;

@Data
public class Game {
    protected String gameId;
    protected int status;
    protected int capacity=2;
    protected int version=0;
    protected List<LobbyUser> users;

    public Game() {
        this.gameId = System.currentTimeMillis() + "";
        this.status = 0;
        this.users = new ArrayList<>();
    }
    public Game(String gameId) {
        this.gameId = gameId;
        this.status = 0;
        this.users = new ArrayList<>();
    }
}
