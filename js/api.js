var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject() {
  var xmlHttp;
  if(window.ActiveXObject) {
    try{
      xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    } catch(e) {
      xmlHttp = false;
    }
  } else {
    try {
      xmlHttp = new XMLHttpRequest();
    } catch(e) {
      xmlHttp = false;
    }
  }

  if(!xmlHttp) {
    alert("can't create the object!")
  } else {
    return xmlHttp;
  }
}

function process() {
  if(xmlHttp.readyState==0 || xmlHttp.readyState==4) {
    userName = encodeURIComponent(document.getElementById('user-input').value);
    xmlHttp.open('GET', 'https://api.github.com/users/'+userName, true);
    xmlHttp.onreadystatechange = handleServerResponse;
    xmlHttp.send(null);
  } else {
    setTimeout('process()', 1000);
  }
}

function handleServerResponse() {
  if(xmlHttp.readyState==4) {
    if(xmlHttp.status==200) {
      var userDetail = JSON.parse(xmlHttp.responseText);
      var avatar = document.getElementById('avatar');
      avatar.style.display = 'block';
      document.getElementById('user-avatar').src = userDetail.avatar_url;
      document.getElementById('avatar-name').innerHTML = userDetail.name;
      document.getElementById('avatar-email').innerHTML = userDetail.email;
      document.getElementById('repository').innerHTML = userDetail.public_repos;
      document.getElementById('followers').innerHTML = userDetail.followers;
      document.getElementById('following').innerHTML = userDetail.following;
      setTimeout('process()', 1000);
    }else{
      alert('Something Went Wrong!');
    }
  }
}
