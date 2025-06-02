import {tours} from "./tourList.js"



if (window.location.pathname.endsWith("index.html")) {


    if (matchMedia("(max-width: 430px)").matches){
        document.querySelector('.menu').classList.toggle('toggleMenuBtn')
    }
    let slider = document.querySelector('.slider');



    setInterval(()=> {if(!matchMedia("(max-width: 430px)").matches){
        slider.prepend(document.querySelector('.slider a:last-child')),
        document.querySelector('.slider a:nth-child(1)').classList.add('fade-in'),
        document.querySelector('.slider a:nth-child(5)').classList.add('fade-out'),
        document.querySelector('.slider a:nth-child(6)').classList.add('hide'),
        document.querySelector('.slider a:nth-child(5)').classList.remove('fade-out'),
        document.querySelector('.slider a:nth-child(2)').classList.remove('hide'),
        document.querySelector('.slider a:first-child').classList.remove('hide'),
        document.querySelector('.slider a:nth-child(2)').classList.remove('fade-in')}
        /*else{console.log("unmatched nigga")}*/}, 3000)


}
if (window.location.pathname.endsWith("Tours.html")) {
   

    const filterBtn = document.querySelector('.showHideMenuBtn')
    filterBtn.addEventListener('click',()=>document.querySelector('.menu').classList.toggle('toggleMenuBtn'))
    filterBtn.addEventListener('click',()=>document.querySelector('.countriesCont').classList.toggle('toggleContBtn'))
    const decreaseBtn = document.querySelector(".decrease")
    const increaseBtn = document.querySelector(".increase")
    const peop = document.querySelector(".maxPeopInput")
    increaseBtn.addEventListener("click",()=>{if(peop.value<10){peop.value++}})
    decreaseBtn.addEventListener("click",()=>{if(peop.value>0){peop.value--}})


    const filterData = {
        fCountries : ["Brazil","China","Egypt","France","Greece","Kenya","Norway","Peru","Turkey"] ,
        fMinPrice : 1 ,
        fMaxPrice : 100000000 ,
        fPeople : 1 ,


    }


    const minPrice = document.querySelector(".minPrice")
    const maxPrice = document.querySelector(".maxPrice")
    const submit = document.querySelector(".filterSubmitBtn")
    const conts = document.querySelectorAll(".countriesCont .country input")
    const selectAll = document.querySelector("#selectAll")



    submit.addEventListener("click" , ()=>{
        filterData.fCountries = []
        filterData.fMinPrice = null
        filterData.fMaxPrice = null
        filterData.fPeople = null



        conts.forEach( (conts)=> {if (conts.checked == true){
        filterData.fCountries.push(conts.value)
        console.log(filterData.fCountries)}}), 

        filterData.fMinPrice = minPrice.value === '' ? 1 :(minPrice.value),
        filterData.fMaxPrice = maxPrice.value === '' ? 100000000000 :(maxPrice.value) ,
        filterData.fPeople = Number(peop.value)

        console.log(filterData)

        renderTours()



    })



    function renderTours () {
        const toursHTML = []
        tours.forEach((tour)=>{if (filterData.fCountries.includes(tour.country)&&filterData.fPeople <= tour.maxPeople&&tour.pricePerPerson*filterData.fPeople >= filterData.fMinPrice&&tour.pricePerPerson*filterData.fPeople <= filterData.fMaxPrice)toursHTML.push(
            `<div class="tourCard ${tour.country}" id="${tour.name}">
                    <div class="backgrImg" style="background:url(tourCardImages/${tour.name}.png);width:100%;height: 200px;background-repeat: no-repeat;background-size: cover;"></div>
                    <div class="tourTitle">${tour.country} - ${tour.title}</div>
                    <div class="tourPrice">${tour.pricePerPerson * filterData.fPeople}$</div>
                    <a class="tourLearnMore" href="TourDetails.html?tourName=${tour.name}">Learn more</a></div>`
                    
        )})
        document.querySelector(".toursCont").innerHTML = toursHTML.join('')
        }

    renderTours()

    selectAll.addEventListener('change', ()=> {
        conts.forEach(checkbox => checkbox.checked = selectAll.checked);
    });
    conts.forEach(checkbox => {
        checkbox.addEventListener('change', ()=> {
            selectAll.checked = [...conts].every(cb => cb.checked);
        });
    });

}
if (window.location.pathname.endsWith("TourDetails.html")) {

  
    

    const chosenTourName = new URLSearchParams(window.location.search).get('tourName')
    const chosenTour = tours.find(obj => obj.name === chosenTourName)
    const config = {dateFormat: "d.m.Y",
                    minDate: "today",
                    wrap: true}
    

    function rendertourDetails (){
        document.querySelector(".tourDetailsCont").innerHTML = `<div class="tourDetailsImg" style="background:url(tourCardImages/${chosenTour.name}.png);background-repeat: no-repeat;background-size: cover; border-radius:16px;"></div>
                                                                    <div class="tourDetailsTitleCont"><div class="tourDetailsTitle">${chosenTour.country} - ${chosenTour.title}</div></div>
                                                                    <div class="tourDetailsDescriptCont"><div class="tourDetailsDescript">${chosenTour.description}</div></div>
                                                                    <div class="tourDetailsPMDCont"><div class="tourDetailsPMD">${chosenTour.pricePerPerson}$</div><div class="tourDetailsPMD">${chosenTour.maxPeople}</div><div class="tourDetailsPMD">${chosenTour.duration} days</div></div>
                                                                    <div class="maxTouristsCont">
                                                                        <span class="maxTouristsSpan">Tourists :</span>
                                                                        <div class="maxPeopInputCont">
                                                                            <button class="decrease">-</button>
                                                                            <input type="number" class="maxPeopInput" value="1" readonly>
                                                                            <button class="increase">+</button>
                                                                        </div>


                                                                        <span class="maxTouristsDateSpan">Date :</span>
                                                                        <div class="maxTouristsDate" style="display:inline-block;height:26px;overflow:hidden;font-family:"Itim">
                                                                            <input type="text" placeholder="Select date" data-input style="outline:none;border:none;font-size:18px">

                                                                            <a class="input-button" title="toggle" data-toggle>
                                                                                <span class="material-symbols-outlined priority" style="font-family:'Material Symbols Outlined';position:absolute;left:80%;top:-1px;cursor:pointer">calendar_month</span>
                                                                            </a>

                                                                          
                                                                        </div>
                                                                    </div>
                                                                    <button class="toForm" target="blank">To form</button>`
                                     flatpickr(".maxTouristsDate", config);

            
            
        
    }
    
    
    
    rendertourDetails()
    const fp = flatpickr(".maxTouristsDate",config)
    
    console.log(chosenTour)
    console.log("nigger")
    const decreaseBtn = document.querySelector(".decrease")
    const increaseBtn = document.querySelector(".increase")
    const peop = document.querySelector(".maxPeopInput")
    const date = document.querySelector(".maxTouristsDate")
    const toForm = document.querySelector(".toForm") 

    increaseBtn.addEventListener("click",()=>{if(peop.value<chosenTour.maxPeople){peop.value++ , console.log(flatpickr.formatDate(fp.selectedDates[0], "d-m-Y"))}})
    decreaseBtn.addEventListener("click",()=>{if(peop.value>1){peop.value--}})
    toForm.addEventListener("click",()=>{window.location.href = `TourPay.html?tourists=${peop.value}&date=${flatpickr.formatDate(fp.selectedDates[0], "d-m-Y")}&tourName=${chosenTour.name}`})                                      

    



}
if (window.location.pathname.endsWith("TourPay.html")) {



    const chosenTourName = new URLSearchParams(window.location.search).get('tourName')
    const peopleAmount = new URLSearchParams(window.location.search).get('tourists')
    const chosenDate = new URLSearchParams(window.location.search).get('date')
    const chosenTour = tours.find(obj => obj.name === chosenTourName)
    console.log(chosenTour)
    function renderTourPayCont (way){if (way ==="first"){
            document.querySelector(".tourPayCont").innerHTML =   `
                                                                        <div class="chosenTourUserCont">
                                                                        <span>Fill form to book a tour</span>
                                                                        <fieldset class="userGeneralInfo">
                                                                            <legend style="font-family: Itim; font-size: 28px; padding: 0px 16px;">Generail info</legend>
                                                                            <form class="generalInfoForm">
                                                                                <input type="text" class="userInfoName" placeholder="Name" >
                                                                                <input type="text" class="userInfoSurname" placeholder="Surname" >
                                                                                <input type="email" class="userInfoEmail" placeholder="Email"  >
                                                                                <input type="text" class="userInfoNumber" placeholder="Phone number (+0-123-456-789)" >
                                                                            </form>
                                                                            
                                                                        </fieldset>
                                                                        <fieldset class="userPaymentInfo">
                                                                            <legend style="font-family: Itim; font-size: 28px; padding: 0px 16px;">Payment info</legend>
                                                                            <form class="paymentInfoForm">
                                                                                <input type="number" class="userCardNumber" placeholder="Card Number : (123-456-789) " >
                                                                                <input type="text" class="userNS" placeholder="Card Holder : Name & Surname" >
                                                                                <div class="userExpDate"><input type="text" class="userExpMonth" placeholder="Expire date : MM" style="width: 49%;margin: 0;padding: 0;" min="1" max="12" inputmode="numeric" maxlength="2" >
                                                                                                            <input type="text" class="userExpYear" placeholder="Expire date : YY" style="width: 49%;margin: 0;padding: 0;" min="25" inputmode="numeric" maxlength="2" ></div>
                                                                                <input type="text" class="userCVV" placeholder="CVV" maxlength="3" >
                                                                            </form>
                                                                            
                                                                        </fieldset>
                                                                        <button class="payBtn">Pay</button>
                                                                    </div>
                                                                    <div class="chosenTourDetailsCont">
                                                                <span>Your tour details</span>
                                                                    <div class="chosenTourDetailsImg" style='background:url(tourCardImages/${chosenTour.name}.png);background-size: cover;background-repeat: no-repeat;'></div>
                                                                    <div class="chosenTourDetailsInfoCont">
                                                                        <div class="chosenTourDetailsTitle">${chosenTour.country} - ${chosenTour.title}</div>
                                                                        <div class="chosenTourDetailsDescription">${chosenTour.description}</div>
                                                                    </div>
                                                                    <div class="tourPayPMDCont"><div class="tourPayPMD tourPayPMD1">$${chosenTour.pricePerPerson * peopleAmount}</div><div class="tourPayPMD tourPayPMD2">${peopleAmount}</div><div class="tourPayPMD tourPayPMD3">${chosenTour.duration} days</div></div>
                                                                </div>`}

                                                                else{ document.querySelector(".tourPayCont").innerHTML =`   
                                                                    <a href="Tours.html" class="paymentConfirimed"></a>
                                                                    <a href="Tours.html" class="tPaymentConfirimed">Payment Confirimed</a>`}
                                                            
                                                            
                                                            
                                                            
                                                            
                                                            }
    renderTourPayCont("first")
     const userExpMonth = document.querySelector('.userExpMonth');
    const userExpYear = document.querySelector('.userExpYear');
    const userCVV = document.querySelector(".userCVV");
    const userCardNumber = document.querySelector(".userCardNumber");
    const userName = document.querySelector(".userInfoName");
    const userSurName = document.querySelector(".userInfoSurname");
    const userEmail = document.querySelector(".userInfoEmail");
    const userPhoneNum = document.querySelector(".userInfoNumber");
    const payBtn = document.querySelector(".payBtn");
    const userCardNameSurname = document.querySelector(".userNS");
    const user ={
        Name : null ,
        SurName : null ,
        Email : null ,
        PhoneNum : null ,
        CardNum: null ,
        CardNameSurname:null,
        ExpMonth:null,
        ExpYear:null ,
        Cvv:null,


    }
    
    userExpMonth.addEventListener('keypress', e => {
        if (e.charCode < 49 || e.charCode > 57) {
          e.preventDefault();
        }
      });
    userExpYear.addEventListener('keypress', e => {
        if (e.charCode < 49 || e.charCode > 57) {
          e.preventDefault();
        }
      });
    userCVV.addEventListener('keypress', e => {
        if (e.charCode < 48 || e.charCode > 57) {
          e.preventDefault();
        }
      });
    userPhoneNum.addEventListener('keypress', e => {
        if (e.charCode < 48 || e.charCode > 57) {
          e.preventDefault();
        }
      });


    userExpMonth.addEventListener("input",()=>{if(userExpMonth.value>12||userExpMonth.value<0){userExpMonth.classList.add("redshit"),userExpMonth.title="fill this field"}
                                                else{userExpMonth.classList.remove("redshit")}})
    userExpYear.addEventListener("input",()=>{if(userExpYear.value<25&&userExpYear.value>=1){userExpYear.classList.add("redshit"),userExpYear.title="fill this field"}
                                                else{userExpYear.classList.remove("redshit")}})






    payBtn.addEventListener("click",()=>{if(
                                            userName.value!=""&&
                                            userSurName.value!=""&&
                                            userEmail.value!=""&&
                                            userPhoneNum.value!=""&&
                                            userCardNumber.value!=""&&
                                            userCardNameSurname.value!=""&&
                                            userExpMonth.value!=""&&
                                            userExpYear.value!=""&&
                                            userExpYear.value>=25&&
                                            userCVV.value!=""){user.Name =userName.value,
                                                                user.SurName = userSurName.value,
                                                                user.Email = userEmail.value,
                                                                user.PhoneNum =userPhoneNum.value,
                                                                user.CardNum =  userCardNumber.value,
                                                                user.CardNameSurname = userCardNameSurname.value,
                                                                user.ExpMonth = userExpMonth.value,
                                                                user.ExpYear = userExpYear.value,
                                                                user.Cvv = userCVV.value,
                                                                console.log(user)
                                                                renderTourPayCont("second")
                                                            }}

   
    )



}

