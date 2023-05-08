
const loadImage = (url) => new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute('crossorigin', 'anonymous'); 
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (err) => reject(err));
    img.src = url + "?bandoriforeverdddd";
  });
  function getAvatarImg(uid, mode){
      return new Promise((resolve, reject) => {
  
          $.ajax({
              type : "POST",
              url : "/event/avatar4th/inc/ajax_getAvatarItems.asp",
              dataType : "text",
              timeout : 15000,
              cache : false,
              data : {"mode" : mode, "uid" : uid},
              success : function(result) {
				  result_data = JSON.parse(result);
                  //console.log (result_data);
                  if (result_data.status == "ok")
                  {
                      var promises = [];
                      if(result_data.gender == "2"){
                          promises.push(loadImage("https://avatar.useschool.co.kr/avatar/img/girl.png"));
                      } else {
                          promises.push(loadImage("https:///avatar.useschool.co.kr/avatar/img/boy.png"));
                      }
                      
                      if(result_data.face){
                        promises.push(loadImage("https://avatar.useschool.co.kr/avatar/img_2/avatarshop-main/face/" + result_data.face));
					  }
                      if(result_data.hair){
                          promises.push(loadImage("https://avatar.useschool.co.kr/avatar/img_2/avatarshop-main/hair/" + result_data.hair));
                      }
                      if(result_data.shoes){
                          promises.push(loadImage("https://avatar.useschool.co.kr/avatar/img_2/avatarshop-main/shoes/" + result_data.shoes));
                      }
                      if(result_data.clothes){
                          promises.push(loadImage("https://avatar.useschool.co.kr/avatar/img_2/avatarshop-main/clothes/" + result_data.clothes));
                      }
                      if(result_data.weapon){
                          promises.push(loadImage("https://avatar.useschool.co.kr/avatar/img_2/avatarshop-main/weapon/" + result_data.weapon));
                      }
                      if(result_data.pet){
                          promises.push(loadImage("https://avatar.useschool.co.kr/avatar/img_2/avatarshop-main/pet/" + result_data.pet));
                      }
                      Promise.all(promises).then((results) => {
                          var canvas = document.createElement('canvas');
                          
                          canvas.width = 500;
                          canvas.height = 550;
                          if(canvas.getContext){
                              var draw = canvas.getContext("2d");
                              results.forEach((v, i) => {
								if(v == null) return;
								  //이미지의 원하는 부분만 잘라서 그리기
								  //drawImage(이미지객체, 
								  //        이미지의 왼위 부분x, 이미지의 왼위 부분y, 이미지의 원하는 가로크기, 이미지의 원하는 세로크기,
								  //        사각형 부분x, 사각형 부분y, 가로크기, 세로크기)
								  //draw.drawImage(v, 20,20, 250,275, 20,20, 500,550);
								  
								  //전체 이미지 그리기
								  //drawImage(이미지객체, 사각형 왼위 x, 사각형 왼위 y, 가로크기, 세로크기)
								draw.drawImage(v, 0,0, 500,550);
                              })
                          }
                          canvas.toBlob(function(blob){
                              var bloburl=URL.createObjectURL(blob);
                              //console.log(bloburl);
                              resolve(bloburl);
                          })
                      })
  
                  }
              },
              error: function(request, status, error) {console.log(request, status, error);}
          });
  
  
      })
  }
  function invokeDownload(uid, mode){
    getAvatarImg(uid, mode).then((url) => {
        let link = document.createElement('a');
            link.href = url;
            link.download = "Avatar.png";
            document.body.appendChild(link);
            link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
            link.remove();
            window.URL.revokeObjectURL(url);
    })
  }
  function loadAvatarHere(img, uid, mode){
      if(img.src.startsWith("blob")){
        window.URL.revokeObjectURL(img.src);
      } else {
        getAvatarImg(uid, mode).then((url) => {
            //console.log(img);
            img.src=url;
        })
      }

  }