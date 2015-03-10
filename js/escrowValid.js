
function goValidEscrow(mertid){
	var strMertid = mertid; 
	window.open("https://pgweb.uplus.co.kr/pg/wmp/mertadmin/jsp/mertservice/s_escrowYn.jsp?mertid="+strMertid,"check","width=339, height=263, scrollbars=no, left = 200, top = 50");		

}


function goValidEscrowByBusiNo(busino, hashdata){
	window.open("https://pgweb.uplus.co.kr/pg/wmp/mertadmin/jsp/mertservice/s_escrowYn.jsp?busino="+busino+"&hashdata="+hashdata,"check","width=339, height=263, scrollbars=no, left = 200, top = 50");		
}
