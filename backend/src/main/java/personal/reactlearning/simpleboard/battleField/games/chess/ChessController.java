package personal.reactlearning.simpleboard.battleField.games.chess;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/battleField/chess")
public class ChessController {

    @GetMapping("/chessBoard")
    public String chessBoard() {
        return "chessBoard";
    }
}
