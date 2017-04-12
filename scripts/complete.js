var DRYOBJ = ( function ( ) {
	
	/*################  ES5 pragma  ######################*/
	'use strict';	

	// The Browser Prefixes
	var _arVendorPREs = [ "moz", "ms", "webkit", "o" ];

	// ######################
	// ##   Window object
	// ######################
	var _window = window; // GLOBAL element

	// ############################
	// ## 
	// ## function _RetEVTsrcEL_evtTarget(leEvt){}
	// ## 
	// ## // IE and w3c MODELS 
	// ## Motivated by each Robert Nyman and "Doc Crock". Hip-hip!
	// ############################
	function _RetEVTsrcEL_evtTarget( leEvt ) { 
		if( typeof leEvt !== "undefined") { 
			var _EREF = leEvt; 		// w3c
		}
		else {
			var _EREF = window.event; // IE8--
		}
		if( typeof _EREF.target !== "undefined") {
			var evtTrgt = _EREF.target;	// w3c 
			//			console.log( "_EREF.target..." + _EREF.target);  // Temporarily SHUT-OFF, dL, 2013_0608 1720H
		}
		else {
			var evtTrgt = _EREF.srcElement; // IE8--
			//			console.log( "_EREF.srcElement..." + _EREF.srcElement ); // Temporarily SHUT-OFF, dL, 2013_0608 1720H
		}
		return evtTrgt;
	}
	// IMPLEMENTATION FOR TESTING PURPOSES
	// var evtTrgt = DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget( leEvt ); console.log(evtTrgt);
	
		// ############################
	// ## 
	// ##     AddEventoHandler Facade Pattern Function
	// ##     function _AddEventoHandler(nodeFlanders, type, callback) {}
	// ##     
	// ##     
	// ##     Previously designed to minimize anticipated 
	// ##     disconnect between each the W3C/Netscape
	// ##     and IE8 browser implementation models
	// ##     
	// ##     Motivated by each Douglas "Release The 'Crock'" Crockford, John Resig, 
	// ##     Dean Edwards, and Sunday evenings on FOX from many, many, many years ago-- ¡Grax a todos! (Thank you all)
	// ##     
	// ##     As of January 2017, this is no longer necessary and is an item in progress
	// ##     in terms of weaning away from PRESENTLY unsupported versions of IE. :)
	// ##     
	// ##     
	// ############################
	function _AddEventoHandler( nodeFlanders, type, callback ) {
		if( type !== "DOMContentLoaded") { 
			if( nodeFlanders.addEventListener ) { 
				// W3C browser implementation 
				nodeFlanders.addEventListener( type, callback, false);
			}		
			else	
			if( nodeFlanders.attachEvent ) { 
				// IE8-- browser implementation 
				nodeFlanders.attachEvent( "on" + type, callback );
			} 		
			else { 
				// Classical Event model
				nodeFlanders["on" + type] = callback; 
			}
		}
		else 
		if( type === "DOMContentLoaded" ) { 
			if( nodeFlanders.addEventListener ) { 
				// W3C browser implementation 
				nodeFlanders.addEventListener( type, callback, false);
			}
			else 
			if( nodeFlanders.attachEvent ) { 
				if( nodeFlanders.readyState === "loading" ) {
					nodeFlanders.onreadystatechange = callback;
				}
			}
			else { 
				// Classical Event model
				nodeFlanders["on" + type] = callback; 
			}
		}
	}

		// ######################
	// ##   Generic CSS Property Constructor Routine 
	// ##   with pm1( CSSProp ) 
	// ##   and pm2( document.createElement("div").style ) 
	// ######################	
	
	function _ReturnJSProperty( pm1 ) { // ( pm1, pm2 ) 
		var pm2 = document.createElement("div").style; // 
		var ar_vendorPreez = _arVendorPREs; // -->  object
		// [ "moz", "ms", "webkit", "o" ] 
		var clCharMax = ar_vendorPreez.length; // 3 
		var leProp;
		var dL;
		
		var param = pm1; // " transform "
		var paramEl = pm2; // " document.createElement("div").style "
		var len = param.length; 
		var nc = param.slice( 0,1 ); // t
		var Uc = param.slice( 0,1 ).toUpperCase(); // T
		
		var Param = param.replace( nc, Uc ); // transform	
		if ( param in paramEl ) { 
			leProp = param; 
		} 
		for ( dL = 0; dL < clCharMax; dL = dL + 1) { 
			if ( ar_vendorPreez[ dL ] + Param in paramEl ) { 
		// " transform " --> msTransform, webkitTransform, oTransform, mozTransform
				leProp = ar_vendorPreez[ dL ] + Param; 
			} 
		} 
		return leProp;
	}
	
	// ######################
	// ##   Return CSS Property Routine 
	// ##   with pm1( CSSProp ) 
	// ##   and pm2( document.createElement("div").style ) 
	// ######################	
	
	function _ReturnCSSProperty( pm1 ) { // ( pm1, pm2 ) 
		var dashChar = "-";
		var pm2 = document.createElement("div").style;  
		var ar_vendorPreez = _arVendorPREs; // -->  object
		// [ "moz", "ms", "webkit", "o" ] 
		var clCharMax = ar_vendorPreez.length; // 3 
		var leProp;
		var dL;
		
		var param = pm1; // " transform "
		var paramEl = pm2; // " document.createElement("div").style "
		var len = param.length; 
		var nc = param.slice( 0,1 ); // t
		var Uc = param.slice( 0,1 ).toUpperCase(); // T
		
		var Param = param.replace( nc, Uc ); // transform	
		if ( param in paramEl ) { 
			leProp = param; 
		} 
		for ( dL = 0; dL < clCharMax; dL = dL + 1) { 
			if ( ar_vendorPreez[ dL ] + Param in paramEl ) { 
		// " transform " --> -ms-transform, -webkit-transform, -o-transform, -moz-transform
				leProp = dashChar + ar_vendorPreez[ dL ] + dashChar + param; 
			} 
		} 
		return leProp;
	}
	
	// ############################
	// ##   Return CSS Keyframe Animation Routine 
	// ##   with pm1( CSSProp ) 
	// ##   that is later helpful in obtaining 
	// ##   "the ampersand + keyframes" property
	// ############################
	
	function _Returnkeyframes( pm1 ) { // ( pm1 ) 
		var dashChar = "-";
		var ampChar = "@";
		
		var pm2 = document.createElement("div").style; // 
		var ar_vendorPreez = [ "moz", "ms", "webkit", "o" ]; // -->  object
		// [ "moz", "ms", "webkit", "o" ] 
		var clCharMax = ar_vendorPreez.length; // 3 
		
		var keyframes; // var leProp;
		var dL;
		
		var param = pm1; // "animationName" 
		var paramEl = pm2; // " document.createElement("div").style "
		var len = param.length; 
		var nc = param.slice( 0,1 ); // a // t
		var Uc = param.slice( 0,1 ).toUpperCase(); // A // T
		
		var Param = param.replace( nc, Uc ); // animationName 
		if ( param in paramEl ) { 
			// leProp = param; 
			keyframes = ampChar + "keyframes"; 
		} 
		
		for ( dL = 0; dL < clCharMax; dL = dL + 1) { 
			if ( ar_vendorPreez[ dL ] + Param in paramEl ) { 
				// leProp = dashChar + ar_vendorPreez[ dL ] + dashChar + param; 
				
		// " @keyframes " --> @-ms-keyframes, @-webkit-keyframes, @-o-keyframes, @-moz-keyframes
				keyframes = ampChar + dashChar + ar_vendorPreez[ dL ] + dashChar + "keyframes"; //
			} 
		} 
		//return leProp;
		return keyframes;
	}

	// END of _private properties
	return {
		ApplyPrefixes : { 
			ReturnJSProperty : function( pm1 ) {
				return _ReturnJSProperty( pm1 );
			} , 
			ReturnCSSProperty : function( pm1 ) {
				return _ReturnCSSProperty( pm1 );
			} , 
			Returnkeyframes : function( pm1 ) {
				return _Returnkeyframes( pm1 );
			} 
		} , // END DRYOBJ.ApplyPrefixes 
		RetELs: {
			glow : function() { 
				return _window; 
			} 
		},
		Utils: {
			evt_u: {
				AddEventoHandler : function( nodeFlanders, type, callback ) {
					return _AddEventoHandler( nodeFlanders, type, callback );
				} , 
				RetEVTsrcEL_evtTarget : function( leEvt ) {
					return _RetEVTsrcEL_evtTarget( leEvt );
				}
			}
		} 
	}; // END public properties	
}( ) ); // console.log( DRYOBJ ); 

