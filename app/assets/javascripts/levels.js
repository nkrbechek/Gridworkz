//new strategy; array of neighbors, remove random, and replace with end of lsit.
//cd ../users/paz/desktop/gridworkz
function levelGenerator(level)
{
	{
		level=level;
		gridsize=(level/5)+3;
		shapetype=level%5;
	}	
	var grid=gridMaker(shapetype,level);
	return grid;
}
function gridMaker(shapetype, gridsize)
{
	var grid;
	switch(shapetype)
	{
		case 0:
			grid=block(gridsize);
			break;
		case 1:
			 grid=sides(gridsize);
			break;
		case 2:
			grid=corners(gridsize);
			break;
		case 3:
			grid=cornerSides(gridsize);//looks  the same as sides often
			break;
		case 4:
			grid=islands(gridsize);//works
			break;
		default:
			console.log("this should never happen");
			grid=-1;
	}
	return grid;
}//end gridmaker


function block(gridsize)
{
	var result = new Array();
	var row=Math.floor(Math.random()*2);//0-1
	var rowNumber = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	for (var i = 0; i <gridsize; i++) 
	{
		result[i]=new Array();
		for (var j = 0; j <gridsize; j++) 
		{  		
			if(row==1)//row not column
			{
				if(j==rowNumber)
					{ result[i][j]=1; } 
				else
					{ result[i][j]=0; }  			
			}//end row
			else//column
			{
				if(i==rowNumber)
				{ result[i][j]=1; }
				else
				{ result[i][j]=0; }
			}//end column
		}//end inner for loop
	}//end outer for loop
	return result;
}//end blocks

function initialize(gridsize)
{	
	var result = new Array();
	for (var i = 0; i <gridsize; i++) 
	{
		result[i]=new Array();
		for (var j = 0; j <gridsize; j++) 
		{  		
			result[i][j]=0; 
		}//end inner for loop
	}//end outer for loop
	return result;
}//end initialize

function getSideNeighbors(i,j,grid,gridsize,iarr,jarr)//WIP Totally check [i][j+1]; [i],[j-1]; [i-1][j]; [i+1][j]
{
	//push shoves things onto the end and returns the length
	var pushCounter=0;
	if(i>0 && grid[i-1][j]===0)
	{
		iarr.push(i-1);
		jarr.push(j);
		//console.log("SideNeighbors: pushing %i ,%i onto neighbors",i-1,j);
		pushCounter++;
	}
	if(j>0 && grid[i][j-1]===0)
	{
		iarr.push(i);
		jarr.push(j-1);
		//console.log("SideNeighbors: pushing %i ,%i onto neighbors",i,j-1);
		pushCounter++;
	}	
	if(i<gridsize-1 && grid[i+1][j]===0)
	{
		iarr.push(i+1);
		jarr.push(j);
		//console.log("SideNeighbors: pushing %i ,%i onto neighbors",i+1,j);
		pushCounter++;
	}
	if(j<gridsize-1 && grid[i][j+1]===0)
	{
		iarr.push(i);
		jarr.push(j+1);
		//console.log("SideNeighbors: pushing %i ,%i onto neighbors",i,j+1);
		pushCounter++;
	}
	//to return things just shove j on the back of i, we will always get an even number, 0 pairs with array.length/2, add up
	return pushCounter;
}

function sides(gridsize)//error not gettin all always 4?
{
	var result = initialize(gridsize);
	var filledSquares=Math.floor(gridsize*gridsize/3)-1;//30% rounded down -first point
	var i = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var j = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		result[i][j]=1;
	var iarr=new Array();
	var jarr=new Array();
	getSideNeighbors(i,j,result,gridsize,iarr,jarr);
	while(filledSquares>=0)
		{
			var randomNeighbor=Math.floor(Math.random()*iarr.length);
			result[ iarr[randomNeighbor] ][ jarr[randomNeighbor] ]=1;//setting randomly picked neighbor to 1
			//getting all neighbors
			getSideNeighbors(iarr[randomNeighbor],jarr[randomNeighbor],result,gridsize,iarr,jarr);
			//now to remove extras
			i=iarr.pop();
			j=jarr.pop();
			if(randomNeighbor!==iarr[iarr.length-1])//we picked didnt pick the last one so have holes to fill;
			{
				iarr[randomNeighbor]=i;
				jarr[randomNeighbor]=j;
			}
			filledSquares--;
		}
	return result;
}//end sides

function getCornerNeighbors(i,j,grid,gridsize,iarr,jarr)//WIP Totally check [i+1][j+1]; [i-1],[j-1]; [i-1][j+1]; [i+1][j-1]
{
	//push shoves things onto the end and returns the length
	var pushCounter=0;
	if(i>0 && j>0 && grid[i-1][j-1]===0)
	{
		iarr.push(i-1);
		jarr.push(j-1);
		//console.log("CornerNeighbors: pushing %i ,%i onto neighbors",i-1,j-1);
		pushCounter++;
	}
	if(j>0 && i<gridsize-1 && grid[i+1][j-1]===0)
	{
		iarr.push(i+1);
		jarr.push(j-1);
		//console.log("CornerNeighbors: pushing %i ,%i onto neighbors",i+1,j-1);
		pushCounter++;
	}	
	if(i<gridsize-1 && j<gridsize-1 && grid[i+1][j+1]===0)
	{
		iarr.push(i+1);
		jarr.push(j+1);
		//console.log("CornerNeighbors: pushing %i ,%i onto neighbors",i+1,j+1);
		pushCounter++;
	}
	if(j<gridsize-1 && i>0 && grid[i-1][j+1]===0)
	{
		iarr.push(i-1);
		jarr.push(j+1);
		//console.log("CornerNeighbors: pushing %i ,%i onto neighbors",i-1,j+1);
		pushCounter++;
	}
	//to return things just shove j on the back of i, we will always get an even number, 0 pairs with array.length/2, add up
	return pushCounter;
}


