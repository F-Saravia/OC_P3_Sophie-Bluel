class CodedError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message;
    }
}

function displayPopoverInfoMessage(message) {
    const popover = document.createElement('div');
    popover.className = "popover-message";
    popover.innerText = message;

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeBtn.onclick = () => { popover.remove(); };

    popover.appendChild(closeBtn);
    document.body.append(popover);

    setTimeout(() => {
        popover.remove();
    }, 3000);
}