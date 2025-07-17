package personal.reactlearning.simpleboard.battleField.games.chess;

import lombok.Data;

import java.util.ArrayList;

@Data
public class ChessBoard {

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
    private int[][] board = new int[8][8];

    public ChessBoard() {
        this.board = new int[][]{
                {14, 13, 12, 15, 16, 12, 13, 14},
                {11, 11, 11, 11, 11, 11, 11, 11},
                { 0,  0,  0,  0,  0,  0,  0,  0},
                { 0,  0,  0,  0,  0,  0,  0,  0},
                { 0,  0,  0,  0,  0,  0,  0,  0},
                { 0,  0,  0,  0,  0,  0,  0,  0},
                { 1,  1,  1,  1,  1,  1,  1,  1},
                { 4,  3,  2,  5,  6,  2,  3,  4}
        };
    }

    public boolean move(int[]from, int[] to) {
        int prevP = this.board[from[0]][from[1]];
        int nextP = this.board[to[0]][to[1]];

        /** Apply rules */
        if((prevP/10) == (nextP/10)) return false;

        // 실제 행마
        this.board[to[0]][to[1]] = this.board[from[0]][from[1]];
        this.board[from[0]][from[1]] = 0;
        return true;
    }


    public int[][] getMoves(int movingPiece, int x, int y) {
        int team = movingPiece/10;
        int piece = movingPiece%10;
/*
        int target = this.board[x][y];

        int opPiece = target%10;
        int opTeam = target/10;*/

        switch (piece) {
            case 1:
                // pawn
                if(team==0) return new int[][]{
                        {x-1, y},
                        {x-2, y},
                        {x-1, y+1},
                        {x-1, y-1}
                };

                return new int[][]{
                        {x+1, y},
                        {x+2, y},
                        {x+1, y+1},
                        {x+1, y-1}
                };

            case 2:
                // Knight
                return new int[][]{
                        {x+2, y+1},
                        {x+2, y-1},
                        {x-2, y+1},
                        {x-2, y-1},
                        {x+1, y+2},
                        {x+1, y-2},
                        {x-1, y+2},
                        {x-1, y-2}
                };
            case 3:
                // Bishop
                return new int[][]{
                        {x+1, y+1},
                };
            case 4:
                // Rook
                return new int[][]{

                };
            case 5:
                // Queen
                return new int[][]{

                };
            case 6:
                // King
                return new int[][]{

                };
            default:
                throw new IllegalArgumentException();
        }
    }


   /* public ArrayList<Integer> getMoves2(int movingPiece, int[]moveTo){


        switch (movingPiece%10){
            case 1:
                // pawn

            case 2:
                // Knight
                return new int[][]{
                        {x+2, y+1},
                        {x+2, y-1},
                        {x-2, y+1},
                        {x-2, y-1},
                        {x+1, y+2},
                        {x+1, y-2},
                        {x-1, y+2},
                        {x-1, y-2}
                };
            case 3:
                // Bishop
                return new int[][]{
                        {x+1, y+1},
                };
            case 4:
                // Rook
                return new int[][]{

                };
            case 5:
                // Queen
                return new int[][]{

                };
            case 6:
                // King
                return new int[][]{

                };
            default:
                throw new IllegalArgumentException();
        }
    }*/
}
