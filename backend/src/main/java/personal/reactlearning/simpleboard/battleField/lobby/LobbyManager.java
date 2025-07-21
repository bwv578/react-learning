package personal.reactlearning.simpleboard.battleField.lobby;

import personal.reactlearning.simpleboard.battleField.games.Game;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

public class LobbyManager {

    private static final ConcurrentHashMap<String, LobbyUser> lobbyUsers = new ConcurrentHashMap<>();
    private static final ConcurrentHashMap<String, Game> games = new ConcurrentHashMap<>();

    public static int putLobbyUser(LobbyUser newUser){
        try {
            lobbyUsers.put(newUser.getId(), newUser);
            return 1;
        }catch (Exception e){
            return -1;
        }
    }
    public static int removeLobbyUser(String userId){
        try {
            lobbyUsers.remove(userId);
            return 1;
        }catch (Exception e){
            return -1;
        }
    }

    public static LobbyUser getUser(String userId){
        return lobbyUsers.get(userId);
    }
    public static ArrayList<LobbyUser> getUsers(){
        return new ArrayList<>(lobbyUsers.values());
    }

    public static Game getGame(String gameId){
        return games.get(gameId);
    }
}
