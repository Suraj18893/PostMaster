console.log(`js project`)

// 1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
// initiliz  no pf parameters0
let addedparamsCount = 0;
// hide the parambox initially
let ParamBox = document.getElementById('parametersBox');
ParamBox.style.display = 'none';

// clicks on custprams/json//

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

// if user clicks on + button then add more parameters

let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let str = `<div class="form-row my-2" >
                <label for="url" class="col-sm-2 col-form-label">Parameter ${addedparamsCount + 2} </label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${addedparamsCount + 2}" placeholder="Enter Parameter ${addedparamsCount + 2} Key">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterValue${addedparamsCount + 2}" placeholder="Enter Parameter ${addedparamsCount + 2} Value">
                </div>
                <button class="btn btn-primary deleteParam">-</button>
            </div>`

    // convert the element string to dom node
    let paramselements = getElementFromString(str);
    // console.log(paramselements);    
    document.getElementById('params').appendChild(paramselements)
    // add an event listener to remove the parameter on clicking - btn
    let deleteparam = document.getElementsByClassName('deleteParam');
    for (item of deleteparam) {
        item.addEventListener('click', (e) => {
            let conf = confirm('Do you want to delete this Parameter?');
            console.log(conf);
            if (conf == true) {

                e.target.parentElement.remove()
            }

        })
    }

    addedparamsCount++;
})

// If the user clicks on submit button

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // showplease wait in the response box
    document.getElementById('responsePrism').innerText = "Please wait..Fetching response.. "
    // fetch all the values user has entered 
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // If user has used params option instead of json, collect all the parameters in an object

    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedparamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }

        data = JSON.stringify(data);
        console.log(data);

    }

    else {
        data = document.getElementById('requestJsonText').value;
        // data = JSON.stringify(data);
        // console.log(data);
    }

    // if the request type is get, invoke fetch api to create a post request
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }
    else {
        fetch(url,
            {
                method: 'POST',
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }

});
