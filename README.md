## CODINGS

a small collection of maybe useful javascript packages

# The Iterasure - Package
iterasures.js

```
<script src="https://github.com/samuelohterion/js.toolbox.git/js.toolbox/iterasures.js" type="text/javascript">
</script>
```

[ github ](js.toolbox/js.toolbox/iterasures.js)
this often will be used in further packages as e.g. "statistics" or "multi layer perceptron" or "plot2d".
# iterasure as closures for iterators on arrays
### five commands to handle arrays

```
seq ( pUFct_fct, pI_begin, pI_end, pA_dst = [ ] );
fun ( pUFct_fct, pA_src, pA_dst = [ ] );
rel ( pBFct_fct, pA_src1, pA_src2, pA_dst = [ ] );
cum ( pBFct_fct, pA_src, s = 0 );
iof ( pBFct_fct, pA_src, s = 0 );
```

the power of these 5 little foo bars comes with the also small collection of helper functions and the opportunity to write small closures by yourself.
## the only helper function "arr"


```
arr ( pI_size, pUFct_fct = cst ( 0 ), pA_dst = [ ] );
```

this is just a wrapper for


```
seq ( pUFct_fct = cst ( 0 ), pI_begin = 0, pI_end = pI_size, pA_dst = [ ] );
```

use it like


## helper closures
### for creating an array of constant values
- this is a way to create an array with values computed by
- y = p_val


```
cst ( p_val );
```

### for creating an array of in- or decreasing values
- this is a way to create an array with values computed by
- y = i * p_val

```
add ( p_val );
```

- where i goes from 0 to pI_size
- of coures if with p_val < 0 the sequence will decrease
- actually cst ( p_n ) and add ( p_m ) are short hands for the much more powerful "pol"-ynomial closure.
- cst ( p_n ) abbreviates pol ( [ p_n ] )
- add ( p_m ) abbreviates pol ( [ 0, p_m ] )

### for creating an array of values computed by a polynomial


```
pol ( pA_coeff );
```

- as seen before u can create a linear sequence compute a polynomial on it to create an array
- here pA_coeff is an array of the first n coefficients of the polynomial that should be applied

### for integrating all values of an array by a certain delta X and an offset of c

```
intg ( dx = 1, c = 0 );
```

### for essential computings


`
sSet ( a );
sSqt ( a );
sSqr ( a );
sExp ( a );
sLog ( a );
rMin ( a, b );
rMax ( a, b );
rAdd ( a, b );
rSub ( a, b );
rMul ( a, b );
rDiv ( a, b );
rPow ( a, b );
`

## how to
### create an array

#### by seq

```
var
// five_zeros = [ 0, 0, 0, 0, 0 ]
five_zeros = seq ( cst ( 0 ), 0, 5 ),

// four_ones = [ 1, 1, 1, 1 ]
four_ones = seq ( cst ( 1 ), 0, 4 );

// teens = [ 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ]
ten_teens = seq ( add ( 10 ), 0, 10 ),

// y = ( x - a ) * ( x - b )
// y = ab - ( a + b ) * x + x * x
// a = b = 1
// x:      [ 0, 1, 2, 3, 4 ]
// poly2 = [ 1, 0, 1, 4, 9 ]
poly2 = seq ( pol ( [ 1, -2, 1 ] ), 0, 5 );

```
#### by arr


```
var
// five_zeros = [ 0, 0, 0, 0, 0 ]
five_zeros = arr ( 5 ),

// four_ones = [ 1, 1, 1, 1 ]
four_ones = arr( 4, cst ( 1 ) );

// teens = [ 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ]
ten_teens = arr ( 10, add ( 10 ) ),

// y = ( x - a ) * ( x - b )
// y = ab - ( a + b ) * x + x * x
// a = b = -1
// x:      [ 0, 1, 2, 3, 4 ]
// poly2 = [ 1, 0, 1, 4, 9 ]
// poly2 = [ 1, 4, 9, 16, 25 ]

poly2 = arr ( 5, pol ( [ 1, 2, 1 ] ) );
```

# Examples
## lets make some plots
* the package plot2d.js will be described later
* but it's very intuitive
* so let's use it here for playing with some array magic

```
<!DOCTYPE = HTML>
<html>
	<head>
		<title>
			simple 2d plot
		</title>
		<script src="../js.tool.box/iterasures.js" type="text/javascript"></script>
		<script src="../js.tool.box/plot2d.js" type="text/javascript"></script>
		<link rel="stylesheet" type="text/css" href="simple_plot2d.css">
	</head>
	<body>
		<canvas id="cnvs">
				no html 5 supported
		</canvas>
		<p id="out">
			out
		</p>
		<script type="text/javascript">
			var
			tm = 0;

			requestAnimationFrame ( loop );

			function loop ( ) {

				tm += 1/60;

				requestAnimationFrame ( loop );

				var
				dx = .01,
				x  = seq ( pol ( [ 0, dx * ( Math.exp ( -5 + 20. * Math.sin ( .03 * tm ) ) ) ] ), -500, +501 ),
				y0  = fun ( sSqr, x ),
				//( x-a)(x-b)(x-c)=x*x*x-(a+b+c)*x*x+(ab+ac+bc)*x-abc
				//a=-1, b=0; c=1
				//1x^3-0x^2-1x-0
				y1  = fun ( pol ( [ 0, -1, 0, +1 ] ), x ),
				y2  = fun ( function ( i ) { return .25 * Math.sin ( 10 * Math.PI * i ) / i - 7.85398172; }, x );

				var
				plot2d = new Plot2d ( "cnvs" );

				plot2d.fcol ( "#ff0000");
				plot2d.addYX ( y0, x );

				plot2d.fcol ( "#00ff00");
				plot2d.addYX ( y1, x );

				plot2d.fcol ( "#0000ff");
				plot2d.addYX ( y2, x );

				plot2d.fcol ( "#f0f0f0" );
				plot2d.grid ( );

				plot2d.draw ( );

				var
				mT = plot2d.cntxt.measureText ( "SIMPLE-2D-PLOT" )
				w = mT.width;

				plot2d.text ( "SIMPLE-2D-PLOT", plot2d.cnvs.width / 2 - w, plot2d.cnvs.height / 2 );

				var
				maxY0 = cum ( rMax, y0 ),
				maxY1 = cum ( rMax, y1 ),
				maxY2 = cum ( rMax, y2 ),
				xOfMaxY0 = x [ iof ( rMax, y0 ) ],
				xOfMaxY1 = x [ iof ( rMax, y1 ) ],
				xOfMaxY2 = x [ iof ( rMax, y2 ) ];

				document.getElementById ( "out" ).innerHTML =
				" ( x0, y0 ) : ( " + xOfMaxY0.toFixed( 5 ) + ", " + maxY0.toFixed( 5 ) + " )<br>" +
				" ( x1, y1 ) : ( " + xOfMaxY1.toFixed( 5 ) + ", " + maxY1.toFixed( 5 ) + " )<br>" +
				" ( x2, y2 ) : ( " + xOfMaxY2.toFixed( 5 ) + ", " + maxY2.toFixed( 5 ) + " )";
			}
		</script>
	</body>
</html>
```

[mlp](examples/mlp/mlp.html)
[plot 2d 1](examples/plot2d/simple_plot2d.html)
[plot 2d 2](examples/plot2d/simple_plot2d_2.html)
[statistics](examples/statistics/statistics.html)
