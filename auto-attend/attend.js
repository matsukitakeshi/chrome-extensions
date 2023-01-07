window.addEventListener('load', function () {
    const buttons = document.getElementsByClassName('time-stamp-button')
    let attend_button = null

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent.indexOf('出勤') > 0) {
            attend_button = buttons[i]
        }
    }

    attend_button.addEventListener('click', function () {
        const date = new Date();
        const start_at = date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0');
        const finish_at = (date.getHours() + 8) + ":" + date.getMinutes().toString().padStart(2, '0');
        const message = "出勤しました\n" + start_at + '-' + finish_at;

        const channel = 'チャンネル名を入力';
        const token = "tokenを入力"

        const request = new XMLHttpRequest();
        request.open('POST', 'https://slack.com/api/chat.postMessage', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(`token=${token}&channel=${channel}&text=${message}`);
    })
});