var Gh_pages_ex1 = ( function() {
	/*################  ES5 pragma  ######################*/
	'use strict';
	var _docObj = window.document;

	var _str_href = window.location.href;
	
	var _leHead = _docObj.getElementsByTagName( "head" )[0];	
	var _loadicon = _docObj.querySelector( "#loadicon" );	
	var js_animation = DRYOBJ.ApplyPrefixes.ReturnJSProperty( "animation" ); // console.log("js_animation", js_animation ); // var css_animation, css_animationName	
	var css_transform = DRYOBJ.ApplyPrefixes.ReturnCSSProperty( "transform" ); // console.log( "css_transform" , css_transform );	
	var keyframes = DRYOBJ.ApplyPrefixes.Returnkeyframes( "animationName" ); // console.log( "keyframes", keyframes );
	
	function _DOMCONLO() {
		// console.log( 'now it\'s DCL' );
		// console.log( "It\'s on, bebe!");
		
		_loadicon.style[ js_animation ] = "spin 1.406s linear infinite";	
		
		var KF_STR = "" +
		keyframes + " spin { "
			+ "from {" 
				+ css_transform + ":rotate( 0deg );" 
				+ " opacity: 0.4; " 
			+" }" 
			+ "50% {" 
				+ css_transform + ":rotate( 180deg );" 
				+ " opacity: 1.0;" 
			+" }" 			
			+ "to {" 
				+ css_transform + ":rotate( 360deg );" 
				+ " opacity: 0.4;" 
			+ " }" 		
		+ "}";
		
		var leFrag = _docObj.createDocumentFragment();
		

		var leStyle = _docObj.createElement( "style" );
		leStyle.type = "text/css";
		leStyle.setAttribute( "media", "all,screen,projection" );
		leStyle.appendChild( _docObj.createTextNode( KF_STR ) ); // console.log( leStyle );
		
		leFrag.appendChild( leStyle );
		_leHead.appendChild( leFrag ); // console.log( _leHead );

	}

	var _xhr = false, _arGLO_SAILORs = [], _url = "data/sailors_AtSea.xml", _curImg = undefined, _docObj = window.document; 
	
	function SetDir( leEvt ) {
		var evtTrgt = DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget( leEvt );
		if( evtTrgt.id === "nextLink" ) {
			var direction = 1;
			ElectricCitation(direction);
		}
		else 
		if( evtTrgt.id === "prevLink" ) {
			var direction = -1;
			ElectricCitation(direction);
		}
	} // END SetDir()
	
	function ElectricCitation( pmdir ) { 
		var captionText = _arGLO_SAILORs, imgCt = captionText.length;
		if ( !_curImg ) {
			_curImg = 0;
		}
		else
		if ( !! _curImg ) {
			_curImg = _curImg;
		}
		_curImg = _curImg + pmdir;
		if ( _curImg < 0 ) {
			_curImg = imgCt - 1;
		}
		if ( _curImg === imgCt ) {
			_curImg = 0;
		} //console.log(captionText[_curImg]);	
		
		
		_docObj.getElementById( "posterText" ).innerHTML = "";
		_docObj.querySelector( "#loadicon" ).style.display = "none";
		
		var headFrag = _docObj.createDocumentFragment();
		var headEL = _docObj.createElement( "h1" );
		var headSTR = _docObj.createTextNode( "Pirate " + captionText[_curImg].OCCUPATION + " " + captionText[_curImg].FIRSTNAME + " " + captionText[_curImg].LASTNAME );
		headEL.setAttribute( "class", "header" );
		headEL.appendChild( headSTR );
		headFrag.appendChild( headEL );
		
		var pBlkShpFrag = _docObj.createDocumentFragment();
		var pBlkShpEL = _docObj.createElement( "p" );
		// BEG
		var anchoTNFrag = _docObj.createDocumentFragment(); 
		var anchoTNEL = _docObj.createElement( "a" );
		// anchoTNEL.setAttribute( "class" , "thumbnail" );
		anchoTNEL.setAttribute( "class" , "img-thumbnail leBlkAncho" );
		anchoTNEL.setAttribute( "target" , "_blank" );
		anchoTNEL.setAttribute( "href" , captionText[_curImg].BLOG );
		
		var imgJrFrag = _docObj.createDocumentFragment(); 
		var imgJrEL = _docObj.createElement( "img" );
		var altTxt = "Picture of " + captionText[_curImg].FIRSTNAME + " " + captionText[_curImg].LASTNAME + "\'s jolly roger";
		imgJrEL.setAttribute( "alt" , altTxt );
		
		var srcVal = _str_href + "img/jollyRMugiwara/" + captionText[_curImg].URL + "" ;

		imgJrEL.setAttribute( "src" , srcVal );
		imgJrEL.setAttribute( "width" , "48" );
		imgJrEL.setAttribute( "height" , "48" );
		imgJrEL.setAttribute( "class" , "leBlkImg" );
		
		imgJrFrag.appendChild( imgJrEL );
		anchoTNEL.appendChild( imgJrFrag );
		
		var spanFrag = _docObj.createDocumentFragment(); 
		var spanEL = _docObj.createElement( "span" );
		spanEL.setAttribute( "class" , "text-success lead" );
		spanEL.appendChild( _docObj.createTextNode( "Visit " + captionText[_curImg].CREW + " " + captionText[_curImg].OCCUPATION + " " + captionText[_curImg].EPITHET + "\'s wikia today" ) ); 
		
		spanFrag.appendChild( spanEL );
		anchoTNEL.appendChild( spanFrag );
		
		anchoTNFrag.appendChild( anchoTNEL );
		pBlkShpEL.appendChild( anchoTNFrag );
		
		// END
		pBlkShpFrag.appendChild( pBlkShpEL );
		
		var pTIFrag = _docObj.createDocumentFragment();
		var pTIEL = _docObj.createElement( "p" );
		var ptiSTR = _docObj.createTextNode( captionText[_curImg].LASTNAME + " is the " + captionText[_curImg].CLUBMEMBER + " member to join the " + captionText[_curImg].CREW );
		pTIEL.setAttribute( "class", "text-info lead" );
		pTIEL.appendChild( ptiSTR );
		pTIFrag.appendChild( pTIEL );
		
		var pTPFrag = _docObj.createDocumentFragment();
		var pTPEL = _docObj.createElement( "p" );
		var ptpSTR = _docObj.createTextNode( captionText[_curImg].FIRSTNAME + " " + captionText[_curImg].LASTNAME + " is the " + captionText[_curImg].OCCUPATION + " aboard the " + captionText[_curImg].SHIP );
		pTPEL.setAttribute( "class", "text-primary lead" );
		pTPEL.appendChild( ptpSTR );
		pTPFrag.appendChild( pTPEL );
		
		var pTSFrag = _docObj.createDocumentFragment();
		var pTSEL = _docObj.createElement( "p" );
		var ptsSTR = _docObj.createTextNode( captionText[_curImg].LASTNAME + " debuted in episode " + captionText[_curImg].EPDEBUT + " and carries a bounty worth " + captionText[_curImg].BOUNTY + " Beri" );
		pTSEL.setAttribute( "class", "text-success lead" );
		pTSEL.appendChild( ptsSTR );
		pTSFrag.appendChild( pTSEL );		
		
		_docObj.getElementById( "posterText" ).appendChild( headFrag );
		_docObj.getElementById( "posterText" ).appendChild( pBlkShpFrag );
		_docObj.getElementById( "posterText" ).appendChild( pTIFrag );
		_docObj.getElementById( "posterText" ).appendChild( pTPFrag );
		_docObj.getElementById( "posterText" ).appendChild( pTSFrag );
		
	} // END ElectricCitation()
	
	function _LOAD() { 
		if (window.XMLHttpRequest) { _xhr = new XMLHttpRequest(); }
		else
		if (window.ActiveXObject) { _xhr = new ActiveXObject("Microsoft.XMLHTTP"); } 
		
		if ( !! _xhr) {
			_xhr.onreadystatechange = BuildDataArrayFromXml;
			_xhr.open("GET", _url, true);
			_xhr.send(null); 
			
			// _docObj.getElementById("posterText").innerHTML = "LOADICON...";
			_docObj.getElementById("posterText").innerHTML = "";
			_docObj.querySelector( "#loadicon" ).style.display = "inline-block";
			
			if( _docObj.documentElement.addEventListener ) {_xhr.onload = NeutralizeXHR; }
		} // END if ( !!_xhr )
		else
		if (!_xhr) { alert("Sorry, bub -- An XHR could not be requested."); } 
		DRYOBJ.Utils.evt_u.AddEventoHandler( _docObj.getElementById("nextLink"), "click", SetDir );
		DRYOBJ.Utils.evt_u.AddEventoHandler( _docObj.getElementById("prevLink"), "click", SetDir );
	} // END _LOAD()
	
	function NeutralizeXHR()  { // console.log( "_xhr", _xhr );
		_xhr = null; //console.log( "_xhr", _xhr );
	} // END NeutralizeXHR()
	
	function BuildDataArrayFromXml() {
		if ( this.readyState === 4 ) {
		if ( this.status === 200) {
			if ( this.responseXML) {
				
				var arXHRpushed_SWABBIEs = this.responseXML.getElementsByTagName("CREWMEMBER"), xhrSwabLen = arXHRpushed_SWABBIEs.length;
				for (var iter = 0; iter < xhrSwabLen; iter = iter + 1) {
					
					var tempOBJ = {};
					
					tempOBJ.FIRSTNAME = GetVal(arXHRpushed_SWABBIEs[iter], "FIRSTNAME");
					tempOBJ.LASTNAME = GetVal(arXHRpushed_SWABBIEs[iter], "LASTNAME");
					tempOBJ.EPITHET = GetVal(arXHRpushed_SWABBIEs[iter], "EPITHET");
					tempOBJ.OCCUPATION = GetVal(arXHRpushed_SWABBIEs[iter], "OCCUPATION");
					tempOBJ.BOUNTY = GetVal(arXHRpushed_SWABBIEs[iter], "BOUNTY");
					tempOBJ.BLOG = GetVal(arXHRpushed_SWABBIEs[iter], "BLOG");
					tempOBJ.URL = GetVal(arXHRpushed_SWABBIEs[iter], "URL");
					tempOBJ.EPDEBUT = GetVal(arXHRpushed_SWABBIEs[iter], "EPDEBUT");
					tempOBJ.SHIP = GetVal(arXHRpushed_SWABBIEs[iter], "SHIP");
					tempOBJ.CREW = GetVal(arXHRpushed_SWABBIEs[iter], "CREW");
					tempOBJ.CLUBMEMBER = GetVal(arXHRpushed_SWABBIEs[iter], "CLUBMEMBER");
					
					_arGLO_SAILORs[iter] = tempOBJ; 
					
				} // END for () 
				
				AccessRecord(); //console.log("_arGLO_SAILORs" , _arGLO_SAILORs );
				
			} // END if ( _xhr.responseXML )
		} // END if( _xhr.status === 200 ) 
		else {
			alert("Problems, dude: ", this.status);
		} 
		} // END if( _xhr.readyState === 4 )

		function GetVal(pmData, pmTag) {
			return pmData.getElementsByTagName(pmTag)[0].firstChild.nodeValue;
		} // END GetVal(pmData,pmTag) 
		
	} // END BuildDataArrayFromXml()
	
	function AccessRecord() { 
		
		var CREWMEMBER = _arGLO_SAILORs[0]; // console.log( "CREWMEMBER", CREWMEMBER ); 
		var imgCt = _arGLO_SAILORs.length;
		
		var xFirst, xLast, xEpithet, xOccupation, xBounty, xBlog, xJollyRoger, xDebut, xShip, xCrew, xOrdinal;
		
		xFirst = CREWMEMBER.FIRSTNAME;
		xLast = CREWMEMBER.LASTNAME;
		xEpithet = CREWMEMBER.EPITHET;
		xOccupation = CREWMEMBER.OCCUPATION;
		xBounty = CREWMEMBER.BOUNTY;
		xBlog = CREWMEMBER.BLOG;
		xJollyRoger = CREWMEMBER.URL;
		xDebut = CREWMEMBER.EPDEBUT;
		xShip = CREWMEMBER.SHIP;
		xCrew = CREWMEMBER.CREW;
		xOrdinal = CREWMEMBER.CLUBMEMBER;
		
		ShowRecord( xFirst, xLast, xEpithet, xOccupation, xBounty, xBlog, xJollyRoger, xDebut, xShip, xCrew, xOrdinal );
	}
	
	function ShowRecord( pmFirst, pmLast, pmEpithet, pmOccupation, pmBounty, pmBlog, pmJollyRoger, pmDebut, pmShip, pmCrew, pmOrdinal ) { 
	
		_docObj.getElementById( "posterText" ).innerHTML = "";
		_docObj.querySelector( "#loadicon" ).style.display = "none";
		
		var headFrag = _docObj.createDocumentFragment();
		var headEL = _docObj.createElement( "h1" );	
		var headSTR = _docObj.createTextNode( "Pirate " + pmOccupation + " " + pmFirst + " " + pmLast );
		headEL.setAttribute( "class", "header " );
		headEL.appendChild( headSTR );
		headFrag.appendChild( headEL );
		
		var pBlkShpFrag = _docObj.createDocumentFragment();
		var pBlkShpEL = _docObj.createElement( "p" );
		
		// BEG
		
		var anchoTNFrag = _docObj.createDocumentFragment(); 
		var anchoTNEL = _docObj.createElement( "a" );
		anchoTNEL.setAttribute( "class" , "img-thumbnail leBlkAncho" );
		anchoTNEL.setAttribute( "target" , "_blank" );
		anchoTNEL.setAttribute( "href" , pmBlog );
		
		var imgJrFrag = _docObj.createDocumentFragment(); 
		var imgJrEL = _docObj.createElement( "img" );
		var altTxt = "Picture of " + pmFirst + " " + pmLast + "\'s jolly roger";
		imgJrEL.setAttribute( "alt" , altTxt );

		var srcVal = _str_href + "img/jollyRMugiwara/" + pmJollyRoger + "" ;

		imgJrEL.setAttribute( "src" , srcVal );
		imgJrEL.setAttribute( "width" , "48" );
		imgJrEL.setAttribute( "height" , "48" );
		imgJrEL.setAttribute( "class" , "leBlkImg" );
		
		imgJrFrag.appendChild( imgJrEL );
		anchoTNEL.appendChild( imgJrFrag );
		
		var spanFrag = _docObj.createDocumentFragment(); 
		var spanEL = _docObj.createElement( "span" );
		spanEL.setAttribute( "class" , "text-success lead" );
		spanEL.appendChild( _docObj.createTextNode( "Visit " + pmCrew + " " + pmOccupation + " " + pmEpithet + "\'s wikia today" ) ); 
		
		spanFrag.appendChild( spanEL );
		anchoTNEL.appendChild( spanFrag );
		
		anchoTNFrag.appendChild( anchoTNEL );
		pBlkShpEL.appendChild( anchoTNFrag );
		// END
		
		pBlkShpFrag.appendChild( pBlkShpEL );
		
		var pTIFrag = _docObj.createDocumentFragment();
		var pTIEL = _docObj.createElement( "p" ); 
		var ptiSTR = _docObj.createTextNode( pmLast + " is the " + pmOrdinal + " member to join the " + pmCrew );
		pTIEL.setAttribute( "class", "text-info lead" );
		pTIEL.appendChild( ptiSTR );
		pTIFrag.appendChild( pTIEL );
		
		var pTPFrag = _docObj.createDocumentFragment();
		var pTPEL = _docObj.createElement( "p" );
		var ptpSTR = _docObj.createTextNode( pmFirst + " " + pmLast + " is the " + pmOccupation + " aboard the " + pmShip );
		pTPEL.setAttribute( "class", "text-primary lead" );
		pTPEL.appendChild( ptpSTR );
		pTPFrag.appendChild( pTPEL );	
		
		var pTSFrag = _docObj.createDocumentFragment();
		var pTSEL = _docObj.createElement( "p" );
		var ptsSTR = _docObj.createTextNode( pmLast + " debuted in episode " + pmDebut + " and carries a bounty worth " + pmBounty + " Beri" );
		pTSEL.setAttribute( "class", "text-success lead" );

		pTSEL.appendChild( ptsSTR );
		pTSFrag.appendChild( pTSEL );	
		
		_docObj.getElementById( "posterText" ).appendChild( headFrag );
		_docObj.getElementById( "posterText" ).appendChild( pBlkShpFrag );
		_docObj.getElementById( "posterText" ).appendChild( pTIFrag );
		_docObj.getElementById( "posterText" ).appendChild( pTPFrag );
		_docObj.getElementById( "posterText" ).appendChild( pTSFrag ); 
		
	}

	// END of _private properties
	return {
		InitDCL: function() {
			return _DOMCONLO(); 
		} , // window.Gh_pages_ex1.InitDCL()
		InitLoad: function() {
			return _LOAD(); 
		} // window.Gh_pages_ex1.InitLoad()
	};
} )(); // window.Gh_pages_ex1

DRYOBJ.Utils.evt_u.AddEventoHandler( window , "DOMContentLoaded" , Gh_pages_ex1.InitDCL() ); 
DRYOBJ.Utils.evt_u.AddEventoHandler( window, "load" , Gh_pages_ex1.InitLoad() ); 