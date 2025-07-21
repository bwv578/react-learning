package personal.reactlearning.simpleboard.battleField.games.chess;

import lombok.Data;
import personal.reactlearning.simpleboard.battleField.games.Game;

import java.util.ArrayList;
import java.util.Arrays;

@Data
public class ChessGame extends Game {

    /**
     * 0: empty

     * 0x: white
     * 1x: black

     * X1: pawn
     * X2: Knight
     * X3: Bishop
     * X4: Rook
     * X5: Queen
     * X6: King
     */
    private int[][] board;
    private int[][] doublePushMask;
    private int[][] castleMask;
    private int[][] enPassantMask;
    private ArrayList<int[]>[][] moves = new ArrayList[8][8];

    private static final int[][][] directionVectors = new int[][][] {
            {}, // 0
            {}, // pawn X
            {{1, 2}, {1, -2}, {-1, 2}, {-1, -2}, {2, 1}, {2, -1}, {-2, 1}, {-2, -1}}, //knight
            {{1, 1}, {1, -1}, {-1, 1}, {-1, -1}}, //bishop
            {{1, 0}, {0, 1}, {-1, 0}, {0, -1}}, //rook
            {{1, 1}, {1, -1}, {-1, 1}, {-1, -1}, {1, 0}, {0, 1}, {-1, 0}, {0, -1}}, //queen
            {{1, 1}, {1, -1}, {-1, 1}, {-1, -1}, {1, 0}, {0, 1}, {-1, 0}, {0, -1}} //king
    };
    private static final int[] scopes = new int[]{0, 1, 1, 8, 8, 8, 1};

    public ChessGame() {
        super();
    }
    public ChessGame(String gameId) {
        super(gameId);
        this.board = new int[][]{
                {14, 13, 12, 15, 16, 12, 13, 14},
                {11, 11, 11, 11, 11, 11, 11, 11},
                { 0,  0,  0,  0,  0,  0,  0,  0},
                { 0,  0,  0,  0,  0,  0,  0,  0},
                { 0,  0,  0,  0,  0,  0,  0,  0},
                { 0,  0,  0,  0,  0,  0,  0,  0},
                { 1,  1,  1,  1,  1,  1,  1,  1},
                { 4,  3,  2,  5,  6,  2,  3,  4},
        };
        this.castleMask = new int[][]{
                {1,0,0,0,1,0,0,1},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {1,0,0,0,1,0,0,1},
        };
        this.enPassantMask = new int[][]{
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
        };
        calc();
    }

    public boolean move(int[]from, int[] to) {
        boolean possibleMove = this.moves[from[0]][from[1]].stream()
                .anyMatch(move -> move[0] == to[0] && move[1] == to[1]);

        if (!possibleMove) return false;
        this.board[to[0]][to[1]] = this.board[from[0]][from[1]];
        this.board[from[0]][from[1]] = 0;
        calc();
        return true;
    }

    public ArrayList<int[]> getMoves(int movingPiece, int x, int y) {
        ArrayList<int[]> moves = new ArrayList<>();
        int myPiece = movingPiece%10;
        int mySide = movingPiece/10;
        int[][] vectors = directionVectors[myPiece];
        int scope = scopes[myPiece];

        switch (myPiece){
            case 0:
                break;
            case 1:
                // pawn
                if(mySide==1) {
                    if(x<7 && this.board[x+1][y]==0) {
                        moves.add(new int[]{x+1, y});
                        if(x==1 && this.board[x+2][y]==0) {
                            moves.add(new int[]{x+2, y});
                        }
                    }
                }else{
                    if(x>0 && this.board[x-1][y]==0) {
                        moves.add(new int[]{x-1, y});
                        if(x==6 && this.board[x-2][y]==0) {
                            moves.add(new int[]{x-2, y});
                        }
                    }
                }
                break;

            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                for(int[] vector : vectors) {
                    for(int step=1; step<=scope; step++) {
                        int[] location = new int[] {x+vector[0]*step, y+vector[1]*step};
                        if(location[0]<0 || location[0]>7 || location[1]<0 || location[1]>7) break;

                        int target = this.board[location[0]][location[1]];
                        if(target!=0){
                            if(target/10==mySide) break;
                            moves.add(location);
                            break;
                        }
                        moves.add(location);
                    }
                }
                break;

            default:
                throw new IllegalArgumentException();

        }

        return moves;
    }

    protected ArrayList[][] calc(){
        for(int i=0; i<8; i++) {
            for(int j=0; j<8; j++) {
                this.moves[i][j] = getMoves(this.board[i][j], i, j);
            }
        }
        return this.moves;
    }

}
