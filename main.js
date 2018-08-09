//xhr
var xhr = new XMLHttpRequest();
xhr.open('get', './attractionapi.json', false);
xhr.send(null);

//資料
var data = JSON.parse(xhr.responseText);
var dataLen = data.result.records.length;

//districtAll: 代表未篩選過區域的陣列
var districtAll = [];
for (var i = 0; i < dataLen; i++) {
    var el = data.result.records[i].Zone;
    districtAll.push(el);
}

//篩選取出元素重複的次數



//篩選出各區到陣列result
//result: 代表篩選過區域的陣列
var result = districtAll.filter(function (element, index, arr) {
    return arr.indexOf(element) === index;
});

//放進selectBox裡面
var select_box = document.querySelector('#select_box');
var txt = '<option value="" disabled selected> -- 請選擇行政區</option><option value="全部行政區">全部行政區</option>';
for (var i = 0; i < result.length; i++) {
    var el = '<option value="' + result[i] + '">' + result[i] + '</option>';
    txt += el;
}
select_box.innerHTML = txt;

//DOM
var dataCardBox = document.querySelector('.dataCardBox');
var pageNav = document.querySelector('.pageNav');
var pageNavLi = document.querySelectorAll('.pageNavLi');

//事件
pageNav.addEventListener('click', pageNum_click, false);
select_box.addEventListener('change', select_change, false);

//初始
var pageNum = 1;
var dataNum_start = (pageNum - 1) * 20;
var dataNum_end = dataNum_start + 20;
var dataCardBox_txt = '';
updateList();
pageNavLi[0].style.color = 'rgba(74,74,74,0.50)';
pageNavLi[1].style.color = '#559AC8';



function select_change(e) {
    var selectValue = e.target.value;
    console.log(selectValue);
    dataCardBox_txt = '';

    if (selectValue !== '全部行政區') {
        pageNav.style.visibility = "hidden";
        for (var i = 0; i < 100; i++) {
            if (data.result.records[i].Zone == selectValue) {
                console.log('123');
                var dataCardBox_el = data.result.records[i];
                var dataCardBox_li_01 =
                    '<li class="dataCard"><div class="picbox" style="background-image: url('
                    + dataCardBox_el.Picture1
                    + ');"><h3>'
                    + dataCardBox_el.Name
                    + '</h3><p>'
                    + dataCardBox_el.Zone
                    + '</p></div><div class="txtbox"><div class="box"><div class="img" ><img style="height: 100%;" src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_clock.png" alt=""></div><p>'
                    + dataCardBox_el.Opentime
                    + '</p></div><div class="box"><div class="img" ><img style="height: 100%;" src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_pin.png" alt=""></div><p>'
                    + dataCardBox_el.Add
                    + '</p></div><div class="box"><div class="img" ><img style="height: 100%;" src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_phone.png" alt=""></div><p>'
                    + dataCardBox_el.Tel
                    + '</p></div></div>';

                if (dataCardBox_el.Ticketinfo == '免費參觀') {
                    var dataCardBox_li_02 =
                        '<div class="visitBox"><div class="img"><img src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_tag.png" alt=""></div><p>'
                        + dataCardBox_el.Ticketinfo
                        + '</p></div></li>';
                    var dataCardBox_li = dataCardBox_li_01 + dataCardBox_li_02;
                } else {
                    var dataCardBox_li = dataCardBox_li_01;
                }

                dataCardBox_txt += dataCardBox_li;
            }
        }
        dataCardBox.innerHTML = dataCardBox_txt;
    }else{
        pageNav.style.visibility = "visible";
        updateList();
    }
}

function pageNum_click(e) {
    pageNavLi[0].style.color = '#4A4A4A';
    pageNavLi[1].style.color = '#4A4A4A';
    pageNavLi[2].style.color = '#4A4A4A';
    pageNavLi[3].style.color = '#4A4A4A';
    pageNavLi[4].style.color = '#4A4A4A';
    pageNavLi[5].style.color = '#4A4A4A';
    pageNavLi[6].style.color = '#4A4A4A';
    var pageBtn = e.target.dataset.pagebtn;
    if (pageBtn == 'after') {
        if (pageNum<5){
            pageNum += 1;
        }
        updateList();
    } else if (pageBtn == 'before'){
        if (pageNum > 1) {
            pageNum -= 1;
        }
        updateList();
    } else {
        pageNum = parseInt(e.target.dataset.pagenum);
        switch (pageNum) {
            case 1:
                pageNavLi[0].style.color = 'rgba(74,74,74,0.50)';
                pageNavLi[1].style.color = '#559AC8';
                updateList();
                break;
            case 2:
                pageNavLi[2].style.color = '#559AC8';
                updateList();
                break;
            case 3:
                pageNavLi[3].style.color = '#559AC8';
                updateList();
                break;
            case 4:
                pageNavLi[4].style.color = '#559AC8';
                updateList();
                break;
            case 5:
                pageNavLi[5].style.color = '#559AC8';
                pageNavLi[6].style.color = 'rgba(74,74,74,0.50)';
                updateList();
                break;
            default:
                break;
        }
    }
}

function updateList() {
    pageData();
    setData();
    dataCardBox.innerHTML = dataCardBox_txt;
}

function setData() {
    dataCardBox_txt = '';
    for (var i = dataNum_start; i < dataNum_end; i++) {
        // if (data.result.records[i].Zone == selectValue) {
        //     console.log('123');
        // }
        var dataCardBox_el = data.result.records[i];
        var dataCardBox_li_01 =
            '<li class="dataCard"><div class="picbox" style="background-image: url('
            + dataCardBox_el.Picture1
            + ');"><h3>'
            + dataCardBox_el.Name
            + '</h3><p>'
            + dataCardBox_el.Zone
            + '</p></div><div class="txtbox"><div class="box"><div class="img" ><img style="height: 100%;" src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_clock.png" alt=""></div><p>'
            + dataCardBox_el.Opentime
            + '</p></div><div class="box"><div class="img" ><img style="height: 100%;" src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_pin.png" alt=""></div><p>'
            + dataCardBox_el.Add
            + '</p></div><div class="box"><div class="img" ><img style="height: 100%;" src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_phone.png" alt=""></div><p>'
            + dataCardBox_el.Tel
            + '</p></div></div>';

        if (dataCardBox_el.Ticketinfo == '免費參觀') {
            var dataCardBox_li_02 =
                '<div class="visitBox"><div class="img"><img src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_tag.png" alt=""></div><p>'
                + dataCardBox_el.Ticketinfo
                + '</p></div></li>';
            var dataCardBox_li = dataCardBox_li_01 + dataCardBox_li_02;
        } else {
            var dataCardBox_li = dataCardBox_li_01;
        }
        
        dataCardBox_txt += dataCardBox_li;
    }
}

function pageData() {
    dataNum_start = (pageNum - 1) * 20;
    dataNum_end = dataNum_start + 20;
    console.log(pageNum, dataNum_start, dataNum_end);
}

