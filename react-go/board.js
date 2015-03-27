var Board = function(size){
	this.current_color = Board.MAGENTA;
	this.size = size;
	this.boad = this.create_board(size);
	this.last_move_passed =  false;
	this.in_atari = false;
	this.attempted_suicide = false;
};

Board.EMPTY = 0;
Board.MAGENTA = 1;
Board.CYAN = 2;


/*
	sizexsize matrix wth entries set to EMPTY
*/

Board.prototype.create_board = function(size){
	var m = [];
	for (var i = 0; i < size; i++)
	{
		m[i] = [];
		for (var j = 0; j < size; j++)
			m[i][j] = Board.EMPTY;
	}
	return m;
};

/* switch players*/

Board.prototype.switch_player = function() {
	this.current_color = 
		this.current_color == Board.MAGENTA ? Board.CYAN : Board.MAGENTA;
};

/* Player pass */

Board.prototype.pass = function(){
	if (this.last_move_passed)
		this.end_game();
	this.last_move_passed = true;
	this.switch_player();
};

/* *At the end*/

Board.prototype.end_game = function(){
	console.log("GAME OVER");
};

/* Place a stone (i,j) true if successful*/

Board.prototype.play = function(i,j){
	console.log ("Played at"+i+", "+j);
	this.attempted_suicide = this.in_atari = false;

	if (this.board[i][j] != Board.EMPTY)
		return false;

	var color = this.board[i][j] = this.current_color;
	var captured = [];
	var neighbors = this.get_adjacent_intersections(i, j);
	var atari = false;

	var self = this;
	_.each(neighbors, function(n){
		var state = self.board[n[0]][n[1]];
		if (state != Board.EMPTY && state != color){
			var group = self.get_group(n[0], n[1]);
			console.log(group);
			if (group["liberties"] == 0)
				captured.push(group);
			else if (group["liberties"] == 1)
				atari = true;
		}

	});

	//detect suicide
	// TODO: continue
	//http://cjlarose.com/2014/01/09/react-board-game-tutorial.html
}