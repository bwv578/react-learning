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
    private int[][] board;
    private int[][] doublePushMask;
    private int[][] castleMask;
    private int[][] enPassantMask;
    private ArrayList[][] moves = new  ArrayList[8][8];

    public ChessBoard() {
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
        this.doublePushMask = new int[][]{
                {0,0,0,0,0,0,0,0},
                {1,1,1,1,1,1,1,1},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {1,1,1,1,1,1,1,1},
                {0,0,0,0,0,0,0,0},
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

    public ArrayList<int[]> getMoves(int movingPiece, int x, int y) {
        int myPiece = movingPiece%10;
        int mySide = movingPiece/10;

        int[][] curBoard = this.board;
        ArrayList<int[]> moves = new ArrayList<>();

        int target = 0;
        boolean sameSide = false;
        switch (myPiece) {
            case 0:
                break;
            case 1:
                // pawn
                if(mySide==0) {
                    moves.add(new int[] {x-1, y});
                    if(doublePushMask[x][y]==1) moves.add(new int[] {x-2, y});
                    moves.add(new int[] {x-1, y+1});
                    moves.add(new int[] {x-1, y-1});
                }else{
                    moves.add(new int[] {x+1, y});
                    if(doublePushMask[x][y]==1) moves.add(new int[] {x+2, y});
                    moves.add(new int[] {x+1, y+1});
                    moves.add(new int[] {x+1, y-1});
                }
                break;

            case 2:
                // Knight
                moves.add(new int[] {x+2, y+1});
                moves.add(new int[] {x+2, y-1});
                moves.add(new int[] {x-2, y+1});
                moves.add(new int[] {x-2, y-1});
                moves.add(new int[] {x+1, y+2});
                moves.add(new int[] {x+1, y-1});
                moves.add(new int[] {x-1, y+2});
                moves.add(new int[] {x-1, y-2});
                break;

            case 3 :
            case 5 :
                // Bishop
                // -기울기 대각선
                int yStart = x+y;
                int xStart = 0;
                if(yStart>7) {
                    xStart = yStart-7;
                    yStart = 7;
                }
                while(xStart<=7 && yStart>=0) {
                    target = curBoard[xStart][yStart];
                    sameSide = target!=0 && (target/10)==mySide;
                    if(sameSide) break;
                    if(xStart!=x) moves.add(new int[] {xStart, yStart});
                    if(target!=0) break;
                    yStart--; xStart++;
                }
                // +기울기 대각선
                xStart = 0;
                yStart = y-x;
                if(yStart<0){
                    xStart = -yStart;
                    yStart = 0;
                }
                while(xStart<=7 && yStart<=7) {
                    target = curBoard[xStart][yStart];
                    sameSide = target!=0 && (target/10)==mySide;
                    if(sameSide) break;
                    if(xStart!=x) moves.add(new int[] {xStart, yStart});
                    if(target!=0) break;
                    yStart++; xStart++;
                }

                if(myPiece==3) break;

            case 4 :
                // Rook
                for(int i=0; i<8; i++) {
                    target = curBoard[x][i];
                    sameSide = target!=0 && (target/10)==mySide;

                    if(sameSide) break;
                    if(i!=y) moves.add(new int[] {x, i});
                    if(target!=0) break;
                }
                for(int i=0; i<8; i++) {
                    target = curBoard[i][y];
                    sameSide = target!=0 && (target/10)==mySide;

                    if(sameSide) break;
                    if(i!=x) moves.add(new int[] {i, y});
                    if(target!=0) break;
                }
                break;

            case 6:
                // King
                moves.add(new int[] {x+1, y});
                moves.add(new int[] {x-1, y});
                moves.add(new int[] {x, y+1});
                moves.add(new int[] {x, y-1});
                moves.add(new int[] {x+1, y+1});
                moves.add(new int[] {x+1, y-1});
                moves.add(new int[] {x-1, y+1});
                moves.add(new int[] {x-1, y-1});

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
