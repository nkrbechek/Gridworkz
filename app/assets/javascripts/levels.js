var a_canvas = document.getElementById("a");
var context = a_canvas.getContext("2d");

var gridsize; //this is an int gridsize
var shapetype;
/*0=block, 1=sides, 2=corners, 3=cornerSides, 
*4=sepSides, 5=sepCorners, 6=sepMixed, 7=islands */

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
}

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
}

function sides(gridsize)//not the most efficiant
{	var result = initialize(gridsize);
	var filledSquares=Math.floor(gridsize*gridsize/3)-1;//30% rounded down -first point
	var starti = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var startj = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		result[starti][startj]=1;
	while(filledSquares!==0)	//fillin squares
	{
		var direction=Math.floor(Math.random()*4);
		//0->i--, 1->i++, 2->j--, 3->j++;
		var tempi;
		var tempj;
		switch(direction)
		{
			case 0:
			 	tempi=starti-1;
			 	break;
			case 1:
				tempi=starti+1;
				break;
			case 2:
				tempj=startj-1;
				break;
			case 3:
				tempj=startj+1;
				break;
			default:
				console.log('something went wrong');
				break;
		}//end switch case
		if(tempi<gridsize && tempj<gridsize && tempi>=0 && tempj>=0 && result[i][j]===0 )
		{
			result[i][j]=1;
			filledSquares--;
		}
	}//end loop
	return result;
}

function corners(gridsize)
{
	var result = initialize(gridsize);
	var filledSquares=Math.floor(gridsize*gridsize/3)-1;//30% rounded down -first point
	var starti = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var startj = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		result[starti][startj]=1;
	while(filledSquares!==0)	//fillin squares
	{
		var direction=Math.floor(Math.random()*4);
		//0->i--, 1->i++, 2->j--, 3->j++;
		var tempi;
		var tempj;
		switch(direction)
		{
			case 0:
			 	tempi=starti-1; tempj=startj-1;
			 	break;
			case 1:
				tempi=starti+1; tempj=startj+1;
				break;
			case 2:
				tempj=startj-1; tempi=starti+1;
				break;
			case 3:
				tempj=startj+1; tempi=starti-1;
				break;
			default:
				console.log('something went wrong');
				break;
		}//end switch case
		if(tempi<gridsize && tempj<gridsize && tempi>=0 && tempj>=0 && result[i][j]===0 )
		{
			result[i][j]=1;
			filledSquares--;
		}
	}//end loop
	return result;	
}

function cornerSides(gridsize)
{	
	var result = initialize(gridsize);
	var filledSquares=Math.floor(gridsize*gridsize/3)-1;//30% rounded down -first point
	var starti = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var startj = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		result[starti][startj]=1;
	while(filledSquares!==0)	//fillin squares
	{
		var direction=Math.floor(Math.random()*8);
		//0->i--, 1->i++, 2->j--, 3->j++;
		var tempi;
		var tempj;
		switch(direction)
		{
			case 0:
			 	tempi=starti-1; tempj=startj-1;
			 	break;
			case 1:
				tempi=starti+1; tempj=startj+1;
				break;
			case 2:
				tempj=startj-1; tempi=starti+1;
				break;
			case 3:
				tempj=startj+1; tempi=starti-1;
				break;
			case 4:
			 	tempi=starti-1;
			 	break;
			case 5:
				tempi=starti+1;
				break;
			case 6:
				tempj=startj-1; 
				break;
			case 7:
				tempj=startj+1;
				break;
			default:
				console.log('something went wrong');
				break;
		}//end switch case
		if(tempi<gridsize && tempj<gridsize && tempi>=0 && tempj>=0 && result[i][j]===0 )
		{
			result[i][j]=1;
			filledSquares--;
		}
	}//end loop
	return result;
}

function doNotTouch(ai, aj, bi, bj)
{
	if(ai===bi && (aj===bj || aj+1===bj || aj-1===bj) )
	return false;
	if(ai===bi+1 && (aj===bj || aj+1===bj || aj-1===bj) )
	return false;
	if(ai===bi-1 && (aj===bj || aj+1===bj || aj-1===bj) )
	return false;
	
	return true;
}

function doesNotTouchGroup(ai,aj,array,gridsize)
{
	var result=true;
	if(array[ai][aj]==1 || array[ai][aj+1] || array[ai][aj-1])
		return false;
	if(array[ai+1][aj]==1 || array[ai+1][aj+1] || array[ai+1][aj-1])	
		return false;
	if(array[ai-1][aj]==1 || array[ai-1][aj+1] || array[ai-1][aj-1])	
		return false;
	
	
	return true;
}

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
				{result=0;}
		}
	}
	
	return result;
}

function sepSides(gridsize)//Ill make two islands
{
	var resulta=initialize(gridsize);
	var resultb=initialize(gridsize);

	var filledSquares=Math.floor(gridsize*gridsize/3)-1;//30% rounded down -first point
	
	var ai = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var aj = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		result[ai][aj]='a';
	var bi = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var bj = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	
	//making sure sepperate start pts
	while(doNotTouch(ai,aj,bi,bj)!==true)
	{
		bi = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		bj = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	}
	
	while(filledSquares>0)
	{
		var direction=Math.floor(Math.random()*4);
		//0->i--, 1->i++, 2->j--, 3->j++;
		var tempi;
		var tempj;
		switch(direction)
		{
			case 0:
				if(filledSquares%2===0)
			 		tempi=ai-1;
				else
					tempi=bi-1;
			 	break;
			case 1:
				if(filledSquares%2===0)
					tempi=aj+1;
				else
					tempi=bj+1;
				break;
			case 2:
				if(filledSquares%2===0)
					tempj=aj-1;
				else
					tempj=bj-1;
				break;
			case 3:
				if(filledSquares%2===0)
					tempj=aj+1;
				else
					tempj=bj+1;
					
				break;
			default:
				console.log('something went wrong');
				break;
		}//end switch case
		if(filledSquares%2===0 && doesNotTouchGroup(tempi,tempj,resultb) )//we came from a
		{
			resulta[i][j]=1;
			filledSquares--;
		}
		   if(filledSquares%2!==0 && doesNotTouchGroup(tempi,tempj,resulta) )//we came from b
		{
			resultb[i][j]=1;
			filledSquares--;
		}
	}
	return mergeArs(resulta,resultb,gridsize);
}

function sepCorners(gridsize)
{
	var result = initialize(gridsize);	
}

function sepMixed(gridsize)
{
	var result = initialize(gridsize);
}


function islands(gridsize)
{
	var result = initialize(gridsize);
	var filledSquares=Math.floor(gridsize*gridsize/3)-1;//30% rounded down -first point
	var starti = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
	var startj = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		result[starti][startj]=1;
	while(filledSquares!==0)	//fillin squares
	{
		starti = Math.floor(Math.random()*gridsize);//0-(gridsize-1)
		startj = Math.floor(Math.random()*gridsize);//0-(gridsize-1)

		var ok=true;

		if(result[starti+1][startj]===1 || result[starti+1][startj-1]===1 ||result[starti+1][startj+1]===1)
			{ok=false;}  
		if(result[starti][startj]===1 || result[starti][startj-1]===1 || result[starti][startj+1]===1 )
			{ok=false;}
		if(result[starti-1][startj]===1 || result[starti-1][startj-1]===1 ||result[starti-1][startj+1]===1)
			{ok=false;}
	
		if(ok===true)
		{
			filledSquares--;
			result[starti][startj]=1;
		}
	}
}
