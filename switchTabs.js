// jaise hi hum weather application me "Your Weather" wale tab se "Search Weather" wale Tab pe click krte hai
// to uss case me kbhi bhi window switch nahi hoti
// dono pages already same window pe present hote hai
// bss unki opacity and classList("active") ke sath play krte hai
// , i.e., ke agr "Your Weather" pe click hua h to "Search Weather" ke contents ki opacity ko 0 krdo and usko hide krdo
// and agr "Search Weather" pe click hua h to "Your Weather" ke contents ki opacity ko 0 krdo and usko hide krdo
// to iss cheez ko krne ka logic below function me defined hai
function switchTab(clickedTab) {
    apiErrorContainer.classList.remove("active");

    if(clickedTab !== currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grandAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
        }
    }
}