function corners(gridsize)//error not gettin all always 4?
{
	var result = initialize(gridsize);
	var filledSquares=Math.floor(gridsize*gridsize/3)-1;//30% rounded down -first point
	var i = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var j = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		result[i][j]=1;
	var iarr=new Array();
	var jarr=new Array();
	getCornerNeighbors(i,j,result,gridsize,iarr,jarr);
	while(filledSquares>=0)
		{
			var randomNeighbor=Math.floor(Math.random()*iarr.length);
			result[ iarr[randomNeighbor] ][ jarr[randomNeighbor] ]=1;//setting randomly picked neighbor to 1
			//getting all neighbors
			getCornerNeighbors(iarr[randomNeighbor],jarr[randomNeighbor],result,gridsize,iarr,jarr);
			//now to remove extras
			i=iarr.pop();
			j=jarr.pop();
			if(randomNeighbor!==iarr[iarr.length-1])//we picked didnt pick the last one so have holes to fill;
			{
				iarr[randomNeighbor]=i;
				jarr[randomNeighbor]=j;
			}
			filledSquares--;
		}
	return result;
}//end corners

function cornerSides(gridsize)
{
	var result = initialize(gridsize);
	var filledSquares=Math.floor(gridsize*gridsize/3)-1;//30% rounded down -first point
	var i = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var j = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		result[i][j]=1;
	var iarr=new Array();
	var jarr=new Array();
	getCornerNeighbors(i,j,result,gridsize,iarr,jarr);
	getSideNeighbors(i,j,result,gridsize,iarr,jarr);
	while(filledSquares>0)
		{
			var randomNeighbor=Math.floor(Math.random()*iarr.length);
			console.log("randomNeighbor is %i iarr.length %i jarr.length %i",randomNeighbor,iarr.length,jarr.length);
			result[ iarr[randomNeighbor] ][ jarr[randomNeighbor] ]=1;//setting randomly picked neighbor to 1
			//getting all neighbors
			getCornerNeighbors(iarr[randomNeighbor],jarr[randomNeighbor],result,gridsize,iarr,jarr);
			getSideNeighbors(iarr[randomNeighbor],jarr[randomNeighbor],result,gridsize,iarr,jarr);
			//now to remove extras
			i=iarr.pop();
			j=jarr.pop();
			if(randomNeighbor!==iarr[iarr.length-1])//we picked didnt pick the last one so have holes to fill;
			{
				iarr[randomNeighbor]=i;
				jarr[randomNeighbor]=j;
			}
			filledSquares--;
		}
	var index;
	for(index=0; index<iarr.length; index++)
	{

		if(cornersTouching(iarr[index],jarr[index],result)===1 && numberTouching(iarr[index],jarr[index],result)===1)
		{
			result[iarr[index]][jarr[index]]=1;
			index=iarr.length;
		}

		else
		{
			if(i==iarr.length-1)
			{
				i=2*iarr.length;
			}
				//marker for something that should NEVER happen
		}
	}	
	return result;
}//end cornerSides

function cornersTouching(i,j,grid)
{
	var result=0;
	//corners
	if(i>0 && j>0 )
	{
		if(grid[i-1][j-1]===1)
		{
			result++;
		}
	}
	if(j>0 && i<gridsize-1)
	{
		if(grid[i+1][j-1]===1)
		{
			result++;
		}
	}	
	if(i<gridsize-1 && j<gridsize-1)
	{
		if(grid[i+1][j+1]===1)
		{
			result++;
		}
	}
	if(j<gridsize-1 && i>0)
	{
		if( grid[i-1][j+1]===1)
		{
			result++;
		}
	}
	return result;
}//end corners touching

function sidesTouching(i,j,grid)
{
	var result=0;
	if(i>0 )
	{
		if(grid[i-1][j]===1)
		{
			result++;
		}
	}
	
	if(j>0 )//already included
	{
		if(grid[i][j-1]===1)
		{
			result++;
		}
	}
	if(i<gridsize-1 )
	{
		if(grid[i+1][j]===1)
		{
			result++;
		}
	}
	if(j<gridsize-1 )
	{
		if(grid[i][j+1]===1)
		{
			result++;
		}
	}
	return result;
}//end sides touching

function numberTouching (i,j,grid)//returns 0 if nothing in the grid touches, else returns number touching
{
	var result=0;
	//corners
	result=result+cornersTouching(i,j,grid);
	//sides
	result=result+sidesTouching(i,j,grid);
	return result;
}//end numberTouching

function islands(gridsize)
{
	var result=initialize(gridsize);
	var filledSquares=Math.floor(gridsize);//30% rounded down -first point

	while(filledSquares>0)
	{
		var i = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		var j = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		if(numberTouching(i,j,result)===0 && result[i][j]===0)
		{
			result[i][j]=1;
			filledSquares=filledSquares-1;
		}
	}
	return result;
}
