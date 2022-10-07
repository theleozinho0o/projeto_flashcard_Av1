export default class Card {
    opened = false;
    content;
    totalPoints = 0;
    
    
    constructor(content){
        this.content = content
    }

    open(html){
    
        this.opened = true

        setTimeout(function(){
            html.getElementsByClassName("front")[0].style.background = "#ccc"
            html.getElementsByClassName("front")[0].style.color = "#e6e6e6"  
        },500)
    }
    

    
    async buscarFrase(palavra,url){
    
     let frasejson = await fetch(`${url}${palavra}`)
     let frase = await frasejson.json()
     console.log(frase)
     return frase    
    }
 
    
     render(id){
        let that = this;

        let root = document.createDocumentFragment();
        let caixaCards = document.createElement("div");
        caixaCards.setAttribute("class", "caixa-card");
        
        let card = document.createElement("div");

        card.addEventListener("click" ,async function() { 
            if (!that.opened){

               let sentenca =  await that.buscarFrase(that.content.hide.toLowerCase(),'https://significado.herokuapp.com/v2/frases/')

                Swal.fire({
                    title: `${that.content.hide}`,
                    text: `${sentenca[0].sentence}`
                })
               
                this.classList.toggle("card-open");
                that.open(this); 
                setTimeout(() => {
                    this.setAttribute("class", "card noHover")
                }, 5000);
                
                var msg = new SpeechSynthesisUtterance(`${that.content.open}`)
                var voices = window.speechSynthesis.getVoices()
                msg.voice = voices[4]
                window.speechSynthesis.speak(msg)
    
            }
        });

        card.addEventListener("mouseleave" ,function() { 
            if (that.opened){
                //this.setAttribute("class", "card noHover")
            }
            
        });

        card.setAttribute("class", "card");
        card.setAttribute("id", `card-${id}`);

        let content = document.createElement("div");
        content.setAttribute("class", "content");

        let front = document.createElement("div");
        front.setAttribute("class", "front");

        front.appendChild(document.createTextNode(`${that.content.open}`));        

        let back = document.createElement("div");
        back.setAttribute("class", "back");

        back.appendChild(document.createTextNode(`${that.content.hide}`));

        content.appendChild(front);
        content.appendChild(back);

        card.appendChild(content);

        caixaCards.appendChild(card);
        root.appendChild(caixaCards);
        
        const myImage = new Image(350, 170);
        const myImage2 = new Image(350, 170);
       
        myImage.src = `./image/${that.content.open}.png`;
        myImage2.src = `./image/${that.content.open}.png`;
        front.appendChild(myImage);
        back.appendChild(myImage2);
        return root
    }
}