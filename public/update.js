window.addEventListener('DOMContentLoaded', init);

function init() {
    let input = document.getElementById('level');
    let radio1 = document.getElementById('level1');
    let radio2 = document.getElementById('level2');
    let radio3 = document.getElementById('level3');
    let radio = [radio1, radio2, radio3];
    let status = document.getElementById('status');
    let available = document.getElementById('available');
    let forbidden = document.getElementById('forbidden');
    let status_radio = [available, forbidden];

    for (let i = 1; i<4; i++) {
        if (i == input.value) {
            radio[i-1].checked = true;
        }
    }

    radio1.addEventListener('click', changeValue1);
    function changeValue1() {
        input.value = 1;
        radio[1].checked = false;
        radio[2].checked = false;
    }

    radio2.addEventListener('click', changeValue2);
    function changeValue2() {
        input.value = 2;
        radio[0].checked = false;
        radio[2].checked = false;
    }

    radio3.addEventListener('click', changeValue3);
    function changeValue3() {
        input.value = 3;
        radio[0].checked = false;
        radio[1].checked = false;
    }

    if (status.value == 'Available') {
        status_radio[0].checked = true;
    } else {
        status_radio[1].checked = true;
    }

    available.addEventListener('click', availableFunc);
    function availableFunc() {
        status.value = 'Available';
        status_radio[0].checked = true;
        status_radio[1].checked = false;
    }

    forbidden.addEventListener('click', forbiddenFunc);
    function forbiddenFunc() {
        status.value = 'Forbidden';
        status_radio[0].checked = false;
        status_radio[1].checked = true;
    }
}