if (window.location.pathname.endsWith("About.html")) {

    let pageIndex = 1
    console.log(pageIndex)

    
    function renderAboutPage (Index){

        if (Index === 1){
                document.querySelector(".aboutCont").innerHTML = `
                    <div class="aboutContImg" style="background: url(images/Our_story.png); background-size: cover;background-repeat: no-repeat;background-position: center;"></div>
                    <div class="aboutText">
                        <div class="aboutTitle">Our Story</div>
                        <div class="aboutDescript">Tides & Trails was founded in 2010 with a passion for creating exceptional travel experiences. Our team of seasoned travel experts and adventure enthusiasts is dedicated to crafting unforgettable journeys tailored to our clients' dreams.</div>
                    </div>
                    <div class="BtnsCont">
                        <div class="prevBtn"><span class="material-symbols-outlined">line_start_arrow_notch</span></div>
                        <div class="nextBtn"><span class="material-symbols-outlined">line_end_arrow_notch</span></div>
                    </div>`
                    const nextBtn = document.querySelector(".nextBtn")
                    const prevBtn = document.querySelector(".prevBtn")
                    nextBtn.addEventListener("click",()=>{if(pageIndex<3){pageIndex++,renderAboutPage(pageIndex)}})
                    prevBtn.addEventListener("click",()=>{if(pageIndex>1){pageIndex--,renderAboutPage(pageIndex)}})
                    }
                    
                   


        else if (Index === 2){
                document.querySelector(".aboutCont").innerHTML = `
                    <div class="aboutContImg" style="background: url(images/Our_dest.png); background-size: cover;background-repeat: no-repeat;background-position: center;"></div>
                    <div class="aboutText">
                        <div class="aboutTitle">Our Destinations</div>
                        <div class="aboutDescript">We offer curated tours to some of the worlds most captivating destinations, including Brazil, China, Egypt, France, Greece, Kenya, Norway, Peru, and Turkey. For those seeking a maritime escape, our cruises span the stunning waters of the Caribbean, Mediterranean, and Nordic regions.</div>
                    </div>
                    <div class="BtnsCont">
                        <div class="prevBtn"><span class="material-symbols-outlined">line_start_arrow_notch</span></div>
                        <div class="nextBtn"><span class="material-symbols-outlined">line_end_arrow_notch</span></div>
                    </div>`
                    const nextBtn = document.querySelector(".nextBtn")
                    const prevBtn = document.querySelector(".prevBtn")
                    nextBtn.addEventListener("click",()=>{if(pageIndex<3){pageIndex++,renderAboutPage(pageIndex)}})
                    prevBtn.addEventListener("click",()=>{if(pageIndex>1){pageIndex--,renderAboutPage(pageIndex)}})}
                    

        else if (Index === 3){
                document.querySelector(".aboutCont").innerHTML = `
                    <div class="aboutContImg" style="background: url(images/Why_TT.png); background-size: cover;background-repeat: no-repeat;background-position: center;"></div>
                    <div class="aboutText">
                        <div class="aboutTitle">Why Tides & Trails?</div>
                        <div class="aboutDescript">At Tides & Trails, we bring together local expertise, personalized service, and a love for exploration to ensure your trip is seamless, memorable, and inspiring. Let us guide you on your next adventure!</div>
                    </div>
                    <div class="BtnsCont">
                        <div class="prevBtn"><span class="material-symbols-outlined">line_start_arrow_notch</span></div>
                        <div class="nextBtn"><span class="material-symbols-outlined">line_end_arrow_notch</span></div>
                    </div>`
                    const nextBtn = document.querySelector(".nextBtn")
                    const prevBtn = document.querySelector(".prevBtn")
                    nextBtn.addEventListener("click",()=>{if(pageIndex<3){pageIndex++,renderAboutPage(pageIndex)}})
                    prevBtn.addEventListener("click",()=>{if(pageIndex>1){pageIndex--,renderAboutPage(pageIndex)}})}
                    
                    
                
                 




                
                
                
        
    }
    renderAboutPage(1)

    
















}