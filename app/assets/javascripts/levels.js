//new strategy; array of neighbors, remove random, and replace with end of lsit.
//cd ../users/paz/desktop/gridworkz
function gridMaker(shapetype, gridsize)
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
			grid=cornerSides(gridsize);
			break;
		/*case 4:
			grid=sepSides(gridsize);
			break;
		case 5:
			grid=sepCorners(gridsize);
			break;
		case 6:
			grid=sepMixed(gridsize);
			break;
		case 7:
			grid=islands(gridsize);
			break;*/
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
		console.log("SideNeighbors: pushing %i ,%i onto neighbors",i-1,j);
		pushCounter++;
	}
	if(j>0 && grid[i][j-1]===0)
	{
		iarr.push(i);
		jarr.push(j-1);
		console.log("SideNeighbors: pushing %i ,%i onto neighbors",i,j-1);
		pushCounter++;
	}	
	if(i<gridsize-1 && grid[i+1][j]===0)
	{
		iarr.push(i+1);
		jarr.push(j);
		console.log("SideNeighbors: pushing %i ,%i onto neighbors",i+1,j);
		pushCounter++;
	}
	if(j<gridsize-1 && grid[i][j+1]===0)
	{
		iarr.push(i);
		jarr.push(j+1);
		console.log("SideNeighbors: pushing %i ,%i onto neighbors",i,j+1);
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

function getCornerNeighbors(i,j,grid,gridsize,iarr,jarr)//WIP Totally check [i+1][j+1]; [i-1],[j-1]; [i-1][j+1]; [i+1][j-1]
{
	//push shoves things onto the end and returns the length
	var pushCounter=0;
	if(i>0 && j>0 && grid[i-1][j-1]===0)
	{
		iarr.push(i-1);
		jarr.push(j-1);
		console.log("CornerNeighbors: pushing %i ,%i onto neighbors",i-1,j-1);
		pushCounter++;
	}
	if(j>0 && i<gridsize-1 && grid[i][j-1]===0)
	{
		iarr.push(i+1);
		jarr.push(j-1);
		console.log("CornerNeighbors: pushing %i ,%i onto neighbors",i+1,j-1);
		pushCounter++;
	}	
	if(i<gridsize-1 && j<gridsize-1 && grid[i+1][j]===0)
	{
		iarr.push(i+1);
		jarr.push(j+1);
		console.log("CornerNeighbors: pushing %i ,%i onto neighbors",i+1,j+1);
		pushCounter++;
	}
	if(j<gridsize-1 && i>0 && grid[i][j+1]===0)
	{
		iarr.push(i-1);
		jarr.push(j+1);
		console.log("CornerNeighbors: pushing %i ,%i onto neighbors",i-1,j+1);
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
	console.log("corners: original seed: %i , %i",i,j);
	var iarr=new Array();
	var jarr=new Array();
	getCornerNeighbors(i,j,result,gridsize,iarr,jarr);
	getSideNeighbors(i,j,result,gridsize,iarr,jarr);
	while(filledSquares>=0)
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
	return result;
}//end sides


/*
function mergeArs(array1, array2, gridsize)
{
	var result=new Array();
	for(var i=0; i<gridsize; i++)
	{
		for(var j=0; j<gridsize; j++)
		{
			if(array1[i][j]===1 || array2[i][j]===1)
				{result[i][j]=1;}
			else
				{result[i][j]=0;}
		}
	}	
	return result;
}

function sepSideNeighbors(i,j,grid,gridsize,iarr,jarr,avoidgrid)// Totally check [i][j+1]; [i],[j-1]; [i-1][j]; [i+1][j]
{
	//function getSideNeighbors(i,j,grid,gridsize,iarr,jarr)//WIP Totally check [i][j+1]; [i],[j-1]; [i-1][j]; [i+1][j]
	var dummy1=new Array();
	var dummy2=new Array();
	//push shoves things onto the end and returns the length
	var pushCounter=0;
	if(i>0 && grid[i-1][j]===0 && getSideNeighbors(i-1,j,avoidgrid,gridsize,dummy1,dummy2)===0 && getCornerNeighbors(i-1,j,avoidgrid,gridsize,dummy1,dummy2)==0)
	{
		iarr.push(i-1);
		jarr.push(j);
		console.log("sepSideNeighbors: pushing %i ,%i onto neighbors",i-1,j);
		pushCounter++;
	}
	if(j>0 && grid[i][j-1]===0 && getSideNeighbors(i,j-1,avoidgrid,gridsize,dummy1,dummy2)===0 && getCornerNeighbors(i,j-1,avoidgrid,gridsize,dummy1,dummy2)===0)
	{
		iarr.push(i);
		jarr.push(j-1);
		console.log("sepSideNeighbors: pushing %i ,%i onto neighbors",i,j-1);
		pushCounter++;
	}	
	if(i<gridsize-1 && grid[i+1][j]===0 && getSideNeighbors(i+1,j,avoidgrid,gridsize,dummy1,dummy2)===0 && getCornerNeighbors(i+1,j,avoidgrid,gridsize,dummy1,dummy2)===0)
	{
		iarr.push(i+1);
		jarr.push(j);
		console.log("sepSideNeighbors: pushing %i ,%i onto neighbors",i+1,j);
		pushCounter++;
	}
	if(j<gridsize-1 && grid[i][j+1]===0 && getSideNeighbors(i,j+1,avoidgrid,gridsize,dummy1,dummy2)===0 && getCornerNeighbors(i,j+1,avoidgrid,gridsize,dummy1,dummy2)===0)
	{
		iarr.push(i);
		jarr.push(j+1);
		console.log("sepSideNeighbors: pushing %i ,%i onto neighbors",i,j+1);
		pushCounter++;
	}
	//to return things just shove j on the back of i, we will always get an even number, 0 pairs with array.length/2, add up
	console.log("done getting all %i sepSideNeighbors of %i , %i",pushCounter,i,j);
	return pushCounter;
}

function sepSides(gridsize)
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
	while(i2===i1 || i2===i1+1 || i2===i1-1 || j2===j1 ||j2===j1+1 ||j2 ===j1-1)//making sure seeds dont touch
		{
			i2 = Math.floor(Math.random()*gridsize);
			j2 = Math.floor(Math.random()*gridsize);
		}
		result2[i1][j1]=1;//fill in first of result2
	console.log("sepSides: original seed1: %i , %i",i1,j1);
	console.log("sepSides: original seed2: %i , %i",i2,j2);
	var i2arr=new Array();
	var j2arr=new Array();
	sepSideNeighbors(i1,j1,result1,gridsize,i1arr,j1arr,result2);//first sides for 1
	sepSideNeighbors(i2,j2,result2,gridsize,i2arr,j2arr,result1);
	console.log("just before while loop")
	while(filledSquares>=0)
		{
			var whichSeed=Math.floor(Math.random*2);
			var randomNeighbor=Math.floor(Math.random()*i1arr.length);//min here 
			if(i1arr.length!==0)
			{
				result1[ i1arr[randomNeighbor] ][ j1arr[randomNeighbor] ]=1;//setting randomly picked neighbor to 1
				console.log("%i left to fill, filling %i ,%i",filledSquares,i1arr[randomNeighbor],j1arr[randomNeighbor]);
				//I dont think we will ever run out of available neighborsToSplit
				//getting all neighbors
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
			if(i2arr.length!==0 )
			{
				result2[ i1arr[randomNeighbor] ][ j1arr[randomNeighbor] ]=1;//setting randomly picked neighbor to 1
				console.log("%i left to fill, filling %i ,%i",filledSquares,i2arr[randomNeighbor],j2arr[randomNeighbor]);
				//I dont think we will ever run out of available neighborsToSplit
				//getting all neighbors
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
*/
