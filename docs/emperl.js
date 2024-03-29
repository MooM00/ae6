var Module=typeof Module!=="undefined"?Module: {

}
;
if(!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads=0;
    Module.finishedDataFileDownloads=0
}
Module.expectedDataFileDownloads++;
(function() {
    var loadPackage=function(metadata) {
	var PACKAGE_PATH;
	if(typeof window==="object") {
	    PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")
	}
	else if(typeof location!=="undefined") {
	    PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")
	}
	else {
	    throw"using preloaded data can only be done on a web page or in a web worker"
	}
	var PACKAGE_NAME="emperl.data";
	var REMOTE_PACKAGE_BASE="emperl.data";
	if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]) {
	    Module["locateFile"]=Module["locateFilePackage"];
	    err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")
	}
	var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;
	var REMOTE_PACKAGE_SIZE=metadata.remote_package_size;
	var PACKAGE_UUID=metadata.package_uuid;
	function fetchRemotePackage(packageName,packageSize,callback,errback) {
	    var xhr=new XMLHttpRequest;
	    xhr.open("GET",packageName,true);
	    xhr.responseType="arraybuffer";
	    xhr.onprogress=function(event) {
		var url=packageName;
		var size=packageSize;
		if(event.total)size=event.total;
		if(event.loaded) {
		    if(!xhr.addedTotal) {
			xhr.addedTotal=true;
			if(!Module.dataFileDownloads)Module.dataFileDownloads= {

			}
			;
			Module.dataFileDownloads[url]= {
			    loaded:event.loaded,total:size
			}

		    }
		    else {
			Module.dataFileDownloads[url].loaded=event.loaded
		    }
		    var total=0;
		    var loaded=0;
		    var num=0;
		    for(var download in Module.dataFileDownloads) {
			var data=Module.dataFileDownloads[download];
			total+=data.total;
			loaded+=data.loaded;
			num++
		    }
		    total=Math.ceil(total*Module.expectedDataFileDownloads/num);
		    if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")
		}
		else if(!Module.dataFileDownloads) {
		    if(Module["setStatus"])Module["setStatus"]("Downloading data...")
		}

	    }
	    ;
	    xhr.onerror=function(event) {
		throw new Error("NetworkError for: "+packageName)
	    }
	    ;
	    xhr.onload=function(event) {
		if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response) {
		    var packageData=xhr.response;
		    callback(packageData)
		}
		else {
		    throw new Error(xhr.statusText+" : "+xhr.responseURL)
		}

	    }
	    ;
	    xhr.send(null)
	}
	function handleError(error) {
	    console.error("package error:",error)
	}
	var fetchedCallback=null;
	var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;
	if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data) {
	    if(fetchedCallback) {
		fetchedCallback(data);
		fetchedCallback=null
	    }
	    else {
		fetched=data
	    }

	}
	    ,handleError);
	function runWithFS() {
	    function assert(check,msg) {
		if(!check)throw msg+(new Error).stack
	    }
	    Module["FS_createPath"]("/","opt",true,true);
	    Module["FS_createPath"]("/opt","perl",true,true);
	    Module["FS_createPath"]("/opt/perl","dev",true,true);
	    Module["FS_createPath"]("/opt/perl","lib",true,true);
	    Module["FS_createPath"]("/opt/perl/lib","5.28.1",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","autodie",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/autodie","exception",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/autodie","Scope",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Tie",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","DBM_Filter",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Archive",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Archive","Tar",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Config",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Config","Perl",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","ExtUtils",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/ExtUtils","MakeMaker",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/ExtUtils","Constant",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/ExtUtils","CBuilder",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/ExtUtils/CBuilder","Platform",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/ExtUtils/CBuilder/Platform","Windows",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/ExtUtils","Command",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/ExtUtils","ParseXS",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/ExtUtils","Typemaps",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/ExtUtils","Liblist",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Filter",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","B",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Net",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Net","FTP",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Time",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Perl",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","User",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Attribute",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Encode",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Parse",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Parse","CPAN",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Thread",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Future",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","I18N",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/I18N","LangTags",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Pod",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Pod","Text",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Pod","Simple",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Pod","Perldoc",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Class",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","HTTP",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","PerlIO",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/PerlIO","via",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Text",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","IPC",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Devel",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Devel","StackTrace",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Unicode",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","TAP",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/TAP","Formatter",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/TAP/Formatter","Console",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/TAP/Formatter","File",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/TAP","Harness",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/TAP","Parser",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/TAP/Parser","Iterator",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/TAP/Parser","YAMLish",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/TAP/Parser","Scheduler",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/TAP/Parser","Result",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/TAP/Parser","SourceHandler",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Search",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","unicore",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore","To",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore","lib",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","QMark",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","IDC",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Age",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","BidiC",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","XIDS",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","UIdeo",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","CE",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Upper",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","XIDC",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","NFKDQC",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","CWU",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Sc",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","CWCM",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","WB",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Nv",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","CWCF",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Gc",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Perl",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","CWL",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","In",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Ext",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Ea",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Bc",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","InPC",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Lb",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Hst",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Bpt",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Hyphen",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Vo",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Dash",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","BidiM",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Hex",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","GrBase",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","PatSyn",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Ideo",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Blk",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","NFDQC",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","SB",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","SD",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Nt",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Lower",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Dt",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","NFCQC",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Ccc",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","GCB",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Math",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Cased",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","DI",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","PCM",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","InSC",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Jt",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","IDS",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","CI",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","CWKCF",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","CWT",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Dia",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Term",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","STerm",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Alpha",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Jg",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Scx",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","CompEx",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","NFKCQC",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/unicore/lib","Dep",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","IO",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/IO","Compress",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/IO/Compress","Gzip",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/IO/Compress","Zip",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/IO/Compress","Zlib",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/IO/Compress","Adapter",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/IO/Compress","Base",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/IO","Uncompress",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/IO/Uncompress","Adapter",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/IO","Socket",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Locale",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Locale","Codes",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Locale","Maketext",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","version",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Math",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Math","BigFloat",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Math","BigInt",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Exporter",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","encoding",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Module",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Module","Load",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Module","CoreList",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","wasm",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","Scalar",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","Tie",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm/Tie","Hash",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","Sub",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","B",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","Time",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","Encode",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm/Encode","JP",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm/Encode","Unicode",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm/Encode","KR",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm/Encode","CN",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm/Encode","MIME",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm/Encode/MIME","Header",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","I18N",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","PerlIO",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","Devel",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","Unicode",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","IO",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm/IO","Socket",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","Hash",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","List",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm/List","Util",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","Data",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","Cpanel",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm/Cpanel","JSON",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm/Cpanel/JSON","XS",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","File",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm/File","Spec",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/wasm","Digest",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","CPAN",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/CPAN","FTP",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/CPAN","Kwalify",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/CPAN","Plugin",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/CPAN","HTTP",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/CPAN","Exception",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/CPAN","Meta",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/CPAN","LWP",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","App",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/App","Prove",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/App/Prove","State",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/App/Prove/State","Result",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","warnings",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","overload",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Memoize",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Getopt",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Params",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Term",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Carp",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Compress",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","File",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","JSON",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/JSON","PP",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Test2",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test2","Tools",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test2","IPC",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test2/IPC","Driver",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test2","Hub",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test2/Hub","Interceptor",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test2","Formatter",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test2","Util",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test2","EventFacet",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test2","Event",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test2/Event","TAP",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test2","API",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Test",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test","use",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test","Future",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test","Builder",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test/Builder","IO",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test/Builder","Tester",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1/Test","Tester",true,true);
	    Module["FS_createPath"]("/opt/perl/lib/5.28.1","Digest",true,true);
	    function DataRequest(start,end,audio) {
		this.start=start;
		this.end=end;
		this.audio=audio
	    }
	    DataRequest.prototype= {
		requests: {

		}
		,open:function(mode,name) {
		    this.name=name;
		    this.requests[name]=this;
		    Module["addRunDependency"]("fp "+this.name)
		}
		,send:function() {

		}
		,onload:function() {
		    var byteArray=this.byteArray.subarray(this.start,this.end);
		    this.finish(byteArray)
		}
		,finish:function(byteArray) {
		    var that=this;
		    Module["FS_createDataFile"](this.name,null,byteArray,true,true,true);
		    Module["removeRunDependency"]("fp "+that.name);
		    this.requests[this.name]=null
		}

	    }
	    ;
	    var files=metadata.files;
	    for(var i=0;
		i<files.length;
		++i) {
		    new DataRequest(files[i].start,files[i].end,files[i].audio).open("GET",files[i].filename)
		}
	    function processPackageData(arrayBuffer) {
		Module.finishedDataFileDownloads++;
		assert(arrayBuffer,"Loading data file failed.");
		assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");
		var byteArray=new Uint8Array(arrayBuffer);
		DataRequest.prototype.byteArray=byteArray;
		var files=metadata.files;
		for(var i=0;
		    i<files.length;
		    ++i) {
			DataRequest.prototype.requests[files[i].filename].onload()
		    }
		Module["removeRunDependency"]("datafile_emperl.data")
	    }
	    Module["addRunDependency"]("datafile_emperl.data");
	    if(!Module.preloadResults)Module.preloadResults= {

	    }
	    ;
	    Module.preloadResults[PACKAGE_NAME]= {
		fromCache:false
	    }
	    ;
	    if(fetched) {
		processPackageData(fetched);
		fetched=null
	    }
	    else {
		fetchedCallback=processPackageData
	    }

	}
	if(Module["calledRun"]) {
	    runWithFS()
	}
	else {
	    if(!Module["preRun"])Module["preRun"]=[];
	    Module["preRun"].push(runWithFS)
	}

    }
    ;
    loadPackage( {
	"files":[ {
	    "start":0,"audio":0,"end":4278,"filename":"/opt/perl/dev/WebPerl.t"
	}
	    , {
		"start":4278,"audio":0,"end":28730,"filename":"/opt/perl/lib/5.28.1/warnings.pm"
	    }
	    , {
		"start":28730,"audio":0,"end":34274,"filename":"/opt/perl/lib/5.28.1/DBM_Filter.pm"
	    }
	    , {
		"start":34274,"audio":0,"end":38517,"filename":"/opt/perl/lib/5.28.1/XSLoader.pm"
	    }
	    , {
		"start":38517,"audio":0,"end":44906,"filename":"/opt/perl/lib/5.28.1/bigrat.pm"
	    }
	    , {
		"start":44906,"audio":0,"end":99003,"filename":"/opt/perl/lib/5.28.1/Fatal.pm"
	    }
	    , {
		"start":99003,"audio":0,"end":112367,"filename":"/opt/perl/lib/5.28.1/Test.pm"
	    }
	    , {
		"start":112367,"audio":0,"end":119300,"filename":"/opt/perl/lib/5.28.1/NEXT.pm"
	    }
	    , {
		"start":119300,"audio":0,"end":170294,"filename":"/opt/perl/lib/5.28.1/CPAN.pm"
	    }
	    , {
		"start":170294,"audio":0,"end":171232,"filename":"/opt/perl/lib/5.28.1/vmsish.pm"
	    }
	    , {
		"start":171232,"audio":0,"end":180148,"filename":"/opt/perl/lib/5.28.1/base.pm"
	    }
	    , {
		"start":180148,"audio":0,"end":208157,"filename":"/opt/perl/lib/5.28.1/Future.pm"
	    }
	    , {
		"start":208157,"audio":0,"end":208915,"filename":"/opt/perl/lib/5.28.1/bytes_heavy.pl"
	    }
	    , {
		"start":208915,"audio":0,"end":214652,"filename":"/opt/perl/lib/5.28.1/constant.pm"
	    }
	    , {
		"start":214652,"audio":0,"end":220139,"filename":"/opt/perl/lib/5.28.1/AutoLoader.pm"
	    }
	    , {
		"start":220139,"audio":0,"end":235694,"filename":"/opt/perl/lib/5.28.1/dumpvar.pl"
	    }
	    , {
		"start":235694,"audio":0,"end":237617,"filename":"/opt/perl/lib/5.28.1/deprecate.pm"
	    }
	    , {
		"start":237617,"audio":0,"end":249940,"filename":"/opt/perl/lib/5.28.1/AutoSplit.pm"
	    }
	    , {
		"start":249940,"audio":0,"end":263065,"filename":"/opt/perl/lib/5.28.1/diagnostics.pm"
	    }
	    , {
		"start":263065,"audio":0,"end":263480,"filename":"/opt/perl/lib/5.28.1/ok.pm"
	    }
	    , {
		"start":263480,"audio":0,"end":276462,"filename":"/opt/perl/lib/5.28.1/Safe.pm"
	    }
	    , {
		"start":276462,"audio":0,"end":279953,"filename":"/opt/perl/lib/5.28.1/Env.pm"
	    }
	    , {
		"start":279953,"audio":0,"end":282297,"filename":"/opt/perl/lib/5.28.1/FindBin.pm"
	    }
	    , {
		"start":282297,"audio":0,"end":284398,"filename":"/opt/perl/lib/5.28.1/Symbol.pm"
	    }
	    , {
		"start":284398,"audio":0,"end":285801,"filename":"/opt/perl/lib/5.28.1/blib.pm"
	    }
	    , {
		"start":285801,"audio":0,"end":287828,"filename":"/opt/perl/lib/5.28.1/autouse.pm"
	    }
	    , {
		"start":287828,"audio":0,"end":298018,"filename":"/opt/perl/lib/5.28.1/Memoize.pm"
	    }
	    , {
		"start":298018,"audio":0,"end":300644,"filename":"/opt/perl/lib/5.28.1/charnames.pm"
	    }
	    , {
		"start":300644,"audio":0,"end":305653,"filename":"/opt/perl/lib/5.28.1/fields.pm"
	    }
	    , {
		"start":305653,"audio":0,"end":306315,"filename":"/opt/perl/lib/5.28.1/Thread.pm"
	    }
	    , {
		"start":306315,"audio":0,"end":306793,"filename":"/opt/perl/lib/5.28.1/parent.pm"
	    }
	    , {
		"start":306793,"audio":0,"end":308129,"filename":"/opt/perl/lib/5.28.1/less.pm"
	    }
	    , {
		"start":308129,"audio":0,"end":326103,"filename":"/opt/perl/lib/5.28.1/Benchmark.pm"
	    }
	    , {
		"start":326103,"audio":0,"end":351493,"filename":"/opt/perl/lib/5.28.1/Carp.pm"
	    }
	    , {
		"start":351493,"audio":0,"end":363730,"filename":"/opt/perl/lib/5.28.1/DB.pm"
	    }
	    , {
		"start":363730,"audio":0,"end":365841,"filename":"/opt/perl/lib/5.28.1/FileHandle.pm"
	    }
	    , {
		"start":365841,"audio":0,"end":366270,"filename":"/opt/perl/lib/5.28.1/filetest.pm"
	    }
	    , {
		"start":366270,"audio":0,"end":372997,"filename":"/opt/perl/lib/5.28.1/bignum.pm"
	    }
	    , {
		"start":372997,"audio":0,"end":406163,"filename":"/opt/perl/lib/5.28.1/_charnames.pm"
	    }
	    , {
		"start":406163,"audio":0,"end":409911,"filename":"/opt/perl/lib/5.28.1/open.pm"
	    }
	    , {
		"start":409911,"audio":0,"end":410431,"filename":"/opt/perl/lib/5.28.1/UNIVERSAL.pm"
	    }
	    , {
		"start":410431,"audio":0,"end":639159,"filename":"/opt/perl/lib/5.28.1/perl5db.pl"
	    }
	    , {
		"start":639159,"audio":0,"end":639754,"filename":"/opt/perl/lib/5.28.1/if.pm"
	    }
	    , {
		"start":639754,"audio":0,"end":642642,"filename":"/opt/perl/lib/5.28.1/FileCache.pm"
	    }
	    , {
		"start":642642,"audio":0,"end":644337,"filename":"/opt/perl/lib/5.28.1/Digest.pm"
	    }
	    , {
		"start":644337,"audio":0,"end":644679,"filename":"/opt/perl/lib/5.28.1/utf8.pm"
	    }
	    , {
		"start":644679,"audio":0,"end":645643,"filename":"/opt/perl/lib/5.28.1/overloading.pm"
	    }
	    , {
		"start":645643,"audio":0,"end":645988,"filename":"/opt/perl/lib/5.28.1/SelectSaver.pm"
	    }
	    , {
		"start":645988,"audio":0,"end":646435,"filename":"/opt/perl/lib/5.28.1/bytes.pm"
	    }
	    , {
		"start":646435,"audio":0,"end":649409,"filename":"/opt/perl/lib/5.28.1/experimental.pm"
	    }
	    , {
		"start":649409,"audio":0,"end":649493,"filename":"/opt/perl/lib/5.28.1/Test2.pm"
	    }
	    , {
		"start":649493,"audio":0,"end":681108,"filename":"/opt/perl/lib/5.28.1/utf8_heavy.pl"
	    }
	    , {
		"start":681108,"audio":0,"end":695057,"filename":"/opt/perl/lib/5.28.1/Dumpvalue.pm"
	    }
	    , {
		"start":695057,"audio":0,"end":696294,"filename":"/opt/perl/lib/5.28.1/sort.pm"
	    }
	    , {
		"start":696294,"audio":0,"end":696661,"filename":"/opt/perl/lib/5.28.1/AnyDBM_File.pm"
	    }
	    , {
		"start":696661,"audio":0,"end":701331,"filename":"/opt/perl/lib/5.28.1/feature.pm"
	    }
	    , {
		"start":701331,"audio":0,"end":701568,"filename":"/opt/perl/lib/5.28.1/subs.pm"
	    }
	    , {
		"start":701568,"audio":0,"end":708187,"filename":"/opt/perl/lib/5.28.1/SelfLoader.pm"
	    }
	    , {
		"start":708187,"audio":0,"end":712629,"filename":"/opt/perl/lib/5.28.1/overload.pm"
	    }
	    , {
		"start":712629,"audio":0,"end":714235,"filename":"/opt/perl/lib/5.28.1/strict.pm"
	    }
	    , {
		"start":714235,"audio":0,"end":717561,"filename":"/opt/perl/lib/5.28.1/English.pm"
	    }
	    , {
		"start":717561,"audio":0,"end":717734,"filename":"/opt/perl/lib/5.28.1/integer.pm"
	    }
	    , {
		"start":717734,"audio":0,"end":719710,"filename":"/opt/perl/lib/5.28.1/version.pm"
	    }
	    , {
		"start":719710,"audio":0,"end":730588,"filename":"/opt/perl/lib/5.28.1/bigint.pm"
	    }
	    , {
		"start":730588,"audio":0,"end":732271,"filename":"/opt/perl/lib/5.28.1/autodie.pm"
	    }
	    , {
		"start":732271,"audio":0,"end":732678,"filename":"/opt/perl/lib/5.28.1/PerlIO.pm"
	    }
	    , {
		"start":732678,"audio":0,"end":732756,"filename":"/opt/perl/lib/5.28.1/perlfaq.pm"
	    }
	    , {
		"start":732756,"audio":0,"end":733905,"filename":"/opt/perl/lib/5.28.1/vars.pm"
	    }
	    , {
		"start":733905,"audio":0,"end":736275,"filename":"/opt/perl/lib/5.28.1/Exporter.pm"
	    }
	    , {
		"start":736275,"audio":0,"end":739697,"filename":"/opt/perl/lib/5.28.1/locale.pm"
	    }
	    , {
		"start":739697,"audio":0,"end":742569,"filename":"/opt/perl/lib/5.28.1/sigtrap.pm"
	    }
	    , {
		"start":742569,"audio":0,"end":743516,"filename":"/opt/perl/lib/5.28.1/DirHandle.pm"
	    }
	    , {
		"start":743516,"audio":0,"end":745633,"filename":"/opt/perl/lib/5.28.1/meta_notation.pm"
	    }
	    , {
		"start":745633,"audio":0,"end":750484,"filename":"/opt/perl/lib/5.28.1/autodie/Util.pm"
	    }
	    , {
		"start":750484,"audio":0,"end":750896,"filename":"/opt/perl/lib/5.28.1/autodie/skip.pm"
	    }
	    , {
		"start":750896,"audio":0,"end":755983,"filename":"/opt/perl/lib/5.28.1/autodie/hints.pm"
	    }
	    , {
		"start":755983,"audio":0,"end":771068,"filename":"/opt/perl/lib/5.28.1/autodie/exception.pm"
	    }
	    , {
		"start":771068,"audio":0,"end":771679,"filename":"/opt/perl/lib/5.28.1/autodie/exception/system.pm"
	    }
	    , {
		"start":771679,"audio":0,"end":772127,"filename":"/opt/perl/lib/5.28.1/autodie/Scope/Guard.pm"
	    }
	    , {
		"start":772127,"audio":0,"end":774220,"filename":"/opt/perl/lib/5.28.1/autodie/Scope/GuardStack.pm"
	    }
	    , {
		"start":774220,"audio":0,"end":776737,"filename":"/opt/perl/lib/5.28.1/Tie/Array.pm"
	    }
	    , {
		"start":776737,"audio":0,"end":780759,"filename":"/opt/perl/lib/5.28.1/Tie/SubstrHash.pm"
	    }
	    , {
		"start":780759,"audio":0,"end":781534,"filename":"/opt/perl/lib/5.28.1/Tie/StdHandle.pm"
	    }
	    , {
		"start":781534,"audio":0,"end":783193,"filename":"/opt/perl/lib/5.28.1/Tie/Memoize.pm"
	    }
	    , {
		"start":783193,"audio":0,"end":838533,"filename":"/opt/perl/lib/5.28.1/Tie/File.pm"
	    }
	    , {
		"start":838533,"audio":0,"end":840571,"filename":"/opt/perl/lib/5.28.1/Tie/Hash.pm"
	    }
	    , {
		"start":840571,"audio":0,"end":842218,"filename":"/opt/perl/lib/5.28.1/Tie/Handle.pm"
	    }
	    , {
		"start":842218,"audio":0,"end":846329,"filename":"/opt/perl/lib/5.28.1/Tie/RefHash.pm"
	    }
	    , {
		"start":846329,"audio":0,"end":847710,"filename":"/opt/perl/lib/5.28.1/Tie/Scalar.pm"
	    }
	    , {
		"start":847710,"audio":0,"end":847933,"filename":"/opt/perl/lib/5.28.1/DBM_Filter/null.pm"
	    }
	    , {
		"start":847933,"audio":0,"end":848245,"filename":"/opt/perl/lib/5.28.1/DBM_Filter/compress.pm"
	    }
	    , {
		"start":848245,"audio":0,"end":848529,"filename":"/opt/perl/lib/5.28.1/DBM_Filter/int32.pm"
	    }
	    , {
		"start":848529,"audio":0,"end":848843,"filename":"/opt/perl/lib/5.28.1/DBM_Filter/utf8.pm"
	    }
	    , {
		"start":848843,"audio":0,"end":849442,"filename":"/opt/perl/lib/5.28.1/DBM_Filter/encode.pm"
	    }
	    , {
		"start":849442,"audio":0,"end":893647,"filename":"/opt/perl/lib/5.28.1/Archive/Tar.pm"
	    }
	    , {
		"start":893647,"audio":0,"end":897850,"filename":"/opt/perl/lib/5.28.1/Archive/Tar/Constant.pm"
	    }
	    , {
		"start":897850,"audio":0,"end":910618,"filename":"/opt/perl/lib/5.28.1/Archive/Tar/File.pm"
	    }
	    , {
		"start":910618,"audio":0,"end":910959,"filename":"/opt/perl/lib/5.28.1/Config/Extensions.pm"
	    }
	    , {
		"start":910959,"audio":0,"end":921233,"filename":"/opt/perl/lib/5.28.1/Config/Perl/V.pm"
	    }
	    , {
		"start":921233,"audio":0,"end":921542,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_UWIN.pm"
	    }
	    , {
		"start":921542,"audio":0,"end":937386,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Manifest.pm"
	    }
	    , {
		"start":937386,"audio":0,"end":939655,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Mkbootstrap.pm"
	    }
	    , {
		"start":939655,"audio":0,"end":951125,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_Win32.pm"
	    }
	    , {
		"start":951125,"audio":0,"end":958197,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Mksymlists.pm"
	    }
	    , {
		"start":958197,"audio":0,"end":963268,"filename":"/opt/perl/lib/5.28.1/ExtUtils/xsubpp"
	    }
	    , {
		"start":963268,"audio":0,"end":963645,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_Win95.pm"
	    }
	    , {
		"start":963645,"audio":0,"end":970332,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Embed.pm"
	    }
	    , {
		"start":970332,"audio":0,"end":981647,"filename":"/opt/perl/lib/5.28.1/ExtUtils/typemap"
	    }
	    , {
		"start":981647,"audio":0,"end":982439,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_AIX.pm"
	    }
	    , {
		"start":982439,"audio":0,"end":991673,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Constant.pm"
	    }
	    , {
		"start":991673,"audio":0,"end":994321,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_OS2.pm"
	    }
	    , {
		"start":994321,"audio":0,"end":995172,"filename":"/opt/perl/lib/5.28.1/ExtUtils/CBuilder.pm"
	    }
	    , {
		"start":995172,"audio":0,"end":1020703,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Install.pm"
	    }
	    , {
		"start":1020703,"audio":0,"end":1023662,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_Cygwin.pm"
	    }
	    , {
		"start":1023662,"audio":0,"end":1024196,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_BeOS.pm"
	    }
	    , {
		"start":1024196,"audio":0,"end":1028444,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Packlist.pm"
	    }
	    , {
		"start":1028444,"audio":0,"end":1028652,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MY.pm"
	    }
	    , {
		"start":1028652,"audio":0,"end":1045556,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Typemaps.pm"
	    }
	    , {
		"start":1045556,"audio":0,"end":1050265,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Command.pm"
	    }
	    , {
		"start":1050265,"audio":0,"end":1054862,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_NW5.pm"
	    }
	    , {
		"start":1054862,"audio":0,"end":1111435,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_Any.pm"
	    }
	    , {
		"start":1111435,"audio":0,"end":1111764,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_QNX.pm"
	    }
	    , {
		"start":1111764,"audio":0,"end":1111971,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_VOS.pm"
	    }
	    , {
		"start":1111971,"audio":0,"end":1112548,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_Darwin.pm"
	    }
	    , {
		"start":1112548,"audio":0,"end":1155367,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MakeMaker.pm"
	    }
	    , {
		"start":1155367,"audio":0,"end":1155818,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Liblist.pm"
	    }
	    , {
		"start":1155818,"audio":0,"end":1164519,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Installed.pm"
	    }
	    , {
		"start":1164519,"audio":0,"end":1164699,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_MacOS.pm"
	    }
	    , {
		"start":1164699,"audio":0,"end":1171111,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Miniperl.pm"
	    }
	    , {
		"start":1171111,"audio":0,"end":1171499,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_DOS.pm"
	    }
	    , {
		"start":1171499,"audio":0,"end":1172049,"filename":"/opt/perl/lib/5.28.1/ExtUtils/testlib.pm"
	    }
	    , {
		"start":1172049,"audio":0,"end":1238877,"filename":"/opt/perl/lib/5.28.1/ExtUtils/ParseXS.pm"
	    }
	    , {
		"start":1238877,"audio":0,"end":1296489,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_VMS.pm"
	    }
	    , {
		"start":1296489,"audio":0,"end":1297460,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MANIFEST.SKIP"
	    }
	    , {
		"start":1297460,"audio":0,"end":1392247,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM_Unix.pm"
	    }
	    , {
		"start":1392247,"audio":0,"end":1393854,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MM.pm"
	    }
	    , {
		"start":1393854,"audio":0,"end":1396230,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MakeMaker/version.pm"
	    }
	    , {
		"start":1396230,"audio":0,"end":1396534,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MakeMaker/Config.pm"
	    }
	    , {
		"start":1396534,"audio":0,"end":1401742,"filename":"/opt/perl/lib/5.28.1/ExtUtils/MakeMaker/Locale.pm"
	    }
	    , {
		"start":1401742,"audio":0,"end":1404411,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Constant/Utils.pm"
	    }
	    , {
		"start":1404411,"audio":0,"end":1424153,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Constant/ProxySubs.pm"
	    }
	    , {
		"start":1424153,"audio":0,"end":1449369,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Constant/Base.pm"
	    }
	    , {
		"start":1449369,"audio":0,"end":1455300,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Constant/XS.pm"
	    }
	    , {
		"start":1455300,"audio":0,"end":1466083,"filename":"/opt/perl/lib/5.28.1/ExtUtils/CBuilder/Base.pm"
	    }
	    , {
		"start":1466083,"audio":0,"end":1473553,"filename":"/opt/perl/lib/5.28.1/ExtUtils/CBuilder/Platform/Windows.pm"
	    }
	    , {
		"start":1473553,"audio":0,"end":1483841,"filename":"/opt/perl/lib/5.28.1/ExtUtils/CBuilder/Platform/VMS.pm"
	    }
	    , {
		"start":1483841,"audio":0,"end":1486252,"filename":"/opt/perl/lib/5.28.1/ExtUtils/CBuilder/Platform/os2.pm"
	    }
	    , {
		"start":1486252,"audio":0,"end":1486680,"filename":"/opt/perl/lib/5.28.1/ExtUtils/CBuilder/Platform/dec_osf.pm"
	    }
	    , {
		"start":1486680,"audio":0,"end":1487200,"filename":"/opt/perl/lib/5.28.1/ExtUtils/CBuilder/Platform/darwin.pm"
	    }
	    , {
		"start":1487200,"audio":0,"end":1488132,"filename":"/opt/perl/lib/5.28.1/ExtUtils/CBuilder/Platform/cygwin.pm"
	    }
	    , {
		"start":1488132,"audio":0,"end":1489348,"filename":"/opt/perl/lib/5.28.1/ExtUtils/CBuilder/Platform/android.pm"
	    }
	    , {
		"start":1489348,"audio":0,"end":1489973,"filename":"/opt/perl/lib/5.28.1/ExtUtils/CBuilder/Platform/aix.pm"
	    }
	    , {
		"start":1489973,"audio":0,"end":1491019,"filename":"/opt/perl/lib/5.28.1/ExtUtils/CBuilder/Platform/Unix.pm"
	    }
	    , {
		"start":1491019,"audio":0,"end":1494267,"filename":"/opt/perl/lib/5.28.1/ExtUtils/CBuilder/Platform/Windows/MSVC.pm"
	    }
	    , {
		"start":1494267,"audio":0,"end":1497770,"filename":"/opt/perl/lib/5.28.1/ExtUtils/CBuilder/Platform/Windows/BCC.pm"
	    }
	    , {
		"start":1497770,"audio":0,"end":1502030,"filename":"/opt/perl/lib/5.28.1/ExtUtils/CBuilder/Platform/Windows/GCC.pm"
	    }
	    , {
		"start":1502030,"audio":0,"end":1506793,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Command/MM.pm"
	    }
	    , {
		"start":1506793,"audio":0,"end":1507418,"filename":"/opt/perl/lib/5.28.1/ExtUtils/ParseXS/Constants.pm"
	    }
	    , {
		"start":1507418,"audio":0,"end":1508291,"filename":"/opt/perl/lib/5.28.1/ExtUtils/ParseXS/Eval.pm"
	    }
	    , {
		"start":1508291,"audio":0,"end":1509262,"filename":"/opt/perl/lib/5.28.1/ExtUtils/ParseXS/CountLines.pm"
	    }
	    , {
		"start":1509262,"audio":0,"end":1519862,"filename":"/opt/perl/lib/5.28.1/ExtUtils/ParseXS/Utilities.pm"
	    }
	    , {
		"start":1519862,"audio":0,"end":1520842,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Typemaps/Type.pm"
	    }
	    , {
		"start":1520842,"audio":0,"end":1523006,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Typemaps/OutputMap.pm"
	    }
	    , {
		"start":1523006,"audio":0,"end":1523998,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Typemaps/InputMap.pm"
	    }
	    , {
		"start":1523998,"audio":0,"end":1526330,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Typemaps/Cmd.pm"
	    }
	    , {
		"start":1526330,"audio":0,"end":1551183,"filename":"/opt/perl/lib/5.28.1/ExtUtils/Liblist/Kid.pm"
	    }
	    , {
		"start":1551183,"audio":0,"end":1558971,"filename":"/opt/perl/lib/5.28.1/Filter/Simple.pm"
	    }
	    , {
		"start":1558971,"audio":0,"end":1753592,"filename":"/opt/perl/lib/5.28.1/B/Deparse.pm"
	    }
	    , {
		"start":1753592,"audio":0,"end":1789216,"filename":"/opt/perl/lib/5.28.1/B/Op_private.pm"
	    }
	    , {
		"start":1789216,"audio":0,"end":1799394,"filename":"/opt/perl/lib/5.28.1/B/Debug.pm"
	    }
	    , {
		"start":1799394,"audio":0,"end":1814629,"filename":"/opt/perl/lib/5.28.1/Net/SMTP.pm"
	    }
	    , {
		"start":1814629,"audio":0,"end":1816222,"filename":"/opt/perl/lib/5.28.1/Net/hostent.pm"
	    }
	    , {
		"start":1816222,"audio":0,"end":1823078,"filename":"/opt/perl/lib/5.28.1/Net/Domain.pm"
	    }
	    , {
		"start":1823078,"audio":0,"end":1824205,"filename":"/opt/perl/lib/5.28.1/Net/protoent.pm"
	    }
	    , {
		"start":1824205,"audio":0,"end":1826251,"filename":"/opt/perl/lib/5.28.1/Net/Time.pm"
	    }
	    , {
		"start":1826251,"audio":0,"end":1827453,"filename":"/opt/perl/lib/5.28.1/Net/servent.pm"
	    }
	    , {
		"start":1827453,"audio":0,"end":1888058,"filename":"/opt/perl/lib/5.28.1/Net/Ping.pm"
	    }
	    , {
		"start":1888058,"audio":0,"end":1903830,"filename":"/opt/perl/lib/5.28.1/Net/NNTP.pm"
	    }
	    , {
		"start":1903830,"audio":0,"end":1936553,"filename":"/opt/perl/lib/5.28.1/Net/FTP.pm"
	    }
	    , {
		"start":1936553,"audio":0,"end":1940594,"filename":"/opt/perl/lib/5.28.1/Net/Netrc.pm"
	    }
	    , {
		"start":1940594,"audio":0,"end":1944275,"filename":"/opt/perl/lib/5.28.1/Net/Config.pm"
	    }
	    , {
		"start":1944275,"audio":0,"end":1957388,"filename":"/opt/perl/lib/5.28.1/Net/Cmd.pm"
	    }
	    , {
		"start":1957388,"audio":0,"end":1970503,"filename":"/opt/perl/lib/5.28.1/Net/POP3.pm"
	    }
	    , {
		"start":1970503,"audio":0,"end":1971834,"filename":"/opt/perl/lib/5.28.1/Net/netent.pm"
	    }
	    , {
		"start":1971834,"audio":0,"end":1974275,"filename":"/opt/perl/lib/5.28.1/Net/FTP/dataconn.pm"
	    }
	    , {
		"start":1974275,"audio":0,"end":1975934,"filename":"/opt/perl/lib/5.28.1/Net/FTP/I.pm"
	    }
	    , {
		"start":1975934,"audio":0,"end":1978334,"filename":"/opt/perl/lib/5.28.1/Net/FTP/A.pm"
	    }
	    , {
		"start":1978334,"audio":0,"end":1978471,"filename":"/opt/perl/lib/5.28.1/Net/FTP/L.pm"
	    }
	    , {
		"start":1978471,"audio":0,"end":1978608,"filename":"/opt/perl/lib/5.28.1/Net/FTP/E.pm"
	    }
	    , {
		"start":1978608,"audio":0,"end":1979523,"filename":"/opt/perl/lib/5.28.1/Time/gmtime.pm"
	    }
	    , {
		"start":1979523,"audio":0,"end":1980455,"filename":"/opt/perl/lib/5.28.1/Time/localtime.pm"
	    }
	    , {
		"start":1980455,"audio":0,"end":1986022,"filename":"/opt/perl/lib/5.28.1/Time/Local.pm"
	    }
	    , {
		"start":1986022,"audio":0,"end":1986219,"filename":"/opt/perl/lib/5.28.1/Time/tm.pm"
	    }
	    , {
		"start":1986219,"audio":0,"end":1987877,"filename":"/opt/perl/lib/5.28.1/Perl/OSType.pm"
	    }
	    , {
		"start":1987877,"audio":0,"end":1988917,"filename":"/opt/perl/lib/5.28.1/User/grent.pm"
	    }
	    , {
		"start":1988917,"audio":0,"end":1994441,"filename":"/opt/perl/lib/5.28.1/User/pwent.pm"
	    }
	    , {
		"start":1994441,"audio":0,"end":2002594,"filename":"/opt/perl/lib/5.28.1/Attribute/Handlers.pm"
	    }
	    , {
		"start":2002594,"audio":0,"end":2003147,"filename":"/opt/perl/lib/5.28.1/Encode/README.e2x"
	    }
	    , {
		"start":2003147,"audio":0,"end":2008315,"filename":"/opt/perl/lib/5.28.1/Encode/Makefile_PL.e2x"
	    }
	    , {
		"start":2008315,"audio":0,"end":2008494,"filename":"/opt/perl/lib/5.28.1/Encode/Changes.e2x"
	    }
	    , {
		"start":2008494,"audio":0,"end":2008678,"filename":"/opt/perl/lib/5.28.1/Encode/ConfigLocal_PM.e2x"
	    }
	    , {
		"start":2008678,"audio":0,"end":2008928,"filename":"/opt/perl/lib/5.28.1/Encode/_PM.e2x"
	    }
	    , {
		"start":2008928,"audio":0,"end":2009079,"filename":"/opt/perl/lib/5.28.1/Encode/_T.e2x"
	    }
	    , {
		"start":2009079,"audio":0,"end":2013281,"filename":"/opt/perl/lib/5.28.1/Parse/CPAN/Meta.pm"
	    }
	    , {
		"start":2013281,"audio":0,"end":2020943,"filename":"/opt/perl/lib/5.28.1/Thread/Queue.pm"
	    }
	    , {
		"start":2020943,"audio":0,"end":2023525,"filename":"/opt/perl/lib/5.28.1/Thread/Semaphore.pm"
	    }
	    , {
		"start":2023525,"audio":0,"end":2031446,"filename":"/opt/perl/lib/5.28.1/Future/Utils.pm"
	    }
	    , {
		"start":2031446,"audio":0,"end":2032386,"filename":"/opt/perl/lib/5.28.1/Future/Mutex.pm"
	    }
	    , {
		"start":2032386,"audio":0,"end":2043504,"filename":"/opt/perl/lib/5.28.1/I18N/LangTags.pm"
	    }
	    , {
		"start":2043504,"audio":0,"end":2046997,"filename":"/opt/perl/lib/5.28.1/I18N/Collate.pm"
	    }
	    , {
		"start":2046997,"audio":0,"end":2051315,"filename":"/opt/perl/lib/5.28.1/I18N/LangTags/List.pm"
	    }
	    , {
		"start":2051315,"audio":0,"end":2055944,"filename":"/opt/perl/lib/5.28.1/I18N/LangTags/Detect.pm"
	    }
	    , {
		"start":2055944,"audio":0,"end":2076806,"filename":"/opt/perl/lib/5.28.1/Pod/PlainText.pm"
	    }
	    , {
		"start":2076806,"audio":0,"end":2080561,"filename":"/opt/perl/lib/5.28.1/Pod/ParseLink.pm"
	    }
	    , {
		"start":2080561,"audio":0,"end":2108382,"filename":"/opt/perl/lib/5.28.1/Pod/Text.pm"
	    }
	    , {
		"start":2108382,"audio":0,"end":2120623,"filename":"/opt/perl/lib/5.28.1/Pod/Escapes.pm"
	    }
	    , {
		"start":2120623,"audio":0,"end":2133749,"filename":"/opt/perl/lib/5.28.1/Pod/Usage.pm"
	    }
	    , {
		"start":2133749,"audio":0,"end":2144718,"filename":"/opt/perl/lib/5.28.1/Pod/Find.pm"
	    }
	    , {
		"start":2144718,"audio":0,"end":2158012,"filename":"/opt/perl/lib/5.28.1/Pod/Functions.pm"
	    }
	    , {
		"start":2158012,"audio":0,"end":2211939,"filename":"/opt/perl/lib/5.28.1/Pod/Simple.pm"
	    }
	    , {
		"start":2211939,"audio":0,"end":2224298,"filename":"/opt/perl/lib/5.28.1/Pod/ParseUtils.pm"
	    }
	    , {
		"start":2224298,"audio":0,"end":2249677,"filename":"/opt/perl/lib/5.28.1/Pod/Parser.pm"
	    }
	    , {
		"start":2249677,"audio":0,"end":2271010,"filename":"/opt/perl/lib/5.28.1/Pod/Html.pm"
	    }
	    , {
		"start":2271010,"audio":0,"end":2281315,"filename":"/opt/perl/lib/5.28.1/Pod/Select.pm"
	    }
	    , {
		"start":2281315,"audio":0,"end":2294343,"filename":"/opt/perl/lib/5.28.1/Pod/InputObjects.pm"
	    }
	    , {
		"start":2294343,"audio":0,"end":2313585,"filename":"/opt/perl/lib/5.28.1/Pod/Checker.pm"
	    }
	    , {
		"start":2313585,"audio":0,"end":2377593,"filename":"/opt/perl/lib/5.28.1/Pod/Man.pm"
	    }
	    , {
		"start":2377593,"audio":0,"end":2441374,"filename":"/opt/perl/lib/5.28.1/Pod/Perldoc.pm"
	    }
	    , {
		"start":2441374,"audio":0,"end":2444403,"filename":"/opt/perl/lib/5.28.1/Pod/Text/Color.pm"
	    }
	    , {
		"start":2444403,"audio":0,"end":2448798,"filename":"/opt/perl/lib/5.28.1/Pod/Text/Overstrike.pm"
	    }
	    , {
		"start":2448798,"audio":0,"end":2453242,"filename":"/opt/perl/lib/5.28.1/Pod/Text/Termcap.pm"
	    }
	    , {
		"start":2453242,"audio":0,"end":2474884,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/Search.pm"
	    }
	    , {
		"start":2474884,"audio":0,"end":2477224,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/DumpAsXML.pm"
	    }
	    , {
		"start":2477224,"audio":0,"end":2480654,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/Text.pm"
	    }
	    , {
		"start":2480654,"audio":0,"end":2483405,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/TiedOutFH.pm"
	    }
	    , {
		"start":2483405,"audio":0,"end":2502028,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/RTF.pm"
	    }
	    , {
		"start":2502028,"audio":0,"end":2574626,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/BlackBox.pm"
	    }
	    , {
		"start":2574626,"audio":0,"end":2576900,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/DumpAsText.pm"
	    }
	    , {
		"start":2576900,"audio":0,"end":2577529,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/Methody.pm"
	    }
	    , {
		"start":2577529,"audio":0,"end":2591971,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/XHTML.pm"
	    }
	    , {
		"start":2591971,"audio":0,"end":2622775,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/HTMLBatch.pm"
	    }
	    , {
		"start":2622775,"audio":0,"end":2623605,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/TextContent.pm"
	    }
	    , {
		"start":2623605,"audio":0,"end":2625237,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/LinkSection.pm"
	    }
	    , {
		"start":2625237,"audio":0,"end":2627650,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/Progress.pm"
	    }
	    , {
		"start":2627650,"audio":0,"end":2629405,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/Debug.pm"
	    }
	    , {
		"start":2629405,"audio":0,"end":2629917,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/PullParserEndToken.pm"
	    }
	    , {
		"start":2629917,"audio":0,"end":2648579,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/PullParser.pm"
	    }
	    , {
		"start":2648579,"audio":0,"end":2649506,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/PullParserStartToken.pm"
	    }
	    , {
		"start":2649506,"audio":0,"end":2677214,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/HTML.pm"
	    }
	    , {
		"start":2677214,"audio":0,"end":2677929,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/TranscodeSmart.pm"
	    }
	    , {
		"start":2677929,"audio":0,"end":2681509,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/Checker.pm"
	    }
	    , {
		"start":2681509,"audio":0,"end":2684172,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/XMLOutStream.pm"
	    }
	    , {
		"start":2684172,"audio":0,"end":2686930,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/HTMLLegacy.pm"
	    }
	    , {
		"start":2686930,"audio":0,"end":2687346,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/PullParserTextToken.pm"
	    }
	    , {
		"start":2687346,"audio":0,"end":2688082,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/Transcode.pm"
	    }
	    , {
		"start":2688082,"audio":0,"end":2689797,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/SimpleTree.pm"
	    }
	    , {
		"start":2689797,"audio":0,"end":2690725,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/PullParserToken.pm"
	    }
	    , {
		"start":2690725,"audio":0,"end":2693418,"filename":"/opt/perl/lib/5.28.1/Pod/Simple/TranscodeDumb.pm"
	    }
	    , {
		"start":2693418,"audio":0,"end":2693919,"filename":"/opt/perl/lib/5.28.1/Pod/Perldoc/ToChecker.pm"
	    }
	    , {
		"start":2693919,"audio":0,"end":2694465,"filename":"/opt/perl/lib/5.28.1/Pod/Perldoc/ToRtf.pm"
	    }
	    , {
		"start":2694465,"audio":0,"end":2695521,"filename":"/opt/perl/lib/5.28.1/Pod/Perldoc/ToText.pm"
	    }
	    , {
		"start":2695521,"audio":0,"end":2696596,"filename":"/opt/perl/lib/5.28.1/Pod/Perldoc/ToANSI.pm"
	    }
	    , {
		"start":2696596,"audio":0,"end":2696868,"filename":"/opt/perl/lib/5.28.1/Pod/Perldoc/ToXml.pm"
	    }
	    , {
		"start":2696868,"audio":0,"end":2699103,"filename":"/opt/perl/lib/5.28.1/Pod/Perldoc/GetOptsOO.pm"
	    }
	    , {
		"start":2699103,"audio":0,"end":2700560,"filename":"/opt/perl/lib/5.28.1/Pod/Perldoc/ToNroff.pm"
	    }
	    , {
		"start":2700560,"audio":0,"end":2703070,"filename":"/opt/perl/lib/5.28.1/Pod/Perldoc/ToTerm.pm"
	    }
	    , {
		"start":2703070,"audio":0,"end":2703977,"filename":"/opt/perl/lib/5.28.1/Pod/Perldoc/ToPod.pm"
	    }
	    , {
		"start":2703977,"audio":0,"end":2707300,"filename":"/opt/perl/lib/5.28.1/Pod/Perldoc/ToTk.pm"
	    }
	    , {
		"start":2707300,"audio":0,"end":2709799,"filename":"/opt/perl/lib/5.28.1/Pod/Perldoc/BaseTo.pm"
	    }
	    , {
		"start":2709799,"audio":0,"end":2722679,"filename":"/opt/perl/lib/5.28.1/Pod/Perldoc/ToMan.pm"
	    }
	    , {
		"start":2722679,"audio":0,"end":2729446,"filename":"/opt/perl/lib/5.28.1/Class/Struct.pm"
	    }
	    , {
		"start":2729446,"audio":0,"end":2784344,"filename":"/opt/perl/lib/5.28.1/HTTP/Tiny.pm"
	    }
	    , {
		"start":2784344,"audio":0,"end":2785743,"filename":"/opt/perl/lib/5.28.1/PerlIO/via/QuotedPrint.pm"
	    }
	    , {
		"start":2785743,"audio":0,"end":2790234,"filename":"/opt/perl/lib/5.28.1/Text/ParseWords.pm"
	    }
	    , {
		"start":2790234,"audio":0,"end":2816110,"filename":"/opt/perl/lib/5.28.1/Text/Balanced.pm"
	    }
	    , {
		"start":2816110,"audio":0,"end":2817813,"filename":"/opt/perl/lib/5.28.1/Text/Tabs.pm"
	    }
	    , {
		"start":2817813,"audio":0,"end":2819291,"filename":"/opt/perl/lib/5.28.1/Text/Abbrev.pm"
	    }
	    , {
		"start":2819291,"audio":0,"end":2822213,"filename":"/opt/perl/lib/5.28.1/Text/Wrap.pm"
	    }
	    , {
		"start":2822213,"audio":0,"end":2831269,"filename":"/opt/perl/lib/5.28.1/IPC/Open3.pm"
	    }
	    , {
		"start":2831269,"audio":0,"end":2882179,"filename":"/opt/perl/lib/5.28.1/IPC/Cmd.pm"
	    }
	    , {
		"start":2882179,"audio":0,"end":2882996,"filename":"/opt/perl/lib/5.28.1/IPC/Open2.pm"
	    }
	    , {
		"start":2882996,"audio":0,"end":2885142,"filename":"/opt/perl/lib/5.28.1/Devel/SelfStubber.pm"
	    }
	    , {
		"start":2885142,"audio":0,"end":2891232,"filename":"/opt/perl/lib/5.28.1/Devel/StackTrace.pm"
	    }
	    , {
		"start":2891232,"audio":0,"end":2895823,"filename":"/opt/perl/lib/5.28.1/Devel/StackTrace/Frame.pm"
	    }
	    , {
		"start":2895823,"audio":0,"end":2983440,"filename":"/opt/perl/lib/5.28.1/Unicode/UCD.pm"
	    }
	    , {
		"start":2983440,"audio":0,"end":3003868,"filename":"/opt/perl/lib/5.28.1/TAP/Parser.pm"
	    }
	    , {
		"start":3003868,"audio":0,"end":3005300,"filename":"/opt/perl/lib/5.28.1/TAP/Base.pm"
	    }
	    , {
		"start":3005300,"audio":0,"end":3018846,"filename":"/opt/perl/lib/5.28.1/TAP/Harness.pm"
	    }
	    , {
		"start":3018846,"audio":0,"end":3019914,"filename":"/opt/perl/lib/5.28.1/TAP/Object.pm"
	    }
	    , {
		"start":3019914,"audio":0,"end":3023986,"filename":"/opt/perl/lib/5.28.1/TAP/Formatter/Session.pm"
	    }
	    , {
		"start":3023986,"audio":0,"end":3025603,"filename":"/opt/perl/lib/5.28.1/TAP/Formatter/Console.pm"
	    }
	    , {
		"start":3025603,"audio":0,"end":3026098,"filename":"/opt/perl/lib/5.28.1/TAP/Formatter/File.pm"
	    }
	    , {
		"start":3026098,"audio":0,"end":3027190,"filename":"/opt/perl/lib/5.28.1/TAP/Formatter/Color.pm"
	    }
	    , {
		"start":3027190,"audio":0,"end":3035917,"filename":"/opt/perl/lib/5.28.1/TAP/Formatter/Base.pm"
	    }
	    , {
		"start":3035917,"audio":0,"end":3041104,"filename":"/opt/perl/lib/5.28.1/TAP/Formatter/Console/Session.pm"
	    }
	    , {
		"start":3041104,"audio":0,"end":3044759,"filename":"/opt/perl/lib/5.28.1/TAP/Formatter/Console/ParallelSession.pm"
	    }
	    , {
		"start":3044759,"audio":0,"end":3046450,"filename":"/opt/perl/lib/5.28.1/TAP/Formatter/File/Session.pm"
	    }
	    , {
		"start":3046450,"audio":0,"end":3049675,"filename":"/opt/perl/lib/5.28.1/TAP/Harness/Env.pm"
	    }
	    , {
		"start":3049675,"audio":0,"end":3054198,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/IteratorFactory.pm"
	    }
	    , {
		"start":3054198,"audio":0,"end":3055081,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Iterator.pm"
	    }
	    , {
		"start":3055081,"audio":0,"end":3057409,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Multiplexer.pm"
	    }
	    , {
		"start":3057409,"audio":0,"end":3058828,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/ResultFactory.pm"
	    }
	    , {
		"start":3058828,"audio":0,"end":3065494,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Scheduler.pm"
	    }
	    , {
		"start":3065494,"audio":0,"end":3075800,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Grammar.pm"
	    }
	    , {
		"start":3075800,"audio":0,"end":3080525,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Source.pm"
	    }
	    , {
		"start":3080525,"audio":0,"end":3082611,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Result.pm"
	    }
	    , {
		"start":3082611,"audio":0,"end":3083080,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/SourceHandler.pm"
	    }
	    , {
		"start":3083080,"audio":0,"end":3087781,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Aggregator.pm"
	    }
	    , {
		"start":3087781,"audio":0,"end":3088345,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Iterator/Array.pm"
	    }
	    , {
		"start":3088345,"audio":0,"end":3095657,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Iterator/Process.pm"
	    }
	    , {
		"start":3095657,"audio":0,"end":3096489,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Iterator/Stream.pm"
	    }
	    , {
		"start":3096489,"audio":0,"end":3102745,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/YAMLish/Reader.pm"
	    }
	    , {
		"start":3102745,"audio":0,"end":3105810,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/YAMLish/Writer.pm"
	    }
	    , {
		"start":3105810,"audio":0,"end":3106565,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Scheduler/Job.pm"
	    }
	    , {
		"start":3106565,"audio":0,"end":3106724,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Scheduler/Spinner.pm"
	    }
	    , {
		"start":3106724,"audio":0,"end":3109163,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Result/Test.pm"
	    }
	    , {
		"start":3109163,"audio":0,"end":3109397,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Result/YAML.pm"
	    }
	    , {
		"start":3109397,"audio":0,"end":3109640,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Result/Version.pm"
	    }
	    , {
		"start":3109640,"audio":0,"end":3109916,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Result/Comment.pm"
	    }
	    , {
		"start":3109916,"audio":0,"end":3110200,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Result/Bailout.pm"
	    }
	    , {
		"start":3110200,"audio":0,"end":3110328,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Result/Unknown.pm"
	    }
	    , {
		"start":3110328,"audio":0,"end":3110639,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Result/Pragma.pm"
	    }
	    , {
		"start":3110639,"audio":0,"end":3111298,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/Result/Plan.pm"
	    }
	    , {
		"start":3111298,"audio":0,"end":3112887,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/SourceHandler/Executable.pm"
	    }
	    , {
		"start":3112887,"audio":0,"end":3113965,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/SourceHandler/RawTAP.pm"
	    }
	    , {
		"start":3113965,"audio":0,"end":3120092,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/SourceHandler/Perl.pm"
	    }
	    , {
		"start":3120092,"audio":0,"end":3121217,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/SourceHandler/File.pm"
	    }
	    , {
		"start":3121217,"audio":0,"end":3122076,"filename":"/opt/perl/lib/5.28.1/TAP/Parser/SourceHandler/Handle.pm"
	    }
	    , {
		"start":3122076,"audio":0,"end":3124211,"filename":"/opt/perl/lib/5.28.1/Search/Dict.pm"
	    }
	    , {
		"start":3124211,"audio":0,"end":3141041,"filename":"/opt/perl/lib/5.28.1/unicore/SpecialCasing.txt"
	    }
	    , {
		"start":3141041,"audio":0,"end":3160046,"filename":"/opt/perl/lib/5.28.1/unicore/NamedSequences.txt"
	    }
	    , {
		"start":3160046,"audio":0,"end":3280008,"filename":"/opt/perl/lib/5.28.1/unicore/UCD.pl"
	    }
	    , {
		"start":3280008,"audio":0,"end":4282714,"filename":"/opt/perl/lib/5.28.1/unicore/Name.pl"
	    }
	    , {
		"start":4282714,"audio":0,"end":4282721,"filename":"/opt/perl/lib/5.28.1/unicore/version"
	    }
	    , {
		"start":4282721,"audio":0,"end":4292312,"filename":"/opt/perl/lib/5.28.1/unicore/Name.pm"
	    }
	    , {
		"start":4292312,"audio":0,"end":4301796,"filename":"/opt/perl/lib/5.28.1/unicore/Blocks.txt"
	    }
	    , {
		"start":4301796,"audio":0,"end":4440015,"filename":"/opt/perl/lib/5.28.1/unicore/Heavy.pl"
	    }
	    , {
		"start":4440015,"audio":0,"end":4549134,"filename":"/opt/perl/lib/5.28.1/unicore/Decomposition.pl"
	    }
	    , {
		"start":4549134,"audio":0,"end":4553501,"filename":"/opt/perl/lib/5.28.1/unicore/CombiningClass.pl"
	    }
	    , {
		"start":4553501,"audio":0,"end":4569014,"filename":"/opt/perl/lib/5.28.1/unicore/To/Cf.pl"
	    }
	    , {
		"start":4569014,"audio":0,"end":4592776,"filename":"/opt/perl/lib/5.28.1/unicore/To/Fold.pl"
	    }
	    , {
		"start":4592776,"audio":0,"end":4612232,"filename":"/opt/perl/lib/5.28.1/unicore/To/_PerlSCX.pl"
	    }
	    , {
		"start":4612232,"audio":0,"end":4631717,"filename":"/opt/perl/lib/5.28.1/unicore/To/GCB.pl"
	    }
	    , {
		"start":4631717,"audio":0,"end":4662639,"filename":"/opt/perl/lib/5.28.1/unicore/To/_PerlLB.pl"
	    }
	    , {
		"start":4662639,"audio":0,"end":5061963,"filename":"/opt/perl/lib/5.28.1/unicore/To/NFKCCF.pl"
	    }
	    , {
		"start":5061963,"audio":0,"end":5075503,"filename":"/opt/perl/lib/5.28.1/unicore/To/Vo.pl"
	    }
	    , {
		"start":5075503,"audio":0,"end":5079359,"filename":"/opt/perl/lib/5.28.1/unicore/To/Ea.pl"
	    }
	    , {
		"start":5079359,"audio":0,"end":5094697,"filename":"/opt/perl/lib/5.28.1/unicore/To/Uc.pl"
	    }
	    , {
		"start":5094697,"audio":0,"end":5111859,"filename":"/opt/perl/lib/5.28.1/unicore/To/WB.pl"
	    }
	    , {
		"start":5111859,"audio":0,"end":5144975,"filename":"/opt/perl/lib/5.28.1/unicore/To/Gc.pl"
	    }
	    , {
		"start":5144975,"audio":0,"end":5148690,"filename":"/opt/perl/lib/5.28.1/unicore/To/NFKCQC.pl"
	    }
	    , {
		"start":5148690,"audio":0,"end":5162306,"filename":"/opt/perl/lib/5.28.1/unicore/To/NameAlia.pl"
	    }
	    , {
		"start":5162306,"audio":0,"end":5170857,"filename":"/opt/perl/lib/5.28.1/unicore/To/InPC.pl"
	    }
	    , {
		"start":5170857,"audio":0,"end":5179385,"filename":"/opt/perl/lib/5.28.1/unicore/To/Bc.pl"
	    }
	    , {
		"start":5179385,"audio":0,"end":5195383,"filename":"/opt/perl/lib/5.28.1/unicore/To/Sc.pl"
	    }
	    , {
		"start":5195383,"audio":0,"end":5214054,"filename":"/opt/perl/lib/5.28.1/unicore/To/Scx.pl"
	    }
	    , {
		"start":5214054,"audio":0,"end":5217458,"filename":"/opt/perl/lib/5.28.1/unicore/To/Jg.pl"
	    }
	    , {
		"start":5217458,"audio":0,"end":5232569,"filename":"/opt/perl/lib/5.28.1/unicore/To/InSC.pl"
	    }
	    , {
		"start":5232569,"audio":0,"end":5238603,"filename":"/opt/perl/lib/5.28.1/unicore/To/Digit.pl"
	    }
	    , {
		"start":5238603,"audio":0,"end":5239402,"filename":"/opt/perl/lib/5.28.1/unicore/To/Isc.pl"
	    }
	    , {
		"start":5239402,"audio":0,"end":5241080,"filename":"/opt/perl/lib/5.28.1/unicore/To/PerlDeci.pl"
	    }
	    , {
		"start":5241080,"audio":0,"end":5242773,"filename":"/opt/perl/lib/5.28.1/unicore/To/Bpt.pl"
	    }
	    , {
		"start":5242773,"audio":0,"end":5250551,"filename":"/opt/perl/lib/5.28.1/unicore/To/Nv.pl"
	    }
	    , {
		"start":5250551,"audio":0,"end":5270471,"filename":"/opt/perl/lib/5.28.1/unicore/To/Title.pl"
	    }
	    , {
		"start":5270471,"audio":0,"end":5275590,"filename":"/opt/perl/lib/5.28.1/unicore/To/Bmg.pl"
	    }
	    , {
		"start":5275590,"audio":0,"end":5307902,"filename":"/opt/perl/lib/5.28.1/unicore/To/SB.pl"
	    }
	    , {
		"start":5307902,"audio":0,"end":5331197,"filename":"/opt/perl/lib/5.28.1/unicore/To/Upper.pl"
	    }
	    , {
		"start":5331197,"audio":0,"end":5335917,"filename":"/opt/perl/lib/5.28.1/unicore/To/NFKDQC.pl"
	    }
	    , {
		"start":5335917,"audio":0,"end":5353275,"filename":"/opt/perl/lib/5.28.1/unicore/To/_PerlWB.pl"
	    }
	    , {
		"start":5353275,"audio":0,"end":5355401,"filename":"/opt/perl/lib/5.28.1/unicore/To/Bpb.pl"
	    }
	    , {
		"start":5355401,"audio":0,"end":5367067,"filename":"/opt/perl/lib/5.28.1/unicore/To/Tc.pl"
	    }
	    , {
		"start":5367067,"audio":0,"end":5377066,"filename":"/opt/perl/lib/5.28.1/unicore/To/Hst.pl"
	    }
	    , {
		"start":5377066,"audio":0,"end":5382304,"filename":"/opt/perl/lib/5.28.1/unicore/To/Jt.pl"
	    }
	    , {
		"start":5382304,"audio":0,"end":5445868,"filename":"/opt/perl/lib/5.28.1/unicore/To/Na1.pl"
	    }
	    , {
		"start":5445868,"audio":0,"end":5448789,"filename":"/opt/perl/lib/5.28.1/unicore/To/NFDQC.pl"
	    }
	    , {
		"start":5448789,"audio":0,"end":5450541,"filename":"/opt/perl/lib/5.28.1/unicore/To/NFCQC.pl"
	    }
	    , {
		"start":5450541,"audio":0,"end":5481465,"filename":"/opt/perl/lib/5.28.1/unicore/To/Lb.pl"
	    }
	    , {
		"start":5481465,"audio":0,"end":5500726,"filename":"/opt/perl/lib/5.28.1/unicore/To/Age.pl"
	    }
	    , {
		"start":5500726,"audio":0,"end":5517172,"filename":"/opt/perl/lib/5.28.1/unicore/To/Lower.pl"
	    }
	    , {
		"start":5517172,"audio":0,"end":5525406,"filename":"/opt/perl/lib/5.28.1/unicore/To/Lc.pl"
	    }
	    , {
		"start":5525406,"audio":0,"end":5529734,"filename":"/opt/perl/lib/5.28.1/unicore/To/Nt.pl"
	    }
	    , {
		"start":5529734,"audio":0,"end":5530357,"filename":"/opt/perl/lib/5.28.1/unicore/lib/QMark/Y.pl"
	    }
	    , {
		"start":5530357,"audio":0,"end":5538615,"filename":"/opt/perl/lib/5.28.1/unicore/lib/IDC/Y.pl"
	    }
	    , {
		"start":5538615,"audio":0,"end":5539941,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V40.pl"
	    }
	    , {
		"start":5539941,"audio":0,"end":5541371,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V41.pl"
	    }
	    , {
		"start":5541371,"audio":0,"end":5543081,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V30.pl"
	    }
	    , {
		"start":5543081,"audio":0,"end":5543923,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V20.pl"
	    }
	    , {
		"start":5543923,"audio":0,"end":5544794,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V50.pl"
	    }
	    , {
		"start":5544794,"audio":0,"end":5546008,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V80.pl"
	    }
	    , {
		"start":5546008,"audio":0,"end":5547149,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V90.pl"
	    }
	    , {
		"start":5547149,"audio":0,"end":5549363,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V70.pl"
	    }
	    , {
		"start":5549363,"audio":0,"end":5552811,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V11.pl"
	    }
	    , {
		"start":5552811,"audio":0,"end":5553927,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V32.pl"
	    }
	    , {
		"start":5553927,"audio":0,"end":5555387,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V51.pl"
	    }
	    , {
		"start":5555387,"audio":0,"end":5563520,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/NA.pl"
	    }
	    , {
		"start":5563520,"audio":0,"end":5565146,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V61.pl"
	    }
	    , {
		"start":5565146,"audio":0,"end":5566686,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V52.pl"
	    }
	    , {
		"start":5566686,"audio":0,"end":5567667,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V100.pl"
	    }
	    , {
		"start":5567667,"audio":0,"end":5568646,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V31.pl"
	    }
	    , {
		"start":5568646,"audio":0,"end":5570462,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Age/V60.pl"
	    }
	    , {
		"start":5570462,"audio":0,"end":5570992,"filename":"/opt/perl/lib/5.28.1/unicore/lib/BidiC/Y.pl"
	    }
	    , {
		"start":5570992,"audio":0,"end":5578164,"filename":"/opt/perl/lib/5.28.1/unicore/lib/XIDS/Y.pl"
	    }
	    , {
		"start":5578164,"audio":0,"end":5578833,"filename":"/opt/perl/lib/5.28.1/unicore/lib/UIdeo/Y.pl"
	    }
	    , {
		"start":5578833,"audio":0,"end":5579680,"filename":"/opt/perl/lib/5.28.1/unicore/lib/CE/Y.pl"
	    }
	    , {
		"start":5579680,"audio":0,"end":5586635,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Upper/Y.pl"
	    }
	    , {
		"start":5586635,"audio":0,"end":5594977,"filename":"/opt/perl/lib/5.28.1/unicore/lib/XIDC/Y.pl"
	    }
	    , {
		"start":5594977,"audio":0,"end":5599769,"filename":"/opt/perl/lib/5.28.1/unicore/lib/NFKDQC/N.pl"
	    }
	    , {
		"start":5599769,"audio":0,"end":5604563,"filename":"/opt/perl/lib/5.28.1/unicore/lib/NFKDQC/Y.pl"
	    }
	    , {
		"start":5604563,"audio":0,"end":5611116,"filename":"/opt/perl/lib/5.28.1/unicore/lib/CWU/Y.pl"
	    }
	    , {
		"start":5611116,"audio":0,"end":5611679,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Cprt.pl"
	    }
	    , {
		"start":5611679,"audio":0,"end":5612481,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Latn.pl"
	    }
	    , {
		"start":5612481,"audio":0,"end":5613322,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Grek.pl"
	    }
	    , {
		"start":5613322,"audio":0,"end":5614029,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Han.pl"
	    }
	    , {
		"start":5614029,"audio":0,"end":5614660,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Gujr.pl"
	    }
	    , {
		"start":5614660,"audio":0,"end":5615331,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Gran.pl"
	    }
	    , {
		"start":5615331,"audio":0,"end":5616545,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Arab.pl"
	    }
	    , {
		"start":5616545,"audio":0,"end":5617196,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Taml.pl"
	    }
	    , {
		"start":5617196,"audio":0,"end":5617749,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Armn.pl"
	    }
	    , {
		"start":5617749,"audio":0,"end":5618310,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Dupl.pl"
	    }
	    , {
		"start":5618310,"audio":0,"end":5618851,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Limb.pl"
	    }
	    , {
		"start":5618851,"audio":0,"end":5619440,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Kana.pl"
	    }
	    , {
		"start":5619440,"audio":0,"end":5620071,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Knda.pl"
	    }
	    , {
		"start":5620071,"audio":0,"end":5620692,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Telu.pl"
	    }
	    , {
		"start":5620692,"audio":0,"end":5623152,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Zyyy.pl"
	    }
	    , {
		"start":5623152,"audio":0,"end":5623783,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Beng.pl"
	    }
	    , {
		"start":5623783,"audio":0,"end":5624313,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Syrc.pl"
	    }
	    , {
		"start":5624313,"audio":0,"end":5624890,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Geor.pl"
	    }
	    , {
		"start":5624890,"audio":0,"end":5625453,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Mong.pl"
	    }
	    , {
		"start":5625453,"audio":0,"end":5626024,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Mlym.pl"
	    }
	    , {
		"start":5626024,"audio":0,"end":5626556,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Deva.pl"
	    }
	    , {
		"start":5626556,"audio":0,"end":5627098,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Hira.pl"
	    }
	    , {
		"start":5627098,"audio":0,"end":5627721,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Sinh.pl"
	    }
	    , {
		"start":5627721,"audio":0,"end":5628272,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Mult.pl"
	    }
	    , {
		"start":5628272,"audio":0,"end":5628847,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Linb.pl"
	    }
	    , {
		"start":5628847,"audio":0,"end":5629504,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Hang.pl"
	    }
	    , {
		"start":5629504,"audio":0,"end":5630135,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Orya.pl"
	    }
	    , {
		"start":5630135,"audio":0,"end":5630926,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Zinh.pl"
	    }
	    , {
		"start":5630926,"audio":0,"end":5631503,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Cyrl.pl"
	    }
	    , {
		"start":5631503,"audio":0,"end":5632088,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Glag.pl"
	    }
	    , {
		"start":5632088,"audio":0,"end":5632739,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Sc/Guru.pl"
	    }
	    , {
		"start":5632739,"audio":0,"end":5634373,"filename":"/opt/perl/lib/5.28.1/unicore/lib/CWCM/Y.pl"
	    }
	    , {
		"start":5634373,"audio":0,"end":5635006,"filename":"/opt/perl/lib/5.28.1/unicore/lib/WB/MN.pl"
	    }
	    , {
		"start":5635006,"audio":0,"end":5635613,"filename":"/opt/perl/lib/5.28.1/unicore/lib/WB/HL.pl"
	    }
	    , {
		"start":5635613,"audio":0,"end":5639043,"filename":"/opt/perl/lib/5.28.1/unicore/lib/WB/Extend.pl"
	    }
	    , {
		"start":5639043,"audio":0,"end":5639720,"filename":"/opt/perl/lib/5.28.1/unicore/lib/WB/FO.pl"
	    }
	    , {
		"start":5639720,"audio":0,"end":5640283,"filename":"/opt/perl/lib/5.28.1/unicore/lib/WB/EX.pl"
	    }
	    , {
		"start":5640283,"audio":0,"end":5649312,"filename":"/opt/perl/lib/5.28.1/unicore/lib/WB/XX.pl"
	    }
	    , {
		"start":5649312,"audio":0,"end":5655531,"filename":"/opt/perl/lib/5.28.1/unicore/lib/WB/LE.pl"
	    }
	    , {
		"start":5655531,"audio":0,"end":5656132,"filename":"/opt/perl/lib/5.28.1/unicore/lib/WB/KA.pl"
	    }
	    , {
		"start":5656132,"audio":0,"end":5656701,"filename":"/opt/perl/lib/5.28.1/unicore/lib/WB/ML.pl"
	    }
	    , {
		"start":5656701,"audio":0,"end":5657793,"filename":"/opt/perl/lib/5.28.1/unicore/lib/WB/NU.pl"
	    }
	    , {
		"start":5657793,"audio":0,"end":5658346,"filename":"/opt/perl/lib/5.28.1/unicore/lib/WB/MB.pl"
	    }
	    , {
		"start":5658346,"audio":0,"end":5658919,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/2_3.pl"
	    }
	    , {
		"start":5658919,"audio":0,"end":5660685,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/4.pl"
	    }
	    , {
		"start":5660685,"audio":0,"end":5662537,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/2.pl"
	    }
	    , {
		"start":5662537,"audio":0,"end":5664105,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/8.pl"
	    }
	    , {
		"start":5664105,"audio":0,"end":5664716,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/90.pl"
	    }
	    , {
		"start":5664716,"audio":0,"end":5665339,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/60.pl"
	    }
	    , {
		"start":5665339,"audio":0,"end":5666194,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/20.pl"
	    }
	    , {
		"start":5666194,"audio":0,"end":5666817,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/70.pl"
	    }
	    , {
		"start":5666817,"audio":0,"end":5667430,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/1_4.pl"
	    }
	    , {
		"start":5667430,"audio":0,"end":5668025,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/10000.pl"
	    }
	    , {
		"start":5668025,"audio":0,"end":5668566,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/19.pl"
	    }
	    , {
		"start":5668566,"audio":0,"end":5669177,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/80.pl"
	    }
	    , {
		"start":5669177,"audio":0,"end":5669728,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/11.pl"
	    }
	    , {
		"start":5669728,"audio":0,"end":5670415,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/40.pl"
	    }
	    , {
		"start":5670415,"audio":0,"end":5671040,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/1_2.pl"
	    }
	    , {
		"start":5671040,"audio":0,"end":5671578,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/700.pl"
	    }
	    , {
		"start":5671578,"audio":0,"end":5673428,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/1.pl"
	    }
	    , {
		"start":5673428,"audio":0,"end":5673966,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/200.pl"
	    }
	    , {
		"start":5673966,"audio":0,"end":5674527,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/1_3.pl"
	    }
	    , {
		"start":5674527,"audio":0,"end":5675068,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/16.pl"
	    }
	    , {
		"start":5675068,"audio":0,"end":5675598,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/14.pl"
	    }
	    , {
		"start":5675598,"audio":0,"end":5676136,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/800.pl"
	    }
	    , {
		"start":5676136,"audio":0,"end":5677742,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/7.pl"
	    }
	    , {
		"start":5677742,"audio":0,"end":5678272,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/13.pl"
	    }
	    , {
		"start":5678272,"audio":0,"end":5679912,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/6.pl"
	    }
	    , {
		"start":5679912,"audio":0,"end":5681506,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/9.pl"
	    }
	    , {
		"start":5681506,"audio":0,"end":5682279,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/50.pl"
	    }
	    , {
		"start":5682279,"audio":0,"end":5682834,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/1_8.pl"
	    }
	    , {
		"start":5682834,"audio":0,"end":5683372,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/600.pl"
	    }
	    , {
		"start":5683372,"audio":0,"end":5683923,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/900.pl"
	    }
	    , {
		"start":5683923,"audio":0,"end":5684453,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/15.pl"
	    }
	    , {
		"start":5684453,"audio":0,"end":5685018,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/3_4.pl"
	    }
	    , {
		"start":5685018,"audio":0,"end":5685559,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/17.pl"
	    }
	    , {
		"start":5685559,"audio":0,"end":5686110,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/300.pl"
	    }
	    , {
		"start":5686110,"audio":0,"end":5686795,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/30.pl"
	    }
	    , {
		"start":5686795,"audio":0,"end":5687356,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/5000.pl"
	    }
	    , {
		"start":5687356,"audio":0,"end":5689190,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/3.pl"
	    }
	    , {
		"start":5689190,"audio":0,"end":5689901,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/1000.pl"
	    }
	    , {
		"start":5689901,"audio":0,"end":5690439,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/400.pl"
	    }
	    , {
		"start":5690439,"audio":0,"end":5690980,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/18.pl"
	    }
	    , {
		"start":5690980,"audio":0,"end":5692056,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/10.pl"
	    }
	    , {
		"start":5692056,"audio":0,"end":5692663,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/500.pl"
	    }
	    , {
		"start":5692663,"audio":0,"end":5693212,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/50000.pl"
	    }
	    , {
		"start":5693212,"audio":0,"end":5694520,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/0.pl"
	    }
	    , {
		"start":5694520,"audio":0,"end":5695052,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/1_16.pl"
	    }
	    , {
		"start":5695052,"audio":0,"end":5695584,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/3_16.pl"
	    }
	    , {
		"start":5695584,"audio":0,"end":5697370,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/5.pl"
	    }
	    , {
		"start":5697370,"audio":0,"end":5698211,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/100.pl"
	    }
	    , {
		"start":5698211,"audio":0,"end":5698762,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nv/12.pl"
	    }
	    , {
		"start":5698762,"audio":0,"end":5705289,"filename":"/opt/perl/lib/5.28.1/unicore/lib/CWCF/Y.pl"
	    }
	    , {
		"start":5705289,"audio":0,"end":5705980,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Cf.pl"
	    }
	    , {
		"start":5705980,"audio":0,"end":5706753,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Sk.pl"
	    }
	    , {
		"start":5706753,"audio":0,"end":5714746,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Cn.pl"
	    }
	    , {
		"start":5714746,"audio":0,"end":5715303,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Zs.pl"
	    }
	    , {
		"start":5715303,"audio":0,"end":5715932,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Nl.pl"
	    }
	    , {
		"start":5715932,"audio":0,"end":5722825,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Lu.pl"
	    }
	    , {
		"start":5722825,"audio":0,"end":5725802,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/S.pl"
	    }
	    , {
		"start":5725802,"audio":0,"end":5727156,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Ps.pl"
	    }
	    , {
		"start":5727156,"audio":0,"end":5730550,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/M.pl"
	    }
	    , {
		"start":5730550,"audio":0,"end":5731742,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Sm.pl"
	    }
	    , {
		"start":5731742,"audio":0,"end":5734084,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Po.pl"
	    }
	    , {
		"start":5734084,"audio":0,"end":5735876,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/N.pl"
	    }
	    , {
		"start":5735876,"audio":0,"end":5736980,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Lm.pl"
	    }
	    , {
		"start":5736980,"audio":0,"end":5737647,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Sc.pl"
	    }
	    , {
		"start":5737647,"audio":0,"end":5744731,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/L.pl"
	    }
	    , {
		"start":5744731,"audio":0,"end":5745332,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Pf.pl"
	    }
	    , {
		"start":5745332,"audio":0,"end":5747230,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/LC.pl"
	    }
	    , {
		"start":5747230,"audio":0,"end":5752913,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Lo.pl"
	    }
	    , {
		"start":5752913,"audio":0,"end":5753456,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Me.pl"
	    }
	    , {
		"start":5753456,"audio":0,"end":5757272,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Mn.pl"
	    }
	    , {
		"start":5757272,"audio":0,"end":5764237,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Ll.pl"
	    }
	    , {
		"start":5764237,"audio":0,"end":5766599,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/P.pl"
	    }
	    , {
		"start":5766599,"audio":0,"end":5767771,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/No.pl"
	    }
	    , {
		"start":5767771,"audio":0,"end":5775780,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/C.pl"
	    }
	    , {
		"start":5775780,"audio":0,"end":5777102,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Pe.pl"
	    }
	    , {
		"start":5777102,"audio":0,"end":5777669,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Z.pl"
	    }
	    , {
		"start":5777669,"audio":0,"end":5778280,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Pi.pl"
	    }
	    , {
		"start":5778280,"audio":0,"end":5778959,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Pd.pl"
	    }
	    , {
		"start":5778959,"audio":0,"end":5779512,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Pc.pl"
	    }
	    , {
		"start":5779512,"audio":0,"end":5782023,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/So.pl"
	    }
	    , {
		"start":5782023,"audio":0,"end":5784263,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Mc.pl"
	    }
	    , {
		"start":5784263,"audio":0,"end":5785357,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Gc/Nd.pl"
	    }
	    , {
		"start":5785357,"audio":0,"end":5792545,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/_PerlIDS.pl"
	    }
	    , {
		"start":5792545,"audio":0,"end":5799701,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/_PerlCha.pl"
	    }
	    , {
		"start":5799701,"audio":0,"end":5801415,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/_PerlAny.pl"
	    }
	    , {
		"start":5801415,"audio":0,"end":5809459,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/Graph.pl"
	    }
	    , {
		"start":5809459,"audio":0,"end":5817773,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/Word.pl"
	    }
	    , {
		"start":5817773,"audio":0,"end":5818368,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/_PerlPro.pl"
	    }
	    , {
		"start":5818368,"audio":0,"end":5826710,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/_PerlIDC.pl"
	    }
	    , {
		"start":5826710,"audio":0,"end":5827483,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/_PerlFol.pl"
	    }
	    , {
		"start":5827483,"audio":0,"end":5828045,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/Blank.pl"
	    }
	    , {
		"start":5828045,"audio":0,"end":5828628,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/Title.pl"
	    }
	    , {
		"start":5828628,"audio":0,"end":5829158,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/_PerlPat.pl"
	    }
	    , {
		"start":5829158,"audio":0,"end":5837153,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/Assigned.pl"
	    }
	    , {
		"start":5837153,"audio":0,"end":5845445,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/Alnum.pl"
	    }
	    , {
		"start":5845445,"audio":0,"end":5853459,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/Print.pl"
	    }
	    , {
		"start":5853459,"audio":0,"end":5854039,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/SpacePer.pl"
	    }
	    , {
		"start":5854039,"audio":0,"end":5854920,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/_PerlQuo.pl"
	    }
	    , {
		"start":5854920,"audio":0,"end":5863280,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/_PerlCh2.pl"
	    }
	    , {
		"start":5863280,"audio":0,"end":5863795,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/PerlWord.pl"
	    }
	    , {
		"start":5863795,"audio":0,"end":5864398,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/_PerlPr2.pl"
	    }
	    , {
		"start":5864398,"audio":0,"end":5864914,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/PosixPun.pl"
	    }
	    , {
		"start":5864914,"audio":0,"end":5867244,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/XPosixPu.pl"
	    }
	    , {
		"start":5867244,"audio":0,"end":5867987,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Perl/_PerlNch.pl"
	    }
	    , {
		"start":5867987,"audio":0,"end":5874388,"filename":"/opt/perl/lib/5.28.1/unicore/lib/CWL/Y.pl"
	    }
	    , {
		"start":5874388,"audio":0,"end":5879129,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/3_2.pl"
	    }
	    , {
		"start":5879129,"audio":0,"end":5886795,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/8_0.pl"
	    }
	    , {
		"start":5886795,"audio":0,"end":5891146,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/3_0.pl"
	    }
	    , {
		"start":5891146,"audio":0,"end":5897408,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/6_0.pl"
	    }
	    , {
		"start":5897408,"audio":0,"end":5905403,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/9_0.pl"
	    }
	    , {
		"start":5905403,"audio":0,"end":5912163,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/6_3.pl"
	    }
	    , {
		"start":5912163,"audio":0,"end":5915910,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/2_1.pl"
	    }
	    , {
		"start":5915910,"audio":0,"end":5922670,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/6_1.pl"
	    }
	    , {
		"start":5922670,"audio":0,"end":5927473,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/3_1.pl"
	    }
	    , {
		"start":5927473,"audio":0,"end":5932644,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/4_1.pl"
	    }
	    , {
		"start":5932644,"audio":0,"end":5937943,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/5_0.pl"
	    }
	    , {
		"start":5937943,"audio":0,"end":5945459,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/7_0.pl"
	    }
	    , {
		"start":5945459,"audio":0,"end":5953594,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/10_0.pl"
	    }
	    , {
		"start":5953594,"audio":0,"end":5959597,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/5_2.pl"
	    }
	    , {
		"start":5959597,"audio":0,"end":5963344,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/2_0.pl"
	    }
	    , {
		"start":5963344,"audio":0,"end":5968269,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/4_0.pl"
	    }
	    , {
		"start":5968269,"audio":0,"end":5975029,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/6_2.pl"
	    }
	    , {
		"start":5975029,"audio":0,"end":5980520,"filename":"/opt/perl/lib/5.28.1/unicore/lib/In/5_1.pl"
	    }
	    , {
		"start":5980520,"audio":0,"end":5981335,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ext/Y.pl"
	    }
	    , {
		"start":5981335,"audio":0,"end":5983554,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ea/A.pl"
	    }
	    , {
		"start":5983554,"audio":0,"end":5985333,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ea/W.pl"
	    }
	    , {
		"start":5985333,"audio":0,"end":5988666,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ea/N.pl"
	    }
	    , {
		"start":5988666,"audio":0,"end":5989239,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ea/H.pl"
	    }
	    , {
		"start":5989239,"audio":0,"end":5989793,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ea/Na.pl"
	    }
	    , {
		"start":5989793,"audio":0,"end":5990408,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bc/EN.pl"
	    }
	    , {
		"start":5990408,"audio":0,"end":5991271,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bc/R.pl"
	    }
	    , {
		"start":5991271,"audio":0,"end":5991826,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bc/WS.pl"
	    }
	    , {
		"start":5991826,"audio":0,"end":5997172,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bc/L.pl"
	    }
	    , {
		"start":5997172,"audio":0,"end":5997791,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bc/CS.pl"
	    }
	    , {
		"start":5997791,"audio":0,"end":5998674,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bc/BN.pl"
	    }
	    , {
		"start":5998674,"audio":0,"end":6001155,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bc/ON.pl"
	    }
	    , {
		"start":6001155,"audio":0,"end":6004919,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bc/NSM.pl"
	    }
	    , {
		"start":6004919,"audio":0,"end":6005472,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bc/AN.pl"
	    }
	    , {
		"start":6005472,"audio":0,"end":6005999,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bc/B.pl"
	    }
	    , {
		"start":6005999,"audio":0,"end":6006580,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bc/ES.pl"
	    }
	    , {
		"start":6006580,"audio":0,"end":6007295,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bc/ET.pl"
	    }
	    , {
		"start":6007295,"audio":0,"end":6008014,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bc/AL.pl"
	    }
	    , {
		"start":6008014,"audio":0,"end":6008941,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InPC/Left.pl"
	    }
	    , {
		"start":6008941,"audio":0,"end":6009473,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InPC/TopAndL2.pl"
	    }
	    , {
		"start":6009473,"audio":0,"end":6010040,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InPC/VisualOr.pl"
	    }
	    , {
		"start":6010040,"audio":0,"end":6012436,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InPC/Top.pl"
	    }
	    , {
		"start":6012436,"audio":0,"end":6012970,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InPC/Overstru.pl"
	    }
	    , {
		"start":6012970,"audio":0,"end":6013599,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InPC/LeftAndR.pl"
	    }
	    , {
		"start":6013599,"audio":0,"end":6016143,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InPC/NA.pl"
	    }
	    , {
		"start":6016143,"audio":0,"end":6018267,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InPC/Right.pl"
	    }
	    , {
		"start":6018267,"audio":0,"end":6020195,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InPC/Bottom.pl"
	    }
	    , {
		"start":6020195,"audio":0,"end":6020780,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InPC/TopAndRi.pl"
	    }
	    , {
		"start":6020780,"audio":0,"end":6021333,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InPC/TopAndBo.pl"
	    }
	    , {
		"start":6021333,"audio":0,"end":6021888,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InPC/TopAndLe.pl"
	    }
	    , {
		"start":6021888,"audio":0,"end":6022509,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/QU.pl"
	    }
	    , {
		"start":6022509,"audio":0,"end":6023963,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/CL.pl"
	    }
	    , {
		"start":6023963,"audio":0,"end":6024558,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/GL.pl"
	    }
	    , {
		"start":6024558,"audio":0,"end":6025485,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/SA.pl"
	    }
	    , {
		"start":6025485,"audio":0,"end":6026188,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/PR.pl"
	    }
	    , {
		"start":6026188,"audio":0,"end":6026935,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/EX.pl"
	    }
	    , {
		"start":6026935,"audio":0,"end":6034361,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/XX.pl"
	    }
	    , {
		"start":6034361,"audio":0,"end":6035817,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/OP.pl"
	    }
	    , {
		"start":6035817,"audio":0,"end":6038308,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/ID.pl"
	    }
	    , {
		"start":6038308,"audio":0,"end":6038999,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/NS.pl"
	    }
	    , {
		"start":6038999,"audio":0,"end":6039692,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/PO.pl"
	    }
	    , {
		"start":6039692,"audio":0,"end":6040226,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/IN.pl"
	    }
	    , {
		"start":6040226,"audio":0,"end":6041017,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/CJ.pl"
	    }
	    , {
		"start":6041017,"audio":0,"end":6042599,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/AI.pl"
	    }
	    , {
		"start":6042599,"audio":0,"end":6044120,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/BA.pl"
	    }
	    , {
		"start":6044120,"audio":0,"end":6047372,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/CM.pl"
	    }
	    , {
		"start":6047372,"audio":0,"end":6048299,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/EB.pl"
	    }
	    , {
		"start":6048299,"audio":0,"end":6048880,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/IS.pl"
	    }
	    , {
		"start":6048880,"audio":0,"end":6057446,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/AL.pl"
	    }
	    , {
		"start":6057446,"audio":0,"end":6058159,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lb/BB.pl"
	    }
	    , {
		"start":6058159,"audio":0,"end":6058710,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Hst/NA.pl"
	    }
	    , {
		"start":6058710,"audio":0,"end":6059888,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bpt/O.pl"
	    }
	    , {
		"start":6059888,"audio":0,"end":6060689,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bpt/N.pl"
	    }
	    , {
		"start":6060689,"audio":0,"end":6061867,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Bpt/C.pl"
	    }
	    , {
		"start":6061867,"audio":0,"end":6062462,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Hyphen/T.pl"
	    }
	    , {
		"start":6062462,"audio":0,"end":6063913,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Vo/R.pl"
	    }
	    , {
		"start":6063913,"audio":0,"end":6064570,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Vo/Tr.pl"
	    }
	    , {
		"start":6064570,"audio":0,"end":6066487,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Vo/U.pl"
	    }
	    , {
		"start":6066487,"audio":0,"end":6067388,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Vo/Tu.pl"
	    }
	    , {
		"start":6067388,"audio":0,"end":6068107,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dash/Y.pl"
	    }
	    , {
		"start":6068107,"audio":0,"end":6069825,"filename":"/opt/perl/lib/5.28.1/unicore/lib/BidiM/Y.pl"
	    }
	    , {
		"start":6069825,"audio":0,"end":6070371,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Hex/Y.pl"
	    }
	    , {
		"start":6070371,"audio":0,"end":6079910,"filename":"/opt/perl/lib/5.28.1/unicore/lib/GrBase/Y.pl"
	    }
	    , {
		"start":6079910,"audio":0,"end":6080658,"filename":"/opt/perl/lib/5.28.1/unicore/lib/PatSyn/Y.pl"
	    }
	    , {
		"start":6080658,"audio":0,"end":6081358,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ideo/Y.pl"
	    }
	    , {
		"start":6081358,"audio":0,"end":6082451,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Blk/NB.pl"
	    }
	    , {
		"start":6082451,"audio":0,"end":6085337,"filename":"/opt/perl/lib/5.28.1/unicore/lib/NFDQC/N.pl"
	    }
	    , {
		"start":6085337,"audio":0,"end":6088225,"filename":"/opt/perl/lib/5.28.1/unicore/lib/NFDQC/Y.pl"
	    }
	    , {
		"start":6088225,"audio":0,"end":6089188,"filename":"/opt/perl/lib/5.28.1/unicore/lib/SB/CL.pl"
	    }
	    , {
		"start":6089188,"audio":0,"end":6089875,"filename":"/opt/perl/lib/5.28.1/unicore/lib/SB/FO.pl"
	    }
	    , {
		"start":6089875,"audio":0,"end":6093305,"filename":"/opt/perl/lib/5.28.1/unicore/lib/SB/EX.pl"
	    }
	    , {
		"start":6093305,"audio":0,"end":6102364,"filename":"/opt/perl/lib/5.28.1/unicore/lib/SB/XX.pl"
	    }
	    , {
		"start":6102364,"audio":0,"end":6108291,"filename":"/opt/perl/lib/5.28.1/unicore/lib/SB/LE.pl"
	    }
	    , {
		"start":6108291,"audio":0,"end":6115276,"filename":"/opt/perl/lib/5.28.1/unicore/lib/SB/UP.pl"
	    }
	    , {
		"start":6115276,"audio":0,"end":6115971,"filename":"/opt/perl/lib/5.28.1/unicore/lib/SB/SC.pl"
	    }
	    , {
		"start":6115971,"audio":0,"end":6117063,"filename":"/opt/perl/lib/5.28.1/unicore/lib/SB/NU.pl"
	    }
	    , {
		"start":6117063,"audio":0,"end":6118285,"filename":"/opt/perl/lib/5.28.1/unicore/lib/SB/ST.pl"
	    }
	    , {
		"start":6118285,"audio":0,"end":6118815,"filename":"/opt/perl/lib/5.28.1/unicore/lib/SB/AT.pl"
	    }
	    , {
		"start":6118815,"audio":0,"end":6119383,"filename":"/opt/perl/lib/5.28.1/unicore/lib/SB/Sp.pl"
	    }
	    , {
		"start":6119383,"audio":0,"end":6126398,"filename":"/opt/perl/lib/5.28.1/unicore/lib/SB/LO.pl"
	    }
	    , {
		"start":6126398,"audio":0,"end":6127241,"filename":"/opt/perl/lib/5.28.1/unicore/lib/SD/Y.pl"
	    }
	    , {
		"start":6127241,"audio":0,"end":6129931,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nt/None.pl"
	    }
	    , {
		"start":6129931,"audio":0,"end":6130634,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nt/Di.pl"
	    }
	    , {
		"start":6130634,"audio":0,"end":6132806,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Nt/Nu.pl"
	    }
	    , {
		"start":6132806,"audio":0,"end":6139829,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Lower/Y.pl"
	    }
	    , {
		"start":6139829,"audio":0,"end":6140392,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dt/Nar.pl"
	    }
	    , {
		"start":6140392,"audio":0,"end":6143050,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dt/NonCanon.pl"
	    }
	    , {
		"start":6143050,"audio":0,"end":6144718,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dt/Iso.pl"
	    }
	    , {
		"start":6144718,"audio":0,"end":6145858,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dt/Med.pl"
	    }
	    , {
		"start":6145858,"audio":0,"end":6147108,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dt/Com.pl"
	    }
	    , {
		"start":6147108,"audio":0,"end":6148956,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dt/Fin.pl"
	    }
    , {
	"start":6148956,"audio":0,"end":6149543,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dt/Enc.pl"
    }
    , {
	"start":6149543,"audio":0,"end":6150282,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dt/Sup.pl"
    }
    , {
	"start":6150282,"audio":0,"end":6151674,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dt/Init.pl"
    }
    , {
	"start":6151674,"audio":0,"end":6153054,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dt/Font.pl"
    }
    , {
	"start":6153054,"audio":0,"end":6153593,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dt/Nb.pl"
    }
    , {
	"start":6153593,"audio":0,"end":6154144,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dt/Vert.pl"
    }
    , {
	"start":6154144,"audio":0,"end":6154751,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dt/Sqr.pl"
    }
    , {
	"start":6154751,"audio":0,"end":6155283,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dt/Sub.pl"
    }
    , {
	"start":6155283,"audio":0,"end":6156178,"filename":"/opt/perl/lib/5.28.1/unicore/lib/NFCQC/M.pl"
    }
    , {
	"start":6156178,"audio":0,"end":6157820,"filename":"/opt/perl/lib/5.28.1/unicore/lib/NFCQC/Y.pl"
    }
    , {
	"start":6157820,"audio":0,"end":6158431,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ccc/OV.pl"
    }
    , {
	"start":6158431,"audio":0,"end":6160087,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ccc/A.pl"
    }
    , {
	"start":6160087,"audio":0,"end":6161112,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ccc/VR.pl"
    }
    , {
	"start":6161112,"audio":0,"end":6161636,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ccc/DB.pl"
    }
    , {
	"start":6161636,"audio":0,"end":6162168,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ccc/BR.pl"
    }
    , {
	"start":6162168,"audio":0,"end":6162705,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ccc/AR.pl"
    }
    , {
	"start":6162705,"audio":0,"end":6163241,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ccc/ATAR.pl"
    }
    , {
	"start":6163241,"audio":0,"end":6165591,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ccc/NR.pl"
    }
    , {
	"start":6165591,"audio":0,"end":6166340,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ccc/NK.pl"
    }
    , {
	"start":6166340,"audio":0,"end":6167562,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ccc/B.pl"
    }
    , {
	"start":6167562,"audio":0,"end":6168094,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Ccc/AL.pl"
    }
    , {
	"start":6168094,"audio":0,"end":6168695,"filename":"/opt/perl/lib/5.28.1/unicore/lib/GCB/PP.pl"
    }
    , {
	"start":6168695,"audio":0,"end":6169385,"filename":"/opt/perl/lib/5.28.1/unicore/lib/GCB/CN.pl"
    }
    , {
	"start":6169385,"audio":0,"end":6174665,"filename":"/opt/perl/lib/5.28.1/unicore/lib/GCB/LVT.pl"
    }
    , {
	"start":6174665,"audio":0,"end":6178685,"filename":"/opt/perl/lib/5.28.1/unicore/lib/GCB/EX.pl"
    }
    , {
	"start":6178685,"audio":0,"end":6183e3,"filename":"/opt/perl/lib/5.28.1/unicore/lib/GCB/XX.pl"
    }
    , {
	"start":6183e3,"audio":0,"end":6183753,"filename":"/opt/perl/lib/5.28.1/unicore/lib/GCB/GAZ.pl"
    }
    , {
	"start":6183753,"audio":0,"end":6189033,"filename":"/opt/perl/lib/5.28.1/unicore/lib/GCB/LV.pl"
    }
    , {
	"start":6189033,"audio":0,"end":6191117,"filename":"/opt/perl/lib/5.28.1/unicore/lib/GCB/SM.pl"
    }
    , {
	"start":6191117,"audio":0,"end":6192030,"filename":"/opt/perl/lib/5.28.1/unicore/lib/GCB/EB.pl"
    }
    , {
	"start":6192030,"audio":0,"end":6194124,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Math/Y.pl"
    }
    , {
	"start":6194124,"audio":0,"end":6196110,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Cased/Y.pl"
    }
    , {
	"start":6196110,"audio":0,"end":6196789,"filename":"/opt/perl/lib/5.28.1/unicore/lib/DI/Y.pl"
    }
    , {
	"start":6196789,"audio":0,"end":6197332,"filename":"/opt/perl/lib/5.28.1/unicore/lib/PCM/Y.pl"
    }
    , {
	"start":6197332,"audio":0,"end":6197943,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Consona3.pl"
    }
    , {
	"start":6197943,"audio":0,"end":6200035,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Consonan.pl"
    }
    , {
	"start":6200035,"audio":0,"end":6201373,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/VowelInd.pl"
    }
    , {
	"start":6201373,"audio":0,"end":6202024,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/ToneMark.pl"
    }
    , {
	"start":6202024,"audio":0,"end":6202567,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Consona6.pl"
    }
    , {
	"start":6202567,"audio":0,"end":6203170,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Invisibl.pl"
    }
    , {
	"start":6203170,"audio":0,"end":6203927,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Nukta.pl"
    }
    , {
	"start":6203927,"audio":0,"end":6204882,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Number.pl"
    }
    , {
	"start":6204882,"audio":0,"end":6205533,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Syllable.pl"
    }
    , {
	"start":6205533,"audio":0,"end":6206154,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Consona2.pl"
    }
    , {
	"start":6206154,"audio":0,"end":6206753,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Cantilla.pl"
    }
    , {
	"start":6206753,"audio":0,"end":6207774,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Bindu.pl"
    }
    , {
	"start":6207774,"audio":0,"end":6211508,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Other.pl"
    }
    , {
	"start":6211508,"audio":0,"end":6212139,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Consona4.pl"
    }
    , {
	"start":6212139,"audio":0,"end":6212896,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Virama.pl"
    }
    , {
	"start":6212896,"audio":0,"end":6213445,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Vowel.pl"
    }
    , {
	"start":6213445,"audio":0,"end":6215203,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/VowelDep.pl"
    }
    , {
	"start":6215203,"audio":0,"end":6215854,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Avagraha.pl"
    }
    , {
	"start":6215854,"audio":0,"end":6216551,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/PureKill.pl"
    }
    , {
	"start":6216551,"audio":0,"end":6217150,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Consona5.pl"
    }
    , {
	"start":6217150,"audio":0,"end":6218007,"filename":"/opt/perl/lib/5.28.1/unicore/lib/InSC/Visarga.pl"
    }
    , {
	"start":6218007,"audio":0,"end":6219059,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jt/R.pl"
    }
    , {
	"start":6219059,"audio":0,"end":6223229,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jt/U.pl"
    }
    , {
	"start":6223229,"audio":0,"end":6224341,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jt/D.pl"
    }
    , {
	"start":6224341,"audio":0,"end":6224871,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jt/C.pl"
    }
    , {
	"start":6224871,"audio":0,"end":6228823,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jt/T.pl"
    }
    , {
	"start":6228823,"audio":0,"end":6235911,"filename":"/opt/perl/lib/5.28.1/unicore/lib/IDS/Y.pl"
    }
    , {
	"start":6235911,"audio":0,"end":6240579,"filename":"/opt/perl/lib/5.28.1/unicore/lib/CI/Y.pl"
    }
    , {
	"start":6240579,"audio":0,"end":6249610,"filename":"/opt/perl/lib/5.28.1/unicore/lib/CWKCF/Y.pl"
    }
    , {
	"start":6249610,"audio":0,"end":6256171,"filename":"/opt/perl/lib/5.28.1/unicore/lib/CWT/Y.pl"
    }
    , {
	"start":6256171,"audio":0,"end":6258377,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dia/Y.pl"
    }
    , {
	"start":6258377,"audio":0,"end":6259935,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Term/Y.pl"
    }
    , {
	"start":6259935,"audio":0,"end":6261187,"filename":"/opt/perl/lib/5.28.1/unicore/lib/STerm/Y.pl"
    }
    , {
	"start":6261187,"audio":0,"end":6269093,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Alpha/Y.pl"
    }
    , {
	"start":6269093,"audio":0,"end":6269654,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/Seen.pl"
    }
    , {
	"start":6269654,"audio":0,"end":6270235,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/Reh.pl"
    }
    , {
	"start":6270235,"audio":0,"end":6270796,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/Waw.pl"
    }
    , {
	"start":6270796,"audio":0,"end":6271337,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/Dal.pl"
    }
    , {
	"start":6271337,"audio":0,"end":6271867,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/FarsiYeh.pl"
    }
    , {
	"start":6271867,"audio":0,"end":6272438,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/Yeh.pl"
    }
    , {
	"start":6272438,"audio":0,"end":6272968,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/Kaf.pl"
    }
    , {
	"start":6272968,"audio":0,"end":6273498,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/Qaf.pl"
    }
    , {
	"start":6273498,"audio":0,"end":6274028,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/Sad.pl"
    }
    , {
	"start":6274028,"audio":0,"end":6274558,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/Feh.pl"
    }
    , {
	"start":6274558,"audio":0,"end":6275129,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/Hah.pl"
    }
    , {
	"start":6275129,"audio":0,"end":6275690,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/Beh.pl"
    }
    , {
	"start":6275690,"audio":0,"end":6276231,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/Ain.pl"
    }
    , {
	"start":6276231,"audio":0,"end":6276966,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/NoJoinin.pl"
    }
    , {
	"start":6276966,"audio":0,"end":6277496,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/Lam.pl"
    }
    , {
	"start":6277496,"audio":0,"end":6278047,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/Alef.pl"
    }
    , {
	"start":6278047,"audio":0,"end":6278598,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Jg/Gaf.pl"
    }
    , {
	"start":6278598,"audio":0,"end":6279197,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Cprt.pl"
    }
    , {
	"start":6279197,"audio":0,"end":6280059,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Latn.pl"
    }
    , {
	"start":6280059,"audio":0,"end":6280595,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Phlp.pl"
    }
    , {
	"start":6280595,"audio":0,"end":6281125,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Tagb.pl"
    }
    , {
	"start":6281125,"audio":0,"end":6281700,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Yi.pl"
    }
    , {
	"start":6281700,"audio":0,"end":6282238,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Bhks.pl"
    }
    , {
	"start":6282238,"audio":0,"end":6283095,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Grek.pl"
    }
    , {
	"start":6283095,"audio":0,"end":6283986,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Han.pl"
    }
    , {
	"start":6283986,"audio":0,"end":6284649,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Gujr.pl"
    }
    , {
	"start":6284649,"audio":0,"end":6285179,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Khmr.pl"
    }
    , {
	"start":6285179,"audio":0,"end":6285730,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Hmng.pl"
    }
    , {
	"start":6285730,"audio":0,"end":6286291,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Tibt.pl"
    }
    , {
	"start":6286291,"audio":0,"end":6287062,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Gran.pl"
    }
    , {
	"start":6287062,"audio":0,"end":6288228,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Arab.pl"
    }
    , {
	"start":6288228,"audio":0,"end":6288957,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Taml.pl"
    }
    , {
	"start":6288957,"audio":0,"end":6289495,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Xsux.pl"
    }
    , {
	"start":6289495,"audio":0,"end":6290048,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Armn.pl"
    }
    , {
	"start":6290048,"audio":0,"end":6290623,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Gonm.pl"
    }
    , {
	"start":6290623,"audio":0,"end":6291184,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Dupl.pl"
    }
    , {
	"start":6291184,"audio":0,"end":6291735,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Limb.pl"
    }
    , {
	"start":6291735,"audio":0,"end":6292396,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Kana.pl"
    }
    , {
	"start":6292396,"audio":0,"end":6293079,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Knda.pl"
    }
    , {
	"start":6293079,"audio":0,"end":6293644,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Shrd.pl"
    }
    , {
	"start":6293644,"audio":0,"end":6294295,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Telu.pl"
    }
    , {
	"start":6294295,"audio":0,"end":6296467,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Zyyy.pl"
    }
    , {
	"start":6296467,"audio":0,"end":6297140,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Beng.pl"
    }
    , {
	"start":6297140,"audio":0,"end":6297731,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Syrc.pl"
    }
    , {
	"start":6297731,"audio":0,"end":6298570,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Ethi.pl"
    }
    , {
	"start":6298570,"audio":0,"end":6299106,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Tirh.pl"
    }
    , {
	"start":6299106,"audio":0,"end":6299640,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Cakm.pl"
    }
    , {
	"start":6299640,"audio":0,"end":6307602,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Zzzz.pl"
    }
    , {
	"start":6307602,"audio":0,"end":6308167,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Thaa.pl"
    }
    , {
	"start":6308167,"audio":0,"end":6308744,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Geor.pl"
    }
    , {
	"start":6308744,"audio":0,"end":6309282,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Lina.pl"
    }
    , {
	"start":6309282,"audio":0,"end":6309875,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Hebr.pl"
    }
    , {
	"start":6309875,"audio":0,"end":6310506,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Bopo.pl"
    }
    , {
	"start":6310506,"audio":0,"end":6311047,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Lana.pl"
    }
    , {
	"start":6311047,"audio":0,"end":6311590,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Mong.pl"
    }
    , {
	"start":6311590,"audio":0,"end":6312177,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Khar.pl"
    }
    , {
	"start":6312177,"audio":0,"end":6312778,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Mlym.pl"
    }
    , {
	"start":6312778,"audio":0,"end":6313333,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Deva.pl"
    }
    , {
	"start":6313333,"audio":0,"end":6314008,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Hira.pl"
    }
    , {
	"start":6314008,"audio":0,"end":6314546,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Cham.pl"
    }
    , {
	"start":6314546,"audio":0,"end":6315082,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Takr.pl"
    }
    , {
	"start":6315082,"audio":0,"end":6315715,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Sinh.pl"
    }
    , {
	"start":6315715,"audio":0,"end":6316276,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Mult.pl"
    }
    , {
	"start":6316276,"audio":0,"end":6316806,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Talu.pl"
    }
    , {
	"start":6316806,"audio":0,"end":6317342,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Sind.pl"
    }
    , {
	"start":6317342,"audio":0,"end":6317877,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Copt.pl"
    }
    , {
	"start":6317877,"audio":0,"end":6318488,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Linb.pl"
    }
    , {
	"start":6318488,"audio":0,"end":6319030,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Adlm.pl"
    }
    , {
	"start":6319030,"audio":0,"end":6319771,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Hang.pl"
    }
    , {
	"start":6319771,"audio":0,"end":6320422,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Orya.pl"
    }
    , {
	"start":6320422,"audio":0,"end":6320958,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Mymr.pl"
    }
    , {
	"start":6320958,"audio":0,"end":6321629,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Zinh.pl"
    }
    , {
	"start":6321629,"audio":0,"end":6322208,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Cyrl.pl"
    }
    , {
	"start":6322208,"audio":0,"end":6322837,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Glag.pl"
    }
    , {
	"start":6322837,"audio":0,"end":6323520,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Guru.pl"
    }
    , {
	"start":6323520,"audio":0,"end":6324191,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Scx/Lao.pl"
    }
    , {
	"start":6324191,"audio":0,"end":6325451,"filename":"/opt/perl/lib/5.28.1/unicore/lib/CompEx/Y.pl"
    }
    , {
	"start":6325451,"audio":0,"end":6328773,"filename":"/opt/perl/lib/5.28.1/unicore/lib/NFKCQC/N.pl"
    }
    , {
	"start":6328773,"audio":0,"end":6332465,"filename":"/opt/perl/lib/5.28.1/unicore/lib/NFKCQC/Y.pl"
    }
    , {
	"start":6332465,"audio":0,"end":6333038,"filename":"/opt/perl/lib/5.28.1/unicore/lib/Dep/Y.pl"
    }
    , {
	"start":6333038,"audio":0,"end":6341004,"filename":"/opt/perl/lib/5.28.1/IO/Zlib.pm"
    }
    , {
	"start":6341004,"audio":0,"end":6343829,"filename":"/opt/perl/lib/5.28.1/IO/Compress/Bzip2.pm"
    }
    , {
	"start":6343829,"audio":0,"end":6351577,"filename":"/opt/perl/lib/5.28.1/IO/Compress/Gzip.pm"
    }
    , {
	"start":6351577,"audio":0,"end":6374133,"filename":"/opt/perl/lib/5.28.1/IO/Compress/Base.pm"
    }
    , {
	"start":6374133,"audio":0,"end":6401623,"filename":"/opt/perl/lib/5.28.1/IO/Compress/Zip.pm"
    }
    , {
	"start":6401623,"audio":0,"end":6406831,"filename":"/opt/perl/lib/5.28.1/IO/Compress/RawDeflate.pm"
    }
    , {
	"start":6406831,"audio":0,"end":6410158,"filename":"/opt/perl/lib/5.28.1/IO/Compress/Deflate.pm"
    }
    , {
	"start":6410158,"audio":0,"end":6414061,"filename":"/opt/perl/lib/5.28.1/IO/Compress/Gzip/Constants.pm"
    }
    , {
	"start":6414061,"audio":0,"end":6417909,"filename":"/opt/perl/lib/5.28.1/IO/Compress/Zip/Constants.pm"
    }
    , {
	"start":6417909,"audio":0,"end":6419567,"filename":"/opt/perl/lib/5.28.1/IO/Compress/Zlib/Constants.pm"
    }
    , {
	"start":6419567,"audio":0,"end":6425278,"filename":"/opt/perl/lib/5.28.1/IO/Compress/Zlib/Extra.pm"
    }
    , {
	"start":6425278,"audio":0,"end":6427874,"filename":"/opt/perl/lib/5.28.1/IO/Compress/Adapter/Bzip2.pm"
    }
    , {
	"start":6427874,"audio":0,"end":6429312,"filename":"/opt/perl/lib/5.28.1/IO/Compress/Adapter/Identity.pm"
    }
    , {
	"start":6429312,"audio":0,"end":6432456,"filename":"/opt/perl/lib/5.28.1/IO/Compress/Adapter/Deflate.pm"
    }
    , {
	"start":6432456,"audio":0,"end":6455555,"filename":"/opt/perl/lib/5.28.1/IO/Compress/Base/Common.pm"
    }
    , {
	"start":6455555,"audio":0,"end":6460375,"filename":"/opt/perl/lib/5.28.1/IO/Uncompress/Inflate.pm"
    }
    , {
	"start":6460375,"audio":0,"end":6467785,"filename":"/opt/perl/lib/5.28.1/IO/Uncompress/Gunzip.pm"
    }
    , {
	"start":6467785,"audio":0,"end":6473454,"filename":"/opt/perl/lib/5.28.1/IO/Uncompress/AnyUncompress.pm"
    }
    , {
	"start":6473454,"audio":0,"end":6502528,"filename":"/opt/perl/lib/5.28.1/IO/Uncompress/Unzip.pm"
    }
    , {
	"start":6502528,"audio":0,"end":6505159,"filename":"/opt/perl/lib/5.28.1/IO/Uncompress/Bunzip2.pm"
    }
    , {
	"start":6505159,"audio":0,"end":6541974,"filename":"/opt/perl/lib/5.28.1/IO/Uncompress/Base.pm"
    }
    , {
	"start":6541974,"audio":0,"end":6550675,"filename":"/opt/perl/lib/5.28.1/IO/Uncompress/RawInflate.pm"
    }
    , {
	"start":6550675,"audio":0,"end":6553265,"filename":"/opt/perl/lib/5.28.1/IO/Uncompress/AnyInflate.pm"
    }
    , {
	"start":6553265,"audio":0,"end":6556544,"filename":"/opt/perl/lib/5.28.1/IO/Uncompress/Adapter/Inflate.pm"
    }
    , {
	"start":6556544,"audio":0,"end":6558586,"filename":"/opt/perl/lib/5.28.1/IO/Uncompress/Adapter/Bunzip2.pm"
    }
    , {
	"start":6558586,"audio":0,"end":6563169,"filename":"/opt/perl/lib/5.28.1/IO/Uncompress/Adapter/Identity.pm"
    }
    , {
	"start":6563169,"audio":0,"end":6584445,"filename":"/opt/perl/lib/5.28.1/IO/Socket/IP.pm"
    }
    , {
	"start":6584445,"audio":0,"end":6614830,"filename":"/opt/perl/lib/5.28.1/Locale/Maketext.pm"
    }
    , {
	"start":6614830,"audio":0,"end":6639474,"filename":"/opt/perl/lib/5.28.1/Locale/Codes.pm"
    }
    , {
	"start":6639474,"audio":0,"end":6641379,"filename":"/opt/perl/lib/5.28.1/Locale/Currency.pm"
    }
    , {
	"start":6641379,"audio":0,"end":6643242,"filename":"/opt/perl/lib/5.28.1/Locale/Script.pm"
    }
    , {
	"start":6643242,"audio":0,"end":6645126,"filename":"/opt/perl/lib/5.28.1/Locale/Country.pm"
    }
    , {
	"start":6645126,"audio":0,"end":6647031,"filename":"/opt/perl/lib/5.28.1/Locale/Language.pm"
    }
    , {
	"start":6647031,"audio":0,"end":6648922,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/LangVar.pm"
    }
    , {
	"start":6648922,"audio":0,"end":6649653,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/LangExt_Retired.pm"
    }
    , {
	"start":6649653,"audio":0,"end":6653211,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/Script_Retired.pm"
    }
    , {
	"start":6653211,"audio":0,"end":6682183,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/Country_Retired.pm"
    }
    , {
	"start":6682183,"audio":0,"end":6688488,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/Constants.pm"
    }
    , {
	"start":6688488,"audio":0,"end":6708649,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/Language_Retired.pm"
    }
    , {
	"start":6708649,"audio":0,"end":6966449,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/Country_Codes.pm"
    }
    , {
	"start":6966449,"audio":0,"end":6968361,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/Currency.pm"
    }
    , {
	"start":6968361,"audio":0,"end":8572579,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/Language_Codes.pm"
    }
    , {
	"start":8572579,"audio":0,"end":8597467,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/LangFam_Codes.pm"
    }
    , {
	"start":8597467,"audio":0,"end":8599337,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/Script.pm"
    }
    , {
	"start":8599337,"audio":0,"end":8650331,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/Currency_Codes.pm"
    }
    , {
	"start":8650331,"audio":0,"end":8701481,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/LangExt_Codes.pm"
    }
    , {
	"start":8701481,"audio":0,"end":8703372,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/Country.pm"
    }
    , {
	"start":8703372,"audio":0,"end":8726450,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/LangVar_Codes.pm"
    }
    , {
	"start":8726450,"audio":0,"end":8790972,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/Script_Codes.pm"
    }
    , {
	"start":8790972,"audio":0,"end":8791844,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/LangVar_Retired.pm"
    }
    , {
	"start":8791844,"audio":0,"end":8793735,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/LangFam.pm"
    }
    , {
	"start":8793735,"audio":0,"end":8794148,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/LangFam_Retired.pm"
    }
    , {
	"start":8794148,"audio":0,"end":8796039,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/LangExt.pm"
    }
    , {
	"start":8796039,"audio":0,"end":8797951,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/Language.pm"
    }
    , {
	"start":8797951,"audio":0,"end":8806087,"filename":"/opt/perl/lib/5.28.1/Locale/Codes/Currency_Retired.pm"
    }
    , {
	"start":8806087,"audio":0,"end":8810938,"filename":"/opt/perl/lib/5.28.1/Locale/Maketext/Simple.pm"
    }
    , {
	"start":8810938,"audio":0,"end":8811059,"filename":"/opt/perl/lib/5.28.1/Locale/Maketext/GutsLoader.pm"
    }
    , {
	"start":8811059,"audio":0,"end":8811143,"filename":"/opt/perl/lib/5.28.1/Locale/Maketext/Guts.pm"
    }
    , {
	"start":8811143,"audio":0,"end":8815215,"filename":"/opt/perl/lib/5.28.1/version/regex.pm"
    }
    , {
	"start":8815215,"audio":0,"end":8820551,"filename":"/opt/perl/lib/5.28.1/Math/Trig.pm"
    }
    , {
	"start":8820551,"audio":0,"end":8953191,"filename":"/opt/perl/lib/5.28.1/Math/BigInt.pm"
    }
    , {
	"start":8953191,"audio":0,"end":8986107,"filename":"/opt/perl/lib/5.28.1/Math/Complex.pm"
    }
    , {
	"start":8986107,"audio":0,"end":9049744,"filename":"/opt/perl/lib/5.28.1/Math/BigRat.pm"
    }
    , {
	"start":9049744,"audio":0,"end":9204269,"filename":"/opt/perl/lib/5.28.1/Math/BigFloat.pm"
    }
    , {
	"start":9204269,"audio":0,"end":9205538,"filename":"/opt/perl/lib/5.28.1/Math/BigFloat/Trace.pm"
    }
    , {
	"start":9205538,"audio":0,"end":9247910,"filename":"/opt/perl/lib/5.28.1/Math/BigInt/Lib.pm"
    }
    , {
	"start":9247910,"audio":0,"end":9323640,"filename":"/opt/perl/lib/5.28.1/Math/BigInt/Calc.pm"
    }
    , {
	"start":9323640,"audio":0,"end":9331477,"filename":"/opt/perl/lib/5.28.1/Math/BigInt/CalcEmu.pm"
    }
    , {
	"start":9331477,"audio":0,"end":9332468,"filename":"/opt/perl/lib/5.28.1/Math/BigInt/Trace.pm"
    }
    , {
	"start":9332468,"audio":0,"end":9338875,"filename":"/opt/perl/lib/5.28.1/Exporter/Heavy.pm"
    }
    , {
	"start":9338875,"audio":0,"end":9340749,"filename":"/opt/perl/lib/5.28.1/encoding/warnings.pm"
    }
    , {
	"start":9340749,"audio":0,"end":9342037,"filename":"/opt/perl/lib/5.28.1/Module/Loaded.pm"
    }
    , {
	"start":9342037,"audio":0,"end":10149968,"filename":"/opt/perl/lib/5.28.1/Module/CoreList.pm"
    }
    , {
	"start":10149968,"audio":0,"end":10174052,"filename":"/opt/perl/lib/5.28.1/Module/Metadata.pm"
    }
    , {
	"start":10174052,"audio":0,"end":10177275,"filename":"/opt/perl/lib/5.28.1/Module/Load.pm"
    }
    , {
	"start":10177275,"audio":0,"end":10188491,"filename":"/opt/perl/lib/5.28.1/Module/Load/Conditional.pm"
    }
    , {
	"start":10188491,"audio":0,"end":10214738,"filename":"/opt/perl/lib/5.28.1/Module/CoreList/Utils.pm"
    }
    , {
	"start":10214738,"audio":0,"end":10217807,"filename":"/opt/perl/lib/5.28.1/wasm/attributes.pm"
    }
    , {
	"start":10217807,"audio":0,"end":10259333,"filename":"/opt/perl/lib/5.28.1/wasm/Config_heavy.pl"
    }
    , {
	"start":10259333,"audio":0,"end":10259803,"filename":"/opt/perl/lib/5.28.1/wasm/IO.pm"
    }
    , {
	"start":10259803,"audio":0,"end":10267089,"filename":"/opt/perl/lib/5.28.1/wasm/encoding.pm"
    }
    , {
	"start":10267089,"audio":0,"end":10280380,"filename":"/opt/perl/lib/5.28.1/wasm/WebPerl.pm"
    }
    , {
	"start":10280380,"audio":0,"end":10288443,"filename":"/opt/perl/lib/5.28.1/wasm/B.pm"
    }
    , {
	"start":10288443,"audio":0,"end":10305966,"filename":"/opt/perl/lib/5.28.1/wasm/Cwd.pm"
    }
    , {
	"start":10305966,"audio":0,"end":10306203,"filename":"/opt/perl/lib/5.28.1/wasm/SDBM_File.pm"
    }
    , {
	"start":10306203,"audio":0,"end":10307973,"filename":"/opt/perl/lib/5.28.1/wasm/Opcode.pm"
    }
    , {
	"start":10307973,"audio":0,"end":10310130,"filename":"/opt/perl/lib/5.28.1/wasm/Fcntl.pm"
    }
    , {
	"start":10310130,"audio":0,"end":10310561,"filename":"/opt/perl/lib/5.28.1/wasm/ops.pm"
    }
    , {
	"start":10310561,"audio":0,"end":10311824,"filename":"/opt/perl/lib/5.28.1/wasm/O.pm"
    }
    , {
	"start":10311824,"audio":0,"end":10325697,"filename":"/opt/perl/lib/5.28.1/wasm/Socket.pm"
    }
    , {
	"start":10325697,"audio":0,"end":10326434,"filename":"/opt/perl/lib/5.28.1/wasm/Config_git.pl"
    }
    , {
	"start":10326434,"audio":0,"end":10328720,"filename":"/opt/perl/lib/5.28.1/wasm/lib.pm"
    }
    , {
	"start":10328720,"audio":0,"end":10349067,"filename":"/opt/perl/lib/5.28.1/wasm/POSIX.pm"
    }
    , {
	"start":10349067,"audio":0,"end":10360219,"filename":"/opt/perl/lib/5.28.1/wasm/DynaLoader.pm"
    }
    , {
	"start":10360219,"audio":0,"end":10365346,"filename":"/opt/perl/lib/5.28.1/wasm/Errno.pm"
    }
    , {
	"start":10365346,"audio":0,"end":10375750,"filename":"/opt/perl/lib/5.28.1/wasm/Encode.pm"
    }
    , {
	"start":10375750,"audio":0,"end":10376596,"filename":"/opt/perl/lib/5.28.1/wasm/mro.pm"
    }
    , {
	"start":10376596,"audio":0,"end":10385298,"filename":"/opt/perl/lib/5.28.1/wasm/re.pm"
    }
    , {
	"start":10385298,"audio":0,"end":10389116,"filename":"/opt/perl/lib/5.28.1/wasm/Config.pm"
    }
    , {
	"start":10389116,"audio":0,"end":10390538,"filename":"/opt/perl/lib/5.28.1/wasm/Scalar/Util.pm"
    }
    , {
	"start":10390538,"audio":0,"end":10390702,"filename":"/opt/perl/lib/5.28.1/wasm/Tie/Hash/NamedCapture.pm"
    }
    , {
	"start":10390702,"audio":0,"end":10391323,"filename":"/opt/perl/lib/5.28.1/wasm/Sub/Util.pm"
    }
    , {
	"start":10391323,"audio":0,"end":10392630,"filename":"/opt/perl/lib/5.28.1/wasm/B/Terse.pm"
    }
    , {
	"start":10392630,"audio":0,"end":10401243,"filename":"/opt/perl/lib/5.28.1/wasm/B/Xref.pm"
    }
    , {
	"start":10401243,"audio":0,"end":10404683,"filename":"/opt/perl/lib/5.28.1/wasm/B/Showlex.pm"
    }
    , {
	"start":10404683,"audio":0,"end":10439962,"filename":"/opt/perl/lib/5.28.1/wasm/B/Concise.pm"
    }
    , {
	"start":10439962,"audio":0,"end":10442764,"filename":"/opt/perl/lib/5.28.1/wasm/Time/HiRes.pm"
    }
    , {
	"start":10442764,"audio":0,"end":10446205,"filename":"/opt/perl/lib/5.28.1/wasm/Time/Seconds.pm"
    }
    , {
	"start":10446205,"audio":0,"end":10466980,"filename":"/opt/perl/lib/5.28.1/wasm/Time/Piece.pm"
    }
    , {
	"start":10466980,"audio":0,"end":10468155,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/Unicode.pm"
    }
    , {
	"start":10468155,"audio":0,"end":10468383,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/Symbol.pm"
    }
    , {
	"start":10468383,"audio":0,"end":10478853,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/GSM0338.pm"
    }
    , {
	"start":10478853,"audio":0,"end":10481284,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/Encoder.pm"
    }
    , {
	"start":10481284,"audio":0,"end":10486364,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/Guess.pm"
    }
    , {
	"start":10486364,"audio":0,"end":10487959,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/CJKConstants.pm"
    }
    , {
	"start":10487959,"audio":0,"end":10497632,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/Alias.pm"
    }
    , {
	"start":10497632,"audio":0,"end":10497858,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/Byte.pm"
    }
    , {
	"start":10497858,"audio":0,"end":10499364,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/Encoding.pm"
    }
    , {
	"start":10499364,"audio":0,"end":10505366,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/Config.pm"
    }
    , {
	"start":10505366,"audio":0,"end":10509559,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/JP/JIS7.pm"
    }
    , {
	"start":10509559,"audio":0,"end":10514623,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/JP/H2Z.pm"
    }
    , {
	"start":10514623,"audio":0,"end":10517262,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/Unicode/UTF7.pm"
    }
    , {
	"start":10517262,"audio":0,"end":10519167,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/KR/2022_KR.pm"
    }
    , {
	"start":10519167,"audio":0,"end":10525184,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/CN/HZ.pm"
    }
    , {
	"start":10525184,"audio":0,"end":10536270,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/MIME/Header.pm"
    }
    , {
	"start":10536270,"audio":0,"end":10539989,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/MIME/Name.pm"
    }
    , {
	"start":10539989,"audio":0,"end":10543189,"filename":"/opt/perl/lib/5.28.1/wasm/Encode/MIME/Header/ISO_2022_JP.pm"
    }
    , {
	"start":10543189,"audio":0,"end":10543918,"filename":"/opt/perl/lib/5.28.1/wasm/I18N/Langinfo.pm"
    }
    , {
	"start":10543918,"audio":0,"end":10544289,"filename":"/opt/perl/lib/5.28.1/wasm/PerlIO/encoding.pm"
    }
    , {
	"start":10544289,"audio":0,"end":10544381,"filename":"/opt/perl/lib/5.28.1/wasm/PerlIO/via.pm"
    }
    , {
	"start":10544381,"audio":0,"end":10544476,"filename":"/opt/perl/lib/5.28.1/wasm/PerlIO/scalar.pm"
    }
    , {
	"start":10544476,"audio":0,"end":10546389,"filename":"/opt/perl/lib/5.28.1/wasm/Devel/Peek.pm"
    }
    , {
	"start":10546389,"audio":0,"end":10549539,"filename":"/opt/perl/lib/5.28.1/wasm/Unicode/Normalize.pm"
    }
    , {
	"start":10549539,"audio":0,"end":10552142,"filename":"/opt/perl/lib/5.28.1/wasm/IO/Poll.pm"
    }
    , {
	"start":10552142,"audio":0,"end":10552785,"filename":"/opt/perl/lib/5.28.1/wasm/IO/Seekable.pm"
    }
    , {
	"start":10552785,"audio":0,"end":10554422,"filename":"/opt/perl/lib/5.28.1/wasm/IO/File.pm"
    }
    , {
	"start":10554422,"audio":0,"end":10563858,"filename":"/opt/perl/lib/5.28.1/wasm/IO/Socket.pm"
    }
    , {
	"start":10563858,"audio":0,"end":10568198,"filename":"/opt/perl/lib/5.28.1/wasm/IO/Select.pm"
    }
    , {
	"start":10568198,"audio":0,"end":10576402,"filename":"/opt/perl/lib/5.28.1/wasm/IO/Handle.pm"
    }
    , {
	"start":10576402,"audio":0,"end":10579816,"filename":"/opt/perl/lib/5.28.1/wasm/IO/Pipe.pm"
    }
    , {
	"start":10579816,"audio":0,"end":10582520,"filename":"/opt/perl/lib/5.28.1/wasm/IO/Dir.pm"
    }
    , {
	"start":10582520,"audio":0,"end":10583856,"filename":"/opt/perl/lib/5.28.1/wasm/IO/Socket/UNIX.pm"
    }
    , {
	"start":10583856,"audio":0,"end":10591318,"filename":"/opt/perl/lib/5.28.1/wasm/IO/Socket/INET.pm"
    }
    , {
	"start":10591318,"audio":0,"end":10599590,"filename":"/opt/perl/lib/5.28.1/wasm/Hash/Util.pm"
    }
    , {
	"start":10599590,"audio":0,"end":10600708,"filename":"/opt/perl/lib/5.28.1/wasm/List/Util.pm"
    }
    , {
	"start":10600708,"audio":0,"end":10600862,"filename":"/opt/perl/lib/5.28.1/wasm/List/Util/XS.pm"
    }
    , {
	"start":10600862,"audio":0,"end":10625148,"filename":"/opt/perl/lib/5.28.1/wasm/Data/Dumper.pm"
    }
    , {
	"start":10625148,"audio":0,"end":10627983,"filename":"/opt/perl/lib/5.28.1/wasm/Cpanel/JSON/XS.pm"
    }
    , {
	"start":10627983,"audio":0,"end":10630848,"filename":"/opt/perl/lib/5.28.1/wasm/Cpanel/JSON/XS/Type.pm"
    }
    , {
	"start":10630848,"audio":0,"end":10630880,"filename":"/opt/perl/lib/5.28.1/wasm/Cpanel/JSON/XS/Boolean.pm"
    }
    , {
	"start":10630880,"audio":0,"end":10631437,"filename":"/opt/perl/lib/5.28.1/wasm/File/Spec.pm"
    }
    , {
	"start":10631437,"audio":0,"end":10633482,"filename":"/opt/perl/lib/5.28.1/wasm/File/Glob.pm"
    }
    , {
	"start":10633482,"audio":0,"end":10641075,"filename":"/opt/perl/lib/5.28.1/wasm/File/Spec/Win32.pm"
    }
    , {
	"start":10641075,"audio":0,"end":10643189,"filename":"/opt/perl/lib/5.28.1/wasm/File/Spec/Cygwin.pm"
    }
    , {
	"start":10643189,"audio":0,"end":10655989,"filename":"/opt/perl/lib/5.28.1/wasm/File/Spec/VMS.pm"
    }
    , {
	"start":10655989,"audio":0,"end":10657092,"filename":"/opt/perl/lib/5.28.1/wasm/File/Spec/Functions.pm"
    }
    , {
	"start":10657092,"audio":0,"end":10657736,"filename":"/opt/perl/lib/5.28.1/wasm/File/Spec/Epoc.pm"
    }
    , {
	"start":10657736,"audio":0,"end":10658194,"filename":"/opt/perl/lib/5.28.1/wasm/File/Spec/AmigaOS.pm"
    }
    , {
	"start":10658194,"audio":0,"end":10666276,"filename":"/opt/perl/lib/5.28.1/wasm/File/Spec/Mac.pm"
    }
    , {
	"start":10666276,"audio":0,"end":10672266,"filename":"/opt/perl/lib/5.28.1/wasm/File/Spec/OS2.pm"
    }
    , {
	"start":10672266,"audio":0,"end":10681588,"filename":"/opt/perl/lib/5.28.1/wasm/File/Spec/Unix.pm"
    }
    , {
	"start":10681588,"audio":0,"end":10687071,"filename":"/opt/perl/lib/5.28.1/wasm/Digest/SHA.pm"
    }
    , {
	"start":10687071,"audio":0,"end":10687808,"filename":"/opt/perl/lib/5.28.1/wasm/Digest/MD5.pm"
    }
    , {
	"start":10687808,"audio":0,"end":10710198,"filename":"/opt/perl/lib/5.28.1/CPAN/Module.pm"
    }
    , {
	"start":10710198,"audio":0,"end":10732414,"filename":"/opt/perl/lib/5.28.1/CPAN/Index.pm"
    }
    , {
	"start":10732414,"audio":0,"end":10732981,"filename":"/opt/perl/lib/5.28.1/CPAN/Prompt.pm"
    }
    , {
	"start":10732981,"audio":0,"end":10733382,"filename":"/opt/perl/lib/5.28.1/CPAN/Nox.pm"
    }
    , {
	"start":10733382,"audio":0,"end":10751077,"filename":"/opt/perl/lib/5.28.1/CPAN/Meta.pm"
    }
    , {
	"start":10751077,"audio":0,"end":10754496,"filename":"/opt/perl/lib/5.28.1/CPAN/Version.pm"
    }
    , {
	"start":10754496,"audio":0,"end":10763470,"filename":"/opt/perl/lib/5.28.1/CPAN/Distroprefs.pm"
    }
    , {
	"start":10763470,"audio":0,"end":10770218,"filename":"/opt/perl/lib/5.28.1/CPAN/Queue.pm"
    }
    , {
	"start":10770218,"audio":0,"end":10777060,"filename":"/opt/perl/lib/5.28.1/CPAN/Author.pm"
    }
    , {
	"start":10777060,"audio":0,"end":10788576,"filename":"/opt/perl/lib/5.28.1/CPAN/Mirrors.pm"
    }
    , {
	"start":10788576,"audio":0,"end":10839191,"filename":"/opt/perl/lib/5.28.1/CPAN/FirstTime.pm"
    }
    , {
	"start":10839191,"audio":0,"end":10840163,"filename":"/opt/perl/lib/5.28.1/CPAN/Distrostatus.pm"
    }
    , {
	"start":10840163,"audio":0,"end":10840352,"filename":"/opt/perl/lib/5.28.1/CPAN/DeferredCode.pm"
    }
    , {
	"start":10840352,"audio":0,"end":10842776,"filename":"/opt/perl/lib/5.28.1/CPAN/Kwalify.pm"
    }
    , {
	"start":10842776,"audio":0,"end":10916393,"filename":"/opt/perl/lib/5.28.1/CPAN/Shell.pm"
    }
    , {
	"start":10916393,"audio":0,"end":10926219,"filename":"/opt/perl/lib/5.28.1/CPAN/Bundle.pm"
    }
    , {
	"start":10926219,"audio":0,"end":10932242,"filename":"/opt/perl/lib/5.28.1/CPAN/Complete.pm"
    }
    , {
	"start":10932242,"audio":0,"end":10934154,"filename":"/opt/perl/lib/5.28.1/CPAN/Debug.pm"
    }
    , {
	"start":10934154,"audio":0,"end":10956503,"filename":"/opt/perl/lib/5.28.1/CPAN/HandleConfig.pm"
    }
    , {
	"start":10956503,"audio":0,"end":10957091,"filename":"/opt/perl/lib/5.28.1/CPAN/URL.pm"
    }
    , {
	"start":10957091,"audio":0,"end":11000057,"filename":"/opt/perl/lib/5.28.1/CPAN/FTP.pm"
    }
    , {
	"start":11000057,"audio":0,"end":11007721,"filename":"/opt/perl/lib/5.28.1/CPAN/CacheMgr.pm"
    }
    , {
	"start":11007721,"audio":0,"end":11014630,"filename":"/opt/perl/lib/5.28.1/CPAN/InfoObj.pm"
    }
    , {
	"start":11014630,"audio":0,"end":11179218,"filename":"/opt/perl/lib/5.28.1/CPAN/Distribution.pm"
    }
    , {
	"start":11179218,"audio":0,"end":11195727,"filename":"/opt/perl/lib/5.28.1/CPAN/Tarzip.pm"
    }
    , {
	"start":11195727,"audio":0,"end":11197959,"filename":"/opt/perl/lib/5.28.1/CPAN/Plugin.pm"
    }
    , {
	"start":11197959,"audio":0,"end":11199521,"filename":"/opt/perl/lib/5.28.1/CPAN/FTP/netrc.pm"
    }
    , {
	"start":11199521,"audio":0,"end":11201114,"filename":"/opt/perl/lib/5.28.1/CPAN/Kwalify/distroprefs.yml"
    }
    , {
	"start":11201114,"audio":0,"end":11204341,"filename":"/opt/perl/lib/5.28.1/CPAN/Kwalify/distroprefs.dd"
    }
    , {
	"start":11204341,"audio":0,"end":11211682,"filename":"/opt/perl/lib/5.28.1/CPAN/Plugin/Specfile.pm"
    }
    , {
	"start":11211682,"audio":0,"end":11214315,"filename":"/opt/perl/lib/5.28.1/CPAN/HTTP/Credentials.pm"
    }
    , {
	"start":11214315,"audio":0,"end":11222266,"filename":"/opt/perl/lib/5.28.1/CPAN/HTTP/Client.pm"
    }
    , {
	"start":11222266,"audio":0,"end":11222756,"filename":"/opt/perl/lib/5.28.1/CPAN/Exception/yaml_not_installed.pm"
    }
    , {
	"start":11222756,"audio":0,"end":11224459,"filename":"/opt/perl/lib/5.28.1/CPAN/Exception/yaml_process_error.pm"
    }
    , {
	"start":11224459,"audio":0,"end":11228345,"filename":"/opt/perl/lib/5.28.1/CPAN/Exception/RecursiveDependency.pm"
    }
    , {
	"start":11228345,"audio":0,"end":11229265,"filename":"/opt/perl/lib/5.28.1/CPAN/Exception/blocked_urllist.pm"
    }
    , {
	"start":11229265,"audio":0,"end":11229431,"filename":"/opt/perl/lib/5.28.1/CPAN/Meta/History.pm"
    }
    , {
	"start":11229431,"audio":0,"end":11231068,"filename":"/opt/perl/lib/5.28.1/CPAN/Meta/Feature.pm"
    }
    , {
	"start":11231068,"audio":0,"end":11277209,"filename":"/opt/perl/lib/5.28.1/CPAN/Meta/Converter.pm"
    }
    , {
	"start":11277209,"audio":0,"end":11306662,"filename":"/opt/perl/lib/5.28.1/CPAN/Meta/Validator.pm"
    }
    , {
	"start":11306662,"audio":0,"end":11315573,"filename":"/opt/perl/lib/5.28.1/CPAN/Meta/Prereqs.pm"
    }
    , {
	"start":11315573,"audio":0,"end":11338738,"filename":"/opt/perl/lib/5.28.1/CPAN/Meta/Requirements.pm"
    }
    , {
	"start":11338738,"audio":0,"end":11364009,"filename":"/opt/perl/lib/5.28.1/CPAN/Meta/YAML.pm"
    }
    , {
	"start":11364009,"audio":0,"end":11370482,"filename":"/opt/perl/lib/5.28.1/CPAN/Meta/Merge.pm"
    }
    , {
	"start":11370482,"audio":0,"end":11370865,"filename":"/opt/perl/lib/5.28.1/CPAN/Meta/Spec.pm"
    }
    , {
	"start":11370865,"audio":0,"end":11372899,"filename":"/opt/perl/lib/5.28.1/CPAN/LWP/UserAgent.pm"
    }
    , {
	"start":11372899,"audio":0,"end":11404177,"filename":"/opt/perl/lib/5.28.1/App/Cpan.pm"
    }
    , {
	"start":11404177,"audio":0,"end":11418350,"filename":"/opt/perl/lib/5.28.1/App/Prove.pm"
    }
    , {
	"start":11418350,"audio":0,"end":11427564,"filename":"/opt/perl/lib/5.28.1/App/Prove/State.pm"
    }
    , {
	"start":11427564,"audio":0,"end":11430011,"filename":"/opt/perl/lib/5.28.1/App/Prove/State/Result.pm"
    }
    , {
	"start":11430011,"audio":0,"end":11431552,"filename":"/opt/perl/lib/5.28.1/App/Prove/State/Result/Test.pm"
    }
    , {
	"start":11431552,"audio":0,"end":11432040,"filename":"/opt/perl/lib/5.28.1/warnings/register.pm"
    }
    , {
	"start":11432040,"audio":0,"end":11433991,"filename":"/opt/perl/lib/5.28.1/overload/numbers.pm"
    }
    , {
	"start":11433991,"audio":0,"end":11435287,"filename":"/opt/perl/lib/5.28.1/Memoize/Storable.pm"
    }
    , {
	"start":11435287,"audio":0,"end":11436642,"filename":"/opt/perl/lib/5.28.1/Memoize/SDBM_File.pm"
    }
    , {
	"start":11436642,"audio":0,"end":11437568,"filename":"/opt/perl/lib/5.28.1/Memoize/ExpireFile.pm"
    }
    , {
	"start":11437568,"audio":0,"end":11441030,"filename":"/opt/perl/lib/5.28.1/Memoize/Expire.pm"
    }
    , {
	"start":11441030,"audio":0,"end":11441569,"filename":"/opt/perl/lib/5.28.1/Memoize/AnyDBM_File.pm"
    }
    , {
	"start":11441569,"audio":0,"end":11441960,"filename":"/opt/perl/lib/5.28.1/Memoize/ExpireTest.pm"
    }
    , {
	"start":11441960,"audio":0,"end":11443317,"filename":"/opt/perl/lib/5.28.1/Memoize/NDBM_File.pm"
    }
    , {
	"start":11443317,"audio":0,"end":11486584,"filename":"/opt/perl/lib/5.28.1/Getopt/Long.pm"
    }
    , {
	"start":11486584,"audio":0,"end":11491851,"filename":"/opt/perl/lib/5.28.1/Getopt/Std.pm"
    }
    , {
	"start":11491851,"audio":0,"end":11500914,"filename":"/opt/perl/lib/5.28.1/Params/Check.pm"
    }
    , {
	"start":11500914,"audio":0,"end":11521939,"filename":"/opt/perl/lib/5.28.1/Term/ANSIColor.pm"
    }
    , {
	"start":11521939,"audio":0,"end":11525482,"filename":"/opt/perl/lib/5.28.1/Term/Complete.pm"
    }
    , {
	"start":11525482,"audio":0,"end":11533204,"filename":"/opt/perl/lib/5.28.1/Term/ReadLine.pm"
    }
    , {
	"start":11533204,"audio":0,"end":11546180,"filename":"/opt/perl/lib/5.28.1/Term/Cap.pm"
    }
    , {
	"start":11546180,"audio":0,"end":11546953,"filename":"/opt/perl/lib/5.28.1/Carp/Heavy.pm"
    }
    , {
	"start":11546953,"audio":0,"end":11562800,"filename":"/opt/perl/lib/5.28.1/Compress/Zlib.pm"
    }
    , {
	"start":11562800,"audio":0,"end":11599919,"filename":"/opt/perl/lib/5.28.1/File/Fetch.pm"
    }
    , {
	"start":11599919,"audio":0,"end":11620643,"filename":"/opt/perl/lib/5.28.1/File/Path.pm"
    }
    , {
	"start":11620643,"audio":0,"end":11629744,"filename":"/opt/perl/lib/5.28.1/File/Copy.pm"
    }
    , {
	"start":11629744,"audio":0,"end":11651975,"filename":"/opt/perl/lib/5.28.1/File/Find.pm"
    }
    , {
	"start":11651975,"audio":0,"end":11655125,"filename":"/opt/perl/lib/5.28.1/File/Compare.pm"
    }
    , {
	"start":11655125,"audio":0,"end":11661459,"filename":"/opt/perl/lib/5.28.1/File/stat.pm"
    }
    , {
	"start":11661459,"audio":0,"end":11666908,"filename":"/opt/perl/lib/5.28.1/File/Basename.pm"
    }
    , {
	"start":11666908,"audio":0,"end":11713868,"filename":"/opt/perl/lib/5.28.1/File/Temp.pm"
    }
    , {
	"start":11713868,"audio":0,"end":11721940,"filename":"/opt/perl/lib/5.28.1/File/GlobMapper.pm"
    }
    , {
	"start":11721940,"audio":0,"end":11766635,"filename":"/opt/perl/lib/5.28.1/JSON/PP.pm"
    }
    , {
	"start":11766635,"audio":0,"end":11766895,"filename":"/opt/perl/lib/5.28.1/JSON/PP/Boolean.pm"
    }
    , {
	"start":11766895,"audio":0,"end":11767322,"filename":"/opt/perl/lib/5.28.1/Test2/EventFacet.pm"
    }
    , {
	"start":11767322,"audio":0,"end":11786538,"filename":"/opt/perl/lib/5.28.1/Test2/API.pm"
    }
    , {
	"start":11786538,"audio":0,"end":11788365,"filename":"/opt/perl/lib/5.28.1/Test2/IPC.pm"
    }
    , {
	"start":11788365,"audio":0,"end":11794543,"filename":"/opt/perl/lib/5.28.1/Test2/Util.pm"
    }
    , {
	"start":11794543,"audio":0,"end":11802337,"filename":"/opt/perl/lib/5.28.1/Test2/Event.pm"
    }
    , {
	"start":11802337,"audio":0,"end":11815219,"filename":"/opt/perl/lib/5.28.1/Test2/Hub.pm"
    }
    , {
	"start":11815219,"audio":0,"end":11815633,"filename":"/opt/perl/lib/5.28.1/Test2/Formatter.pm"
    }
    , {
	"start":11815633,"audio":0,"end":11822297,"filename":"/opt/perl/lib/5.28.1/Test2/Tools/Tiny.pm"
    }
    , {
	"start":11822297,"audio":0,"end":11823654,"filename":"/opt/perl/lib/5.28.1/Test2/IPC/Driver.pm"
    }
    , {
	"start":11823654,"audio":0,"end":11835190,"filename":"/opt/perl/lib/5.28.1/Test2/IPC/Driver/Files.pm"
    }
    , {
	"start":11835190,"audio":0,"end":11836625,"filename":"/opt/perl/lib/5.28.1/Test2/Hub/Subtest.pm"
    }
    , {
	"start":11836625,"audio":0,"end":11837455,"filename":"/opt/perl/lib/5.28.1/Test2/Hub/Interceptor.pm"
    }
    , {
	"start":11837455,"audio":0,"end":11837569,"filename":"/opt/perl/lib/5.28.1/Test2/Hub/Interceptor/Terminator.pm"
    }
    , {
	"start":11837569,"audio":0,"end":11848413,"filename":"/opt/perl/lib/5.28.1/Test2/Formatter/TAP.pm"
    }
    , {
	"start":11848413,"audio":0,"end":11851802,"filename":"/opt/perl/lib/5.28.1/Test2/Util/Facets2Legacy.pm"
    }
    , {
	"start":11851802,"audio":0,"end":11856299,"filename":"/opt/perl/lib/5.28.1/Test2/Util/HashBase.pm"
    }
    , {
	"start":11856299,"audio":0,"end":11856440,"filename":"/opt/perl/lib/5.28.1/Test2/Util/Trace.pm"
    }
    , {
	"start":11856440,"audio":0,"end":11857796,"filename":"/opt/perl/lib/5.28.1/Test2/Util/ExternalMeta.pm"
    }
    , {
	"start":11857796,"audio":0,"end":11858177,"filename":"/opt/perl/lib/5.28.1/Test2/EventFacet/Parent.pm"
    }
    , {
	"start":11858177,"audio":0,"end":11859104,"filename":"/opt/perl/lib/5.28.1/Test2/EventFacet/Meta.pm"
    }
    , {
	"start":11859104,"audio":0,"end":11859347,"filename":"/opt/perl/lib/5.28.1/Test2/EventFacet/Amnesty.pm"
    }
    , {
	"start":11859347,"audio":0,"end":11859592,"filename":"/opt/perl/lib/5.28.1/Test2/EventFacet/Info.pm"
    }
    , {
	"start":11859592,"audio":0,"end":11859823,"filename":"/opt/perl/lib/5.28.1/Test2/EventFacet/Assert.pm"
    }
    , {
	"start":11859823,"audio":0,"end":11860067,"filename":"/opt/perl/lib/5.28.1/Test2/EventFacet/Render.pm"
    }
    , {
	"start":11860067,"audio":0,"end":11860330,"filename":"/opt/perl/lib/5.28.1/Test2/EventFacet/Error.pm"
    }
    , {
	"start":11860330,"audio":0,"end":11862100,"filename":"/opt/perl/lib/5.28.1/Test2/EventFacet/Trace.pm"
    }
    , {
	"start":11862100,"audio":0,"end":11862390,"filename":"/opt/perl/lib/5.28.1/Test2/EventFacet/Hub.pm"
    }
    , {
	"start":11862390,"audio":0,"end":11862647,"filename":"/opt/perl/lib/5.28.1/Test2/EventFacet/Control.pm"
    }
    , {
	"start":11862647,"audio":0,"end":11862880,"filename":"/opt/perl/lib/5.28.1/Test2/EventFacet/About.pm"
    }
    , {
	"start":11862880,"audio":0,"end":11863104,"filename":"/opt/perl/lib/5.28.1/Test2/EventFacet/Plan.pm"
    }
    , {
	"start":11863104,"audio":0,"end":11863594,"filename":"/opt/perl/lib/5.28.1/Test2/Event/Waiting.pm"
    }
    , {
	"start":11863594,"audio":0,"end":11865280,"filename":"/opt/perl/lib/5.28.1/Test2/Event/V2.pm"
    }
    , {
	"start":11865280,"audio":0,"end":11865988,"filename":"/opt/perl/lib/5.28.1/Test2/Event/Bail.pm"
    }
    , {
	"start":11865988,"audio":0,"end":11867578,"filename":"/opt/perl/lib/5.28.1/Test2/Event/Ok.pm"
    }
    , {
	"start":11867578,"audio":0,"end":11869740,"filename":"/opt/perl/lib/5.28.1/Test2/Event/Subtest.pm"
    }
    , {
	"start":11869740,"audio":0,"end":11870423,"filename":"/opt/perl/lib/5.28.1/Test2/Event/Exception.pm"
    }
    , {
	"start":11870423,"audio":0,"end":11871508,"filename":"/opt/perl/lib/5.28.1/Test2/Event/Pass.pm"
    }
    , {
	"start":11871508,"audio":0,"end":11872679,"filename":"/opt/perl/lib/5.28.1/Test2/Event/Fail.pm"
    }
    , {
	"start":11872679,"audio":0,"end":11875328,"filename":"/opt/perl/lib/5.28.1/Test2/Event/Generic.pm"
    }
    , {
	"start":11875328,"audio":0,"end":11875912,"filename":"/opt/perl/lib/5.28.1/Test2/Event/Diag.pm"
    }
    , {
	"start":11875912,"audio":0,"end":11876473,"filename":"/opt/perl/lib/5.28.1/Test2/Event/Note.pm"
    }
    , {
	"start":11876473,"audio":0,"end":11877332,"filename":"/opt/perl/lib/5.28.1/Test2/Event/Skip.pm"
    }
    , {
	"start":11877332,"audio":0,"end":11877926,"filename":"/opt/perl/lib/5.28.1/Test2/Event/Encoding.pm"
    }
    , {
	"start":11877926,"audio":0,"end":11880089,"filename":"/opt/perl/lib/5.28.1/Test2/Event/Plan.pm"
    }
    , {
	"start":11880089,"audio":0,"end":11880749,"filename":"/opt/perl/lib/5.28.1/Test2/Event/TAP/Version.pm"
    }
    , {
	"start":11880749,"audio":0,"end":11898155,"filename":"/opt/perl/lib/5.28.1/Test2/API/Instance.pm"
    }
    , {
	"start":11898155,"audio":0,"end":11901068,"filename":"/opt/perl/lib/5.28.1/Test2/API/Breakage.pm"
    }
    , {
	"start":11901068,"audio":0,"end":11912438,"filename":"/opt/perl/lib/5.28.1/Test2/API/Context.pm"
    }
    , {
	"start":11912438,"audio":0,"end":11914244,"filename":"/opt/perl/lib/5.28.1/Test2/API/Stack.pm"
    }
    , {
	"start":11914244,"audio":0,"end":11932642,"filename":"/opt/perl/lib/5.28.1/Test/More.pm"
    }
    , {
	"start":11932642,"audio":0,"end":11934595,"filename":"/opt/perl/lib/5.28.1/Test/Future.pm"
    }
    , {
	"start":11934595,"audio":0,"end":11977260,"filename":"/opt/perl/lib/5.28.1/Test/Builder.pm"
    }
    , {
	"start":11977260,"audio":0,"end":11977572,"filename":"/opt/perl/lib/5.28.1/Test/Simple.pm"
    }
    , {
	"start":11977572,"audio":0,"end":11987505,"filename":"/opt/perl/lib/5.28.1/Test/Harness.pm"
    }
    , {
	"start":11987505,"audio":0,"end":11993332,"filename":"/opt/perl/lib/5.28.1/Test/Tester.pm"
    }
    , {
	"start":11993332,"audio":0,"end":11993405,"filename":"/opt/perl/lib/5.28.1/Test/use/ok.pm"
    }
    , {
	"start":11993405,"audio":0,"end":11994169,"filename":"/opt/perl/lib/5.28.1/Test/Future/Deferred.pm"
    }
    , {
	"start":11994169,"audio":0,"end":11995357,"filename":"/opt/perl/lib/5.28.1/Test/Builder/Module.pm"
    }
    , {
	"start":11995357,"audio":0,"end":11995691,"filename":"/opt/perl/lib/5.28.1/Test/Builder/TodoDiag.pm"
    }
    , {
	"start":11995691,"audio":0,"end":12005476,"filename":"/opt/perl/lib/5.28.1/Test/Builder/Tester.pm"
    }
    , {
	"start":12005476,"audio":0,"end":12006711,"filename":"/opt/perl/lib/5.28.1/Test/Builder/Formatter.pm"
    }
    , {
	"start":12006711,"audio":0,"end":12014269,"filename":"/opt/perl/lib/5.28.1/Test/Builder/IO/Scalar.pm"
    }
    , {
	"start":12014269,"audio":0,"end":12014439,"filename":"/opt/perl/lib/5.28.1/Test/Builder/Tester/Color.pm"
    }
    , {
	"start":12014439,"audio":0,"end":12018356,"filename":"/opt/perl/lib/5.28.1/Test/Tester/Capture.pm"
    }
    , {
	"start":12018356,"audio":0,"end":12018927,"filename":"/opt/perl/lib/5.28.1/Test/Tester/Delegate.pm"
    }
    , {
	"start":12018927,"audio":0,"end":12019846,"filename":"/opt/perl/lib/5.28.1/Test/Tester/CaptureRunner.pm"
    }
    , {
	"start":12019846,"audio":0,"end":12020972,"filename":"/opt/perl/lib/5.28.1/Digest/base.pm"
    }
    , {
	"start":12020972,"audio":0,"end":12021691,"filename":"/opt/perl/lib/5.28.1/Digest/file.pm"
    }
],"remote_package_size":12021691,"package_uuid":"d4d5d231-aa17-434a-ac1f-dd0d6af95261"
}
)
}
)();
"use strict";
var my_UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;
function my_UTF8ArrayToString(ptr,len) {
    var endPtr=ptr+len;
    if(len>16&&HEAPU8.subarray&&my_UTF8Decoder) {
	return my_UTF8Decoder.decode(HEAPU8.subarray(ptr,endPtr))
    }
    else {
	var u0,u1,u2,u3,u4,u5;
	var str="";
	while(ptr<endPtr) {
	    u0=HEAPU8[ptr++];
	    if(!(u0&128)) {
		str+=String.fromCharCode(u0);
		continue
	    }
	    u1=HEAPU8[ptr++]&63;
	    if((u0&224)==192) {
		str+=String.fromCharCode((u0&31)<<6|u1);
		continue
	    }
	    u2=HEAPU8[ptr++]&63;
	    if((u0&240)==224) {
		u0=(u0&15)<<12|u1<<6|u2
	    }
	    else {
		u3=HEAPU8[ptr++]&63;
		if((u0&248)==240) {
		    u0=(u0&7)<<18|u1<<12|u2<<6|u3
		}
		else {
		    u4=HEAPU8[ptr++]&63;
		    if((u0&252)==248) {
			u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4
		    }
		    else {
			u5=HEAPU8[ptr++]&63;
			u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5
		    }

		}

	    }
	    if(u0<65536) {
		str+=String.fromCharCode(u0)
	    }
	    else {
		var ch=u0-65536;
		str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)
	    }

	}
	return str
    }

}
var moduleOverrides= {

}
;
var key;
for(key in Module) {
    if(Module.hasOwnProperty(key)) {
	moduleOverrides[key]=Module[key]
    }

}
Module["arguments"]=[];
Module["thisProgram"]="./this.program";
Module["quit"]=function(status,toThrow) {
    throw toThrow
}
;
Module["preRun"]=[];
Module["postRun"]=[];
var ENVIRONMENT_IS_WEB=false;
var ENVIRONMENT_IS_WORKER=false;
var ENVIRONMENT_IS_NODE=false;
var ENVIRONMENT_IS_SHELL=false;
ENVIRONMENT_IS_WEB=typeof window==="object";
ENVIRONMENT_IS_WORKER=typeof importScripts==="function";
ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof require==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;
ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;
var scriptDirectory="";
function locateFile(path) {
    if(Module["locateFile"]) {
	return Module["locateFile"](path,scriptDirectory)
    }
    else {
	return scriptDirectory+path
    }

}
if(ENVIRONMENT_IS_NODE) {
    scriptDirectory=__dirname+"/";
    var nodeFS;
    var nodePath;
    Module["read"]=function shell_read(filename,binary) {
	var ret;
	if(!nodeFS)nodeFS=require("fs");
	if(!nodePath)nodePath=require("path");
	filename=nodePath["normalize"](filename);
	ret=nodeFS["readFileSync"](filename);
	return binary?ret:ret.toString()
    }
    ;
    Module["readBinary"]=function readBinary(filename) {
	var ret=Module["read"](filename,true);
	if(!ret.buffer) {
	    ret=new Uint8Array(ret)
	}
	assert(ret.buffer);
	return ret
    }
    ;
    if(process["argv"].length>1) {
	Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")
    }
    Module["arguments"]=process["argv"].slice(2);
    if(typeof module!=="undefined") {
	module["exports"]=Module
    }
    process["on"]("uncaughtException",function(ex) {
	if(!(ex instanceof ExitStatus)) {
	    throw ex
	}

    }
    );
    process["on"]("unhandledRejection",abort);
    Module["quit"]=function(status) {
	process["exit"](status)
    }
    ;
    Module["inspect"]=function() {
	return"[Emscripten Module object]"
    }

}
else if(ENVIRONMENT_IS_SHELL) {
    if(typeof read!="undefined") {
	Module["read"]=function shell_read(f) {
	    return read(f)
	}

    }
    Module["readBinary"]=function readBinary(f) {
	var data;
	if(typeof readbuffer==="function") {
	    return new Uint8Array(readbuffer(f))
	}
	data=read(f,"binary");
	assert(typeof data==="object");
	return data
    }
    ;
    if(typeof scriptArgs!="undefined") {
	Module["arguments"]=scriptArgs
    }
    else if(typeof arguments!="undefined") {
	Module["arguments"]=arguments
    }
    if(typeof quit==="function") {
	Module["quit"]=function(status) {
	    quit(status)
	}

    }

}
else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER) {
    if(ENVIRONMENT_IS_WORKER) {
	scriptDirectory=self.location.href
    }
    else if(document.currentScript) {
	scriptDirectory=document.currentScript.src
    }
    if(scriptDirectory.indexOf("blob:")!==0) {
	scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1)
    }
    else {
	scriptDirectory=""
    }
    Module["read"]=function shell_read(url) {
	var xhr=new XMLHttpRequest;
	xhr.open("GET",url,false);
	xhr.send(null);
	return xhr.responseText
    }
    ;
    if(ENVIRONMENT_IS_WORKER) {
	Module["readBinary"]=function readBinary(url) {
	    var xhr=new XMLHttpRequest;
	    xhr.open("GET",url,false);
	    xhr.responseType="arraybuffer";
	    xhr.send(null);
	    return new Uint8Array(xhr.response)
	}

    }
    Module["readAsync"]=function readAsync(url,onload,onerror) {
	var xhr=new XMLHttpRequest;
	xhr.open("GET",url,true);
	xhr.responseType="arraybuffer";
	xhr.onload=function xhr_onload() {
	    if(xhr.status==200||xhr.status==0&&xhr.response) {
		onload(xhr.response);
		return
	    }
	    onerror()
	}
	;
	xhr.onerror=onerror;
	xhr.send(null)
    }
    ;
    Module["setWindowTitle"]=function(title) {
	document.title=title
    }

}
else {

}
var out=Module["print"]||(typeof console!=="undefined"?console.log.bind(console):typeof print!=="undefined"?print:null);
var err=Module["printErr"]||(typeof printErr!=="undefined"?printErr:typeof console!=="undefined"&&console.warn.bind(console)||out);
for(key in moduleOverrides) {
    if(moduleOverrides.hasOwnProperty(key)) {
	Module[key]=moduleOverrides[key]
    }

}
moduleOverrides=undefined;
var STACK_ALIGN=16;
function dynamicAlloc(size) {
    var ret=HEAP32[DYNAMICTOP_PTR>>2];
    var end=ret+size+15&-16;
    if(end<=_emscripten_get_heap_size()) {
	HEAP32[DYNAMICTOP_PTR>>2]=end
    }
    else {
	var success=_emscripten_resize_heap(end);
	if(!success)return 0
    }
    return ret
}
function getNativeTypeSize(type) {
    switch(type) {
	case"i1":case"i8":return 1;
	case"i16":return 2;
	case"i32":return 4;
	case"i64":return 8;
	case"float":return 4;
	case"double":return 8;
	default: {
	    if(type[type.length-1]==="*") {
		return 4
	    }
	    else if(type[0]==="i") {
		var bits=parseInt(type.substr(1));
		assert(bits%8===0,"getNativeTypeSize invalid bits "+bits+", type "+type);
		return bits/8
	    }
	    else {
		return 0
	    }

	}

    }

}
function warnOnce(text) {
    if(!warnOnce.shown)warnOnce.shown= {

    }
    ;
    if(!warnOnce.shown[text]) {
	warnOnce.shown[text]=1;
	err(text)
    }

}
var asm2wasmImports= {
    "f64-rem":function(x,y) {
	return x%y
    }
    ,"debugger":function() {
	debugger
    }

}
;
var jsCallStartIndex=1;
var functionPointers=new Array(0);
var funcWrappers= {

}
;
function dynCall(sig,ptr,args) {
    if(args&&args.length) {
	return Module["dynCall_"+sig].apply(null,[ptr].concat(args))
    }
    else {
	return Module["dynCall_"+sig].call(null,ptr)
    }

}
var tempRet0=0;
var setTempRet0=function(value) {
    tempRet0=value
}
;
var getTempRet0=function() {
    return tempRet0
}
;
if(typeof WebAssembly!=="object") {
    err("no native wasm support detected")
}
var wasmMemory;
var wasmTable;
var ABORT=false;
var EXITSTATUS=0;
function assert(condition,text) {
    if(!condition) {
	abort("Assertion failed: "+text)
    }

}
function getCFunc(ident) {
    var func=Module["_"+ident];
    assert(func,"Cannot call unknown function "+ident+", make sure it is exported");
    return func
}
function ccall(ident,returnType,argTypes,args,opts) {
    var toC= {
	"string":function(str) {
	    var ret=0;
	    if(str!==null&&str!==undefined&&str!==0) {
		var len=(str.length<<2)+1;
		ret=stackAlloc(len);
		stringToUTF8(str,ret,len)
	    }
	    return ret
	}
	,"array":function(arr) {
	    var ret=stackAlloc(arr.length);
	    writeArrayToMemory(arr,ret);
	    return ret
	}

    }
    ;
    function convertReturnValue(ret) {
	if(returnType==="string")return UTF8ToString(ret);
	if(returnType==="boolean")return Boolean(ret);
	return ret
    }
    var func=getCFunc(ident);
    var cArgs=[];
    var stack=0;
    if(args) {
	for(var i=0;
	    i<args.length;
	    i++) {
		var converter=toC[argTypes[i]];
		if(converter) {
		    if(stack===0)stack=stackSave();
		    cArgs[i]=converter(args[i])
		}
		else {
		    cArgs[i]=args[i]
		}

	    }

    }
    var ret=func.apply(null,cArgs);
    ret=convertReturnValue(ret);
    if(stack!==0)stackRestore(stack);
    return ret
}
function cwrap(ident,returnType,argTypes,opts) {
    argTypes=argTypes||[];
    var numericArgs=argTypes.every(function(type) {
	return type==="number"
    }
    );
    var numericRet=returnType!=="string";
    if(numericRet&&numericArgs&&!opts) {
	return getCFunc(ident)
    }
    return function() {
	return ccall(ident,returnType,argTypes,arguments,opts)
    }

}
function setValue(ptr,value,type,noSafe) {
    type=type||"i8";
    if(type.charAt(type.length-1)==="*")type="i32";
    switch(type) {
	case"i1":HEAP8[ptr>>0]=value;
	    break;
	case"i8":HEAP8[ptr>>0]=value;
	    break;
	case"i16":HEAP16[ptr>>1]=value;
	    break;
	case"i32":HEAP32[ptr>>2]=value;
	    break;
	case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=1?tempDouble>0?(Math_min(+Math_floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];
	    break;
	case"float":HEAPF32[ptr>>2]=value;
	    break;
	case"double":HEAPF64[ptr>>3]=value;
	    break;
	default:abort("invalid type for setValue: "+type)
    }

}
var ALLOC_NORMAL=0;
var ALLOC_NONE=3;
function allocate(slab,types,allocator,ptr) {
    var zeroinit,size;
    if(typeof slab==="number") {
	zeroinit=true;
	size=slab
    }
    else {
	zeroinit=false;
	size=slab.length
    }
    var singleType=typeof types==="string"?types:null;
    var ret;
    if(allocator==ALLOC_NONE) {
	ret=ptr
    }
    else {
	ret=[_malloc,stackAlloc,dynamicAlloc][allocator](Math.max(size,singleType?1:types.length))
    }
    if(zeroinit) {
	var stop;
	ptr=ret;
	assert((ret&3)==0);
	stop=ret+(size&~3);
	for(;
	    ptr<stop;
	    ptr+=4) {
		HEAP32[ptr>>2]=0
	    }
	stop=ret+size;
	while(ptr<stop) {
	    HEAP8[ptr++>>0]=0
	}
	return ret
    }
    if(singleType==="i8") {
	if(slab.subarray||slab.slice) {
	    HEAPU8.set(slab,ret)
	}
	else {
	    HEAPU8.set(new Uint8Array(slab),ret)
	}
	return ret
    }
    var i=0,type,typeSize,previousType;
    while(i<size) {
	var curr=slab[i];
	type=singleType||types[i];
	if(type===0) {
	    i++;
	    continue
	}
	if(type=="i64")type="i32";
	setValue(ret+i,curr,type);
	if(previousType!==type) {
	    typeSize=getNativeTypeSize(type);
	    previousType=type
	}
	i+=typeSize
    }
    return ret
}
function getMemory(size) {
    if(!runtimeInitialized)return dynamicAlloc(size);
    return _malloc(size)
}
var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;
function UTF8ArrayToString(u8Array,idx,maxBytesToRead) {
    var endIdx=idx+maxBytesToRead;
    var endPtr=idx;
    while(u8Array[endPtr]&&!(endPtr>=endIdx))++endPtr;
    if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder) {
	return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))
    }
    else {
	var str="";
	while(idx<endPtr) {
	    var u0=u8Array[idx++];
	    if(!(u0&128)) {
		str+=String.fromCharCode(u0);
		continue
	    }
	    var u1=u8Array[idx++]&63;
	    if((u0&224)==192) {
		str+=String.fromCharCode((u0&31)<<6|u1);
		continue
	    }
	    var u2=u8Array[idx++]&63;
	    if((u0&240)==224) {
		u0=(u0&15)<<12|u1<<6|u2
	    }
	    else {
		u0=(u0&7)<<18|u1<<12|u2<<6|u8Array[idx++]&63
	    }
	    if(u0<65536) {
		str+=String.fromCharCode(u0)
	    }
	    else {
		var ch=u0-65536;
		str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)
	    }

	}

    }
    return str
}
function UTF8ToString(ptr,maxBytesToRead) {
    return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""
}
function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite) {
    if(!(maxBytesToWrite>0))return 0;
    var startIdx=outIdx;
    var endIdx=outIdx+maxBytesToWrite-1;
    for(var i=0;
	i<str.length;
	++i) {
	    var u=str.charCodeAt(i);
	    if(u>=55296&&u<=57343) {
		var u1=str.charCodeAt(++i);
		u=65536+((u&1023)<<10)|u1&1023
	    }
	    if(u<=127) {
		if(outIdx>=endIdx)break;
		outU8Array[outIdx++]=u
	    }
	    else if(u<=2047) {
		if(outIdx+1>=endIdx)break;
		outU8Array[outIdx++]=192|u>>6;
		outU8Array[outIdx++]=128|u&63
	    }
	    else if(u<=65535) {
		if(outIdx+2>=endIdx)break;
		outU8Array[outIdx++]=224|u>>12;
		outU8Array[outIdx++]=128|u>>6&63;
		outU8Array[outIdx++]=128|u&63
	    }
	    else {
		if(outIdx+3>=endIdx)break;
		outU8Array[outIdx++]=240|u>>18;
		outU8Array[outIdx++]=128|u>>12&63;
		outU8Array[outIdx++]=128|u>>6&63;
		outU8Array[outIdx++]=128|u&63
	    }

	}
    outU8Array[outIdx]=0;
    return outIdx-startIdx
}
function stringToUTF8(str,outPtr,maxBytesToWrite) {
    return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)
}
function lengthBytesUTF8(str) {
    var len=0;
    for(var i=0;
	i<str.length;
	++i) {
	    var u=str.charCodeAt(i);
	    if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;
	    if(u<=127)++len;
	    else if(u<=2047)len+=2;
	    else if(u<=65535)len+=3;
	    else len+=4
	}
    return len
}
var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;
function allocateUTF8(str) {
    var size=lengthBytesUTF8(str)+1;
    var ret=_malloc(size);
    if(ret)stringToUTF8Array(str,HEAP8,ret,size);
    return ret
}
function allocateUTF8OnStack(str) {
    var size=lengthBytesUTF8(str)+1;
    var ret=stackAlloc(size);
    stringToUTF8Array(str,HEAP8,ret,size);
    return ret
}
function writeArrayToMemory(array,buffer) {
    HEAP8.set(array,buffer)
}
function writeAsciiToMemory(str,buffer,dontAddNull) {
    for(var i=0;
	i<str.length;
	++i) {
	    HEAP8[buffer++>>0]=str.charCodeAt(i)
	}
    if(!dontAddNull)HEAP8[buffer>>0]=0
}
function demangle(func) {
    return func
}
function demangleAll(text) {
    var regex=/__Z[\w\d_]+/g;
    return text.replace(regex,function(x) {
	var y=demangle(x);
	return x===y?x:y+" ["+x+"]"
    }
    )
}
function jsStackTrace() {
    var err=new Error;
    if(!err.stack) {
	try {
	    throw new Error(0)
	}
	catch(e) {
	    err=e
	}
	if(!err.stack) {
	    return"(no stack trace available)"
	}

    }
    return err.stack.toString()
}
function stackTrace() {
    var js=jsStackTrace();
    if(Module["extraStackTrace"])js+="\n"+Module["extraStackTrace"]();
    return demangleAll(js)
}
var PAGE_SIZE=16384;
var WASM_PAGE_SIZE=65536;
function alignUp(x,multiple) {
    if(x%multiple>0) {
	x+=multiple-x%multiple
    }
    return x
}
var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;
function updateGlobalBuffer(buf) {
    Module["buffer"]=buffer=buf
}
function updateGlobalBufferViews() {
    Module["HEAP8"]=HEAP8=new Int8Array(buffer);
    Module["HEAP16"]=HEAP16=new Int16Array(buffer);
    Module["HEAP32"]=HEAP32=new Int32Array(buffer);
    Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);
    Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);
    Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);
    Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);
    Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)
}
var STACK_BASE=1278416,DYNAMIC_BASE=6521296,DYNAMICTOP_PTR=1278160;
var TOTAL_STACK=5242880;
var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||16777216;
if(TOTAL_MEMORY<TOTAL_STACK)err("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");
if(Module["buffer"]) {
    buffer=Module["buffer"]
}
else {
    if(typeof WebAssembly==="object"&&typeof WebAssembly.Memory==="function") {
	wasmMemory=new WebAssembly.Memory( {
	    "initial":TOTAL_MEMORY/WASM_PAGE_SIZE
	}
	);
	buffer=wasmMemory.buffer
    }
    else {
	buffer=new ArrayBuffer(TOTAL_MEMORY)
    }
    Module["buffer"]=buffer
}
updateGlobalBufferViews();
HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;
function callRuntimeCallbacks(callbacks) {
    while(callbacks.length>0) {
	var callback=callbacks.shift();
	if(typeof callback=="function") {
	    callback();
	    continue
	}
	var func=callback.func;
	if(typeof func==="number") {
	    if(callback.arg===undefined) {
		Module["dynCall_v"](func)
	    }
	    else {
		Module["dynCall_vi"](func,callback.arg)
	    }

	}
	else {
	    func(callback.arg===undefined?null:callback.arg)
	}

    }

}
var __ATPRERUN__=[];
var __ATINIT__=[];
var __ATMAIN__=[];
var __ATPOSTRUN__=[];
var runtimeInitialized=false;
var runtimeExited=false;
function preRun() {
    if(Module["preRun"]) {
	if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];
	while(Module["preRun"].length) {
	    addOnPreRun(Module["preRun"].shift())
	}

    }
    callRuntimeCallbacks(__ATPRERUN__)
}
function ensureInitRuntime() {
    if(runtimeInitialized)return;
    runtimeInitialized=true;
    if(!Module["noFSInit"]&&!FS.init.initialized)FS.init();
    TTY.init();
    SOCKFS.root=FS.mount(SOCKFS, {

    }
	,null);
    PIPEFS.root=FS.mount(PIPEFS, {

    }
	,null);
    callRuntimeCallbacks(__ATINIT__)
}
function preMain() {
    FS.ignorePermissions=false;
    callRuntimeCallbacks(__ATMAIN__)
}
function exitRuntime() {
    runtimeExited=true
}
function postRun() {
    if(Module["postRun"]) {
	if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];
	while(Module["postRun"].length) {
	    addOnPostRun(Module["postRun"].shift())
	}

    }
    callRuntimeCallbacks(__ATPOSTRUN__)
}
function addOnPreRun(cb) {
    __ATPRERUN__.unshift(cb)
}
function addOnPostRun(cb) {
    __ATPOSTRUN__.unshift(cb)
}
var Math_abs=Math.abs;
var Math_ceil=Math.ceil;
var Math_floor=Math.floor;
var Math_min=Math.min;
var Math_trunc=Math.trunc;
var runDependencies=0;
var runDependencyWatcher=null;
var dependenciesFulfilled=null;
function getUniqueRunDependency(id) {
    return id
}
function addRunDependency(id) {
    runDependencies++;
    if(Module["monitorRunDependencies"]) {
	Module["monitorRunDependencies"](runDependencies)
    }

}
function removeRunDependency(id) {
    runDependencies--;
    if(Module["monitorRunDependencies"]) {
	Module["monitorRunDependencies"](runDependencies)
    }
    if(runDependencies==0) {
	if(runDependencyWatcher!==null) {
	    clearInterval(runDependencyWatcher);
	    runDependencyWatcher=null
	}
	if(dependenciesFulfilled) {
	    var callback=dependenciesFulfilled;
	    dependenciesFulfilled=null;
	    callback()
	}

    }

}
Module["preloadedImages"]= {

}
;
Module["preloadedAudios"]= {

}
;
var dataURIPrefix="data:application/octet-stream;base64,";
function isDataURI(filename) {
    return String.prototype.startsWith?filename.startsWith(dataURIPrefix):filename.indexOf(dataURIPrefix)===0
}
var wasmBinaryFile="emperl.wasm";
if(!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile=locateFile(wasmBinaryFile)
}
function getBinary() {
    try {
	if(Module["wasmBinary"]) {
	    return new Uint8Array(Module["wasmBinary"])
	}
	if(Module["readBinary"]) {
	    return Module["readBinary"](wasmBinaryFile)
	}
	else {
	    throw"both async and sync fetching of the wasm failed"
	}

    }
    catch(err) {
	abort(err)
    }

}
function getBinaryPromise() {
    if(!Module["wasmBinary"]&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==="function") {
	return fetch(wasmBinaryFile, {
	    credentials:"same-origin"
	}
	).then(function(response) {
	    if(!response["ok"]) {
		throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"
	    }
	    return response["arrayBuffer"]()
	}
	).catch(function() {
	    return getBinary()
	}
	)
    }
    return new Promise(function(resolve,reject) {
	resolve(getBinary())
    }
    )
}
function createWasm(env) {
    var info= {
	"env":env,"global": {
	    "NaN":NaN,Infinity:Infinity
	}
	,"global.Math":Math,"asm2wasm":asm2wasmImports
    }
    ;
    function receiveInstance(instance,module) {
	var exports=instance.exports;
	Module["asm"]=exports;
	removeRunDependency("wasm-instantiate")
    }
    addRunDependency("wasm-instantiate");
    if(Module["instantiateWasm"]) {
	try {
	    return Module["instantiateWasm"](info,receiveInstance)
	}
	catch(e) {
	    err("Module.instantiateWasm callback failed with error: "+e);
	    return false
	}

    }
    function receiveInstantiatedSource(output) {
	receiveInstance(output["instance"])
    }
    function instantiateArrayBuffer(receiver) {
	getBinaryPromise().then(function(binary) {
	    return WebAssembly.instantiate(binary,info)
	}
	).then(receiver,function(reason) {
	    err("failed to asynchronously prepare wasm: "+reason);
	    abort(reason)
	}
	)
    }
    if(!Module["wasmBinary"]&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&typeof fetch==="function") {
	WebAssembly.instantiateStreaming(fetch(wasmBinaryFile, {
	    credentials:"same-origin"
	}
	),info).then(receiveInstantiatedSource,function(reason) {
	    err("wasm streaming compile failed: "+reason);
	    err("falling back to ArrayBuffer instantiation");
	    instantiateArrayBuffer(receiveInstantiatedSource)
	}
	)
    }
    else {
	instantiateArrayBuffer(receiveInstantiatedSource)
    }
    return {

    }

}
Module["asm"]=function(global,env,providedBuffer) {
    env["memory"]=wasmMemory;
    env["table"]=wasmTable=new WebAssembly.Table( {
	"initial":2142,"maximum":2142,"element":"anyfunc"
    }
    );
    env["__memory_base"]=1024;
    env["__table_base"]=0;
    var exports=createWasm(env);
    return exports
}
;
function _js_eval_js(codestr,ilen,wantrv,olen) {
    var out="";
    try {
	var code=my_UTF8ArrayToString(codestr,ilen);
	if(Perl.trace)console.debug("Perl: eval",code,"- wantrv",wantrv);
	var rv=eval(code);
	if(wantrv==0)rv=undefined;
	switch(typeof rv) {
	    case"undefined":out="U";
		break;
	    case"boolean":out=(rv?"1":"0")+"B";
		break;
	    case"number":out=String(rv)+"N";
		break;
	    case"string":out=rv+"S";
		break;
	    case"function":out=Perl.glue(rv)+"F";
		break;
	    case"object":if(rv==null)out="U";
		else if(Array.isArray(rv))out=Perl.glue(rv)+"A";
		else out=Perl.glue(rv)+"O";
		break;
	    default:console.warn("js_get_js: unsupported return type",rv);
		out=typeof rv+"X";
		break
	}

    }
    catch(ex) {
	out=ex+"E"
    }
    if(Perl.trace)console.debug("Perl: returning",out);
    var lengthBytes=lengthBytesUTF8(out);
    HEAP32[olen>>2]=lengthBytes;
    var stringOnWasmHeap=_malloc(lengthBytes+1);
    stringToUTF8(out,stringOnWasmHeap,lengthBytes+1);
    return stringOnWasmHeap
}
__ATINIT__.push( {
    func:function() {
	___emscripten_environ_constructor()
    }

}
);
var tempDoublePtr=1278400;
function ___assert_fail(condition,filename,line,func) {
    abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])
}
var ENV= {

}
;
function ___buildEnvironment(environ) {
    var MAX_ENV_VALUES=64;
    var TOTAL_ENV_SIZE=1024;
    var poolPtr;
    var envPtr;
    if(!___buildEnvironment.called) {
	___buildEnvironment.called=true;
	ENV["USER"]=ENV["LOGNAME"]="web_user";
	ENV["PATH"]="/";
	ENV["PWD"]="/";
	ENV["HOME"]="/home/web_user";
	ENV["LANG"]="C.UTF-8";
	ENV["_"]=Module["thisProgram"];
	poolPtr=getMemory(TOTAL_ENV_SIZE);
	envPtr=getMemory(MAX_ENV_VALUES*4);
	HEAP32[envPtr>>2]=poolPtr;
	HEAP32[environ>>2]=envPtr
    }
    else {
	envPtr=HEAP32[environ>>2];
	poolPtr=HEAP32[envPtr>>2]
    }
    var strings=[];
    var totalSize=0;
    for(var key in ENV) {
	if(typeof ENV[key]==="string") {
	    var line=key+"="+ENV[key];
	    strings.push(line);
	    totalSize+=line.length
	}

    }
    if(totalSize>TOTAL_ENV_SIZE) {
	throw new Error("Environment size exceeded TOTAL_ENV_SIZE!")
    }
    var ptrSize=4;
    for(var i=0;
	i<strings.length;
	i++) {
	    var line=strings[i];
	    writeAsciiToMemory(line,poolPtr);
	    HEAP32[envPtr+i*ptrSize>>2]=poolPtr;
	    poolPtr+=line.length+1
	}
    HEAP32[envPtr+strings.length*ptrSize>>2]=0
}
function _emscripten_get_now() {
    abort()
}
function _emscripten_get_now_is_monotonic() {
    return 0||ENVIRONMENT_IS_NODE||typeof dateNow!=="undefined"||(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&self["performance"]&&self["performance"]["now"]
}
function ___setErrNo(value) {
    if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;
    return value
}
function _clock_gettime(clk_id,tp) {
    var now;
    if(clk_id===0) {
	now=Date.now()
    }
    else if(clk_id===1&&_emscripten_get_now_is_monotonic()) {
	now=_emscripten_get_now()
    }
    else {
	___setErrNo(22);
	return-1
    }
    HEAP32[tp>>2]=now/1e3|0;
    HEAP32[tp+4>>2]=now%1e3*1e3*1e3|0;
    return 0
}
function ___clock_gettime(a0,a1) {
    return _clock_gettime(a0,a1)
}
function ___lock() {

}
function ___map_file(pathname,size) {
    ___setErrNo(1);
    return-1
}
var PATH= {
    splitPath:function(filename) {
	var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
		    return splitPathRe.exec(filename).slice(1)
		}
	    ,normalizeArray:function(parts,allowAboveRoot) {
		var up=0;
		for(var i=parts.length-1;
		    i>=0;
		    i--) {
			var last=parts[i];
			if(last===".") {
			    parts.splice(i,1)
			}
			else if(last==="..") {
			    parts.splice(i,1);
			    up++
			}
			else if(up) {
			    parts.splice(i,1);
			    up--
			}

		    }
		if(allowAboveRoot) {
		    for(;
			up;
			up--) {
			    parts.unshift("..")
			}

		}
		return parts
	    }
	    ,normalize:function(path) {
		var isAbsolute=path.charAt(0)==="/",trailingSlash=path.substr(-1)==="/";
		path=PATH.normalizeArray(path.split("/").filter(function(p) {
		    return!!p
		}
		),!isAbsolute).join("/");
		if(!path&&!isAbsolute) {
		    path="."
		}
		if(path&&trailingSlash) {
		    path+="/"
		}
		return(isAbsolute?"/":"")+path
	    }
	    ,dirname:function(path) {
		var result=PATH.splitPath(path),root=result[0],dir=result[1];
		if(!root&&!dir) {
		    return"."
		}
		if(dir) {
		    dir=dir.substr(0,dir.length-1)
		}
		return root+dir
	    }
	    ,basename:function(path) {
		if(path==="/")return"/";
		var lastSlash=path.lastIndexOf("/");
		if(lastSlash===-1)return path;
		return path.substr(lastSlash+1)
	    }
	    ,extname:function(path) {
		return PATH.splitPath(path)[3]
	    }
	    ,join:function() {
		var paths=Array.prototype.slice.call(arguments,0);
		return PATH.normalize(paths.join("/"))
	    }
	    ,join2:function(l,r) {
		return PATH.normalize(l+"/"+r)
	    }
	    ,resolve:function() {
		var resolvedPath="",resolvedAbsolute=false;
		for(var i=arguments.length-1;
		    i>=-1&&!resolvedAbsolute;
		    i--) {
			var path=i>=0?arguments[i]:FS.cwd();
			if(typeof path!=="string") {
			    throw new TypeError("Arguments to path.resolve must be strings")
			}
			else if(!path) {
			    return""
			}
			resolvedPath=path+"/"+resolvedPath;
			resolvedAbsolute=path.charAt(0)==="/"
		    }
		resolvedPath=PATH.normalizeArray(resolvedPath.split("/").filter(function(p) {
		    return!!p
		}
		),!resolvedAbsolute).join("/");
		return(resolvedAbsolute?"/":"")+resolvedPath||"."
	    }
	    ,relative:function(from,to) {
		from=PATH.resolve(from).substr(1);
		to=PATH.resolve(to).substr(1);
		function trim(arr) {
		    var start=0;
		    for(;
			start<arr.length;
			start++) {
			    if(arr[start]!=="")break
			}
		    var end=arr.length-1;
		    for(;
			end>=0;
			end--) {
			    if(arr[end]!=="")break
			}
		    if(start>end)return[];
		    return arr.slice(start,end-start+1)
		}
		var fromParts=trim(from.split("/"));
		var toParts=trim(to.split("/"));
		var length=Math.min(fromParts.length,toParts.length);
		var samePartsLength=length;
		for(var i=0;
		    i<length;
		    i++) {
			if(fromParts[i]!==toParts[i]) {
			    samePartsLength=i;
			    break
			}

		    }
		var outputParts=[];
		for(var i=samePartsLength;
		    i<fromParts.length;
		    i++) {
			outputParts.push("..")
		    }
		outputParts=outputParts.concat(toParts.slice(samePartsLength));
		return outputParts.join("/")
	    }

	}
	    ;
	    var TTY= {
		ttys:[],init:function() {

		}
		,shutdown:function() {

		}
		,register:function(dev,ops) {
		    TTY.ttys[dev]= {
			input:[],output:[],ops:ops
		    }
		    ;
		    FS.registerDevice(dev,TTY.stream_ops)
		}
		,stream_ops: {
		    open:function(stream) {
			var tty=TTY.ttys[stream.node.rdev];
			if(!tty) {
			    throw new FS.ErrnoError(ERRNO_CODES.ENODEV)
			}
			stream.tty=tty;
			stream.seekable=false
		    }
		    ,close:function(stream) {
			stream.tty.ops.flush(stream.tty)
		    }
		    ,flush:function(stream) {
			stream.tty.ops.flush(stream.tty)
		    }
		    ,read:function(stream,buffer,offset,length,pos) {
			if(!stream.tty||!stream.tty.ops.get_char) {
			    throw new FS.ErrnoError(ERRNO_CODES.ENXIO)
			}
			var bytesRead=0;
			for(var i=0;
			    i<length;
			    i++) {
				var result;
				try {
				    result=stream.tty.ops.get_char(stream.tty)
				}
				catch(e) {
				    throw new FS.ErrnoError(ERRNO_CODES.EIO)
				}
				if(result===undefined&&bytesRead===0) {
				    throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
				}
				if(result===null||result===undefined)break;
				bytesRead++;
				buffer[offset+i]=result
			    }
			if(bytesRead) {
			    stream.node.timestamp=Date.now()
			}
			return bytesRead
		    }
		    ,write:function(stream,buffer,offset,length,pos) {
			if(!stream.tty||!stream.tty.ops.put_char) {
			    throw new FS.ErrnoError(ERRNO_CODES.ENXIO)
			}
			try {
			    for(var i=0;
				i<length;
				i++) {
				    stream.tty.ops.put_char(stream.tty,buffer[offset+i])
				}

			}
			catch(e) {
			    throw new FS.ErrnoError(ERRNO_CODES.EIO)
			}
			if(length) {
			    stream.node.timestamp=Date.now()
			}
			return i
		    }

		}
		,default_tty_ops: {
		    get_char:function(tty) {
			if(!tty.input.length) {
			    var result=null;
			    if(ENVIRONMENT_IS_NODE) {
				var BUFSIZE=256;
				var buf=new Buffer(BUFSIZE);
				var bytesRead=0;
				var isPosixPlatform=process.platform!="win32";
				var fd=process.stdin.fd;
				if(isPosixPlatform) {
				    var usingDevice=false;
				    try {
					fd=fs.openSync("/dev/stdin","r");
					usingDevice=true
				    }
				    catch(e) {

				    }

				}
				try {
				    bytesRead=fs.readSync(fd,buf,0,BUFSIZE,null)
				}
				catch(e) {
				    if(e.toString().indexOf("EOF")!=-1)bytesRead=0;
				    else throw e
				}
				if(usingDevice) {
				    fs.closeSync(fd)
				}
				if(bytesRead>0) {
				    result=buf.slice(0,bytesRead).toString("utf-8")
				}
				else {
				    result=null
				}

			    }
			    else if(typeof window!="undefined"&&typeof window.prompt=="function") {
				result=window.prompt("Input: ");
				if(result!==null) {
				    result+="\n"
				}

			    }
			    else if(typeof readline=="function") {
				result=readline();
				if(result!==null) {
				    result+="\n"
				}

			    }
			    if(!result) {
				return null
			    }
			    tty.input=intArrayFromString(result,true)
			}
			return tty.input.shift()
		    }
		    ,put_char:function(tty,val) {
			if(val===null||val===10) {
			    out(UTF8ArrayToString(tty.output,0));
			    tty.output=[]
			}
			else {
			    if(val!=0)tty.output.push(val)
			}

		    }
		    ,flush:function(tty) {
			if(tty.output&&tty.output.length>0) {
			    out(UTF8ArrayToString(tty.output,0));
			    tty.output=[]
			}

		    }

		}
		,default_tty1_ops: {
		    put_char:function(tty,val) {
			if(val===null||val===10) {
			    err(UTF8ArrayToString(tty.output,0));
			    tty.output=[]
			}
			else {
			    if(val!=0)tty.output.push(val)
			}

		    }
		    ,flush:function(tty) {
			if(tty.output&&tty.output.length>0) {
			    err(UTF8ArrayToString(tty.output,0));
			    tty.output=[]
			}

		    }

		}

	    }
	    ;
	    var MEMFS= {
		ops_table:null,mount:function(mount) {
		    return MEMFS.createNode(null,"/",16384|511,0)
		}
		,createNode:function(parent,name,mode,dev) {
		    if(FS.isBlkdev(mode)||FS.isFIFO(mode)) {
			throw new FS.ErrnoError(ERRNO_CODES.EPERM)
		    }
		    if(!MEMFS.ops_table) {
			MEMFS.ops_table= {
			    dir: {
				node: {
				    getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,lookup:MEMFS.node_ops.lookup,mknod:MEMFS.node_ops.mknod,rename:MEMFS.node_ops.rename,unlink:MEMFS.node_ops.unlink,rmdir:MEMFS.node_ops.rmdir,readdir:MEMFS.node_ops.readdir,symlink:MEMFS.node_ops.symlink
				}
				,stream: {
				    llseek:MEMFS.stream_ops.llseek
				}

			    }
			    ,file: {
				node: {
				    getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr
				}
				,stream: {
				    llseek:MEMFS.stream_ops.llseek,read:MEMFS.stream_ops.read,write:MEMFS.stream_ops.write,allocate:MEMFS.stream_ops.allocate,mmap:MEMFS.stream_ops.mmap,msync:MEMFS.stream_ops.msync
				}

			    }
			    ,link: {
				node: {
				    getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,readlink:MEMFS.node_ops.readlink
				}
				,stream: {

				}

			    }
			    ,chrdev: {
				node: {
				    getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr
				}
				,stream:FS.chrdev_stream_ops
			    }

			}

		    }
		    var node=FS.createNode(parent,name,mode,dev);
		    if(FS.isDir(node.mode)) {
			node.node_ops=MEMFS.ops_table.dir.node;
			node.stream_ops=MEMFS.ops_table.dir.stream;
			node.contents= {

			}

		    }
		    else if(FS.isFile(node.mode)) {
			node.node_ops=MEMFS.ops_table.file.node;
			node.stream_ops=MEMFS.ops_table.file.stream;
			node.usedBytes=0;
			node.contents=null
		    }
		    else if(FS.isLink(node.mode)) {
			node.node_ops=MEMFS.ops_table.link.node;
			node.stream_ops=MEMFS.ops_table.link.stream
		    }
		    else if(FS.isChrdev(node.mode)) {
			node.node_ops=MEMFS.ops_table.chrdev.node;
			node.stream_ops=MEMFS.ops_table.chrdev.stream
		    }
		    node.timestamp=Date.now();
		    if(parent) {
			parent.contents[name]=node
		    }
		    return node
		}
		,getFileDataAsRegularArray:function(node) {
		    if(node.contents&&node.contents.subarray) {
			var arr=[];
			for(var i=0;
			    i<node.usedBytes;
			    ++i)arr.push(node.contents[i]);
			return arr
		    }
		    return node.contents
		}
		,getFileDataAsTypedArray:function(node) {
		    if(!node.contents)return new Uint8Array;
		    if(node.contents.subarray)return node.contents.subarray(0,node.usedBytes);
		    return new Uint8Array(node.contents)
		}
		,expandFileStorage:function(node,newCapacity) {
		    var prevCapacity=node.contents?node.contents.length:0;
		    if(prevCapacity>=newCapacity)return;
		    var CAPACITY_DOUBLING_MAX=1024*1024;
		    newCapacity=Math.max(newCapacity,prevCapacity*(prevCapacity<CAPACITY_DOUBLING_MAX?2:1.125)|0);
		    if(prevCapacity!=0)newCapacity=Math.max(newCapacity,256);
		    var oldContents=node.contents;
		    node.contents=new Uint8Array(newCapacity);
		    if(node.usedBytes>0)node.contents.set(oldContents.subarray(0,node.usedBytes),0);
		    return
		}
		,resizeFileStorage:function(node,newSize) {
		    if(node.usedBytes==newSize)return;
		    if(newSize==0) {
			node.contents=null;
			node.usedBytes=0;
			return
		    }
		    if(!node.contents||node.contents.subarray) {
			var oldContents=node.contents;
			node.contents=new Uint8Array(new ArrayBuffer(newSize));
			if(oldContents) {
			    node.contents.set(oldContents.subarray(0,Math.min(newSize,node.usedBytes)))
			}
			node.usedBytes=newSize;
			return
		    }
		    if(!node.contents)node.contents=[];
		    if(node.contents.length>newSize)node.contents.length=newSize;
		    else while(node.contents.length<newSize)node.contents.push(0);
		    node.usedBytes=newSize
		}
		,node_ops: {
		    getattr:function(node) {
			var attr= {

			}
			;
			attr.dev=FS.isChrdev(node.mode)?node.id:1;
			attr.ino=node.id;
			attr.mode=node.mode;
			attr.nlink=1;
			attr.uid=0;
			attr.gid=0;
			attr.rdev=node.rdev;
			if(FS.isDir(node.mode)) {
			    attr.size=4096
			}
			else if(FS.isFile(node.mode)) {
			    attr.size=node.usedBytes
			}
			else if(FS.isLink(node.mode)) {
			    attr.size=node.link.length
			}
			else {
			    attr.size=0
			}
			attr.atime=new Date(node.timestamp);
			attr.mtime=new Date(node.timestamp);
			attr.ctime=new Date(node.timestamp);
			attr.blksize=4096;
			attr.blocks=Math.ceil(attr.size/attr.blksize);
			return attr
		    }
		    ,setattr:function(node,attr) {
			if(attr.mode!==undefined) {
			    node.mode=attr.mode
			}
			if(attr.timestamp!==undefined) {
			    node.timestamp=attr.timestamp
			}
			if(attr.size!==undefined) {
			    MEMFS.resizeFileStorage(node,attr.size)
			}

		    }
		    ,lookup:function(parent,name) {
			throw FS.genericErrors[ERRNO_CODES.ENOENT]
		    }
		    ,mknod:function(parent,name,mode,dev) {
			return MEMFS.createNode(parent,name,mode,dev)
		    }
		    ,rename:function(old_node,new_dir,new_name) {
			if(FS.isDir(old_node.mode)) {
			    var new_node;
			    try {
				new_node=FS.lookupNode(new_dir,new_name)
			    }
			    catch(e) {

			    }
			    if(new_node) {
				for(var i in new_node.contents) {
				    throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY)
				}

			    }

			}
			delete old_node.parent.contents[old_node.name];
			old_node.name=new_name;
			new_dir.contents[new_name]=old_node;
			old_node.parent=new_dir
		    }
		    ,unlink:function(parent,name) {
			delete parent.contents[name]
		    }
		    ,rmdir:function(parent,name) {
			var node=FS.lookupNode(parent,name);
			for(var i in node.contents) {
			    throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY)
			}
			delete parent.contents[name]
		    }
		    ,readdir:function(node) {
			var entries=[".",".."];
			for(var key in node.contents) {
			    if(!node.contents.hasOwnProperty(key)) {
				continue
			    }
			    entries.push(key)
			}
			return entries
		    }
		    ,symlink:function(parent,newname,oldpath) {
			var node=MEMFS.createNode(parent,newname,511|40960,0);
			node.link=oldpath;
			return node
		    }
		    ,readlink:function(node) {
			if(!FS.isLink(node.mode)) {
			    throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
			}
			return node.link
		    }

		}
		,stream_ops: {
		    read:function(stream,buffer,offset,length,position) {
			var contents=stream.node.contents;
			if(position>=stream.node.usedBytes)return 0;
			var size=Math.min(stream.node.usedBytes-position,length);
			if(size>8&&contents.subarray) {
			    buffer.set(contents.subarray(position,position+size),offset)
			}
			else {
			    for(var i=0;
				i<size;
				i++)buffer[offset+i]=contents[position+i]
			}
			return size
		    }
		    ,write:function(stream,buffer,offset,length,position,canOwn) {
			canOwn=false;
			if(!length)return 0;
			var node=stream.node;
			node.timestamp=Date.now();
			if(buffer.subarray&&(!node.contents||node.contents.subarray)) {
			    if(canOwn) {
				node.contents=buffer.subarray(offset,offset+length);
				node.usedBytes=length;
				return length
			    }
			    else if(node.usedBytes===0&&position===0) {
				node.contents=new Uint8Array(buffer.subarray(offset,offset+length));
				node.usedBytes=length;
				return length
			    }
			    else if(position+length<=node.usedBytes) {
				node.contents.set(buffer.subarray(offset,offset+length),position);
				return length
			    }

			}
			MEMFS.expandFileStorage(node,position+length);
			if(node.contents.subarray&&buffer.subarray)node.contents.set(buffer.subarray(offset,offset+length),position);
			else {
			    for(var i=0;
				i<length;
				i++) {
				    node.contents[position+i]=buffer[offset+i]
				}

			}
			node.usedBytes=Math.max(node.usedBytes,position+length);
			return length
		    }
		    ,llseek:function(stream,offset,whence) {
			var position=offset;
			if(whence===1) {
			    position+=stream.position
			}
			else if(whence===2) {
			    if(FS.isFile(stream.node.mode)) {
				position+=stream.node.usedBytes
			    }

			}
			if(position<0) {
			    throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
			}
			return position
		    }
		    ,allocate:function(stream,offset,length) {
			MEMFS.expandFileStorage(stream.node,offset+length);
			stream.node.usedBytes=Math.max(stream.node.usedBytes,offset+length)
		    }
		    ,mmap:function(stream,buffer,offset,length,position,prot,flags) {
			if(!FS.isFile(stream.node.mode)) {
			    throw new FS.ErrnoError(ERRNO_CODES.ENODEV)
			}
			var ptr;
			var allocated;
			var contents=stream.node.contents;
			if(!(flags&2)&&(contents.buffer===buffer||contents.buffer===buffer.buffer)) {
			    allocated=false;
			    ptr=contents.byteOffset
			}
			else {
			    if(position>0||position+length<stream.node.usedBytes) {
				if(contents.subarray) {
				    contents=contents.subarray(position,position+length)
				}
				else {
				    contents=Array.prototype.slice.call(contents,position,position+length)
				}

			    }
			    allocated=true;
			    ptr=_malloc(length);
			    if(!ptr) {
				throw new FS.ErrnoError(ERRNO_CODES.ENOMEM)
			    }
			    buffer.set(contents,ptr)
			}
			return {
			    ptr:ptr,allocated:allocated
			}

		    }
		    ,msync:function(stream,buffer,offset,length,mmapFlags) {
			if(!FS.isFile(stream.node.mode)) {
			    throw new FS.ErrnoError(ERRNO_CODES.ENODEV)
			}
			if(mmapFlags&2) {
			    return 0
			}
			var bytesWritten=MEMFS.stream_ops.write(stream,buffer,0,length,offset,false);
			return 0
		    }

		}

	    }
	    ;
	    var IDBFS= {
		dbs: {

		}
		,indexedDB:function() {
		    if(typeof indexedDB!=="undefined")return indexedDB;
		    var ret=null;
		    if(typeof window==="object")ret=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;
		    assert(ret,"IDBFS used, but indexedDB not supported");
		    return ret
		}
		,DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:function(mount) {
		    return MEMFS.mount.apply(null,arguments)
		}
		,syncfs:function(mount,populate,callback) {
		    IDBFS.getLocalSet(mount,function(err,local) {
			if(err)return callback(err);
			IDBFS.getRemoteSet(mount,function(err,remote) {
			    if(err)return callback(err);
			    var src=populate?remote:local;
			    var dst=populate?local:remote;
			    IDBFS.reconcile(src,dst,callback)
			}
			)
		    }
		    )
		}
		,getDB:function(name,callback) {
		    var db=IDBFS.dbs[name];
		    if(db) {
			return callback(null,db)
		    }
		    var req;
		    try {
			req=IDBFS.indexedDB().open(name,IDBFS.DB_VERSION)
		    }
		    catch(e) {
			return callback(e)
		    }
		    if(!req) {
			return callback("Unable to connect to IndexedDB")
		    }
		    req.onupgradeneeded=function(e) {
			var db=e.target.result;
			var transaction=e.target.transaction;
			var fileStore;
			if(db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
			    fileStore=transaction.objectStore(IDBFS.DB_STORE_NAME)
			}
			else {
			    fileStore=db.createObjectStore(IDBFS.DB_STORE_NAME)
			}
			if(!fileStore.indexNames.contains("timestamp")) {
			    fileStore.createIndex("timestamp","timestamp", {
				unique:false
			    }
			    )
			}

		    }
		    ;
		    req.onsuccess=function() {
			db=req.result;
			IDBFS.dbs[name]=db;
			callback(null,db)
		    }
		    ;
		    req.onerror=function(e) {
			callback(this.error);
			e.preventDefault()
		    }

		}
		,getLocalSet:function(mount,callback) {
		    var entries= {

		    }
		    ;
		    function isRealDir(p) {
			return p!=="."&&p!==".."
		    }
		    function toAbsolute(root) {
			return function(p) {
			    return PATH.join2(root,p)
			}

		    }
		    var check=FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
		    while(check.length) {
			var path=check.pop();
			var stat;
			try {
			    stat=FS.stat(path)
			}
			catch(e) {
			    return callback(e)
			}
			if(FS.isDir(stat.mode)) {
			    check.push.apply(check,FS.readdir(path).filter(isRealDir).map(toAbsolute(path)))
			}
			entries[path]= {
			    timestamp:stat.mtime
			}

		    }
		    return callback(null, {
			type:"local",entries:entries
		    }
		    )
		}
		,getRemoteSet:function(mount,callback) {
		    var entries= {

		    }
		    ;
		    IDBFS.getDB(mount.mountpoint,function(err,db) {
			if(err)return callback(err);
			try {
			    var transaction=db.transaction([IDBFS.DB_STORE_NAME],"readonly");
			    transaction.onerror=function(e) {
				callback(this.error);
				e.preventDefault()
			    }
			    ;
			    var store=transaction.objectStore(IDBFS.DB_STORE_NAME);
			    var index=store.index("timestamp");
			    index.openKeyCursor().onsuccess=function(event) {
				var cursor=event.target.result;
				if(!cursor) {
				    return callback(null, {
					type:"remote",db:db,entries:entries
				    }
				    )
				}
				entries[cursor.primaryKey]= {
				    timestamp:cursor.key
				}
				;
				cursor.continue()
			    }

			}
			catch(e) {
			    return callback(e)
			}

		    }
		    )
		}
		,loadLocalEntry:function(path,callback) {
		    var stat,node;
		    try {
			var lookup=FS.lookupPath(path);
			node=lookup.node;
			stat=FS.stat(path)
		    }
		    catch(e) {
			return callback(e)
		    }
		    if(FS.isDir(stat.mode)) {
			return callback(null, {
			    timestamp:stat.mtime,mode:stat.mode
			}
			)
		    }
		    else if(FS.isFile(stat.mode)) {
			node.contents=MEMFS.getFileDataAsTypedArray(node);
			return callback(null, {
			    timestamp:stat.mtime,mode:stat.mode,contents:node.contents
			}
			)
		    }
		    else {
			return callback(new Error("node type not supported"))
		    }

		}
		,storeLocalEntry:function(path,entry,callback) {
		    try {
			if(FS.isDir(entry.mode)) {
			    FS.mkdir(path,entry.mode)
			}
			else if(FS.isFile(entry.mode)) {
			    FS.writeFile(path,entry.contents, {
				canOwn:true
			    }
			    )
			}
			else {
			    return callback(new Error("node type not supported"))
			}
			FS.chmod(path,entry.mode);
			FS.utime(path,entry.timestamp,entry.timestamp)
		    }
		    catch(e) {
			return callback(e)
		    }
		    callback(null)
		}
		,removeLocalEntry:function(path,callback) {
		    try {
			var lookup=FS.lookupPath(path);
			var stat=FS.stat(path);
			if(FS.isDir(stat.mode)) {
			    FS.rmdir(path)
			}
			else if(FS.isFile(stat.mode)) {
			    FS.unlink(path)
			}

		    }
		    catch(e) {
			return callback(e)
		    }
		    callback(null)
		}
		,loadRemoteEntry:function(store,path,callback) {
		    var req=store.get(path);
		    req.onsuccess=function(event) {
			callback(null,event.target.result)
		    }
		    ;
		    req.onerror=function(e) {
			callback(this.error);
			e.preventDefault()
		    }

		}
		,storeRemoteEntry:function(store,path,entry,callback) {
		    var req=store.put(entry,path);
		    req.onsuccess=function() {
			callback(null)
		    }
		    ;
		    req.onerror=function(e) {
			callback(this.error);
			e.preventDefault()
		    }

		}
		,removeRemoteEntry:function(store,path,callback) {
		    var req=store.delete(path);
		    req.onsuccess=function() {
			callback(null)
		    }
		    ;
		    req.onerror=function(e) {
			callback(this.error);
			e.preventDefault()
		    }

		}
		,reconcile:function(src,dst,callback) {
		    var total=0;
		    var create=[];
		    Object.keys(src.entries).forEach(function(key) {
			var e=src.entries[key];
			var e2=dst.entries[key];
			if(!e2||e.timestamp>e2.timestamp) {
			    create.push(key);
			    total++
			}

		    }
		    );
		    var remove=[];
		    Object.keys(dst.entries).forEach(function(key) {
			var e=dst.entries[key];
			var e2=src.entries[key];
			if(!e2) {
			    remove.push(key);
			    total++
			}

		    }
		    );
		    if(!total) {
			return callback(null)
		    }
		    var errored=false;
		    var completed=0;
		    var db=src.type==="remote"?src.db:dst.db;
		    var transaction=db.transaction([IDBFS.DB_STORE_NAME],"readwrite");
		    var store=transaction.objectStore(IDBFS.DB_STORE_NAME);
		    function done(err) {
			if(err) {
			    if(!done.errored) {
				done.errored=true;
				return callback(err)
			    }
			    return
			}
			if(++completed>=total) {
			    return callback(null)
			}

		    }
		    transaction.onerror=function(e) {
			done(this.error);
			e.preventDefault()
		    }
		    ;
		    create.sort().forEach(function(path) {
			if(dst.type==="local") {
			    IDBFS.loadRemoteEntry(store,path,function(err,entry) {
				if(err)return done(err);
				IDBFS.storeLocalEntry(path,entry,done)
			    }
			    )
			}
			else {
			    IDBFS.loadLocalEntry(path,function(err,entry) {
				if(err)return done(err);
				IDBFS.storeRemoteEntry(store,path,entry,done)
			    }
			    )
			}

		    }
		    );
		    remove.sort().reverse().forEach(function(path) {
			if(dst.type==="local") {
			    IDBFS.removeLocalEntry(path,done)
			}
			else {
			    IDBFS.removeRemoteEntry(store,path,done)
			}

		    }
		    )
		}

	    }
	    ;
	    var NODEFS= {
		isWindows:false,staticInit:function() {
		    NODEFS.isWindows=!!process.platform.match(/^win/);
		    var flags=process["binding"]("constants");
		    if(flags["fs"]) {
			flags=flags["fs"]
		    }
		    NODEFS.flagsForNodeMap= {
			1024:flags["O_APPEND"],64:flags["O_CREAT"],128:flags["O_EXCL"],0:flags["O_RDONLY"],2:flags["O_RDWR"],4096:flags["O_SYNC"],512:flags["O_TRUNC"],1:flags["O_WRONLY"]
		    }

		}
		,bufferFrom:function(arrayBuffer) {
		    return Buffer.alloc?Buffer.from(arrayBuffer):new Buffer(arrayBuffer)
		}
		,mount:function(mount) {
		    assert(ENVIRONMENT_IS_NODE);
		    return NODEFS.createNode(null,"/",NODEFS.getMode(mount.opts.root),0)
		}
		,createNode:function(parent,name,mode,dev) {
		    if(!FS.isDir(mode)&&!FS.isFile(mode)&&!FS.isLink(mode)) {
			throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
		    }
		    var node=FS.createNode(parent,name,mode);
		    node.node_ops=NODEFS.node_ops;
		    node.stream_ops=NODEFS.stream_ops;
		    return node
		}
		,getMode:function(path) {
		    var stat;
		    try {
			stat=fs.lstatSync(path);
			if(NODEFS.isWindows) {
			    stat.mode=stat.mode|(stat.mode&292)>>2
			}

		    }
		    catch(e) {
			if(!e.code)throw e;
			throw new FS.ErrnoError(ERRNO_CODES[e.code])
		    }
		    return stat.mode
		}
		,realPath:function(node) {
		    var parts=[];
		    while(node.parent!==node) {
			parts.push(node.name);
			node=node.parent
		    }
		    parts.push(node.mount.opts.root);
		    parts.reverse();
		    return PATH.join.apply(null,parts)
		}
		,flagsForNode:function(flags) {
		    flags&=~2097152;
		    flags&=~2048;
		    flags&=~32768;
		    flags&=~524288;
		    var newFlags=0;
		    for(var k in NODEFS.flagsForNodeMap) {
			if(flags&k) {
			    newFlags|=NODEFS.flagsForNodeMap[k];
			    flags^=k
			}

		    }
		    if(!flags) {
			return newFlags
		    }
		    else {
			throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
		    }

		}
		,node_ops: {
		    getattr:function(node) {
			var path=NODEFS.realPath(node);
			var stat;
			try {
			    stat=fs.lstatSync(path)
			}
			catch(e) {
			    if(!e.code)throw e;
			    throw new FS.ErrnoError(ERRNO_CODES[e.code])
			}
			if(NODEFS.isWindows&&!stat.blksize) {
			    stat.blksize=4096
			}
			if(NODEFS.isWindows&&!stat.blocks) {
			    stat.blocks=(stat.size+stat.blksize-1)/stat.blksize|0
			}
			return {
			    dev:stat.dev,ino:stat.ino,mode:stat.mode,nlink:stat.nlink,uid:stat.uid,gid:stat.gid,rdev:stat.rdev,size:stat.size,atime:stat.atime,mtime:stat.mtime,ctime:stat.ctime,blksize:stat.blksize,blocks:stat.blocks
			}

		    }
		    ,setattr:function(node,attr) {
			var path=NODEFS.realPath(node);
			try {
			    if(attr.mode!==undefined) {
				fs.chmodSync(path,attr.mode);
				node.mode=attr.mode
			    }
			    if(attr.timestamp!==undefined) {
				var date=new Date(attr.timestamp);
				fs.utimesSync(path,date,date)
			    }
			    if(attr.size!==undefined) {
				fs.truncateSync(path,attr.size)
			    }

			}
			catch(e) {
			    if(!e.code)throw e;
			    throw new FS.ErrnoError(ERRNO_CODES[e.code])
			}

		    }
		    ,lookup:function(parent,name) {
			var path=PATH.join2(NODEFS.realPath(parent),name);
			var mode=NODEFS.getMode(path);
			return NODEFS.createNode(parent,name,mode)
		    }
		    ,mknod:function(parent,name,mode,dev) {
			var node=NODEFS.createNode(parent,name,mode,dev);
			var path=NODEFS.realPath(node);
			try {
			    if(FS.isDir(node.mode)) {
				fs.mkdirSync(path,node.mode)
			    }
			    else {
				fs.writeFileSync(path,"", {
				    mode:node.mode
				}
				)
			    }

			}
			catch(e) {
			    if(!e.code)throw e;
			    throw new FS.ErrnoError(ERRNO_CODES[e.code])
			}
			return node
		    }
		    ,rename:function(oldNode,newDir,newName) {
			var oldPath=NODEFS.realPath(oldNode);
			var newPath=PATH.join2(NODEFS.realPath(newDir),newName);
			try {
			    fs.renameSync(oldPath,newPath)
			}
			catch(e) {
			    if(!e.code)throw e;
			    throw new FS.ErrnoError(ERRNO_CODES[e.code])
			}

		    }
		    ,unlink:function(parent,name) {
			var path=PATH.join2(NODEFS.realPath(parent),name);
			try {
			    fs.unlinkSync(path)
			}
			catch(e) {
			    if(!e.code)throw e;
			    throw new FS.ErrnoError(ERRNO_CODES[e.code])
			}

		    }
		    ,rmdir:function(parent,name) {
			var path=PATH.join2(NODEFS.realPath(parent),name);
			try {
			    fs.rmdirSync(path)
			}
			catch(e) {
			    if(!e.code)throw e;
			    throw new FS.ErrnoError(ERRNO_CODES[e.code])
			}

		    }
		    ,readdir:function(node) {
			var path=NODEFS.realPath(node);
			try {
			    return fs.readdirSync(path)
			}
			catch(e) {
			    if(!e.code)throw e;
			    throw new FS.ErrnoError(ERRNO_CODES[e.code])
			}

		    }
		    ,symlink:function(parent,newName,oldPath) {
			var newPath=PATH.join2(NODEFS.realPath(parent),newName);
			try {
			    fs.symlinkSync(oldPath,newPath)
			}
			catch(e) {
			    if(!e.code)throw e;
			    throw new FS.ErrnoError(ERRNO_CODES[e.code])
			}

		    }
		    ,readlink:function(node) {
			var path=NODEFS.realPath(node);
			try {
			    path=fs.readlinkSync(path);
			    path=NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root),path);
			    return path
			}
			catch(e) {
			    if(!e.code)throw e;
			    throw new FS.ErrnoError(ERRNO_CODES[e.code])
			}

		    }

		}
		,stream_ops: {
		    open:function(stream) {
			var path=NODEFS.realPath(stream.node);
			try {
			    if(FS.isFile(stream.node.mode)) {
				stream.nfd=fs.openSync(path,NODEFS.flagsForNode(stream.flags))
			    }

			}
			catch(e) {
			    if(!e.code)throw e;
			    throw new FS.ErrnoError(ERRNO_CODES[e.code])
			}

		    }
		    ,close:function(stream) {
			try {
			    if(FS.isFile(stream.node.mode)&&stream.nfd) {
				fs.closeSync(stream.nfd)
			    }

			}
			catch(e) {
			    if(!e.code)throw e;
			    throw new FS.ErrnoError(ERRNO_CODES[e.code])
			}

		    }
		    ,read:function(stream,buffer,offset,length,position) {
			if(length===0)return 0;
			try {
			    return fs.readSync(stream.nfd,NODEFS.bufferFrom(buffer.buffer),offset,length,position)
			}
			catch(e) {
			    throw new FS.ErrnoError(ERRNO_CODES[e.code])
			}

		    }
		    ,write:function(stream,buffer,offset,length,position) {
			try {
			    return fs.writeSync(stream.nfd,NODEFS.bufferFrom(buffer.buffer),offset,length,position)
			}
			catch(e) {
			    throw new FS.ErrnoError(ERRNO_CODES[e.code])
			}

		    }
		    ,llseek:function(stream,offset,whence) {
			var position=offset;
			if(whence===1) {
			    position+=stream.position
			}
			else if(whence===2) {
			    if(FS.isFile(stream.node.mode)) {
				try {
				    var stat=fs.fstatSync(stream.nfd);
				    position+=stat.size
				}
				catch(e) {
				    throw new FS.ErrnoError(ERRNO_CODES[e.code])
				}

			    }

			}
			if(position<0) {
			    throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
			}
			return position
		    }

		}

	    }
	    ;
	    var WORKERFS= {
		DIR_MODE:16895,FILE_MODE:33279,reader:null,mount:function(mount) {
		    assert(ENVIRONMENT_IS_WORKER);
		    if(!WORKERFS.reader)WORKERFS.reader=new FileReaderSync;
		    var root=WORKERFS.createNode(null,"/",WORKERFS.DIR_MODE,0);
		    var createdParents= {

		    }
		    ;
		    function ensureParent(path) {
			var parts=path.split("/");
			var parent=root;
			for(var i=0;
			    i<parts.length-1;
			    i++) {
				var curr=parts.slice(0,i+1).join("/");
				if(!createdParents[curr]) {
				    createdParents[curr]=WORKERFS.createNode(parent,parts[i],WORKERFS.DIR_MODE,0)
				}
				parent=createdParents[curr]
			    }
			return parent
		    }
		    function base(path) {
			var parts=path.split("/");
			return parts[parts.length-1]
		    }
		    Array.prototype.forEach.call(mount.opts["files"]||[],function(file) {
			WORKERFS.createNode(ensureParent(file.name),base(file.name),WORKERFS.FILE_MODE,0,file,file.lastModifiedDate)
		    }
		    );
		    (mount.opts["blobs"]||[]).forEach(function(obj) {
			WORKERFS.createNode(ensureParent(obj["name"]),base(obj["name"]),WORKERFS.FILE_MODE,0,obj["data"])
		    }
		    );
		    (mount.opts["packages"]||[]).forEach(function(pack) {
			pack["metadata"].files.forEach(function(file) {
			    var name=file.filename.substr(1);
			    WORKERFS.createNode(ensureParent(name),base(name),WORKERFS.FILE_MODE,0,pack["blob"].slice(file.start,file.end))
			}
			)
		    }
		    );
		    return root
		}
		,createNode:function(parent,name,mode,dev,contents,mtime) {
		    var node=FS.createNode(parent,name,mode);
		    node.mode=mode;
		    node.node_ops=WORKERFS.node_ops;
		    node.stream_ops=WORKERFS.stream_ops;
		    node.timestamp=(mtime||new Date).getTime();
		    assert(WORKERFS.FILE_MODE!==WORKERFS.DIR_MODE);
		    if(mode===WORKERFS.FILE_MODE) {
			node.size=contents.size;
			node.contents=contents
		    }
		    else {
			node.size=4096;
			node.contents= {

			}

		    }
		    if(parent) {
			parent.contents[name]=node
		    }
		    return node
		}
		,node_ops: {
		    getattr:function(node) {
			return {
			    dev:1,ino:undefined,mode:node.mode,nlink:1,uid:0,gid:0,rdev:undefined,size:node.size,atime:new Date(node.timestamp),mtime:new Date(node.timestamp),ctime:new Date(node.timestamp),blksize:4096,blocks:Math.ceil(node.size/4096)
			}

		    }
		    ,setattr:function(node,attr) {
			if(attr.mode!==undefined) {
			    node.mode=attr.mode
			}
			if(attr.timestamp!==undefined) {
			    node.timestamp=attr.timestamp
			}

		    }
		    ,lookup:function(parent,name) {
			throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
		    }
		    ,mknod:function(parent,name,mode,dev) {
			throw new FS.ErrnoError(ERRNO_CODES.EPERM)
		    }
		    ,rename:function(oldNode,newDir,newName) {
			throw new FS.ErrnoError(ERRNO_CODES.EPERM)
		    }
		    ,unlink:function(parent,name) {
			throw new FS.ErrnoError(ERRNO_CODES.EPERM)
		    }
		    ,rmdir:function(parent,name) {
			throw new FS.ErrnoError(ERRNO_CODES.EPERM)
		    }
		    ,readdir:function(node) {
			var entries=[".",".."];
			for(var key in node.contents) {
			    if(!node.contents.hasOwnProperty(key)) {
				continue
			    }
			    entries.push(key)
			}
			return entries
		    }
		    ,symlink:function(parent,newName,oldPath) {
			throw new FS.ErrnoError(ERRNO_CODES.EPERM)
		    }
		    ,readlink:function(node) {
			throw new FS.ErrnoError(ERRNO_CODES.EPERM)
		    }

		}
		,stream_ops: {
		    read:function(stream,buffer,offset,length,position) {
			if(position>=stream.node.size)return 0;
			var chunk=stream.node.contents.slice(position,position+length);
			var ab=WORKERFS.reader.readAsArrayBuffer(chunk);
			buffer.set(new Uint8Array(ab),offset);
			return chunk.size
		    }
		    ,write:function(stream,buffer,offset,length,position) {
			throw new FS.ErrnoError(ERRNO_CODES.EIO)
		    }
		    ,llseek:function(stream,offset,whence) {
			var position=offset;
			if(whence===1) {
			    position+=stream.position
			}
			else if(whence===2) {
			    if(FS.isFile(stream.node.mode)) {
				position+=stream.node.size
			    }

			}
			if(position<0) {
			    throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
			}
			return position
		    }

		}

	    }
	    ;
	    var FS= {
		root:null,mounts:[],devices: {

		}
		,streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,trackingDelegate: {

		}
		,tracking: {
		    openFlags: {
			READ:1,WRITE:2
		    }

		}
		,ErrnoError:null,genericErrors: {

		}
		,filesystems:null,syncFSRequests:0,handleFSError:function(e) {
		    if(!(e instanceof FS.ErrnoError))throw e+" : "+stackTrace();
		    return ___setErrNo(e.errno)
		}
		,lookupPath:function(path,opts) {
		    path=PATH.resolve(FS.cwd(),path);
		    opts=opts|| {

		    }
		    ;
		    if(!path)return {
			path:"",node:null
		    }
		    ;
		    var defaults= {
			follow_mount:true,recurse_count:0
		    }
		    ;
		    for(var key in defaults) {
			if(opts[key]===undefined) {
			    opts[key]=defaults[key]
			}

		    }
		    if(opts.recurse_count>8) {
			throw new FS.ErrnoError(40)
		    }
		    var parts=PATH.normalizeArray(path.split("/").filter(function(p) {
			return!!p
		    }
		    ),false);
		    var current=FS.root;
		    var current_path="/";
		    for(var i=0;
			i<parts.length;
			i++) {
			    var islast=i===parts.length-1;
			    if(islast&&opts.parent) {
				break
			    }
			    current=FS.lookupNode(current,parts[i]);
			    current_path=PATH.join2(current_path,parts[i]);
			    if(FS.isMountpoint(current)) {
				if(!islast||islast&&opts.follow_mount) {
				    current=current.mounted.root
				}

			    }
			    if(!islast||opts.follow) {
				var count=0;
				while(FS.isLink(current.mode)) {
				    var link=FS.readlink(current_path);
				    current_path=PATH.resolve(PATH.dirname(current_path),link);
				    var lookup=FS.lookupPath(current_path, {
					recurse_count:opts.recurse_count
				    }
				    );
				    current=lookup.node;
				    if(count++>40) {
					throw new FS.ErrnoError(40)
				    }

				}

			    }

			}
		    return {
			path:current_path,node:current
		    }

		}
		,getPath:function(node) {
		    var path;
		    while(true) {
			if(FS.isRoot(node)) {
			    var mount=node.mount.mountpoint;
			    if(!path)return mount;
			    return mount[mount.length-1]!=="/"?mount+"/"+path:mount+path
			}
			path=path?node.name+"/"+path:node.name;
			node=node.parent
		    }

		}
		,hashName:function(parentid,name) {
		    var hash=0;
		    for(var i=0;
			i<name.length;
			i++) {
			    hash=(hash<<5)-hash+name.charCodeAt(i)|0
			}
		    return(parentid+hash>>>0)%FS.nameTable.length
		}
		,hashAddNode:function(node) {
		    var hash=FS.hashName(node.parent.id,node.name);
		    node.name_next=FS.nameTable[hash];
		    FS.nameTable[hash]=node
		}
		,hashRemoveNode:function(node) {
		    var hash=FS.hashName(node.parent.id,node.name);
		    if(FS.nameTable[hash]===node) {
			FS.nameTable[hash]=node.name_next
		    }
		    else {
			var current=FS.nameTable[hash];
			while(current) {
			    if(current.name_next===node) {
				current.name_next=node.name_next;
				break
			    }
			    current=current.name_next
			}

		    }

		}
		,lookupNode:function(parent,name) {
		    var err=FS.mayLookup(parent);
		    if(err) {
			throw new FS.ErrnoError(err,parent)
		    }
		    var hash=FS.hashName(parent.id,name);
		    for(var node=FS.nameTable[hash];
			node;
			node=node.name_next) {
			    var nodeName=node.name;
			    if(node.parent.id===parent.id&&nodeName===name) {
				return node
			    }

			}
		    return FS.lookup(parent,name)
		}
		,createNode:function(parent,name,mode,rdev) {
		    if(!FS.FSNode) {
			FS.FSNode=function(parent,name,mode,rdev) {
			    if(!parent) {
				parent=this
			    }
			    this.parent=parent;
			    this.mount=parent.mount;
			    this.mounted=null;
			    this.id=FS.nextInode++;
			    this.name=name;
			    this.mode=mode;
			    this.node_ops= {

			    }
			    ;
			    this.stream_ops= {

			    }
			    ;
			    this.rdev=rdev
			}
			;
			FS.FSNode.prototype= {

			}
			;
			var readMode=292|73;
			var writeMode=146;
			Object.defineProperties(FS.FSNode.prototype, {
			    read: {
				get:function() {
				    return(this.mode&readMode)===readMode
				}
				,set:function(val) {
				    val?this.mode|=readMode:this.mode&=~readMode
				}

			    }
			    ,write: {
				get:function() {
				    return(this.mode&writeMode)===writeMode
				}
				,set:function(val) {
				    val?this.mode|=writeMode:this.mode&=~writeMode
				}

			    }
			    ,isFolder: {
				get:function() {
				    return FS.isDir(this.mode)
				}

			    }
			    ,isDevice: {
				get:function() {
				    return FS.isChrdev(this.mode)
				}

			    }

			}
			)
		    }
		    var node=new FS.FSNode(parent,name,mode,rdev);
		    FS.hashAddNode(node);
		    return node
		}
		,destroyNode:function(node) {
		    FS.hashRemoveNode(node)
		}
		,isRoot:function(node) {
		    return node===node.parent
		}
		,isMountpoint:function(node) {
		    return!!node.mounted
		}
		,isFile:function(mode) {
		    return(mode&61440)===32768
		}
		,isDir:function(mode) {
		    return(mode&61440)===16384
		}
		,isLink:function(mode) {
		    return(mode&61440)===40960
		}
		,isChrdev:function(mode) {
		    return(mode&61440)===8192
		}
		,isBlkdev:function(mode) {
		    return(mode&61440)===24576
		}
		,isFIFO:function(mode) {
		    return(mode&61440)===4096
		}
		,isSocket:function(mode) {
		    return(mode&49152)===49152
		}
		,flagModes: {
		    "r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218
		}
		,modeStringToFlags:function(str) {
		    var flags=FS.flagModes[str];
		    if(typeof flags==="undefined") {
			throw new Error("Unknown file open mode: "+str)
		    }
		    return flags
		}
		,flagsToPermissionString:function(flag) {
		    var perms=["r","w","rw"][flag&3];
		    if(flag&512) {
			perms+="w"
		    }
		    return perms
		}
		,nodePermissions:function(node,perms) {
		    if(FS.ignorePermissions) {
			return 0
		    }
		    if(perms.indexOf("r")!==-1&&!(node.mode&292)) {
			return 13
		    }
		    else if(perms.indexOf("w")!==-1&&!(node.mode&146)) {
			return 13
		    }
		    else if(perms.indexOf("x")!==-1&&!(node.mode&73)) {
			return 13
		    }
		    return 0
		}
		,mayLookup:function(dir) {
		    var err=FS.nodePermissions(dir,"x");
		    if(err)return err;
		    if(!dir.node_ops.lookup)return 13;
		    return 0
		}
		,mayCreate:function(dir,name) {
		    try {
			var node=FS.lookupNode(dir,name);
			return 17
		    }
		    catch(e) {

		    }
		    return FS.nodePermissions(dir,"wx")
		}
		,mayDelete:function(dir,name,isdir) {
		    var node;
		    try {
			node=FS.lookupNode(dir,name)
		    }
		    catch(e) {
			return e.errno
		    }
		    var err=FS.nodePermissions(dir,"wx");
		    if(err) {
			return err
		    }
		    if(isdir) {
			if(!FS.isDir(node.mode)) {
			    return 20
			}
			if(FS.isRoot(node)||FS.getPath(node)===FS.cwd()) {
			    return 16
			}

		    }
		    else {
			if(FS.isDir(node.mode)) {
			    return 21
			}

		    }
		    return 0
		}
		,mayOpen:function(node,flags) {
		    if(!node) {
			return 2
		    }
		    if(FS.isLink(node.mode)) {
			return 40
		    }
		    else if(FS.isDir(node.mode)) {
			if(FS.flagsToPermissionString(flags)!=="r"||flags&512) {
			    return 21
			}

		    }
		    return FS.nodePermissions(node,FS.flagsToPermissionString(flags))
		}
		,MAX_OPEN_FDS:4096,nextfd:function(fd_start,fd_end) {
		    fd_start=fd_start||0;
		    fd_end=fd_end||FS.MAX_OPEN_FDS;
		    for(var fd=fd_start;
			fd<=fd_end;
			fd++) {
			    if(!FS.streams[fd]) {
				return fd
			    }

			}
		    throw new FS.ErrnoError(24)
		}
		,getStream:function(fd) {
		    return FS.streams[fd]
		}
		,createStream:function(stream,fd_start,fd_end) {
		    if(!FS.FSStream) {
			FS.FSStream=function() {

			}
			;
			FS.FSStream.prototype= {

			}
			;
			Object.defineProperties(FS.FSStream.prototype, {
			    object: {
				get:function() {
				    return this.node
				}
				,set:function(val) {
				    this.node=val
				}

			    }
			    ,isRead: {
				get:function() {
				    return(this.flags&2097155)!==1
				}

			    }
			    ,isWrite: {
				get:function() {
				    return(this.flags&2097155)!==0
				}

			    }
			    ,isAppend: {
				get:function() {
				    return this.flags&1024
				}

			    }

			}
			)
		    }
		    var newStream=new FS.FSStream;
		    for(var p in stream) {
			newStream[p]=stream[p]
		    }
		    stream=newStream;
		    var fd=FS.nextfd(fd_start,fd_end);
		    stream.fd=fd;
		    FS.streams[fd]=stream;
		    return stream
		}
		,closeStream:function(fd) {
		    FS.streams[fd]=null
		}
		,chrdev_stream_ops: {
		    open:function(stream) {
			var device=FS.getDevice(stream.node.rdev);
			stream.stream_ops=device.stream_ops;
			if(stream.stream_ops.open) {
			    stream.stream_ops.open(stream)
			}

		    }
		    ,llseek:function() {
			throw new FS.ErrnoError(29)
		    }

		}
		,major:function(dev) {
		    return dev>>8
		}
		,minor:function(dev) {
		    return dev&255
		}
		,makedev:function(ma,mi) {
		    return ma<<8|mi
		}
		,registerDevice:function(dev,ops) {
		    FS.devices[dev]= {
			stream_ops:ops
		    }

		}
		,getDevice:function(dev) {
		    return FS.devices[dev]
		}
		,getMounts:function(mount) {
		    var mounts=[];
		    var check=[mount];
		    while(check.length) {
			var m=check.pop();
			mounts.push(m);
			check.push.apply(check,m.mounts)
		    }
		    return mounts
		}
		,syncfs:function(populate,callback) {
		    if(typeof populate==="function") {
			callback=populate;
			populate=false
		    }
		    FS.syncFSRequests++;
		    if(FS.syncFSRequests>1) {
			console.log("warning: "+FS.syncFSRequests+" FS.syncfs operations in flight at once, probably just doing extra work")
		    }
		    var mounts=FS.getMounts(FS.root.mount);
		    var completed=0;
		    function doCallback(err) {
			FS.syncFSRequests--;
			return callback(err)
		    }
		    function done(err) {
			if(err) {
			    if(!done.errored) {
				done.errored=true;
				return doCallback(err)
			    }
			    return
			}
			if(++completed>=mounts.length) {
			    doCallback(null)
			}

		    }
		    mounts.forEach(function(mount) {
			if(!mount.type.syncfs) {
			    return done(null)
			}
			mount.type.syncfs(mount,populate,done)
		    }
		    )
		}
		,mount:function(type,opts,mountpoint) {
		    var root=mountpoint==="/";
		    var pseudo=!mountpoint;
		    var node;
		    if(root&&FS.root) {
			throw new FS.ErrnoError(16)
		    }
		    else if(!root&&!pseudo) {
			var lookup=FS.lookupPath(mountpoint, {
			    follow_mount:false
			}
			);
			mountpoint=lookup.path;
			node=lookup.node;
			if(FS.isMountpoint(node)) {
			    throw new FS.ErrnoError(16)
			}
			if(!FS.isDir(node.mode)) {
			    throw new FS.ErrnoError(20)
			}

		    }
		    var mount= {
			type:type,opts:opts,mountpoint:mountpoint,mounts:[]
		    }
		    ;
		    var mountRoot=type.mount(mount);
		    mountRoot.mount=mount;
		    mount.root=mountRoot;
		    if(root) {
			FS.root=mountRoot
		    }
		    else if(node) {
			node.mounted=mount;
			if(node.mount) {
			    node.mount.mounts.push(mount)
			}

		    }
		    return mountRoot
		}
		,unmount:function(mountpoint) {
		    var lookup=FS.lookupPath(mountpoint, {
			follow_mount:false
		    }
		    );
		    if(!FS.isMountpoint(lookup.node)) {
			throw new FS.ErrnoError(22)
		    }
		    var node=lookup.node;
		    var mount=node.mounted;
		    var mounts=FS.getMounts(mount);
		    Object.keys(FS.nameTable).forEach(function(hash) {
			var current=FS.nameTable[hash];
			while(current) {
			    var next=current.name_next;
			    if(mounts.indexOf(current.mount)!==-1) {
				FS.destroyNode(current)
			    }
			    current=next
			}

		    }
		    );
		    node.mounted=null;
		    var idx=node.mount.mounts.indexOf(mount);
		    node.mount.mounts.splice(idx,1)
		}
		,lookup:function(parent,name) {
		    return parent.node_ops.lookup(parent,name)
		}
		,mknod:function(path,mode,dev) {
		    var lookup=FS.lookupPath(path, {
			parent:true
		    }
		    );
		    var parent=lookup.node;
		    var name=PATH.basename(path);
		    if(!name||name==="."||name==="..") {
			throw new FS.ErrnoError(22)
		    }
		    var err=FS.mayCreate(parent,name);
		    if(err) {
			throw new FS.ErrnoError(err)
		    }
		    if(!parent.node_ops.mknod) {
			throw new FS.ErrnoError(1)
		    }
		    return parent.node_ops.mknod(parent,name,mode,dev)
		}
		,create:function(path,mode) {
		    mode=mode!==undefined?mode:438;
		    mode&=4095;
		    mode|=32768;
		    return FS.mknod(path,mode,0)
		}
		,mkdir:function(path,mode) {
		    mode=mode!==undefined?mode:511;
		    mode&=511|512;
		    mode|=16384;
		    return FS.mknod(path,mode,0)
		}
		,mkdirTree:function(path,mode) {
		    var dirs=path.split("/");
		    var d="";
		    for(var i=0;
			i<dirs.length;
			++i) {
			    if(!dirs[i])continue;
			    d+="/"+dirs[i];
			    try {
				FS.mkdir(d,mode)
			    }
			    catch(e) {
				if(e.errno!=17)throw e
			    }

			}

		}
		,mkdev:function(path,mode,dev) {
		    if(typeof dev==="undefined") {
			dev=mode;
			mode=438
		    }
		    mode|=8192;
		    return FS.mknod(path,mode,dev)
		}
		,symlink:function(oldpath,newpath) {
		    if(!PATH.resolve(oldpath)) {
			throw new FS.ErrnoError(2)
		    }
		    var lookup=FS.lookupPath(newpath, {
			parent:true
		    }
		    );
		    var parent=lookup.node;
		    if(!parent) {
			throw new FS.ErrnoError(2)
		    }
		    var newname=PATH.basename(newpath);
		    var err=FS.mayCreate(parent,newname);
		    if(err) {
			throw new FS.ErrnoError(err)
		    }
		    if(!parent.node_ops.symlink) {
			throw new FS.ErrnoError(1)
		    }
		    return parent.node_ops.symlink(parent,newname,oldpath)
		}
		,rename:function(old_path,new_path) {
		    var old_dirname=PATH.dirname(old_path);
		    var new_dirname=PATH.dirname(new_path);
		    var old_name=PATH.basename(old_path);
		    var new_name=PATH.basename(new_path);
		    var lookup,old_dir,new_dir;
		    try {
			lookup=FS.lookupPath(old_path, {
			    parent:true
			}
			);
			old_dir=lookup.node;
			lookup=FS.lookupPath(new_path, {
			    parent:true
			}
			);
			new_dir=lookup.node
		    }
		    catch(e) {
			throw new FS.ErrnoError(16)
		    }
		    if(!old_dir||!new_dir)throw new FS.ErrnoError(2);
		    if(old_dir.mount!==new_dir.mount) {
			throw new FS.ErrnoError(18)
		    }
		    var old_node=FS.lookupNode(old_dir,old_name);
		    var relative=PATH.relative(old_path,new_dirname);
		    if(relative.charAt(0)!==".") {
			throw new FS.ErrnoError(22)
		    }
		    relative=PATH.relative(new_path,old_dirname);
		    if(relative.charAt(0)!==".") {
			throw new FS.ErrnoError(39)
		    }
		    var new_node;
		    try {
			new_node=FS.lookupNode(new_dir,new_name)
		    }
		    catch(e) {

		    }
		    if(old_node===new_node) {
			return
		    }
		    var isdir=FS.isDir(old_node.mode);
		    var err=FS.mayDelete(old_dir,old_name,isdir);
		    if(err) {
			throw new FS.ErrnoError(err)
		    }
		    err=new_node?FS.mayDelete(new_dir,new_name,isdir):FS.mayCreate(new_dir,new_name);
		    if(err) {
			throw new FS.ErrnoError(err)
		    }
		    if(!old_dir.node_ops.rename) {
			throw new FS.ErrnoError(1)
		    }
		    if(FS.isMountpoint(old_node)||new_node&&FS.isMountpoint(new_node)) {
			throw new FS.ErrnoError(16)
		    }
		    if(new_dir!==old_dir) {
			err=FS.nodePermissions(old_dir,"w");
			if(err) {
			    throw new FS.ErrnoError(err)
			}

		    }
		    try {
			if(FS.trackingDelegate["willMovePath"]) {
			    FS.trackingDelegate["willMovePath"](old_path,new_path)
			}

		    }
		    catch(e) {
			console.log("FS.trackingDelegate['willMovePath']('"+old_path+"', '"+new_path+"') threw an exception: "+e.message)
		    }
		    FS.hashRemoveNode(old_node);
		    try {
			old_dir.node_ops.rename(old_node,new_dir,new_name)
		    }
		    catch(e) {
			throw e
		    }
		    finally {
			FS.hashAddNode(old_node)
		    }
		    try {
			if(FS.trackingDelegate["onMovePath"])FS.trackingDelegate["onMovePath"](old_path,new_path)
		    }
		    catch(e) {
			console.log("FS.trackingDelegate['onMovePath']('"+old_path+"', '"+new_path+"') threw an exception: "+e.message)
		    }

		}
		,rmdir:function(path) {
		    var lookup=FS.lookupPath(path, {
			parent:true
		    }
		    );
		    var parent=lookup.node;
		    var name=PATH.basename(path);
		    var node=FS.lookupNode(parent,name);
		    var err=FS.mayDelete(parent,name,true);
		    if(err) {
			throw new FS.ErrnoError(err)
		    }
		    if(!parent.node_ops.rmdir) {
			throw new FS.ErrnoError(1)
		    }
		    if(FS.isMountpoint(node)) {
			throw new FS.ErrnoError(16)
		    }
		    try {
			if(FS.trackingDelegate["willDeletePath"]) {
			    FS.trackingDelegate["willDeletePath"](path)
			}

		    }
		    catch(e) {
			console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: "+e.message)
		    }
		    parent.node_ops.rmdir(parent,name);
		    FS.destroyNode(node);
		    try {
			if(FS.trackingDelegate["onDeletePath"])FS.trackingDelegate["onDeletePath"](path)
		    }
		    catch(e) {
			console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: "+e.message)
		    }

		}
		,readdir:function(path) {
		    var lookup=FS.lookupPath(path, {
			follow:true
		    }
		    );
		    var node=lookup.node;
		    if(!node.node_ops.readdir) {
			throw new FS.ErrnoError(20)
		    }
		    return node.node_ops.readdir(node)
		}
		,unlink:function(path) {
		    var lookup=FS.lookupPath(path, {
			parent:true
		    }
		    );
		    var parent=lookup.node;
		    var name=PATH.basename(path);
		    var node=FS.lookupNode(parent,name);
		    var err=FS.mayDelete(parent,name,false);
		    if(err) {
			throw new FS.ErrnoError(err)
		    }
		    if(!parent.node_ops.unlink) {
			throw new FS.ErrnoError(1)
		    }
		    if(FS.isMountpoint(node)) {
			throw new FS.ErrnoError(16)
		    }
		    try {
			if(FS.trackingDelegate["willDeletePath"]) {
			    FS.trackingDelegate["willDeletePath"](path)
			}

		    }
		    catch(e) {
			console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: "+e.message)
		    }
		    parent.node_ops.unlink(parent,name);
		    FS.destroyNode(node);
		    try {
			if(FS.trackingDelegate["onDeletePath"])FS.trackingDelegate["onDeletePath"](path)
		    }
		    catch(e) {
			console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: "+e.message)
		    }

		}
		,readlink:function(path) {
		    var lookup=FS.lookupPath(path);
		    var link=lookup.node;
		    if(!link) {
			throw new FS.ErrnoError(2)
		    }
		    if(!link.node_ops.readlink) {
			throw new FS.ErrnoError(22)
		    }
		    return PATH.resolve(FS.getPath(link.parent),link.node_ops.readlink(link))
		}
		,stat:function(path,dontFollow) {
		    var lookup=FS.lookupPath(path, {
			follow:!dontFollow
		    }
		    );
		    var node=lookup.node;
		    if(!node) {
			throw new FS.ErrnoError(2)
		    }
		    if(!node.node_ops.getattr) {
			throw new FS.ErrnoError(1)
		    }
		    return node.node_ops.getattr(node)
		}
		,lstat:function(path) {
		    return FS.stat(path,true)
		}
		,chmod:function(path,mode,dontFollow) {
		    var node;
		    if(typeof path==="string") {
			var lookup=FS.lookupPath(path, {
			    follow:!dontFollow
			}
			);
			node=lookup.node
		    }
		    else {
			node=path
		    }
		    if(!node.node_ops.setattr) {
			throw new FS.ErrnoError(1)
		    }
		    node.node_ops.setattr(node, {
			mode:mode&4095|node.mode&~4095,timestamp:Date.now()
		    }
		    )
		}
		,lchmod:function(path,mode) {
		    FS.chmod(path,mode,true)
		}
		,fchmod:function(fd,mode) {
		    var stream=FS.getStream(fd);
		    if(!stream) {
			throw new FS.ErrnoError(9)
		    }
		    FS.chmod(stream.node,mode)
		}
		,chown:function(path,uid,gid,dontFollow) {
		    var node;
		    if(typeof path==="string") {
			var lookup=FS.lookupPath(path, {
			    follow:!dontFollow
			}
			);
			node=lookup.node
		    }
		    else {
			node=path
		    }
		    if(!node.node_ops.setattr) {
			throw new FS.ErrnoError(1)
		    }
		    node.node_ops.setattr(node, {
			timestamp:Date.now()
		    }
		    )
		}
		,lchown:function(path,uid,gid) {
		    FS.chown(path,uid,gid,true)
		}
		,fchown:function(fd,uid,gid) {
		    var stream=FS.getStream(fd);
		    if(!stream) {
			throw new FS.ErrnoError(9)
		    }
		    FS.chown(stream.node,uid,gid)
		}
		,truncate:function(path,len) {
		    if(len<0) {
			throw new FS.ErrnoError(22)
		    }
		    var node;
		    if(typeof path==="string") {
			var lookup=FS.lookupPath(path, {
			    follow:true
			}
			);
			node=lookup.node
		    }
		    else {
			node=path
		    }
		    if(!node.node_ops.setattr) {
			throw new FS.ErrnoError(1)
		    }
		    if(FS.isDir(node.mode)) {
			throw new FS.ErrnoError(21)
		    }
		    if(!FS.isFile(node.mode)) {
			throw new FS.ErrnoError(22)
		    }
		    var err=FS.nodePermissions(node,"w");
		    if(err) {
			throw new FS.ErrnoError(err)
		    }
		    node.node_ops.setattr(node, {
			size:len,timestamp:Date.now()
		    }
		    )
		}
		,ftruncate:function(fd,len) {
		    var stream=FS.getStream(fd);
		    if(!stream) {
			throw new FS.ErrnoError(9)
		    }
		    if((stream.flags&2097155)===0) {
			throw new FS.ErrnoError(22)
		    }
		    FS.truncate(stream.node,len)
		}
		,utime:function(path,atime,mtime) {
		    var lookup=FS.lookupPath(path, {
			follow:true
		    }
		    );
		    var node=lookup.node;
		    node.node_ops.setattr(node, {
			timestamp:Math.max(atime,mtime)
		    }
		    )
		}
		,open:function(path,flags,mode,fd_start,fd_end) {
		    if(path==="") {
			throw new FS.ErrnoError(2)
		    }
		    flags=typeof flags==="string"?FS.modeStringToFlags(flags):flags;
		    mode=typeof mode==="undefined"?438:mode;
		    if(flags&64) {
			mode=mode&4095|32768
		    }
		    else {
			mode=0
		    }
		    var node;
		    if(typeof path==="object") {
			node=path
		    }
		    else {
			path=PATH.normalize(path);
			try {
			    var lookup=FS.lookupPath(path, {
				follow:!(flags&131072)
			    }
			    );
			    node=lookup.node
			}
			catch(e) {

			}

		    }
		    var created=false;
		    if(flags&64) {
			if(node) {
			    if(flags&128) {
				throw new FS.ErrnoError(17)
			    }

			}
			else {
			    node=FS.mknod(path,mode,0);
			    created=true
			}

		    }
		    if(!node) {
			throw new FS.ErrnoError(2)
		    }
		    if(FS.isChrdev(node.mode)) {
			flags&=~512
		    }
		    if(flags&65536&&!FS.isDir(node.mode)) {
			throw new FS.ErrnoError(20)
		    }
		    if(!created) {
			var err=FS.mayOpen(node,flags);
			if(err) {
			    throw new FS.ErrnoError(err)
			}

		    }
		    if(flags&512) {
			FS.truncate(node,0)
		    }
		    flags&=~(128|512);
		    var stream=FS.createStream( {
			node:node,path:FS.getPath(node),flags:flags,seekable:true,position:0,stream_ops:node.stream_ops,ungotten:[],error:false
		    }
			,fd_start,fd_end);
		    if(stream.stream_ops.open) {
			stream.stream_ops.open(stream)
		    }
		    if(Module["logReadFiles"]&&!(flags&1)) {
			if(!FS.readFiles)FS.readFiles= {

			}
			;
			if(!(path in FS.readFiles)) {
			    FS.readFiles[path]=1;
			    console.log("FS.trackingDelegate error on read file: "+path)
			}

		    }
		    try {
			if(FS.trackingDelegate["onOpenFile"]) {
			    var trackingFlags=0;
			    if((flags&2097155)!==1) {
				trackingFlags|=FS.tracking.openFlags.READ
			    }
			    if((flags&2097155)!==0) {
				trackingFlags|=FS.tracking.openFlags.WRITE
			    }
			    FS.trackingDelegate["onOpenFile"](path,trackingFlags)
			}

		    }
		    catch(e) {
			console.log("FS.trackingDelegate['onOpenFile']('"+path+"', flags) threw an exception: "+e.message)
		    }
		    return stream
		}
		,close:function(stream) {
		    if(FS.isClosed(stream)) {
			throw new FS.ErrnoError(9)
		    }
		    if(stream.getdents)stream.getdents=null;
		    try {
			if(stream.stream_ops.close) {
			    stream.stream_ops.close(stream)
			}

		    }
		    catch(e) {
			throw e
		    }
		    finally {
			FS.closeStream(stream.fd)
		    }
		    stream.fd=null
		}
		,isClosed:function(stream) {
		    return stream.fd===null
		}
		,llseek:function(stream,offset,whence) {
		    if(FS.isClosed(stream)) {
			throw new FS.ErrnoError(9)
		    }
		    if(!stream.seekable||!stream.stream_ops.llseek) {
			throw new FS.ErrnoError(29)
		    }
		    if(whence!=0&&whence!=1&&whence!=2) {
			throw new FS.ErrnoError(22)
		    }
		    stream.position=stream.stream_ops.llseek(stream,offset,whence);
		    stream.ungotten=[];
		    return stream.position
		}
		,read:function(stream,buffer,offset,length,position) {
		    if(length<0||position<0) {
			throw new FS.ErrnoError(22)
		    }
		    if(FS.isClosed(stream)) {
			throw new FS.ErrnoError(9)
		    }
		    if((stream.flags&2097155)===1) {
			throw new FS.ErrnoError(9)
		    }
		    if(FS.isDir(stream.node.mode)) {
			throw new FS.ErrnoError(21)
		    }
		    if(!stream.stream_ops.read) {
			throw new FS.ErrnoError(22)
		    }
		    var seeking=typeof position!=="undefined";
		    if(!seeking) {
			position=stream.position
		    }
		    else if(!stream.seekable) {
			throw new FS.ErrnoError(29)
		    }
		    var bytesRead=stream.stream_ops.read(stream,buffer,offset,length,position);
		    if(!seeking)stream.position+=bytesRead;
		    return bytesRead
		}
		,write:function(stream,buffer,offset,length,position,canOwn) {
		    if(length<0||position<0) {
			throw new FS.ErrnoError(22)
		    }
		    if(FS.isClosed(stream)) {
			throw new FS.ErrnoError(9)
		    }
		    if((stream.flags&2097155)===0) {
			throw new FS.ErrnoError(9)
		    }
		    if(FS.isDir(stream.node.mode)) {
			throw new FS.ErrnoError(21)
		    }
		    if(!stream.stream_ops.write) {
			throw new FS.ErrnoError(22)
		    }
		    if(stream.flags&1024) {
			FS.llseek(stream,0,2)
		    }
		    var seeking=typeof position!=="undefined";
		    if(!seeking) {
			position=stream.position
		    }
		    else if(!stream.seekable) {
			throw new FS.ErrnoError(29)
		    }
		    var bytesWritten=stream.stream_ops.write(stream,buffer,offset,length,position,canOwn);
		    if(!seeking)stream.position+=bytesWritten;
		    try {
			if(stream.path&&FS.trackingDelegate["onWriteToFile"])FS.trackingDelegate["onWriteToFile"](stream.path)
		    }
		    catch(e) {
			console.log("FS.trackingDelegate['onWriteToFile']('"+stream.path+"') threw an exception: "+e.message)
		    }
		    return bytesWritten
		}
		,allocate:function(stream,offset,length) {
		    if(FS.isClosed(stream)) {
			throw new FS.ErrnoError(9)
		    }
		    if(offset<0||length<=0) {
			throw new FS.ErrnoError(22)
		    }
		    if((stream.flags&2097155)===0) {
			throw new FS.ErrnoError(9)
		    }
		    if(!FS.isFile(stream.node.mode)&&!FS.isDir(stream.node.mode)) {
			throw new FS.ErrnoError(19)
		    }
		    if(!stream.stream_ops.allocate) {
			throw new FS.ErrnoError(95)
		    }
		    stream.stream_ops.allocate(stream,offset,length)
		}
		,mmap:function(stream,buffer,offset,length,position,prot,flags) {
		    if((stream.flags&2097155)===1) {
			throw new FS.ErrnoError(13)
		    }
		    if(!stream.stream_ops.mmap) {
			throw new FS.ErrnoError(19)
		    }
		    return stream.stream_ops.mmap(stream,buffer,offset,length,position,prot,flags)
		}
		,msync:function(stream,buffer,offset,length,mmapFlags) {
		    if(!stream||!stream.stream_ops.msync) {
			return 0
		    }
		    return stream.stream_ops.msync(stream,buffer,offset,length,mmapFlags)
		}
		,munmap:function(stream) {
		    return 0
		}
		,ioctl:function(stream,cmd,arg) {
		    if(!stream.stream_ops.ioctl) {
			throw new FS.ErrnoError(25)
		    }
		    return stream.stream_ops.ioctl(stream,cmd,arg)
		}
		,readFile:function(path,opts) {
		    opts=opts|| {

		    }
		    ;
		    opts.flags=opts.flags||"r";
		    opts.encoding=opts.encoding||"binary";
		    if(opts.encoding!=="utf8"&&opts.encoding!=="binary") {
			throw new Error('Invalid encoding type "'+opts.encoding+'"')
		    }
		    var ret;
		    var stream=FS.open(path,opts.flags);
		    var stat=FS.stat(path);
		    var length=stat.size;
		    var buf=new Uint8Array(length);
		    FS.read(stream,buf,0,length,0);
		    if(opts.encoding==="utf8") {
			ret=UTF8ArrayToString(buf,0)
		    }
		    else if(opts.encoding==="binary") {
			ret=buf
		    }
		    FS.close(stream);
		    return ret
		}
		,writeFile:function(path,data,opts) {
		    opts=opts|| {

		    }
		    ;
		    opts.flags=opts.flags||"w";
		    var stream=FS.open(path,opts.flags,opts.mode);
		    if(typeof data==="string") {
			var buf=new Uint8Array(lengthBytesUTF8(data)+1);
			var actualNumBytes=stringToUTF8Array(data,buf,0,buf.length);
			FS.write(stream,buf,0,actualNumBytes,undefined,opts.canOwn)
		    }
		    else if(ArrayBuffer.isView(data)) {
			FS.write(stream,data,0,data.byteLength,undefined,opts.canOwn)
		    }
		    else {
			throw new Error("Unsupported data type")
		    }
		    FS.close(stream)
		}
		,cwd:function() {
		    return FS.currentPath
		}
		,chdir:function(path) {
		    var lookup=FS.lookupPath(path, {
			follow:true
		    }
		    );
		    if(lookup.node===null) {
			throw new FS.ErrnoError(2)
		    }
		    if(!FS.isDir(lookup.node.mode)) {
			throw new FS.ErrnoError(20)
		    }
		    var err=FS.nodePermissions(lookup.node,"x");
		    if(err) {
			throw new FS.ErrnoError(err)
		    }
		    FS.currentPath=lookup.path
		}
		,createDefaultDirectories:function() {
		    FS.mkdir("/tmp");
		    FS.mkdir("/home");
		    FS.mkdir("/home/web_user")
		}
		,createDefaultDevices:function() {
		    FS.mkdir("/dev");
		    FS.registerDevice(FS.makedev(1,3), {
			read:function() {
			    return 0
			}
			,write:function(stream,buffer,offset,length,pos) {
			    return length
			}

		    }
		    );
		    FS.mkdev("/dev/null",FS.makedev(1,3));
		    TTY.register(FS.makedev(5,0),TTY.default_tty_ops);
		    TTY.register(FS.makedev(6,0),TTY.default_tty1_ops);
		    FS.mkdev("/dev/tty",FS.makedev(5,0));
		    FS.mkdev("/dev/tty1",FS.makedev(6,0));
		    var random_device;
		    if(typeof crypto==="object"&&typeof crypto["getRandomValues"]==="function") {
			var randomBuffer=new Uint8Array(1);
			random_device=function() {
			    crypto.getRandomValues(randomBuffer);
			    return randomBuffer[0]
			}

		    }
		    else if(ENVIRONMENT_IS_NODE) {
			try {
			    var crypto_module=require("crypto");
			    random_device=function() {
				return crypto_module["randomBytes"](1)[0]
			    }

			}
			catch(e) {
			    random_device=function() {
				return Math.random()*256|0
			    }

			}

		    }
		    else {
			random_device=function() {
			    abort("random_device")
			}

		    }
		    FS.createDevice("/dev","random",random_device);
		    FS.createDevice("/dev","urandom",random_device);
		    FS.mkdir("/dev/shm");
		    FS.mkdir("/dev/shm/tmp")
		}
		,createSpecialDirectories:function() {
		    FS.mkdir("/proc");
		    FS.mkdir("/proc/self");
		    FS.mkdir("/proc/self/fd");
		    FS.mount( {
			mount:function() {
			    var node=FS.createNode("/proc/self","fd",16384|511,73);
			    node.node_ops= {
				lookup:function(parent,name) {
				    var fd=+name;
				    var stream=FS.getStream(fd);
				    if(!stream)throw new FS.ErrnoError(9);
				    var ret= {
					parent:null,mount: {
					    mountpoint:"fake"
					}
					,node_ops: {
					    readlink:function() {
						return stream.path
					    }

					}

				    }
				    ;
				    ret.parent=ret;
				    return ret
				}

			    }
			    ;
			    return node
			}

		    }
			, {

			}
			,"/proc/self/fd")
		}
		,createStandardStreams:function() {
		    if(Module["stdin"]) {
			FS.createDevice("/dev","stdin",Module["stdin"])
		    }
		    else {
			FS.symlink("/dev/tty","/dev/stdin")
		    }
		    if(Module["stdout"]) {
			FS.createDevice("/dev","stdout",null,Module["stdout"])
		    }
		    else {
			FS.symlink("/dev/tty","/dev/stdout")
		    }
		    if(Module["stderr"]) {
			FS.createDevice("/dev","stderr",null,Module["stderr"])
		    }
		    else {
			FS.symlink("/dev/tty1","/dev/stderr")
		    }
		    var stdin=FS.open("/dev/stdin","r");
		    var stdout=FS.open("/dev/stdout","w");
		    var stderr=FS.open("/dev/stderr","w")
		}
		,ensureErrnoError:function() {
		    if(FS.ErrnoError)return;
		    FS.ErrnoError=function ErrnoError(errno,node) {
			this.node=node;
			this.setErrno=function(errno) {
			    this.errno=errno
			}
			;
			this.setErrno(errno);
			this.message="FS error";
			if(this.stack)Object.defineProperty(this,"stack", {
			    value:(new Error).stack,writable:true
			}
			)
		    }
		    ;
		    FS.ErrnoError.prototype=new Error;
		    FS.ErrnoError.prototype.constructor=FS.ErrnoError;
		    [2].forEach(function(code) {
			FS.genericErrors[code]=new FS.ErrnoError(code);
			FS.genericErrors[code].stack="<generic error, no stack>"
		    }
		    )
		}
		,staticInit:function() {
		    FS.ensureErrnoError();
		    FS.nameTable=new Array(4096);
		    FS.mount(MEMFS, {

		    }
			,"/");
		    FS.createDefaultDirectories();
		    FS.createDefaultDevices();
		    FS.createSpecialDirectories();
		    FS.filesystems= {
			"MEMFS":MEMFS,"IDBFS":IDBFS,"NODEFS":NODEFS,"WORKERFS":WORKERFS
		    }

		}
		,init:function(input,output,error) {
		    FS.init.initialized=true;
		    FS.ensureErrnoError();
		    Module["stdin"]=input||Module["stdin"];
		    Module["stdout"]=output||Module["stdout"];
		    Module["stderr"]=error||Module["stderr"];
		    FS.createStandardStreams()
		}
		,quit:function() {
		    FS.init.initialized=false;
		    var fflush=Module["_fflush"];
		    if(fflush)fflush(0);
		    for(var i=0;
			i<FS.streams.length;
			i++) {
			    var stream=FS.streams[i];
			    if(!stream) {
				continue
			    }
			    FS.close(stream)
			}

		}
		,getMode:function(canRead,canWrite) {
		    var mode=0;
		    if(canRead)mode|=292|73;
		    if(canWrite)mode|=146;
		    return mode
		}
		,joinPath:function(parts,forceRelative) {
		    var path=PATH.join.apply(null,parts);
		    if(forceRelative&&path[0]=="/")path=path.substr(1);
		    return path
		}
		,absolutePath:function(relative,base) {
		    return PATH.resolve(base,relative)
		}
		,standardizePath:function(path) {
		    return PATH.normalize(path)
		}
		,findObject:function(path,dontResolveLastLink) {
		    var ret=FS.analyzePath(path,dontResolveLastLink);
		    if(ret.exists) {
			return ret.object
		    }
		    else {
			___setErrNo(ret.error);
			return null
		    }

		}
		,analyzePath:function(path,dontResolveLastLink) {
		    try {
			var lookup=FS.lookupPath(path, {
			    follow:!dontResolveLastLink
			}
			);
			path=lookup.path
		    }
		    catch(e) {

		    }
		    var ret= {
			isRoot:false,exists:false,error:0,name:null,path:null,object:null,parentExists:false,parentPath:null,parentObject:null
		    }
		    ;
		    try {
			var lookup=FS.lookupPath(path, {
			    parent:true
			}
			);
			ret.parentExists=true;
			ret.parentPath=lookup.path;
			ret.parentObject=lookup.node;
			ret.name=PATH.basename(path);
			lookup=FS.lookupPath(path, {
			    follow:!dontResolveLastLink
			}
			);
			ret.exists=true;
			ret.path=lookup.path;
			ret.object=lookup.node;
			ret.name=lookup.node.name;
			ret.isRoot=lookup.path==="/"
		    }
		    catch(e) {
			ret.error=e.errno
		    }
		    return ret
		}
		,createFolder:function(parent,name,canRead,canWrite) {
		    var path=PATH.join2(typeof parent==="string"?parent:FS.getPath(parent),name);
		    var mode=FS.getMode(canRead,canWrite);
		    return FS.mkdir(path,mode)
		}
		,createPath:function(parent,path,canRead,canWrite) {
		    parent=typeof parent==="string"?parent:FS.getPath(parent);
		    var parts=path.split("/").reverse();
		    while(parts.length) {
			var part=parts.pop();
			if(!part)continue;
			var current=PATH.join2(parent,part);
			try {
			    FS.mkdir(current)
			}
			catch(e) {

			}
			parent=current
		    }
		    return current
		}
		,createFile:function(parent,name,properties,canRead,canWrite) {
		    var path=PATH.join2(typeof parent==="string"?parent:FS.getPath(parent),name);
		    var mode=FS.getMode(canRead,canWrite);
		    return FS.create(path,mode)
		}
		,createDataFile:function(parent,name,data,canRead,canWrite,canOwn) {
		    var path=name?PATH.join2(typeof parent==="string"?parent:FS.getPath(parent),name):parent;
		    var mode=FS.getMode(canRead,canWrite);
		    var node=FS.create(path,mode);
		    if(data) {
			if(typeof data==="string") {
			    var arr=new Array(data.length);
			    for(var i=0,len=data.length;
				i<len;
				++i)arr[i]=data.charCodeAt(i);
			    data=arr
			}
			FS.chmod(node,mode|146);
			var stream=FS.open(node,"w");
			FS.write(stream,data,0,data.length,0,canOwn);
			FS.close(stream);
			FS.chmod(node,mode)
		    }
		    return node
		}
		,createDevice:function(parent,name,input,output) {
		    var path=PATH.join2(typeof parent==="string"?parent:FS.getPath(parent),name);
		    var mode=FS.getMode(!!input,!!output);
		    if(!FS.createDevice.major)FS.createDevice.major=64;
		    var dev=FS.makedev(FS.createDevice.major++,0);
		    FS.registerDevice(dev, {
			open:function(stream) {
			    stream.seekable=false
			}
			,close:function(stream) {
			    if(output&&output.buffer&&output.buffer.length) {
				output(10)
			    }

			}
			,read:function(stream,buffer,offset,length,pos) {
			    var bytesRead=0;
			    for(var i=0;
				i<length;
				i++) {
				    var result;
				    try {
					result=input()
				    }
				    catch(e) {
					throw new FS.ErrnoError(5)
				    }
				    if(result===undefined&&bytesRead===0) {
					throw new FS.ErrnoError(11)
				    }
				    if(result===null||result===undefined)break;
				    bytesRead++;
				    buffer[offset+i]=result
				}
			    if(bytesRead) {
				stream.node.timestamp=Date.now()
			    }
			    return bytesRead
			}
			,write:function(stream,buffer,offset,length,pos) {
			    for(var i=0;
				i<length;
				i++) {
				    try {
					output(buffer[offset+i])
				    }
				    catch(e) {
					throw new FS.ErrnoError(5)
				    }

				}
			    if(length) {
				stream.node.timestamp=Date.now()
			    }
			    return i
			}

		    }
		    );
		    return FS.mkdev(path,mode,dev)
		}
		,createLink:function(parent,name,target,canRead,canWrite) {
		    var path=PATH.join2(typeof parent==="string"?parent:FS.getPath(parent),name);
		    return FS.symlink(target,path)
		}
		,forceLoadFile:function(obj) {
		    if(obj.isDevice||obj.isFolder||obj.link||obj.contents)return true;
		    var success=true;
		    if(typeof XMLHttpRequest!=="undefined") {
			throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.")
		    }
		    else if(Module["read"]) {
			try {
			    obj.contents=intArrayFromString(Module["read"](obj.url),true);
			    obj.usedBytes=obj.contents.length
			}
			catch(e) {
			    success=false
			}

		    }
		    else {
			throw new Error("Cannot load without read() or XMLHttpRequest.")
		    }
		    if(!success)___setErrNo(5);
		    return success
		}
		,createLazyFile:function(parent,name,url,canRead,canWrite) {
		    function LazyUint8Array() {
			this.lengthKnown=false;
			this.chunks=[]
		    }
		    LazyUint8Array.prototype.get=function LazyUint8Array_get(idx) {
			if(idx>this.length-1||idx<0) {
			    return undefined
			}
			var chunkOffset=idx%this.chunkSize;
			var chunkNum=idx/this.chunkSize|0;
			return this.getter(chunkNum)[chunkOffset]
		    }
		    ;
		    LazyUint8Array.prototype.setDataGetter=function LazyUint8Array_setDataGetter(getter) {
			this.getter=getter
		    }
		    ;
		    LazyUint8Array.prototype.cacheLength=function LazyUint8Array_cacheLength() {
			var xhr=new XMLHttpRequest;
			xhr.open("HEAD",url,false);
			xhr.send(null);
			if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error("Couldn't load "+url+". Status: "+xhr.status);
			var datalength=Number(xhr.getResponseHeader("Content-length"));
			var header;
			var hasByteServing=(header=xhr.getResponseHeader("Accept-Ranges"))&&header==="bytes";
			var usesGzip=(header=xhr.getResponseHeader("Content-Encoding"))&&header==="gzip";
			var chunkSize=1024*1024;
			if(!hasByteServing)chunkSize=datalength;
			var doXHR=function(from,to) {
			    if(from>to)throw new Error("invalid range ("+from+", "+to+") or no bytes requested!");
			    if(to>datalength-1)throw new Error("only "+datalength+" bytes available! programmer error!");
			    var xhr=new XMLHttpRequest;
			    xhr.open("GET",url,false);
			    if(datalength!==chunkSize)xhr.setRequestHeader("Range","bytes="+from+"-"+to);
			    if(typeof Uint8Array!="undefined")xhr.responseType="arraybuffer";
			    if(xhr.overrideMimeType) {
				xhr.overrideMimeType("text/plain;charset=x-user-defined")
				}
				xhr.send(null);
				if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error("Couldn't load "+url+". Status: "+xhr.status);
				if(xhr.response!==undefined) {
				    return new Uint8Array(xhr.response||[])
				}
				else {
				    return intArrayFromString(xhr.responseText||"",true)
				}

			    }
			    ;
			    var lazyArray=this;
			    lazyArray.setDataGetter(function(chunkNum) {
				var start=chunkNum*chunkSize;
				var end=(chunkNum+1)*chunkSize-1;
				end=Math.min(end,datalength-1);
				if(typeof lazyArray.chunks[chunkNum]==="undefined") {
				    lazyArray.chunks[chunkNum]=doXHR(start,end)
				}
				if(typeof lazyArray.chunks[chunkNum]==="undefined")throw new Error("doXHR failed!");
				return lazyArray.chunks[chunkNum]
			    }
			    );
			    if(usesGzip||!datalength) {
				chunkSize=datalength=1;
				datalength=this.getter(0).length;
				chunkSize=datalength;
				console.log("LazyFiles on gzip forces download of the whole file when length is accessed")
			    }
			    this._length=datalength;
			    this._chunkSize=chunkSize;
			    this.lengthKnown=true
			}
			;
			if(typeof XMLHttpRequest!=="undefined") {
			    if(!ENVIRONMENT_IS_WORKER)throw"Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
			    var lazyArray=new LazyUint8Array;
			    Object.defineProperties(lazyArray, {
				length: {
				    get:function() {
					if(!this.lengthKnown) {
					    this.cacheLength()
					}
					return this._length
				    }

				}
				,chunkSize: {
				    get:function() {
					if(!this.lengthKnown) {
					    this.cacheLength()
					}
					return this._chunkSize
				    }

				}

			    }
			    );
			    var properties= {
				isDevice:false,contents:lazyArray
			    }

			}
			else {
			    var properties= {
				isDevice:false,url:url
			    }

			}
			var node=FS.createFile(parent,name,properties,canRead,canWrite);
			if(properties.contents) {
			    node.contents=properties.contents
			}
			else if(properties.url) {
			    node.contents=null;
			    node.url=properties.url
			}
			Object.defineProperties(node, {
			    usedBytes: {
				get:function() {
				    return this.contents.length
				}

			    }

			}
			);
			var stream_ops= {

			}
			;
			var keys=Object.keys(node.stream_ops);
			keys.forEach(function(key) {
			    var fn=node.stream_ops[key];
			    stream_ops[key]=function forceLoadLazyFile() {
				if(!FS.forceLoadFile(node)) {
				    throw new FS.ErrnoError(5)
				}
				return fn.apply(null,arguments)
			    }

			}
			);
			stream_ops.read=function stream_ops_read(stream,buffer,offset,length,position) {
			    if(!FS.forceLoadFile(node)) {
				throw new FS.ErrnoError(5)
			    }
			    var contents=stream.node.contents;
			    if(position>=contents.length)return 0;
			    var size=Math.min(contents.length-position,length);
			    if(contents.slice) {
				for(var i=0;
				    i<size;
				    i++) {
					buffer[offset+i]=contents[position+i]
				    }

			    }
			    else {
				for(var i=0;
				    i<size;
				    i++) {
					buffer[offset+i]=contents.get(position+i)
				    }

			    }
			    return size
			}
			;
			node.stream_ops=stream_ops;
			return node
		    }
			,createPreloadedFile:function(parent,name,url,canRead,canWrite,onload,onerror,dontCreateFile,canOwn,preFinish) {
			    Browser.init();
			    var fullname=name?PATH.resolve(PATH.join2(parent,name)):parent;
			    var dep=getUniqueRunDependency("cp "+fullname);
			    function processData(byteArray) {
				function finish(byteArray) {
				    if(preFinish)preFinish();
				    if(!dontCreateFile) {
					FS.createDataFile(parent,name,byteArray,canRead,canWrite,canOwn)
				    }
				    if(onload)onload();
				    removeRunDependency(dep)
				}
				var handled=false;
				Module["preloadPlugins"].forEach(function(plugin) {
				    if(handled)return;
				    if(plugin["canHandle"](fullname)) {
					plugin["handle"](byteArray,fullname,finish,function() {
					    if(onerror)onerror();
					    removeRunDependency(dep)
					}
					);
					handled=true
				    }

				}
				);
				if(!handled)finish(byteArray)
			    }
			    addRunDependency(dep);
			    if(typeof url=="string") {
				Browser.asyncLoad(url,function(byteArray) {
				    processData(byteArray)
				}
				    ,onerror)
			    }
			    else {
				processData(url)
			    }

			}
			,indexedDB:function() {
			    return window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB
			}
			,DB_NAME:function() {
			    return"EM_FS_"+window.location.pathname
			}
			,DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function(paths,onload,onerror) {
			    onload=onload||function() {

			    }
			    ;
			    onerror=onerror||function() {

			    }
			    ;
			    var indexedDB=FS.indexedDB();
			    try {
				var openRequest=indexedDB.open(FS.DB_NAME(),FS.DB_VERSION)
			    }
			    catch(e) {
				return onerror(e)
			    }
			    openRequest.onupgradeneeded=function openRequest_onupgradeneeded() {
				console.log("creating db");
				var db=openRequest.result;
				db.createObjectStore(FS.DB_STORE_NAME)
			    }
			    ;
			    openRequest.onsuccess=function openRequest_onsuccess() {
				var db=openRequest.result;
				var transaction=db.transaction([FS.DB_STORE_NAME],"readwrite");
				var files=transaction.objectStore(FS.DB_STORE_NAME);
				var ok=0,fail=0,total=paths.length;
				function finish() {
				    if(fail==0)onload();
				    else onerror()
				}
				paths.forEach(function(path) {
				    var putRequest=files.put(FS.analyzePath(path).object.contents,path);
				    putRequest.onsuccess=function putRequest_onsuccess() {
					ok++;
					if(ok+fail==total)finish()
				    }
				    ;
				    putRequest.onerror=function putRequest_onerror() {
					fail++;
					if(ok+fail==total)finish()
				    }

				}
				);
				transaction.onerror=onerror
			    }
			    ;
			    openRequest.onerror=onerror
			}
			,loadFilesFromDB:function(paths,onload,onerror) {
			    onload=onload||function() {

			    }
			    ;
			    onerror=onerror||function() {

			    }
			    ;
			    var indexedDB=FS.indexedDB();
			    try {
				var openRequest=indexedDB.open(FS.DB_NAME(),FS.DB_VERSION)
			    }
			    catch(e) {
				return onerror(e)
			    }
			    openRequest.onupgradeneeded=onerror;
			    openRequest.onsuccess=function openRequest_onsuccess() {
				var db=openRequest.result;
				try {
				    var transaction=db.transaction([FS.DB_STORE_NAME],"readonly")
				}
				catch(e) {
				    onerror(e);
				    return
				}
				var files=transaction.objectStore(FS.DB_STORE_NAME);
				var ok=0,fail=0,total=paths.length;
				function finish() {
				    if(fail==0)onload();
				    else onerror()
				}
				paths.forEach(function(path) {
				    var getRequest=files.get(path);
				    getRequest.onsuccess=function getRequest_onsuccess() {
					if(FS.analyzePath(path).exists) {
					    FS.unlink(path)
					}
					FS.createDataFile(PATH.dirname(path),PATH.basename(path),getRequest.result,true,true,true);
					ok++;
					if(ok+fail==total)finish()
				    }
				    ;
				    getRequest.onerror=function getRequest_onerror() {
					fail++;
					if(ok+fail==total)finish()
				    }

				}
				);
				transaction.onerror=onerror
			    }
			    ;
			    openRequest.onerror=onerror
			}

		}
		;
		var ERRNO_CODES= {
		    EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86
		}
		;
		var SYSCALLS= {
		    DEFAULT_POLLMASK:5,mappings: {

		    }
		    ,umask:511,calculateAt:function(dirfd,path) {
			if(path[0]!=="/") {
			    var dir;
			    if(dirfd===-100) {
				dir=FS.cwd()
			    }
			    else {
				var dirstream=FS.getStream(dirfd);
				if(!dirstream)throw new FS.ErrnoError(ERRNO_CODES.EBADF);
				dir=dirstream.path
			    }
			    path=PATH.join2(dir,path)
			}
			return path
		    }
		    ,doStat:function(func,path,buf) {
			try {
			    var stat=func(path)
			}
			catch(e) {
			    if(e&&e.node&&PATH.normalize(path)!==PATH.normalize(FS.getPath(e.node))) {
				return-ERRNO_CODES.ENOTDIR
			    }
			    throw e
			}
			HEAP32[buf>>2]=stat.dev;
			HEAP32[buf+4>>2]=0;
			HEAP32[buf+8>>2]=stat.ino;
			HEAP32[buf+12>>2]=stat.mode;
			HEAP32[buf+16>>2]=stat.nlink;
			HEAP32[buf+20>>2]=stat.uid;
			HEAP32[buf+24>>2]=stat.gid;
			HEAP32[buf+28>>2]=stat.rdev;
			HEAP32[buf+32>>2]=0;
			HEAP32[buf+36>>2]=stat.size;
			HEAP32[buf+40>>2]=4096;
			HEAP32[buf+44>>2]=stat.blocks;
			HEAP32[buf+48>>2]=stat.atime.getTime()/1e3|0;
			HEAP32[buf+52>>2]=0;
			HEAP32[buf+56>>2]=stat.mtime.getTime()/1e3|0;
			HEAP32[buf+60>>2]=0;
			HEAP32[buf+64>>2]=stat.ctime.getTime()/1e3|0;
			HEAP32[buf+68>>2]=0;
			HEAP32[buf+72>>2]=stat.ino;
			return 0
		    }
		    ,doMsync:function(addr,stream,len,flags) {
			var buffer=new Uint8Array(HEAPU8.subarray(addr,addr+len));
			FS.msync(stream,buffer,0,len,flags)
		    }
		    ,doMkdir:function(path,mode) {
			path=PATH.normalize(path);
			if(path[path.length-1]==="/")path=path.substr(0,path.length-1);
			FS.mkdir(path,mode,0);
			return 0
		    }
		    ,doMknod:function(path,mode,dev) {
			switch(mode&61440) {
			    case 32768:case 8192:case 24576:case 4096:case 49152:break;
			    default:return-ERRNO_CODES.EINVAL
			}
			FS.mknod(path,mode,dev);
			return 0
		    }
		    ,doReadlink:function(path,buf,bufsize) {
			if(bufsize<=0)return-ERRNO_CODES.EINVAL;
			var ret=FS.readlink(path);
			var len=Math.min(bufsize,lengthBytesUTF8(ret));
			var endChar=HEAP8[buf+len];
			stringToUTF8(ret,buf,bufsize+1);
			HEAP8[buf+len]=endChar;
			return len
		    }
		    ,doAccess:function(path,amode) {
			if(amode&~7) {
			    return-ERRNO_CODES.EINVAL
			}
			var node;
			var lookup=FS.lookupPath(path, {
			    follow:true
			}
			);
			node=lookup.node;
			var perms="";
			if(amode&4)perms+="r";
			if(amode&2)perms+="w";
			if(amode&1)perms+="x";
			if(perms&&FS.nodePermissions(node,perms)) {
			    return-ERRNO_CODES.EACCES
			}
			return 0
		    }
		    ,doDup:function(path,flags,suggestFD) {
			var suggest=FS.getStream(suggestFD);
			if(suggest)FS.close(suggest);
			return FS.open(path,flags,0,suggestFD,suggestFD).fd
		    }
		    ,doReadv:function(stream,iov,iovcnt,offset) {
			var ret=0;
			for(var i=0;
			    i<iovcnt;
			    i++) {
				var ptr=HEAP32[iov+i*8>>2];
				var len=HEAP32[iov+(i*8+4)>>2];
				var curr=FS.read(stream,HEAP8,ptr,len,offset);
				if(curr<0)return-1;
				ret+=curr;
				if(curr<len)break
			    }
			return ret
		    }
		    ,doWritev:function(stream,iov,iovcnt,offset) {
			var ret=0;
			for(var i=0;
			    i<iovcnt;
			    i++) {
				var ptr=HEAP32[iov+i*8>>2];
				var len=HEAP32[iov+(i*8+4)>>2];
				var curr=FS.write(stream,HEAP8,ptr,len,offset);
				if(curr<0)return-1;
				ret+=curr
			    }
			return ret
		    }
		    ,varargs:0,get:function(varargs) {
			SYSCALLS.varargs+=4;
			var ret=HEAP32[SYSCALLS.varargs-4>>2];
			return ret
		    }
		    ,getStr:function() {
			var ret=UTF8ToString(SYSCALLS.get());
			return ret
		    }
		    ,getStreamFromFD:function() {
			var stream=FS.getStream(SYSCALLS.get());
			if(!stream)throw new FS.ErrnoError(ERRNO_CODES.EBADF);
			return stream
		    }
		    ,getSocketFromFD:function() {
			var socket=SOCKFS.getSocket(SYSCALLS.get());
			if(!socket)throw new FS.ErrnoError(ERRNO_CODES.EBADF);
			return socket
		    }
		    ,getSocketAddress:function(allowNull) {
			var addrp=SYSCALLS.get(),addrlen=SYSCALLS.get();
			if(allowNull&&addrp===0)return null;
			var info=__read_sockaddr(addrp,addrlen);
			if(info.errno)throw new FS.ErrnoError(info.errno);
			info.addr=DNS.lookup_addr(info.addr)||info.addr;
			return info
		    }
		    ,get64:function() {
			var low=SYSCALLS.get(),high=SYSCALLS.get();
			return low
		    }
		    ,getZero:function() {
			SYSCALLS.get()
		    }

		}
;
function ___syscall10(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var path=SYSCALLS.getStr();
	FS.unlink(path);
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
var SOCKFS= {
    mount:function(mount) {
	Module["websocket"]=Module["websocket"]&&"object"===typeof Module["websocket"]?Module["websocket"]: {

	}
	;
	Module["websocket"]._callbacks= {

	}
	;
	Module["websocket"]["on"]=function(event,callback) {
	    if("function"===typeof callback) {
		this._callbacks[event]=callback
	    }
	    return this
	}
	;
	Module["websocket"].emit=function(event,param) {
	    if("function"===typeof this._callbacks[event]) {
		this._callbacks[event].call(this,param)
	    }

	}
	;
	return FS.createNode(null,"/",16384|511,0)
    }
    ,createSocket:function(family,type,protocol) {
	var streaming=type==1;
	if(protocol) {
	    assert(streaming==(protocol==6))
	}
	var sock= {
	    family:family,type:type,protocol:protocol,server:null,error:null,peers: {

	    }
	    ,pending:[],recv_queue:[],sock_ops:SOCKFS.websocket_sock_ops
	}
	;
	var name=SOCKFS.nextname();
	var node=FS.createNode(SOCKFS.root,name,49152,0);
	node.sock=sock;
	var stream=FS.createStream( {
	    path:name,node:node,flags:FS.modeStringToFlags("r+"),seekable:false,stream_ops:SOCKFS.stream_ops
	}
	);
	sock.stream=stream;
	return sock
    }
    ,getSocket:function(fd) {
	var stream=FS.getStream(fd);
	if(!stream||!FS.isSocket(stream.node.mode)) {
	    return null
	}
	return stream.node.sock
    }
    ,stream_ops: {
	poll:function(stream) {
	    var sock=stream.node.sock;
	    return sock.sock_ops.poll(sock)
	}
	,ioctl:function(stream,request,varargs) {
	    var sock=stream.node.sock;
	    return sock.sock_ops.ioctl(sock,request,varargs)
	}
	,read:function(stream,buffer,offset,length,position) {
	    var sock=stream.node.sock;
	    var msg=sock.sock_ops.recvmsg(sock,length);
	    if(!msg) {
		return 0
	    }
	    buffer.set(msg.buffer,offset);
	    return msg.buffer.length
	}
	,write:function(stream,buffer,offset,length,position) {
	    var sock=stream.node.sock;
	    return sock.sock_ops.sendmsg(sock,buffer,offset,length)
	}
	,close:function(stream) {
	    var sock=stream.node.sock;
	    sock.sock_ops.close(sock)
	}

    }
    ,nextname:function() {
	if(!SOCKFS.nextname.current) {
	    SOCKFS.nextname.current=0
	}
	return"socket["+SOCKFS.nextname.current+++"]"
    }
    ,websocket_sock_ops: {
	createPeer:function(sock,addr,port) {
	    var ws;
	    if(typeof addr==="object") {
		ws=addr;
		addr=null;
		port=null
	    }
	    if(ws) {
		if(ws._socket) {
		    addr=ws._socket.remoteAddress;
		    port=ws._socket.remotePort
		}
		else {
		    var result=/ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
		    if(!result) {
			throw new Error("WebSocket URL must be in the format ws(s)://address:port")
		    }
		    addr=result[1];
		    port=parseInt(result[2],10)
		}

	    }
	    else {
		try {
		    var runtimeConfig=Module["websocket"]&&"object"===typeof Module["websocket"];
		    var url="ws:#".replace("#","//");
		    if(runtimeConfig) {
			if("string"===typeof Module["websocket"]["url"]) {
			    url=Module["websocket"]["url"]
			}

		    }
		    if(url==="ws://"||url==="wss://") {
			var parts=addr.split("/");
			url=url+parts[0]+":"+port+"/"+parts.slice(1).join("/")
		    }
		    var subProtocols="binary";
		    if(runtimeConfig) {
			if("string"===typeof Module["websocket"]["subprotocol"]) {
			    subProtocols=Module["websocket"]["subprotocol"]
			}

		    }
		    subProtocols=subProtocols.replace(/^ +| +$/g,"").split(/ *, */);
		    var opts=ENVIRONMENT_IS_NODE? {
			"protocol":subProtocols.toString()
		    }
			:subProtocols;
		    if(runtimeConfig&&null===Module["websocket"]["subprotocol"]) {
			subProtocols="null";
			opts=undefined
		    }
		    var WebSocketConstructor;
		    if(ENVIRONMENT_IS_NODE) {
			WebSocketConstructor=require("ws")
		    }
		    else if(ENVIRONMENT_IS_WEB) {
			WebSocketConstructor=window["WebSocket"]
		    }
		    else {
			WebSocketConstructor=WebSocket
		    }
		    ws=new WebSocketConstructor(url,opts);
		    ws.binaryType="arraybuffer"
		}
		catch(e) {
		    throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH)
		}

	    }
	    var peer= {
		addr:addr,port:port,socket:ws,dgram_send_queue:[]
	    }
	    ;
	    SOCKFS.websocket_sock_ops.addPeer(sock,peer);
	    SOCKFS.websocket_sock_ops.handlePeerEvents(sock,peer);
	    if(sock.type===2&&typeof sock.sport!=="undefined") {
		peer.dgram_send_queue.push(new Uint8Array([255,255,255,255,"p".charCodeAt(0),"o".charCodeAt(0),"r".charCodeAt(0),"t".charCodeAt(0),(sock.sport&65280)>>8,sock.sport&255]))
	    }
	    return peer
	}
	,getPeer:function(sock,addr,port) {
	    return sock.peers[addr+":"+port]
	}
	,addPeer:function(sock,peer) {
	    sock.peers[peer.addr+":"+peer.port]=peer
	}
	,removePeer:function(sock,peer) {
	    delete sock.peers[peer.addr+":"+peer.port]
	}
	,handlePeerEvents:function(sock,peer) {
	    var first=true;
	    var handleOpen=function() {
		Module["websocket"].emit("open",sock.stream.fd);
		try {
		    var queued=peer.dgram_send_queue.shift();
		    while(queued) {
			peer.socket.send(queued);
			queued=peer.dgram_send_queue.shift()
		    }

		}
		catch(e) {
		    peer.socket.close()
		}

	    }
	    ;
	    function handleMessage(data) {
		assert(typeof data!=="string"&&data.byteLength!==undefined);
		if(data.byteLength==0) {
		    return
		}
		data=new Uint8Array(data);
		var wasfirst=first;
		first=false;
		if(wasfirst&&data.length===10&&data[0]===255&&data[1]===255&&data[2]===255&&data[3]===255&&data[4]==="p".charCodeAt(0)&&data[5]==="o".charCodeAt(0)&&data[6]==="r".charCodeAt(0)&&data[7]==="t".charCodeAt(0)) {
		    var newport=data[8]<<8|data[9];
		    SOCKFS.websocket_sock_ops.removePeer(sock,peer);
		    peer.port=newport;
		    SOCKFS.websocket_sock_ops.addPeer(sock,peer);
		    return
		}
		sock.recv_queue.push( {
		    addr:peer.addr,port:peer.port,data:data
		}
		);
		Module["websocket"].emit("message",sock.stream.fd)
	    }
	    if(ENVIRONMENT_IS_NODE) {
		peer.socket.on("open",handleOpen);
		peer.socket.on("message",function(data,flags) {
		    if(!flags.binary) {
			return
		    }
		    handleMessage(new Uint8Array(data).buffer)
		}
		);
		peer.socket.on("close",function() {
		    Module["websocket"].emit("close",sock.stream.fd)
		}
		);
		peer.socket.on("error",function(error) {
		    sock.error=ERRNO_CODES.ECONNREFUSED;
		    Module["websocket"].emit("error",[sock.stream.fd,sock.error,"ECONNREFUSED: Connection refused"])
		}
		)
	    }
	    else {
		peer.socket.onopen=handleOpen;
		peer.socket.onclose=function() {
		    Module["websocket"].emit("close",sock.stream.fd)
		}
		;
		peer.socket.onmessage=function peer_socket_onmessage(event) {
		    handleMessage(event.data)
		}
		;
		peer.socket.onerror=function(error) {
		    sock.error=ERRNO_CODES.ECONNREFUSED;
		    Module["websocket"].emit("error",[sock.stream.fd,sock.error,"ECONNREFUSED: Connection refused"])
		}

	    }

	}
	,poll:function(sock) {
	    if(sock.type===1&&sock.server) {
		return sock.pending.length?64|1:0
	    }
	    var mask=0;
	    var dest=sock.type===1?SOCKFS.websocket_sock_ops.getPeer(sock,sock.daddr,sock.dport):null;
	    if(sock.recv_queue.length||!dest||dest&&dest.socket.readyState===dest.socket.CLOSING||dest&&dest.socket.readyState===dest.socket.CLOSED) {
		mask|=64|1
	    }
	    if(!dest||dest&&dest.socket.readyState===dest.socket.OPEN) {
		mask|=4
	    }
	    if(dest&&dest.socket.readyState===dest.socket.CLOSING||dest&&dest.socket.readyState===dest.socket.CLOSED) {
		mask|=16
	    }
	    return mask
	}
	,ioctl:function(sock,request,arg) {
	    switch(request) {
		case 21531:var bytes=0;
		    if(sock.recv_queue.length) {
			bytes=sock.recv_queue[0].data.length
		    }
		    HEAP32[arg>>2]=bytes;
		    return 0;
		default:return ERRNO_CODES.EINVAL
	    }

	}
	,close:function(sock) {
	    if(sock.server) {
		try {
		    sock.server.close()
		}
		catch(e) {

		}
		sock.server=null
	    }
	    var peers=Object.keys(sock.peers);
	    for(var i=0;
		i<peers.length;
		i++) {
		    var peer=sock.peers[peers[i]];
		    try {
			peer.socket.close()
		    }
		    catch(e) {

		    }
		    SOCKFS.websocket_sock_ops.removePeer(sock,peer)
		}
	    return 0
	}
	,bind:function(sock,addr,port) {
	    if(typeof sock.saddr!=="undefined"||typeof sock.sport!=="undefined") {
		throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
	    }
	    sock.saddr=addr;
	    sock.sport=port;
	    if(sock.type===2) {
		if(sock.server) {
		    sock.server.close();
		    sock.server=null
		}
		try {
		    sock.sock_ops.listen(sock,0)
		}
		catch(e) {
		    if(!(e instanceof FS.ErrnoError))throw e;
		    if(e.errno!==ERRNO_CODES.EOPNOTSUPP)throw e
		}

	    }

	}
	,connect:function(sock,addr,port) {
	    if(sock.server) {
		throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP)
	    }
	    if(typeof sock.daddr!=="undefined"&&typeof sock.dport!=="undefined") {
		var dest=SOCKFS.websocket_sock_ops.getPeer(sock,sock.daddr,sock.dport);
		if(dest) {
		    if(dest.socket.readyState===dest.socket.CONNECTING) {
			throw new FS.ErrnoError(ERRNO_CODES.EALREADY)
		    }
		    else {
			throw new FS.ErrnoError(ERRNO_CODES.EISCONN)
		    }

		}

	    }
	    var peer=SOCKFS.websocket_sock_ops.createPeer(sock,addr,port);
	    sock.daddr=peer.addr;
	    sock.dport=peer.port;
	    throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS)
	}
	,listen:function(sock,backlog) {
	    if(!ENVIRONMENT_IS_NODE) {
		throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP)
	    }
	    if(sock.server) {
		throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
	    }
	    var WebSocketServer=require("ws").Server;
	    var host=sock.saddr;
	    sock.server=new WebSocketServer( {
		host:host,port:sock.sport
	    }
	    );
	    Module["websocket"].emit("listen",sock.stream.fd);
	    sock.server.on("connection",function(ws) {
		if(sock.type===1) {
		    var newsock=SOCKFS.createSocket(sock.family,sock.type,sock.protocol);
		    var peer=SOCKFS.websocket_sock_ops.createPeer(newsock,ws);
		    newsock.daddr=peer.addr;
		    newsock.dport=peer.port;
		    sock.pending.push(newsock);
		    Module["websocket"].emit("connection",newsock.stream.fd)
		}
		else {
		    SOCKFS.websocket_sock_ops.createPeer(sock,ws);
		    Module["websocket"].emit("connection",sock.stream.fd)
		}

	    }
	    );
	    sock.server.on("closed",function() {
		Module["websocket"].emit("close",sock.stream.fd);
		sock.server=null
	    }
	    );
	    sock.server.on("error",function(error) {
		sock.error=ERRNO_CODES.EHOSTUNREACH;
		Module["websocket"].emit("error",[sock.stream.fd,sock.error,"EHOSTUNREACH: Host is unreachable"])
	    }
	    )
	}
	,accept:function(listensock) {
	    if(!listensock.server) {
		throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
	    }
	    var newsock=listensock.pending.shift();
	    newsock.stream.flags=listensock.stream.flags;
	    return newsock
	}
	,getname:function(sock,peer) {
	    var addr,port;
	    if(peer) {
		if(sock.daddr===undefined||sock.dport===undefined) {
		    throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)
		}
		addr=sock.daddr;
		port=sock.dport
	    }
	    else {
		addr=sock.saddr||0;
		port=sock.sport||0
	    }
	    return {
		addr:addr,port:port
	    }

	}
	,sendmsg:function(sock,buffer,offset,length,addr,port) {
	    if(sock.type===2) {
		if(addr===undefined||port===undefined) {
		    addr=sock.daddr;
		    port=sock.dport
		}
		if(addr===undefined||port===undefined) {
		    throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ)
		}

	    }
	    else {
		addr=sock.daddr;
		port=sock.dport
	    }
	    var dest=SOCKFS.websocket_sock_ops.getPeer(sock,addr,port);
	    if(sock.type===1) {
		if(!dest||dest.socket.readyState===dest.socket.CLOSING||dest.socket.readyState===dest.socket.CLOSED) {
		    throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)
		}
		else if(dest.socket.readyState===dest.socket.CONNECTING) {
		    throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
		}

	    }
	    if(ArrayBuffer.isView(buffer)) {
		offset+=buffer.byteOffset;
		buffer=buffer.buffer
	    }
	    var data;
	    data=buffer.slice(offset,offset+length);
	    if(sock.type===2) {
		if(!dest||dest.socket.readyState!==dest.socket.OPEN) {
		    if(!dest||dest.socket.readyState===dest.socket.CLOSING||dest.socket.readyState===dest.socket.CLOSED) {
			dest=SOCKFS.websocket_sock_ops.createPeer(sock,addr,port)
		    }
		    dest.dgram_send_queue.push(data);
		    return length
		}

	    }
	    try {
		dest.socket.send(data);
		return length
	    }
	    catch(e) {
		throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
	    }

	}
	,recvmsg:function(sock,length) {
	    if(sock.type===1&&sock.server) {
		throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)
	    }
	    var queued=sock.recv_queue.shift();
	    if(!queued) {
		if(sock.type===1) {
		    var dest=SOCKFS.websocket_sock_ops.getPeer(sock,sock.daddr,sock.dport);
		    if(!dest) {
			throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)
		    }
		    else if(dest.socket.readyState===dest.socket.CLOSING||dest.socket.readyState===dest.socket.CLOSED) {
			return null
		    }
		    else {
			throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
		    }

		}
		else {
		    throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
		}

	    }
	    var queuedLength=queued.data.byteLength||queued.data.length;
	    var queuedOffset=queued.data.byteOffset||0;
	    var queuedBuffer=queued.data.buffer||queued.data;
	    var bytesRead=Math.min(length,queuedLength);
	    var res= {
		buffer:new Uint8Array(queuedBuffer,queuedOffset,bytesRead),addr:queued.addr,port:queued.port
	    }
	    ;
	    if(sock.type===1&&bytesRead<queuedLength) {
		var bytesRemaining=queuedLength-bytesRead;
		queued.data=new Uint8Array(queuedBuffer,queuedOffset+bytesRead,bytesRemaining);
		sock.recv_queue.unshift(queued)
	    }
	    return res
	}

    }

}
;
function __inet_pton4_raw(str) {
    var b=str.split(".");
    for(var i=0;
	i<4;
	i++) {
	    var tmp=Number(b[i]);
	    if(isNaN(tmp))return null;
	    b[i]=tmp
	}
    return(b[0]|b[1]<<8|b[2]<<16|b[3]<<24)>>>0
}
function __inet_pton6_raw(str) {
    var words;
    var w,offset,z;
    var valid6regx=/^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i;
    var parts=[];
    if(!valid6regx.test(str)) {
	return null
    }
    if(str==="::") {
	return[0,0,0,0,0,0,0,0]
    }
    if(str.indexOf("::")===0) {
	str=str.replace("::","Z:")
    }
    else {
	str=str.replace("::",":Z:")
    }
    if(str.indexOf(".")>0) {
	str=str.replace(new RegExp("[.]","g"),":");
	words=str.split(":");
	words[words.length-4]=parseInt(words[words.length-4])+parseInt(words[words.length-3])*256;
	words[words.length-3]=parseInt(words[words.length-2])+parseInt(words[words.length-1])*256;
	words=words.slice(0,words.length-2)
    }
    else {
	words=str.split(":")
    }
    offset=0;
    z=0;
    for(w=0;
	w<words.length;
	w++) {
	    if(typeof words[w]==="string") {
		if(words[w]==="Z") {
		    for(z=0;
			z<8-words.length+1;
			z++) {
			    parts[w+z]=0
			}
		    offset=z-1
		}
		else {
		    parts[w+offset]=_htons(parseInt(words[w],16))
		}

	    }
	    else {
		parts[w+offset]=words[w]
	    }

	}
    return[parts[1]<<16|parts[0],parts[3]<<16|parts[2],parts[5]<<16|parts[4],parts[7]<<16|parts[6]]
}
var DNS= {
    address_map: {
	id:1,addrs: {

	}
	,names: {

	}

    }
    ,lookup_name:function(name) {
	var res=__inet_pton4_raw(name);
	if(res!==null) {
	    return name
	}
	res=__inet_pton6_raw(name);
	if(res!==null) {
	    return name
	}
	var addr;
	if(DNS.address_map.addrs[name]) {
	    addr=DNS.address_map.addrs[name]
	}
	else {
	    var id=DNS.address_map.id++;
	    assert(id<65535,"exceeded max address mappings of 65535");
	    addr="172.29."+(id&255)+"."+(id&65280);
	    DNS.address_map.names[addr]=name;
	    DNS.address_map.addrs[name]=addr
	}
	return addr
    }
    ,lookup_addr:function(addr) {
	if(DNS.address_map.names[addr]) {
	    return DNS.address_map.names[addr]
	}
	return null
    }

}
;
function __inet_ntop4_raw(addr) {
    return(addr&255)+"."+(addr>>8&255)+"."+(addr>>16&255)+"."+(addr>>24&255)
}
function __inet_ntop6_raw(ints) {
    var str="";
    var word=0;
    var longest=0;
    var lastzero=0;
    var zstart=0;
    var len=0;
    var i=0;
    var parts=[ints[0]&65535,ints[0]>>16,ints[1]&65535,ints[1]>>16,ints[2]&65535,ints[2]>>16,ints[3]&65535,ints[3]>>16];
    var hasipv4=true;
    var v4part="";
    for(i=0;
	i<5;
	i++) {
	    if(parts[i]!==0) {
		hasipv4=false;
		break
	    }

	}
    if(hasipv4) {
	v4part=__inet_ntop4_raw(parts[6]|parts[7]<<16);
	if(parts[5]===-1) {
	    str="::ffff:";
	    str+=v4part;
	    return str
	}
	if(parts[5]===0) {
	    str="::";
	    if(v4part==="0.0.0.0")v4part="";
	    if(v4part==="0.0.0.1")v4part="1";
	    str+=v4part;
	    return str
	}

    }
    for(word=0;
	word<8;
	word++) {
	    if(parts[word]===0) {
		if(word-lastzero>1) {
		    len=0
		}
		lastzero=word;
		len++
	    }
	    if(len>longest) {
		longest=len;
		zstart=word-longest+1
	    }

	}
    for(word=0;
	word<8;
	word++) {
	    if(longest>1) {
		if(parts[word]===0&&word>=zstart&&word<zstart+longest) {
		    if(word===zstart) {
			str+=":";
			if(zstart===0)str+=":"
		    }
		    continue
		}

	    }
	    str+=Number(_ntohs(parts[word]&65535)).toString(16);
	    str+=word<7?":":""
	}
    return str
}
function __read_sockaddr(sa,salen) {
    var family=HEAP16[sa>>1];
    var port=_ntohs(HEAP16[sa+2>>1]);
    var addr;
    switch(family) {
	case 2:if(salen!==16) {
	    return {
		errno:22
	    }

	}
	    addr=HEAP32[sa+4>>2];
	    addr=__inet_ntop4_raw(addr);
	    break;
	case 10:if(salen!==28) {
	    return {
		errno:22
	    }

	}
	    addr=[HEAP32[sa+8>>2],HEAP32[sa+12>>2],HEAP32[sa+16>>2],HEAP32[sa+20>>2]];
	    addr=__inet_ntop6_raw(addr);
	    break;
	default:return {
	    errno:97
	}

    }
    return {
	family:family,addr:addr,port:port
    }

}
function __write_sockaddr(sa,family,addr,port) {
    switch(family) {
	case 2:addr=__inet_pton4_raw(addr);
	    HEAP16[sa>>1]=family;
	    HEAP32[sa+4>>2]=addr;
	    HEAP16[sa+2>>1]=_htons(port);
	    break;
	case 10:addr=__inet_pton6_raw(addr);
	    HEAP32[sa>>2]=family;
	    HEAP32[sa+8>>2]=addr[0];
	    HEAP32[sa+12>>2]=addr[1];
	    HEAP32[sa+16>>2]=addr[2];
	    HEAP32[sa+20>>2]=addr[3];
	    HEAP16[sa+2>>1]=_htons(port);
	    HEAP32[sa+4>>2]=0;
	    HEAP32[sa+24>>2]=0;
	    break;
	default:return {
	    errno:97
	}

    }
    return {

    }

}
function ___syscall102(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var call=SYSCALLS.get(),socketvararg=SYSCALLS.get();
	SYSCALLS.varargs=socketvararg;
	switch(call) {
	    case 1: {
		var domain=SYSCALLS.get(),type=SYSCALLS.get(),protocol=SYSCALLS.get();
		var sock=SOCKFS.createSocket(domain,type,protocol);
		return sock.stream.fd
	    }
	    case 2: {
		var sock=SYSCALLS.getSocketFromFD(),info=SYSCALLS.getSocketAddress();
		sock.sock_ops.bind(sock,info.addr,info.port);
		return 0
	    }
	    case 3: {
		var sock=SYSCALLS.getSocketFromFD(),info=SYSCALLS.getSocketAddress();
		sock.sock_ops.connect(sock,info.addr,info.port);
		return 0
	    }
	    case 4: {
		var sock=SYSCALLS.getSocketFromFD(),backlog=SYSCALLS.get();
		sock.sock_ops.listen(sock,backlog);
		return 0
	    }
	    case 5: {
		var sock=SYSCALLS.getSocketFromFD(),addr=SYSCALLS.get(),addrlen=SYSCALLS.get();
		var newsock=sock.sock_ops.accept(sock);
		if(addr) {
		    var res=__write_sockaddr(addr,newsock.family,DNS.lookup_name(newsock.daddr),newsock.dport)
		}
		return newsock.stream.fd
	    }
	    case 6: {
		var sock=SYSCALLS.getSocketFromFD(),addr=SYSCALLS.get(),addrlen=SYSCALLS.get();
		var res=__write_sockaddr(addr,sock.family,DNS.lookup_name(sock.saddr||"0.0.0.0"),sock.sport);
		return 0
	    }
	    case 7: {
		var sock=SYSCALLS.getSocketFromFD(),addr=SYSCALLS.get(),addrlen=SYSCALLS.get();
		if(!sock.daddr) {
		    return-ERRNO_CODES.ENOTCONN
		}
		var res=__write_sockaddr(addr,sock.family,DNS.lookup_name(sock.daddr),sock.dport);
		return 0
	    }
	    case 11: {
		var sock=SYSCALLS.getSocketFromFD(),message=SYSCALLS.get(),length=SYSCALLS.get(),flags=SYSCALLS.get(),dest=SYSCALLS.getSocketAddress(true);
		if(!dest) {
		    return FS.write(sock.stream,HEAP8,message,length)
		}
		else {
		    return sock.sock_ops.sendmsg(sock,HEAP8,message,length,dest.addr,dest.port)
		}

	    }
	    case 12: {
		var sock=SYSCALLS.getSocketFromFD(),buf=SYSCALLS.get(),len=SYSCALLS.get(),flags=SYSCALLS.get(),addr=SYSCALLS.get(),addrlen=SYSCALLS.get();
		var msg=sock.sock_ops.recvmsg(sock,len);
		if(!msg)return 0;
		if(addr) {
		    var res=__write_sockaddr(addr,sock.family,DNS.lookup_name(msg.addr),msg.port)
		}
		HEAPU8.set(msg.buffer,buf);
		return msg.buffer.byteLength
	    }
	    case 14: {
		return-ERRNO_CODES.ENOPROTOOPT
	    }
	    case 15: {
		var sock=SYSCALLS.getSocketFromFD(),level=SYSCALLS.get(),optname=SYSCALLS.get(),optval=SYSCALLS.get(),optlen=SYSCALLS.get();
		if(level===1) {
		    if(optname===4) {
			HEAP32[optval>>2]=sock.error;
			HEAP32[optlen>>2]=4;
			sock.error=null;
			return 0
		    }

		}
		return-ERRNO_CODES.ENOPROTOOPT
	    }
	    case 16: {
		var sock=SYSCALLS.getSocketFromFD(),message=SYSCALLS.get(),flags=SYSCALLS.get();
		var iov=HEAP32[message+8>>2];
		var num=HEAP32[message+12>>2];
		var addr,port;
		var name=HEAP32[message>>2];
		var namelen=HEAP32[message+4>>2];
		if(name) {
		    var info=__read_sockaddr(name,namelen);
		    if(info.errno)return-info.errno;
		    port=info.port;
		    addr=DNS.lookup_addr(info.addr)||info.addr
		}
		var total=0;
		for(var i=0;
		    i<num;
		    i++) {
			total+=HEAP32[iov+(8*i+4)>>2]
		    }
		var view=new Uint8Array(total);
		var offset=0;
		for(var i=0;
		    i<num;
		    i++) {
			var iovbase=HEAP32[iov+(8*i+0)>>2];
			var iovlen=HEAP32[iov+(8*i+4)>>2];
			for(var j=0;
			    j<iovlen;
			    j++) {
				view[offset++]=HEAP8[iovbase+j>>0]
			    }

		    }
		return sock.sock_ops.sendmsg(sock,view,0,total,addr,port)
	    }
	    case 17: {
		var sock=SYSCALLS.getSocketFromFD(),message=SYSCALLS.get(),flags=SYSCALLS.get();
		var iov=HEAP32[message+8>>2];
		var num=HEAP32[message+12>>2];
		var total=0;
		for(var i=0;
		    i<num;
		    i++) {
			total+=HEAP32[iov+(8*i+4)>>2]
		    }
		var msg=sock.sock_ops.recvmsg(sock,total);
		if(!msg)return 0;
		var name=HEAP32[message>>2];
		if(name) {
		    var res=__write_sockaddr(name,sock.family,DNS.lookup_name(msg.addr),msg.port)
		}
		var bytesRead=0;
		var bytesRemaining=msg.buffer.byteLength;
		for(var i=0;
		    bytesRemaining>0&&i<num;
		    i++) {
			var iovbase=HEAP32[iov+(8*i+0)>>2];
			var iovlen=HEAP32[iov+(8*i+4)>>2];
			if(!iovlen) {
			    continue
			}
			var length=Math.min(iovlen,bytesRemaining);
			var buf=msg.buffer.subarray(bytesRead,bytesRead+length);
			HEAPU8.set(buf,iovbase+bytesRead);
			bytesRead+=length;
			bytesRemaining-=length
		    }
		return bytesRead
	    }
	    default:abort("unsupported socketcall syscall "+call)
	}

    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall118(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var stream=SYSCALLS.getStreamFromFD();
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall12(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var path=SYSCALLS.getStr();
	FS.chdir(path);
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall122(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var buf=SYSCALLS.get();
	if(!buf)return-ERRNO_CODES.EFAULT;
	var layout= {
	    "sysname":0,"nodename":65,"domainname":325,"machine":260,"version":195,"release":130,"__size__":390
	}
	;
	function copyString(element,value) {
	    var offset=layout[element];
	    writeAsciiToMemory(value,buf+offset)
	}
	copyString("sysname","Emscripten");
	copyString("nodename","emscripten");
	copyString("release","1.0");
	copyString("version","#1");
	copyString("machine","x86-JS");
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
var PROCINFO= {
    ppid:1,pid:42,sid:42,pgid:42
}
;
function ___syscall132(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var pid=SYSCALLS.get();
	if(pid&&pid!==PROCINFO.pid)return-ERRNO_CODES.ESRCH;
	return PROCINFO.pgid
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall133(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var stream=SYSCALLS.getStreamFromFD();
	FS.chdir(stream.path);
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall14(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var path=SYSCALLS.getStr(),mode=SYSCALLS.get(),dev=SYSCALLS.get();
	return SYSCALLS.doMknod(path,mode,dev)
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall140(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();
	var offset=offset_low;
	FS.llseek(stream,offset,whence);
	HEAP32[result>>2]=stream.position;
	if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall142(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var nfds=SYSCALLS.get(),readfds=SYSCALLS.get(),writefds=SYSCALLS.get(),exceptfds=SYSCALLS.get(),timeout=SYSCALLS.get();
	var total=0;
	var srcReadLow=readfds?HEAP32[readfds>>2]:0,srcReadHigh=readfds?HEAP32[readfds+4>>2]:0;
	var srcWriteLow=writefds?HEAP32[writefds>>2]:0,srcWriteHigh=writefds?HEAP32[writefds+4>>2]:0;
	var srcExceptLow=exceptfds?HEAP32[exceptfds>>2]:0,srcExceptHigh=exceptfds?HEAP32[exceptfds+4>>2]:0;
	var dstReadLow=0,dstReadHigh=0;
	var dstWriteLow=0,dstWriteHigh=0;
	var dstExceptLow=0,dstExceptHigh=0;
	var allLow=(readfds?HEAP32[readfds>>2]:0)|(writefds?HEAP32[writefds>>2]:0)|(exceptfds?HEAP32[exceptfds>>2]:0);
	var allHigh=(readfds?HEAP32[readfds+4>>2]:0)|(writefds?HEAP32[writefds+4>>2]:0)|(exceptfds?HEAP32[exceptfds+4>>2]:0);
	function check(fd,low,high,val) {
	    return fd<32?low&val:high&val
	}
	for(var fd=0;
	    fd<nfds;
	    fd++) {
		var mask=1<<fd%32;
		if(!check(fd,allLow,allHigh,mask)) {
		    continue
		}
		var stream=FS.getStream(fd);
		if(!stream)throw new FS.ErrnoError(ERRNO_CODES.EBADF);
		var flags=SYSCALLS.DEFAULT_POLLMASK;
		if(stream.stream_ops.poll) {
		    flags=stream.stream_ops.poll(stream)
		}
		if(flags&1&&check(fd,srcReadLow,srcReadHigh,mask)) {
		    fd<32?dstReadLow=dstReadLow|mask:dstReadHigh=dstReadHigh|mask;
		    total++
		}
		if(flags&4&&check(fd,srcWriteLow,srcWriteHigh,mask)) {
		    fd<32?dstWriteLow=dstWriteLow|mask:dstWriteHigh=dstWriteHigh|mask;
		    total++
		}
		if(flags&2&&check(fd,srcExceptLow,srcExceptHigh,mask)) {
		    fd<32?dstExceptLow=dstExceptLow|mask:dstExceptHigh=dstExceptHigh|mask;
		    total++
		}

	    }
	if(readfds) {
	    HEAP32[readfds>>2]=dstReadLow;
	    HEAP32[readfds+4>>2]=dstReadHigh
	}
	if(writefds) {
	    HEAP32[writefds>>2]=dstWriteLow;
	    HEAP32[writefds+4>>2]=dstWriteHigh
	}
	if(exceptfds) {
	    HEAP32[exceptfds>>2]=dstExceptLow;
	    HEAP32[exceptfds+4>>2]=dstExceptHigh
	}
	return total
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall145(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var stream=SYSCALLS.getStreamFromFD(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();
	return SYSCALLS.doReadv(stream,iov,iovcnt)
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall146(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var stream=SYSCALLS.getStreamFromFD(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();
	return SYSCALLS.doWritev(stream,iov,iovcnt)
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall15(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var path=SYSCALLS.getStr(),mode=SYSCALLS.get();
	FS.chmod(path,mode);
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall168(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var fds=SYSCALLS.get(),nfds=SYSCALLS.get(),timeout=SYSCALLS.get();
	var nonzero=0;
	for(var i=0;
	    i<nfds;
	    i++) {
		var pollfd=fds+8*i;
		var fd=HEAP32[pollfd>>2];
		var events=HEAP16[pollfd+4>>1];
		var mask=32;
		var stream=FS.getStream(fd);
		if(stream) {
		    mask=SYSCALLS.DEFAULT_POLLMASK;
		    if(stream.stream_ops.poll) {
			mask=stream.stream_ops.poll(stream)
		    }

		}
		mask&=events|8|16;
		if(mask)nonzero++;
		HEAP16[pollfd+6>>1]=mask
	    }
	return nonzero
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall183(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var buf=SYSCALLS.get(),size=SYSCALLS.get();
	if(size===0)return-ERRNO_CODES.EINVAL;
	var cwd=FS.cwd();
	var cwdLengthInBytes=lengthBytesUTF8(cwd);
	if(size<cwdLengthInBytes+1)return-ERRNO_CODES.ERANGE;
	stringToUTF8(cwd,buf,size);
	return buf
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall193(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var path=SYSCALLS.getStr(),zero=SYSCALLS.getZero(),length=SYSCALLS.get64();
	FS.truncate(path,length);
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall194(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var fd=SYSCALLS.get(),zero=SYSCALLS.getZero(),length=SYSCALLS.get64();
	FS.ftruncate(fd,length);
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall195(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var path=SYSCALLS.getStr(),buf=SYSCALLS.get();
	return SYSCALLS.doStat(FS.stat,path,buf)
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall196(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var path=SYSCALLS.getStr(),buf=SYSCALLS.get();
	return SYSCALLS.doStat(FS.lstat,path,buf)
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall197(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var stream=SYSCALLS.getStreamFromFD(),buf=SYSCALLS.get();
	return SYSCALLS.doStat(FS.stat,stream.path,buf)
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall198(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var path=SYSCALLS.getStr(),owner=SYSCALLS.get(),group=SYSCALLS.get();
	FS.chown(path,owner,group);
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall202(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall199(a0,a1) {
    return ___syscall202(a0,a1)
}
function ___syscall20(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	return PROCINFO.pid
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall200(a0,a1) {
    return ___syscall202(a0,a1)
}
function ___syscall201(a0,a1) {
    return ___syscall202(a0,a1)
}
function ___syscall205(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var size=SYSCALLS.get(),list=SYSCALLS.get();
	if(size<1)return-ERRNO_CODES.EINVAL;
	HEAP32[list>>2]=0;
	return 1
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall207(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var fd=SYSCALLS.get(),owner=SYSCALLS.get(),group=SYSCALLS.get();
	FS.fchown(fd,owner,group);
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall212(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var path=SYSCALLS.getStr(),owner=SYSCALLS.get(),group=SYSCALLS.get();
	FS.chown(path,owner,group);
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall220(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var stream=SYSCALLS.getStreamFromFD(),dirp=SYSCALLS.get(),count=SYSCALLS.get();
	if(!stream.getdents) {
	    stream.getdents=FS.readdir(stream.path)
	}
	var pos=0;
	while(stream.getdents.length>0&&pos+268<=count) {
	    var id;
	    var type;
	    var name=stream.getdents.pop();
	    if(name[0]===".") {
		id=1;
		type=4
	    }
	    else {
		var child=FS.lookupNode(stream.node,name);
		id=child.id;
		type=FS.isChrdev(child.mode)?2:FS.isDir(child.mode)?4:FS.isLink(child.mode)?10:8
	    }
	    HEAP32[dirp+pos>>2]=id;
	    HEAP32[dirp+pos+4>>2]=stream.position;
	    HEAP16[dirp+pos+8>>1]=268;
	    HEAP8[dirp+pos+10>>0]=type;
	    stringToUTF8(name,dirp+pos+11,256);
	    pos+=268
	}
	return pos
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall221(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var stream=SYSCALLS.getStreamFromFD(),cmd=SYSCALLS.get();
	switch(cmd) {
	    case 0: {
		var arg=SYSCALLS.get();
		if(arg<0) {
		    return-ERRNO_CODES.EINVAL
		}
		var newStream;
		newStream=FS.open(stream.path,stream.flags,0,arg);
		return newStream.fd
	    }
	    case 1:case 2:return 0;
	    case 3:return stream.flags;
	    case 4: {
		var arg=SYSCALLS.get();
		stream.flags|=arg;
		return 0
	    }
	    case 12: {
		var arg=SYSCALLS.get();
		var offset=0;
		HEAP16[arg+offset>>1]=2;
		return 0
	    }
	    case 13:case 14:return 0;
	    case 16:case 8:return-ERRNO_CODES.EINVAL;
	    case 9:___setErrNo(ERRNO_CODES.EINVAL);
		return-1;
	    default: {
		return-ERRNO_CODES.EINVAL
	    }

	}

    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall29(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	return-ERRNO_CODES.EINTR
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall3(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var stream=SYSCALLS.getStreamFromFD(),buf=SYSCALLS.get(),count=SYSCALLS.get();
	return FS.read(stream,HEAP8,buf,count)
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall301(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var dirfd=SYSCALLS.get(),path=SYSCALLS.getStr(),flags=SYSCALLS.get();
	path=SYSCALLS.calculateAt(dirfd,path);
	if(flags===0) {
	    FS.unlink(path)
	}
	else if(flags===512) {
	    FS.rmdir(path)
	}
	else {
	    abort("Invalid flags passed to unlinkat")
	}
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall302(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var olddirfd=SYSCALLS.get(),oldpath=SYSCALLS.getStr(),newdirfd=SYSCALLS.get(),newpath=SYSCALLS.getStr();
	oldpath=SYSCALLS.calculateAt(olddirfd,oldpath);
	newpath=SYSCALLS.calculateAt(newdirfd,newpath);
	FS.rename(oldpath,newpath);
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall303(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	return-ERRNO_CODES.EMLINK
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall33(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var path=SYSCALLS.getStr(),amode=SYSCALLS.get();
	return SYSCALLS.doAccess(path,amode)
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall330(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var old=SYSCALLS.getStreamFromFD(),suggestFD=SYSCALLS.get(),flags=SYSCALLS.get();
	if(old.fd===suggestFD)return-ERRNO_CODES.EINVAL;
	return SYSCALLS.doDup(old.path,old.flags,suggestFD)
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall331(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	return-ERRNO_CODES.ENOSYS
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall34(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var inc=SYSCALLS.get();
	return-ERRNO_CODES.EPERM
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall38(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var old_path=SYSCALLS.getStr(),new_path=SYSCALLS.getStr();
	FS.rename(old_path,new_path);
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall39(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var path=SYSCALLS.getStr(),mode=SYSCALLS.get();
	return SYSCALLS.doMkdir(path,mode)
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall4(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var stream=SYSCALLS.getStreamFromFD(),buf=SYSCALLS.get(),count=SYSCALLS.get();
	return FS.write(stream,HEAP8,buf,count)
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall40(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var path=SYSCALLS.getStr();
	FS.rmdir(path);
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall41(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var old=SYSCALLS.getStreamFromFD();
	return FS.open(old.path,old.flags,0).fd
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
var PIPEFS= {
    BUCKET_BUFFER_SIZE:8192,mount:function(mount) {
	return FS.createNode(null,"/",16384|511,0)
    }
    ,createPipe:function() {
	var pipe= {
	    buckets:[]
	}
	;
	pipe.buckets.push( {
	    buffer:new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),offset:0,roffset:0
	}
	);
	var rName=PIPEFS.nextname();
	var wName=PIPEFS.nextname();
	var rNode=FS.createNode(PIPEFS.root,rName,4096,0);
	var wNode=FS.createNode(PIPEFS.root,wName,4096,0);
	rNode.pipe=pipe;
	wNode.pipe=pipe;
	var readableStream=FS.createStream( {
	    path:rName,node:rNode,flags:FS.modeStringToFlags("r"),seekable:false,stream_ops:PIPEFS.stream_ops
	}
	);
	rNode.stream=readableStream;
	var writableStream=FS.createStream( {
	    path:wName,node:wNode,flags:FS.modeStringToFlags("w"),seekable:false,stream_ops:PIPEFS.stream_ops
	}
	);
	wNode.stream=writableStream;
	return {
	    readable_fd:readableStream.fd,writable_fd:writableStream.fd
	}

    }
    ,stream_ops: {
	poll:function(stream) {
	    var pipe=stream.node.pipe;
	    if((stream.flags&2097155)===1) {
		return 256|4
	    }
	    else {
		if(pipe.buckets.length>0) {
		    for(var i=0;
			i<pipe.buckets.length;
			i++) {
			    var bucket=pipe.buckets[i];
			    if(bucket.offset-bucket.roffset>0) {
				return 64|1
			    }

			}

		}

	    }
	    return 0
	}
	,ioctl:function(stream,request,varargs) {
	    return ERRNO_CODES.EINVAL
	}
	,read:function(stream,buffer,offset,length,position) {
	    var pipe=stream.node.pipe;
	    var currentLength=0;
	    for(var i=0;
		i<pipe.buckets.length;
		i++) {
		    var bucket=pipe.buckets[i];
		    currentLength+=bucket.offset-bucket.roffset
		}
	    assert(buffer instanceof ArrayBuffer||ArrayBuffer.isView(buffer));
	    var data=buffer.subarray(offset,offset+length);
	    if(length<=0) {
		return 0
	    }
	    if(currentLength==0) {
		throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
	    }
	    var toRead=Math.min(currentLength,length);
	    var totalRead=toRead;
	    var toRemove=0;
	    for(var i=0;
		i<pipe.buckets.length;
		i++) {
		    var currBucket=pipe.buckets[i];
		    var bucketSize=currBucket.offset-currBucket.roffset;
		    if(toRead<=bucketSize) {
			var tmpSlice=currBucket.buffer.subarray(currBucket.roffset,currBucket.offset);
			if(toRead<bucketSize) {
			    tmpSlice=tmpSlice.subarray(0,toRead);
			    currBucket.roffset+=toRead
			}
			else {
			    toRemove++
			}
			data.set(tmpSlice);
			break
		    }
		    else {
			var tmpSlice=currBucket.buffer.subarray(currBucket.roffset,currBucket.offset);
			data.set(tmpSlice);
			data=data.subarray(tmpSlice.byteLength);
			toRead-=tmpSlice.byteLength;
			toRemove++
		    }

		}
	    if(toRemove&&toRemove==pipe.buckets.length) {
		toRemove--;
		pipe.buckets[toRemove].offset=0;
		pipe.buckets[toRemove].roffset=0
	    }
	    pipe.buckets.splice(0,toRemove);
	    return totalRead
	}
	,write:function(stream,buffer,offset,length,position) {
	    var pipe=stream.node.pipe;
	    assert(buffer instanceof ArrayBuffer||ArrayBuffer.isView(buffer));
	    var data=buffer.subarray(offset,offset+length);
	    var dataLen=data.byteLength;
	    if(dataLen<=0) {
		return 0
	    }
	    var currBucket=null;
	    if(pipe.buckets.length==0) {
		currBucket= {
		    buffer:new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),offset:0,roffset:0
		}
		;
		pipe.buckets.push(currBucket)
	    }
	    else {
		currBucket=pipe.buckets[pipe.buckets.length-1]
	    }
	    assert(currBucket.offset<=PIPEFS.BUCKET_BUFFER_SIZE);
	    var freeBytesInCurrBuffer=PIPEFS.BUCKET_BUFFER_SIZE-currBucket.offset;
	    if(freeBytesInCurrBuffer>=dataLen) {
		currBucket.buffer.set(data,currBucket.offset);
		currBucket.offset+=dataLen;
		return dataLen
	    }
	    else if(freeBytesInCurrBuffer>0) {
		currBucket.buffer.set(data.subarray(0,freeBytesInCurrBuffer),currBucket.offset);
		currBucket.offset+=freeBytesInCurrBuffer;
		data=data.subarray(freeBytesInCurrBuffer,data.byteLength)
	    }
	    var numBuckets=data.byteLength/PIPEFS.BUCKET_BUFFER_SIZE|0;
	    var remElements=data.byteLength%PIPEFS.BUCKET_BUFFER_SIZE;
	    for(var i=0;
		i<numBuckets;
		i++) {
		    var newBucket= {
			buffer:new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),offset:PIPEFS.BUCKET_BUFFER_SIZE,roffset:0
		    }
		    ;
		    pipe.buckets.push(newBucket);
		    newBucket.buffer.set(data.subarray(0,PIPEFS.BUCKET_BUFFER_SIZE));
		    data=data.subarray(PIPEFS.BUCKET_BUFFER_SIZE,data.byteLength)
		}
	    if(remElements>0) {
		var newBucket= {
		    buffer:new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),offset:data.byteLength,roffset:0
		}
		;
		pipe.buckets.push(newBucket);
		newBucket.buffer.set(data)
	    }
	    return dataLen
	}
	,close:function(stream) {
	    var pipe=stream.node.pipe;
	    pipe.buckets=null
	}

    }
    ,nextname:function() {
	if(!PIPEFS.nextname.current) {
	    PIPEFS.nextname.current=0
	}
	return"pipe["+PIPEFS.nextname.current+++"]"
    }

}
;
function ___syscall42(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var fdPtr=SYSCALLS.get();
	if(fdPtr==0) {
	    throw new FS.ErrnoError(ERRNO_CODES.EFAULT)
	}
	var res=PIPEFS.createPipe();
	HEAP32[fdPtr>>2]=res.readable_fd;
	HEAP32[fdPtr+4>>2]=res.writable_fd;
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall5(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var pathname=SYSCALLS.getStr(),flags=SYSCALLS.get(),mode=SYSCALLS.get();
	var stream=FS.open(pathname,flags,mode);
	return stream.fd
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall54(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var stream=SYSCALLS.getStreamFromFD(),op=SYSCALLS.get();
	switch(op) {
	    case 21509:case 21505: {
		if(!stream.tty)return-ERRNO_CODES.ENOTTY;
		return 0
	    }
	    case 21510:case 21511:case 21512:case 21506:case 21507:case 21508: {
		if(!stream.tty)return-ERRNO_CODES.ENOTTY;
		return 0
	    }
	    case 21519: {
		if(!stream.tty)return-ERRNO_CODES.ENOTTY;
		var argp=SYSCALLS.get();
		HEAP32[argp>>2]=0;
		return 0
	    }
	    case 21520: {
		if(!stream.tty)return-ERRNO_CODES.ENOTTY;
		return-ERRNO_CODES.EINVAL
	    }
	    case 21531: {
		var argp=SYSCALLS.get();
		return FS.ioctl(stream,op,argp)
	    }
	    case 21523: {
		if(!stream.tty)return-ERRNO_CODES.ENOTTY;
		return 0
	    }
	    case 21524: {
		if(!stream.tty)return-ERRNO_CODES.ENOTTY;
		return 0
	    }
	    default:abort("bad ioctl syscall "+op)
	}

    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall57(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var pid=SYSCALLS.get(),pgid=SYSCALLS.get();
	if(pid&&pid!==PROCINFO.pid)return-ERRNO_CODES.ESRCH;
	if(pgid&&pgid!==PROCINFO.pgid)return-ERRNO_CODES.EPERM;
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall6(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var stream=SYSCALLS.getStreamFromFD();
	FS.close(stream);
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall60(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var mask=SYSCALLS.get();
	var old=SYSCALLS.umask;
	SYSCALLS.umask=mask;
	return old
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall63(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var old=SYSCALLS.getStreamFromFD(),suggestFD=SYSCALLS.get();
	if(old.fd===suggestFD)return suggestFD;
	return SYSCALLS.doDup(old.path,old.flags,suggestFD)
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall64(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	return PROCINFO.ppid
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall66(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall83(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var target=SYSCALLS.getStr(),linkpath=SYSCALLS.getStr();
	FS.symlink(target,linkpath);
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall85(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var path=SYSCALLS.getStr(),buf=SYSCALLS.get(),bufsize=SYSCALLS.get();
	return SYSCALLS.doReadlink(path,buf,bufsize)
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall9(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var oldpath=SYSCALLS.get(),newpath=SYSCALLS.get();
	return-ERRNO_CODES.EMLINK
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall91(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var addr=SYSCALLS.get(),len=SYSCALLS.get();
	var info=SYSCALLS.mappings[addr];
	if(!info)return 0;
	if(len===info.len) {
	    var stream=FS.getStream(info.fd);
	    SYSCALLS.doMsync(addr,stream,len,info.flags);
	    FS.munmap(stream);
	    SYSCALLS.mappings[addr]=null;
	    if(info.allocated) {
		_free(info.malloc)
	    }

	}
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall94(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	var fd=SYSCALLS.get(),mode=SYSCALLS.get();
	FS.fchmod(fd,mode);
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall96(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	return 0
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___syscall97(which,varargs) {
    SYSCALLS.varargs=varargs;
    try {
	return-ERRNO_CODES.EPERM
    }
    catch(e) {
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
	return-e.errno
    }

}
function ___unlock() {

}
function _exit(status) {
    exit(status)
}
function __exit(a0) {
    return _exit(a0)
}
function _abort() {
    Module["abort"]()
}
var __sigalrm_handler=0;
function _alarm(seconds) {
    setTimeout(function() {
	if(__sigalrm_handler)dynCall_vi(__sigalrm_handler,0)
    }
	,seconds*1e3)
}
var ___tm_formatted=1278320;
function _tzset() {
    if(_tzset.called)return;
    _tzset.called=true;
    HEAP32[__get_timezone()>>2]=(new Date).getTimezoneOffset()*60;
    var winter=new Date(2e3,0,1);
    var summer=new Date(2e3,6,1);
    HEAP32[__get_daylight()>>2]=Number(winter.getTimezoneOffset()!=summer.getTimezoneOffset());
    function extractZone(date) {
	var match=date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
	return match?match[1]:"GMT"
    }
    var winterName=extractZone(winter);
    var summerName=extractZone(summer);
    var winterNamePtr=allocate(intArrayFromString(winterName),"i8",ALLOC_NORMAL);
    var summerNamePtr=allocate(intArrayFromString(summerName),"i8",ALLOC_NORMAL);
    if(summer.getTimezoneOffset()<winter.getTimezoneOffset()) {
	HEAP32[__get_tzname()>>2]=winterNamePtr;
	HEAP32[__get_tzname()+4>>2]=summerNamePtr
    }
    else {
	HEAP32[__get_tzname()>>2]=summerNamePtr;
	HEAP32[__get_tzname()+4>>2]=winterNamePtr
    }

}
function _mktime(tmPtr) {
    _tzset();
    var date=new Date(HEAP32[tmPtr+20>>2]+1900,HEAP32[tmPtr+16>>2],HEAP32[tmPtr+12>>2],HEAP32[tmPtr+8>>2],HEAP32[tmPtr+4>>2],HEAP32[tmPtr>>2],0);
    var dst=HEAP32[tmPtr+32>>2];
    var guessedOffset=date.getTimezoneOffset();
    var start=new Date(date.getFullYear(),0,1);
    var summerOffset=new Date(2e3,6,1).getTimezoneOffset();
    var winterOffset=start.getTimezoneOffset();
    var dstOffset=Math.min(winterOffset,summerOffset);
    if(dst<0) {
	HEAP32[tmPtr+32>>2]=Number(summerOffset!=winterOffset&&dstOffset==guessedOffset)
    }
    else if(dst>0!=(dstOffset==guessedOffset)) {
	var nonDstOffset=Math.max(winterOffset,summerOffset);
	var trueOffset=dst>0?dstOffset:nonDstOffset;
	date.setTime(date.getTime()+(trueOffset-guessedOffset)*6e4)
    }
    HEAP32[tmPtr+24>>2]=date.getDay();
    var yday=(date.getTime()-start.getTime())/(1e3*60*60*24)|0;
    HEAP32[tmPtr+28>>2]=yday;
    return date.getTime()/1e3|0
}
function _asctime_r(tmPtr,buf) {
    var date= {
	tm_sec:HEAP32[tmPtr>>2],tm_min:HEAP32[tmPtr+4>>2],tm_hour:HEAP32[tmPtr+8>>2],tm_mday:HEAP32[tmPtr+12>>2],tm_mon:HEAP32[tmPtr+16>>2],tm_year:HEAP32[tmPtr+20>>2],tm_wday:HEAP32[tmPtr+24>>2]
    }
    ;
    var days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var s=days[date.tm_wday]+" "+months[date.tm_mon]+(date.tm_mday<10?"  ":" ")+date.tm_mday+(date.tm_hour<10?" 0":" ")+date.tm_hour+(date.tm_min<10?":0":":")+date.tm_min+(date.tm_sec<10?":0":":")+date.tm_sec+" "+(1900+date.tm_year)+"\n";
    stringToUTF8(s,buf,26);
    return buf
}
function _asctime(tmPtr) {
    return _asctime_r(tmPtr,___tm_formatted)
}
function _chroot(path) {
    ___setErrNo(13);
    return-1
}
function _clearenv() {
    ENV= {

    }
    ;
    ___buildEnvironment(__get_environ());
    return 0
}
function _clock() {
    if(_clock.start===undefined)_clock.start=Date.now();
    return(Date.now()-_clock.start)*(1e6/1e3)|0
}
var ___tm_current=1278256;
var ___tm_timezone=(stringToUTF8("GMT",1278304,4),1278304);
function _localtime_r(time,tmPtr) {
    _tzset();
    var date=new Date(HEAP32[time>>2]*1e3);
    HEAP32[tmPtr>>2]=date.getSeconds();
    HEAP32[tmPtr+4>>2]=date.getMinutes();
    HEAP32[tmPtr+8>>2]=date.getHours();
    HEAP32[tmPtr+12>>2]=date.getDate();
    HEAP32[tmPtr+16>>2]=date.getMonth();
    HEAP32[tmPtr+20>>2]=date.getFullYear()-1900;
    HEAP32[tmPtr+24>>2]=date.getDay();
    var start=new Date(date.getFullYear(),0,1);
    var yday=(date.getTime()-start.getTime())/(1e3*60*60*24)|0;
    HEAP32[tmPtr+28>>2]=yday;
    HEAP32[tmPtr+36>>2]=-(date.getTimezoneOffset()*60);
    var summerOffset=new Date(2e3,6,1).getTimezoneOffset();
    var winterOffset=start.getTimezoneOffset();
    var dst=(summerOffset!=winterOffset&&date.getTimezoneOffset()==Math.min(winterOffset,summerOffset))|0;
    HEAP32[tmPtr+32>>2]=dst;
    var zonePtr=HEAP32[__get_tzname()+(dst?4:0)>>2];
    HEAP32[tmPtr+40>>2]=zonePtr;
    return tmPtr
}
function _ctime_r(time,buf) {
    var stack=stackSave();
    var rv=_asctime_r(_localtime_r(time,stackAlloc(44)),buf);
    stackRestore(stack);
    return rv
}
function _ctime(timer) {
    return _ctime_r(timer,___tm_current)
}
function _difftime(time1,time0) {
    return time1-time0
}
function _emscripten_get_heap_size() {
    return TOTAL_MEMORY
}
function _longjmp(env,value) {
    _setThrew(env,value||1);
    throw"longjmp"
}
function _emscripten_longjmp(env,value) {
    _longjmp(env,value)
}
function abortOnCannotGrowMemory(requestedSize) {
    abort("OOM")
}
function emscripten_realloc_buffer(size) {
    var PAGE_MULTIPLE=65536;
    size=alignUp(size,PAGE_MULTIPLE);
    var old=Module["buffer"];
    var oldSize=old.byteLength;
    try {
	var result=wasmMemory.grow((size-oldSize)/65536);
	if(result!==(-1|0)) {
	    return Module["buffer"]=wasmMemory.buffer
	}
	else {
	    return null
	}

    }
    catch(e) {
	return null
    }

}
function _emscripten_resize_heap(requestedSize) {
    var oldSize=_emscripten_get_heap_size();
    var PAGE_MULTIPLE=65536;
    var LIMIT=2147483648-PAGE_MULTIPLE;
    if(requestedSize>LIMIT) {
	return false
    }
    var MIN_TOTAL_MEMORY=16777216;
    var newSize=Math.max(oldSize,MIN_TOTAL_MEMORY);
    while(newSize<requestedSize) {
	if(newSize<=536870912) {
	    newSize=alignUp(2*newSize,PAGE_MULTIPLE)
	}
	else {
	    newSize=Math.min(alignUp((3*newSize+2147483648)/4,PAGE_MULTIPLE),LIMIT)
	}

    }
    var replacement=emscripten_realloc_buffer(newSize);
    if(!replacement||replacement.byteLength!=newSize) {
	return false
    }
    updateGlobalBuffer(replacement);
    updateGlobalBufferViews();
    TOTAL_MEMORY=newSize;
    HEAPU32[DYNAMICTOP_PTR>>2]=requestedSize;
    return true
}
function _endprotoent() {

}
function _endpwent() {
    throw"endpwent: TODO"
}
function _execl() {
    ___setErrNo(8);
    return-1
}
function _execv() {
    return _execl.apply(null,arguments)
}
function _execvp() {
    return _execl.apply(null,arguments)
}
function _flock(fd,operation) {
    return 0
}
function _fork() {
    ___setErrNo(95);
    return-1
}
function _fpathconf(fildes,name) {
    switch(name) {
	case 0:return 32e3;
	case 1:case 2:case 3:return 255;
	case 4:case 5:case 16:case 17:case 18:return 4096;
	case 6:case 7:case 20:return 1;
	case 8:return 0;
	case 9:case 10:case 11:case 12:case 14:case 15:case 19:return-1;
	case 13:return 64
    }
    ___setErrNo(22);
    return-1
}
var GAI_ERRNO_MESSAGES= {

}
;
function _gai_strerror(val) {
    var buflen=256;
    if(!_gai_strerror.buffer) {
	_gai_strerror.buffer=_malloc(buflen);
	GAI_ERRNO_MESSAGES["0"]="Success";
	GAI_ERRNO_MESSAGES[""+-1]="Invalid value for 'ai_flags' field";
	GAI_ERRNO_MESSAGES[""+-2]="NAME or SERVICE is unknown";
	GAI_ERRNO_MESSAGES[""+-3]="Temporary failure in name resolution";
	GAI_ERRNO_MESSAGES[""+-4]="Non-recoverable failure in name res";
	GAI_ERRNO_MESSAGES[""+-6]="'ai_family' not supported";
	GAI_ERRNO_MESSAGES[""+-7]="'ai_socktype' not supported";
	GAI_ERRNO_MESSAGES[""+-8]="SERVICE not supported for 'ai_socktype'";
	GAI_ERRNO_MESSAGES[""+-10]="Memory allocation failure";
	GAI_ERRNO_MESSAGES[""+-11]="System error returned in 'errno'";
	GAI_ERRNO_MESSAGES[""+-12]="Argument buffer overflow"
    }
    var msg="Unknown error";
    if(val in GAI_ERRNO_MESSAGES) {
	if(GAI_ERRNO_MESSAGES[val].length>buflen-1) {
	    msg="Message too long"
	}
	else {
	    msg=GAI_ERRNO_MESSAGES[val]
	}

    }
    writeAsciiToMemory(msg,_gai_strerror.buffer);
    return _gai_strerror.buffer
}
function _getaddrinfo(node,service,hint,out) {
    var addr=0;
    var port=0;
    var flags=0;
    var family=0;
    var type=0;
    var proto=0;
    var ai;
    function allocaddrinfo(family,type,proto,canon,addr,port) {
	var sa,salen,ai;
	var res;
	salen=family===10?28:16;
	addr=family===10?__inet_ntop6_raw(addr):__inet_ntop4_raw(addr);
	sa=_malloc(salen);
	res=__write_sockaddr(sa,family,addr,port);
	assert(!res.errno);
	ai=_malloc(32);
	HEAP32[ai+4>>2]=family;
	HEAP32[ai+8>>2]=type;
	HEAP32[ai+12>>2]=proto;
	HEAP32[ai+24>>2]=canon;
	HEAP32[ai+20>>2]=sa;
	if(family===10) {
	    HEAP32[ai+16>>2]=28
	}
	else {
	    HEAP32[ai+16>>2]=16
	}
	HEAP32[ai+28>>2]=0;
	return ai
    }
    if(hint) {
	flags=HEAP32[hint>>2];
	family=HEAP32[hint+4>>2];
	type=HEAP32[hint+8>>2];
	proto=HEAP32[hint+12>>2]
    }
    if(type&&!proto) {
	proto=type===2?17:6
    }
    if(!type&&proto) {
	type=proto===17?2:1
    }
    if(proto===0) {
	proto=6
    }
    if(type===0) {
	type=1
    }
    if(!node&&!service) {
	return-2
    }
    if(flags&~(1|2|4|1024|8|16|32)) {
	return-1
    }
    if(hint!==0&&HEAP32[hint>>2]&2&&!node) {
	return-1
    }
    if(flags&32) {
	return-2
    }
    if(type!==0&&type!==1&&type!==2) {
	return-7
    }
    if(family!==0&&family!==2&&family!==10) {
	return-6
    }
    if(service) {
	service=UTF8ToString(service);
	port=parseInt(service,10);
	if(isNaN(port)) {
	    if(flags&1024) {
		return-2
	    }
	    return-8
	}

    }
    if(!node) {
	if(family===0) {
	    family=2
	}
	if((flags&1)===0) {
	    if(family===2) {
		addr=_htonl(2130706433)
	    }
	    else {
		addr=[0,0,0,1]
	    }

	}
	ai=allocaddrinfo(family,type,proto,null,addr,port);
	HEAP32[out>>2]=ai;
	return 0
    }
    node=UTF8ToString(node);
    addr=__inet_pton4_raw(node);
    if(addr!==null) {
	if(family===0||family===2) {
	    family=2
	}
	else if(family===10&&flags&8) {
	    addr=[0,0,_htonl(65535),addr];
	    family=10
	}
	else {
	    return-2
	}

    }
    else {
	addr=__inet_pton6_raw(node);
	if(addr!==null) {
	    if(family===0||family===10) {
		family=10
	    }
	    else {
		return-2
	    }

	}

    }
    if(addr!=null) {
	ai=allocaddrinfo(family,type,proto,node,addr,port);
	HEAP32[out>>2]=ai;
	return 0
    }
    if(flags&4) {
	return-2
    }
    node=DNS.lookup_name(node);
    addr=__inet_pton4_raw(node);
    if(family===0) {
	family=2
    }
    else if(family===10) {
	addr=[0,0,_htonl(65535),addr]
    }
    ai=allocaddrinfo(family,type,proto,null,addr,port);
    HEAP32[out>>2]=ai;
    return 0
}
function _getenv(name) {
    if(name===0)return 0;
    name=UTF8ToString(name);
    if(!ENV.hasOwnProperty(name))return 0;
    if(_getenv.ret)_free(_getenv.ret);
    _getenv.ret=allocateUTF8(ENV[name]);
    return _getenv.ret
}
function _getgrgid() {
    err("missing function: getgrgid");
    abort(-1)
}
function _getgrnam() {
    err("missing function: getgrnam");
    abort(-1)
}
function _gethostbyname(name) {
    name=UTF8ToString(name);
    var ret=_malloc(20);
    var nameBuf=_malloc(name.length+1);
    stringToUTF8(name,nameBuf,name.length+1);
    HEAP32[ret>>2]=nameBuf;
    var aliasesBuf=_malloc(4);
    HEAP32[aliasesBuf>>2]=0;
    HEAP32[ret+4>>2]=aliasesBuf;
    var afinet=2;
    HEAP32[ret+8>>2]=afinet;
    HEAP32[ret+12>>2]=4;
    var addrListBuf=_malloc(12);
    HEAP32[addrListBuf>>2]=addrListBuf+8;
    HEAP32[addrListBuf+4>>2]=0;
    HEAP32[addrListBuf+8>>2]=__inet_pton4_raw(DNS.lookup_name(name));
    HEAP32[ret+16>>2]=addrListBuf;
    return ret
}
function _getitimer() {
    throw"getitimer() is not implemented yet"
}
function _getnameinfo(sa,salen,node,nodelen,serv,servlen,flags) {
    var info=__read_sockaddr(sa,salen);
    if(info.errno) {
	return-6
    }
    var port=info.port;
    var addr=info.addr;
    var overflowed=false;
    if(node&&nodelen) {
	var lookup;
	if(flags&1||!(lookup=DNS.lookup_addr(addr))) {
	    if(flags&8) {
		return-2
	    }

	}
	else {
	    addr=lookup
	}
	var numBytesWrittenExclNull=stringToUTF8(addr,node,nodelen);
	if(numBytesWrittenExclNull+1>=nodelen) {
	    overflowed=true
	}

    }
    if(serv&&servlen) {
	port=""+port;
	var numBytesWrittenExclNull=stringToUTF8(port,serv,servlen);
	if(numBytesWrittenExclNull+1>=servlen) {
	    overflowed=true
	}

    }
    if(overflowed) {
	return-12
    }
    return 0
}
var Protocols= {
    list:[],map: {

    }

}
;
function _setprotoent(stayopen) {
    function allocprotoent(name,proto,aliases) {
	var nameBuf=_malloc(name.length+1);
	writeAsciiToMemory(name,nameBuf);
	var j=0;
	var length=aliases.length;
	var aliasListBuf=_malloc((length+1)*4);
	for(var i=0;
	    i<length;
	    i++,j+=4) {
		var alias=aliases[i];
		var aliasBuf=_malloc(alias.length+1);
		writeAsciiToMemory(alias,aliasBuf);
		HEAP32[aliasListBuf+j>>2]=aliasBuf
	    }
	HEAP32[aliasListBuf+j>>2]=0;
	var pe=_malloc(12);
	HEAP32[pe>>2]=nameBuf;
	HEAP32[pe+4>>2]=aliasListBuf;
	HEAP32[pe+8>>2]=proto;
	return pe
    }
    var list=Protocols.list;
    var map=Protocols.map;
    if(list.length===0) {
	var entry=allocprotoent("tcp",6,["TCP"]);
	list.push(entry);
	map["tcp"]=map["6"]=entry;
	entry=allocprotoent("udp",17,["UDP"]);
	list.push(entry);
	map["udp"]=map["17"]=entry
    }
    _setprotoent.index=0
}
function _getprotobyname(name) {
    name=UTF8ToString(name);
    _setprotoent(true);
    var result=Protocols.map[name];
    return result
}
function _getprotobynumber(number) {
    _setprotoent(true);
    var result=Protocols.map[number];
    return result
}
function _getprotoent(number) {
    if(_setprotoent.index===Protocols.list.length) {
	return 0
    }
    else {
	var result=Protocols.list[_setprotoent.index++];
	return result
    }

}
function _getpwent() {
    throw"getpwent: TODO"
}
function _getpwnam() {
    throw"getpwnam: TODO"
}
function _getpwuid(uid) {
    return 0
}
function _gettimeofday(ptr) {
    var now=Date.now();
    HEAP32[ptr>>2]=now/1e3|0;
    HEAP32[ptr+4>>2]=now%1e3*1e3|0;
    return 0
}
function _gmtime_r(time,tmPtr) {
    var date=new Date(HEAP32[time>>2]*1e3);
    HEAP32[tmPtr>>2]=date.getUTCSeconds();
    HEAP32[tmPtr+4>>2]=date.getUTCMinutes();
    HEAP32[tmPtr+8>>2]=date.getUTCHours();
    HEAP32[tmPtr+12>>2]=date.getUTCDate();
    HEAP32[tmPtr+16>>2]=date.getUTCMonth();
    HEAP32[tmPtr+20>>2]=date.getUTCFullYear()-1900;
    HEAP32[tmPtr+24>>2]=date.getUTCDay();
    HEAP32[tmPtr+36>>2]=0;
    HEAP32[tmPtr+32>>2]=0;
    var start=Date.UTC(date.getUTCFullYear(),0,1,0,0,0,0);
    var yday=(date.getTime()-start)/(1e3*60*60*24)|0;
    HEAP32[tmPtr+28>>2]=yday;
    HEAP32[tmPtr+40>>2]=___tm_timezone;
    return tmPtr
}
function _gmtime(time) {
    return _gmtime_r(time,___tm_current)
}
function _kill(pid,sig) {
    ___setErrNo(ERRNO_CODES.EPERM);
    return-1
}
function _llvm_exp2_f32(x) {
    return Math.pow(2,x)
}
function _llvm_exp2_f64(a0) {
    return _llvm_exp2_f32(a0)
}
function _llvm_fma_f64() {
    err("missing function: llvm_fma_f64");
    abort(-1)
}
function _llvm_log10_f32(x) {
    return Math.log(x)/Math.LN10
}
function _llvm_log10_f64(a0) {
    return _llvm_log10_f32(a0)
}
function _llvm_log2_f32(x) {
    return Math.log(x)/Math.LN2
}
function _llvm_log2_f64(a0) {
    return _llvm_log2_f32(a0)
}
function _llvm_trap() {
    abort("trap!")
}
var _llvm_trunc_f64=Math_trunc;
function _localtime(time) {
    return _localtime_r(time,___tm_current)
}
function _emscripten_memcpy_big(dest,src,num) {
    HEAPU8.set(HEAPU8.subarray(src,src+num),dest)
}
function _usleep(useconds) {
    var msec=useconds/1e3;
    if((ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&self["performance"]&&self["performance"]["now"]) {
	var start=self["performance"]["now"]();
	while(self["performance"]["now"]()-start<msec) {

	}

    }
    else {
	var start=Date.now();
	while(Date.now()-start<msec) {

	}

    }
    return 0
}
Module["_usleep"]=_usleep;
function _nanosleep(rqtp,rmtp) {
    var seconds=HEAP32[rqtp>>2];
    var nanoseconds=HEAP32[rqtp+4>>2];
    if(rmtp!==0) {
	HEAP32[rmtp>>2]=0;
	HEAP32[rmtp+4>>2]=0
    }
    return _usleep(seconds*1e6+nanoseconds/1e3)
}
function _pathconf() {
    return _fpathconf.apply(null,arguments)
}
function _putenv(string) {
    if(string===0) {
	___setErrNo(22);
	return-1
    }
    string=UTF8ToString(string);
    var splitPoint=string.indexOf("=");
    if(string===""||string.indexOf("=")===-1) {
	___setErrNo(22);
	return-1
    }
    var name=string.slice(0,splitPoint);
    var value=string.slice(splitPoint+1);
    if(!(name in ENV)||ENV[name]!==value) {
	ENV[name]=value;
	___buildEnvironment(__get_environ())
    }
    return 0
}
function _sysconf(name) {
    switch(name) {
	case 30:return PAGE_SIZE;
	case 85:var maxHeapSize=2*1024*1024*1024-65536;
	    return maxHeapSize/PAGE_SIZE;
	case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:return 200809;
	case 79:return 0;
	case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;
	case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;
	case 74:case 60:case 69:case 70:case 4:return 1024;
	case 31:case 42:case 72:return 32;
	case 87:case 26:case 33:return 2147483647;
	case 34:case 1:return 47839;
	case 38:case 36:return 99;
	case 43:case 37:return 2048;
	case 0:return 2097152;
	case 3:return 65536;
	case 28:return 32768;
	case 44:return 32767;
	case 75:return 16384;
	case 39:return 1e3;
	case 89:return 700;
	case 71:return 256;
	case 40:return 255;
	case 2:return 100;
	case 180:return 64;
	case 25:return 20;
	case 5:return 16;
	case 6:return 6;
	case 73:return 4;
	case 84: {
	    if(typeof navigator==="object")return navigator["hardwareConcurrency"]||1;
	    return 1
	}

    }
    ___setErrNo(22);
    return-1
}
function _setgroups(ngroups,gidset) {
    if(ngroups<1||ngroups>_sysconf(3)) {
	___setErrNo(22);
	return-1
    }
    else {
	___setErrNo(1);
	return-1
    }

}
function _setitimer() {
    throw"setitimer() is not implemented yet"
}
function _setpwent() {
    throw"setpwent: TODO"
}
function _sigaction(signum,act,oldact) {
    return 0
}
function _sigaddset(set,signum) {
    HEAP32[set>>2]=HEAP32[set>>2]|1<<signum-1;
    return 0
}
function _sigdelset(set,signum) {
    HEAP32[set>>2]=HEAP32[set>>2]&~(1<<signum-1);
    return 0
}
function _sigemptyset(set) {
    HEAP32[set>>2]=0;
    return 0
}
function _sigfillset(set) {
    HEAP32[set>>2]=-1>>>0;
    return 0
}
function _sigismember(set,signum) {
    return HEAP32[set>>2]&1<<signum-1
}
function _signal(sig,func) {
    if(sig==14) {
	__sigalrm_handler=func
    }
    else {

    }
    return 0
}
function _sigpending(set) {
    HEAP32[set>>2]=0;
    return 0
}
function _sigprocmask() {
    return 0
}
function _sigsuspend() {
    err("missing function: sigsuspend");
    abort(-1)
}
function __isLeapYear(year) {
    return year%4===0&&(year%100!==0||year%400===0)
}
function __arraySum(array,index) {
    var sum=0;
    for(var i=0;
	i<=index;
	sum+=array[i++]);
    return sum
}
var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];
var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];
function __addDays(date,days) {
    var newDate=new Date(date.getTime());
    while(days>0) {
	var leap=__isLeapYear(newDate.getFullYear());
	var currentMonth=newDate.getMonth();
	var daysInCurrentMonth=(leap?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR)[currentMonth];
	if(days>daysInCurrentMonth-newDate.getDate()) {
	    days-=daysInCurrentMonth-newDate.getDate()+1;
	    newDate.setDate(1);
	    if(currentMonth<11) {
		newDate.setMonth(currentMonth+1)
	    }
	    else {
		newDate.setMonth(0);
		newDate.setFullYear(newDate.getFullYear()+1)
	    }

	}
	else {
	    newDate.setDate(newDate.getDate()+days);
	    return newDate
	}

    }
    return newDate
}
function _strftime(s,maxsize,format,tm) {
    var tm_zone=HEAP32[tm+40>>2];
    var date= {
	tm_sec:HEAP32[tm>>2],tm_min:HEAP32[tm+4>>2],tm_hour:HEAP32[tm+8>>2],tm_mday:HEAP32[tm+12>>2],tm_mon:HEAP32[tm+16>>2],tm_year:HEAP32[tm+20>>2],tm_wday:HEAP32[tm+24>>2],tm_yday:HEAP32[tm+28>>2],tm_isdst:HEAP32[tm+32>>2],tm_gmtoff:HEAP32[tm+36>>2],tm_zone:tm_zone?UTF8ToString(tm_zone):""
    }
    ;
    var pattern=UTF8ToString(format);
    var EXPANSION_RULES_1= {
	"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S"
    }
    ;
    for(var rule in EXPANSION_RULES_1) {
	pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_1[rule])
    }
    var WEEKDAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
    function leadingSomething(value,digits,character) {
	var str=typeof value==="number"?value.toString():value||"";
	while(str.length<digits) {
	    str=character[0]+str
	}
	return str
    }
    function leadingNulls(value,digits) {
	return leadingSomething(value,digits,"0")
    }
    function compareByDay(date1,date2) {
	function sgn(value) {
	    return value<0?-1:value>0?1:0
	}
	var compare;
	if((compare=sgn(date1.getFullYear()-date2.getFullYear()))===0) {
	    if((compare=sgn(date1.getMonth()-date2.getMonth()))===0) {
		compare=sgn(date1.getDate()-date2.getDate())
	    }

	}
	return compare
    }
    function getFirstWeekStartDate(janFourth) {
	switch(janFourth.getDay()) {
	    case 0:return new Date(janFourth.getFullYear()-1,11,29);
	    case 1:return janFourth;
	    case 2:return new Date(janFourth.getFullYear(),0,3);
	    case 3:return new Date(janFourth.getFullYear(),0,2);
	    case 4:return new Date(janFourth.getFullYear(),0,1);
	    case 5:return new Date(janFourth.getFullYear()-1,11,31);
	    case 6:return new Date(janFourth.getFullYear()-1,11,30)
	}

    }
    function getWeekBasedYear(date) {
	var thisDate=__addDays(new Date(date.tm_year+1900,0,1),date.tm_yday);
	var janFourthThisYear=new Date(thisDate.getFullYear(),0,4);
	var janFourthNextYear=new Date(thisDate.getFullYear()+1,0,4);
	var firstWeekStartThisYear=getFirstWeekStartDate(janFourthThisYear);
	var firstWeekStartNextYear=getFirstWeekStartDate(janFourthNextYear);
	if(compareByDay(firstWeekStartThisYear,thisDate)<=0) {
	    if(compareByDay(firstWeekStartNextYear,thisDate)<=0) {
		return thisDate.getFullYear()+1
	    }
	    else {
		return thisDate.getFullYear()
	    }

	}
	else {
	    return thisDate.getFullYear()-1
	}

    }
    var EXPANSION_RULES_2= {
	"%a":function(date) {
	    return WEEKDAYS[date.tm_wday].substring(0,3)
	}
	,"%A":function(date) {
	    return WEEKDAYS[date.tm_wday]
	}
	,"%b":function(date) {
	    return MONTHS[date.tm_mon].substring(0,3)
	}
	,"%B":function(date) {
	    return MONTHS[date.tm_mon]
	}
	,"%C":function(date) {
	    var year=date.tm_year+1900;
	    return leadingNulls(year/100|0,2)
	}
	,"%d":function(date) {
	    return leadingNulls(date.tm_mday,2)
	}
	,"%e":function(date) {
	    return leadingSomething(date.tm_mday,2," ")
	}
	,"%g":function(date) {
	    return getWeekBasedYear(date).toString().substring(2)
	}
	,"%G":function(date) {
	    return getWeekBasedYear(date)
	}
	,"%H":function(date) {
	    return leadingNulls(date.tm_hour,2)
	}
	,"%I":function(date) {
	    var twelveHour=date.tm_hour;
	    if(twelveHour==0)twelveHour=12;
	    else if(twelveHour>12)twelveHour-=12;
	    return leadingNulls(twelveHour,2)
	}
	,"%j":function(date) {
	    return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900)?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,date.tm_mon-1),3)
	}
	,"%m":function(date) {
	    return leadingNulls(date.tm_mon+1,2)
	}
	,"%M":function(date) {
	    return leadingNulls(date.tm_min,2)
	}
	,"%n":function() {
	    return"\n"
	}
	,"%p":function(date) {
	    if(date.tm_hour>=0&&date.tm_hour<12) {
		return"AM"
	    }
	    else {
		return"PM"
	    }

	}
	,"%S":function(date) {
	    return leadingNulls(date.tm_sec,2)
	}
	,"%t":function() {
	    return"\t"
	}
	,"%u":function(date) {
	    var day=new Date(date.tm_year+1900,date.tm_mon+1,date.tm_mday,0,0,0,0);
	    return day.getDay()||7
	}
	,"%U":function(date) {
	    var janFirst=new Date(date.tm_year+1900,0,1);
	    var firstSunday=janFirst.getDay()===0?janFirst:__addDays(janFirst,7-janFirst.getDay());
	    var endDate=new Date(date.tm_year+1900,date.tm_mon,date.tm_mday);
	    if(compareByDay(firstSunday,endDate)<0) {
		var februaryFirstUntilEndMonth=__arraySum(__isLeapYear(endDate.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,endDate.getMonth()-1)-31;
		var firstSundayUntilEndJanuary=31-firstSunday.getDate();
		var days=firstSundayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
		return leadingNulls(Math.ceil(days/7),2)
	    }
	    return compareByDay(firstSunday,janFirst)===0?"01":"00"
	}
	,"%V":function(date) {
	    var janFourthThisYear=new Date(date.tm_year+1900,0,4);
	    var janFourthNextYear=new Date(date.tm_year+1901,0,4);
	    var firstWeekStartThisYear=getFirstWeekStartDate(janFourthThisYear);
	    var firstWeekStartNextYear=getFirstWeekStartDate(janFourthNextYear);
	    var endDate=__addDays(new Date(date.tm_year+1900,0,1),date.tm_yday);
	    if(compareByDay(endDate,firstWeekStartThisYear)<0) {
		return"53"
	    }
	    if(compareByDay(firstWeekStartNextYear,endDate)<=0) {
		return"01"
	    }
	    var daysDifference;
	    if(firstWeekStartThisYear.getFullYear()<date.tm_year+1900) {
		daysDifference=date.tm_yday+32-firstWeekStartThisYear.getDate()
	    }
	    else {
		daysDifference=date.tm_yday+1-firstWeekStartThisYear.getDate()
	    }
	    return leadingNulls(Math.ceil(daysDifference/7),2)
	}
	,"%w":function(date) {
	    var day=new Date(date.tm_year+1900,date.tm_mon+1,date.tm_mday,0,0,0,0);
	    return day.getDay()
	}
	,"%W":function(date) {
	    var janFirst=new Date(date.tm_year,0,1);
	    var firstMonday=janFirst.getDay()===1?janFirst:__addDays(janFirst,janFirst.getDay()===0?1:7-janFirst.getDay()+1);
	    var endDate=new Date(date.tm_year+1900,date.tm_mon,date.tm_mday);
	    if(compareByDay(firstMonday,endDate)<0) {
		var februaryFirstUntilEndMonth=__arraySum(__isLeapYear(endDate.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,endDate.getMonth()-1)-31;
		var firstMondayUntilEndJanuary=31-firstMonday.getDate();
		var days=firstMondayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
		return leadingNulls(Math.ceil(days/7),2)
	    }
	    return compareByDay(firstMonday,janFirst)===0?"01":"00"
	}
	,"%y":function(date) {
	    return(date.tm_year+1900).toString().substring(2)
	}
	,"%Y":function(date) {
	    return date.tm_year+1900
	}
	,"%z":function(date) {
	    var off=date.tm_gmtoff;
	    var ahead=off>=0;
	    off=Math.abs(off)/60;
	    off=off/60*100+off%60;
	    return(ahead?"+":"-")+String("0000"+off).slice(-4)
	}
	,"%Z":function(date) {
	    return date.tm_zone
	}
	,"%%":function() {
	    return"%"
	}

    }
    ;
    for(var rule in EXPANSION_RULES_2) {
	if(pattern.indexOf(rule)>=0) {
	    pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_2[rule](date))
	}

    }
    var bytes=intArrayFromString(pattern,false);
    if(bytes.length>maxsize) {
	return 0
    }
    writeArrayToMemory(bytes,s);
    return bytes.length-1
}
function _time(ptr) {
    var ret=Date.now()/1e3|0;
    if(ptr) {
	HEAP32[ptr>>2]=ret
    }
    return ret
}
function _times(buffer) {
    if(buffer!==0) {
	_memset(buffer,0,16)
    }
    return 0
}
function _unsetenv(name) {
    if(name===0) {
	___setErrNo(22);
	return-1
    }
    name=UTF8ToString(name);
    if(name===""||name.indexOf("=")!==-1) {
	___setErrNo(22);
	return-1
    }
    if(ENV.hasOwnProperty(name)) {
	delete ENV[name];
	___buildEnvironment(__get_environ())
    }
    return 0
}
function _utime(path,times) {
    var time;
    if(times) {
	var offset=4;
	time=HEAP32[times+offset>>2];
	time*=1e3
    }
    else {
	time=Date.now()
    }
    path=UTF8ToString(path);
    try {
	FS.utime(path,time,time);
	return 0
    }
    catch(e) {
	FS.handleFSError(e);
	return-1
    }

}
function _wait(stat_loc) {
    ___setErrNo(10);
    return-1
}
if(ENVIRONMENT_IS_NODE) {
    _emscripten_get_now=function _emscripten_get_now_actual() {
	var t=process["hrtime"]();
	return t[0]*1e3+t[1]/1e6
    }

}
else if(typeof dateNow!=="undefined") {
    _emscripten_get_now=dateNow
}
else if(typeof self==="object"&&self["performance"]&&typeof self["performance"]["now"]==="function") {
    _emscripten_get_now=function() {
	return self["performance"]["now"]()
    }

}
else if(typeof performance==="object"&&typeof performance["now"]==="function") {
    _emscripten_get_now=function() {
	return performance["now"]()
    }

}
else {
    _emscripten_get_now=Date.now
}
FS.staticInit();
Module["FS_createFolder"]=FS.createFolder;
Module["FS_createPath"]=FS.createPath;
Module["FS_createDataFile"]=FS.createDataFile;
Module["FS_createPreloadedFile"]=FS.createPreloadedFile;
Module["FS_createLazyFile"]=FS.createLazyFile;
Module["FS_createLink"]=FS.createLink;
Module["FS_createDevice"]=FS.createDevice;
Module["FS_unlink"]=FS.unlink;
if(ENVIRONMENT_IS_NODE) {
    var fs=require("fs");
    var NODEJS_PATH=require("path");
    NODEFS.staticInit()
}
var ASSERTIONS=false;
function intArrayFromString(stringy,dontAddNull,length) {
    var len=length>0?length:lengthBytesUTF8(stringy)+1;
    var u8array=new Array(len);
    var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);
    if(dontAddNull)u8array.length=numBytesWritten;
    return u8array
}
function invoke_i(index) {
    var sp=stackSave();
    try {
	return dynCall_i(index)
    }
    catch(e) {
	stackRestore(sp);
	if(e!==e+0&&e!=="longjmp")throw e;
	_setThrew(1,0)
    }

}
function invoke_ii(index,a1) {
    var sp=stackSave();
    try {
	return dynCall_ii(index,a1)
    }
    catch(e) {
	stackRestore(sp);
	if(e!==e+0&&e!=="longjmp")throw e;
	_setThrew(1,0)
    }

}
function invoke_iii(index,a1,a2) {
    var sp=stackSave();
    try {
	return dynCall_iii(index,a1,a2)
    }
    catch(e) {
	stackRestore(sp);
	if(e!==e+0&&e!=="longjmp")throw e;
	_setThrew(1,0)
    }

}
function invoke_iiii(index,a1,a2,a3) {
    var sp=stackSave();
    try {
	return dynCall_iiii(index,a1,a2,a3)
    }
    catch(e) {
	stackRestore(sp);
	if(e!==e+0&&e!=="longjmp")throw e;
	_setThrew(1,0)
    }

}
function invoke_iiiii(index,a1,a2,a3,a4) {
    var sp=stackSave();
    try {
	return dynCall_iiiii(index,a1,a2,a3,a4)
    }
    catch(e) {
	stackRestore(sp);
	if(e!==e+0&&e!=="longjmp")throw e;
	_setThrew(1,0)
    }

}
function invoke_iiiiiii(index,a1,a2,a3,a4,a5,a6) {
    var sp=stackSave();
    try {
	return dynCall_iiiiiii(index,a1,a2,a3,a4,a5,a6)
    }
    catch(e) {
	stackRestore(sp);
	if(e!==e+0&&e!=="longjmp")throw e;
	_setThrew(1,0)
    }

}
function invoke_v(index) {
    var sp=stackSave();
    try {
	dynCall_v(index)
    }
    catch(e) {
	stackRestore(sp);
	if(e!==e+0&&e!=="longjmp")throw e;
	_setThrew(1,0)
    }

}
function invoke_vi(index,a1) {
    var sp=stackSave();
    try {
	dynCall_vi(index,a1)
    }
    catch(e) {
	stackRestore(sp);
	if(e!==e+0&&e!=="longjmp")throw e;
	_setThrew(1,0)
    }

}
function invoke_vii(index,a1,a2) {
    var sp=stackSave();
    try {
	dynCall_vii(index,a1,a2)
    }
    catch(e) {
	stackRestore(sp);
	if(e!==e+0&&e!=="longjmp")throw e;
	_setThrew(1,0)
    }

}
function invoke_viii(index,a1,a2,a3) {
    var sp=stackSave();
    try {
	dynCall_viii(index,a1,a2,a3)
    }
    catch(e) {
	stackRestore(sp);
	if(e!==e+0&&e!=="longjmp")throw e;
	_setThrew(1,0)
    }

}
function invoke_viiii(index,a1,a2,a3,a4) {
    var sp=stackSave();
    try {
	dynCall_viiii(index,a1,a2,a3,a4)
    }
    catch(e) {
	stackRestore(sp);
	if(e!==e+0&&e!=="longjmp")throw e;
	_setThrew(1,0)
    }

}
var asmGlobalArg= {

}
;
var asmLibraryArg= {
    "abort":abort,"setTempRet0":setTempRet0,"getTempRet0":getTempRet0,"invoke_i":invoke_i,"invoke_ii":invoke_ii,"invoke_iii":invoke_iii,"invoke_iiii":invoke_iiii,"invoke_iiiii":invoke_iiiii,"invoke_iiiiiii":invoke_iiiiiii,"invoke_v":invoke_v,"invoke_vi":invoke_vi,"invoke_vii":invoke_vii,"invoke_viii":invoke_viii,"invoke_viiii":invoke_viiii,"___assert_fail":___assert_fail,"___buildEnvironment":___buildEnvironment,"___clock_gettime":___clock_gettime,"___lock":___lock,"___map_file":___map_file,"___setErrNo":___setErrNo,"___syscall10":___syscall10,"___syscall102":___syscall102,"___syscall118":___syscall118,"___syscall12":___syscall12,"___syscall122":___syscall122,"___syscall132":___syscall132,"___syscall133":___syscall133,"___syscall14":___syscall14,"___syscall140":___syscall140,"___syscall142":___syscall142,"___syscall145":___syscall145,"___syscall146":___syscall146,"___syscall15":___syscall15,"___syscall168":___syscall168,"___syscall183":___syscall183,"___syscall193":___syscall193,"___syscall194":___syscall194,"___syscall195":___syscall195,"___syscall196":___syscall196,"___syscall197":___syscall197,"___syscall198":___syscall198,"___syscall199":___syscall199,"___syscall20":___syscall20,"___syscall200":___syscall200,"___syscall201":___syscall201,"___syscall202":___syscall202,"___syscall205":___syscall205,"___syscall207":___syscall207,"___syscall212":___syscall212,"___syscall220":___syscall220,"___syscall221":___syscall221,"___syscall29":___syscall29,"___syscall3":___syscall3,"___syscall301":___syscall301,"___syscall302":___syscall302,"___syscall303":___syscall303,"___syscall33":___syscall33,"___syscall330":___syscall330,"___syscall331":___syscall331,"___syscall34":___syscall34,"___syscall38":___syscall38,"___syscall39":___syscall39,"___syscall4":___syscall4,"___syscall40":___syscall40,"___syscall41":___syscall41,"___syscall42":___syscall42,"___syscall5":___syscall5,"___syscall54":___syscall54,"___syscall57":___syscall57,"___syscall6":___syscall6,"___syscall60":___syscall60,"___syscall63":___syscall63,"___syscall64":___syscall64,"___syscall66":___syscall66,"___syscall83":___syscall83,"___syscall85":___syscall85,"___syscall9":___syscall9,"___syscall91":___syscall91,"___syscall94":___syscall94,"___syscall96":___syscall96,"___syscall97":___syscall97,"___unlock":___unlock,"__addDays":__addDays,"__arraySum":__arraySum,"__exit":__exit,"__inet_ntop4_raw":__inet_ntop4_raw,"__inet_ntop6_raw":__inet_ntop6_raw,"__inet_pton4_raw":__inet_pton4_raw,"__inet_pton6_raw":__inet_pton6_raw,"__isLeapYear":__isLeapYear,"__read_sockaddr":__read_sockaddr,"__write_sockaddr":__write_sockaddr,"_abort":_abort,"_alarm":_alarm,"_asctime":_asctime,"_asctime_r":_asctime_r,"_chroot":_chroot,"_clearenv":_clearenv,"_clock":_clock,"_clock_gettime":_clock_gettime,"_ctime":_ctime,"_ctime_r":_ctime_r,"_difftime":_difftime,"_emscripten_get_heap_size":_emscripten_get_heap_size,"_emscripten_get_now":_emscripten_get_now,"_emscripten_get_now_is_monotonic":_emscripten_get_now_is_monotonic,"_emscripten_longjmp":_emscripten_longjmp,"_emscripten_memcpy_big":_emscripten_memcpy_big,"_emscripten_resize_heap":_emscripten_resize_heap,"_endprotoent":_endprotoent,"_endpwent":_endpwent,"_execl":_execl,"_execv":_execv,"_execvp":_execvp,"_exit":_exit,"_flock":_flock,"_fork":_fork,"_fpathconf":_fpathconf,"_gai_strerror":_gai_strerror,"_getaddrinfo":_getaddrinfo,"_getenv":_getenv,"_getgrgid":_getgrgid,"_getgrnam":_getgrnam,"_gethostbyname":_gethostbyname,"_getitimer":_getitimer,"_getnameinfo":_getnameinfo,"_getprotobyname":_getprotobyname,"_getprotobynumber":_getprotobynumber,"_getprotoent":_getprotoent,"_getpwent":_getpwent,"_getpwnam":_getpwnam,"_getpwuid":_getpwuid,"_gettimeofday":_gettimeofday,"_gmtime":_gmtime,"_gmtime_r":_gmtime_r,"_js_eval_js":_js_eval_js,"_kill":_kill,"_llvm_exp2_f32":_llvm_exp2_f32,"_llvm_exp2_f64":_llvm_exp2_f64,"_llvm_fma_f64":_llvm_fma_f64,"_llvm_log10_f32":_llvm_log10_f32,"_llvm_log10_f64":_llvm_log10_f64,"_llvm_log2_f32":_llvm_log2_f32,"_llvm_log2_f64":_llvm_log2_f64,"_llvm_trap":_llvm_trap,"_llvm_trunc_f64":_llvm_trunc_f64,"_localtime":_localtime,"_localtime_r":_localtime_r,"_longjmp":_longjmp,"_mktime":_mktime,"_nanosleep":_nanosleep,"_pathconf":_pathconf,"_putenv":_putenv,"_setgroups":_setgroups,"_setitimer":_setitimer,"_setprotoent":_setprotoent,"_setpwent":_setpwent,"_sigaction":_sigaction,"_sigaddset":_sigaddset,"_sigdelset":_sigdelset,"_sigemptyset":_sigemptyset,"_sigfillset":_sigfillset,"_sigismember":_sigismember,"_signal":_signal,"_sigpending":_sigpending,"_sigprocmask":_sigprocmask,"_sigsuspend":_sigsuspend,"_strftime":_strftime,"_sysconf":_sysconf,"_time":_time,"_times":_times,"_tzset":_tzset,"_unsetenv":_unsetenv,"_usleep":_usleep,"_utime":_utime,"_wait":_wait,"abortOnCannotGrowMemory":abortOnCannotGrowMemory,"emscripten_realloc_buffer":emscripten_realloc_buffer,"tempDoublePtr":tempDoublePtr,"DYNAMICTOP_PTR":DYNAMICTOP_PTR
}
    ;
    var asm=Module["asm"](asmGlobalArg,asmLibraryArg,buffer);
    Module["asm"]=asm;
    var _Perl_call_argv=Module["_Perl_call_argv"]=function() {
	return Module["asm"]["_Perl_call_argv"].apply(null,arguments)
    }
    ;
    var _Perl_call_method=Module["_Perl_call_method"]=function() {
	return Module["asm"]["_Perl_call_method"].apply(null,arguments)
    }
    ;
    var _Perl_call_pv=Module["_Perl_call_pv"]=function() {
	return Module["asm"]["_Perl_call_pv"].apply(null,arguments)
    }
    ;
    var _Perl_call_sv=Module["_Perl_call_sv"]=function() {
	return Module["asm"]["_Perl_call_sv"].apply(null,arguments)
    }
    ;
    var _Perl_eval_pv=Module["_Perl_eval_pv"]=function() {
	return Module["asm"]["_Perl_eval_pv"].apply(null,arguments)
    }
    ;
    var _Perl_eval_sv=Module["_Perl_eval_sv"]=function() {
	return Module["asm"]["_Perl_eval_sv"].apply(null,arguments)
    }
    ;
    var ___em_js__js_eval_js=Module["___em_js__js_eval_js"]=function() {
	return Module["asm"]["___em_js__js_eval_js"].apply(null,arguments)
    }
    ;
    var ___emscripten_environ_constructor=Module["___emscripten_environ_constructor"]=function() {
	return Module["asm"]["___emscripten_environ_constructor"].apply(null,arguments)
    }
    ;
    var ___errno_location=Module["___errno_location"]=function() {
	return Module["asm"]["___errno_location"].apply(null,arguments)
    }
    ;
    var __get_daylight=Module["__get_daylight"]=function() {
	return Module["asm"]["__get_daylight"].apply(null,arguments)
    }
    ;
    var __get_environ=Module["__get_environ"]=function() {
	return Module["asm"]["__get_environ"].apply(null,arguments)
    }
    ;
    var __get_timezone=Module["__get_timezone"]=function() {
	return Module["asm"]["__get_timezone"].apply(null,arguments)
    }
    ;
    var __get_tzname=Module["__get_tzname"]=function() {
	return Module["asm"]["__get_tzname"].apply(null,arguments)
    }
    ;
    var _emperl_end_perl=Module["_emperl_end_perl"]=function() {
	return Module["asm"]["_emperl_end_perl"].apply(null,arguments)
    }
    ;
    var _emscripten_replace_memory=Module["_emscripten_replace_memory"]=function() {
	return Module["asm"]["_emscripten_replace_memory"].apply(null,arguments)
    }
    ;
    var _free=Module["_free"]=function() {
	return Module["asm"]["_free"].apply(null,arguments)
    }
    ;
    var _htonl=Module["_htonl"]=function() {
	return Module["asm"]["_htonl"].apply(null,arguments)
    }
    ;
    var _htons=Module["_htons"]=function() {
	return Module["asm"]["_htons"].apply(null,arguments)
    }
    ;
    var _llvm_bswap_i16=Module["_llvm_bswap_i16"]=function() {
	return Module["asm"]["_llvm_bswap_i16"].apply(null,arguments)
    }
    ;
    var _llvm_bswap_i32=Module["_llvm_bswap_i32"]=function() {
	return Module["asm"]["_llvm_bswap_i32"].apply(null,arguments)
    }
    ;
    var _llvm_maxnum_f64=Module["_llvm_maxnum_f64"]=function() {
	return Module["asm"]["_llvm_maxnum_f64"].apply(null,arguments)
    }
    ;
    var _llvm_minnum_f64=Module["_llvm_minnum_f64"]=function() {
	return Module["asm"]["_llvm_minnum_f64"].apply(null,arguments)
    }
    ;
    var _llvm_nearbyint_f64=Module["_llvm_nearbyint_f64"]=function() {
	return Module["asm"]["_llvm_nearbyint_f64"].apply(null,arguments)
    }
    ;
    var _llvm_rint_f64=Module["_llvm_rint_f64"]=function() {
	return Module["asm"]["_llvm_rint_f64"].apply(null,arguments)
    }
    ;
    var _llvm_round_f64=Module["_llvm_round_f64"]=function() {
	return Module["asm"]["_llvm_round_f64"].apply(null,arguments)
    }
    ;
    var _main=Module["_main"]=function() {
	return Module["asm"]["_main"].apply(null,arguments)
    }
    ;
    var _malloc=Module["_malloc"]=function() {
	return Module["asm"]["_malloc"].apply(null,arguments)
    }
    ;
    var _memcpy=Module["_memcpy"]=function() {
	return Module["asm"]["_memcpy"].apply(null,arguments)
    }
    ;
    var _memmove=Module["_memmove"]=function() {
	return Module["asm"]["_memmove"].apply(null,arguments)
    }
    ;
    var _memset=Module["_memset"]=function() {
	return Module["asm"]["_memset"].apply(null,arguments)
    }
    ;
    var _ntohs=Module["_ntohs"]=function() {
	return Module["asm"]["_ntohs"].apply(null,arguments)
    }
    ;
    var _realloc=Module["_realloc"]=function() {
	return Module["asm"]["_realloc"].apply(null,arguments)
    }
    ;
    var _round=Module["_round"]=function() {
	return Module["asm"]["_round"].apply(null,arguments)
    }
    ;
    var _saveSetjmp=Module["_saveSetjmp"]=function() {
	return Module["asm"]["_saveSetjmp"].apply(null,arguments)
    }
    ;
    var _sbrk=Module["_sbrk"]=function() {
	return Module["asm"]["_sbrk"].apply(null,arguments)
    }
    ;
    var _setThrew=Module["_setThrew"]=function() {
	return Module["asm"]["_setThrew"].apply(null,arguments)
    }
    ;
    var _testSetjmp=Module["_testSetjmp"]=function() {
	return Module["asm"]["_testSetjmp"].apply(null,arguments)
    }
    ;
    var _webperl_eval_perl=Module["_webperl_eval_perl"]=function() {
	return Module["asm"]["_webperl_eval_perl"].apply(null,arguments)
    }
    ;
    var establishStackSpace=Module["establishStackSpace"]=function() {
	return Module["asm"]["establishStackSpace"].apply(null,arguments)
    }
    ;
    var stackAlloc=Module["stackAlloc"]=function() {
	return Module["asm"]["stackAlloc"].apply(null,arguments)
    }
    ;
    var stackRestore=Module["stackRestore"]=function() {
	return Module["asm"]["stackRestore"].apply(null,arguments)
    }
    ;
    var stackSave=Module["stackSave"]=function() {
	return Module["asm"]["stackSave"].apply(null,arguments)
    }
    ;
    var dynCall_d=Module["dynCall_d"]=function() {
	return Module["asm"]["dynCall_d"].apply(null,arguments)
    }
    ;
    var dynCall_i=Module["dynCall_i"]=function() {
	return Module["asm"]["dynCall_i"].apply(null,arguments)
    }
    ;
    var dynCall_ii=Module["dynCall_ii"]=function() {
	return Module["asm"]["dynCall_ii"].apply(null,arguments)
    }
    ;
    var dynCall_iii=Module["dynCall_iii"]=function() {
	return Module["asm"]["dynCall_iii"].apply(null,arguments)
    }
    ;
    var dynCall_iiii=Module["dynCall_iiii"]=function() {
	return Module["asm"]["dynCall_iiii"].apply(null,arguments)
    }
    ;
    var dynCall_iiiii=Module["dynCall_iiiii"]=function() {
	return Module["asm"]["dynCall_iiiii"].apply(null,arguments)
    }
    ;
    var dynCall_iiiiii=Module["dynCall_iiiiii"]=function() {
	return Module["asm"]["dynCall_iiiiii"].apply(null,arguments)
    }
    ;
    var dynCall_iiiiiii=Module["dynCall_iiiiiii"]=function() {
	return Module["asm"]["dynCall_iiiiiii"].apply(null,arguments)
    }
    ;
    var dynCall_iiiiiiii=Module["dynCall_iiiiiiii"]=function() {
	return Module["asm"]["dynCall_iiiiiiii"].apply(null,arguments)
    }
    ;
    var dynCall_iiiiiiiii=Module["dynCall_iiiiiiiii"]=function() {
	return Module["asm"]["dynCall_iiiiiiiii"].apply(null,arguments)
    }
    ;
    var dynCall_iiiiiiiiiii=Module["dynCall_iiiiiiiiiii"]=function() {
	return Module["asm"]["dynCall_iiiiiiiiiii"].apply(null,arguments)
    }
    ;
    var dynCall_v=Module["dynCall_v"]=function() {
	return Module["asm"]["dynCall_v"].apply(null,arguments)
    }
    ;
    var dynCall_vi=Module["dynCall_vi"]=function() {
	return Module["asm"]["dynCall_vi"].apply(null,arguments)
    }
    ;
    var dynCall_vii=Module["dynCall_vii"]=function() {
	return Module["asm"]["dynCall_vii"].apply(null,arguments)
    }
    ;
    var dynCall_viii=Module["dynCall_viii"]=function() {
	return Module["asm"]["dynCall_viii"].apply(null,arguments)
    }
    ;
    var dynCall_viiii=Module["dynCall_viiii"]=function() {
	return Module["asm"]["dynCall_viiii"].apply(null,arguments)
    }
    ;
    Module["asm"]=asm;
    Module["ccall"]=ccall;
    Module["cwrap"]=cwrap;
    Module["getMemory"]=getMemory;
    Module["addRunDependency"]=addRunDependency;
    Module["removeRunDependency"]=removeRunDependency;
    Module["FS_createFolder"]=FS.createFolder;
    Module["FS_createPath"]=FS.createPath;
    Module["FS_createDataFile"]=FS.createDataFile;
    Module["FS_createPreloadedFile"]=FS.createPreloadedFile;
    Module["FS_createLazyFile"]=FS.createLazyFile;
    Module["FS_createLink"]=FS.createLink;
    Module["FS_createDevice"]=FS.createDevice;
    Module["FS_unlink"]=FS.unlink;
    function ExitStatus(status) {
	this.name="ExitStatus";
	this.message="Program terminated with exit("+status+")";
	this.status=status
    }
    ExitStatus.prototype=new Error;
    ExitStatus.prototype.constructor=ExitStatus;
    var calledMain=false;
    dependenciesFulfilled=function runCaller() {
	if(!Module["calledRun"])run();
	if(!Module["calledRun"])dependenciesFulfilled=runCaller
    }
    ;
    Module["callMain"]=function callMain(args) {
	args=args||[];
	ensureInitRuntime();
	var argc=args.length+1;
	var argv=stackAlloc((argc+1)*4);
	HEAP32[argv>>2]=allocateUTF8OnStack(Module["thisProgram"]);
	for(var i=1;
	    i<argc;
	    i++) {
		HEAP32[(argv>>2)+i]=allocateUTF8OnStack(args[i-1])
	    }
	HEAP32[(argv>>2)+argc]=0;
	try {
	    var ret=Module["_main"](argc,argv,0);
	    exit(ret,true)
	}
	catch(e) {
	    if(e instanceof ExitStatus) {
		return
	    }
	    else if(e=="SimulateInfiniteLoop") {
		Module["noExitRuntime"]=true;
		return
	    }
	    else {
		var toLog=e;
		if(e&&typeof e==="object"&&e.stack) {
		    toLog=[e,e.stack]
		}
		err("exception thrown: "+toLog);
		Module["quit"](1,e)
	    }

	}
	finally {
	    calledMain=true
	}

    }
    ;
    function run(args) {
	args=args||Module["arguments"];
	if(runDependencies>0) {
	    return
	}
	preRun();
	if(runDependencies>0)return;
	if(Module["calledRun"])return;
	function doRun() {
	    if(Module["calledRun"])return;
	    Module["calledRun"]=true;
	    if(ABORT)return;
	    ensureInitRuntime();
	    preMain();
	    if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();
	    if(Module["_main"]&&shouldRunNow)Module["callMain"](args);
	    postRun()
	}
	if(Module["setStatus"]) {
	    Module["setStatus"]("Running...");
	    setTimeout(function() {
		setTimeout(function() {
		    Module["setStatus"]("")
		}
		    ,1);
		doRun()
	    }
		,1)
	}
	else {
	    doRun()
	}

    }
    Module["run"]=run;
    function exit(status,implicit) {
	if(implicit&&Module["noExitRuntime"]&&status===0) {
	    return
	}
	if(Module["noExitRuntime"]) {

	}
	else {
	    ABORT=true;
	    EXITSTATUS=status;
	    exitRuntime();
	    if(Module["onExit"])Module["onExit"](status)
	}
	Module["quit"](status,new ExitStatus(status))
    }
    function abort(what) {
	if(Module["onAbort"]) {
	    Module["onAbort"](what)
	}
	if(what!==undefined) {
	    out(what);
	    err(what);
	    what=JSON.stringify(what)
	}
	else {
	    what=""
	}
	ABORT=true;
	EXITSTATUS=1;
	throw"abort("+what+"). Build with -s ASSERTIONS=1 for more info."
    }
    Module["abort"]=abort;
    if(Module["preInit"]) {
	if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];
	while(Module["preInit"].length>0) {
	    Module["preInit"].pop()()
	}

    }
    var shouldRunNow=true;
    if(Module["noInitialRun"]) {
	shouldRunNow=false
    }
    Module["noExitRuntime"]=true;
    run();

