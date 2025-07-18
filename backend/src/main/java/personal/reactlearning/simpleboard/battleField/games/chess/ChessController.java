package personal.reactlearning.simpleboard.battleField.games.chess;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/battleField/chess")
public class ChessController {

    @GetMapping("/chessBoard")
    public Map<String, Object> chessBoard() {
        Map<String, Object> result = new HashMap<>();
        result.put("board", new ChessBoard().getBoard());
        result.put("moves", new ChessBoard().calc());

        return result;
    }

}
