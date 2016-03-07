function entryChange() {
    radio = document.getElementsByName('mode')
    if (radio[0].checked) {
        //フォーム
        document.getElementById('PID1').style.display = "";
        document.getElementById('PID2').style.display = "";
        document.getElementById('PID3').style.display = "";
        document.getElementById('State1').style.display = "none";
        document.getElementById('State2').style.display = "none";
        document.getElementById('State3').style.display = "none";
        document.getElementById('State4').style.display = "none";
        document.getElementById('State5').style.display = "none";
        document.getElementById('State6').style.display = "none";
        document.getElementById('State7').style.display = "none";
        document.getElementById('State8').style.display = "none";
    } else if (radio[1].checked) {
        //フォーム
        document.getElementById('PID1').style.display = "none";
        document.getElementById('PID2').style.display = "none";
        document.getElementById('PID3').style.display = "none";
        document.getElementById('State1').style.display = "";
        document.getElementById('State2').style.display = "";
        document.getElementById('State3').style.display = "";
        document.getElementById('State4').style.display = "";
        document.getElementById('State5').style.display = "";
        document.getElementById('State6').style.display = "";
        document.getElementById('State7').style.display = "";
        document.getElementById('State8').style.display = "";
    }
}

//オンロードさせ、リロード時に選択を保持
window.onload = entryChange;
