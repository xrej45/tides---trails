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
    const userExpMonth = document.querySelector('.userExpMonth');
    const userExpYear = document.querySelector('.userExpYear');
    const userCVV = document.querySelector(".userCVV")
    const userInfoNumber = document.querySelector(".userInfoNumber")
    
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
    userInfoNumber.addEventListener('keypress', e => {
        if (e.charCode < 48 || e.charCode > 57) {
          e.preventDefault();
        }
      });


    userExpMonth.addEventListener("input",()=>{if(userExpMonth.value>12||userExpMonth.value<0){userExpMonth.classList.add("redshit"),userExpMonth.title="fill this field"}
                                                else{userExpMonth.classList.remove("redshit")}})
    userExpYear.addEventListener("input",()=>{if(userExpYear.value<25&&userExpYear.value>=1){userExpYear.classList.add("redshit"),userExpYear.title="fill this field"}
                                                else{userExpYear.classList.remove("redshit")}})


    const chosenTourName = new URLSearchParams(window.location.search).get('tourName')
    const peopleAmount = new URLSearchParams(window.location.search).get('tourists')
    const chosenDate = new URLSearchParams(window.location.search).get('date')
    const chosenTour = tours.find(obj => obj.name === chosenTourName)
    console.log(chosenTour)
    document.querySelector(".chosenTourDetailsCont").innerHTML =   `
                                                        <span>Your tour details</span>
                                                            <div class="chosenTourDetailsImg" style='background:url(tourCardImages/${chosenTour.name}.png);height: 45.86%;width: 100%;background-size: cover;background-repeat: no-repeat;border-radius: 16px;'></div>
                                                            <div class="chosenTourDetailsInfoCont">
                                                                <div class="chosenTourDetailsTitle">${chosenTour.country} - ${chosenTour.title}</div>
                                                                <div class="chosenTourDetailsDescription">${chosenTour.description}</div>
                                                            </div>
                                                            <div class="tourPayPMDCont"><div class="tourPayPMD">$${chosenTour.pricePerPerson * peopleAmount}</div><div class="tourPayPMD">${peopleAmount}</div><div class="tourPayPMD">${chosenTour.duration} days</div></div>
                                                        </div>`



}