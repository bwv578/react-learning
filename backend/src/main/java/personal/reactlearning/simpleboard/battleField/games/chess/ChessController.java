package personal.reactlearning.simpleboard.battleField.games.chess;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;
import personal.reactlearning.simpleboard.auth.domain.User;
import personal.reactlearning.simpleboard.auth.util.LoginManager;
import personal.reactlearning.simpleboard.battleField.lobby.LobbyManager;
import personal.reactlearning.simpleboard.battleField.lobby.LobbyUser;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/battleField/chess")
public class ChessController {

    private static ConcurrentHashMap<String, ChessGame> chessGames = new ConcurrentHashMap<>();

    @GetMapping("/chessBoard")
    public Map<String, Object> chessBoard(@RequestParam int pending, HttpServletRequest req) {

        Map<String, Object> result = new HashMap<>();
        User user = LoginManager.getCurrentUser(req);
        LobbyUser requester = LobbyManager.getUser(user.getId());
        ChessGame chessGame = chessGames.get(requester.getGameId());

        synchronized (chessGame){
            try {
                if(chessGame.getStatus()==0 || pending==1){
                    chessGame.wait();
                }
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }

        result.put("board", chessGame.getBoard());
        result.put("moves", chessGame.getMoves());
        return result;
    }

    @PostMapping("/randomJoin")
    public Map<String, Object> join(HttpServletRequest req, HttpServletResponse res){
        HashMap<String, Object> resultMap = new HashMap<>();

        User user = LoginManager.getCurrentUser(req);
        LobbyUser requester = LobbyManager.getUser(user.getId());
        if(requester==null) {
            resultMap.put("MSG", "DENIED");
            return resultMap;
        };
        if(requester.getStatus()==0 && requester.getGameId()!=null) {
            resultMap.put("MSG", "WAITING");
            return resultMap;
        };
        if(requester.getStatus()==1){
            resultMap.put("MSG", "MATCHED");
            ChessGame chessGame = chessGames.get(requester.getGameId());
            resultMap.put("board", chessGame.getBoard());
            resultMap.put("moves", chessGame.getMoves());
            return resultMap;
        }

        for(ChessGame chessGame : chessGames.values()){
            if(chessGame.getStatus()==0) {
                synchronized (chessGame){
                    try {
                        chessGame.getUsers().add(requester);
                        chessGame.setStatus(1);
                        requester.setGameId(chessGame.getGameId());
                        requester.setStatus(1);
                        chessGame.notifyAll();

                        resultMap.put("MSG", "MATCHED");
                        resultMap.put("board", chessGame.getBoard());
                        resultMap.put("moves", chessGame.getMoves());
                        return resultMap;
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        }

        String gameId = String.valueOf(System.currentTimeMillis());
        chessGames.put(gameId, new ChessGame(gameId));
        requester.setGameId(gameId);
        resultMap.put("MSG", "WAITING");
        return resultMap;
    }

    @PostMapping("/move")
    public boolean move(@RequestBody Map<String, int[]> instruction, HttpServletRequest req) {
        User user = LoginManager.getCurrentUser(req);
        LobbyUser requester = LobbyManager.getUser(user.getId());
        ChessGame chessGame = chessGames.get(requester.getGameId());

        synchronized (chessGame) {
            try {
                boolean result = chessGame.move(instruction.get("from"), instruction.get("to"));
                chessGame.notifyAll();
                return result;
            } catch (Exception e) {
                return false;
            }
        }
    }

}
