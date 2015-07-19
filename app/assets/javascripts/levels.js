//new strategy; array of neighbors, remove random, and replace with end of lsit.
//cd ../users/paz/desktop/gridworkz
function levelGenerator(level)
{
	console.log("in levelGenerator");
	if(level<=4)
	{
		console.log("level<=4");
		gridsize=3;
		if(level===4)
			{shapetype=7;}
		else
			{shapetype=level;}
	}
	else//level greater than 4; gridsize>3
	{
		level=level-4;
		gridsize=(level/8)+4;
		shapetype=level%8;
	}	
	console.log("level is %i gridsize is %i shapetype is %i",level,gridsize,shapetype);
	var grid=gridMaker(shapetype,level);
	return grid;
}
function gridMaker(shapetype,level)
{
	
	//0=block, 1=sides, 2=corners, 3=cornerSides, 4=sepSides, 5=sepCorners, 6=sepMixed, 7=islands 
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
			grid=sepSides(gridsize);//works
			break;
		case 5:
			grid=sepCorners(gridsize);//does not work
			break;
		case 6:
			grid=sepMixed(gridsize);//does not work most of the time but doesnt stop things
			break;
		case 7:
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
	if(i!==0 && grid[i-1][j]===0)
	{
		iarr.push(i-1);
		jarr.push(j);
		//console.log("SideNeighbors: pushing %i ,%i onto neighbors",i-1,j);
		pushCounter++;
	}
	if(j!==0 && grid[i][j-1]===0)
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
	console.log("done getting all %i SideNeighbors of %i , %i",pushCounter,i,j);
	return pushCounter;
}

