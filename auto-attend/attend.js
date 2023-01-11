window.addEventListener('load', function () {
    const buttons = document.getElementsByClassName('time-stamp-button')
    let attend_button = null

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent.indexOf('出勤') > 0) {
            attend_button = buttons[i]
        } else if (buttons[i].textContent.indexOf('休憩開始') > 0) {
            break_button = buttons[i]
        } else if (buttons[i].textContent.indexOf('休憩終了') > 0) {
            break_fin_button = buttons[i]
        }
    }
    const token = "tokenを入力";
    const date = new Date();

    attend_button.addEventListener('click', function () {
        // 勤務時間自動報告
        const start_at = date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0');
        const finish_at = (date.getHours() + 8) + ":" + date.getMinutes().toString().padStart(2, '0');
        const message = "出勤しました\n" + start_at + '-' + finish_at;

        const channel = 'チャンネル名を入力';

        const request = new XMLHttpRequest();
        request.open('POST', 'https://slack.com/api/chat.postMessage', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(`token=${token}&channel=${channel}&text=${message}`);
    })

    break_button.addEventListener('click', function () {
        // 休憩時のステータス更新
        const profile = JSON.stringify({
            "status_text": "食事中",
            "status_emoji": ":rice:",
        });

        const request = new XMLHttpRequest();
        request.open('POST', 'https://slack.com/api/users.profile.set', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(`token=${token}&profile=${profile}`);
    })

    break_fin_button.addEventListener('click', function () {
        // 休憩時のステータス更新
        const profile = JSON.stringify({
            "status_text": "",
            "status_emoji": "",
        });

        const request = new XMLHttpRequest();
        request.open('POST', 'https://slack.com/api/users.profile.set', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(`token=${token}&profile=${profile}`);
    })
});
