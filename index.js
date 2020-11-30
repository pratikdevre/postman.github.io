console.log("hey there!!!!!");
let addedParamCount = 0


function getElementByString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

document.getElementById('paramsBox').style.display = "none";

// show/hide parameterbox or requestbox
let json = document.getElementById("json");
json.addEventListener("click", () => {

    document.getElementById('requestBox').style.display = "block";
    document.getElementById('paramsBox').style.display = "none";

});
let customParams = document.getElementById("customParams");
customParams.addEventListener("click", () => {

    document.getElementById('requestBox').style.display = "none";
    document.getElementById('paramsBox').style.display = "block";
});

// add more param on clicking +
let btn = document.getElementById("btn");
btn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("you clicked on the button");
    let params = document.getElementById('params');
    let string = `<div class="form-group">
                    <form>
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Parameter ${addedParamCount + 2} key" id="parameterkey${addedParamCount + 2}">
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Parameter ${addedParamCount + 2} value" id="parametervalue${addedParamCount + 2}">
                            </div>
                            <button class="btn btn-primary remove">-</button>
                        </div>
                    </form>`
    addedParamCount++;
    params.appendChild(getElementByString(string));

    let remove = document.getElementsByClassName('remove');
    for (item of remove) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
});


let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    document.getElementById('responsePrism').innerHTML = 'Please wait... Fetching API...';

    let url = document.getElementById('url').value;

    let requestType = document.querySelector("input[name = 'requestType']:checked").value;
    let contentType = document.querySelector("input[name = 'contentType']:checked").value;


    if (contentType == "customParams") {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterkey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterkey' + (i + 1)).value;
                let value = document.getElementById('parametervalue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJSON').value;
    }


    console.log('this is url ', url);
    console.log('this is requestType ', requestType);
    console.log('this is contentType ', contentType);
    console.log('this is data ', data);


    // for GET method 
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET'
        })
        .then(response => response.text())
        .then((text) => {
            // document.getElementById('response').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        })
    };
    
    if (requestType == 'POST'){
        fetch(url, {
            method: 'POST',
            body: data,
            headers: { "content-type": "application/json; charset=UTF-8" }
        })
        .then(response => response.text())
        .then((text) => {
            // document.getElementById('response').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        })
    }
});