// depends on iterasures.js

function rng ( pI_min, pI_max ) {

	return function ( i ) {

		return pI_min <= i && i < pI_max ? 1 : 0;
	}
}

function pnrm ( pD_mu = 0, pD_sigma = 1 ) {

	return function ( x ) {

		return Math.exp ( ( pD_mu - x ) * ( x - pD_mu ) / ( 2. * pD_sigma * pD_sigma ) ) / ( Math.sqrt ( 2. * Math.PI ) * pD_sigma );
	}
}

function xpct ( x, p = arr ( x.length, cst ( 1. / x.length ) ) ) {

	return cum ( rAdd, rel ( rMul, x, p ) );
}

function vrnc ( x, p = arr ( x.length, cst ( 1. / x.length ) ) ) {

	return xpct ( fun ( sSqr, rel ( rSub, x, xpct ( x, p ) ) ), p );
}

function sgm ( x, p ) {

	return Math.sqrt ( vrnc ( x, p ) );
}

function prb ( q, p ) {

	return cum ( rAdd, fun ( rng ( -Infinity, q ), fun ( int( ), p ) ) );
}

function qntl ( q, x, p ) {

	return x[ prb ( q, p ) ];
}
