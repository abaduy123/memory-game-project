const arr = ["inferno.PNG","ghost.PNG","club.PNG"];
const randomImgArr = [];
let stateImg = {
  state:[],
  id:[],
  imgSrc:[],
  removedId:[]
};
let count = 0;



const cardC = document.getElementsByClassName("game-container")[0];
const cards = document.createElement("div");
const img = document.createElement("img");
img.className = "images";


cards.className = "cards";
cards.appendChild(img);
  
for(let i =0;i<6;i++){
  
  cardC.appendChild(cards.cloneNode(true));
  

}

while (randomImgArr.length < 6){
  let randomNum = Math.floor(Math.random()*3);
  if(randomImgArr.length == 0){
    randomImgArr.push(randomNum);
  }
  else if (!randomImgArr.includes(randomNum)) {
    randomImgArr.push(randomNum);
    
  }
  else if( randomImgArr.includes(randomNum)){
   let firstIndex = randomImgArr.findIndex(e => e === randomNum)
   
   if(!randomImgArr.includes(randomNum,firstIndex + 1)){
     randomImgArr.push(randomNum);
   }
   
  }
  
}

for(let i=0; i<6;i++){
  
  document.getElementsByClassName("images")[i].src=`./img/${arr[randomImgArr[i]]}`;
 document.getElementsByClassName("images")[i].style.display="none"
  
  
}
for (let i = 0; i<6;i++){
     document.getElementsByClassName("cards")[i].addEventListener("click",displayImg)
}


function displayImg(){
  
  
  if(this.id === "" || this.id == undefined){
    this.id = `${count}`;
    count ++;
    
  }
if(this.firstElementChild.style.display === "none"){
  this.firstElementChild.style.display = "block";
  
  
}
else {

this.firstElementChild.style.display     = "none";

}

imgStateTracker(this.firstElementChild.style.display,this.id,this.firstElementChild.src);

hideOnThree();
setTimeout(compareImages,0)


 
 
  
    
}

function imgStateTracker (imgState,id,src){
 
  
  if(stateImg.id.length === 0 || (!stateImg.id.includes(id) && !stateImg.removedId.includes(id))){
    stateImg.id.push(id);
    stateImg.state.push(imgState);
    stateImg.imgSrc.push(src);
    
  
  }
  else if (stateImg.id.includes(id)){
  let idIndex = stateImg.id.findIndex(e => e === id);
   
   stateImg.state[idIndex] = imgState;
  }
  
}
function hideOnThree (){
  console.log(stateImg.state)
  if(stateImg.state.length != 0){
     let blockNum = 0;
  for(let i = 0; i < stateImg.state.length;i++){
     
     if(stateImg.state [i] === "block")
       blockNum++;
  }
  if(blockNum > 2){
    
    for(let i = 0; i < stateImg.state.length; i ++){
      if(stateImg.state[i]==="block"){
        
         stateImg.state[i] = "none";
         document.getElementById(`${stateImg.id[i]}`).firstElementChild.style.display = "none";
      }
    }
    
  }
  
  }
  
  
  
  
}
function compareImages(){
  
const srcs=[];
let blocks = 0;

for(let i=0; i<stateImg.state.length;i++){
  if(stateImg.state[i]==="block")
    blocks++;
    
}
if(blocks === 2){
  for(let i = 0; i < stateImg.state.length;i++){
    if(stateImg.state[i] === "block"){
      srcs.push(stateImg.imgSrc[i]);
      stateImg.removedId.push(stateImg.id[i]);
      
      
    }
    
    
  }
    
  if(srcs [0]===srcs[1]){
    
    for(let i = 0; i < stateImg.removedId.length;i++){
      
      document.getElementById(`${stateImg.removedId[i]}`).removeEventListener("click",displayImg);
      
      document.getElementById(`${stateImg.removedId[i]}`).firstElementChild.style.display = "none";
      document.getElementById(`${stateImg.removedId[i]}`).style.backgroundColor = "white";
      
      
      let index = stateImg.id.findIndex(e=> e === stateImg.removedId[i])
      stateImg.id.splice(index,1);
      
      stateImg.state.splice(index,1);
      
      stateImg.imgSrc.splice(index,1);
      
      

    }
    stateImg.removedId =[];
    
  }
  else if(srcs[0] !== srcs[1])
       stateImg.removedId = [];
}



}

