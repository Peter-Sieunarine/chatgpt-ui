// Post request to GPT API if API-KEY provided   
async function submitRequest() {

    document.body.style.cursor = 'wait';

    if (!document.getElementById("apikey").value) {

        document.getElementById('apikey').style.borderColor = 'red';
        //return false;

    } else {
        document.getElementById('apikey').style.borderColor = '';
    }

    let request = document.getElementById("request").value;
    let user_input = document.getElementById("user_input").value;
    if (user_input.trim() === "") {
        user_input = "You are a helpful assistant.";
    }
    let apiKey = document.getElementById("apikey").value
    let myHeaders = new Headers();
    let apiEndpoint = "https://api.openai.com/v1/chat/completions";
    myHeaders.append("content-type", "application/json");
    myHeaders.append("Authorization", "Bearer " + apiKey);

    var raw = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "user",
            "content": request
          },
          {
            "role": "system",
            "content": user_input
          },          
        ],
        "temperature": 0.7
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

// Fetch Response
    jsonResults = await callApiAsync(apiEndpoint, requestOptions);

    if (jsonResults) {

        resultMessage = jsonResults.choices[0].message.content;
        
        //document.getElementById("textarea_response_formatted").innerHTML = resultMessage;//JSON.stringify(jsonResults);
        console.log(jsonResults)
        document.getElementById("textarea_response").value = resultMessage;
    }

    document.body.style.cursor = 'default';

}

// Post request to GPT API if API-KEY provided   
async function callApiAsync(apiEndpoint, requestOptions) {

    let response = await fetch(apiEndpoint, requestOptions);
    let json = await response.json();


    if (response.ok) { // Success

        return json;

    } else { //Error

        document.getElementById("textarea_response_formatted").innerHTML = `ERROR: ${json.error.message} (Response Code: ${response.status})`;
        return false;
    }

}