function sides(gridsize)//error not gettin all always 4?
{
	var result = initialize(gridsize);
	var filledSquares=Math.floor(gridsize*gridsize/3)-1;//30% rounded down -first point
	var i = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var j = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		result[i][j]=1;
	console.log("sides: original seed: %i , %i",i,j);
	var iarr=new Array();
	var jarr=new Array();
	getSideNeighbors(i,j,result,gridsize,iarr,jarr);
	while(filledSquares>=0)
		{
			var randomNeighbor=Math.floor(Math.random()*iarr.length);
			result[ iarr[randomNeighbor] ][ jarr[randomNeighbor] ]=1;//setting randomly picked neighbor to 1
			console.log("%i left to fill, filling %i ,%i",filledSquares,iarr[randomNeighbor],jarr[randomNeighbor]);
			//I dont think we will ever run out of available neighborsToSplit
			//getting all neighbors
			getSideNeighbors(iarr[randomNeighbor],jarr[randomNeighbor],result,gridsize,iarr,jarr);
			//now to split them up and add them to our current iarr and jnieghbors (at end)
			//filling square
			console.log("printing neighbors");
			console.log(iarr);
			console.log(jarr);
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

function getCornerNeighbors(i,j,grid,gridsize,iarr,jarr)//assume never given negatives
{
	//push shoves things onto the end and returns the length
	var pushCounter=0;
	if(i!==0 && j!==0 && grid[i-1][j-1]===0)
	{
		iarr.push(i-1);
		jarr.push(j-1);
		//console.log("CornerNeighbors: pushing %i ,%i onto neighbors",i-1,j-1);
		pushCounter++;
	}
	if(j!==0 && i<gridsize-1 && grid[i+1][j-1]===0)
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
	if(j<gridsize-1 && i!==0 && grid[i-1][j+1]===0)
	{
		iarr.push(i-1);
		jarr.push(j+1);
		//console.log("CornerNeighbors: pushing %i ,%i onto neighbors",i-1,j+1);
		pushCounter++;
	}
	//to return things just shove j on the back of i, we will always get an even number, 0 pairs with array.length/2, add up
	console.log("done getting all %i CornerNeighbors of %i , %i",pushCounter,i,j);
	return pushCounter;
}


function corners(gridsize)//error not gettin all always 4?
{
	var result = initialize(gridsize);
	var filledSquares=Math.floor(gridsize*gridsize/3)-1;//30% rounded down -first point
	var i = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var j = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		result[i][j]=1;
	console.log("corners: original seed: %i , %i",i,j);
	var iarr=new Array();
	var jarr=new Array();
	getCornerNeighbors(i,j,result,gridsize,iarr,jarr);
	while(filledSquares>=0)
		{
			var randomNeighbor=Math.floor(Math.random()*iarr.length);
			result[ iarr[randomNeighbor] ][ jarr[randomNeighbor] ]=1;//setting randomly picked neighbor to 1
			console.log("%i left to fill, filling %i ,%i",filledSquares,iarr[randomNeighbor],jarr[randomNeighbor]);
			//I dont think we will ever run out of available neighborsToSplit
			//getting all neighbors
			getCornerNeighbors(iarr[randomNeighbor],jarr[randomNeighbor],result,gridsize,iarr,jarr);
			//now to split them up and add them to our current iarr and jnieghbors (at end)
			//filling square
			console.log("printing neighbors");
			console.log(iarr);
			console.log(jarr);
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
	console.log("cornerSides: original seed: %i , %i",i,j);
	var iarr=new Array();
	var jarr=new Array();
	//getCornerNeighbors(i,j,result,gridsize,iarr,jarr);
	console.log("cornerSides: corners adding %i to iarr ",getCornerNeighbors(i,j,result,gridsize,iarr,jarr));
	console.log("cornerSides: corners iarr.length = %i ",iarr.length);
	console.log("cornerSides: sides adding %i to iarr ",getSideNeighbors(i,j,result,gridsize,iarr,jarr));
	console.log("cornerSides: sides iarr.length = %i ",iarr.length);
	while(filledSquares>0)
		{
			var randomNeighbor=Math.floor(Math.random()*iarr.length);
			result[ iarr[randomNeighbor] ][ jarr[randomNeighbor] ]=1;//setting randomly picked neighbor to 1
			console.log("%i left to fill, filling %i ,%i",filledSquares,iarr[randomNeighbor],jarr[randomNeighbor]);
			//I dont think we will ever run out of available neighborsToSplit
			//getting all neighbors
			getCornerNeighbors(iarr[randomNeighbor],jarr[randomNeighbor],result,gridsize,iarr,jarr);
			getSideNeighbors(iarr[randomNeighbor],jarr[randomNeighbor],result,gridsize,iarr,jarr);
			//now to split them up and add them to our current iarr and jnieghbors (at end)
			//filling square
			console.log("printing neighbors");
			console.log(iarr);
			console.log(jarr);
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
			console.log("corner to force = %i, %i",iarr[index],jarr[index]);
		}

		else
		{
			if(i==iarr.length-1)
			{
				i=2*iarr.length;
				console.log("cannot locate corner to force!");
			}
				//marker for something that should NEVER happen
		}
	}	
	return result;
}//end cornerSides



function mergeArs(array1, array2, gridsize)
{
	console.log("merging results");
	var result=new Array();
	for(var i=0; i<gridsize; i++)
	{
		result[i]=new Array();
		for(var j=0; j<gridsize; j++)
		{
			if(array1[i][j]===1 || array2[i][j]===1)
				{result[i][j]=1;}
			else
				{result[i][j]=0;}
		}
	}	
	console.log("merged results");
	return result;
}

function cornersTouching(i,j,grid)
{
	var result=0;
	//corners
	if(i!==0 && j!==0 )
	{
		//console.log("cornersTouching i!==0, j!==0; i=%i j=%i",i,j);
		if(grid[i-1][j-1]===1)
		{
			result++;
		//	console.log("%i %i is touching",i-1,j-1);
		}
	}
	if(j!==0 && i<gridsize-1)
	{
		//console.log("cornersTouching i<gridsize-1, j>0, i=%i, j=%i",i,j);
		if(grid[i+1][j-1]===1)
		{
			result++;
		//	console.log("%i %i is touching",i+1,j-1);
		}
	}	
	if(i<gridsize-1 && j<gridsize-1)
	{
		//console.log("cornersTouching i<gridsize-1 j<gridsize-1 i=%i j=%i",i,j);
		if(grid[i+1][j+1]===1)
		{
			result++;
		//	console.log("%i %i is touching",i+1,j+1);
		}
	}
	if(j<gridsize-1 && i!==0)
	{
		//console.log("cornersTouching j<gridsize-1 i>0, i=%i, j=%i",i,j);
		if( grid[i-1][j+1]===1)
		{
			result++;
		//	console.log("%i %i is touching",i-1,j+1);
		}
	}
	return result;
}//end corners touching

function sidesTouching(i,j,grid)
{
	var result=0;
	if(i!==0 )
	{
		if(grid[i-1][j]===1)
		{
			result++;
			//console.log("%i %i is touching %i, %i",i-1,j,i,j);
		}
	}
	
	if(j!==0 )//already included
	{
		if(grid[i][j-1]===1)
		{
			result++;
			//console.log("%i %i is touching %i, %i",i,j-1,i,j);
		}
	}
	if(i<gridsize-1 )
	{
		if(grid[i+1][j]===1)
		{
			result++;
			//console.log("%i %i is touching %i,%i",i+1,j,i,j);
		}
	}
	if(j<gridsize-1 )
	{
		if(grid[i][j+1]===1)
		{
			result++;
			//console.log("%i %i is touching %i,%i",i,j+1,i,j);
		}
	}
	return result;
}//end sides touching

function numberTouching (i,j,grid)//returns 0 if nothing in the grid touches, else returns number touching
{
	var result=0;
	//corners
	//console.log("numberTouching: before cornersTouching");
	result=result+cornersTouching(i,j,grid);
	//sides
	//console.log("numberTouching: after corners before sides");
	result=result+sidesTouching(i,j,grid);
	return result;
}//end numberTouching

function sepSideNeighbors(i,j,grid,gridsize,iarr,jarr,avoidgrid)// Totally check [i][j+1]; [i],[j-1]; [i-1][j]; [i+1][j]
{
	//function getSideNeighbors(i,j,grid,gridsize,iarr,jarr)//WIP Totally check [i][j+1]; [i],[j-1]; [i-1][j]; [i+1][j]
	var dummy1=new Array();
	var dummy2=new Array();
	//push shoves things onto the end and returns the length
	var pushCounter=0;
	if(i>0)
	{console.log("sepSideNeighbors i>0");
		if( grid[i-1][j]===0 )
		{console.log("sepSideNeighbors i>0 and grid i-1,j is empty passing %i %i to numberTouching",i-1,j);
			if(numberTouching(i-1,j,avoidgrid)===0)
			{
				iarr.push(i-1);
				jarr.push(j);
				console.log("sepSideNeighbors: pushing %i ,%i onto neighbors",i-1,j);
				pushCounter++;
			}
		}
	}
	//if(j>0 && grid[i][j-1]===0 && getSideNeighbors(i,j-1,avoidgrid,gridsize,dummy1,dummy2)===4 && getCornerNeighbors(i,j-1,avoidgrid,gridsize,dummy1,dummy2)===4)
	if(j>0)
	{console.log("sepSideNeighbors j>0");
		if(grid[i][j-1]===0 )
		{console.log("sepSideNeighbors j>0 and i,j-a is empty passing %i %i to numberTouching",i,j-1);
			if(numberTouching(i,j-1,avoidgrid)===0)
			{
				iarr.push(i);
				jarr.push(j-1);
				console.log("sepSideNeighbors: pushing %i ,%i onto neighbors",i,j-1);
				pushCounter++;
			}
		}
	}	
	//if(i<gridsize-1 && grid[i+1][j]===0 && getSideNeighbors(i+1,j,avoidgrid,gridsize,dummy1,dummy2)===4 && getCornerNeighbors(i+1,j,avoidgrid,gridsize,dummy1,dummy2)===4)
	if(i<gridsize-1)
	{console.log("sepSideNeighbors i<gridsize-1");
		if( grid[i+1][j]===0 )
		{	console.log("sepSideNeighbors i<gridsize-1 and i+1,j is empty passing %i %i to numberTouching",i+1,j);
			if( numberTouching(i+1,j,avoidgrid)===0)
			{
				iarr.push(i+1);
				jarr.push(j);
				console.log("sepSideNeighbors: pushing %i ,%i onto neighbors",i+1,j);
				pushCounter++;
			}
		}
	}
	//if(j<gridsize-1 && grid[i][j+1]===0 && getSideNeighbors(i,j+1,avoidgrid,gridsize,dummy1,dummy2)===4 && getCornerNeighbors(i,j+1,avoidgrid,gridsize,dummy1,dummy2)===4)
	if(j<gridsize-1)
	{console.log("sepSideNeighbors j<gridsize-1");
		if( grid[i][j+1]===0)
		{console.log("sepSideNeighbors j<gridsize-1 and i,j+1 is empty passing %i %i to numberTouching",i,j+1);
			if(numberTouching(i,j+1,avoidgrid)==0)
			{
				iarr.push(i);
				jarr.push(j+1);
				console.log("sepSideNeighbors: pushing %i ,%i onto neighbors",i,j+1);
				pushCounter++;
			}
		}
	}
	//to return things just shove j on the back of i, we will always get an even number, 0 pairs with array.length/2, add up
	console.log("done getting all %i sepSideNeighbors of %i , %i",pushCounter,i,j);
	return pushCounter;
}// end sepSides

function sepSides(gridsize)//sometimes infinite loops too  need to prevent seeds from being same
{
	console.log("sepSides, made it in");
	var result1 = initialize(gridsize);
	var result2 = initialize(gridsize);
	var filledSquares=Math.floor(gridsize*gridsize/3);//30% rounded down -first point
	var i1 = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var j1 = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		result1[i1][j1]=1;
	var i2 = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var j2 = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	if(gridsize>3)
	{
		while(i1==i2 ||i1==i2+1 || i1==i2-1)
			{i2 = Math.floor(Math.random()*gridsize);}
		while(j1==j2 || j1==j2+1 || j1==j2-1)
			{j2 = Math.floor(Math.random()*gridsize);}
	}
	else
	{
		if(i1===1 || i1===2)
			{i1=2; i2=0;}
		else//i1==0
			{i2=2;}
		if(j1==1 || j1==2)
			{j1=2; j2=0;}
		else//j1==0
			{j2=2;}
	}
	
		result2[i2][j2]=1;//fill in first of result2
	console.log("sepSides we got seeds initialized i1 %i j1 %i i2 %i j2 %i",i1,j1,i2,j2);
	var i1edge=new Array();
	var j1edge=new Array();
	var i2edge=new Array();
	var j2edge=new Array();

	var iNeighbors=new Array();
	var jNeighbors=new Array();
	i1edge[0]=i1;
	j1edge[0]=j1;
	i2edge[0]=i2;
	j2edge[0]=j2;

	while(filledSquares>0)
	{
		console.log("got into while loop");
		var gridToFill=Math.floor(Math.random()*2);//0 0r 1
		if(gridToFill===0)
		{
			console.log("filling first");
			var edgeSeedIndex=Math.floor(Math.random()*i1edge.length);
			i1=i1edge[edgeSeedIndex];
			j1=j1edge[edgeSeedIndex];
			var numNeighbor= sepSideNeighbors(i1,j1,result1,gridsize,iNeighbors,jNeighbors,result2);
			if(numNeighbor!==0)
			{
				console.log("number of choices we have : %i",numNeighbor);
				numNeighbor=Math.floor(Math.random()*numNeighbor);
				console.log("what we chose : %i",numNeighbor);
				i1edge.push(iNeighbors[numNeighbor]);//not sure if valid syntax
				j1edge.push(jNeighbors[numNeighbor]);
				console.log("pushed onto edges, about to push onto results %i %i", iNeighbors[numNeighbor],jNeighbors[numNeighbor]);
				result1[iNeighbors[numNeighbor]] [jNeighbors[numNeighbor]]=1;
				if(sidesTouching(i1,j1,result1)==4)//throw it away no longer edge
				{
					var tempi=i1edge.pop();
					var tempj=j1edge.pop();
					if(edgeSeedIndex!==iarr[iarr.length-1])//we picked didnt pick the last one so have holes to fill;
					{
						i1edge[edgeSeedIndex]=tempi;
						j1edge[edgeSeedIndex]=tempj;
					}
				}
				filledSquares--;
			}//MAKING SURE WE arent working with nothing
			empty1DArray(iNeighbors);
			empty1DArray(jNeighbors);
		}//end filling first
		else//filling second
		{
			console.log("filling second");
			var edgeSeedIndex=Math.floor(Math.random()*i2edge.length);
			i2=i2edge[edgeSeedIndex];
			j2=j2edge[edgeSeedIndex];
			var numNeighbor= sepSideNeighbors(i2,j2,result2,gridsize,iNeighbors,jNeighbors,result1);
			console.log("number of choices we have : %i",numNeighbor);
			if(numNeighbor!==0)
			{
				numNeighbor=Math.floor(Math.random()*numNeighbor);
				console.log("what we chose : %i ",numNeighbor);
				i2edge.push(iNeighbors[numNeighbor]);//not sure if valid syntax
				j2edge.push(jNeighbors[numNeighbor]);
				console.log("pushed onto edge  and now onto result %i %i",iNeighbors[numNeighbor],jNeighbors[numNeighbor]);
				result2[iNeighbors[numNeighbor]] [jNeighbors[numNeighbor]]=1;
				if(sidesTouching(i2,j2,result2)==4)
				{
					var tempi=i2edge.pop();
					var tempj=j2edge.pop();
					if(edgeSeedIndex!==iarr[iarr.length-1])//we picked didnt pick the last one so have holes to fill;
					{
						i2edge[edgeSeedIndex]=tempi;
						j2edge[edgeSeedIndex]=tempj;
					}
				}
				filledSquares--;
			}//end we did something
			empty1DArray(iNeighbors);
			empty1DArray(jNeighbors);
		}//end filling second
	}//end fillling while loop
	result1=mergeArs(result1, result2,gridsize);
	return result1;
}//end sepSides

function empty1DArray(arrayToClear)
{
	while(arrayToClear.length>0)
	{arrayToClear.pop();}
	return arrayToClear;
}



function sepCornerNeighbors(i,j,grid,gridsize,iarr,jarr,avoidgrid)// Totally check [i][j+1]; [i],[j-1]; [i-1][j]; [i+1][j]
{
	//function getSideNeighbors(i,j,grid,gridsize,iarr,jarr)//WIP Totally check [i][j+1]; [i],[j-1]; [i-1][j]; [i+1][j]
	var dummy1=new Array();
	var dummy2=new Array();
	//push shoves things onto the end and returns the length
	var pushCounter=0;
	if(i>0 && j>0)
	{console.log("sepCornerNeighbors i>0, j>0");
		if( grid[i-1][j-1]===0 )
		{console.log("sepCornerNeighbors i>0 && j>0 and grid i-1,j-1 is empty passing %i %i to numberTouching",i-1,j-1);
			if(numberTouching(i-1,j-1,avoidgrid)==0)
			{
				iarr.push(i-1);
				jarr.push(j-1);
				console.log("sepCornerNeighbors: pushing %i ,%i onto neighbors",i-1,j);
				pushCounter++;
			}
		}
	}
	//if(j>0 && grid[i][j-1]===0 && getSideNeighbors(i,j-1,avoidgrid,gridsize,dummy1,dummy2)===4 && getCornerNeighbors(i,j-1,avoidgrid,gridsize,dummy1,dummy2)===4)
	if(j>0 && i<gridsize-1)
	{console.log("sepCornerNeighbors j>0 && i<gridsize-1");
		if(grid[i+1][j-1]===0 )
		{console.log("sepCornerNeighbors j>0 && i<gridsize-1 and i+1,j-a is empty passing %i %i to numberTouching",i+1,j-1);
			if(numberTouching(i+1,j-1,avoidgrid)==0)
			{
				iarr.push(i+1);
				jarr.push(j-1);
				console.log("sepCornerNeighbors: pushing %i ,%i onto neighbors",i+1,j-1);
				pushCounter++;
			}
		}
	}	
	//if(i<gridsize-1 && grid[i+1][j]===0 && getSideNeighbors(i+1,j,avoidgrid,gridsize,dummy1,dummy2)===4 && getCornerNeighbors(i+1,j,avoidgrid,gridsize,dummy1,dummy2)===4)
	if(i<gridsize-1 && j<gridsize-1)
	{console.log("sepCornerNeighbors i<gridsize-1 && j<gridsize-1");
		if( grid[i+1][j+1]===0 )
		{	console.log("sepCornerNeighbors i<gridsize-1 j<gridsize-1 and i+1,j is empty passing %i %i to numberTouching",i+1,j+1);
			if( numberTouching(i+1,j+1,avoidgrid)==0)
			{
				iarr.push(i+1);
				jarr.push(j+1);
				console.log("sepCornerNeighbors: pushing %i ,%i onto neighbors",i+1,j+1);
				pushCounter++;
			}
		}
	}
	//if(j<gridsize-1 && grid[i][j+1]===0 && getSideNeighbors(i,j+1,avoidgrid,gridsize,dummy1,dummy2)===4 && getCornerNeighbors(i,j+1,avoidgrid,gridsize,dummy1,dummy2)===4)
	if(j<gridsize-1 && i>0)
	{console.log("sepCornerNeighbors j<gridsize-1 i>0");
		if( grid[i-1][j+1]===0)
		{console.log("sepSideNeighbors j<gridsize-1  i>0 and i-1,j+1 is empty passing %i %i to numberTouching",i,j+1);
			if(numberTouching(i-1,j+1,avoidgrid)==0)
			{
				iarr.push(i-1);
				jarr.push(j+1);
				console.log("sepSideNeighbors: pushing %i ,%i onto neighbors",i-1,j+1);
				pushCounter++;
			}
		}
	}
	//to return things just shove j on the back of i, we will always get an even number, 0 pairs with array.length/2, add up
	console.log("done getting all %i sepSideNeighbors of %i , %i",pushCounter,i,j);
	return pushCounter;
}// end sepCorners Neighbors


function sepCorners(gridsize)//error! occasionally infinite loops
{
	console.log("sepCorners, made it in");
	var result1 = initialize(gridsize);
	var result2 = initialize(gridsize);
	var filledSquares=Math.floor(gridsize*gridsize/4);//30% rounded down -first point
	var i1 = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var j1 = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		result1[i1][j1]=1;
	var i2 = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var j2 = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	while(numberTouching(i2,j2,result1)!==0 && !(i2===i1 &&j1===j2))//making sure seeds dont touch
	{
		i2 = Math.floor(Math.random()*gridsize);
		j2 = Math.floor(Math.random()*gridsize);
	}
		result2[i2][j2]=1;//fill in first of result2
	console.log("sepCorners we got seeds initialized i1 %i j1 %i i2 %i j2 %i",i1,j1,i2,j2);
	var i1edge=new Array();
	var j1edge=new Array();
	var i2edge=new Array();
	var j2edge=new Array();

	var iNeighbors=new Array();
	var jNeighbors=new Array();
	i1edge[0]=i1;
	j1edge[0]=j1;
	i2edge[0]=i2;
	j2edge[0]=j2;

	while(filledSquares>0)
	{
		console.log("sepCorners got into while loop");
		var gridToFill=Math.floor(Math.random()*2);//0 0r 1
		if(gridToFill===0)
		{
			console.log("speCorners filling first");
			var edgeSeedIndex=Math.floor(Math.random()*i1edge.length);
			i1=i1edge[edgeSeedIndex];
			j1=j1edge[edgeSeedIndex];
			var numNeighbor= sepCornerNeighbors(i1,j1,result1,gridsize,iNeighbors,jNeighbors,result2);
			if(numNeighbor!==0)
			{
				console.log("number of choices we have : %i",numNeighbor);
				numNeighbor=Math.floor(Math.random()*numNeighbor);
				console.log("what we chose : %i",numNeighbor);
				i1edge.push(iNeighbors[numNeighbor]);//not sure if valid syntax
				j1edge.push(jNeighbors[numNeighbor]);
				console.log("pushed onto edges, about to push onto results %i %i", iNeighbors[numNeighbor],jNeighbors[numNeighbor]);
				result1[iNeighbors[numNeighbor]] [jNeighbors[numNeighbor]]=1;
				if(cornersTouching(i1,j1,result1)==4)//throw it away no longer edge
				{
					var tempi=i1edge.pop();
					var tempj=j1edge.pop();
					if(edgeSeedIndex!==iarr[iarr.length-1])//we picked didnt pick the last one so have holes to fill;
					{
						i1edge[edgeSeedIndex]=tempi;
						j1edge[edgeSeedIndex]=tempj;
					}
				}
				filledSquares--;
			}//MAKING SURE WE arent working with nothing
			empty1DArray(iNeighbors);
			empty1DArray(jNeighbors);
		}//end filling first
		else//filling second
		{
			console.log("filling second");
			var edgeSeedIndex=Math.floor(Math.random()*i2edge.length);
			i2=i2edge[edgeSeedIndex];
			j2=j2edge[edgeSeedIndex];
			var numNeighbor= sepCornerNeighbors(i2,j2,result2,gridsize,iNeighbors,jNeighbors,result1);
			console.log("number of choices we have : %i",numNeighbor);
			if(numNeighbor!==0)
			{
				numNeighbor=Math.floor(Math.random()*numNeighbor);
				console.log("what we chose : %i ",numNeighbor);
				i2edge.push(iNeighbors[numNeighbor]);//not sure if valid syntax
				j2edge.push(jNeighbors[numNeighbor]);
				console.log("pushed onto edge  and now onto result %i %i",iNeighbors[numNeighbor],jNeighbors[numNeighbor]);
				result2[iNeighbors[numNeighbor]] [jNeighbors[numNeighbor]]=1;
				if(cornersTouching(i2,j2,result2)==4)
				{
					var tempi=i2edge.pop();
					var tempj=j2edge.pop();
					if(edgeSeedIndex!==iarr[iarr.length-1])//we picked didnt pick the last one so have holes to fill;
					{
						i2edge[edgeSeedIndex]=tempi;
						j2edge[edgeSeedIndex]=tempj;
					}
				}
				filledSquares--;
			}//end we did something
			empty1DArray(iNeighbors);
			empty1DArray(jNeighbors);
		}//end filling second
	}//end fillling while loop
	result1=mergeArs(result1, result2,gridsize);
	return result1;
}//end SepCorners


function sepMixed(gridsize)
{
	var result1 = initialize(gridsize);
	var result2 = initialize(gridsize);
	var filledSquares=Math.floor(gridsize*gridsize/3)-2;//30% rounded down -first point
	var i1 = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var j1 = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var i1arr=new Array();
	var j1arr=new Array();
		result1[i1][j1]=1;
	var i2 = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var j2 = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	while(numberTouching(i2,j2,result1)!==0 )//making sure seeds dont touch
		{
			i2 = Math.floor(Math.random()*gridsize);
			j2 = Math.floor(Math.random()*gridsize);
		}
		result2[i2][j2]=1;//fill in first of result2
	console.log("sepMixed: original seed1: %i , %i",i1,j1);
	console.log("sepMixed: original seed2: %i , %i",i2,j2);
	var i2arr=new Array();
	var j2arr=new Array();

	sepCornerNeighbors(i1,j1,result1,gridsize,i1arr,j1arr,result2);
	sepCornerNeighbors(i2,j2,result2,gridsize,i2arr,j2arr,result1);
	sepSideNeighbors(i1,j1,result1,gridsize,i1arr,j1arr,result2);
	sepSideNeighbors(i2,j2,result2,gridsize,i2arr,j2arr,result1);
	console.log("printing i1,j1");
	console.log(i1arr);
	console.log(j1arr);
	console.log("printing i2,j2");
	console.log(i2arr);
	console.log(j2arr);
	console.log("i1arr.length =%i",i1arr.length);
	console.log("i2arr.length =%i",i2arr.length);
	console.log("just before while loop in Sepsides");
	while(filledSquares>=0)
		{
			var whichSeed=Math.floor(Math.random*2);
			var randomNeighbor=Math.min(Math.floor(Math.random()*i1arr.length),Math.floor(Math.random()*i2arr.length));//min here 
			if(i1arr.length!==0)
			{
				result1[ i1arr[randomNeighbor] ][ j1arr[randomNeighbor] ]=1;//setting randomly picked neighbor to 1
				console.log("results 1 :%i left to fill, filling %i ,%i",filledSquares,i1arr[randomNeighbor],j1arr[randomNeighbor]);
				//I dont think we will ever run out of available neighborsToSplit
				//getting all neighbors
				sepCornerNeighbors(i1arr[randomNeighbor],j1arr[randomNeighbor],result1,gridsize,i1arr,j1arr,result2);
				sepSideNeighbors(i1arr[randomNeighbor],j1arr[randomNeighbor],result1,gridsize,i1arr,j1arr,result2);
				//now to split them up and add them to our current iarr and jnieghbors (at end)
				//filling square
				console.log("printing neighbors in result1");
				console.log(i1arr);
				console.log(j1arr);
				//now to remove extras
				i1=i1arr.pop();
				j1=j1arr.pop();
				if(randomNeighbor!==i1arr[i1arr.length-1])//we picked didnt pick the last one so have holes to fill;
				{
					i1arr[randomNeighbor]=i1;
					j1arr[randomNeighbor]=j1;
				}
				filledSquares--;
			}//end putting things in one
			//console.log("i2arr.length =%i",i1arr.length);
			if(i2arr.length!==0 )
			{
				result2[ i2arr[randomNeighbor] ][ j2arr[randomNeighbor] ]=1;//setting randomly picked neighbor to 1
				console.log(" result2 %i left to fill, filling %i ,%i",filledSquares,i2arr[randomNeighbor],j2arr[randomNeighbor]);
				//I dont think we will ever run out of available neighborsToSplit
				//getting all neighbors
				sepCornerNeighbors(i2arr[randomNeighbor],j2arr[randomNeighbor],result2,gridsize,i2arr,j2arr,result1);
				sepSideNeighbors(i2arr[randomNeighbor],j2arr[randomNeighbor],result2,gridsize,i2arr,j2arr,result1);
				//now to split them up and add them to our current iarr and jnieghbors (at end)
				//filling square
				console.log("printing neighbors in result2");
				console.log(i2arr);
				console.log(j2arr);
				//now to remove extras
				i2=i2arr.pop();
				j2=j2arr.pop();
				if(randomNeighbor!==i2arr[i2arr.length-1])//we picked didnt pick the last one so have holes to fill;
				{
					i2arr[randomNeighbor]=i2;
					j2arr[randomNeighbor]=j2;
				}
				filledSquares--;
			}//done putting things into 2
		}//end while loop
	result1=mergeArs(result1, result2,gridsize);
	return result1;
}//end Sepsides

function islands(gridsize)
{
	var result=initialize(gridsize);
	var filledSquares=Math.floor(gridsize);//30% rounded down -first point

	while(filledSquares>0)
	{
		var i = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		var j = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		console.log("checking %i %i",i,j);
		if(numberTouching(i,j,result)===0 && result[i][j]===0)
		{
			result[i][j]=1;
			filledSquares=filledSquares-1;
		}
	}
	return result;

}
